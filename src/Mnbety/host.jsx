// تكوين "الهوست المتحدّث" — فيديو lip-sync بصوت متزامن + إطار الهوية
import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { colors, fonts, radius } from "./theme";

// مدّة مقطع الهوست بالفريمات (تُضبط حسب طول الـ lip-sync)
export const HOST_FRAMES = 384; // ~12.8s @30fps

// كابشن أسفل يتغيّر مع الكلام (تقريبي)
const CAPTIONS = [
  { from: 10, to: 132, text: "تعلّم التصميم من الصفر إلى الاحتراف" },
  { from: 132, to: 250, text: "كانفا · فوتوشوب · إليستريتور" },
  { from: 250, to: HOST_FRAMES, text: "وابدأ تكسب من بيتك" },
];

const Caption = () => {
  const frame = useCurrentFrame();
  const active = CAPTIONS.find((c) => frame >= c.from && frame < c.to);
  if (!active) return null;
  const local = frame - active.from;
  const inOp = interpolate(local, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const outOp = interpolate(frame, [active.to - 8, active.to], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const y = interpolate(inOp, [0, 1], [24, 0]);
  return (
    <div
      style={{
        opacity: Math.min(inOp, outOp),
        transform: `translateY(${y}px)`,
        fontFamily: fonts.heading,
        fontWeight: 800,
        fontSize: 60,
        color: colors.white,
        textAlign: "center",
        textShadow: "0 4px 24px rgba(0,0,0,0.5)",
        lineHeight: 1.3,
      }}
    >
      {active.text}
    </div>
  );
};

export const MnbetyHost = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chip = spring({ frame: frame - 6, fps, config: { damping: 16 } });
  const ctaIn = spring({ frame: frame - (HOST_FRAMES - 70), fps, config: { damping: 14 } });
  const pulse = 1 + 0.03 * Math.sin((frame / fps) * 4);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      {/* فيديو الهوست المتحدّث (يحمل الصوت المتزامن) */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile("gen/host-talk.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* تدرّج سفلي لإبراز الكابشن والشعار */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(5,40,24,0.85) 0%, rgba(5,40,24,0.2) 30%, rgba(5,40,24,0) 55%)",
        }}
      />

      {/* شريحة الشعار أعلى */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 60,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: radius.pill,
          padding: "18px 40px",
          opacity: chip,
          transform: `translateY(${interpolate(chip, [0, 1], [-30, 0])}px)`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Img src={staticFile("brand/logo-full.png")} style={{ height: 64, display: "block" }} />
      </div>

      {/* الكابشن + زر الدعوة أسفل */}
      <AbsoluteFill
        style={{
          direction: "rtl",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 70px 130px",
          gap: 40,
        }}
      >
        <Caption />
        <div
          style={{
            opacity: ctaIn,
            transform: `scale(${interpolate(ctaIn, [0, 1], [0.6, 1]) * pulse})`,
            backgroundColor: colors.green,
            color: colors.white,
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 52,
            padding: "30px 84px",
            borderRadius: radius.pill,
            boxShadow: "0 18px 46px rgba(11,199,114,0.5)",
          }}
        >
          سجّل اليوم على mnbety.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
