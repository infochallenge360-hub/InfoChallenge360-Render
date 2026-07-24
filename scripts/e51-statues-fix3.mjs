import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "GuessSyncQuizBot/1.0 (educational quiz)";
const DEST = "public/statues/_candidates";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
}
async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}
async function commonsSearch(query, limit = 6) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=900`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages);
}

const QUERIES = {
  "leonidas-monument-thermopylae": ["Leonidas monument Thermopylae bronze", "Thermopylae Leonidas statue spear shield modern"],
  "peter-the-great-statue-moscow": ["Peter the Great monument Moscow 98 meters", "Tsereteli Peter statue Moscow riverside close"],
  "tear-of-grief": ["Tear of Grief monument", "To the Struggle Against World Terrorism sculpture", "Bayonne New Jersey 9/11 memorial Tsereteli"],
  "ofuna-kannon": ["Ofuna Kannon close up face statue", "Ofuna Kannon Bodhisattva statue front"],
};

const manifest = [];
for (const [slug, queries] of Object.entries(QUERIES)) {
  console.log(`\n${slug}`);
  let idx = 0;
  for (const q of queries) {
    const pages = await commonsSearch(q);
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/png")) continue;
      const url = info.thumburl || info.url;
      const r = await fetchWithRetry(url);
      if (!r || !r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 5000) continue;
      const fname = `${slug}__${idx}.jpg`;
      writeFileSync(`${DEST}/${fname}`, buf);
      console.log(`  saved ${fname} <- ${p.title} (${buf.length}b)`);
      manifest.push({ slug, candidate: fname, title: p.title, url, extmetadata: info.extmetadata });
      idx++;
      if (idx >= 5) break;
      await new Promise((r2) => setTimeout(r2, 400));
    }
    if (idx >= 5) break;
    await new Promise((r2) => setTimeout(r2, 500));
  }
}
writeFileSync("out/e51-candidates-manifest2.json", JSON.stringify(manifest, null, 2));
console.log("\nDone.");
