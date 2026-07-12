// يسحب الزهور النادرة المتبقّية من بحث Wikimedia Commons (بالاسم العلمي) — للأنواع اللي ما لها صورة مقال ويكيبيديا.
import { writeFileSync, existsSync, statSync } from "node:fs";
import { FLOWERS } from "../src/Quiz/flowersData.js";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const valid = (b) => b.length >= 15000 && ((b[0] === 0xFF && b[1] === 0xD8) || (b[0] === 0x89 && b[1] === 0x50));

// slugs still missing a good Wikipedia image (kept old iNat) — refetch from Commons
const TARGETS = process.argv.slice(2);
const list = FLOWERS.filter((f) => TARGETS.includes(f.slug));

async function commons(query, slug) {
  const s = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200`;
  const r = await fetch(s, { headers: { "User-Agent": UA } });
  const t = await r.text(); if (t[0] !== "{") { return "RATE"; }
  const j = JSON.parse(t);
  const pages = j.query && j.query.pages ? Object.values(j.query.pages).sort((a, b) => (a.index || 0) - (b.index || 0)) : [];
  for (const p of pages) {
    const ii = p.imageinfo && p.imageinfo[0]; if (!ii || !/image\/(jpeg|png)/.test(ii.mime || "")) continue;
    if (/(illustration|drawing|botanical|herbarium|seed|leaf|distribution|map|diagram|poster|painting|print|artwork|\bart\b|stamp|coin|sketch|engraving|lithograph|waterhouse|\becho\b|myth|vanessa|butterfly|moth|\bbee\b|\bfly\b|insect|beetle|hoverfly|bombus|wasp|logo|label)/i.test(p.title)) continue;
    const rr = await fetch(ii.thumburl || ii.url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await rr.arrayBuffer());
    if (!valid(buf)) continue;
    writeFileSync(`public/flowers/${slug}.jpg`, buf);
    console.log(`OK ${slug} | ${p.title}`);
    return true;
  }
  return false;
}

for (const f of list) {
  let done = false;
  for (const q of [`${f.name} flower`, `${f.sci} flower bloom`, `${f.sci} inflorescence`, `${f.name}`]) {
    for (let a = 0; a < 3 && !done; a++) {
      const res = await commons(q, f.slug);
      if (res === "RATE") { await sleep(6000); continue; }
      done = res; if (!done) break;
    }
    if (done) break;
    await sleep(1500);
  }
  if (!done) console.log(`STILL MISSING ${f.slug} (${f.sci})`);
  await sleep(1200);
}
