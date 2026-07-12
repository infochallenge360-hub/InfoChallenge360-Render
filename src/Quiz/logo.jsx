// هوية قناة Info Challenge 360 — بستايلنا (نيون أخضر/سماوي)
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { font } from "./parts";

const G = "#22E06A";
const C = "#22C3FF";

// الشعار الكامل (رمز دائري 360 + وردمارك)
export const IcLogo = ({ compact = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 11, mass: 0.7 } });
  const ringRot = frame * 0.6;
  const draw = interpolate(spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 }), [0, 1], [1, 0]);
  const R = 78;
  const CIRC = 2 * Math.PI * R;

  const emblem = (s) => (
    <div style={{ position: "relative", width: 200 * s, height: 200 * s, transform: `scale(${interpolate(pop, [0, 1], [0.4, 1])})` }}>
      <svg width={200 * s} height={200 * s} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="icg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={G} />
            <stop offset="1" stopColor={C} />
          </linearGradient>
        </defs>
        <g style={{ transform: `rotate(${ringRot}deg)`, transformOrigin: "100px 100px" }}>
          <circle cx="100" cy="100" r={R} fill="none" stroke="url(#icg)" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${CIRC * 0.8} ${CIRC}`} strokeDashoffset={CIRC * draw} style={{ filter: `drop-shadow(0 0 10px ${G})` }} />
          {/* رأس سهم يوحي بـ 360 */}
          <polygon points="178,100 168,90 168,110" fill={C} style={{ filter: `drop-shadow(0 0 6px ${C})` }} />
        </g>
        <text x="100" y="128" textAnchor="middle" style={{ fontFamily: font, fontWeight: 900, fontSize: 92 * 1, fill: "#fff" }}>?</text>
      </svg>
    </div>
  );

  if (compact) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {emblem(0.45)}
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: 30, color: "#fff", letterSpacing: 1 }}>
          INFO CHALLENGE <span style={{ color: G }}>360</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      {emblem(1)}
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 62, color: "#fff", letterSpacing: 8, opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateRight: "clamp" }) }}>
        INFO CHALLENGE
      </div>
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 150, lineHeight: 0.9, background: `linear-gradient(120deg, ${G}, ${C})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: `drop-shadow(0 0 24px ${G}88)`, transform: `scale(${interpolate(spring({ frame: frame - 12, fps, config: { damping: 10, mass: 0.6 } }), [0, 1], [0.5, 1])})` }}>
        360
      </div>
    </div>
  );
};
