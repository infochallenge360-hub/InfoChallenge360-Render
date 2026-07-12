import { writeFileSync } from "node:fs";
import { PAINTINGS } from "../src/Quiz/paintingsData.js";

const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact mohnajjar93@gmail.com)";
const DEST = "public/paintings";

async function imageUrl(wiki) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(wiki)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const pages = j.query && j.query.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0];
  return p && p.thumbnail ? p.thumbnail.source : null;
}

async function download(url, path) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return 0;
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(path, buf);
  return buf.length;
}

const results = [];
const CONC = 6;
let i = 0;
async function worker() {
  while (i < PAINTINGS.length) {
    const p = PAINTINGS[i++];
    try {
      const url = await imageUrl(p.wiki);
      if (!url) { results.push({ slug: p.slug, status: "NO_IMAGE", wiki: p.wiki }); continue; }
      const size = await download(url, `${DEST}/${p.slug}.jpg`);
      results.push({ slug: p.slug, status: size < 15000 ? "TINY" : "OK", size, url });
    } catch (e) {
      results.push({ slug: p.slug, status: "ERR", err: String(e), wiki: p.wiki });
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

const ok = results.filter((r) => r.status === "OK");
const bad = results.filter((r) => r.status !== "OK");
console.log(`OK ${ok.length} / ${PAINTINGS.length}`);
if (bad.length) { console.log("PROBLEMS:"); for (const b of bad) console.log(` - ${b.slug}: ${b.status} ${b.wiki || b.size || ""} ${b.err || ""}`); }
writeFileSync("scripts/e18-fetch-report.json", JSON.stringify(results, null, 2), "utf8");
