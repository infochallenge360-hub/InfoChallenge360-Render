// يفحص اكتمال أصوات النطق (يمسك المقطوعة). الاستخدام:
//   node check-vo-durations.mjs ./src/Quiz/logos4Data.js slug name nm
import { readFileSync, existsSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";

const [, , modFile, idKey, textKey, prefix] = process.argv;
const mod = await import(pathToFileURL(modFile).href);
const arr = Object.values(mod).filter(Array.isArray).sort((a, b) => b.length - a.length)[0];

// مدة WAV من الهيدر (يبحث عن chunk data و byteRate من fmt)
function wavDuration(path) {
  const b = readFileSync(path);
  let byteRate = 0, dataSize = 0, off = 12;
  while (off + 8 <= b.length) {
    const id = b.toString("ascii", off, off + 4);
    const sz = b.readUInt32LE(off + 4);
    if (id === "fmt ") byteRate = b.readUInt32LE(off + 8 + 8);
    if (id === "data") { dataSize = sz; break; }
    off += 8 + sz + (sz % 2);
  }
  return byteRate ? dataSize / byteRate : 0;
}

const flagged = [];
let checked = 0;
for (const it of arr) {
  const id = it[idKey], text = it[textKey] || id;
  const p = `public/sfx/${prefix}-${id}.wav`;
  if (!existsSync(p)) { flagged.push(`${id} (مفقود)`); continue; }
  checked++;
  const dur = wavDuration(p);
  const expected = 0.45 + 0.06 * String(text).length; // تقدير حسب طول الاسم
  if (dur < 0.5 || dur < 0.55 * expected) flagged.push(`${id} [${text}] ${dur.toFixed(2)}s (متوقع ~${expected.toFixed(2)}s)`);
}
console.log(`فُحص ${checked} صوت.`);
if (flagged.length) console.log(`⚠️ مشبوهة/مقطوعة (${flagged.length}):\n  ` + flagged.join("\n  "));
else console.log("✅ كل الأصوات مكتملة (لا انقطاع مشبوه).");
