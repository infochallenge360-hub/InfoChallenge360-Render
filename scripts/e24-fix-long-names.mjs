import { execSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";

const VOICE = "en-US-GuyNeural";
const RATE = "+22%";
const DEST = "public/sfx";
const sh = (c) => execSync(c, { stdio: ["ignore", "ignore", "ignore"] });

const mod = await import("../src/Quiz/reptilesE24Data.js");
const arr = mod.REPTILES_E24;

const FLAGGED = [
  "american-crocodile", "chinese-water-dragon", "draco-lizard", "uracoan-rattlesnake",
  "roti-island-snake-necked-turtle", "armadillo-girdled-lizard", "satanic-leaf-tailed-gecko",
  "prehensile-tailed-skink", "blue-coral-snake", "rhinoceros-ratsnake", "solomon-islands-ground-boa",
];

let ok = 0;
for (const slug of FLAGGED) {
  const it = arr.find((x) => x.slug === slug);
  if (!it) { console.log(`NOT FOUND IN DATA: ${slug}`); continue; }
  const out = `${DEST}/rp-${slug}.wav`;
  const text = `It's the ${it.name}!`;
  const TMP = `out/_tts-fix-${slug}-${process.pid}.mp3`;
  try {
    sh(`python -m edge_tts --voice ${VOICE} --rate=${RATE} --text ${JSON.stringify(text)} --write-media ${TMP}`);
    sh(`npx remotion ffmpeg -i ${TMP} -ar 24000 ${out} -y`);
    console.log(`regenerated ${slug}`);
    ok++;
  } catch (e) { console.log(`FAIL ${slug}: ${e.message}`); }
  try { unlinkSync(TMP); } catch {}
}
console.log(`\n${ok}/${FLAGGED.length} regenerated at rate ${RATE}.`);
