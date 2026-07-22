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

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
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

const BAD_TITLE_RE = /pinned|specimen|mounted|collection|label|herbarium|drawer|museum/i;

// Each item: try Wikipedia pageimages via scientific name first (avoids disambiguation with
// unrelated real-world things sharing the common name), then Commons search excluding pinned/specimen shots.
const ITEMS = [
  { slug: "duke-of-burgundy", title: "Hamearis lucina", query: "Hamearis lucina live butterfly" },
  { slug: "kaiser-i-hind", title: "Teinopalpus imperialis", query: "Teinopalpus imperialis live butterfly" },
  { slug: "viceroy-butterfly", title: "Limenitis archippus", query: "Limenitis archippus live butterfly" },
  { slug: "cabbage-white", title: "Pieris rapae", query: "Pieris rapae live butterfly wings" },
  { slug: "owl-butterfly", title: "Caligo memnon", query: "Caligo owl butterfly live wings perched" },
  { slug: "queen-alexandras-birdwing", title: "Ornithoptera alexandrae", query: "Ornithoptera alexandrae live butterfly" },
  { slug: "luzon-peacock-swallowtail", title: "Papilio chikae", query: "Papilio chikae live butterfly" },
  { slug: "homerus-swallowtail", title: "Papilio homerus", query: "Papilio homerus live butterfly" },
  { slug: "bhutan-glory", title: "Bhutanitis lidderdalii", query: "Bhutanitis lidderdalii live butterfly" },
  { slug: "eighty-eight-butterfly", title: "Diaethria clymena", query: "Diaethria clymena live butterfly" },
  { slug: "schaus-swallowtail", title: "Papilio aristodemus", query: "Schaus swallowtail live butterfly perched" },
  { slug: "mitchells-satyr", title: "Neonympha mitchellii", query: "Neonympha mitchellii live butterfly" },
];

const report = [];
for (const item of ITEMS) {
  console.log(item.slug);
  let url = await pageImage(item.title);
  let source = "pageimages:" + item.title;
  if (url && BAD_TITLE_RE.test(url)) url = null;
  if (!url) {
    console.log("  pageimages miss/bad, trying Commons search");
    const results = await commonsSearchMulti(item.query, 15);
    const clean = results.filter((r) => !BAD_TITLE_RE.test(r.title));
    const pick = clean[0] || results[0];
    if (pick) { url = pick.url; source = pick.title; }
  }
  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug: item.slug, status: "missing" });
    await new Promise((r) => setTimeout(r, 600));
    continue;
  }
  const r = await downloadImage(url);
  if (!r || !r.ok) {
    console.log("  download failed:", url);
    report.push({ slug: item.slug, url, status: "download-fail" });
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
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, url, source, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 700));
}

writeFileSync("out/e45-butterflies-refetch2-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
