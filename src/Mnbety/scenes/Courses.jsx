// المشهد 2 — الكورسات على خلفية مكتب المصمّم
// يوازي: "كورسات شاملة في كانفا وفوتوشوب وإليستريتور وأفينيتي، من الصفر إلى الاحتراف"
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, radius } from "../theme";
import { MotionBg } from "../components/MotionBg";
import { Reveal } from "../components/Reveal";

const COURSES = [
  { name: "كانفا ماستر كلاس", hours: "20 ساعة" },
  { name: "فوتوشوب", hours: "40 ساعة" },
  { name: "إليستريتور", hours: "30 ساعة" },
  { name: "أفينيتي", hours: "9 ساعات" },
  { name: "أساسيات التصميم", hours: "5 ساعات" },
];

const Chip = ({ name, hours, delay }) => (
  <Reveal delay={delay} x={120} y={0} damping={16}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        backgroundColor: "rgba(255,255,255,0.96)",
        borderRadius: radius.pill,
        padding: "26px 44px",
        boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
        minWidth: 720,
      }}
    >
      <span
        style={{
          fontFamily: fonts.heading,
          fontWeight: 800,
          fontSize: 46,
          color: colors.ink,
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 32,
          color: colors.green700,
          backgroundColor: colors.green50,
          padding: "8px 24px",
          borderRadius: radius.pill,
          whiteSpace: "nowrap",
        }}
      >
        {hours}
      </span>
    </div>
  </Reveal>
);

export const Courses = () => {
  return (
    <AbsoluteFill>
      <MotionBg variant="deep" />
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 80px",
          gap: 26,
        }}
      >
        <Reveal delay={0} y={-30}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 900,
              fontSize: 76,
              color: colors.white,
              marginBottom: 16,
              textShadow: "0 6px 30px rgba(0,0,0,0.4)",
            }}
          >
            كل أدوات التصميم في مكان واحد
          </div>
        </Reveal>

        {COURSES.map((c, i) => (
          <Chip key={i} {...c} delay={12 + i * 9} />
        ))}

        <Reveal delay={12 + COURSES.length * 9 + 6} y={30}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 800,
              fontSize: 44,
              color: colors.green,
              marginTop: 14,
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            من الصفر إلى الاحتراف
          </div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
