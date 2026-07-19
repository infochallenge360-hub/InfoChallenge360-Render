import { writeFileSync } from "node:fs";
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

async function fetchWithRetry(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 10000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
}

function toThumbUrl(url, width = 1280) {
  if (url.includes("/thumb/")) return url;
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, base, d1, d2, filename] = m;
  return `${base}/thumb/${d1}/${d2}/${filename}/${width}px-${filename}`;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&iiurlwidth=1280`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  return Object.values(j.query.pages)
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter((p) => p.info && (p.info.mime === "image/jpeg" || p.info.mime === "image/png"));
}

async function tryDownload(slug, candidates, keywordFilter) {
  for (const c of candidates || []) {
    if (keywordFilter && !keywordFilter.test(c.title)) continue;
    const url = toThumbUrl(c.info.thumburl || c.info.url);
    const r = await fetchWithRetry(url);
    if (r && r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > 20000) {
        writeFileSync(`public/ruins/${slug}.jpg`, buf);
        console.log(`${slug}: OK (${buf.length} bytes) via ${c.title}`);
        return true;
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

// loulan-ruins: prior fetch was a close-up museum wood-carving fragment, not a site photo.
const loulanCandidates = await commonsSearch("Loulan ruins desert archaeological site");
console.log("loulan candidates:", loulanCandidates?.map((c) => c.title));
let ok = await tryDownload("loulan-ruins", loulanCandidates, /loulan|ruin|desert|site/i);
if (!ok) {
  const alt = await commonsSearch("Lop Nur ancient city ruins");
  console.log("loulan alt candidates:", alt?.map((c) => c.title));
  ok = await tryDownload("loulan-ruins", alt);
}
console.log("loulan-ruins final:", ok ? "FIXED" : "STILL WRONG/MISSING");

await new Promise((r) => setTimeout(r, 1500));

// byblos: prior fetch was the modern town skyline, not the ancient Phoenician archaeological site.
const byblosCandidates = await commonsSearch("Byblos archaeological site ruins Phoenician");
console.log("byblos candidates:", byblosCandidates?.map((c) => c.title));
let ok2 = await tryDownload("byblos", byblosCandidates, /ruin|site|temple|obelisk|crusader|castle|excavation|archaeological/i);
if (!ok2) {
  const alt2 = await commonsSearch("Byblos Roman theatre ruins");
  console.log("byblos alt candidates:", alt2?.map((c) => c.title));
  ok2 = await tryDownload("byblos", alt2);
}
console.log("byblos final:", ok2 ? "FIXED" : "STILL WRONG/MISSING");
