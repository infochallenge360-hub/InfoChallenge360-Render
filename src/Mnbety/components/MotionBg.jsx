// خلفية موشن جرافيك احترافية (صفر كريدت) — تدرّج أخضر + فقاعات تطفو + شبكة نقاط
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../theme";

// فقاعات ناعمة كبيرة تتحرّك ببطء
const Blob = ({ cx, cy, r, color, ax, ay, speed, frame }) => {
  const t = frame / 30;
  const x = cx + Math.sin(t * speed) * ax;
  const y = cy + Math.cos(t * speed * 0.8) * ay;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: color,
        filter: "blur(60px)",
        opacity: 0.5,
      }}
    />
  );
};

export const MotionBg = ({ variant = "deep" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // إزاحة تدرّج بطيئة
  const shift = interpolate(frame % 300, [0, 300], [0, 360]);

  const base =
    variant === "deep"
      ? `linear-gradient(${135 + Math.sin(frame / 60) * 8}deg, ${colors.green900} 0%, ${colors.green700} 55%, ${colors.green600} 100%)`
      : `linear-gradient(${135}deg, ${colors.green700} 0%, ${colors.green} 100%)`;

  return (
    <AbsoluteFill style={{ background: base, overflow: "hidden" }}>
      <Blob cx={width * 0.2} cy={height * 0.22} r={300} color={colors.green400} ax={60} ay={50} speed={0.5} frame={frame} />
      <Blob cx={width * 0.85} cy={height * 0.35} r={260} color={colors.green600} ax={70} ay={60} speed={0.4} frame={frame} />
      <Blob cx={width * 0.7} cy={height * 0.85} r={340} color={colors.green400} ax={80} ay={40} speed={0.35} frame={frame} />
      <Blob cx={width * 0.15} cy={height * 0.8} r={240} color={colors.green} ax={50} ay={70} speed={0.45} frame={frame} />

      {/* شبكة نقاط خفيفة */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.10) 2px, transparent 2px)`,
          backgroundSize: "46px 46px",
          backgroundPosition: `${shift / 12}px ${shift / 18}px`,
          opacity: 0.5,
        }}
      />

      {/* تعتيم لإبراز النص */}
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(5,40,24,0.45), rgba(5,40,24,0.05))" }} />
    </AbsoluteFill>
  );
};
