import { writeFileSync, statSync } from "node:fs";
import { DINOS } from "../src/Quiz/dinosData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; mohnajjar93@gmail.com)";
const DEST = "public/dinos";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const have = (s) => { try { return statSync(`${DEST}/${s}.jpg`).size >= 15000; } catch { return false; } };

async function imageUrl(wiki) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(wiki)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const p = j.query && j.query.pages && Object.values(j.query.pages)[0];
  return p && p.thumbnail ? p.thumbnail.source : null;
}
async function dl(url, path) {
  for (let a = 0; a < 4; a++) {
    try { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (r.ok) { const b = Buffer.from(await r.arrayBuffer()); if (b.length >= 15000) { writeFileSync(path, b); return b.length; } } } catch {}
    await sleep(500 + a * 600);
  }
  return 0;
}
const todo = DINOS.filter((d) => !have(d.slug));
console.log(`need ${todo.length}/${DINOS.length}`);
const bad = []; let done = 0; const CONC = 3; let i = 0;
async function worker() {
  while (i < todo.length) {
    const d = todo[i++];
    let ok = 0;
    for (let a = 0; a < 3 && !ok; a++) { try { const u = await imageUrl(d.wiki); if (u) ok = await dl(u, `${DEST}/${d.slug}.jpg`); } catch {} if (!ok) await sleep(600); }
    if (ok) done++; else bad.push(`${d.slug} (${d.wiki})`);
    await sleep(250);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log(`fixed ${done}, missing ${bad.length}` + (bad.length ? `\nMISSING:\n${bad.join("\n")}` : ""));
