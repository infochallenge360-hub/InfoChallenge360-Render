// ريل LinkedIn — أسلوب كابشن حركي سريع (طاقة عالية، كلمة-بكلمة)
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, radius } from "./theme";
import { LINKEDIN, MiniProfile } from "./career/bits";

export const REEL_FRAMES = 1050; // 35s @30fps

// ───────── خلفية ديناميكية مستمرة ─────────
const Dynamo = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const blob = (cx, cy, r, color, sp, ax, ay, op) => {
    const t = frame / 30;
    return (
      <div style={{ position: "absolute", left: cx + Math.sin(t * sp) * ax - r, top: cy + Math.cos(t * sp * 0.9) * ay - r, width: r * 2, height: r * 2, borderRadius: "50%", background: color, filter: "blur(70px)", opacity: op }} />
    );
  };
  // جزيئات تطفو لأعلى
  const parts = [];
  for (let i = 0; i < 14; i++) {
    const seed = i * 137.5;
    const x = (seed % width);
    const y = (height - ((frame * (2 + (i % 3)) + seed) % (height + 200))) ;
    const s = 8 + (i % 4) * 6;
    parts.push(<div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: i % 3 === 0 ? colors.green : colors.green400, opacity: 0.18 }} />);
  }
  return (
    <AbsoluteFill style={{ background: colors.white, overflow: "hidden" }}>
      {blob(width * 0.2, height * 0.22, 280, colors.green, 0.9, 90, 70, 0.22)}
      {blob(width * 0.85, height * 0.3, 240, colors.green400, 0.7, 100, 80, 0.2)}
      {blob(width * 0.7, height * 0.82, 320, colors.green, 0.8, 110, 60, 0.18)}
      {blob(width * 0.15, height * 0.8, 240, colors.green400, 1.0, 80, 90, 0.18)}
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${colors.green100} 2px, transparent 2px)`, backgroundSize: "50px 50px", backgroundPosition: `0 ${(-frame * 1.5) % 50}px`, opacity: 0.5 }} />
      {parts}
    </AbsoluteFill>
  );
};

// كلمة تنطّ (overshoot) + طفو مستمر
const Word = ({ children, delay, color = colors.ink, emphasis = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 8, mass: 0.5, stiffness: 150 } });
  const appear = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const pop = interpolate(s, [0, 1], [0.2, 1]);
  const rot = interpolate(s, [0, 1], [-7, 0]);
  const float = Math.sin((frame - delay) / 16) * 4;
  const pulse = emphasis ? 1 + 0.07 * Math.max(0, Math.sin((frame - delay) / 7)) : 1;
  return (
    <span style={{ display: "inline-block", margin: "0 0.16em", opacity: appear, color, transform: `scale(${pop * pulse}) translateY(${float}px) rotate(${rot}deg)` }}>{children}</span>
  );
};

// سطر كينِتِك: مصفوفة كلمات {t, c?, e?}
const Kinetic = ({ words, size = 120, start = 4, step = 5, lift = 0 }) => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [0, 8], [1.18, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ direction: "rtl", justifyContent: "center", alignItems: "center", padding: "100px 70px" }}>
      <div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: size, lineHeight: 1.2, textAlign: "center", transform: `scale(${punch}) translateY(${lift}px)`, textShadow: "0 6px 24px rgba(11,199,114,0.12)" }}>
        {words.map((w, i) => (
          <Word key={i} delay={start + i * step} color={w.c || colors.ink} emphasis={w.e}>{w.t}</Word>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Float = ({ children, amp = 14, speed = 22, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame / speed + phase) * amp}px)` }}>{children}</div>;
};

// ───────── ثابتة ─────────
const LogoBug = () => {
  const frame = useCurrentFrame();
  if (frame >= 958) return null;
  return (
    <div style={{ position: "absolute", top: 56, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 60 }}>
      <Img src={staticFile("brand/logo-full.png")} style={{ height: 64 }} />
    </div>
  );
};

const ProgressBar = () => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, REEL_FRAMES], [0, 100], { extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", bottom: 0, left: 0, height: 12, width: `${w}%`, background: colors.green, zIndex: 70, boxShadow: "0 -2px 12px rgba(11,199,114,0.5)" }} />;
};

// وميض أخضر سريع عند الانتقال
const Flash = ({ start }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0 || local > 10) return null;
  const op = interpolate(local, [0, 3, 10], [0, 0.5, 0]);
  return <AbsoluteFill style={{ background: colors.green, opacity: op, zIndex: 45 }} />;
};

// ───────── المقارنة (هو/انت) ─────────
const Compare = () => (
  <AbsoluteFill style={{ direction: "rtl", justifyContent: "center", alignItems: "center" }}>
    <div style={{ position: "absolute", top: 250, width: "100%", textAlign: "center" }}>
      <Kinetic words={[{ t: "حسابه" }, { t: "واضح", c: LINKEDIN, e: true }, { t: "…", }, { t: "وحسابك", }, { t: "لا!", c: "#e23", e: true }]} size={92} />
    </div>
    <div style={{ display: "flex", gap: 50, marginTop: 120 }}>
      <div style={{ textAlign: "center" }}>
        <Float amp={16} phase={0}><MiniProfile w={320} linkedin /></Float>
        <div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 50, color: LINKEDIN, marginTop: 22 }}>هو ✓</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Float amp={16} phase={2}><MiniProfile w={320} dim /></Float>
        <div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 50, color: "#9aa6a0", marginTop: 22 }}>انت ✗</div>
      </div>
    </div>
  </AbsoluteFill>
);

// ───────── القيمة (تتابع سريع) ─────────
const VALUE = [
  [{ t: "Headline", c: LINKEDIN }, { t: "و", }, { t: "About", c: LINKEDIN }, { t: "يلفتون", c: colors.green, e: true }, { t: "النظر" }],
  [{ t: "بحث", }, { t: "احترافي", c: colors.green, e: true }, { t: "عن", }, { t: "الوظايف" }],
  [{ t: "أدوات", }, { t: "ذكاء اصطناعي", c: colors.green, e: true }, { t: "تطوّر", }, { t: "ملفك" }],
  [{ t: "وتكسب", }, { t: "من", }, { t: "مهارتك!", c: colors.green, e: true }],
];
const ValueRapid = () => {
  const frame = useCurrentFrame();
  const per = 66;
  const idx = Math.min(VALUE.length - 1, Math.floor(frame / per));
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 230, width: "100%", textAlign: "center", direction: "rtl" }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 56, color: "#5a6b63" }}>اللي تتعلّمه:</div>
      </div>
      <Sequence from={idx * per} durationInFrames={per} layout="none">
        <Kinetic words={VALUE[idx]} size={104} step={4} lift={60} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ───────── CTA ─────────
const CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 12 } });
  const btn = spring({ frame: frame - 26, fps, config: { damping: 9, mass: 0.6 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 6);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${colors.green}, ${colors.green600})` }}>
      <AbsoluteFill style={{ direction: "rtl", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 90, gap: 40 }}>
        <Img src={staticFile("brand/logo-white-full.png")} style={{ width: 520, opacity: logoS, transform: `scale(${interpolate(logoS, [0, 1], [0.6, 1])})` }} />
        <div style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 104, color: "#fff", textAlign: "center", transform: `scale(${pulse})` }}>سجّل الحين!</div>
        <div style={{ transform: `scale(${interpolate(btn, [0, 1], [0.4, 1])})`, opacity: btn, background: "#fff", color: colors.green700, fontFamily: fonts.latin, fontWeight: 700, fontSize: 60, padding: "30px 80px", borderRadius: 999, boxShadow: "0 20px 50px rgba(0,0,0,0.25)", direction: "ltr" }}>mnbety.com</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const S = ({ from, dur, children }) => (
  <Sequence from={from} durationInFrames={dur}>{children}</Sequence>
);

// ───────── التكوين ─────────
export const MnbetyReel = () => (
  <AbsoluteFill style={{ backgroundColor: colors.green }}>
    <Audio src={staticFile("gen/reel-vo.mp3")} />
    <Dynamo />

    <S from={0} dur={92}><Kinetic words={[{ t: "وانت" }, { t: "قاعد" }, { t: "تتفرّج…", c: "#5a6b63" }]} size={118} /></S>
    <S from={88} dur={100}><Kinetic words={[{ t: "فيه" }, { t: "شخص" }, { t: "خبرته" }, { t: "أقل", c: colors.green, e: true }, { t: "منك" }]} size={112} /></S>
    <S from={184} dur={74}><Kinetic words={[{ t: "خذ" }, { t: "وظيفتك!", c: colors.green, e: true }]} size={170} /></S>
    <S from={254} dur={60}><Kinetic words={[{ t: "ليش؟", c: colors.ink, e: true }]} size={220} /></S>
    <S from={310} dur={130}><Compare /></S>
    <S from={436} dur={70}><Kinetic words={[{ t: "في" }, { t: "مِن بيتي", c: colors.green, e: true }]} size={150} /></S>
    <S from={502} dur={120}><Kinetic words={[{ t: "نسوّيلك" }, { t: "بروفايل" }, { t: "يفهم" }, { t: "قيمتك", c: colors.green, e: true }, { t: "بثواني" }]} size={104} /></S>
    <S from={618} dur={270}><ValueRapid /></S>
    <S from={884} dur={86}><Kinetic words={[{ t: "لا" }, { t: "تخلّي" }, { t: "الفرص" }, { t: "تفوتك!", c: "#e23", e: true }]} size={120} /></S>
    <S from={958} dur={92}><CTA /></S>

    {[184, 254, 310, 436, 618, 884, 958].map((t) => <Flash key={t} start={t - 2} />)}
    <ProgressBar />
    <LogoBug />
  </AbsoluteFill>
);
