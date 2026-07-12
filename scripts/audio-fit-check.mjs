// بوابة "ملاءمة الصوت للمونتاج" — تمسك أي صوت أطول من مكانه فينقطع فجأة.
// تقيس المدة الفعلية لكل نطق وتقارنها بالمقطع المخصص له في المحرّك (quizv2.jsx).
// لازم تبقى الثوابت هنا مطابقة لـ quizv2.jsx. لو غيّرت LT/HOLD هناك، غيّرها هنا.
// الاستخدام: node scripts/audio-fit-check.mjs <dataFile> <idKey> <prefix> <introVoName>
//   مثال: node scripts/audio-fit-check.mjs src/Quiz/logos4Data.js slug nm vo-intro-logo
import { readFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

// ==== ثوابت المحرّك (طابقها مع quizv2.jsx) ====
const FPS = 30;
const LT = { cold: 250, intro: 165, level: 85, check: 96, outro: 225 };
const HOLD = 90;
const NAME_VO_FROM = 6;      // النطق يبدأ بعد الكشف بـ6 فريم
const NAME_VO_CAP = 100;     // durationInFrames للنطق (cold + round)
const MARGIN = 0.10;         // هامش أمان بالثواني

// أقصى مدة مسموحة (ثانية) لكل نوع صوت
const slotSec = {
  intro: LT.intro / FPS,
  outro: LT.outro / FPS,
  level: LT.level / FPS,
  name: Math.min(NAME_VO_CAP, HOLD - NAME_VO_FROM) / FPS, // أصغر واحد يحكم
};

function wavDuration(path) {
  const b = readFileSync(path);
  let byteRate = 0, dataSize = 0, dataStart = 0, off = 12;
  while (off + 8 <= b.length) {
    const id = b.toString("ascii", off, off + 4);
    const sz = b.readUInt32LE(off + 4);
    if (id === "fmt ") byteRate = b.readUInt32LE(off + 8 + 8);
    if (id === "data") { dataStart = off + 8; dataSize = sz; break; }
    off += 8 + sz + (sz % 2);
  }
  if (!byteRate || !dataStart) return 0;
  // WAV مُدفّق (streamed): حجم data = 0xFFFFFFFF أو أكبر من الملف → احسب من البايتات الفعلية حتى النهاية
  if (dataSize === 0xFFFFFFFF || dataStart + dataSize > b.length) dataSize = b.length - dataStart;
  return dataSize / byteRate;
}

const [, , dataFile, idKey = "slug", prefix, introVo] = process.argv;
if (!dataFile || !prefix || !introVo) {
  console.log("usage: node audio-fit-check.mjs <dataFile> <idKey> <prefix> <introVoName>");
  process.exit(2);
}

const clipped = [];   // أصوات ستنقطع (خطأ قاتل)
const missing = [];
function check(kind, name, path) {
  if (!existsSync(path)) { missing.push(`${name} (مفقود: ${path})`); return; }
  const d = wavDuration(path);
  const limit = slotSec[kind];
  if (d > limit - MARGIN) clipped.push(`${name}: ${d.toFixed(2)}s > مسموح ${limit.toFixed(2)}s (${kind})`);
}

// 1) المقدّمة
check("intro", introVo, `public/sfx/${introVo}.wav`);
// 2) أصوات المستويات المشتركة + الخاتمة
for (const lv of ["easy", "medium", "hard", "impossible"]) check("level", `vo-${lv}-guy`, `public/sfx/vo-${lv}-guy.wav`);
check("outro", "vo-outro-guy", "public/sfx/vo-outro-guy.wav");
// 3) نطق كل عنصر (الاسم عند الكشف)
const mod = await import(pathToFileURL(dataFile).href);
const arr = Object.values(mod).filter(Array.isArray).sort((a, b) => b.length - a.length)[0];
for (const it of arr) check("name", `${prefix}-${it[idKey]}`, `public/sfx/${prefix}-${it[idKey]}.wav`);

console.log(`فحص الملاءمة: ${arr.length} نطق عنصر + مقدّمة + 4 مستويات + خاتمة.`);
console.log(`الحدود: intro ≤${slotSec.intro.toFixed(2)}s · level ≤${slotSec.level.toFixed(2)}s · name ≤${slotSec.name.toFixed(2)}s · outro ≤${slotSec.outro.toFixed(2)}s`);
if (missing.length) console.log(`\n❌ مفقودة (${missing.length}):\n  ` + missing.join("\n  "));
if (clipped.length) console.log(`\n❌ ستنقطع فجأة (${clipped.length}):\n  ` + clipped.join("\n  "));
if (!missing.length && !clipped.length) console.log("\n✅ كل الأصوات تدخل في مكانها بدون قص. آمن للرندر.");
process.exit(missing.length || clipped.length ? 1 : 0);
