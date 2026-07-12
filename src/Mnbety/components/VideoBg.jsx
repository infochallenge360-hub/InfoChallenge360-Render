// خلفية فيديو متحرّك بملء الإطار + تدرّج لإبراز النص
// playbackRate يُبطّئ المقطع ليغطّي مدّة المشهد كاملة بدون تكرار
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const VideoBg = ({
  src,
  playbackRate = 1,
  overlay = "bottom",
  tint = "rgba(5,40,24,0.55)",
}) => {
  const gradients = {
    bottom: `linear-gradient(to top, ${tint} 0%, rgba(5,40,24,0.15) 45%, rgba(5,40,24,0.0) 75%)`,
    top: `linear-gradient(to bottom, ${tint} 0%, rgba(5,40,24,0.15) 45%, rgba(5,40,24,0.0) 75%)`,
    full: `linear-gradient(to top, ${tint}, rgba(5,40,24,0.35))`,
  };

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile(src)}
          playbackRate={playbackRate}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: gradients[overlay] }} />
    </AbsoluteFill>
  );
};
