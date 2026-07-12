// يولّد وصف الفيديو الطويل الجاهز لليوتيوب: 3 عناوين (يوتيوب يختبرهم) + وصف فيه كل أسماء العناصر (بحث)
// + فصول محسوبة من المحرّك + @GuessSync + تاجات + هاشتاقات + تعليق مثبّت. يكتب seo/SEO.txt.
// الاستخدام: node scripts/gen-video-seo.mjs E01
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { CHANNEL } from "../channel.config.mjs";

const DRIVE = CHANNEL.drivePath;
const HANDLE = CHANNEL.handle;
// ثوابت المحرّك (طابق quizv2.jsx)
const FPS = 30, LT = { cold: 250, intro: 165, level: 85, check: 96, outro: 225 }, HOLD = 108, TR = { easy: 120, medium: 150, hard: 210, impossible: 210 };
const ts = (fr) => { const s = Math.floor(fr / FPS); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

const CFG = {
  E01: { data: "src/Quiz/logosData.js", nameField: "name", keyword: "logo", plural: "logos", emoji: "🤔", word: "brand logos", folder: "E01_Guess-the-Logo",
    tags: ["#logoquiz", "#guessthelogo", "#quiz"], listLabel: "Brands featured",
    tagsFull: "guess the logo, logo quiz, guess the brand, name the logo, brand quiz, logo trivia, logo quiz game, logos easy to impossible, quiz game, trivia quiz, guesssync" },
  E02: { data: "src/Quiz/flagsData.js", nameField: "name", keyword: "flag", plural: "flags", emoji: "🏳️", word: "country flags", folder: "E02_Guess-the-Flag",
    tags: ["#flagquiz", "#guesstheflag", "#quiz"], listLabel: "Countries featured",
    tagsFull: "guess the flag, flag quiz, guess the country, name the flag, country flags, flag trivia, world flags quiz, flags easy to impossible, geography quiz, trivia quiz, guesssync" },
  E03: { data: "src/Quiz/animalsData.js", nameField: "name", keyword: "animal", plural: "animals", emoji: "🦁", word: "animals", folder: "E03_Guess-the-Animal",
    tags: ["#animalquiz", "#guesstheanimal", "#quiz"], listLabel: "Animals featured",
    tagsFull: "guess the animal, animal quiz, name the animal, animals quiz, wildlife quiz, animal trivia, guess the animal quiz, animals easy to impossible, quiz game, trivia quiz, guesssync" },
  E05: { data: "src/Quiz/logos2Data.js", nameField: "name", keyword: "logo", plural: "logos", emoji: "🤔", word: "brand logos", folder: "E05_Guess-the-Logo-2",
    tags: ["#logoquiz", "#guessthelogo", "#quiz"], listLabel: "Brands featured",
    tagsFull: "guess the logo, logo quiz, guess the brand, name the logo, brand quiz, logo trivia, logo quiz game, logos easy to impossible, quiz game, trivia quiz, guesssync" },
  E08: { data: "src/Quiz/logos3Data.js", nameField: "name", keyword: "logo", plural: "logos", emoji: "🤔", word: "brand logos", folder: "E08_Guess-the-Logo-3",
    tags: ["#logoquiz", "#guessthelogo", "#quiz"], listLabel: "Brands featured",
    tagsFull: "guess the logo, logo quiz, guess the brand, name the logo, brand quiz, logo trivia, logo quiz game, logos easy to impossible, quiz game, trivia quiz, guesssync" },
  E14: { data: "src/Quiz/foodsData.js", nameField: "name", keyword: "food", plural: "foods", emoji: "🍕", word: "dishes", folder: "E14_Guess-the-Food",
    tags: ["#foodquiz", "#guessthefood", "#quiz"], listLabel: "Dishes featured",
    tagsFull: "guess the food, food quiz, name the food, food quiz game, dishes quiz, cuisine quiz, food trivia, foods easy to impossible, quiz game, trivia quiz, guesssync" },
};

const [, , ep] = process.argv;
const c = CFG[ep];
if (!c) { console.log("usage: node gen-video-seo.mjs <E01|E02|...> (add config in CFG)"); process.exit(1); }
const mod = await import(pathToFileURL(c.data).href);
const items = Object.values(mod).filter(Array.isArray).sort((a, b) => b.length - a.length)[0];
const nameOf = (it) => it[c.nameField] || it.name;

// فصول
let f = LT.cold + LT.intro, last = null, num = 0; const marks = {};
for (const it of items) { if (it.level !== last) { marks[it.level] = f; f += LT.level; last = it.level; } num++; f += TR[it.level] + HOLD; if (num === 25 || num === 50 || num === 75) f += LT.check; }
const outroAt = f, total = f + LT.outro;

const Kp = c.plural[0].toUpperCase() + c.plural.slice(1);
const emo = c.emoji;
const titles = [
  `Guess the ${c.keyword[0].toUpperCase() + c.keyword.slice(1)}! ${emo} 100 ${Kp} | Easy to IMPOSSIBLE (Can You Score 100/100?)`,
  `Only 1% Can Name All 100 ${Kp} ${emo} Easy → IMPOSSIBLE Quiz (2026)`,
  `100 ${Kp}: How Many Can YOU Name? ${emo} Easy to IMPOSSIBLE`,
];
const allNames = items.map(nameOf).join(", ");
const first = items.filter((x) => x.level === "easy").slice(0, 3).map(nameOf).join(", ");
const lastImp = items.filter((x) => x.level === "impossible").slice(-3).map(nameOf).join(", ");

const seo = `${CHANNEL.name} — ${ep} · Guess the ${c.keyword[0].toUpperCase() + c.keyword.slice(1)} (SEO — جاهز للصق)

— TITLES (حط الـ3 في يوتيوب؛ هو يختبرهم ويختار الأفضل) —
1) ${titles[0]}
2) ${titles[1]}
3) ${titles[2]}

— DESCRIPTION —
Guess the ${c.keyword}! ${emo} 100 ${c.word} from EASY to IMPOSSIBLE — can you name them all before the timer runs out? This ${c.keyword} quiz starts with ones everyone knows (${first}...) and ends with the ${c.plural} almost nobody can name (${lastImp}). Comment your score (0–100) and challenge a friend! 👇

⏱️ HOW TO PLAY:
• A ${c.keyword} appears → the timer counts down (4s easy up to 7s impossible)
• Guess it before the timer ends
• The answer + a quick fact are revealed — keep score!

🏆 Levels:
0:00  Intro
${ts(marks.easy)}  EASY
${ts(marks.medium)}  MEDIUM
${ts(marks.hard)}  HARD
${ts(marks.impossible)}  IMPOSSIBLE
${ts(outroAt)}  Your final score

🎯 ${c.listLabel} in this quiz: ${allNames}.

🔔 Subscribe to ${HANDLE} for a new quiz every week!
▶ youtube.com/${HANDLE}
👉 How many did you get? Comment below!

${c.tags.join(" ")}
--------------------
${CHANNEL.name} — ${CHANNEL.tagline} 🧠

— TAGS —
${c.tagsFull}

— HASHTAGS (3) —
${c.tags.join(" ")}

— PINNED COMMENT —
How many of the 100 did you get? Drop your score (0–100) 👇 Full quizzes every week on ${HANDLE} 🔔

— ملاحظة داخلية —
مدة ${ts(total)} · فصول محسوبة من المحرّك · صعوبة مطلقة · كل الأسماء بالوصف للبحث · ${HANDLE} رابط قابل للنقر.
`;
const outDir = `${DRIVE}/${c.folder}/seo`;
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/SEO.txt`, seo, "utf8");
console.log(`✅ ${ep} long-video SEO → ${outDir}/SEO.txt`);
console.log(`   3 titles · chapters 0:00/${ts(marks.easy)}/${ts(marks.medium)}/${ts(marks.hard)}/${ts(marks.impossible)}/${ts(outroAt)} · ${items.length} names listed`);
