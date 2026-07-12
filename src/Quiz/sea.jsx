// «Guess the Bird» — GuessSync · E19 · 100 طائر (25/مستوى) · صور iNaturalist (CC0/CC-BY) birds/<slug>.jpg
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SEA as LOGOS } from "./seaData";

const GAME = { blue: "#23429E", blueMid: "#122258", blueDeep: "#0A1436", gold: "#FFC53D", magenta: "#F35BD0" };
const LVL = {
  easy: { accent: "#FFD23F", label: "EASY" },
  medium: { accent: "#FF9F40", label: "MEDIUM" },
  hard: { accent: "#FF5C7A", label: "HARD" },
  impossible: { accent: "#B983FF", label: "IMPOSSIBLE" },
};
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["700", "800", "900"] }).fontFamily;

const LT = { intro: 130, level: 85, reveal: 90, round: 180, outro: 190 };
const TICKS = [0, 30, 60, 74, 82, 88];
const HAS_NAME_VO = true;

const GameBg = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const parts = [];
  for (let i = 0; i < 22; i++) {
    const seed = i * 137.5;
    const x = (seed * 1.7) % width;
    const y = height + 40 - ((frame * (0.5 + (i % 4) * 0.4) + seed * 2.1) % (height + 120));
    const sz = 3 + (i % 4) * 4;
    parts.push(<div key={i} style={{ position: "absolute", left: x + Math.sin(frame / 30 + i) * 14, top: y, width: sz, height: sz, borderRadius: "50%", background: GAME.gold, opacity: 0.18, boxShadow: `0 0 ${sz * 2}px ${GAME.gold}` }} />);
  }
  return (
    <AbsoluteFill style={{ background: `radial-gradient(85% 95% at 50% 34%, ${GAME.blue} 0%, ${GAME.blueMid} 52%, ${GAME.blueDeep} 100%)`, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 50% 38%, rgba(255,197,61,0.06) 0deg 4deg, transparent 4deg 13deg)", maskImage: "radial-gradient(circle at 50% 38%, #000 3%, transparent 52%)", WebkitMaskImage: "radial-gradient(circle at 50% 38%, #000 3%, transparent 52%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(42% 40% at 50% 34%, rgba(255,197,61,0.10), transparent 72%)" }} />
      {parts}
      <AbsoluteFill style={{ background: "radial-gradient(78% 74% at 50% 46%, transparent 58%, rgba(5,8,25,0.5) 100%)" }} />
    </AbsoluteFill>
  );
};

const Watermark = () => (
  <div style={{ position: "absolute", bottom: 36, left: 52, display: "flex", alignItems: "center", gap: 11, fontFamily: font, fontWeight: 900, fontSize: 32, color: "rgba(255,255,255,0.9)", letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
    <span style={{ width: 16, height: 16, borderRadius: "50%", border: `4px solid ${GAME.gold}`, display: "inline-block" }} />
    GUESS<span style={{ color: GAME.gold }}>SYNC</span>
  </div>
);

const OwlReact = ({ revealed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bob = Math.sin(frame / 12) * 8;
  const cheer = spring({ frame: frame - LT.reveal, fps, config: { damping: 8, mass: 0.5 } });
  const jump = revealed ? -interpolate(cheer, [0, 1], [0, 40]) * Math.abs(Math.sin((frame - LT.reveal) / 6)) : 0;
  return (
    <Img src={staticFile(revealed ? "brand/owl-cheer.png" : "brand/owl-think.png")}
      style={{ position: "absolute", right: 40, bottom: 24, width: 240, height: 240, objectFit: "contain", transform: `translateY(${bob + jump}px) scale(${revealed ? interpolate(cheer, [0, 1], [0.8, 1.05]) : 1})`, filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.5))" }} />
  );
};

const Ring = ({ accent }) => {
  const frame = useCurrentFrame();
  const r = 62, C = 2 * Math.PI * r;
  const remain = interpolate(frame, [0, LT.reveal], [1, 0], { extrapolateRight: "clamp" });
  const secs = Math.max(1, Math.ceil((LT.reveal - frame) / 30));
  const danger = remain < 0.4;
  const col = danger ? "#FF3B3B" : accent;
  const shake = danger ? Math.sin(frame * 1.6) * 4 : 0;
  const pulse = danger ? 1 + 0.09 * Math.sin(frame / 2) : 1;
  if (frame >= LT.reveal) return null;
  return (
    <div style={{ position: "absolute", top: 46, right: 60, width: 150, height: 150, transform: `translateX(${shake}px) scale(${pulse})` }}>
      <svg width="150" height="150" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="75" cy="75" r={r} stroke="rgba(255,255,255,0.14)" strokeWidth="11" fill="none" />
        <circle cx="75" cy="75" r={r} stroke={col} strokeWidth="11" fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - remain)} style={{ filter: `drop-shadow(0 0 10px ${col})` }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontWeight: 900, fontSize: 70, color: danger ? "#FF3B3B" : "#fff" }}>{secs}</div>
    </div>
  );
};

const Progress = ({ num, accent }) => (
  <div style={{ position: "absolute", top: 54, left: 60, fontFamily: font, fontWeight: 900, fontSize: 40, color: GAME.blueDeep, background: accent, padding: "8px 24px", borderRadius: 14, boxShadow: `0 0 26px ${accent}` }}>
    {num}<span style={{ opacity: 0.65, fontSize: 26 }}> / 100</span>
  </div>
);

const Confetti = ({ accent }) => {
  const frame = useCurrentFrame();
  const t = frame - LT.reveal;
  if (t < 0 || t > 60) return null;
  const cols = [accent, "#fff", GAME.gold, GAME.magenta, "#FFD23F"];
  const bits = [];
  for (let i = 0; i < 34; i++) {
    const seed = i * 47.3;
    const x = 50 + Math.cos(seed) * (14 + (i % 6) * 6);
    const y = 42 + Math.sin(seed) * 8 + t * (1.2 + (i % 4) * 0.45);
    bits.push(<div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 11, height: 15, background: cols[i % cols.length], transform: `rotate(${t * (7 + (i % 6))}deg)`, opacity: interpolate(t, [0, 42, 60], [1, 1, 0]), borderRadius: 2 }} />);
  }
  return <AbsoluteFill>{bits}</AbsoluteFill>;
};

const LogoRound = ({ logo, num }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = LVL[logo.level].accent;
  const revealed = frame >= LT.reveal;
  const enter = spring({ frame, fps, config: { damping: 11, mass: 0.7 } });
  const rot = interpolate(enter, [0, 1], [-12, 0]);
  const floatY = Math.sin(frame / 20) * 8;
  const pop = interpolate(frame, [LT.reveal, LT.reveal + 6, LT.reveal + 20], [1, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameS = spring({ frame: frame - LT.reveal, fps, config: { damping: 9, mass: 0.5 } });
  const flash = interpolate(frame, [LT.reveal, LT.reveal + 3, LT.reveal + 11], [0, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 116, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 56, color: "#fff", letterSpacing: 1, textShadow: "0 3px 16px rgba(0,0,0,0.4)" }}>GUESS THE SEA CREATURE</div>
      <Progress num={num} accent={accent} />
      <Ring accent={accent} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `scale(${interpolate(enter, [0, 1], [0.4, 1]) * pop}) translateY(${interpolate(enter, [0, 1], [80, 0]) + floatY}px) rotate(${rot}deg)`, opacity: enter, width: 480, height: 440, borderRadius: 34, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: revealed ? `0 0 80px ${accent}` : "0 30px 70px rgba(0,0,0,0.5)", border: `5px solid ${revealed ? accent : "rgba(255,255,255,0.3)"}`, overflow: "hidden" }}>
          <Img src={staticFile(`sea/${logo.slug}.jpg`)} style={{ width: 470, height: 430, objectFit: "cover", borderRadius: 24 }} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
      <Confetti accent={accent} />
      {revealed && (
        <div style={{ position: "absolute", bottom: 78, left: 0, right: 0, textAlign: "center", transform: `scale(${interpolate(nameS, [0, 1], [0.3, 1])})` }}>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: logo.name.length > 18 ? 66 : (logo.name.length > 14 ? 80 : 96), color: "#fff", textShadow: `0 0 42px ${accent}` }}>
            <span style={{ color: accent, marginInlineEnd: 16 }}>✓</span>{logo.name}
          </div>
          <div style={{ height: 8, width: interpolate(nameS, [0, 1], [0, 360]), background: accent, borderRadius: 999, margin: "14px auto 0", boxShadow: `0 0 20px ${accent}` }} />
        </div>
      )}
      <OwlReact revealed={revealed} />
      {TICKS.map((tf) => (
        <Sequence key={tf} from={tf} durationInFrames={12}><Audio src={staticFile("sfx/tick.wav")} volume={0.5} /></Sequence>
      ))}
      <Sequence from={LT.reveal} durationInFrames={40}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>
      {HAS_NAME_VO && (
        <Sequence from={LT.reveal + 6} durationInFrames={70}><Audio src={staticFile(`sfx/sc-${logo.slug}.wav`)} volume={1} /></Sequence>
      )}
    </AbsoluteFill>
  );
};

const LevelIntro = ({ level }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 9, mass: 0.5 } });
  const a = LVL[level].accent;
  const slide = interpolate(s, [0, 1], [-120, 0]);
  return (
    <AbsoluteFill>
      <Audio src={staticFile(`sfx/vo-${level}-guy.wav`)} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 8 }}>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: 42, letterSpacing: 10, color: "rgba(255,255,255,0.7)", opacity: interpolate(frame, [6, 20], [0, 1], { extrapolateRight: "clamp" }) }}>LEVEL</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 168, color: a, textShadow: `0 0 60px ${a}`, transform: `translateX(${slide}px) scale(${interpolate(s, [0, 1], [0.5, 1])})` }}>{LVL[level].label}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 11 } });
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/vo-intro-sea.wav")} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 26 }}>
        <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 250, height: 250, objectFit: "contain", transform: `scale(${interpolate(s, [0, 1], [0.5, 1])}) translateY(${Math.sin(frame / 12) * 10}px)`, filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.5))" }} />
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 66, color: "#fff", letterSpacing: 3, opacity: interpolate(frame, [8, 24], [0, 1], { extrapolateRight: "clamp" }) }}>GUESS<span style={{ color: GAME.gold }}>SYNC</span></div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 84, color: "#fff", letterSpacing: 2, textAlign: "center", lineHeight: 1.04 }}>GUESS THE<br /><span style={{ color: GAME.gold }}>SEA CREATURE</span></div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: 34, color: GAME.blueDeep, background: GAME.gold, padding: "8px 26px", borderRadius: 999 }}>100 SEA ANIMALS</span>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: 34, color: "#fff", border: `2px solid ${GAME.gold}`, padding: "8px 26px", borderRadius: 999 }}>3 SECONDS EACH</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 7);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/vo-outro-guy.wav")} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
        <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 240, height: 240, objectFit: "contain", transform: `translateY(${Math.sin(frame / 10) * 10}px)` }} />
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 82, color: "#fff", textAlign: "center", transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})` }}>HOW MANY DID YOU GET? <span style={{ color: GAME.gold }}>/100</span></div>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: 40, color: "rgba(255,255,255,0.9)" }}>👇 Comment your score</div>
        <div style={{ background: "#FF0000", color: "#fff", fontFamily: font, fontWeight: 800, fontSize: 46, padding: "18px 54px", borderRadius: 999, transform: `scale(${pulse})` }}>SUBSCRIBE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const build = (logos) => {
  const segs = [];
  let f = 0;
  segs.push({ t: "intro", from: 0, dur: LT.intro }); f += LT.intro;
  let last = null, num = 0;
  for (const lg of logos) {
    if (lg.level !== last) { segs.push({ t: "level", level: lg.level, from: f, dur: LT.level }); f += LT.level; last = lg.level; }
    num += 1;
    segs.push({ t: "round", logo: lg, num, from: f, dur: LT.round }); f += LT.round;
  }
  segs.push({ t: "outro", from: f, dur: LT.outro }); f += LT.outro;
  return { segs, total: f };
};

const Comp = ({ logos }) => {
  const { segs } = build(logos);
  return (
    <AbsoluteFill style={{ backgroundColor: GAME.blueDeep }}>
      <GameBg />
      <Watermark />
      {segs.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          {s.t === "intro" && <Intro />}
          {s.t === "level" && <LevelIntro level={s.level} />}
          {s.t === "round" && <LogoRound logo={s.logo} num={s.num} />}
          {s.t === "outro" && <Outro />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const SEA_FRAMES = build(LOGOS).total;
export const SeaQuiz = () => <Comp logos={LOGOS} />;
