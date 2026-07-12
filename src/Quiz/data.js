// بيانات كويز الأعلام — 51 دولة، 4 مستويات
export const FPS = 30;

// توقيت كل مقطع (فريمات @30fps)
export const T = {
  intro: 270, // 9s — يتّسع للوقو والتعليق الافتتاحي
  level: 135, // 4.5s — يتّسع لتعليق المستوى
  round: 285, // 9.5s (عدّاد 7s ثم كشف 2.5s)
  reveal: 210, // 7s — لحظة كشف الإجابة (عدّاد 7 ثواني)
  outro: 210, // 7s
};

export const LEVELS = ["easy", "medium", "hard", "impossible"];

export const LEVEL_LABEL = {
  easy: "EASY",
  medium: "MEDIUM",
  hard: "HARD",
  impossible: "IMPOSSIBLE",
};

// ثيم داكن عصري — لون نيون مختلف لكل مستوى
export const BG_TOP = "#0B1022";
export const BG_BOTTOM = "#161F3E";
export const LEVEL_STYLE = {
  easy: { accent: "#22E06A", glow: "rgba(34,224,106,0.55)" },
  medium: { accent: "#22C3FF", glow: "rgba(34,195,255,0.55)" },
  hard: { accent: "#FF8A3D", glow: "rgba(255,138,61,0.55)" },
  impossible: { accent: "#FF3D7F", glow: "rgba(255,61,127,0.6)" },
};

// ملاحظة: لا يوجد ولن يوجد علم إسرائيل في أي قائمة.
export const COUNTRIES = [
  // EASY (12) — مشهورة
  { name: "Brazil", iso: "br", level: "easy" },
  { name: "Argentina", iso: "ar", level: "easy" },
  { name: "France", iso: "fr", level: "easy" },
  { name: "Germany", iso: "de", level: "easy" },
  { name: "Italy", iso: "it", level: "easy" },
  { name: "Spain", iso: "es", level: "easy" },
  { name: "United Kingdom", iso: "gb", level: "easy" },
  { name: "United States", iso: "us", level: "easy" },
  { name: "Canada", iso: "ca", level: "easy" },
  { name: "Japan", iso: "jp", level: "easy" },
  { name: "China", iso: "cn", level: "easy" },
  { name: "India", iso: "in", level: "easy" },
  // MEDIUM (12)
  { name: "Mexico", iso: "mx", level: "medium" },
  { name: "Australia", iso: "au", level: "medium" },
  { name: "South Korea", iso: "kr", level: "medium" },
  { name: "Netherlands", iso: "nl", level: "medium" },
  { name: "Sweden", iso: "se", level: "medium" },
  { name: "Portugal", iso: "pt", level: "medium" },
  { name: "Türkiye", iso: "tr", level: "medium" },
  { name: "Greece", iso: "gr", level: "medium" },
  { name: "Saudi Arabia", iso: "sa", level: "medium" },
  { name: "Egypt", iso: "eg", level: "medium" },
  { name: "South Africa", iso: "za", level: "medium" },
  { name: "Switzerland", iso: "ch", level: "medium" },
  // HARD (12)
  { name: "Austria", iso: "at", level: "hard" },
  { name: "Norway", iso: "no", level: "hard" },
  { name: "Poland", iso: "pl", level: "hard" },
  { name: "Ireland", iso: "ie", level: "hard" },
  { name: "Thailand", iso: "th", level: "hard" },
  { name: "Vietnam", iso: "vn", level: "hard" },
  { name: "Ukraine", iso: "ua", level: "hard" },
  { name: "Colombia", iso: "co", level: "hard" },
  { name: "Chile", iso: "cl", level: "hard" },
  { name: "Philippines", iso: "ph", level: "hard" },
  { name: "Morocco", iso: "ma", level: "hard" },
  { name: "Nigeria", iso: "ng", level: "hard" },
  // IMPOSSIBLE (12) — نادرة
  { name: "Malaysia", iso: "my", level: "impossible" },
  { name: "Indonesia", iso: "id", level: "impossible" },
  { name: "Kenya", iso: "ke", level: "impossible" },
  { name: "Peru", iso: "pe", level: "impossible" },
  { name: "Czechia", iso: "cz", level: "impossible" },
  { name: "Bhutan", iso: "bt", level: "impossible" },
  { name: "Nepal", iso: "np", level: "impossible" },
  { name: "Kazakhstan", iso: "kz", level: "impossible" },
  { name: "Sri Lanka", iso: "lk", level: "impossible" },
  { name: "Kyrgyzstan", iso: "kg", level: "impossible" },
  { name: "Brunei", iso: "bn", level: "impossible" },
  { name: "Comoros", iso: "km", level: "impossible" },
];

// يبني خطّ زمني من قائمة الدول
export const buildTimeline = (countries) => {
  const segs = [];
  let f = 0;
  segs.push({ type: "intro", from: 0, dur: T.intro });
  f += T.intro;
  let last = null;
  let num = 0;
  for (const c of countries) {
    if (c.level !== last) {
      segs.push({ type: "level", level: c.level, from: f, dur: T.level });
      f += T.level;
      last = c.level;
    }
    num += 1;
    segs.push({ type: "round", country: c, num, from: f, dur: T.round });
    f += T.round;
  }
  segs.push({ type: "outro", from: f, dur: T.outro });
  f += T.outro;
  return { segs, total: f };
};
