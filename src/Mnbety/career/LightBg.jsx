// خلفية فاتحة احترافية (أبيض + لمسات خضراء) — مطابقة لدليل الهوية
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../theme";

const Blob = ({ cx, cy, r, color, ax, ay, speed, frame, op = 0.18 }) => {
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
        filter: "blur(80px)",
        opacity: op,
      }}
    />
  );
};

export const LightBg = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const shift = interpolate(frame % 360, [0, 360], [0, 360]);
  return (
    <AbsoluteFill style={{ background: colors.white, overflow: "hidden" }}>
      <Blob cx={width * 0.16} cy={height * 0.2} r={260} color={colors.green} ax={50} ay={40} speed={0.4} frame={frame} />
      <Blob cx={width * 0.86} cy={height * 0.78} r={300} color={colors.green400} ax={60} ay={50} speed={0.32} frame={frame} op={0.16} />
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.green100} 2px, transparent 2px)`,
          backgroundSize: "52px 52px",
          backgroundPosition: `${shift / 16}px 0px`,
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
