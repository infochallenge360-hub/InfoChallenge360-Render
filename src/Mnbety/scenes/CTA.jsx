// المشهد 5 — الخاتمة: "من بيتي، ابدأ رحلتك اليوم"
import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, radius } from "../theme";
import { SceneWipe } from "../components/SceneWipe";

const Particles = () => {
  const frame = useCurrentFrame();
  const seeds = [
    { x: 140, y: 360, s: 90, sp: 0.5 },
    { x: 880, y: 320, s: 60, sp: 0.8 },
    { x: 760, y: 1500, s: 120, sp: 0.4 },
    { x: 220, y: 1560, s: 70, sp: 0.7 },
    { x: 520, y: 1720, s: 50, sp: 1.0 },
    { x: 960, y: 920, s: 44, sp: 0.6 },
  ];
  return (
    <>
      {seeds.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y - ((frame * p.sp) % 220),
            width: p.s,
            height: p.s,
            borderRadius: "50%",
            backgroundColor: colors.white,
            opacity: 0.08,
          }}
        />
      ))}
    </>
  );
};

export const CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });
  const headS = spring({ frame: frame - 16, fps, config: { damping: 18 } });
  const btnS = spring({ frame: frame - 32, fps, config: { damping: 12, mass: 0.8 } });
  const pulse = 1 + 0.03 * Math.sin((frame / fps) * 4);

  return (
    <SceneWipe bg={colors.green} enter={18}>
      <Particles />
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 90,
          gap: 56,
        }}
      >
        <Img
          src={staticFile("brand/logo-white-full.png")}
          style={{
            width: 600,
            opacity: interpolate(logoS, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoS, [0, 1], [0.7, 1])})`,
          }}
        />

        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 900,
            fontSize: 96,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.15,
            transform: `translateY(${interpolate(headS, [0, 1], [40, 0])}px)`,
            opacity: headS,
          }}
        >
          ابدأ رحلتك اليوم
        </div>

        <div
          style={{
            transform: `scale(${interpolate(btnS, [0, 1], [0.6, 1]) * pulse})`,
            opacity: btnS,
            backgroundColor: colors.white,
            color: colors.green700,
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 54,
            padding: "32px 90px",
            borderRadius: radius.pill,
            boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
          }}
        >
          انضم الآن
        </div>
      </AbsoluteFill>
    </SceneWipe>
  );
};
