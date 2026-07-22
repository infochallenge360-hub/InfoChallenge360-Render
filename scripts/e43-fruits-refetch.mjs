import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/fruits";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      if (r.ok) return r;
      await new Promise((res) => setTimeout(res, 2000));
    } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  return null;
}

function toProxyUrl(url) {
  let target = url;
  const m = target.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)\/\d+px-[^/]+$/);
  if (m) target = `${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
  const noProto = target.replace(/^https?:\/\//, "");
  return `https://wsrv.nl/?url=${noProto}&output=jpg&w=1200`;
}

async function downloadImage(url) {
  const r = await fetchWithRetry(toProxyUrl(url), 3);
  if (r && r.ok) return r;
  return fetchWithRetry(url);
}

async function commonsSearchMulti(query, limit = 15) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages)
    .filter((p) => { const m = p.imageinfo?.[0]?.mime; return m === "image/jpeg" || m === "image/png"; })
    .map((p) => ({ url: p.imageinfo[0].thumburl || p.imageinfo[0].url, title: p.title }));
}

const BAD_TITLE_RE = /illustration|drawing|painting|botanical|clipart|logo|map|diagram/i;

// Per-item: hand-picked Commons search query targeting the CORRECT species/whole-fruit look,
// based on GATE-1 findings of exactly what went wrong for each.
const ITEMS = [
  { slug: "avocado", query: "Hass avocado whole fruit" },
  { slug: "coconut", query: "coconut palm husk whole" },
  { slug: "papaya", query: "Carica papaya whole fruit orange" },
  { slug: "custard-apple", query: "Annona reticulata custard apple fruit" },
  { slug: "soursop", query: "Annona muricata soursop spiky fruit" },
  { slug: "peach", query: "peach fruit photo real" },
  { slug: "nectarine", query: "nectarine fruit photo real smooth" },
  { slug: "tamarind", query: "tamarind pods brown" },
  { slug: "jackfruit", query: "jackfruit whole spiky fruit tree" },
  { slug: "grapefruit", query: "grapefruit whole fruit half" },
  { slug: "honeydew-melon", query: "honeydew melon whole fruit" },
  { slug: "cantaloupe", query: "cantaloupe ripe netted melon" },
  { slug: "ackee", query: "ackee fruit ridged pod Blighia sapida" },
  { slug: "marula", query: "marula fruit closeup yellow" },
  { slug: "white-sapote", query: "white sapote fruit closeup" },
  { slug: "black-sapote", query: "black sapote fruit photo real" },
  { slug: "lime", query: "lime whole fruit citrus" },
  { slug: "raspberry", query: "raspberry fruit top view" },
  { slug: "longan", query: "longan fruit cluster closeup" },
  { slug: "langsat", query: "langsat lanzones fruit cluster closeup" },
  { slug: "watermelon", query: "watermelon whole fruit bright" },
  { slug: "prickly-pear", query: "prickly pear cactus fruit unpeeled spiky" },
];

const report = [];
for (const item of ITEMS) {
  console.log(item.slug);
  const results = await commonsSearchMulti(item.query, 15);
  const clean = results.filter((r) => !BAD_TITLE_RE.test(r.title));
  const pick = clean[0] || results[0];
  if (!pick) {
    console.log("  STILL MISSING");
    report.push({ slug: item.slug, status: "missing" });
    continue;
  }
  const r = await downloadImage(pick.url);
  if (!r || !r.ok) {
    console.log("  download failed:", pick.url);
    report.push({ slug: item.slug, url: pick.url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 600));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${pick.title}`);
  report.push({ slug: item.slug, url: pick.url, title: pick.title, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 700));
}

writeFileSync("out/e43-fruits-refetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
