// المشهد الثالث — ثلاث ميزات تدخل بالتتابع داخل بطاقات بهوية المنصّة
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, radius } from "../theme";
import { SceneWipe } from "../components/SceneWipe";
import { StoreIcon, BoxIcon, GrowthIcon } from "../components/Icons";

const FEATURES = [
  {
    Icon: StoreIcon,
    title: "متجرك جاهز بدقائق",
    body: "أنشئ متجرك الإلكتروني بدون أي خبرة تقنية.",
  },
  {
    Icon: BoxIcon,
    title: "إدارة كل شيء بمكان واحد",
    body: "منتجاتك وطلباتك وعملاؤك تحت إدارتك.",
  },
  {
    Icon: GrowthIcon,
    title: "وصّل لعملاء أكثر",
    body: "أدوات تسويق توصّلك لكل أنحاء المملكة.",
  },
];

const Card = ({ Icon, title, body, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, mass: 0.9 } });
  const x = interpolate(s, [0, 1], [140, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 36,
        backgroundColor: colors.white,
        border: `2px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: "40px 44px",
        boxShadow: "0 18px 40px rgba(11,199,114,0.08)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 116,
          height: 116,
          borderRadius: radius.sm + 4,
          backgroundColor: colors.green50,
          color: colors.green600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Icon />
      </div>
      <div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 50,
            color: colors.ink,
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 33,
            lineHeight: 1.6,
            color: "#5a6b63",
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleS = spring({ frame, fps, config: { damping: 18 } });

  return (
    <SceneWipe bg={colors.white} enter={0}>
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 70px",
          gap: 40,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
            opacity: titleS,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: colors.green,
              color: colors.white,
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: 32,
              padding: "12px 32px",
              borderRadius: 999,
              marginBottom: 28,
            }}
          >
            ليش من بيتي؟
          </div>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 900,
              fontSize: 76,
              color: colors.ink,
              lineHeight: 1.2,
            }}
          >
            كل اللي يحتاجه مشروعك
          </div>
        </div>

        {FEATURES.map((f, i) => (
          <Card key={i} {...f} delay={18 + i * 16} />
        ))}
      </AbsoluteFill>
    </SceneWipe>
  );
};
