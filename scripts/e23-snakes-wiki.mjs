import { writeFileSync } from "node:fs";
import { SNAKES } from "../src/Quiz/snakesData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact mohnajjar93@gmail.com)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TARGETS = process.argv.slice(2);
const list = TARGETS.length ? SNAKES.filter(b => TARGETS.includes(b.slug)) : SNAKES;
async function imageUrl(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } }); const t = await r.text(); if (t[0] !== "{") return "RATE";
  const p = Object.values(JSON.parse(t).query.pages)[0]; return p && p.thumbnail ? p.thumbnail.source : null;
}
async function dl(url, path) { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (!r.ok) return 0; const b = Buffer.from(await r.arrayBuffer()); if (b.length < 15000 || (b[0] !== 0xFF || b[1] !== 0xD8) && (b[0] !== 0x89 || b[1] !== 0x50)) return 0; writeFileSync(path, b); return b.length; }
const miss = [];
for (const b of list) {
  let done = 0;
  for (const title of [b.sci, b.name + " (snake)", b.name]) {
    for (let a = 0; a < 3 && !done; a++) { try { const u = await imageUrl(title); if (u === "RATE") { await sleep(3000); continue; } if (!u) break; done = await dl(u, `public/snakes/${b.slug}.jpg`); if (!done) await sleep(400); } catch { await sleep(500); } }
    if (done) break;
  }
  console.log((done ? "OK " : "MISS ") + b.slug); if (!done) miss.push(b.slug);
  await sleep(150);
}
if (miss.length) console.log("MISSING:", miss.join(","));
