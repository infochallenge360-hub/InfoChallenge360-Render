// المشهد 1 — افتتاحية: خلفية مصوّرة + الماركة + جملة التحويل
// يوازي التعليق: "في منصة من بيتي، نحوّل شغفك بالتصميم إلى مهارة احترافية"
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
import { colors, fonts } from "../theme";
import { MotionBg } from "../components/MotionBg";
import { Reveal } from "../components/Reveal";

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const markS = spring({ frame: frame - 4, fps, config: { damping: 14, mass: 0.9 } });

  return (
    <AbsoluteFill>
      <MotionBg variant="deep" />

      {/* الماركة أعلى */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 110 }}>
        <Img
          src={staticFile("brand/mark-white.png")}
          style={{
            width: 150,
            opacity: markS,
            transform: `scale(${interpolate(markS, [0, 1], [0.4, 1])})`,
          }}
        />
      </AbsoluteFill>

      {/* العنوان أسفل */}
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 80px 150px",
          gap: 6,
        }}
      >
        <Reveal delay={20} y={50}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 900,
              fontSize: 92,
              color: colors.white,
              lineHeight: 1.15,
              textShadow: "0 6px 30px rgba(0,0,0,0.35)",
            }}
          >
            حوّل شغفك بالتصميم
          </div>
        </Reveal>
        <Reveal delay={32} y={50}>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 900,
              fontSize: 92,
              color: colors.green,
              lineHeight: 1.15,
              textShadow: "0 6px 30px rgba(0,0,0,0.35)",
            }}
          >
            إلى احتراف
          </div>
        </Reveal>
        <Reveal delay={46} y={30}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 40,
              color: "rgba(255,255,255,0.92)",
              marginTop: 18,
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            منصة من بيتي التعليمية
          </div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
