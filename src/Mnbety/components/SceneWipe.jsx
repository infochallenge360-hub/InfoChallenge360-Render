// يكشف المشهد فوق المشهد السابق عبر دائرة تتوسّع من المنتصف
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SceneWipe = ({ bg, enter = 16, children }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const maxR = Math.hypot(width, height) / 2 + 60;

  const progress =
    enter > 0
      ? spring({ frame, fps, config: { damping: 200 }, durationInFrames: enter })
      : 1;
  const r = interpolate(progress, [0, 1], [0, maxR]);

  const clip = enter > 0 ? `circle(${r}px at 50% 50%)` : "none";

  return (
    <AbsoluteFill style={{ clipPath: clip, WebkitClipPath: clip }}>
      <AbsoluteFill style={{ backgroundColor: bg }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
