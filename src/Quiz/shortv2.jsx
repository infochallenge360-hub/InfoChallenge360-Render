// «GuessSync Short» — قالب شورت عمودي 1080×1920 · ~58 ثانية · 12 سؤال (3/مستوى)
// mode: "logos" | "flags" | "capitals" | "countries" — يعيد استخدام أصوات وأصول الحلقة.
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["700", "800", "900"] }).fontFamily;

const GAME = { blue: "#2E86C1", blueMid: "#155A8A", blueDeep: "#0A2E47", gold: "#F2B705", magenta: "#F35BD0" };
const LVL = {
  easy: { accent: "#FFD23F", label: "EASY" },
  medium: { accent: "#FF9F40", label: "MEDIUM" },
  hard: { accent: "#FF5C7A", label: "HARD" },
  impossible: { accent: "#B983FF", label: "IMPOSSIBLE" },
};

// v2: 4 خيارات لكل سؤال + شريط تايمر يمتلئ (5 ثواني). يبلش مباشرة بالسؤال الأول (بلا شاشة هوك).
const ST = { round: 240, reveal: 150, outro: 120 };
const TICKS = [0, 25, 50, 75, 100, 120, 130, 138, 144, 148];
const ABCD = ["A", "B", "C", "D"];
const nameOf = (x, mode) => mode === "paintings" ? x.title : (mode === "capitals" || mode === "capitals-e64") ? x.capital : (x.name || x.country || x.slug);
const buildOptions = (item, all, mode) => {
  const pool = all.filter((x) => x.level === item.level && (x.slug || x.iso) !== (item.slug || item.iso));
  const seed = (item.slug || item.iso || item.name).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const myName = nameOf(item, mode);
  // Dedup by displayed NAME, not slug — see the matching fix/comment in
  // quizv2.jsx's buildOptions (caught via E91 Religion Symbols, where
  // several distinct symbol slugs share the same religion as their answer).
  const picks = [], usedNames = new Set([myName]);
  let k = 1;
  while (picks.length < 3 && k < pool.length * 4) {
    const cand = pool[(seed * 7 + k * 13) % pool.length];
    const candName = cand && nameOf(cand, mode);
    if (candName && !usedNames.has(candName)) { usedNames.add(candName); picks.push(candName); }
    k++;
  }
  const correctIdx = seed % 4;
  const opts = picks.slice();
  opts.splice(correctIdx, 0, myName);
  return { opts: opts.slice(0, 4), correctIdx };
};

// هاش بسيط وثابت (بدون Math.random) لعمل ترتيب "عشوائي" لكن قابل لإعادة الإنتاج لكل "دورة"
const _hashStr = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; };
const _seededShuffle = (arr, seed) =>
  arr.map((item, i) => ({ item, key: _hashStr(`${seed}-${i}-${item.slug || item.iso || i}`) }))
     .sort((a, b) => a.key - b.key)
     .map((x) => x.item);

// يختار 12 عنصر لشورت رقم part (0..4): 3 من كل مستوى، بلا تكرار بين الشورتات إذا أمكن.
// معمم لأي حجم تير (يدعم حلقات 25/تير القديمة وحلقات 65-78 غير المتساوية الأحدث). لما يكون
// حجم التير أصغر من 15 (5 شورتات × 3)، القديم كان يكرر نفس الـ3 عناصر بالترتيب نفسه بين
// الشورتات (مثلاً شورت 5 = شورت 1 بالضبط). الحل: نبني "دورات" من ترتيب مبعثر (deterministic
// shuffle) بذرة مختلفة لكل دورة، فلما يضطر التكرار يصير بترتيب مختلف، مو نسخة طبق الأصل.
export const pickShort = (items, part = 0) => {
  const levels = ["easy", "medium", "hard", "impossible"];
  const groups = levels.map((lvl) => items.filter((it) => it.level === lvl));
  const out = [];
  const NEEDED = 15; // 5 شورتات × 3 عناصر لكل تير
  const keyOf = (x) => x && (x.slug || x.iso);
  for (const pool of groups) {
    if (!pool.length) continue;
    let sequence = [];
    for (let lap = 0; sequence.length < NEEDED + pool.length; lap++) sequence = sequence.concat(_seededShuffle(pool, `lap${lap}`));
    const start = part * 3;
    const slice = [sequence[start], sequence[start + 1], sequence[start + 2]];
    // لو صادف تكرار داخل نفس الثلاثية (بيصير عند حافة "الدورة" إذا حجم التير صغير — الثلاثية بتاخذ عنصرين من دورة وعنصر من التالية)،
    // بدّل العنصر المكرر بأقرب عنصر لاحق بالتسلسل مو مستخدم بهالثلاثية أصلاً
    const used = new Set();
    for (let i = 0; i < slice.length; i++) {
      let key = keyOf(slice[i]);
      if (used.has(key)) {
        let j = start + slice.length;
        while (j < sequence.length && used.has(keyOf(sequence[j]))) j++;
        slice[i] = sequence[j];
        key = keyOf(slice[i]);
      }
      used.add(key);
    }
    out.push(...slice);
  }
  return out;
};

const Bg = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const parts = [];
  for (let i = 0; i < 16; i++) {
    const seed = i * 137.5;
    const x = (seed * 1.7) % width;
    const y = height + 40 - ((frame * (0.6 + (i % 4) * 0.5) + seed * 2.1) % (height + 140));
    const sz = 4 + (i % 4) * 5;
    parts.push(<div key={i} style={{ position: "absolute", left: x + Math.sin(frame / 30 + i) * 16, top: y, width: sz, height: sz, borderRadius: "50%", background: GAME.gold, opacity: 0.18, boxShadow: `0 0 ${sz * 2}px ${GAME.gold}` }} />);
  }
  return (
    <AbsoluteFill style={{ background: `radial-gradient(80% 60% at 50% 32%, ${GAME.blue} 0%, ${GAME.blueMid} 52%, ${GAME.blueDeep} 100%)`, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 50% 30%, rgba(255,197,61,0.06) 0deg 4deg, transparent 4deg 13deg)", maskImage: "radial-gradient(circle at 50% 30%, #000 3%, transparent 55%)", WebkitMaskImage: "radial-gradient(circle at 50% 30%, #000 3%, transparent 55%)" }} />
      {parts}
    </AbsoluteFill>
  );
};

const Watermark = () => (
  <div style={{ position: "absolute", top: 60, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: font, fontWeight: 900, fontSize: 40, color: "rgba(255,255,255,0.92)", letterSpacing: 1 }}>
    <Img src={staticFile("brand/logo-icon.png")} style={{ width: 52, height: 52, objectFit: "contain", borderRadius: "50%" }} />
    INFO CHALLENGE<span style={{ color: GAME.gold }}> 360</span>
  </div>
);

// شريط تايمر عمودي يمتلئ (5 ثواني) — أسفل الشورت
const VTimerBar = ({ accent }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, ST.reveal], [0, 1], { extrapolateRight: "clamp" });
  const revealed = frame >= ST.reveal;
  const col = revealed ? "#3BE07A" : (p > 0.75 ? "#FF3B3B" : (p > 0.5 ? "#FF9F40" : accent));
  const w = revealed ? 100 : p * 100;
  const secs = Math.max(0, ((ST.reveal - frame) / 30)).toFixed(1);
  return (
    <div style={{ position: "absolute", left: 60, right: 240, top: 1600 }}>
      <div style={{ position: "relative", height: 46, borderRadius: 999, background: "rgba(6,10,32,0.5)", border: `5px solid ${GAME.gold}`, overflow: "hidden", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${w}%`, borderRadius: 999, background: col, boxShadow: `0 0 26px ${col}` }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 52%)" }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "50%", left: `${w}%`, transform: "translate(-50%, -50%)", width: 60, height: 60, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: `5px solid ${col}`, overflow: "hidden" }}>
        <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 50, height: 50, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", top: 0, left: "calc(100% + 20px)", fontFamily: font, fontWeight: 900, fontSize: 44, color: "#fff", background: "rgba(6,10,32,0.5)", padding: "2px 20px", borderRadius: 999, whiteSpace: "nowrap" }}>{secs}s</div>
    </div>
  );
};

const Owl = ({ revealed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bob = Math.sin(frame / 12) * 10;
  const cheer = spring({ frame: frame - ST.reveal, fps, config: { damping: 8, mass: 0.5 } });
  return (
    <Img src={staticFile(revealed ? "brand/owl-cheer.png" : "brand/owl-think.png")}
      style={{ position: "absolute", right: 40, bottom: 360, width: 220, height: 220, objectFit: "contain", transform: `translateY(${bob}px) scale(${revealed ? interpolate(cheer, [0, 1], [0.85, 1.08]) : 1})`, filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.5))" }} />
  );
};

// كلمة السؤال + بطاقة الدليل حسب النوع
const Clue = ({ item, mode, revealed, accent }) => {
  const card = { padding: 24, background: "#fff", borderRadius: 40, boxShadow: revealed ? `0 0 90px ${accent}` : "0 30px 70px rgba(0,0,0,0.5)", border: `7px solid ${revealed ? accent : "rgba(255,255,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center" };
  if (mode === "shapes") return <div style={{ width: 660, height: 560, WebkitMaskImage: `url(${staticFile(`maps/${item.iso}.svg`)})`, maskImage: `url(${staticFile(`maps/${item.iso}.svg`)})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", background: revealed ? `linear-gradient(160deg, #FFE888, ${accent})` : "linear-gradient(160deg, #ffffff, #b9cdf0)", filter: revealed ? `drop-shadow(0 0 40px ${accent})` : "drop-shadow(0 12px 30px rgba(0,0,0,0.6))" }} />;
  if (mode === "logos" || mode === "logos-e03") return <div style={{ ...card, width: 560, height: 560 }}><Img src={staticFile(`logos/${item.slug}.svg`)} style={{ width: 400, height: 400, objectFit: "contain" }} /></div>;
  if (mode === "animals") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`animals/${item.slug}.png`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "animals-e01") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`animals/${item.slug}.jpg`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "foods") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`foods/${item.slug}.png`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "foods-e04") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`foods/${item.slug}.jpg`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "dogs") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`dogs/${item.slug}.png`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "birds") return <div style={{ ...card, width: 640, height: 600 }}><Img src={staticFile(`birds/${item.slug}.jpg`)} style={{ width: 580, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "sea") return <div style={{ ...card, width: 660, height: 600 }}><Img src={staticFile(`sea/${item.slug}.jpg`)} style={{ width: 600, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "fruits") return <div style={{ ...card, width: 640, height: 600 }}><Img src={staticFile(`fruits/${item.slug}.jpg`)} style={{ width: 580, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "flowers") return <div style={{ ...card, width: 640, height: 600 }}><Img src={staticFile(`flowers/${item.slug}.jpg`)} style={{ width: 580, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "butterflies") return <div style={{ ...card, width: 660, height: 560 }}><Img src={staticFile(`butterflies/${item.slug}.jpg`)} style={{ width: 600, height: 500, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "snakes") return <div style={{ ...card, width: 660, height: 560 }}><Img src={staticFile(`snakes/${item.slug}.jpg`)} style={{ width: 600, height: 500, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "landmarks") return <div style={{ ...card, width: 720, height: 560 }}><Img src={staticFile(`landmarks/${item.key}.png`)} style={{ width: 660, height: 500, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "cars") return <div style={{ ...card, width: 740, height: 520 }}><Img src={staticFile(`cars/${item.slug}.png`)} style={{ width: 680, height: 460, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "gemstones-e50") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`gemstones/${item.slug}.jpg`)} style={{ width: 560, height: 560, objectFit: "contain" }} /></div>;
  if (mode === "statues-e51") return <div style={{ ...card, width: 620, height: 700 }}><Img src={staticFile(`statues/${item.slug}.jpg`)} style={{ width: 560, height: 640, objectFit: "contain" }} /></div>;
  if (mode === "elements-e52") return <div style={{ ...card, width: 660, height: 560 }}><Img src={staticFile(`elements/${item.slug}.jpg`)} style={{ width: 600, height: 500, objectFit: "contain" }} /></div>;
  if (mode === "classic-cars-e53") return <div style={{ ...card, width: 740, height: 520 }}><Img src={staticFile(`classic-cars/${item.slug}.jpg`)} style={{ width: 680, height: 460, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "trophies-e54") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`trophies/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "contain" }} /></div>;
  if (mode === "stadiums-e55") return <div style={{ ...card, width: 740, height: 520 }}><Img src={staticFile(`stadiums/${item.slug}.jpg`)} style={{ width: 680, height: 460, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "catbreeds-e56") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`catbreeds/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "nationalparks-e57") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`nationalparks/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "skyscrapers-e58") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`skyscrapers/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "palaces-e59") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`palaces/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "cathedrals-e60") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`cathedrals/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "mosques-e61") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`mosques/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "lighthouses-e62") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`lighthouses/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "phones-e65") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`phones/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "apple-e66") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`apple/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "phonelogos-e67") return <div style={{ ...card, width: 560, height: 560 }}><Img src={staticFile(`logos67/${item.slug}.png`)} style={{ width: 400, height: 400, objectFit: "contain" }} /></div>;
  if (mode === "nokia-e68") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`nokia68/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "supercars-e69") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`supercars69/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "evcars-e70") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`evcars70/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "pickups-e71") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`pickups71/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "suvs-e72") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`suvs72/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "jdm-e73") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`jdm73/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "veg-e74") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`veg74/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "moto-e75") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`moto75/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "plane-e76") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`airplanes76/${item.slug}.jpg`)} style={{ width: 580, height: 640, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "state-e77") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`states77/${item.slug}.svg`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "nba-e78") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`nba78/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "nfl-e79") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`nfl79/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "mlb-e80") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`mlb80/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "nhl-e81") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`nhl81/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "roadsigns-e82") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`roadsigns82/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "mythical-e83") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`mythical83/${item.slug}.jpg`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "emoji-e84") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`emoji84/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "weather-e85") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`weather85/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "constellation-e86") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`constellations86/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "font-e87") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`fonts87/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "year-e88") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`years88/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "book-e89") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`books89/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "language-e90") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`languages90/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "religion-e91") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`religionsymbols91/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "dinosaur-e92") return <div style={{ ...card, width: 640, height: 700 }}><Img src={staticFile(`dinosaurs92/${item.slug}.png`)} style={{ width: 500, height: 600, objectFit: "contain" }} /></div>;
  if (mode === "capitals-e63") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      <div style={{ ...card, width: 560, height: 460 }}><Img src={staticFile(`maps/${item.iso}.svg`)} style={{ width: 480, height: 380, objectFit: "contain" }} /></div>
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 46, color: "#fff", textShadow: "0 3px 16px rgba(0,0,0,0.5)" }}>CAPITAL: {item.capital}</div>
    </div>
  );
  if (mode === "capitals-e64") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      <div style={{ ...card, width: 560, height: 460 }}><Img src={staticFile(`maps/${item.iso}.svg`)} style={{ width: 480, height: 380, objectFit: "contain" }} /></div>
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 46, color: "#fff", textShadow: "0 3px 16px rgba(0,0,0,0.5)" }}>COUNTRY: {item.name}</div>
    </div>
  );
  if (mode === "paintings") return <div style={{ padding: 22, background: "linear-gradient(160deg, #fdfbf4, #efe7d2)", borderRadius: 10, border: `16px solid ${revealed ? accent : "#2a2118"}`, boxShadow: revealed ? `0 0 90px ${accent}` : "0 30px 70px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}><Img src={staticFile(`paintings/${item.slug}.jpg`)} style={{ maxWidth: 720, maxHeight: 760, width: "auto", height: "auto", objectFit: "contain", display: "block" }} /></div>;
  if (mode === "flags") return <div style={{ ...card, width: 640, height: 430 }}><Img src={staticFile(`flags/${item.iso}.svg`)} style={{ width: 560, height: 373, objectFit: "contain" }} /></div>;
  if (mode === "capitals") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      <div style={{ ...card, width: 560, height: 373 }}><Img src={staticFile(`flags/${item.iso}.svg`)} style={{ width: 480, height: 320, objectFit: "contain" }} /></div>
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 62, color: "#fff", textShadow: "0 3px 16px rgba(0,0,0,0.5)" }}>{item.country}</div>
    </div>
  );
  // countries: يظهر العاصمة نصاً
  return <div style={{ fontFamily: font, fontWeight: 900, fontSize: 92, color: "#fff", textAlign: "center", padding: "0 40px", textShadow: `0 0 40px ${accent}` }}>{item.capital}</div>;
};

const QWORD = { logos: "GUESS THE LOGO", "logos-e03": "GUESS THE LOGO", animals: "GUESS THE ANIMAL", "animals-e01": "GUESS THE ANIMAL", foods: "GUESS THE FOOD", "foods-e04": "GUESS THE FOOD", dogs: "GUESS THE DOG", cars: "GUESS THE CAR", birds: "GUESS THE BIRD", sea: "GUESS THE SEA CREATURE", fruits: "FRUIT OR VEG?", flowers: "GUESS THE FLOWER", butterflies: "GUESS THE BUTTERFLY", snakes: "GUESS THE SNAKE", paintings: "GUESS THE PAINTING", landmarks: "WHICH COUNTRY?", flags: "GUESS THE COUNTRY", capitals: "GUESS THE CAPITAL", countries: "WHICH COUNTRY?", shapes: "WHAT COUNTRY?", "gemstones-e50": "GUESS THE GEMSTONE", "statues-e51": "GUESS THE STATUE", "elements-e52": "GUESS THE ELEMENT", "classic-cars-e53": "GUESS THE CLASSIC CAR", "trophies-e54": "GUESS THE SPORTS TROPHY", "stadiums-e55": "GUESS THE STADIUM", "catbreeds-e56": "GUESS THE CAT BREED", "nationalparks-e57": "GUESS THE NATIONAL PARK", "skyscrapers-e58": "GUESS THE SKYSCRAPER", "palaces-e59": "GUESS THE PALACE", "cathedrals-e60": "GUESS THE CATHEDRAL", "mosques-e61": "GUESS THE MOSQUE", "lighthouses-e62": "GUESS THE LIGHTHOUSE", "capitals-e63": "GUESS THE COUNTRY", "capitals-e64": "GUESS THE CAPITAL", "phones-e65": "GUESS THE PHONE", "apple-e66": "GUESS THE DEVICE", "phonelogos-e67": "GUESS THE LOGO", "nokia-e68": "GUESS THE NOKIA", "supercars-e69": "GUESS THE SUPERCAR", "evcars-e70": "GUESS THE ELECTRIC CAR", "pickups-e71": "GUESS THE PICKUP", "suvs-e72": "GUESS THE SUV", "jdm-e73": "GUESS THE JDM CAR", "veg-e74": "GUESS THE VEGETABLE", "moto-e75": "GUESS THE MOTORCYCLE", "plane-e76": "GUESS THE AIRPLANE", "state-e77": "GUESS THE US STATE", "nba-e78": "GUESS THE NBA TEAM", "nfl-e79": "GUESS THE NFL TEAM", "mlb-e80": "GUESS THE MLB TEAM", "nhl-e81": "GUESS THE NHL TEAM", "roadsigns-e82": "GUESS THE ROAD SIGN", "mythical-e83": "GUESS THE MYTHICAL CREATURE", "emoji-e84": "GUESS THE EMOJI", "weather-e85": "GUESS THE WEATHER SYMBOL", "constellation-e86": "GUESS THE CONSTELLATION", "font-e87": "GUESS THE FONT", "year-e88": "GUESS THE YEAR", "book-e89": "GUESS THE BOOK", "language-e90": "GUESS THE LANGUAGE", "religion-e91": "GUESS THE RELIGION", "dinosaur-e92": "GUESS THE DINOSAUR" };
const NAME_MODES = ["logos", "logos-e03", "animals", "animals-e01", "foods", "foods-e04", "dogs", "cars", "birds", "sea", "fruits", "flowers", "butterflies", "snakes", "gemstones-e50", "statues-e51", "elements-e52", "classic-cars-e53", "trophies-e54", "stadiums-e55", "catbreeds-e56", "nationalparks-e57", "skyscrapers-e58", "palaces-e59", "cathedrals-e60", "mosques-e61", "lighthouses-e62", "capitals-e63"];
const VO_PREFIX = { logos: "nm", "logos-e03": "lg", animals: "an", "animals-e01": "an", foods: "fd", "foods-e04": "fd", dogs: "dg", cars: "cm", birds: "bd", sea: "sc", fruits: "fr", flowers: "fl", butterflies: "bt", snakes: "sn", paintings: "pt", "gemstones-e50": "gm", "statues-e51": "st", "elements-e52": "ce", "classic-cars-e53": "cv", "trophies-e54": "tr", "stadiums-e55": "sd", "catbreeds-e56": "ct", "nationalparks-e57": "np", "skyscrapers-e58": "sg", "palaces-e59": "pz", "cathedrals-e60": "cd", "mosques-e61": "mq", "lighthouses-e62": "lh", "phones-e65": "ph", "apple-e66": "ap", "phonelogos-e67": "pb", "nokia-e68": "nk", "supercars-e69": "sp", "evcars-e70": "ev", "pickups-e71": "pk", "suvs-e72": "sv", "jdm-e73": "jd", "veg-e74": "vt", "moto-e75": "mc", "plane-e76": "av", "state-e77": "us", "nba-e78": "nb", "nfl-e79": "nf", "mlb-e80": "mb", "nhl-e81": "nh", "roadsigns-e82": "rs", "mythical-e83": "my", "emoji-e84": "eo", "weather-e85": "we", "constellation-e86": "sk", "font-e87": "fn", "year-e88": "yr", "book-e89": "bk", "language-e90": "la", "religion-e91": "rl", "dinosaur-e92": "dn" };
const voFile = (item, mode) => mode === "capitals-e63" ? `sfx/wc-${item.iso}.wav` : mode === "capitals-e64" ? `sfx/gp-${item.iso}.wav` : VO_PREFIX[mode] ? `sfx/${VO_PREFIX[mode]}-${item.slug}.wav` : mode === "capitals" ? `sfx/cp-${item.iso}.wav` : `sfx/fl-${item.iso}.wav`;
const answer = (item, mode) => mode === "paintings" ? item.title : NAME_MODES.includes(mode) ? item.name : mode === "capitals" ? item.capital : item.country || item.name;

const Round = ({ item, mode, num, all }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = LVL[item.level].accent;
  const revealed = frame >= ST.reveal;
  const enter = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const { opts, correctIdx } = buildOptions(item, all, mode);
  const flash = interpolate(frame, [ST.reveal, ST.reveal + 3, ST.reveal + 11], [0, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 58, color: "#fff", letterSpacing: 1 }}>{QWORD[mode]}</div>
      <div style={{ position: "absolute", top: 208, left: 60, fontFamily: font, fontWeight: 900, fontSize: 40, color: GAME.blueDeep, background: accent, padding: "6px 22px", borderRadius: 12 }}>{num}/12</div>
      <div style={{ position: "absolute", top: 208, right: 60, fontFamily: font, fontWeight: 800, fontSize: 40, color: accent }}>{LVL[item.level].label}</div>
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${interpolate(enter, [0, 1], [0.6, 1])})`, opacity: enter }}>
        <Clue item={item} mode={mode} revealed={revealed} accent={accent} />
      </div>
      {/* 4 خيارات 2×2 */}
      <div style={{ position: "absolute", top: 1030, left: 56, right: 56, display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {opts.map((nm, i) => {
          const isC = i === correctIdx;
          const os = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 12, mass: 0.6 } });
          const bg = revealed ? (isC ? "#1D9E75" : "rgba(255,60,60,0.14)") : "rgba(255,255,255,0.10)";
          const bd = revealed ? (isC ? "#7CF0C4" : "rgba(255,60,60,0.4)") : "rgba(255,255,255,0.22)";
          const op = (revealed && !isC ? 0.45 : 1) * interpolate(os, [0, 1], [0, 1]);
          return (
            <div key={i} style={{ width: 462, height: 148, display: "flex", alignItems: "center", gap: 16, background: bg, border: `4px solid ${bd}`, borderRadius: 24, padding: "0 24px", opacity: op, transform: `scale(${revealed && isC ? 1.05 : 1}) translateY(${interpolate(os, [0, 1], [24, 0])}px)`, boxShadow: revealed && isC ? `0 0 40px ${accent}` : "none" }}>
              <span style={{ width: 68, height: 68, borderRadius: 16, background: revealed && isC ? "#fff" : GAME.gold, color: GAME.blueDeep, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontWeight: 900, fontSize: 40, flex: "none" }}>{ABCD[i]}</span>
              <span style={{ fontFamily: font, fontWeight: 900, fontSize: nm.length > 12 ? 38 : 46, color: "#fff", lineHeight: 1 }}>{nm}</span>
              {revealed && isC && <span style={{ marginLeft: "auto", fontFamily: font, fontWeight: 900, fontSize: 52, color: "#fff" }}>✓</span>}
            </div>
          );
        })}
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
      <VTimerBar accent={accent} />
      <Owl revealed={revealed} />
      {TICKS.map((tf) => <Sequence key={tf} from={tf} durationInFrames={12}><Audio src={staticFile("sfx/tick.wav")} volume={0.5} /></Sequence>)}
      <Sequence from={ST.reveal} durationInFrames={40}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>
      <Sequence from={ST.reveal + 6} durationInFrames={100}><Audio src={staticFile(voFile(item, mode))} volume={1} /></Sequence>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.05 * Math.sin(frame / 7);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: "0 60px" }}>
      <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 280, height: 280, objectFit: "contain", transform: `translateY(${Math.sin(frame / 10) * 10}px)` }} />
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 100, color: "#fff", textAlign: "center", lineHeight: 1.1 }}>How many did<br />you get? <span style={{ color: GAME.gold }}>/12</span></div>
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 56, color: "rgba(255,255,255,0.95)" }}>👇 Comment your score</div>
      <div style={{ background: "#FF0000", color: "#fff", fontFamily: font, fontWeight: 800, fontSize: 60, padding: "20px 70px", borderRadius: 999, transform: `scale(${pulse})` }}>SUBSCRIBE</div>
    </AbsoluteFill>
  );
};

const build = (items) => {
  const segs = [];
  let f = 0, num = 0;
  for (const it of items) { num += 1; segs.push({ t: "round", item: it, num, from: f, dur: ST.round }); f += ST.round; }
  segs.push({ t: "outro", from: f, dur: ST.outro }); f += ST.outro;
  return { segs, total: f };
};

export const ShortV2Quiz = ({ items, mode, part = 0 }) => {
  const list = items.length > 12 ? pickShort(items, part) : items;
  const { segs } = build(list);
  return (
    <AbsoluteFill style={{ backgroundColor: GAME.blueDeep }}>
      <Bg />
      <Watermark />
      {segs.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          {s.t === "round" && <Round item={s.item} mode={mode} num={s.num} all={items} />}
          {s.t === "outro" && <Outro />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const SHORTV2_FRAMES = build(new Array(12).fill(0)).total; // 3000 (100s)
