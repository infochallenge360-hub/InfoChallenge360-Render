import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/reptiles/_candidates2";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function inatPhotos(sciName, n = 6) {
  const api = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sciName)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=30`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const out = [];
  for (const obs of j.results || []) {
    for (const photo of obs.photos || []) {
      if (photo.url) {
        const orig = photo.url.replace(/square\.(jpe?g|png)/i, `original.$1`);
        out.push({ url: orig, attribution: photo.attribution, license: photo.license_code, openData: photo.url.includes("inaturalist-open-data") });
      }
      if (out.length >= n * 3) break;
    }
    if (out.length >= n * 3) break;
  }
  out.sort((a, b) => (b.openData - a.openData));
  return out.slice(0, n);
}

async function wikiImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page.thumbnail ? page.thumbnail.source : null;
}

const TARGETS = {
  "boa-constrictor": "Boa constrictor",
  "feas-viper": "Azemiops feae",
  "tokay-gecko": "Gekko gecko",
};

for (const [slug, sci] of Object.entries(TARGETS)) {
  console.log(`\n=== ${slug} (iNat: ${sci}) ===`);
  const photos = await inatPhotos(sci, 6);
  let i = 0;
  for (const p of photos) {
    i++;
    const dest = `${DEST}/${slug}-inat${i}.jpg`;
    const r = await fetchWithRetry(p.url);
    if (!r || !r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 8000) continue;
    writeFileSync(dest, buf);
    console.log(`  [inat${i}] license=${p.license} -> ${dest} (${buf.length}b)`);
    await new Promise((res) => setTimeout(res, 300));
  }
  if (!photos.length) console.log("  no iNat photos");
  // also grab wiki lead as a candidate
  const wurl = await wikiImage(sci);
  if (wurl) {
    const dest = `${DEST}/${slug}-wiki1.jpg`;
    const r = await fetchWithRetry(wurl);
    if (r && r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length >= 8000) {
        writeFileSync(dest, buf);
        console.log(`  [wiki1] -> ${dest} (${buf.length}b)`);
      }
    }
  }
  await new Promise((res) => setTimeout(res, 1000));
}
console.log("\nDone.");
