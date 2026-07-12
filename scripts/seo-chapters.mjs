// يحسب فصول SEO (chapter timestamps) الحقيقية من توقيت المحرّك — يمنع خطأ "X:XX" و"3 ثواني".
// الثوابت هنا لازم تطابق quizv2.jsx. الاستخدام:
//   node scripts/seo-chapters.mjs <dataFile.js>
//   مثال: node scripts/seo-chapters.mjs src/Quiz/logos4Data.js
import { pathToFileURL } from "node:url";

// ==== ثوابت المحرّك (طابقها مع quizv2.jsx) ====
const FPS = 30;
const LT = { cold: 250, intro: 165, level: 85, check: 96, outro: 225 };
const HOLD = 90;
const TIER_REVEAL = { easy: 180, medium: 180, hard: 180, impossible: 180 };
const roundDur = (l) => TIER_REVEAL[l] + HOLD;
const TIMER_SEC = { easy: 6, medium: 6, hard: 6, impossible: 6 };

const ts = (fr) => { const s = Math.floor(fr / FPS); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

const [, , dataFile] = process.argv;
if (!dataFile) { console.log("usage: node seo-chapters.mjs <dataFile.js>"); process.exit(2); }
const mod = await import(pathToFileURL(dataFile).href);
const items = Object.values(mod).filter(Array.isArray).sort((a, b) => b.length - a.length)[0];

let f = 0;
f += LT.cold; f += LT.intro;                 // cold-open + intro
let last = null, num = 0;
const marks = {};
for (const it of items) {
  if (it.level !== last) { marks[it.level] = f; f += LT.level; last = it.level; }
  num += 1; f += roundDur(it.level);
  if (num === 25 || num === 50 || num === 75) f += LT.check;
}
const outroAt = f;
const total = f + LT.outro;

console.log("— فصول SEO (انسخها) —");
console.log(`0:00  Intro`);
for (const lv of ["easy", "medium", "hard", "impossible"]) {
  if (marks[lv] != null) console.log(`${ts(marks[lv])}  ${lv.toUpperCase()} (${TIMER_SEC[lv]}s each)`);
}
console.log(`${ts(outroAt)}  Your final score`);
console.log(`\nإجمالي المدة: ${ts(total)} (${total} فريم)`);
console.log(`نص المؤقّت الصحيح: "the timer counts down — 6 seconds every question" (لا تكتب "3 seconds" أو "7 seconds").`);
