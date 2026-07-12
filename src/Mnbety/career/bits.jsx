// عناصر بصرية مشتركة لمشاهد كورس لينكدإن (أبيض + أخضر، وأزرق لينكدإن فقط لعناصر لينكدإن)
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, radius } from "../theme";

export const LINKEDIN = "#0A66C2";

export const Check = ({ size = 92, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 11, mass: 0.7 } });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors.green,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${interpolate(s, [0, 1], [0, 1])})`,
        boxShadow: "0 14px 36px rgba(11,199,114,0.45)",
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
};

export const Chip = ({ text, accent = colors.green, bg = colors.green50, fg = colors.green700, big = false }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      backgroundColor: bg,
      color: fg,
      fontFamily: fonts.heading,
      fontWeight: 700,
      fontSize: big ? 44 : 34,
      padding: big ? "20px 40px" : "14px 30px",
      borderRadius: radius.pill,
      border: `2px solid ${accent}22`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

// بطاقة بروفايل مصغّرة (نمط لينكدإن)
export const MiniProfile = ({ w = 300, linkedin = false, lift = 0, dim = false }) => (
  <div
    style={{
      width: w,
      background: colors.white,
      borderRadius: radius.sm + 4,
      boxShadow: "0 18px 44px rgba(14,19,17,0.12)",
      overflow: "hidden",
      direction: "rtl",
      transform: `translateY(${lift}px)`,
      opacity: dim ? 0.55 : 1,
    }}
  >
    <div style={{ height: w * 0.28, background: linkedin ? LINKEDIN : `linear-gradient(120deg, ${colors.green}, ${colors.green400})`, position: "relative" }}>
      {linkedin && (
        <span style={{ position: "absolute", top: 14, right: 16, color: "#fff", fontFamily: fonts.latin, fontWeight: 700, fontSize: w * 0.12 }}>in</span>
      )}
    </div>
    <div style={{ padding: `0 ${w * 0.09}px ${w * 0.1}px`, marginTop: -w * 0.13 }}>
      <div style={{ width: w * 0.26, height: w * 0.26, borderRadius: "50%", background: colors.green100, border: `${w * 0.02}px solid #fff` }} />
      <div style={{ height: w * 0.05, width: w * 0.55, background: colors.ink, borderRadius: 6, marginTop: w * 0.06 }} />
      <div style={{ height: w * 0.035, width: w * 0.4, background: colors.border, borderRadius: 6, marginTop: w * 0.04 }} />
      <div style={{ height: w * 0.03, width: "92%", background: colors.muted, borderRadius: 6, marginTop: w * 0.07 }} />
      <div style={{ height: w * 0.03, width: "78%", background: colors.muted, borderRadius: 6, marginTop: w * 0.035 }} />
    </div>
  </div>
);

// عقدة شبكة
export const Node = ({ x, y, r = 46, delay = 0, color = colors.green }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12 } });
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${interpolate(s, [0, 1], [0, 1])})`,
        boxShadow: `0 8px 22px ${color}55`,
      }}
    >
      <svg width={r} height={r} viewBox="0 0 24 24" fill="#fff">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6z" />
      </svg>
    </div>
  );
};
