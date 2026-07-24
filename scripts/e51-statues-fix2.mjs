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

async function commonsSearch(query, limit = 6) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=900`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages);
}

const QUERIES = {
  "charging-bull": "Charging Bull bronze statue Manhattan",
  "alyosha-monument-plovdiv": "Alyosha statue Bulgaria soldier",
  "leonidas-monument-thermopylae": "Leonidas statue Sparta modern bronze monument",
  "peter-the-great-statue-moscow": "Peter I monument Moscow Tsereteli ship sculpture",
  "golden-buddha-wat-traimit": "Wat Traimitr golden buddha statue",
  "ofuna-kannon": "Ofuna Kannon statue",
  "skanderbeg-statue-tirana": "Skanderbeg statue horse",
  "tear-of-grief": "Tear of Grief Bayonne sculpture",
};

const manifest = [];
for (const [slug, q] of Object.entries(QUERIES)) {
  console.log(`\n${slug}: ${q}`);
  const pages = await commonsSearch(q);
  let idx = 0;
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
    if (idx >= 4) break;
    await new Promise((r2) => setTimeout(r2, 400));
  }
  await new Promise((r2) => setTimeout(r2, 500));
}
writeFileSync("out/e51-candidates-manifest.json", JSON.stringify(manifest, null, 2));
console.log("\nDone, manifest written.");
