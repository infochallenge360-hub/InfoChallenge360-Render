// الفيديو التعريفي لمنصّة "من بيتي" التعليمية — نسخة بالصوت والصور
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { colors } from "./theme";
import { Intro } from "./scenes/Intro";
import { Courses } from "./scenes/Courses";
import { Stats } from "./scenes/Stats";
import { Benefits } from "./scenes/Benefits";
import { CTA } from "./scenes/CTA";

// التعليق الصوتي مدّته ~26.16 ثانية ⇒ نخلّي الفيديو 810 فريم (27 ثانية)
export const TOTAL_FRAMES = 810;

export const MnbetyIntro = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* التعليق الصوتي النسائي */}
      <Audio src={staticFile("gen/voiceover.mp3")} />

      <Sequence from={0} durationInFrames={152}>
        <Intro />
      </Sequence>
      <Sequence from={150} durationInFrames={248}>
        <Courses />
      </Sequence>
      <Sequence from={380} durationInFrames={166}>
        <Stats />
      </Sequence>
      <Sequence from={540} durationInFrames={182}>
        <Benefits />
      </Sequence>
      <Sequence from={704} durationInFrames={106}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
