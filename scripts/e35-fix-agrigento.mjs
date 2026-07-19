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

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
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

// The generic "Valley of the Temples" query kept mismatching to Bateshwar (India). Try the Italian
// name directly, which should hit the Agrigento (Sicily) archaeological park specifically.
const titles = ["Valle dei Templi", "Valley of the Temples, Agrigento", "Temple of Concordia"];
let found = null;
for (const t of titles) {
  const url = await pageImage(t);
  if (url) { found = { url: toThumbUrl(url), source: `pageimages:${t}` }; break; }
  await new Promise((r) => setTimeout(r, 1000));
}
if (!found) {
  const candidates = await commonsSearch("Valle dei Templi Agrigento temple");
  const pick = candidates?.find((c) => /agrigento|concordia|templi|valle/i.test(c.title));
  if (pick) found = { url: pick.info.thumburl || pick.info.url, source: pick.title };
}
console.log("resolved:", found);
if (found) {
  const r = await fetchWithRetry(found.url);
  if (r && r.ok) {
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 2000) {
      writeFileSync("public/ruins/agrigento-valley-of-temples.jpg", buf);
      console.log(`OK (${buf.length} bytes) via ${found.source}`);
    } else console.log("file too small");
  } else console.log("download failed", r?.status);
} else console.log("NOT FOUND");
