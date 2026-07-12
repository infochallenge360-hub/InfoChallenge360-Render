// E12 «Guess the Country by Shape 2» — باقي الـ100 دولة (غير E09) · خرائط mapsicon · صوت fl معاد
// تصنيف: مستوى العلم كبديل لصعوبة الشكل (الدول المشهورة شكلها وعلمها معروفان عادة).
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { FLAGS } from "../src/Quiz/flagsData.js";
import { FLAGS2 } from "../src/Quiz/flags2Data.js";
import { SHAPES1 } from "../src/Quiz/shapes1Data.js";

const usedShapes = new Set(SHAPES1.map((s) => s.iso));
const all = [...FLAGS, ...FLAGS2].filter((f) => !usedShapes.has(f.iso));

await mkdir("public/maps", { recursive: true });
async function mapOk(iso) {
  if (existsSync(`public/maps/${iso}.svg`)) return existsSync(`public/sfx/fl-${iso}.wav`);
  try {
    const r = await fetch(`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${iso}/vector.svg`);
    const t = await r.text();
    if (r.ok && t.includes("<svg") && existsSync(`public/sfx/fl-${iso}.wav`)) { await writeFile(`public/maps/${iso}.svg`, t, "utf8"); return true; }
  } catch {}
  return false;
}

const final = [];
for (const level of ["easy", "medium", "hard", "impossible"]) {
  let kept = 0;
  for (const f of all.filter((x) => x.level === level)) {
    if (kept >= 25) break;
    if (await mapOk(f.iso)) { final.push({ iso: f.iso, name: f.name, level }); kept++; }
  }
  console.log(`${level}: ${kept}`);
}
console.log(`TOTAL ${final.length}`);
if (final.length >= 80) {
  const body = final.map((c) => `  { iso: ${JSON.stringify(c.iso)}, name: ${JSON.stringify(c.name)}, level: ${JSON.stringify(c.level)} },`).join("\n");
  await writeFile("src/Quiz/shapes2Data.js", `// «Guess the Country by Shape 2» — GuessSync · E12 · باقي الدول · خرائط mapsicon · صوت fl معاد\nexport const SHAPES2 = [\n${body}\n];\n`, "utf8");
  console.log("→ wrote src/Quiz/shapes2Data.js (" + final.length + ")");
} else console.log("أقل من 90 — نراجع");
