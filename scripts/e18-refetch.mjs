import { writeFileSync, statSync } from "node:fs";
import { PAINTINGS } from "../src/Quiz/paintingsData.js";

const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact mohnajjar93@gmail.com)";
const DEST = "public/paintings";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function have(slug) { try { return statSync(`${DEST}/${slug}.jpg`).size >= 15000; } catch { return false; } }

async function imageUrl(wiki) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(wiki)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const p = j.query && j.query.pages && Object.values(j.query.pages)[0];
  return p && p.thumbnail ? p.thumbnail.source : null;
}
async function dl(url, path) {
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.ok) { const b = Buffer.from(await r.arrayBuffer()); if (b.length >= 15000) { writeFileSync(path, b); return b.length; } }
    } catch {}
    await sleep(500 + a * 700);
  }
  return 0;
}

const todo = PAINTINGS.filter((p) => !have(p.slug));
console.log(`need ${todo.length} of ${PAINTINGS.length}`);
const bad = [];
let done = 0;
const CONC = 3;
let i = 0;
async function worker() {
  while (i < todo.length) {
    const p = todo[i++];
    let ok = 0;
    for (let a = 0; a < 3 && !ok; a++) {
      try { const url = await imageUrl(p.wiki); if (url) ok = await dl(url, `${DEST}/${p.slug}.jpg`); } catch {}
      if (!ok) await sleep(600);
    }
    if (ok) done++; else bad.push(`${p.slug} (${p.wiki})`);
    await sleep(250);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log(`fixed ${done}, still failing ${bad.length}`);
if (bad.length) console.log("STILL BAD:\n" + bad.join("\n"));
