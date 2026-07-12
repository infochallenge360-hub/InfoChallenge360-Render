// ظهور متدرّج: انزلاق + تلاشٍ، يُستخدم في كل المشاهد
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Reveal = ({
  delay = 0,
  y = 40,
  x = 0,
  damping = 18,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping, mass: 0.8 } });
  return (
    <div
      style={{
        transform: `translate(${interpolate(s, [0, 1], [x, 0])}px, ${interpolate(
          s,
          [0, 1],
          [y, 0],
        )}px)`,
        opacity: interpolate(s, [0, 1], [0, 1]),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
