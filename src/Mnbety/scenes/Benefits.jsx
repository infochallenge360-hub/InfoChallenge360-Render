// المشهد 4 — المنافع على خلفية النجاح
// يوازي: "تعلّم في وقتك، واحصل على شهادتك، وابدأ تكسب من بيتك"
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, radius } from "../theme";
import { MotionBg } from "../components/MotionBg";
import { Reveal } from "../components/Reveal";

const CheckBadge = () => (
  <div
    style={{
      flexShrink: 0,
      width: 84,
      height: 84,
      borderRadius: "50%",
      backgroundColor: colors.green,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 24px rgba(11,199,114,0.5)",
    }}
  >
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  </div>
);

const BENEFITS = ["تعلّم في وقتك ومن أي مكان", "احصل على شهادة إتمام معتمدة", "ابدأ تكسب من مهاراتك… من بيتك"];

const Row = ({ text, delay }) => (
  <Reveal delay={delay} x={100} y={0} damping={16}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        backgroundColor: "rgba(255,255,255,0.12)",
        border: "2px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(6px)",
        borderRadius: radius.lg,
        padding: "28px 40px",
      }}
    >
      <CheckBadge />
      <span
        style={{
          fontFamily: fonts.heading,
          fontWeight: 800,
          fontSize: 52,
          color: colors.white,
          textShadow: "0 4px 18px rgba(0,0,0,0.4)",
        }}
      >
        {text}
      </span>
    </div>
  </Reveal>
);

export const Benefits = () => {
  return (
    <AbsoluteFill>
      <MotionBg variant="deep" />
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 70px",
          gap: 34,
        }}
      >
        {BENEFITS.map((b, i) => (
          <Row key={i} text={b} delay={i * 14} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
