// يولّد ملف يوتيوب جاهز لكل ريل (5 ملفات/حلقة): عنوان + وصف + هاشتاقات + تعليق مثبّت + محتوى الريل.
// مبني على بحث Shorts SEO 2026: عنوان ≤~40 حرف كلمة مفتاحية أول · هاشتاقات بالوصف (أول 3 تظهر) · لا #Shorts · هوك أول 3-5ث.
// الاستخدام: node scripts/gen-reel-seo.mjs E01
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { CHANNEL } from "../channel.config.mjs";

const DRIVE = CHANNEL.drivePath;
const HANDLE = CHANNEL.handle; // معرّف القناة — رابط قابل للنقر (من channel.config)
const CFG = {
  E01: { data: "src/Quiz/logosData.js", nameField: "name", keyword: "logo", word: "LOGO", plural: "logos", folder: "E01_Guess-the-Logo", tags: ["#logoquiz", "#guessthelogo", "#quiz", "#trivia", "#logos"] },
  E02: { data: "src/Quiz/flagsData.js", nameField: "name", keyword: "flag", word: "FLAG", plural: "flags", folder: "E02_Guess-the-Flag", tags: ["#flagquiz", "#guesstheflag", "#quiz", "#geography", "#flags"] },
  E03: { data: "src/Quiz/animalsData.js", nameField: "name", keyword: "animal", word: "ANIMAL", plural: "animals", folder: "E03_Guess-the-Animal", tags: ["#animalquiz", "#guesstheanimal", "#quiz", "#animals", "#wildlife"] },
  E05: { data: "src/Quiz/logos2Data.js", nameField: "name", keyword: "logo", word: "LOGO", plural: "logos", folder: "E05_Guess-the-Logo-2", tags: ["#logoquiz", "#guessthelogo", "#quiz", "#trivia", "#logos"] },
  E08: { data: "src/Quiz/logos3Data.js", nameField: "name", keyword: "logo", word: "LOGO", plural: "logos", folder: "E08_Guess-the-Logo-3", tags: ["#logoquiz", "#guessthelogo", "#quiz", "#trivia", "#logos"] },
  E14: { data: "src/Quiz/foodsData.js", nameField: "name", keyword: "food", word: "FOOD", plural: "foods", folder: "E14_Guess-the-Food", tags: ["#foodquiz", "#guessthefood", "#quiz", "#food", "#foodie"] },
  E52: { data: "src/Quiz/elementsE52Data.js", nameField: "name", keyword: "element", word: "ELEMENT", plural: "chemical elements", folder: "E52_ChemicalElements", tags: ["#elementquiz", "#chemistry", "#quiz", "#periodictable", "#science"] },
  E53: { data: "src/Quiz/classicCarsE53Data.js", nameField: "name", keyword: "classic car", word: "CLASSIC CAR", plural: "classic cars", folder: "E53_ClassicCars", tags: ["#carquiz", "#classiccars", "#quiz", "#cars", "#automotive"] },
  E54: { data: "src/Quiz/trophiesE54Data.js", nameField: "name", keyword: "sports trophy", word: "SPORTS TROPHY", plural: "sports trophies", folder: "E54_SportsTrophies", tags: ["#trophyquiz", "#sports", "#quiz", "#sportstrivia", "#trophies"] },
  E55: { data: "src/Quiz/stadiumsE55Data.js", nameField: "name", keyword: "stadium", word: "STADIUM", plural: "stadiums", folder: "E55_Stadiums", tags: ["#stadiumquiz", "#football", "#quiz", "#sports", "#stadiums"] },
  E56: { data: "src/Quiz/catBreedsE56Data.js", nameField: "name", keyword: "cat breed", word: "CAT BREED", plural: "cat breeds", folder: "E56_CatBreeds", tags: ["#catbreedquiz", "#cats", "#quiz", "#catlover", "#pets"] },
  E57: { data: "src/Quiz/nationalParksE57Data.js", nameField: "name", keyword: "national park", word: "NATIONAL PARK", plural: "national parks", folder: "E57_NationalParks", tags: ["#nationalparkquiz", "#geography", "#quiz", "#travel", "#nature"] },
  E58: { data: "src/Quiz/skyscrapersE58Data.js", nameField: "name", keyword: "skyscraper", word: "SKYSCRAPER", plural: "skyscrapers", folder: "E58_Skyscrapers", tags: ["#skyscraperquiz", "#architecture", "#quiz", "#travel", "#citylife"] },
  E59: { data: "src/Quiz/palacesE59Data.js", nameField: "name", keyword: "palace", word: "PALACE", plural: "palaces", folder: "E59_Palaces", tags: ["#palacequiz", "#history", "#quiz", "#travel", "#architecture"] },
  E60: { data: "src/Quiz/cathedralsE60Data.js", nameField: "name", keyword: "cathedral", word: "CATHEDRAL", plural: "cathedrals", folder: "E60_Cathedrals", tags: ["#cathedralquiz", "#architecture", "#quiz", "#travel", "#history"] },
  E61: { data: "src/Quiz/mosquesE61Data.js", nameField: "name", keyword: "mosque", word: "MOSQUE", plural: "mosques", folder: "E61_Mosques", tags: ["#mosquequiz", "#architecture", "#quiz", "#travel", "#history"] },
  E62: { data: "src/Quiz/lighthousesE62Data.js", nameField: "name", keyword: "lighthouse", word: "LIGHTHOUSE", plural: "lighthouses", folder: "E62_Lighthouses", tags: ["#lighthousequiz", "#architecture", "#quiz", "#travel", "#geography"] },
  E63: { data: "src/Quiz/capitalsE63Data.js", nameField: "name", keyword: "country", word: "COUNTRY", plural: "countries", folder: "E63_Capitals", tags: ["#geoquiz", "#capitalcities", "#quiz", "#geography", "#trivia"] },
  E64: { data: "src/Quiz/capitalsE64Data.js", nameField: "capital", keyword: "capital", word: "CAPITAL", plural: "capitals", folder: "E64_Capital-Cities", tags: ["#geoquiz", "#capitalcities", "#quiz", "#geography", "#trivia"] },
  E65: { data: "src/Quiz/phonesE65Data.js", nameField: "name", keyword: "phone", word: "PHONE", plural: "phones", folder: "E65_Phones", tags: ["#phonequiz", "#retrotech", "#quiz", "#nostalgia", "#trivia"] },
  E66: { data: "src/Quiz/appleE66Data.js", nameField: "name", keyword: "Apple device", word: "DEVICE", plural: "Apple devices", folder: "E66_Apple-Devices", tags: ["#applequiz", "#retrotech", "#quiz", "#nostalgia", "#trivia"] },
  E67: { data: "src/Quiz/phoneLogosE67Data.js", nameField: "name", keyword: "phone brand logo", word: "LOGO", plural: "phone brand logos", folder: "E67_Phone-Logos", tags: ["#logoquiz", "#phonequiz", "#quiz", "#trivia", "#brands"] },
  E68: { data: "src/Quiz/nokiaE68Data.js", nameField: "name", keyword: "Nokia phone", word: "PHONE", plural: "Nokia phones", folder: "E68_Nokia-Phones", tags: ["#nokiaquiz", "#retrotech", "#quiz", "#nostalgia", "#trivia"] },
  E69: { data: "src/Quiz/supercarsE69Data.js", nameField: "name", keyword: "supercar", word: "SUPERCAR", plural: "supercars", folder: "E69_Supercars", tags: ["#supercarquiz", "#carquiz", "#quiz", "#cars", "#automotive"] },
  E70: { data: "src/Quiz/evCarsE70Data.js", nameField: "name", keyword: "electric car", word: "EV", plural: "electric cars", folder: "E70_Electric-Cars", tags: ["#evquiz", "#carquiz", "#quiz", "#electricvehicles", "#automotive"] },
  E71: { data: "src/Quiz/pickupsE71Data.js", nameField: "name", keyword: "pickup truck", word: "PICKUP", plural: "pickup trucks", folder: "E71_Pickup-Trucks", tags: ["#truckquiz", "#carquiz", "#quiz", "#pickuptrucks", "#automotive"] },
  E72: { data: "src/Quiz/suvsE72Data.js", nameField: "name", keyword: "SUV", word: "SUV", plural: "SUVs", folder: "E72_SUVs", tags: ["#suvquiz", "#carquiz", "#quiz", "#suvs", "#automotive"] },
  E73: { data: "src/Quiz/jdmCarsE73Data.js", nameField: "name", keyword: "JDM car", word: "JDM car", plural: "JDM cars", folder: "E73_JDM-Cars", tags: ["#jdmquiz", "#carquiz", "#quiz", "#jdm", "#automotive"] },
  E74: { data: "src/Quiz/vegetablesE74Data.js", nameField: "name", keyword: "vegetable", word: "vegetable", plural: "vegetables", folder: "E74_Vegetables", tags: ["#vegetablequiz", "#foodquiz", "#quiz", "#vegetables", "#trivia"] },
  E75: { data: "src/Quiz/motorcyclesE75Data.js", nameField: "name", keyword: "motorcycle", word: "motorcycle", plural: "motorcycles", folder: "E75_Motorcycles", tags: ["#motorcyclequiz", "#bikequiz", "#quiz", "#motorcycles", "#automotive"] },
  E76: { data: "src/Quiz/airplanesE76Data.js", nameField: "name", keyword: "airplane", word: "airplane", plural: "airplanes", folder: "E76_Airplanes", tags: ["#airplanequiz", "#aviationquiz", "#quiz", "#airplanes", "#aviation"] },
  E77: { data: "src/Quiz/statesE77Data.js", nameField: "name", keyword: "US state", word: "state", plural: "states", folder: "E77_USStates", tags: ["#usstatequiz", "#geographyquiz", "#quiz", "#usa", "#geography"] },
  E78: { data: "src/Quiz/nbaE78Data.js", nameField: "name", keyword: "NBA team", word: "team", plural: "teams", folder: "E78_NBA", tags: ["#nbaquiz", "#basketballquiz", "#quiz", "#nba", "#basketball"] },
  E79: { data: "src/Quiz/nflE79Data.js", nameField: "name", keyword: "NFL team", word: "team", plural: "teams", folder: "E79_NFL", tags: ["#nflquiz", "#footballquiz", "#quiz", "#nfl", "#americanfootball"] },
  E80: { data: "src/Quiz/mlbE80Data.js", nameField: "name", keyword: "MLB team", word: "team", plural: "teams", folder: "E80_MLB", tags: ["#mlbquiz", "#baseballquiz", "#quiz", "#mlb", "#baseball"] },
  E81: { data: "src/Quiz/nhlE81Data.js", nameField: "name", keyword: "NHL team", word: "team", plural: "teams", folder: "E81_NHL", tags: ["#nhlquiz", "#hockeyquiz", "#quiz", "#nhl", "#icehockey"] },
  E82: { data: "src/Quiz/roadsignsE82Data.js", nameField: "name", keyword: "road sign", word: "sign", plural: "signs", folder: "E82_RoadSigns", tags: ["#roadsignquiz", "#drivingquiz", "#quiz", "#roadsigns", "#traffic"] },
  E83: { data: "src/Quiz/mythicalCreaturesE83Data.js", nameField: "name", keyword: "mythical creature", word: "creature", plural: "creatures", folder: "E83_MythicalCreatures", tags: ["#mythologyquiz", "#folklore", "#quiz", "#mythicalcreatures", "#trivia"] },
  E84: { data: "src/Quiz/emojiE84Data.js", nameField: "name", keyword: "emoji", word: "emoji", plural: "emoji", folder: "E84_Emoji", tags: ["#emojiquiz", "#emoji", "#quiz", "#nameemoji", "#trivia"] },
  E85: { data: "src/Quiz/weatherE85Data.js", nameField: "name", keyword: "weather symbol", word: "symbol", plural: "symbols", folder: "E85_WeatherSymbols", tags: ["#weatherquiz", "#meteorology", "#quiz", "#weathersymbols", "#trivia"] },
  E86: { data: "src/Quiz/constellationsE86Data.js", nameField: "name", keyword: "constellation", word: "constellation", plural: "constellations", folder: "E86_Constellations", tags: ["#astronomyquiz", "#constellations", "#quiz", "#stargazing", "#trivia"] },
  E87: { data: "src/Quiz/fontsE87Data.js", nameField: "name", keyword: "font", word: "font", plural: "fonts", folder: "E87_Fonts", tags: ["#fontquiz", "#typography", "#quiz", "#fonts", "#design"] },
};

// هوكات عناوين متنوّعة (عشان الـ5 ريلز ما تكون متطابقة = يوتيوب يكره التكرار)
// K = مفرد بحرف كبير (Logo) · Kp = جمع بحرف كبير (Logos)
const HOOKS = [
  (K, Kp) => `Guess the ${K}! 🤔 Can You Name All 12?`,
  (K, Kp) => `Only 1% Name the Last One 🤯 ${K} Quiz`,
  (K, Kp) => `Name These ${Kp} in Seconds ⚡ Easy → IMPOSSIBLE`,
  (K, Kp) => `90% Fail #12 😱 Guess the ${K}`,
  (K, Kp) => `How Many ${Kp} Can YOU Name? 🧠 (0–12)`,
];
const cap = (s) => s.split(" ").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const [, , ep] = process.argv;
const c = CFG[ep];
if (!c) { console.log("usage: node gen-reel-seo.mjs <E01|E02|...> (add config in CFG)"); process.exit(1); }

const mod = await import(pathToFileURL(c.data).href);
const items = Object.values(mod).filter(Array.isArray).sort((a, b) => b.length - a.length)[0];
const tiers = ["easy", "medium", "hard", "impossible"];
const byTier = tiers.map((lv) => items.filter((x) => x.level === lv));
const nameOf = (it) => it[c.nameField] || it.name;

// نفس منطق pickShort في shortv2.jsx: 3 من كل مستوى، إزاحة part*3 (بتفاف الفهرس لحلقات غير 25/تير)
const pickShort = (part) => {
  const out = [];
  for (let b = 0; b < 4; b++) {
    const pool = byTier[b];
    for (let k = 0; k < 3; k++) { if (!pool.length) continue; const it = pool[(part * 3 + k) % pool.length]; out.push({ name: nameOf(it), tier: tiers[b] }); }
  }
  return out;
};

const outDir = `${DRIVE}/${c.folder}/short`;
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const Kd = c.keyword;

for (let part = 0; part < 5; part++) {
  const n = part + 1;
  const twelve = pickShort(part);
  const byT = tiers.map((lv) => twelve.filter((x) => x.tier === lv).map((x) => x.name));
  const T = (i) => HOOKS[(part + i) % HOOKS.length](cap(Kd), cap(c.plural));
  const [title1, title2, title3] = [T(0), T(2), T(4)];
  const allNames = twelve.map((x) => x.name).join(", ");
  const tagline = c.tags.join(" ");
  const txt = `${CHANNEL.name} — ${ep} · Short #${n} (YouTube — جاهز للصق)

— TITLES (حط الـ3 في يوتيوب؛ هو يختبرهم ويختار الأفضل — كلمة مفتاحية أول، بدون #Shorts) —
1) ${title1}
2) ${title2}
3) ${title3}

— DESCRIPTION (السطر الأول فيه الكلمة المفتاحية؛ أسماء كل ${c.plural} للبحث؛ الهاشتاقات بالآخر) —
Guess the ${Kd}! 🤔 12 ${c.plural} from EASY to IMPOSSIBLE — can you name them all before the timer? Comment your score below 👇

🎯 In this Short: ${allNames}.

🔥 Full ${items.length}-${Kd} quiz on ${HANDLE} — a new quiz every week!
▶ Subscribe: youtube.com/${HANDLE}
👉 Which one did YOU miss?

${tagline}

— PINNED COMMENT (سؤال يولّد ردود) —
How many of the 12 did you get? Drop your score (0–12) 👇 Bet you missed the last one! Full ${items.length}-${Kd} quiz on ${HANDLE} 🔗

— محتوى هذا الريل (مرجع؛ لا تنشره) —
EASY: ${byT[0].join(", ")}
MEDIUM: ${byT[1].join(", ")}
HARD: ${byT[2].join(", ")}
IMPOSSIBLE: ${byT[3].join(", ")}
`;
  writeFileSync(`${outDir}/${CHANNEL.name}-${ep}-short-${n}-youtube.txt`, txt, "utf8");
  console.log(`✅ Short #${n}: "${title1}"  [${byT[3].join(", ")}]`);
}
console.log(`\n5 ملفات يوتيوب للريلز → ${outDir}`);
