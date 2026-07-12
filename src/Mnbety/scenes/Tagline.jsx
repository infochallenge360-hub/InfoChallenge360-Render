// المشهد الثاني — كشف الشعار الكامل (أخضر على أبيض) مع جملة الهوية
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
import { SceneWipe } from "../components/SceneWipe";

const Reveal = ({ delay = 0, children, y = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, mass: 0.8 } });
  return (
    <div
      style={{
        transform: `translateY(${interpolate(s, [0, 1], [y, 0])}px)`,
        opacity: interpolate(s, [0, 1], [0, 1]),
      }}
    >
      {children}
    </div>
  );
};

export const Tagline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });
  const logoScale = interpolate(logoS, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // خط أخضر يتمدّد تحت الجملة
  const lineW = interpolate(
    spring({ frame: frame - 30, fps, config: { damping: 200 }, durationInFrames: 24 }),
    [0, 1],
    [0, 220],
  );

  return (
    <SceneWipe bg={colors.white} enter={16}>
      <AbsoluteFill
        style={{
          direction: "rtl",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          gap: 56,
        }}
      >
        <Img
          src={staticFile("brand/logo-full.png")}
          style={{
            width: 560,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        />

        <div style={{ textAlign: "center" }}>
          <Reveal delay={18}>
            <div
              style={{
                fontFamily: fonts.heading,
                fontWeight: 900,
                fontSize: 88,
                lineHeight: 1.15,
                color: colors.ink,
              }}
            >
              مشروعك من بيتك
            </div>
          </Reveal>
          <Reveal delay={26}>
            <div
              style={{
                fontFamily: fonts.heading,
                fontWeight: 900,
                fontSize: 88,
                lineHeight: 1.15,
                color: colors.green,
              }}
            >
              يبدأ من هنا
            </div>
          </Reveal>

          {/* خط أخضر */}
          <div
            style={{
              height: 10,
              width: lineW,
              backgroundColor: colors.green,
              borderRadius: 999,
              margin: "36px auto 0",
            }}
          />
        </div>

        <Reveal delay={40}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 38,
              lineHeight: 1.7,
              color: "#566",
              maxWidth: 760,
              textAlign: "center",
            }}
          >
            منصة الأسر المنتجة لإنشاء متجرك وإدارة مبيعاتك بكل سهولة
          </div>
        </Reveal>
      </AbsoluteFill>
    </SceneWipe>
  );
};
