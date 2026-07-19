// يولّد أصوات المقدّمة القصيرة والواضحة (لا سريعة، لا مقطوعة). صفر تكلفة (edge-tts).
// كل مقدّمة ~4 ثوانٍ عشان تدخل في مقطع المونتاج (LT.intro) بدون قص.
// الاستخدام: node scripts/gen-intro-vo.mjs
import { execSync } from "node:child_process";
import { existsSync, statSync, unlinkSync, readFileSync } from "node:fs";

import { CHANNEL } from "../channel.config.mjs";
const VOICE = CHANNEL.voice;   // من channel.config
const RATE = CHANNEL.introRate; // أبطأ شوي عشان يكون واضح، مو مستعجل
const DEST = "public/sfx";
const sh = (c) => execSync(c, { stdio: ["ignore", "ignore", "ignore"] });

// نص موحّد قصير لكل موضوع — punchy، يدخل في ~4s
const INTROS = {
  "vo-intro-logo": "Guess the logo! Can you name all one hundred?",
  "vo-intro-flag": "Guess the flag! Can you name all one hundred?",
  "vo-intro-animal": "Guess the animal! Can you name all one hundred?",
  "vo-intro-food": "Guess the food! Can you name all one hundred?",
  "vo-intro-shape": "Guess the country! Can you name all one hundred?",
  "vo-intro-painting": "Guess the painting! Can you name all one hundred?",
  "vo-intro-snake": "Guess the snake! Can you name all one hundred?",
  "vo-intro-butterfly": "Guess the butterfly! Can you name all one hundred?",
  "vo-intro-silhouette": "Guess the animal by silhouette! Name all ninety eight?",
  "vo-intro-carlogo": "Guess the car logo! Can you name all seventy one?",
  "vo-intro-countryfood": "Guess the country by food! Can you name all seventy one?",
  "vo-intro-landmark": "Guess the world landmark! Can you name all seventy one?",
  "vo-intro-capital": "Guess the capital city! Can you name all seventy one?",
  "vo-intro-gamechar": "Guess the video game character! Can you name all seventy one?",
  "vo-intro-moviechar": "Guess the movie character! Can you name all seventy one?",
  "vo-intro-touristspot": "Guess the tourist destination! Can you name all seventy one?",
  "vo-intro-mountain": "Guess the mountain! Can you name all seventy one?",
  "vo-intro-island": "Guess the island! Can you name all seventy one?",
  "vo-intro-volcano": "Guess the volcano! Can you name all seventy one?",
  "vo-intro-desert": "Guess the desert! Can you name all seventy one?",
  "vo-intro-waterfall": "Guess the waterfall! Can you name all seventy one?",
  "vo-intro-lake": "Guess the lake! Can you name all seventy one?",
  "vo-intro-river": "Guess the river! Can you name all seventy one?",
  "vo-intro-skyline": "Guess the city by its skyline! Can you name all seventy one?",
  "vo-intro-bird": "Guess the bird! Can you name all seventy one?",
  "vo-intro-dogbreed": "Guess the dog breed! Can you name all seventy one?",
  "vo-intro-reptile": "Guess the reptile! Can you name all seventy one?",
  "vo-intro-clubbadge": "Guess the football club! Can you name all seventy one?",
  "vo-intro-airline": "Guess the airline! Can you name all seventy one?",
  "vo-intro-fastfood": "Guess the fast food chain! Can you name all seventy one?",
  "vo-intro-moviestudio": "Guess the movie studio! Can you name all seventy one?",
  "vo-intro-fashion": "Guess the fashion brand! Can you name all seventy one?",
  "vo-intro-console": "Guess the gaming console! Can you name all seventy one?",
  "vo-intro-castle": "Guess the castle! Can you name all seventy one?",
  "vo-intro-costume": "Guess the country! Can you name all fifty six?",
  "vo-intro-currency": "Guess the country! Can you name all thirty four?",
  "vo-intro-ruins": "Guess the ancient ruin! Can you name all seventy one?",
  "vo-intro-emojimovies": "Guess the movie by emoji! Can you name all seventy one?",
  "vo-intro-instruments": "Guess the instrument! Can you name all sixty eight?",
};

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

let ok = 0;
for (const [name, text] of Object.entries(INTROS)) {
  const out = `${DEST}/${name}.wav`;
  if (existsSync(out) && statSync(out).size > 8000) { ok++; continue; }
  const TMP = `out/_intro-${name}-${process.pid}.mp3`;
  try {
    sh(`python -m edge_tts --voice ${VOICE} --rate=${RATE} --text ${JSON.stringify(text)} --write-media ${TMP}`);
    sh(`npx remotion ffmpeg -i ${TMP} -ar 24000 -ac 1 ${out} -y`);
    try { unlinkSync(TMP); } catch {}
    const d = existsSync(out) ? wavDuration(out) : 0;
    console.log(`${name} -> ${d.toFixed(2)}s`);
    if (d > 0.5) ok++;
  } catch (e) { console.log(`${name} FAIL ${e.message}`); }
}
console.log(`\n${ok}/${Object.keys(INTROS).length} intro VOs generated.`);
