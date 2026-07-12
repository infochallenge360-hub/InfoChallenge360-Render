import { writeFileSync, statSync, existsSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
// slug -> wiki title to try (may differ from data to get a cleaner whole-food photo)
const ITEMS = [
  ["asparagus", "Asparagus"],
  ["cupuacu", "Cupuaçu"],
  ["longan", "Longan"],
  ["feijoa", "Feijoa"],
  ["loquat", "Loquat"],
  ["salsify", "Salsify"],          // genus article has whole-root photos better than the species flower article
  ["chayote", "Chayote"],
  ["sunchoke", "Jerusalem artichoke"],
];
async function pageimage(wiki) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(wiki)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const p = Object.values(j.query.pages)[0];
  return p && p.thumbnail ? p.thumbnail.source : null;
}
for (const [slug, wiki] of ITEMS) {
  try {
    const url = await pageimage(wiki);
    if (!url) { console.log(`${slug}: NO_PAGEIMAGE (${wiki})`); continue; }
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 15000) { console.log(`${slug}: TINY ${buf.length} ${url}`); continue; }
    writeFileSync(`public/fruits/${slug}.jpg`, buf);
    console.log(`${slug}: OK ${buf.length} | ${url}`);
  } catch (e) { console.log(`${slug}: ERR ${e}`); }
  await new Promise((r) => setTimeout(r, 300));
}
