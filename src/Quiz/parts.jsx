// عناصر كويز الأعلام — ثيم داكن عصري بلمسة نيون (تصميم أصلي)
import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
import { BG_TOP, BG_BOTTOM, LEVEL_STYLE, LEVEL_LABEL, T } from "./data";

export const font = loadMont("normal", { weights: ["600", "700", "800", "900"] }).fontFamily;

// خلفية داكنة ديناميكية (أداء عالٍ: تدرّجات متحركة بدل blur)
export const DarkBg = ({ level }) => {
  const s = LEVEL_STYLE[level] || LEVEL_STYLE.easy;
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;

  // توهّجات ناعمة متحركة عبر radial-gradient (بدون فلتر blur = سريع)
  const glow = (bx, by, sp, ax, ay, ph, size) => {
    const cx = bx * width + Math.sin(t * sp + ph) * ax;
    const cy = by * height + Math.cos(t * sp * 0.85 + ph) * ay;
    return <AbsoluteFill style={{ background: `radial-gradient(${size} ${size} at ${cx}px ${cy}px, ${s.glow}, transparent 62%)` }} />;
  };

  // حزم ضوء مائلة
  const beam = (x, w, op) => (
    <div style={{ position: "absolute", top: "-15%", left: x, width: w, height: "130%", background: `linear-gradient(90deg, transparent, rgba(255,255,255,${op}), transparent)`, transform: "skewX(-16deg)" }} />
  );
  const b1 = ((frame * 3) % (width + 700)) - 350;
  const b2 = ((frame * 2.1 + 500) % (width + 700)) - 350;

  // جزيئات متوهّجة
  const parts = [];
  for (let i = 0; i < 26; i++) {
    const seed = i * 137.5;
    const x = (seed * 1.9) % width;
    const y = (height + 60 - ((frame * (0.7 + (i % 4) * 0.55) + seed * 2.3) % (height + 160)));
    const sz = 4 + (i % 5) * 5;
    const drift = Math.sin(t * 0.7 + i) * 18;
    parts.push(<div key={i} style={{ position: "absolute", left: x + drift, top: y, width: sz, height: sz, borderRadius: "50%", background: i % 4 === 0 ? "#fff" : s.accent, opacity: 0.22, boxShadow: `0 0 ${sz * 2}px ${s.accent}` }} />);
  }

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${BG_TOP}, ${BG_BOTTOM})`, overflow: "hidden" }}>
      {glow(0.24, 0.3, 0.3, 260, 150, 0, "42%")}
      {glow(0.8, 0.35, 0.24, 220, 170, 2, "38%")}
      {glow(0.55, 0.85, 0.18, 240, 120, 4, "48%")}
      {/* شبكة خفيفة */}
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)`, backgroundSize: "58px 58px", backgroundPosition: `0 ${(frame * 0.7) % 58}px`, maskImage: "radial-gradient(circle at 50% 50%, #000 35%, transparent 82%)", WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 35%, transparent 82%)" }} />
      {beam(b1, 120, 0.07)}
      {beam(b2, 80, 0.05)}
      {parts}
      <AbsoluteFill style={{ background: "radial-gradient(75% 70% at 50% 48%, transparent 55%, rgba(5,8,18,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

// شارة رقم السؤال
export const Qchip = ({ num, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  return (
    <div style={{ position: "absolute", top: 54, left: 60, display: "flex", alignItems: "center", gap: 16, transform: `translateX(${interpolate(s, [0, 1], [-40, 0])}px)`, opacity: s }}>
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 40, color: "#0b1022", background: accent, padding: "10px 26px", borderRadius: 14, boxShadow: `0 0 26px ${accent}` }}>Q{num}</div>
    </div>
  );
};

// وسم المستوى
export const LevelPill = ({ level }) => {
  const s = LEVEL_STYLE[level];
  return (
    <div style={{ position: "absolute", top: 62, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ fontFamily: font, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: s.accent, border: `2px solid ${s.accent}`, padding: "8px 26px", borderRadius: 999, background: "rgba(255,255,255,0.03)" }}>{LEVEL_LABEL[level]}</div>
    </div>
  );
};

// السؤال
export const Question = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 14], [-30, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 130, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 66, color: "#fff", transform: `translateY(${y}px)`, opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" }) }}>
      WHICH COUNTRY?
    </div>
  );
};

// بطاقة العلم الزجاجية
export const GlassFlag = ({ iso, accent, revealed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 9, mass: 0.7, stiffness: 120 } });
  const enterY = interpolate(s, [0, 1], [130, 0]);
  const enterS = interpolate(s, [0, 1], [0.5, 1]);
  const wob = interpolate(s, [0, 1], [-5, 0]);
  const float = Math.sin(frame / 26) * 10;
  // نطّة عند الكشف
  const pop = interpolate(frame, [T.reveal, T.reveal + 6, T.reveal + 18], [1, 1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ transform: `scale(${enterS * pop}) translateY(${enterY + float}px) rotate(${wob}deg)`, opacity: s, padding: 18, borderRadius: 26, background: "rgba(255,255,255,0.08)", border: `3px solid ${revealed ? accent : "rgba(255,255,255,0.2)"}`, boxShadow: revealed ? `0 0 60px ${accent}` : "0 30px 70px rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <Img src={staticFile(`flags/${iso}.svg`)} style={{ width: 560, height: 373, objectFit: "cover", borderRadius: 12, display: "block" }} />
    </div>
  );
};

// مؤقّت دائري
export const CountdownRing = ({ accent }) => {
  const frame = useCurrentFrame();
  const r = 66;
  const C = 2 * Math.PI * r;
  const remain = interpolate(frame, [0, T.reveal], [1, 0], { extrapolateRight: "clamp" });
  const secs = Math.max(0, Math.ceil((T.reveal - frame) / 30));
  const danger = remain < 0.35;
  const col = danger ? "#FF4D4D" : accent;
  const pulse = danger ? 1 + 0.06 * Math.sin(frame / 3) : 1;
  return (
    <div style={{ position: "absolute", top: 44, right: 60, width: 160, height: 160, transform: `scale(${pulse})` }}>
      <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="80" cy="80" r={r} stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" />
        <circle cx="80" cy="80" r={r} stroke={col} strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - remain)} style={{ filter: `drop-shadow(0 0 8px ${col})` }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontWeight: 800, fontSize: 66, color: "#fff" }}>{secs}</div>
    </div>
  );
};

// اسم الدولة عند الكشف
export const RevealName = ({ name, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - T.reveal, fps, config: { damping: 10, mass: 0.6 } });
  if (frame < T.reveal) return null;
  return (
    <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 100, color: "#fff", textShadow: `0 0 40px ${accent}`, transform: `scale(${interpolate(s, [0, 1], [0.4, 1])})` }}>
      <span style={{ color: accent, marginInlineEnd: 18 }}>✓</span>{name}
    </div>
  );
};

export const Brand = () => (
  <div style={{ position: "absolute", bottom: 34, left: 60, display: "flex", alignItems: "center", gap: 12, fontFamily: font, fontWeight: 800, fontSize: 26, color: "rgba(255,255,255,0.55)", letterSpacing: 2 }}>
    <span style={{ width: 14, height: 14, borderRadius: "50%", border: "3px solid #22E06A", display: "inline-block" }} />
    INFO CHALLENGE <span style={{ color: "#22E06A" }}>360</span>
  </div>
);
