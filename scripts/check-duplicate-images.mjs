// يفحص كل صور مجلد معيّن (public/<dir>) ويلاقي أي ملفين متطابقين تمامًا (نفس MD5) —
// يمسك أخطاء زي rw.svg == sa.svg (خطأ حقيقي بمصدر mapsicon) قبل الرندر، مو بعده.
// الاستخدام: node scripts/check-duplicate-images.mjs <dir>
//   مثال: node scripts/check-duplicate-images.mjs public/maps
import { readdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const [, , dir] = process.argv;
if (!dir) { console.log("usage: node check-duplicate-images.mjs <dir>"); process.exit(1); }

const files = readdirSync(dir).filter((f) => !f.startsWith("."));
const byHash = new Map();

for (const f of files) {
  const buf = readFileSync(join(dir, f));
  const hash = createHash("md5").update(buf).digest("hex");
  if (!byHash.has(hash)) byHash.set(hash, []);
  byHash.get(hash).push(f);
}

const dupes = [...byHash.entries()].filter(([, list]) => list.length > 1);

if (dupes.length === 0) {
  console.log(`✅ ${files.length} files checked, zero duplicates — all images are unique.`);
  process.exit(0);
} else {
  console.log(`❌ ${dupes.length} duplicate group(s) found among ${files.length} files:`);
  for (const [hash, list] of dupes) {
    console.log(`  ${hash}: ${list.join(", ")}`);
  }
  process.exit(1);
}
