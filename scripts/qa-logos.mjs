// مراقب آلي لحلقة الشعارات — يفحص الأصول والقواعد قبل الرندر
import { LOGOS } from "../src/Quiz/logosData.js";
import { readFileSync, existsSync } from "node:fs";

const issues = [];
const warn = (m) => issues.push("⚠️  " + m);
const err = (m) => issues.push("❌ " + m);

// 1) عدد المستويات 25×4
const counts = {};
for (const l of LOGOS) counts[l.level] = (counts[l.level] || 0) + 1;
for (const lv of ["easy", "medium", "hard", "impossible"])
  if (counts[lv] !== 25) err(`level ${lv} has ${counts[lv] || 0} (expected 25)`);
if (LOGOS.length !== 100) err(`total ${LOGOS.length} (expected 100)`);

// 2) تكرار
const seenSlug = new Set(), seenName = new Set();
for (const l of LOGOS) {
  if (seenSlug.has(l.slug)) err(`duplicate slug: ${l.slug}`);
  if (seenName.has(l.name.toLowerCase())) err(`duplicate name: ${l.name}`);
  seenSlug.add(l.slug); seenName.add(l.name.toLowerCase());
}

// 3) لا حروف عربية في الأسماء (الشاشة إنجليزي فقط)
const arabic = /[؀-ۿ]/;
for (const l of LOGOS) if (arabic.test(l.name)) err(`Arabic text in name: ${l.name}`);

// 4) لا إسرائيل (احترازي)
for (const l of LOGOS) if (/isra|israel/i.test(l.slug + " " + l.name)) err(`Israel reference: ${l.name}`);

// 5) كل شعار له ملف SVG صالح
for (const l of LOGOS) {
  const p = `public/logos/${l.slug}.svg`;
  if (!existsSync(p)) { err(`missing SVG: ${l.slug}.svg`); continue; }
  const c = readFileSync(p, "utf8");
  if (!c.trimStart().startsWith("<svg")) err(`invalid SVG: ${l.slug}.svg`);
  if (c.length < 80) warn(`tiny SVG (check): ${l.slug}.svg (${c.length}b)`);
}

// 6) الحقول موجودة
for (const l of LOGOS) {
  if (!l.slug || !l.name || !l.level) err(`missing field in: ${JSON.stringify(l)}`);
  if (!["easy", "medium", "hard", "impossible"].includes(l.level)) err(`bad level: ${l.name} → ${l.level}`);
}

console.log(`QA — Guess the Logo (${LOGOS.length} items)`);
console.log(`levels: ${JSON.stringify(counts)}`);
if (issues.length === 0) console.log("\n✅ PASS — لا أخطاء. جاهز للطبقة 2 (مراجعة الحقائق).");
else { console.log(`\nfound ${issues.length} issue(s):`); issues.forEach((i) => console.log("  " + i)); process.exit(1); }
