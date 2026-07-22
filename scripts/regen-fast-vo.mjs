// Regenerates specific over-length name VOs at a faster edge-tts rate so they fit their slot.
// Usage: node scripts/regen-fast-vo.mjs <dataFile> <prefix> <nameField> <slug1> <slug2> ...
import { execSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";

const [dataFile, prefix, nameField, ...slugs] = process.argv.slice(2);
const mod = await import("../" + dataFile.replace(/\\/g, "/"));
const arr = Object.values(mod).find((v) => Array.isArray(v));
const DEST = "public/sfx";
const sh = (c) => execSync(c, { stdio: ["ignore", "ignore", "ignore"] });
const VOICE = "en-US-GuyNeural";
const RATE = "+22%";

let ok = 0;
for (const slug of slugs) {
  const item = arr.find((it) => (it.slug || it.iso) === slug);
  if (!item) { console.log(slug, "NOT FOUND in data"); continue; }
  const out = `${DEST}/${prefix}-${slug}.wav`;
  const text = `It's the ${item[nameField]}!`;
  const TMP = `out/_tts-fast-${prefix}-${slug}-${process.pid}.mp3`;
  try {
    sh(`python -m edge_tts --voice ${VOICE} --rate=${RATE} --text ${JSON.stringify(text)} --write-media ${TMP}`);
    sh(`npx remotion ffmpeg -i ${TMP} -ar 24000 ${out} -y`);
    console.log(slug, "regenerated at", RATE);
    ok++;
  } catch (e) { console.log(slug, "FAIL", e.message); }
  try { unlinkSync(TMP); } catch {}
}
console.log(`\n${ok}/${slugs.length} regenerated.`);
