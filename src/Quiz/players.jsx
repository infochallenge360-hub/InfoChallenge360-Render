// «Guess the Footballer» — حلقة كاملة (تلميحات، بدون صور وجوه = قانوني)
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, LEVEL_STYLE, LEVEL_LABEL } from "./data";
import { font, Qchip, CountdownRing, Brand } from "./parts";
import { BgBokeh } from "./bgs";
import { IcLogo } from "./logo";
import { PLAYERS, PLAYER_LEVELS } from "./playersData";

const TICKS = [0, 30, 60, 90, 120, 150, 180]; // 7 تكّات = 7 ثواني

const ClueRow = ({ icon, label, value, flag, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.8 } });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "18px 34px", background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.14)", borderRadius: 16, transform: `translateX(${interpolate(s, [0, 1], [80, 0])}px)`, opacity: s }}>
      <span style={{ fontSize: 38, width: 50, textAlign: "center" }}>{icon}</span>
      <span style={{ fontFamily: font, fontWeight: 600, fontSize: 32, color: "rgba(255,255,255,0.6)", width: 250 }}>{label}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: font, fontWeight: 800, fontSize: 38, color: "#fff" }}>
        {flag && <Img src={staticFile(`flags/${flag}.svg`)} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 5 }} />}
        {value}
      </span>
    </div>
  );
};

const RevealPlayer = ({ name, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < T.reveal) return null;
  const s = spring({ frame: frame - T.reveal, fps, config: { damping: 10, mass: 0.6 } });
  return (
    <div style={{ position: "absolute", bottom: 66, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 88, color: "#fff", textShadow: `0 0 40px ${accent}`, transform: `scale(${interpolate(s, [0, 1], [0.4, 1])})` }}>
      <span style={{ color: accent, marginInlineEnd: 16 }}>✓</span>{name}
    </div>
  );
};

const ClueRound = ({ player, num }) => {
  const frame = useCurrentFrame();
  const accent = LEVEL_STYLE[player.level].accent;
  const revealed = frame >= T.reveal;
  const clues = [
    { icon: "🌍", label: "Nationality", flag: player.iso, value: player.nat },
    { icon: "🏟️", label: "Club", value: player.club },
    { icon: "⚽", label: "Position", value: player.pos },
    { icon: "🎂", label: "Age", value: player.age },
    { icon: "🏆", label: "Fun Fact", value: player.fact },
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 118, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 60, color: "#fff" }}>GUESS THE PLAYER</div>
      <Qchip num={num} accent={accent} />
      {!revealed && <CountdownRing accent={accent} />}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 900 }}>
          {clues.map((c, i) => <ClueRow key={i} {...c} delay={10 + i * 9} />)}
        </div>
      </AbsoluteFill>
      <RevealPlayer name={player.name} accent={accent} />
      <Brand />
      {TICKS.map((tf) => (
        <Sequence key={tf} from={tf} durationInFrames={12}><Audio src={staticFile("sfx/tick.wav")} volume={0.5} /></Sequence>
      ))}
      <Sequence from={T.reveal} durationInFrames={40}><Audio src={staticFile("sfx/ding.wav")} volume={0.85} /></Sequence>
      <Sequence from={T.reveal + 8} durationInFrames={70}><Audio src={staticFile(`sfx/pname-${player.key}.mp3`)} volume={1} /></Sequence>
    </AbsoluteFill>
  );
};

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
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 170, color: a, textShadow: `0 0 60px ${a}`, transform: `scale(${interpolate(s, [0, 1], [0.4, 1])})` }}>{LEVEL_LABEL[level]}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PlayerIntro = () => (
  <AbsoluteFill>
    <Audio src={staticFile("sfx/pl-intro.mp3")} volume={0.95} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 26 }}>
      <IcLogo />
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 58, color: "#fff", letterSpacing: 3 }}>⚽ GUESS THE PLAYER</div>
    </AbsoluteFill>
  </AbsoluteFill>
);

const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 7);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/vo-outro.mp3")} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40 }}>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 84, color: "#fff", transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})` }}>HOW MANY DID YOU GET?</div>
        <div style={{ background: "#FF0000", color: "#fff", fontFamily: font, fontWeight: 800, fontSize: 46, padding: "18px 54px", borderRadius: 999, transform: `scale(${pulse})` }}>SUBSCRIBE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// خطّ زمني: مقدمة + (عنوان مستوى + جولاته) + خاتمة
const buildPlayers = (players) => {
  const segs = [];
  let f = 0;
  segs.push({ t: "intro", from: 0, dur: 165 });
  f += 165;
  let last = null, num = 0;
  for (const p of players) {
    if (p.level !== last) { segs.push({ t: "level", level: p.level, from: f, dur: T.level }); f += T.level; last = p.level; }
    num += 1;
    segs.push({ t: "round", player: p, num, from: f, dur: T.round });
    f += T.round;
  }
  segs.push({ t: "outro", from: f, dur: T.outro });
  f += T.outro;
  return { segs, total: f };
};

const Comp = ({ players }) => {
  const { segs } = buildPlayers(players);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1022" }}>
      <BgBokeh />
      <Audio src={staticFile("sfx/bed.wav")} volume={0.22} loop />
      {segs.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          {s.t === "intro" && <PlayerIntro />}
          {s.t === "level" && <LevelIntro level={s.level} />}
          {s.t === "round" && <ClueRound player={s.player} num={s.num} />}
          {s.t === "outro" && <Outro />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const PLAYER_FRAMES = buildPlayers(PLAYERS).total;
export const PLAYER_SAMPLE_FRAMES = buildPlayers(PLAYERS.slice(0, 5)).total;
export const PlayerQuiz = () => <Comp players={PLAYERS} />;
export const PlayerQuizSample = () => <Comp players={PLAYERS.slice(0, 5)} />;
