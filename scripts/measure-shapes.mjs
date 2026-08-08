// Measures real image dimensions for a topic dir and buckets each item into
// portrait / square / landscape so the quiz engine can size the reveal box
// to match the photo instead of cropping tall/wide subjects.
// Usage: node scripts/measure-shapes.mjs <dataFile.js> <dir> <ext> <outJsonPath>
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const [dataFile, dir, ext, outPath] = process.argv.slice(2);
if (!dataFile || !dir || !ext || !outPath) {
  console.error("Usage: node scripts/measure-shapes.mjs <dataFile.js> <dir> <ext> <outJsonPath>");
  process.exit(1);
}

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/" + dataFile.replace(/\\/g, "/"));
const DATA = dataMod.default;

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const h = buf.readUInt16BE(i + 5), w = buf.readUInt16BE(i + 7);
      return { w, h };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

function bucket(ratio) {
  if (ratio <= 0.82) return "portrait";
  if (ratio >= 1.35) return "landscape";
  return "square";
}

const shapes = {};
let missing = [];
for (const item of DATA) {
  const slug = item.slug || item.iso;
  const p = `public/${dir}/${slug}.${ext}`;
  if (!existsSync(p)) { missing.push(slug); continue; }
  const buf = readFileSync(p);
  let dim = null;
  if (buf[0] === 0x89 && buf[1] === 0x50) dim = pngSize(buf);
  else if (buf[0] === 0xff && buf[1] === 0xd8) dim = jpegSize(buf);
  if (!dim || !dim.w || !dim.h) { missing.push(slug + "(no-dim)"); continue; }
  const ratio = dim.w / dim.h;
  shapes[slug] = bucket(ratio);
}

writeFileSync(outPath, JSON.stringify(shapes, null, 2));
const counts = {};
for (const v of Object.values(shapes)) counts[v] = (counts[v] || 0) + 1;
console.log(`Wrote ${Object.keys(shapes).length} shapes to ${outPath}`);
console.log("counts:", counts);
if (missing.length) console.log("missing:", missing);
