// يبني خطة 200 حلقة: يوزّع المواضيع الآمنة (من البحث) على 200 سلوت متباعدة (لا نفس الموضوع ورا بعض).
// الإخراج: G:/My Drive/GuessSync/01_Strategy/200-Episode-Plan.md
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

// المواضيع الآمنة + عدد الحلقات (من بحثَي المنافسين + بنك المواضيع). z=منطقة الحقوق. src=مصدر الأصول.
const TOPICS = [
  // — شعارات (أعمق نيتش) —
  ["Guess the Brand Logo", "logo", 6, "safe-ish™", "SimpleIcons/brand press kits"],
  ["Guess the Tech & App Logo", "logo", 4, "safe-ish™", "SimpleIcons"],
  ["Guess the Car Logo", "logo", 4, "safe-ish™", "SimpleIcons/PD emblems"],
  ["Guess the Food Brand Logo", "logo", 3, "safe-ish™", "SimpleIcons"],
  ["Guess the Fashion Logo", "logo", 3, "safe-ish™", "SimpleIcons"],
  ["Guess the Gaming Logo", "logo", 2, "safe-ish™", "SimpleIcons"],
  ["Guess the Sports Brand Logo", "logo", 2, "safe-ish™", "SimpleIcons"],
  // — جغرافيا —
  ["Guess the Flag", "flag", 6, "safe", "PD flag SVGs/Wikimedia"],
  ["Guess the Country by Shape", "country", 4, "safe", "mapsicon/Natural Earth"],
  ["Guess the Capital City", "capital", 4, "safe", "flag SVGs + text"],
  ["Guess the Country by Landmark", "landmark", 4, "safe", "Wikimedia/Openverse"],
  ["Guess the City by Skyline", "city", 3, "safe", "Wikimedia/Openverse"],
  ["Guess the Flag (Zoomed Detail)", "flag", 2, "safe", "PD flag SVGs"],
  ["Guess the Currency", "currency", 2, "caution🟡", "stylized/partial imagery"],
  // — طبيعة —
  ["Guess the Animal", "animal", 6, "safe", "iNaturalist CC/Wikimedia"],
  ["Guess the Bird", "bird", 4, "safe", "iNaturalist CC"],
  ["Guess the Dog Breed", "dog", 4, "safe", "Wikimedia/Openverse"],
  ["Guess the Sea Creature", "sea creature", 3, "safe", "iNaturalist CC"],
  ["Guess the Big Cat", "big cat", 2, "safe", "iNaturalist CC"],
  ["Guess the Cat Breed", "cat", 2, "safe", "Wikimedia"],
  ["Guess the Insect", "insect", 2, "safe", "iNaturalist CC"],
  ["Guess the Butterfly", "butterfly", 2, "safe", "iNaturalist CC"],
  ["Guess the Snake", "snake", 2, "safe", "iNaturalist CC"],
  ["Guess the Reptile", "reptile", 2, "safe", "iNaturalist CC"],
  ["Guess the Fish", "fish", 2, "safe", "iNaturalist CC"],
  ["Guess the Flower", "flower", 3, "safe", "iNaturalist/Wikimedia"],
  ["Guess the Tree", "tree", 2, "safe", "iNaturalist CC"],
  ["Guess the Fungi / Mushroom", "mushroom", 2, "safe", "iNaturalist CC"],
  ["Guess the Gemstone", "gemstone", 1, "safe", "Wikimedia"],
  ["Guess the Spider", "spider", 1, "safe", "iNaturalist CC"],
  // — رياضة —
  ["Guess the Football Club Badge", "club badge", 6, "safe-ish™", "club press/PD crests"],
  ["Guess the National Team Crest (World Cup 2026)", "crest", 2, "safe-ish™", "crests, NO faces"],
  ["Guess the NFL Team Logo", "NFL logo", 2, "safe-ish™", "team marks"],
  ["Guess the NBA Team Logo", "NBA logo", 2, "safe-ish™", "team marks"],
  ["Guess the Sports League Logo", "sports logo", 2, "safe-ish™", "SimpleIcons"],
  // — أطعمة —
  ["Guess the Food Dish", "food", 4, "safe", "Wikimedia/Openverse"],
  ["Guess the National Dish", "national dish", 2, "safe", "Wikimedia"],
  ["Guess the Fruit or Vegetable", "fruit", 3, "safe", "Wikimedia/Openverse"],
  ["Guess the Drink", "drink", 2, "safe", "Wikimedia"],
  ["Guess the Dessert", "dessert", 2, "safe", "Wikimedia"],
  // — أشياء وثقافة —
  ["Guess the Painting (pre-1930 PD)", "painting", 3, "safe", "Wikimedia PD"],
  ["Guess the Car (Model/Shape)", "car", 3, "caution🟡", "CC photos only"],
  ["Guess the Airplane", "airplane", 2, "safe", "Wikimedia/Openverse"],
  ["Guess the Musical Instrument", "instrument", 2, "safe", "Wikimedia"],
  ["Guess the Tool", "tool", 2, "safe", "Wikimedia"],
  ["Guess the Road Sign", "road sign", 2, "safe", "PD official signs"],
  ["Guess the Monument", "monument", 2, "safe", "Wikimedia"],
  ["Guess the Bridge", "bridge", 2, "safe", "Wikimedia"],
  ["Guess the National Park", "national park", 2, "safe", "NPS PD/Wikimedia"],
  ["Guess the Vehicle", "vehicle", 2, "safe", "Wikimedia"],
  ["Guess the Video Game (by Logo)", "game logo", 2, "safe-ish™", "SimpleIcons"],
  ["Guess the Castle", "castle", 1, "safe", "Wikimedia"],
  ["Guess the Board Game", "board game", 1, "caution🟡", "box/marks care"],
  // — فضاء وعلوم —
  ["Guess the Planet / Moon", "planet", 1, "safe", "NASA PD"],
  ["Guess the Constellation", "constellation", 1, "safe", "PD star charts"],
  // — صيغ نصية (خطر حقوق صفر) + إيموجي —
  ["Guess the Movie by Emoji", "emoji movie", 3, "safe (emoji)", "OpenMoji CC-BY"],
  ["Guess the Song by Emoji", "emoji song", 2, "safe (emoji)", "OpenMoji CC-BY"],
  ["Guess the Year", "year", 2, "safe", "text/PD photos"],
  ["Guess the Price", "price", 2, "safe", "text"],
  ["Guess the Population", "population", 2, "safe", "text"],
];

const TOTAL = 200;
let sum = TOPICS.reduce((a, t) => a + t[2], 0);
// عدّل ليصير المجموع 200 بالضبط: زد/انقص من الأعمق
const order = [...TOPICS].sort((a, b) => b[2] - a[2]);
let i = 0;
while (sum < TOTAL) { order[i % order.length][2]++; sum++; i++; }
while (sum > TOTAL) { const t = order.find(x => x[2] > 1); if (!t) break; t[2]--; sum--; }

// وزّع كل موضوع على 200 سلوت بتباعد متساوٍ (fractional) ثم رتّب
const slots = [];
TOPICS.forEach((t, ti) => {
  const [name, kw, c, z, src] = t;
  for (let k = 0; k < c; k++) {
    const pos = (k + 0.5) * (TOTAL / c) + (ti * 0.013) % 1; // jitter بسيط بالموضوع
    slots.push({ pos, name, kw, z, src, part: c > 1 ? `#${k + 1}` : "" });
  }
});
slots.sort((a, b) => a.pos - b.pos);
// تنظيف: لا نفس الموضوع في سلوتين متجاورين (بدّل مع اللي بعده)
for (let n = 1; n < slots.length; n++) {
  if (slots[n].name === slots[n - 1].name) {
    for (let m = n + 1; m < slots.length; m++) {
      if (slots[m].name !== slots[n - 1].name && (m + 1 >= slots.length || slots[m + 1].name !== slots[n].name)) {
        [slots[n], slots[m]] = [slots[m], slots[n]]; break;
      }
    }
  }
}

// اكتب الخطة
let adj = 0; for (let n = 1; n < slots.length; n++) if (slots[n].name === slots[n - 1].name) adj++;
const rows = slots.map((s, n) => `| E${String(n + 1).padStart(3, "0")} | ${s.name} ${s.part} | \`${s.kw}\` | ${s.z} | ${s.src} |`);
const topicCount = new Set(slots.map(s => s.name.replace(/ #\d+$/, ""))).size;
const md = `# GuessSync — خطة 200 حلقة (من بحث المنافسين + بنك المواضيع الآمنة · 2026-07-06)

- **200 حلقة · ${TOPICS.length} موضوع آمن · مواضيع متباعدة (لا تكرار ورا بعض: ${adj} تجاور متبقّي).**
- كل حلقة: 100 عنصر · صعوبة مطلقة (سهل ~عالمي ← مستحيل <3%) · بوابتين QA.
- الحقوق: safe=حقائق/PD · safe-ish™=شعارات (استخدام اسمي، بلا وجوه/صوت) · caution🟡=قاعدة مصدر محدّدة · emoji=OpenMoji CC-BY.
- ⛔ ممنوع: صوت موسيقى حقيقي · مقاطع/بوسترات أفلام · **صور وجوه مشاهير/لاعبين** · شخصيات محمية.
- 🏆 كأس العالم 2026: حلقات الأعلام + شعارات المنتخبات + أندية = موجة موسمية (رتّبناها ضمن السلّة).

| # | الموضوع | الكلمة | الحقوق | مصدر الأصول |
|---|---------|--------|--------|-------------|
${rows.join("\n")}

## ملاحظة الإنتاج
- ابدأ بالأقوى/الأأمن (شعارات/حيوانات/أعلام/أطعمة) لزخم مبكر.
- شغّل الطويل + 5 ريلز لكل حلقة · كل حلقة distinct (سياسة يوليو 2025 لمكافحة المحتوى المتشابه — قيمتنا الأصلية: معلومة مؤكّدة + صوت حقيقي + صعوبة معايرة).
- التفاصيل الكاملة: out/research-competitors.md + out/research-topics.md.
`;
const dir = "G:/My Drive/GuessSync/01_Strategy";
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/200-Episode-Plan.md`, md, "utf8");
console.log(`✅ 200-Episode-Plan → ${dir}/200-Episode-Plan.md`);
console.log(`مواضيع: ${TOPICS.length} · حلقات: ${slots.length} · تجاور متبقّي: ${adj} · مواضيع فريدة: ${topicCount}`);
console.log("أول 12:", slots.slice(0, 12).map(s => s.name.replace(/^Guess the /, "")).join(" · "));
