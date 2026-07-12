import { writeFileSync } from "node:fs";
import { SEA } from "../src/Quiz/seaData.js";
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
for (const b of SEA) {
  let m = null;
  for (let a = 0; a < 3 && !m; a++) { try { m = await meta(b.sci); } catch {} if (!m) await sleep(1000); }
  rows.push({ slug: b.slug, name: b.name, license: m?.license || "?", attribution: m?.attribution || "?" });
  await sleep(800);
}
// TSV audit trail
writeFileSync("scripts/e20-sea-credits.tsv", rows.map((r) => `${r.slug}\t${r.name}\t${r.license}\t${r.attribution}`).join("\n") + "\n", "utf8");
// human-readable attribution block for the video description (only CC-BY need crediting; CC0 optional)
const byRows = rows.filter((r) => r.license && r.license.startsWith("cc-by"));
const block = byRows.map((r) => `${r.name}: ${r.attribution}`).join("\n");
writeFileSync("scripts/e20-sea-attribution-block.txt", `PHOTO CREDITS (iNaturalist, CC BY) — include in video description:\n\n${block}\n`, "utf8");
const cc0 = rows.filter((r) => r.license === "cc0").length;
console.log(`rows ${rows.length}, cc0 ${cc0}, cc-by ${byRows.length}, unknown ${rows.filter((r) => r.license === "?").length}`);
