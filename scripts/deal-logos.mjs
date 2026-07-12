// يوزّع مجمّع الشعارات المُقيّم على 3 حلقات، كل وحدة 25/مستوى تمتد سهل←مستحيل بدون تكرار.
// المصدر: out/logo-scores.json (مصفوفة {slug,name,score,hasImg,hasVo} مرتّبة تنازلي).
// يكتب: logosData.js (E01) · logos2Data.js (E05) · logos3Data.js (E08).
import { readFileSync, writeFileSync } from "node:fs";

const pool = JSON.parse(readFileSync("out/logo-scores.json", "utf8"))
  .filter(x => x.hasImg && x.hasVo)
  .sort((a, b) => b.score - a.score);

const N = 3, PER = 25;                 // 3 حلقات × 25/مستوى
const need = N * PER;                  // 75 لكل مستوى
// نطاقات مطلقة: سهل = الأعلى، مستحيل = الأدنى (الذيل الغامض للفليكس)
const bands = {
  easy: pool.slice(0, need),
  medium: pool.slice(need, need * 2),
  hard: pool.slice(need * 2, need * 3),
  impossible: pool.slice(-need),       // آخر 75 = الأغمض
};

// توزيع round-robin داخل كل نطاق: الحلقة j تاخذ العناصر index%N==j (توزيع متساوٍ بالرُتبة)
const eps = Array.from({ length: N }, () => ({ easy: [], medium: [], hard: [], impossible: [] }));
for (const lv of ["easy", "medium", "hard", "impossible"])
  bands[lv].forEach((it, i) => eps[i % N][lv].push(it));

const files = [
  { name: "LOGOS", file: "logosData.js", ep: "E01" },
  { name: "LOGOS2", file: "logos2Data.js", ep: "E05" },
  { name: "LOGOS3", file: "logos3Data.js", ep: "E08" },
];

const seen = new Set(); let dup = 0;
eps.forEach((ep, i) => {
  const rows = [];
  for (const lv of ["easy", "medium", "hard", "impossible"]) {
    rows.push(`  // ===== ${lv.toUpperCase()} (${ep[lv].length}) =====`);
    for (const it of ep[lv]) {
      if (seen.has(it.slug)) dup++; seen.add(it.slug);
      rows.push(`  { slug: ${JSON.stringify(it.slug)}, name: ${JSON.stringify(it.name)}, level: "${lv}" },`);
    }
  }
  const f = files[i];
  const body = `// ${f.ep} «Guess the Logo» — GuessSync · 100 شعار · صعوبة مطلقة (سهل ~عالمي ← مستحيل <3%). image: logos/<slug>.svg | VO: sfx/nm-<slug>.wav\nexport const ${f.name} = [\n${rows.join("\n")}\n];\n`;
  writeFileSync("src/Quiz/" + f.file, body, "utf8");
  const counts = ["easy", "medium", "hard", "impossible"].map(lv => ep[lv].length).join("/");
  const sEasy = ep.easy.map(x => x.score);
  const sImp = ep.impossible.map(x => x.score);
  console.log(`${f.ep} → ${f.file}: [${counts}] · easy score ${Math.min(...sEasy)}-${Math.max(...sEasy)} · impossible ${Math.min(...sImp)}-${Math.max(...sImp)}`);
});
console.log(`\nقُصّ من مجمّع ${pool.length}. تكرار بين الحلقات: ${dup}. عناصر غير مستخدمة: ${pool.length - N * PER * 4}.`);
console.log("عيّنة سهل E01:", eps[0].easy.slice(0, 6).map(x => x.name).join(", "));
console.log("عيّنة مستحيل E01:", eps[0].impossible.slice(0, 6).map(x => x.name).join(", "));
