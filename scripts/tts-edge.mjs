// مولّد أصوات مجاني (edge-tts, Microsoft neural) بديل Higgsfield — صفر تكلفة.
// الاستخدام: node scripts/tts-edge.mjs <dataFile> <prefix> <nameField> [voice] [rate]
//   مثال: node scripts/tts-edge.mjs src/Quiz/carsData.js cm name en-US-GuyNeural   (CARS → sfx/cm-<slug>.wav)
//   rate اختياري (مثل +15%) لتسريع النطق لما تكون الأسماء طويلة وتتجاوز مقطع audio-fit-check.
// يولّد "It's the <name>!" لكل عنصر، mp3 عبر edge-tts ثم يحوّله wav 24kHz (drop-in مثل Higgsfield).
import { execSync } from "node:child_process";
import { existsSync, statSync, unlinkSync } from "node:fs";

const [dataFile, prefix, nameField = "name", voice = "en-US-GuyNeural", rate = "+0%"] = process.argv.slice(2);
if (!dataFile || !prefix) { console.log("usage: node tts-edge.mjs <dataFile> <prefix> <nameField> [voice] [rate]"); process.exit(1); }

const mod = await import("../" + dataFile.replace(/^src\//, "src/").replace(/\\/g, "/"));
const arr = Object.values(mod).find((v) => Array.isArray(v));
const DEST = "public/sfx";
const sh = (c) => execSync(c, { stdio: ["ignore", "ignore", "ignore"] });

let ok = 0, fail = [];
for (const it of arr) {
  const out = `${DEST}/${prefix}-${(it.slug || it.iso)}.wav`;
  if (existsSync(out) && statSync(out).size > 8000) { ok++; continue; }
  const text = `It's the ${it[nameField]}!`;
  // UNIQUE temp per clip+prefix+pid — never share a temp file, or concurrent runs cross-contaminate (shifted audio bug).
  const TMP = `out/_tts-${prefix}-${(it.slug || it.iso)}-${process.pid}.mp3`;
  try {
    sh(`python -m edge_tts --voice ${voice} --rate=${rate} --text ${JSON.stringify(text)} --write-media ${TMP}`);
    sh(`npx remotion ffmpeg -i ${TMP} -ar 24000 ${out} -y`);
    if (existsSync(out) && statSync(out).size > 8000) ok++; else fail.push((it.slug || it.iso));
  } catch (e) { fail.push((it.slug || it.iso)); }
  try { unlinkSync(TMP); } catch {}
}
console.log(`edge-tts (${voice}): ${ok}/${arr.length} ok` + (fail.length ? `, FAIL: ${fail.join(", ")}` : ""));
