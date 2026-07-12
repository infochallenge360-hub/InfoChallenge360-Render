import { execSync } from "node:child_process";
import { existsSync, unlinkSync, readFileSync } from "node:fs";
import { WORLD_LANDMARKS_E09 } from "../src/Quiz/worldLandmarksE09Data.js";

const VOICE = "en-US-GuyNeural";
const DEST = "public/sfx";
const sh = (c) => execSync(c, { stdio: ["ignore", "ignore", "ignore"] });

const LONG_SLUGS = [
  "great-pyramid-of-giza", "leaning-tower-of-pisa", "neuschwanstein-castle",
  "moai-statues-easter-island", "fushimi-inari-shrine", "zhangjiajie-national-forest",
  "church-of-the-savior-on-spilled-blood", "lalibela-rock-hewn-churches",
  "kailasa-temple-ellora", "derinkuyu-underground-city", "rainbow-mountain-vinicunca",
  "gobustan-petroglyphs",
];
const RATE = "+22%";

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
  if (dataSize === 0xFFFFFFFF || dataStart + dataSize > b.length) dataSize = b.length - dataStart;
  return dataSize / byteRate;
}

const bySlug = Object.fromEntries(WORLD_LANDMARKS_E09.map((i) => [i.slug, i]));
for (const slug of LONG_SLUGS) {
  const it = bySlug[slug];
  const out = `${DEST}/wl-${slug}.wav`;
  const TMP = `out/_tts-wl-${slug}-${process.pid}.mp3`;
  sh(`python -m edge_tts --voice ${VOICE} --rate=${RATE} --text ${JSON.stringify(it.name)} --write-media ${TMP}`);
  sh(`npx remotion ffmpeg -i ${TMP} -ar 24000 -ac 1 ${out} -y`);
  try { unlinkSync(TMP); } catch {}
  const d = existsSync(out) ? wavDuration(out) : 0;
  console.log(`${slug} -> ${d.toFixed(2)}s`);
}
