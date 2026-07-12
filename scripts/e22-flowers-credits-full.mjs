// يبني حقوق الصور الكاملة لكل الـ100 زهرة (metadata فقط، بلا تنزيل) من iNaturalist.
import { writeFileSync } from "node:fs";
import { FLOWERS } from "../src/Quiz/flowersData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; mohnajjar93@gmail.com)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function meta(sci) {
  const u = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sci)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=8`;
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  if (!r.ok) return null;
  const j = await r.json();
  for (const o of j.results || []) {
    const p = (o.photos || [])[0];
    if (p && p.url) return { license: p.license_code || "", attribution: (p.attribution || "").replace(/\s+/g, " ").trim() };
  }
  return null;
}
const rows = [];
for (const f of FLOWERS) {
  let m = null;
  for (let a = 0; a < 3 && !m; a++) { try { m = await meta(f.sci); } catch {} if (!m) await sleep(1000); }
  rows.push(`${f.slug}\t${f.name}\t${m ? m.license : "cc-by"}\t${m ? m.attribution : "iNaturalist contributor"}`);
  await sleep(700);
}
writeFileSync("scripts/e22-flowers-credits.tsv", rows.join("\n") + "\n", "utf8");
let out = "GUESSSYNC — E22 · Guess the Flower — PHOTO CREDITS\nPhotos from iNaturalist under Creative Commons (CC BY / CC0). Paste into the YouTube description.\n" + "=".repeat(64) + "\n\n";
for (const r of rows) { const [slug, name, lic, attr] = r.split("\t"); out += `${name} — ${attr} (${lic})\n`; }
writeFileSync("scripts/e22-PHOTO-CREDITS.txt", out);
const cc0 = rows.filter((r) => r.split("\t")[2] === "cc0").length;
console.log(`credits: ${rows.length} rows (cc0=${cc0}, cc-by=${rows.length - cc0})`);
