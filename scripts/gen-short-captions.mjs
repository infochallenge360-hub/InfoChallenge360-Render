// يولّد ملف كابشنات جاهزة للنسخ لكل حلقة (5 شورتات) → short/SHORTS-CAPTIONS.txt
import { writeFileSync, mkdirSync } from "node:fs";

const DRIVE = "G:\\My Drive\\GuessSync\\02_Episodes";
const EPS = [
  { ep: "E01", folder: "E01_Guess-the-Logo", topic: "Logo", topics: "logos", tag: "logo", guess: "guessthelogo", extra: "#brandquiz #logochallenge" },
  { ep: "E02", folder: "E02_Guess-the-Flag", topic: "Flag", topics: "flags", tag: "flag", guess: "guesstheflag", extra: "#geography #flagquiz" },
  { ep: "E03", folder: "E03_Guess-the-Capital", topic: "Capital", topics: "capitals", tag: "capital", guess: "guessthecapital", extra: "#geography #capitalcities" },
  { ep: "E04", folder: "E04_Guess-the-Country", topic: "Country", topics: "countries", tag: "country", guess: "guessthecountry", extra: "#geography #geographychallenge" },
  { ep: "E05", folder: "E05_Guess-the-Logo-2", topic: "Logo", topics: "logos", tag: "logo", guess: "guessthelogo", extra: "#brandquiz #logochallenge" },
  { ep: "E06", folder: "E06_Guess-the-Flag-2", topic: "Flag", topics: "flags", tag: "flag", guess: "guesstheflag", extra: "#geography #flagquiz" },
  { ep: "E07", folder: "E07_Guess-the-Capital-2", topic: "Capital", topics: "capitals", tag: "capital", guess: "guessthecapital", extra: "#geography #capitalcities" },
  { ep: "E08", folder: "E08_Guess-the-Logo-3", topic: "Logo", topics: "logos", tag: "logo", guess: "guessthelogo", extra: "#brandquiz #hardquiz" },
  { ep: "E09", folder: "E09_Guess-the-Country-Shape", topic: "Country", topics: "country shapes", tag: "map", guess: "guessthecountry", extra: "#geography #mapquiz" },
  { ep: "E10", folder: "E10_Guess-the-Logo-4", topic: "Logo", topics: "tech logos", tag: "logo", guess: "guessthelogo", extra: "#techlogos #devquiz" },
  { ep: "E11", folder: "E11_Guess-the-Country-2", topic: "Country", topics: "countries", tag: "country", guess: "guessthecountry", extra: "#geography #geographychallenge" },
  { ep: "E12", folder: "E12_Guess-the-Country-Shape-2", topic: "Country", topics: "country shapes", tag: "map", guess: "guessthecountry", extra: "#geography #mapquiz" },
  { ep: "E13", folder: "E13_Guess-the-Animal", topic: "Animal", topics: "animals", tag: "animal", guess: "guesstheanimal", extra: "#animals #animalquiz" },
  { ep: "E14", folder: "E14_Guess-the-Food", topic: "Food", topics: "foods", tag: "food", guess: "guessthefood", extra: "#food #foodquiz" },
  { ep: "E15", folder: "E15_Guess-the-Dog-Breed", topic: "Dog Breed", topics: "dog breeds", tag: "dog", guess: "guessthedog", extra: "#dogs #dogbreeds" },
  { ep: "E16", folder: "E16_Guess-the-Country-by-Landmark", topic: "Country", topics: "landmarks", tag: "landmark", guess: "guessthecountry", extra: "#geography #landmarks" },
  { ep: "E17", folder: "E17_Guess-the-Car", topic: "Car", topics: "cars", tag: "car", guess: "guessthecar", extra: "#cars #carquiz" },
  { ep: "E18", folder: "E18_Guess-the-Painting", topic: "Painting", topics: "paintings", tag: "painting", guess: "guessthepainting", extra: "#art #paintings" },
  { ep: "E19", folder: "E19_Guess-the-Bird", topic: "Bird", topics: "birds", tag: "bird", guess: "guessthebird", extra: "#birds #birdwatching" },
  { ep: "E20", folder: "E20_Guess-the-Sea-Creature", topic: "Sea Creature", topics: "sea creatures", tag: "seacreature", guess: "guesstheseacreature", extra: "#ocean #seacreatures" },
  { ep: "E21", folder: "E21_Guess-the-Fruit-or-Veg", topic: "Fruit or Veg", topics: "fruits & veg", tag: "fruit", guess: "guessthefruit", extra: "#fruits #vegetables" },
  { ep: "E22", folder: "E22_Guess-the-Butterfly", topic: "Butterfly", topics: "butterflies", tag: "butterfly", guess: "guessthebutterfly", extra: "#butterfly #butterflyquiz" },
  { ep: "E23", folder: "E23_Guess-the-Snake", topic: "Snake", topics: "snakes", tag: "snake", guess: "guessthesnake", extra: "#snakes #snakequiz" },
];

const hooks = (t) => [
  `Only 1% can name all 12 ${t}! 🤯`,
  `Bet you can't score 10/12 ${t} 👀`,
  `99% FAIL the last one… ${t} edition 😅`,
  `How many ${t} can YOU name in 5 seconds? ⏱️`,
  `The IMPOSSIBLE level BROKE me 💀 ${t}`,
];

for (const e of EPS) {
  const dir = `${DRIVE}\\${e.folder}\\short`;
  mkdirSync(dir, { recursive: true });
  const H = hooks(e.topics);
  let out = `GUESSSYNC — ${e.ep} · ${e.topic} SHORTS · كابشنات جاهزة للنسخ واللصق (YouTube Shorts / TikTok / Reels)\n`;
  out += `${"=".repeat(70)}\n\n`;
  for (let i = 0; i < 5; i++) {
    out += `┌─── SHORT ${i + 1}  (ملف: GuessSync-${e.ep}-short-${i + 1}.mp4) ───\n\n`;
    out += `— العنوان / أول سطر (Title) —\n${H[i]} #shorts\n\n`;
    out += `— الكابشن (Caption / Description) —\n`;
    out += `${H[i]}\n`;
    out += `Guess the ${e.topic} before the 5-second timer hits zero! ⏱️\n`;
    out += `Drop your score /12 in the comments 👇 — be honest! 😉\n`;
    out += `🔔 Follow @GuessSync for a new quiz every day. Sync your brain, beat the clock. 🦉\n\n`;
    out += `— الهاشتاقات (انسخها كلها) —\n`;
    out += `#shorts #quiz #${e.guess} #${e.tag}quiz #trivia #quiztime ${e.extra} #guesssync #howmanycanyouname\n\n`;
    out += `— التعليق المثبّت (Pinned comment) —\n`;
    out += `How many did you get out of 12? 👇 Comment your score — I'll pin the best! 🏆\n\n`;
    out += `${"─".repeat(60)}\n\n`;
  }
  out += `\n⚡ نصيحة للوصول: انشر شورت واحد يومياً بنفس الوقت. اربط كل شورت بالفيديو الطويل في التعليقات.\n`;
  out += `📌 نفس الكابشن يشتغل على TikTok و Instagram Reels (احذف #shorts هناك، أضف #fyp #reels).\n`;
  writeFileSync(`${dir}\\SHORTS-CAPTIONS.txt`, out, "utf8");
  console.log(`✅ ${e.ep} → SHORTS-CAPTIONS.txt`);
}
console.log("\nتم توليد كابشنات كل الحلقات السبع.");
