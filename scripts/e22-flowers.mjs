import { writeFileSync, statSync } from "node:fs";
import { FLOWERS } from "../src/Quiz/flowersData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; mohnajjar93@gmail.com)";
const DEST = "public/flowers";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const have = (s) => { try { return statSync(`${DEST}/${s}.jpg`).size >= 15000; } catch { return false; } };

async function bestPhoto(sci) {
  const u = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sci)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=8`;
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  if (!r.ok) return null;
  const j = await r.json();
  for (const o of j.results || []) {
    const p = (o.photos || [])[0];
    if (p && p.url) {
      const url = p.url.replace(/\/(square|small|medium|large)\.(jpe?g|png|gif)/i, "/original.$2");
      return { url, license: p.license_code || "", attribution: (p.attribution || "").replace(/\s+/g, " ").trim() };
    }
  }
  return null;
}
async function dl(url, path) {
  for (let a = 0; a < 3; a++) {
    try { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (r.ok) { const b = Buffer.from(await r.arrayBuffer()); if (b.length >= 15000) { writeFileSync(path, b); return b.length; } } } catch {}
    await sleep(500 + a * 500);
  }
  return 0;
}

const credits = [];
const miss = [];
let ok = 0;
for (const b of FLOWERS) {
  if (have(b.slug)) { ok++; continue; }
  let done = 0, meta = null;
  for (let a = 0; a < 3 && !done; a++) {
    try { meta = await bestPhoto(b.sci); if (meta) done = await dl(meta.url, `${DEST}/${b.slug}.jpg`); } catch (e) { /* network hiccup, retry */ }
    if (!done) await sleep(1200);
  }
  if (done) { ok++; credits.push(`${b.slug}\t${b.name}\t${meta.license}\t${meta.attribution}`); }
  else { miss.push(`${b.slug} (${b.sci})`); }
  await sleep(900); // ~1/sec etiquette
}
writeFileSync("scripts/e22-flowers-credits.tsv", credits.join("\n") + "\n", "utf8");
console.log(`OK ${ok}/${FLOWERS.length}`);
if (miss.length) console.log("MISSING (need fallback):\n" + miss.join("\n"));
// license summary
const cc0 = credits.filter((c) => c.split("\t")[2] === "cc0").length;
console.log(`licenses: cc0=${cc0}, cc-by=${credits.length - cc0} (cc-by need attribution in description)`);
