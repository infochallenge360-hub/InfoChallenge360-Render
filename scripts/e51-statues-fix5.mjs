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

async function categoryImages(category, limit = 10) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=${encodeURIComponent("Category:" + category)}&gcmtype=file&gcmlimit=${limit}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=900`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages);
}

const CATS = {
  "peter-the-great-statue-moscow": ["Monument to Peter the Great (Moscow)", "Peter the Great Monument (Moscow)"],
  "tear-of-grief": ["To the Struggle Against World Terrorism"],
  "ofuna-kannon": ["Ofuna Kannon"],
  "leonidas-monument-thermopylae": ["Leonidas Monument (Thermopylae)", "Monument of Leonidas"],
};

const manifest = [];
for (const [slug, cats] of Object.entries(CATS)) {
  console.log(`\n${slug}`);
  let idx = 0;
  for (const cat of cats) {
    const pages = await categoryImages(cat);
    console.log(`  category "${cat}": ${pages.length} files`);
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/png")) continue;
      const url = info.thumburl || info.url;
      const r = await fetchWithRetry(url);
      if (!r || !r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 5000) continue;
      const fname = `${slug}__cat${idx}.jpg`;
      writeFileSync(`${DEST}/${fname}`, buf);
      console.log(`    saved ${fname} <- ${p.title} (${buf.length}b)`);
      manifest.push({ slug, candidate: fname, title: p.title, url, extmetadata: info.extmetadata });
      idx++;
      if (idx >= 6) break;
      await new Promise((r2) => setTimeout(r2, 400));
    }
    if (idx >= 6) break;
    await new Promise((r2) => setTimeout(r2, 500));
  }
}
writeFileSync("out/e51-candidates-manifest4.json", JSON.stringify(manifest, null, 2));
console.log("\nDone.");
