// يفحص محتوى صور SVG (بما فيها الصور المُغلّفة base64) للتأكد إنها صورة حقيقية مش صفحة خطأ HTML مخبّاة.
// يمسك الخلل يلي ما يمسكه فحص "خطأ نصي بسيط" — لأنه هون الخطأ مُرمّز base64 جوا وسم <image>.
// الاستخدام: node scripts/check-image-content.mjs <dir>
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const [, , dir] = process.argv;
if (!dir) { console.log("usage: node check-image-content.mjs <dir>"); process.exit(1); }

const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));
const bad = [];

for (const f of files) {
  const content = readFileSync(join(dir, f), "utf-8");
  const lower = content.toLowerCase();

  // 1) خطأ نصي مباشر بالـ SVG نفسه (النمط القديم)
  if (lower.includes("wikimedia error") || lower.includes("too many requests") || lower.includes("mediawiki api") || lower.includes("commons-logo") || lower.includes("disambig")) {
    bad.push({ file: f, reason: "raw-error-text" });
    continue;
  }

  // 2) صورة مُغلّفة base64 لكن المحتوى المفكوك هو صفحة HTML/خطأ (النمط الجديد — أخطر لأنه مخبّى)
  const matches = content.matchAll(/base64,([A-Za-z0-9+/=]+)/g);
  let embeddedBad = false;
  for (const m of matches) {
    let decoded;
    try { decoded = Buffer.from(m[1], "base64"); } catch { continue; }
    const asText = decoded.slice(0, 2000).toString("utf-8");
    const dLower = asText.toLowerCase();
    if (dLower.includes("<!doctype html") || dLower.includes("<html") || dLower.includes("mediawiki") || dLower.includes("wikimedia") || dLower.includes("too many requests")) {
      embeddedBad = true;
    }
  }
  if (embeddedBad) bad.push({ file: f, reason: "base64-embedded-html" });
}

console.log(`${files.length} files checked.`);
if (bad.length) {
  console.log(`❌ ${bad.length} bad:`);
  for (const b of bad) console.log(`  ${b.file} — ${b.reason}`);
  process.exit(1);
}
console.log("✅ zero corrupted — all image content is real.");
