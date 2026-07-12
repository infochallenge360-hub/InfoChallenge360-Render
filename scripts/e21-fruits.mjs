import { writeFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { FRUITS } from "../src/Quiz/fruitsData.js";

const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact mohnajjar93@gmail.com)";
const DEST = "public/fruits";
mkdirSync(DEST, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function imageUrl(wiki) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(wiki)}`;
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
const CONC = 3;
let i = 0;
async function worker() {
  while (i < FRUITS.length) {
    const p = FRUITS[i++];
    const path = `${DEST}/${p.slug}.jpg`;
    if (existsSync(path) && statSync(path).size > 15000) { results.push({ slug: p.slug, status: "OK", size: statSync(path).size, cached: true }); continue; }
    let done = false;
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
      try {
        const url = await imageUrl(p.wiki);
        if (!url) { if (attempt === 2) results.push({ slug: p.slug, status: "NO_IMAGE", wiki: p.wiki }); await sleep(400); continue; }
        const size = await download(url, path);
        if (size < 15000) { if (attempt === 2) results.push({ slug: p.slug, status: "TINY", size, url }); await sleep(500); continue; }
        results.push({ slug: p.slug, status: "OK", size, url }); done = true;
      } catch (e) {
        if (attempt === 2) results.push({ slug: p.slug, status: "ERR", err: String(e), wiki: p.wiki });
        await sleep(600);
      }
    }
    await sleep(120);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

const ok = results.filter((r) => r.status === "OK");
const bad = results.filter((r) => r.status !== "OK");
console.log(`OK ${ok.length} / ${FRUITS.length}`);
if (bad.length) { console.log("PROBLEMS:"); for (const b of bad) console.log(` - ${b.slug}: ${b.status} ${b.wiki || b.size || ""} ${b.err || ""}`); }
writeFileSync("scripts/e21-fetch-report.json", JSON.stringify(results, null, 2), "utf8");
