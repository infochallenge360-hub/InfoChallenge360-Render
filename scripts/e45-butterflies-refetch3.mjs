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
  const noProto = url.replace(/^https?:\/\//, "");
  return `https://wsrv.nl/?url=${noProto}&output=jpg&w=1200`;
}

async function downloadImage(url) {
  const r = await fetchWithRetry(toProxyUrl(url), 3);
  if (r && r.ok) return r;
  return fetchWithRetry(url);
}

// iNaturalist — verified-safe query: only CC0/CC-BY, research-grade, votes-ordered.
async function inatPhotos(sciName) {
  const api = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sciName)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=10`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const out = [];
  for (const obs of j.results || []) {
    for (const p of obs.photos || []) {
      if (p.url) out.push({ url: p.url.replace(/square\.(jpe?g|png)/, "original.$1"), attribution: p.attribution });
    }
  }
  return out;
}

const ITEMS = [
  { slug: "queen-alexandras-birdwing", sci: "Ornithoptera alexandrae" },
  { slug: "luzon-peacock-swallowtail", sci: "Papilio chikae" },
  { slug: "homerus-swallowtail", sci: "Papilio homerus" },
  { slug: "eighty-eight-butterfly", sci: "Diaethria clymena" },
  { slug: "schaus-swallowtail", sci: "Papilio aristodemus" },
];

const report = [];
for (const item of ITEMS) {
  console.log(item.slug);
  const photos = await inatPhotos(item.sci);
  if (!photos.length) {
    console.log("  NO iNat photos found");
    report.push({ slug: item.slug, status: "missing" });
    await new Promise((r) => setTimeout(r, 1200));
    continue;
  }
  const pick = photos[0];
  const r = await downloadImage(pick.url);
  if (!r || !r.ok) {
    console.log("  download failed:", pick.url);
    report.push({ slug: item.slug, url: pick.url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 1200));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via iNat — ${pick.attribution}`);
  report.push({ slug: item.slug, url: pick.url, attribution: pick.attribution, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 1200));
}

writeFileSync("out/e45-butterflies-refetch3-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
