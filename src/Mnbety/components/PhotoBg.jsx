// خلفية مصوّرة بملء الإطار مع تكبير بطيء (Ken Burns) وتدرّج لإبراز النص
import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";

export const PhotoBg = ({
  src,
  from = 1.06,
  to = 1.18,
  span = 200,
  // اتجاه التدرّج: "bottom" يغمّق الأسفل، "top" يغمّق الأعلى، "full" يغمّق الكل
  overlay = "bottom",
  tint = "rgba(5,40,24,0.55)",
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, span], [from, to], {
    extrapolateRight: "clamp",
  });

  const gradients = {
    bottom: `linear-gradient(to top, ${tint} 0%, rgba(5,40,24,0.15) 45%, rgba(5,40,24,0.0) 75%)`,
    top: `linear-gradient(to bottom, ${tint} 0%, rgba(5,40,24,0.15) 45%, rgba(5,40,24,0.0) 75%)`,
    full: `linear-gradient(to top, ${tint}, rgba(5,40,24,0.35))`,
  };

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: gradients[overlay] }} />
    </AbsoluteFill>
  );
};
