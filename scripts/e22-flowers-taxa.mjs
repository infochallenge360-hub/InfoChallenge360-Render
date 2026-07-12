// يسحب صور الزهور من صور النوع المنسّقة (taxon_photos) في iNaturalist — أنظف من صور المشاهدات العشوائية.
// CC0/CC-BY/CC-BY-SA فقط. يتخطى الموجود الصالح إلا إذا FORCE=1.
import { writeFileSync, statSync } from "node:fs";
import { FLOWERS } from "../src/Quiz/flowersData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; mohnajjar93@gmail.com)";
const DEST = "public/flowers";
const FORCE = process.env.FORCE === "1";
const OK_LIC = new Set(["cc0", "cc-by", "cc-by-sa"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const have = (s) => { try { return statSync(`${DEST}/${s}.jpg`).size >= 15000; } catch { return false; } };

async function taxonId(sci) {
  const r = await fetch(`https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(sci)}&per_page=1`, { headers: { "User-Agent": UA } });
  if (!r.ok) return null;
  const j = await r.json();
  return (j.results && j.results[0]) ? j.results[0].id : null;
}
async function bestTaxonPhoto(id) {
  const r = await fetch(`https://api.inaturalist.org/v1/taxa/${id}`, { headers: { "User-Agent": UA } });
  if (!r.ok) return null;
  const j = await r.json();
  const t = (j.results && j.results[0]) || {};
  const photos = (t.taxon_photos || []).map((tp) => tp.photo).filter(Boolean);
  for (const p of photos) {
    if (OK_LIC.has((p.license_code || "").toLowerCase()) && p.url) {
      const url = p.url.replace(/\/(square|small|medium|large)\.(jpe?g|png|gif)/i, "/original.$2");
      return { url, license: p.license_code, attribution: (p.attribution || "").replace(/\s+/g, " ").trim() };
    }
  }
  return null;
}
async function dl(url, path) {
  for (let a = 0; a < 3; a++) {
    try { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (r.ok) { const b = Buffer.from(await r.arrayBuffer()); if (b.length >= 15000 && b[0] === 0xFF && b[1] === 0xD8) { writeFileSync(path, b); return b.length; } } } catch {}
    await sleep(500 + a * 400);
  }
  return 0;
}

const credits = [], miss = [];
let ok = 0;
for (const f of FLOWERS) {
  if (!FORCE && have(f.slug)) { ok++; continue; }
  let done = 0, meta = null;
  for (let a = 0; a < 2 && !done; a++) {
    try { const id = await taxonId(f.sci); if (id) { meta = await bestTaxonPhoto(id); if (meta) done = await dl(meta.url, `${DEST}/${f.slug}.jpg`); } } catch {}
    if (!done) await sleep(1000);
  }
  if (done) { ok++; credits.push(`${f.slug}\t${f.name}\t${meta.license}\t${meta.attribution}`); }
  else miss.push(`${f.slug} (${f.sci})`);
  await sleep(700);
}
if (credits.length) writeFileSync("scripts/e22-flowers-credits.tsv", credits.join("\n") + "\n", "utf8");
console.log(`OK ${ok}/${FLOWERS.length}`);
if (miss.length) console.log("MISSING:\n" + miss.join("\n"));
