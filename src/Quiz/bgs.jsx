// اقتراحات خلفيات حيّة وملوّنة لكويز الأعلام (أداء عالٍ — بدون blur ثقيل)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// (1) أشعة دوّارة — إحساس برامج المسابقات، نابض بالحياة
export const BgRays = () => {
  const frame = useCurrentFrame();
  const rot = frame * 0.25;
  const pulse = 0.9 + 0.1 * Math.sin(frame / 14);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, #2453d6 0%, #12225e 55%, #0a1440 100%)", overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${rot}deg at 50% 46%, rgba(255,255,255,0.10) 0deg 5deg, transparent 5deg 13deg)`, maskImage: "radial-gradient(circle at 50% 46%, #000 8%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle at 50% 46%, #000 8%, transparent 72%)", transform: `scale(${pulse})` }} />
      <AbsoluteFill style={{ background: "radial-gradient(40% 40% at 50% 46%, rgba(255,210,80,0.25), transparent 70%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(75% 70% at 50% 50%, transparent 55%, rgba(4,8,30,0.5) 100%)" }} />
    </AbsoluteFill>
  );
};

// (2) بوكيه ملوّن — مرح وحيوي
export const BgBokeh = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const orb = (bx, by, r, col, sp, ax, ay, ph) => {
    const cx = bx * width + Math.sin(t * sp + ph) * ax;
    const cy = by * height + Math.cos(t * sp * 0.8 + ph) * ay;
    return <AbsoluteFill style={{ background: `radial-gradient(${r}px ${r}px at ${cx}px ${cy}px, ${col}, transparent 65%)` }} />;
  };
  const dots = [];
  for (let i = 0; i < 22; i++) {
    const seed = i * 111.3;
    const x = (seed * 2.1) % width;
    const y = (height + 40 - ((frame * (0.9 + (i % 3) * 0.6) + seed * 2) % (height + 120)));
    const sz = 8 + (i % 4) * 7;
    const cols = ["#22E06A", "#22C3FF", "#FFD23D", "#FF3D7F", "#fff"];
    dots.push(<div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: cols[i % 5], opacity: 0.5 }} />);
  }
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #6d28d9 100%)", overflow: "hidden" }}>
      {orb(0.2, 0.28, 460, "rgba(255,255,255,0.28)", 0.3, 200, 120, 0)}
      {orb(0.82, 0.3, 420, "rgba(255,210,60,0.3)", 0.25, 180, 150, 2)}
      {orb(0.7, 0.82, 520, "rgba(255,61,127,0.3)", 0.2, 220, 120, 4)}
      {orb(0.2, 0.8, 420, "rgba(34,224,106,0.28)", 0.28, 160, 140, 1)}
      {dots}
      <AbsoluteFill style={{ background: "radial-gradient(75% 70% at 50% 50%, transparent 52%, rgba(20,10,50,0.45) 100%)" }} />
    </AbsoluteFill>
  );
};

// (3) شبكة نيون (سينث ويف) — عصري ريترو
export const BgSynth = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 1.6) % 90;
  const sun = 0.9 + 0.1 * Math.sin(frame / 16);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #241056 0%, #5a1e7a 45%, #12103a 75%, #0a0a26 100%)", overflow: "hidden" }}>
      {/* شمس متوهّجة */}
      <div style={{ position: "absolute", top: "26%", left: "50%", width: 420, height: 420, marginLeft: -210, borderRadius: "50%", background: "radial-gradient(circle, #ff8a3d, #ff3d7f 60%, transparent 72%)", opacity: 0.85, transform: `scale(${sun})` }} />
      {/* أرضية شبكية بمنظور */}
      <div style={{ position: "absolute", bottom: 0, left: "-25%", width: "150%", height: "48%", transform: "perspective(600px) rotateX(70deg)", transformOrigin: "bottom center", backgroundImage: "linear-gradient(rgba(0,240,255,0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0,240,255,0.45) 2px, transparent 2px)", backgroundSize: "90px 90px", backgroundPosition: `0 ${offset}px` }} />
      {/* نجوم */}
      {Array.from({ length: 40 }).map((_, i) => { const s = i * 73.1; return <div key={i} style={{ position: "absolute", left: (s * 2.3) % 1920, top: (s * 1.7) % 520, width: 3, height: 3, borderRadius: "50%", background: "#fff", opacity: 0.6 }} />; })}
    </AbsoluteFill>
  );
};

// (4) أورورا ملوّنة متدفّقة — أنيق وحيوي
export const BgAurora = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const wave = (bx, by, r, col, sp, ax, ay, ph) => {
    const cx = bx * width + Math.sin(t * sp + ph) * ax;
    const cy = by * height + Math.cos(t * sp * 0.7 + ph) * ay;
    return <AbsoluteFill style={{ background: `radial-gradient(${r}% ${r}% at ${cx}px ${cy}px, ${col}, transparent 60%)` }} />;
  };
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #0b1030, #1a0e3e)", overflow: "hidden" }}>
      {wave(0.3, 0.3, 55, "rgba(59,130,246,0.55)", 0.25, 260, 150, 0)}
      {wave(0.75, 0.35, 50, "rgba(139,92,246,0.55)", 0.2, 240, 170, 2)}
      {wave(0.6, 0.8, 60, "rgba(236,72,153,0.5)", 0.17, 260, 140, 4)}
      {wave(0.25, 0.75, 50, "rgba(20,184,166,0.5)", 0.22, 220, 160, 1)}
      {Array.from({ length: 24 }).map((_, i) => { const s = i * 137.5; const x = (s * 1.9) % width; const y = (height + 40 - ((frame * (0.8 + (i % 3) * 0.5) + s * 2) % (height + 120))); const sz = 4 + (i % 4) * 4; return <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: "#fff", opacity: 0.3 }} />; })}
      <AbsoluteFill style={{ background: "radial-gradient(78% 72% at 50% 50%, transparent 52%, rgba(6,8,25,0.5) 100%)" }} />
    </AbsoluteFill>
  );
};
