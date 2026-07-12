// كويز الأعلام — تصميم أصلي (ثيم داكن/نيون) — بكلود/Remotion فقط
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, LEVEL_STYLE, LEVEL_LABEL, BG_TOP, BG_BOTTOM, buildTimeline } from "./data";
import { DarkBg, Qchip, LevelPill, Question, GlassFlag, CountdownRing, RevealName, Brand, font } from "./parts";
import { BgRays, BgBokeh, BgSynth, BgAurora } from "./bgs";
import { IcLogo } from "./logo";

export const LogoPreview = () => (
  <AbsoluteFill>
    <BgBokeh />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
      <IcLogo />
      <div style={{ fontFamily: font, fontWeight: 700, fontSize: 34, letterSpacing: 6, color: "rgba(255,255,255,0.8)" }}>GEOGRAPHY · TRIVIA · CHALLENGES</div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// معاينة اقتراح خلفية مع تخطيط الجولة
const BG_MAP = { rays: BgRays, bokeh: BgBokeh, synth: BgSynth, aurora: BgAurora };
export const BgPreview = ({ bg }) => {
  const B = BG_MAP[bg] || BgRays;
  const accent = "#ffffff";
  return (
    <AbsoluteFill>
      <B />
      <Question />
      <Qchip num={1} accent={accent} />
      <LevelPill level="easy" />
      <CountdownRing accent={accent} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <GlassFlag iso="ca" accent={accent} revealed={false} />
      </AbsoluteFill>
      <Brand />
    </AbsoluteFill>
  );
};

// ───────── المقدمة ─────────
const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const flags = ["ca", "jp", "br", "fr", "kr"];
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/vo-intro.mp3")} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
        <IcLogo />
        <div style={{ fontFamily: font, fontWeight: 700, fontSize: 44, color: "rgba(255,255,255,0.85)", opacity: interpolate(frame, [24, 40], [0, 1], { extrapolateRight: "clamp" }) }}>48 Flags · Can you get them all?</div>
        <div style={{ display: "flex", gap: 22, marginTop: 20 }}>
          {flags.map((f, i) => (
            <div key={f} style={{ padding: 8, borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)", transform: `translateY(${interpolate(spring({ frame: frame - 40 - i * 6, fps, config: { damping: 11 } }), [0, 1], [50, 0])}px)` }}>
              <Img src={staticFile(`flags/${f}.svg`)} style={{ width: 150, height: 100, objectFit: "cover", borderRadius: 6, display: "block" }} />
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── عنوان المستوى ─────────
const LevelIntro = ({ level }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10, mass: 0.6 } });
  const a = LEVEL_STYLE[level].accent;
  return (
    <AbsoluteFill>
      <Audio src={staticFile(`sfx/vo-${level}.mp3`)} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: font, fontWeight: 700, fontSize: 44, letterSpacing: 8, color: "rgba(255,255,255,0.7)", opacity: interpolate(frame, [6, 20], [0, 1], { extrapolateRight: "clamp" }) }}>LEVEL</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 180, color: a, textShadow: `0 0 60px ${a}`, transform: `scale(${interpolate(s, [0, 1], [0.4, 1])})` }}>{LEVEL_LABEL[level]}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── الجولة ─────────
const TICKS = [0, 30, 60, 90, 120, 150, 180]; // 7 تكّات = 7 ثواني (مطابق لعدّاد T.reveal=210)
const Round = ({ country, num }) => {
  const frame = useCurrentFrame();
  const a = LEVEL_STYLE[country.level].accent;
  const revealed = frame >= T.reveal;
  return (
    <AbsoluteFill>
      <Question />
      <Qchip num={num} accent={a} />
      <LevelPill level={country.level} />
      {!revealed && <CountdownRing accent={a} />}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <GlassFlag iso={country.iso} accent={a} revealed={revealed} />
      </AbsoluteFill>
      <RevealName name={country.name} accent={a} />
      <Brand />
      {/* صوت: تكّات العدّاد + رنّة الكشف */}
      {TICKS.map((tf) => (
        <Sequence key={tf} from={tf} durationInFrames={12}>
          <Audio src={staticFile("sfx/tick.wav")} volume={0.5} />
        </Sequence>
      ))}
      <Sequence from={T.reveal} durationInFrames={40}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.85} />
      </Sequence>
      {/* نطق اسم الدولة عند الكشف */}
      <Sequence from={T.reveal + 8} durationInFrames={60}>
        <Audio src={staticFile(`sfx/name-${country.iso}.mp3`)} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ───────── الخاتمة ─────────
const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const sub = spring({ frame: frame - 34, fps, config: { damping: 9, mass: 0.6 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 7);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/vo-outro.mp3")} volume={0.95} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 90 }}>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 84, color: "#fff", transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, textShadow: "0 0 40px rgba(255,61,127,0.6)" }}>HOW MANY DID YOU GET?</div>
        <div style={{ fontFamily: font, fontWeight: 600, fontSize: 40, color: "rgba(255,255,255,0.75)", marginTop: 16, opacity: interpolate(frame, [16, 30], [0, 1], { extrapolateRight: "clamp" }) }}>Comment your score 👇</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 150, left: "10%", right: "10%", display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "42%", height: 220, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.15)", opacity: s }} />
        <div style={{ width: "42%", height: 220, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.15)", opacity: s }} />
      </div>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 46 }}>
        <div style={{ background: "#FF0000", color: "#fff", fontFamily: font, fontWeight: 800, fontSize: 46, padding: "18px 54px", borderRadius: 999, transform: `scale(${interpolate(sub, [0, 1], [0.4, 1]) * pulse})`, boxShadow: "0 0 40px rgba(255,0,0,0.5)" }}>SUBSCRIBE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── التكوين ─────────
export const FlagQuiz = ({ countries }) => {
  const { segs } = buildTimeline(countries);
  return (
    <AbsoluteFill style={{ backgroundColor: BG_TOP }}>
      {/* خلفية بوكيه ملوّنة متواصلة عبر الفيديو كامل */}
      <BgBokeh />
      {/* موسيقى خلفية متكرّرة */}
      <Audio src={staticFile("sfx/bed.wav")} volume={0.22} loop />
      {segs.map((seg, i) => (
        <Sequence key={i} from={seg.from} durationInFrames={seg.dur}>
          {seg.type === "intro" && <Intro />}
          {seg.type === "level" && <LevelIntro level={seg.level} />}
          {seg.type === "round" && <Round country={seg.country} num={seg.num} />}
          {seg.type === "outro" && <Outro />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
