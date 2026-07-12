// «GuessSync Short» — قالب شورت عمودي 1080×1920 · ~58 ثانية · 12 سؤال (3/مستوى)
// mode: "logos" | "flags" | "capitals" | "countries" — يعيد استخدام أصوات وأصول الحلقة.
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["700", "800", "900"] }).fontFamily;

const GAME = { blue: "#23429E", blueMid: "#122258", blueDeep: "#0A1436", gold: "#FFC53D", magenta: "#F35BD0" };
const LVL = {
  easy: { accent: "#FFD23F", label: "EASY" },
  medium: { accent: "#FF9F40", label: "MEDIUM" },
  hard: { accent: "#FF5C7A", label: "HARD" },
  impossible: { accent: "#B983FF", label: "IMPOSSIBLE" },
};

// توقيت الشورت: هوك 75 + (12 × 130) + خاتمة 120 = 1755 إطار ≈ 58.5 ثانية
const ST = { hook: 75, round: 130, reveal: 90, outro: 120 };
const TICKS = [0, 30, 60, 74, 82, 88];

// يختار 12 عنصر لشورت رقم part (0..4): 3 من كل مستوى، بلا تكرار بين الشورتات (part×3 إزاحة)
export const pickShort = (items, part = 0) => {
  const out = [];
  for (let b = 0; b < 4; b++) for (let k = 0; k < 3; k++) { const it = items[b * 25 + part * 3 + k]; if (it) out.push(it); }
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
  <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 48, color: "rgba(255,255,255,0.92)", letterSpacing: 1 }}>
    GUESS<span style={{ color: GAME.gold }}>SYNC</span>
  </div>
);

const Ring = ({ accent }) => {
  const frame = useCurrentFrame();
  const r = 70, C = 2 * Math.PI * r;
  const remain = interpolate(frame, [0, ST.reveal], [1, 0], { extrapolateRight: "clamp" });
  const secs = Math.max(1, Math.ceil((ST.reveal - frame) / 30));
  const danger = remain < 0.4;
  const col = danger ? "#FF3B3B" : accent;
  const shake = danger ? Math.sin(frame * 1.6) * 5 : 0;
  if (frame >= ST.reveal) return null;
  return (
    <div style={{ position: "absolute", top: 1170, left: "50%", marginLeft: -85, width: 170, height: 170, transform: `translateX(${shake}px)` }}>
      <svg width="170" height="170" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="85" cy="85" r={r} stroke="rgba(255,255,255,0.14)" strokeWidth="13" fill="none" />
        <circle cx="85" cy="85" r={r} stroke={col} strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - remain)} style={{ filter: `drop-shadow(0 0 12px ${col})` }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontWeight: 900, fontSize: 92, color: danger ? "#FF3B3B" : "#fff" }}>{secs}</div>
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
  if (mode === "logos") return <div style={{ ...card, width: 560, height: 560 }}><Img src={staticFile(`logos/${item.slug}.svg`)} style={{ width: 400, height: 400, objectFit: "contain" }} /></div>;
  if (mode === "animals") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`animals/${item.slug}.png`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "foods") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`foods/${item.slug}.png`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "dogs") return <div style={{ ...card, width: 620, height: 620 }}><Img src={staticFile(`dogs/${item.slug}.png`)} style={{ width: 560, height: 560, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "birds") return <div style={{ ...card, width: 640, height: 600 }}><Img src={staticFile(`birds/${item.slug}.jpg`)} style={{ width: 580, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "sea") return <div style={{ ...card, width: 660, height: 600 }}><Img src={staticFile(`sea/${item.slug}.jpg`)} style={{ width: 600, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "fruits") return <div style={{ ...card, width: 640, height: 600 }}><Img src={staticFile(`fruits/${item.slug}.jpg`)} style={{ width: 580, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "flowers") return <div style={{ ...card, width: 640, height: 600 }}><Img src={staticFile(`flowers/${item.slug}.jpg`)} style={{ width: 580, height: 540, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "butterflies") return <div style={{ ...card, width: 660, height: 560 }}><Img src={staticFile(`butterflies/${item.slug}.jpg`)} style={{ width: 600, height: 500, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "snakes") return <div style={{ ...card, width: 660, height: 560 }}><Img src={staticFile(`snakes/${item.slug}.jpg`)} style={{ width: 600, height: 500, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "landmarks") return <div style={{ ...card, width: 720, height: 560 }}><Img src={staticFile(`landmarks/${item.key}.png`)} style={{ width: 660, height: 500, objectFit: "cover", borderRadius: 28 }} /></div>;
  if (mode === "cars") return <div style={{ ...card, width: 740, height: 520 }}><Img src={staticFile(`cars/${item.slug}.png`)} style={{ width: 680, height: 460, objectFit: "cover", borderRadius: 28 }} /></div>;
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

const QWORD = { logos: "GUESS THE LOGO", animals: "GUESS THE ANIMAL", foods: "GUESS THE FOOD", dogs: "GUESS THE DOG", cars: "GUESS THE CAR", birds: "GUESS THE BIRD", sea: "GUESS THE SEA CREATURE", fruits: "FRUIT OR VEG?", flowers: "GUESS THE FLOWER", butterflies: "GUESS THE BUTTERFLY", snakes: "GUESS THE SNAKE", paintings: "GUESS THE PAINTING", landmarks: "WHICH COUNTRY?", flags: "GUESS THE COUNTRY", capitals: "GUESS THE CAPITAL", countries: "WHICH COUNTRY?", shapes: "WHAT COUNTRY?" };
const voFile = (item, mode) => mode === "logos" ? `sfx/nm-${item.slug}.wav` : mode === "animals" ? `sfx/an-${item.slug}.wav` : mode === "foods" ? `sfx/fd-${item.slug}.wav` : mode === "dogs" ? `sfx/dg-${item.slug}.wav` : mode === "cars" ? `sfx/cm-${item.slug}.wav` : mode === "birds" ? `sfx/bd-${item.slug}.wav` : mode === "sea" ? `sfx/sc-${item.slug}.wav` : mode === "fruits" ? `sfx/fr-${item.slug}.wav` : mode === "flowers" ? `sfx/fl-${item.slug}.wav` : mode === "butterflies" ? `sfx/bt-${item.slug}.wav` : mode === "snakes" ? `sfx/sn-${item.slug}.wav` : mode === "paintings" ? `sfx/pt-${item.slug}.wav` : mode === "capitals" ? `sfx/cp-${item.iso}.wav` : `sfx/fl-${item.iso}.wav`;
const answer = (item, mode) => mode === "paintings" ? item.title : (mode === "logos" || mode === "animals" || mode === "foods" || mode === "dogs" || mode === "cars" || mode === "birds" || mode === "sea" || mode === "fruits" || mode === "flowers" || mode === "butterflies" || mode === "snakes") ? item.name : mode === "capitals" ? item.capital : item.country || item.name;

const Round = ({ item, mode, num }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = LVL[item.level].accent;
  const revealed = frame >= ST.reveal;
  const enter = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const nameS = spring({ frame: frame - ST.reveal, fps, config: { damping: 9, mass: 0.5 } });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 60, color: "#fff", letterSpacing: 1 }}>{QWORD[mode]}</div>
      <div style={{ position: "absolute", top: 250, left: 60, fontFamily: font, fontWeight: 900, fontSize: 40, color: GAME.blueDeep, background: accent, padding: "6px 22px", borderRadius: 12 }}>{num}/12</div>
      <div style={{ position: "absolute", top: 250, right: 60, fontFamily: font, fontWeight: 800, fontSize: 40, color: accent }}>{LVL[item.level].label}</div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: -180, transform: `scale(${interpolate(enter, [0, 1], [0.6, 1])})`, opacity: enter }}>
        <Clue item={item} mode={mode} revealed={revealed} accent={accent} />
      </AbsoluteFill>
      <Ring accent={accent} />
      {revealed && (
        <div style={{ position: "absolute", top: 1240, left: 0, right: 0, textAlign: "center", transform: `scale(${interpolate(nameS, [0, 1], [0.4, 1])})` }}>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: 88, color: "#fff", textShadow: `0 0 42px ${accent}`, padding: "0 30px" }}>
            <span style={{ color: accent }}>✓ </span>{answer(item, mode)}
          </div>
        </div>
      )}
      <Owl revealed={revealed} />
      {TICKS.map((tf) => <Sequence key={tf} from={tf} durationInFrames={12}><Audio src={staticFile("sfx/tick.wav")} volume={0.5} /></Sequence>)}
      <Sequence from={ST.reveal} durationInFrames={40}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>
      <Sequence from={ST.reveal + 6} durationInFrames={70}><Audio src={staticFile(voFile(item, mode))} volume={1} /></Sequence>
    </AbsoluteFill>
  );
};

const Hook = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 11 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30, padding: "0 60px" }}>
      <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 300, height: 300, objectFit: "contain", transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})` }} />
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 96, color: "#fff", textAlign: "center", lineHeight: 1.1 }}>Only <span style={{ color: GAME.gold }}>1%</span> can name these!</div>
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 54, color: GAME.blueDeep, background: GAME.gold, padding: "14px 40px", borderRadius: 999 }}>{title}</div>
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
  const segs = [{ t: "hook", from: 0, dur: ST.hook }];
  let f = ST.hook, num = 0;
  for (const it of items) { num += 1; segs.push({ t: "round", item: it, num, from: f, dur: ST.round }); f += ST.round; }
  segs.push({ t: "outro", from: f, dur: ST.outro }); f += ST.outro;
  return { segs, total: f };
};

export const ShortQuiz = ({ items, mode, title, part = 0 }) => {
  const list = items.length > 12 ? pickShort(items, part) : items;
  const { segs } = build(list);
  return (
    <AbsoluteFill style={{ backgroundColor: GAME.blueDeep }}>
      <Bg />
      <Watermark />
      {segs.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          {s.t === "hook" && <Hook title={title} />}
          {s.t === "round" && <Round item={s.item} mode={mode} num={s.num} />}
          {s.t === "outro" && <Outro />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const SHORT_FRAMES = build(new Array(12).fill(0)).total; // 1755
