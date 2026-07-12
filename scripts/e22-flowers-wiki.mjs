// يسحب صور الزهور من ويكيبيديا (صورة المقال = الزهرة المتفتّحة، أوثق بكثير من iNaturalist للزهور).
// title = الاسم العلمي أولًا (لا لبس)، ثم الاسم الشائع. concurrency 3 + retries. يستبدل الكل.
import { writeFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { FLOWERS } from "../src/Quiz/flowersData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact mohnajjar93@gmail.com)";
const DEST = "public/flowers";
mkdirSync(DEST, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function imageUrl(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const t = await r.text(); if (t[0] !== "{") return "RATE";
  const p = Object.values(JSON.parse(t).query.pages)[0];
  return p && p.thumbnail ? p.thumbnail.source : null;
}
async function dl(url, path) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return 0;
  const b = Buffer.from(await r.arrayBuffer());
  if (b.length < 15000 || !(b[0] === 0xFF && b[1] === 0xD8) && !(b[0] === 0x89 && b[1] === 0x50)) return 0;
  writeFileSync(path, b); return b.length;
}

const CONC = 3; let i = 0; const miss = [];
async function worker() {
  while (i < FLOWERS.length) {
    const f = FLOWERS[i++];
    const path = `${DEST}/${f.slug}.jpg`;
    let done = 0;
    for (const title of [f.sci, f.name]) {
      for (let a = 0; a < 3 && !done; a++) {
        try { const u = await imageUrl(title); if (u === "RATE") { await sleep(3000); continue; } if (!u) break; done = await dl(u, path); if (!done) await sleep(500); } catch { await sleep(600); }
      }
      if (done) break;
    }
    if (!done) miss.push(`${f.slug} (${f.sci} / ${f.name})`);
    await sleep(150);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log(`OK ${FLOWERS.length - miss.length}/${FLOWERS.length}`);
if (miss.length) console.log("MISSING:\n" + miss.join("\n"));
