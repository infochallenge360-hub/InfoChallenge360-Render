// المشهد 3 — الأرقام (عدّاد تصاعدي) على خلفية بيضاء
// يوازي: "أكثر من سبعة آلاف طالب، وتقييمات تفوق أربعة وتسعين بالمئة"
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";
import { SceneWipe } from "../components/SceneWipe";
import { Reveal } from "../components/Reveal";

const StatBlock = ({ value, label, delay }) => {
  return (
    <Reveal delay={delay} y={40}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 900,
            fontSize: 150,
            lineHeight: 1,
            color: colors.green,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 40,
            color: colors.ink,
            marginTop: 8,
          }}
        >
          {label}
        </div>
      </div>
    </Reveal>
  );
};

export const Stats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // عدّاد الطلاب 0 → 7000
  const c1 = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 50 });
  const students = Math.round(interpolate(c1, [0, 1], [0, 7000]) / 100) * 100;

  // عدّاد التقييم 0 → 4.9
  const c2 = spring({ frame: frame - 38, fps, config: { damping: 200 }, durationInFrames: 45 });
  const rating = (interpolate(c2, [0, 1], [0, 4.9])).toFixed(1);

  return (
    <SceneWipe bg={colors.white} enter={18}>
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 90,
          padding: 80,
        }}
      >
        <StatBlock value={`+${students.toLocaleString("en-US")}`} label="طالب وطالبة" delay={8} />
        <StatBlock value={`${rating}★`} label="متوسط تقييم الطلاب" delay={34} />
        <Reveal delay={58} y={40}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 800,
              fontSize: 48,
              color: colors.white,
              backgroundColor: colors.green,
              padding: "20px 52px",
              borderRadius: 999,
            }}
          >
            شهادة إتمام معتمدة
          </div>
        </Reveal>
      </AbsoluteFill>
    </SceneWipe>
  );
};
