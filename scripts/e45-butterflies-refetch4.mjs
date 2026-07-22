import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/butterflies";
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

async function commonsSearchMulti(query, limit = 20) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages)
    .filter((p) => { const m = p.imageinfo?.[0]?.mime; return m === "image/jpeg" || m === "image/png"; })
    .map((p) => ({ url: p.imageinfo[0].thumburl || p.imageinfo[0].url, title: p.title }));
}

const BAD_TITLE_RE = /pinned|specimen|mounted|collection|label|herbarium|drawer|museum|net\b|mesh|cage|enclosure/i;

const ITEMS = [
  { slug: "queen-alexandras-birdwing", queries: ["Ornithoptera alexandrae live captive", "Ornithoptera alexandrae zoo butterfly", "Queen Alexandra's birdwing live"] },
  { slug: "luzon-peacock-swallowtail", queries: ["Papilio chikae live wild butterfly", "Papilio chikae habitat photo"] },
  { slug: "homerus-swallowtail", queries: ["Papilio homerus live wild", "Homerus swallowtail Jamaica live"] },
  { slug: "schaus-swallowtail", queries: ["Papilio aristodemus ponceanus live", "Schaus swallowtail Key Largo live", "Heraclides aristodemus live butterfly"] },
];

const report = [];
for (const item of ITEMS) {
  console.log(item.slug);
  let picked = null;
  for (const q of item.queries) {
    const results = await commonsSearchMulti(q, 20);
    const clean = results.filter((r) => !BAD_TITLE_RE.test(r.title));
    if (clean.length) { picked = clean[0]; console.log(`  found via query "${q}": ${picked.title}`); break; }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!picked) {
    console.log("  STILL MISSING after all queries");
    report.push({ slug: item.slug, status: "missing" });
    continue;
  }
  const r = await downloadImage(picked.url);
  if (!r || !r.ok) {
    console.log("  download failed:", picked.url);
    report.push({ slug: item.slug, url: picked.url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 700));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${picked.title}`);
  report.push({ slug: item.slug, url: picked.url, title: picked.title, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 700));
}

writeFileSync("out/e45-butterflies-refetch4-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
