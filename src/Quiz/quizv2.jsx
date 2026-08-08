// GuessSync v2.1 UNIFIED ENGINE — one component for ALL topics (photos/logos/shapes/paintings).
// Pass a config: { items, facts, topicWord, topicPlural, dir, ext, fit, voPrefix, nameField, introVo, coldSlug, emoji }
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["700", "800", "900"] }).fontFamily;

const GAME = { blue: "#2E86C1", blueMid: "#155A8A", blueDeep: "#0A2E47", gold: "#F2B705", magenta: "#F35BD0", green: "#1D9E75", red: "#FF3B3B" };
const LVL = {
  easy: { accent: "#FFD23F", label: "EASY" },
  medium: { accent: "#FF9F40", label: "MEDIUM" },
  hard: { accent: "#FF5C7A", label: "HARD" },
  impossible: { accent: "#B983FF", label: "IMPOSSIBLE" },
};
const TIER_REVEAL = { easy: 180, medium: 180, hard: 180, impossible: 180 };
const HOLD = 90;
const LT = { cold: 250, intro: 165, level: 85, check: 96, outro: 225 };
const ABCD = ["A", "B", "C", "D"];
const hasOptionsFor = () => true;
const roundDur = (lvl) => TIER_REVEAL[lvl] + HOLD;
const nameOf = (it, cfg) => it[cfg.nameField] || it.name;

const makeTicks = (revealAt) => {
  const t = [];
  for (let f = 0; f <= revealAt - 40; f += 30) t.push(f);
  t.push(revealAt - 34, revealAt - 22, revealAt - 12, revealAt - 5);
  return t;
};

const buildOptions = (item, all, cfg) => {
  const idk = cfg.slugKey || "slug";
  const pool = all.filter((x) => x.level === item.level && x[idk] !== item[idk]);
  const seed = String(item[idk]).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const picks = [], used = new Set([item[idk]]);
  let k = 1;
  while (picks.length < 3 && k < pool.length * 4) {
    const cand = pool[(seed * 7 + k) % pool.length];
    if (cand && !used.has(cand[idk])) { used.add(cand[idk]); picks.push(nameOf(cand, cfg)); }
    k++;
  }
  const correctIdx = seed % 4;
  const opts = picks.slice();
  opts.splice(correctIdx, 0, nameOf(item, cfg));
  return { opts: opts.slice(0, 4), correctIdx };
};

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
  <div style={{ position: "absolute", bottom: 36, left: 52, display: "flex", alignItems: "center", gap: 14, fontFamily: font, fontWeight: 900, fontSize: 30, color: "rgba(255,255,255,0.9)", letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
    <Img src={staticFile("brand/logo-icon.png")} style={{ width: 46, height: 46, objectFit: "contain", borderRadius: "50%" }} />
    INFO CHALLENGE<span style={{ color: GAME.gold }}> 360</span>
  </div>
);

const OwlReact = ({ revealed, revealAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bob = Math.sin(frame / 12) * 8;
  const cheer = spring({ frame: frame - revealAt, fps, config: { damping: 8, mass: 0.5 } });
  const jump = revealed ? -interpolate(cheer, [0, 1], [0, 40]) * Math.abs(Math.sin((frame - revealAt) / 6)) : 0;
  return (
    <Img src={staticFile(revealed ? "brand/owl-cheer.png" : "brand/owl-think.png")}
      style={{ position: "absolute", right: 40, bottom: 24, width: 236, height: 236, objectFit: "contain", transform: `translateY(${bob + jump}px) scale(${revealed ? interpolate(cheer, [0, 1], [0.8, 1.05]) : 1})`, filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.5))" }} />
  );
};

const TimerBar = ({ accent, revealAt }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, revealAt], [0, 1], { extrapolateRight: "clamp" });
  const revealed = frame >= revealAt;
  const col = revealed ? "#3BE07A" : (p > 0.75 ? "#FF3B3B" : (p > 0.5 ? "#FF9F40" : accent));
  const secs = Math.max(0, ((revealAt - frame) / 30)).toFixed(1);
  const w = revealed ? 100 : p * 100;
  const shake = !revealed && p > 0.8 ? Math.sin(frame * 1.6) * 3 : 0;
  return (
    <div style={{ position: "absolute", left: 360, right: 420, bottom: 92, transform: `translateY(${shake}px)` }}>
      <div style={{ position: "relative", height: 42, borderRadius: 999, background: "rgba(6,10,32,0.5)", border: `4px solid ${GAME.gold}`, overflow: "hidden", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${w}%`, borderRadius: 999, background: col, boxShadow: `0 0 24px ${col}` }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 52%)", borderRadius: 999 }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "50%", left: `${w}%`, transform: "translate(-50%, -50%)", width: 92, height: 92, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: `5px solid ${col}`, boxShadow: `0 0 24px ${col}`, overflow: "hidden" }}>
        <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 78, height: 78, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 24, fontFamily: font, fontWeight: 900, fontSize: 40, color: p > 0.75 && !revealed ? "#FF7B7B" : "#fff", background: "rgba(6,10,32,0.5)", padding: "2px 20px", borderRadius: 999, whiteSpace: "nowrap" }}>{secs}s</div>
    </div>
  );
};

const Progress = ({ num, accent, total }) => (
  <div style={{ position: "absolute", top: 54, left: 60, fontFamily: font, fontWeight: 900, fontSize: 40, color: GAME.blueDeep, background: accent, padding: "8px 24px", borderRadius: 14, boxShadow: `0 0 26px ${accent}` }}>
    {num}<span style={{ opacity: 0.65, fontSize: 26 }}> / {total}</span>
  </div>
);

// مؤشّر تدرّج الصعوبة — فوق بالنص، الأربعة بألوانها، الحالي يضيء ويكبر (يعرف المشاهد وينه واصل).
const TierMeter = ({ level }) => {
  const order = ["easy", "medium", "hard", "impossible"];
  const idx = order.indexOf(level);
  return (
    <div style={{ position: "absolute", top: 22, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 10 }}>
      {order.map((lv, i) => {
        const passed = i <= idx, cur = i === idx, a = LVL[lv].accent;
        return (
          <div key={lv} style={{
            fontFamily: font, fontWeight: 900, fontSize: cur ? 24 : 20, letterSpacing: 1.5,
            padding: cur ? "6px 20px" : "5px 15px", borderRadius: 999,
            background: cur ? a : "rgba(255,255,255,0.06)",
            border: `2px solid ${passed ? a : "rgba(255,255,255,0.16)"}`,
            color: cur ? GAME.blueDeep : (passed ? a : "rgba(255,255,255,0.45)"),
            boxShadow: cur ? `0 0 24px ${a}` : "none", opacity: passed ? 1 : 0.6,
          }}>{LVL[lv].label}</div>
        );
      })}
    </div>
  );
};

const Confetti = ({ accent, revealAt }) => {
  const frame = useCurrentFrame();
  const t = frame - revealAt;
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

// Reveal-box sizes per photo shape (portrait/square/landscape), so a tall subject
// (lighthouse, tower) or a wide one (bridge, skyline) isn't force-cropped into a
// fixed box built for square-ish photos. cfg.shapes (slug -> bucket) is optional;
// items without an entry default to "square" (the original behavior).
const SHAPE_BOX = {
  options: { square: { w: 400, h: 366 }, portrait: { w: 310, h: 420 }, landscape: { w: 470, h: 300 } },
  open: { square: { w: 555, h: 511 }, portrait: { w: 430, h: 580 }, landscape: { w: 640, h: 400 } },
  cold: { square: { w: 622, h: 522 }, portrait: { w: 480, h: 660 }, landscape: { w: 700, h: 460 } },
};
const shapeOf = (cfg, item) => (cfg.shapes && cfg.shapes[item[cfg.slugKey || "slug"]]) || "square";

const ItemImg = ({ cfg, slug, w, h, revealed, revealAt }) => {
  const frame = useCurrentFrame();
  const kb = interpolate(frame, [0, revealAt], [1.0, 1.07], { extrapolateRight: "clamp" });
  const settle = revealed ? interpolate(frame, [revealAt, revealAt + 10], [1.07, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : kb;
  const pad = cfg.fit === "contain" ? Math.round(w * 0.09) : 5;
  return <Img src={staticFile(`${cfg.dir}/${slug}.${cfg.ext}`)} style={{ width: w - pad * 2, height: h - pad * 2, objectFit: cfg.fit, borderRadius: cfg.fit === "contain" ? 12 : 22, transform: `scale(${settle})` }} />;
};

const Round = ({ item, num, cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = LVL[item.level].accent;
  const revealAt = TIER_REVEAL[item.level];
  const revealed = frame >= revealAt;
  const enter = spring({ frame, fps, config: { damping: 11, mass: 0.7 } });
  const rot = interpolate(enter, [0, 1], [-12, 0]);
  const floatY = Math.sin(frame / 20) * 8;
  const pop = interpolate(frame, [revealAt, revealAt + 6, revealAt + 20], [1, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameS = spring({ frame: frame - revealAt, fps, config: { damping: 9, mass: 0.5 } });
  const flash = interpolate(frame, [revealAt, revealAt + 3, revealAt + 11], [0, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hasOptions = hasOptionsFor(item.level);
  const { opts, correctIdx } = hasOptions ? buildOptions(item, cfg.items, cfg) : { opts: [], correctIdx: 0 };
  const shape = shapeOf(cfg, item);
  const box = hasOptions ? SHAPE_BOX.options[shape] : SHAPE_BOX.open[shape];
  const cardW = box.w, cardH = box.h;
  const imageTop = hasOptions ? 166 : 150;
  // Baseline (square shape) constants below were tuned by eye; for taller/shorter
  // boxes, shift everything below the image by the same delta so nothing collides.
  const baseCardH = hasOptions ? 366 : 511;
  const shift = cardH - baseCardH;
  const optionsTop = 546 + shift;
  const nameTop = 654 + shift;
  const factTop = 806 + shift;
  const name = nameOf(item, cfg);
  return (
    <AbsoluteFill>
      <TierMeter level={item.level} />
      <div style={{ position: "absolute", top: 84, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 50, color: "#fff", letterSpacing: 1, textShadow: "0 3px 16px rgba(0,0,0,0.4)" }}>GUESS THE {cfg.topicWord}</div>
      <Progress num={num} accent={accent} total={cfg.items.length} />
      <div style={{ position: "absolute", top: imageTop, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ transform: `scale(${interpolate(enter, [0, 1], [0.4, 1]) * pop}) translateY(${interpolate(enter, [0, 1], [60, 0]) + floatY}px) rotate(${rot}deg)`, opacity: enter, width: cardW, height: cardH, borderRadius: 30, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: revealed ? `0 0 70px ${accent}` : "0 24px 60px rgba(0,0,0,0.5)", border: `5px solid ${revealed ? accent : "rgba(255,255,255,0.3)"}`, overflow: "hidden" }}>
          <ItemImg cfg={cfg} slug={item[cfg.slugKey || "slug"]} w={cardW} h={cardH} revealed={revealed} revealAt={revealAt} />
        </div>
      </div>
      {hasOptions && (
        <div style={{ position: "absolute", top: optionsTop, left: 0, right: 0, display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center", padding: "0 300px" }}>
          {opts.map((nm, i) => {
            const isC = i === correctIdx;
            const os = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 12, mass: 0.6 } });
            const bg = revealed ? (isC ? GAME.green : "rgba(255,60,60,0.14)") : "rgba(255,255,255,0.10)";
            const bd = revealed ? (isC ? "#7CF0C4" : "rgba(255,60,60,0.5)") : "rgba(255,255,255,0.22)";
            const op = (revealed && !isC ? 0.5 : 1) * interpolate(os, [0, 1], [0, 1]);
            const sc = revealed && isC ? 1.05 : 1;
            return (
              <div key={i} style={{ width: 640, height: 96, display: "flex", alignItems: "center", gap: 18, background: bg, border: `3px solid ${bd}`, borderRadius: 20, padding: "0 24px", opacity: op, transform: `scale(${sc}) translateY(${interpolate(os, [0, 1], [24, 0])}px)`, boxShadow: revealed && isC ? `0 0 34px ${accent}` : "none" }}>
                <span style={{ width: 54, height: 54, borderRadius: 12, background: revealed && isC ? "#fff" : GAME.gold, color: GAME.blueDeep, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontWeight: 900, fontSize: 30, flex: "none" }}>{ABCD[i]}</span>
                <span style={{ fontFamily: font, fontWeight: 900, fontSize: nm.length >= 19 ? 30 : 40, color: "#fff" }}>{nm}</span>
                {revealed && (isC
                  ? <span style={{ marginLeft: "auto", fontFamily: font, fontWeight: 900, fontSize: 46, color: "#fff" }}>✓</span>
                  : <span style={{ marginLeft: "auto", fontFamily: font, fontWeight: 900, fontSize: 40, color: "#FF7B7B" }}>✗</span>)}
              </div>
            );
          })}
        </div>
      )}
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
      <Confetti accent={accent} revealAt={revealAt} />
      {!hasOptions && revealed && (
        <div style={{ position: "absolute", top: 654, left: 0, right: 0, textAlign: "center", transform: `scale(${interpolate(nameS, [0, 1], [0.3, 1])})` }}>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: name.length > 14 ? 78 : 94, color: "#fff", textShadow: `0 0 42px ${accent}` }}>
            <span style={{ color: "#3BE07A", marginInlineEnd: 16 }}>✓</span>{name}
          </div>
        </div>
      )}
      {revealed && cfg.facts && cfg.facts[item[cfg.slugKey || "slug"]] && (
        <div style={{ position: "absolute", top: 806, left: 150, right: 150, display: "flex", justifyContent: "center", opacity: interpolate(frame, [revealAt + 12, revealAt + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), transform: `translateY(${interpolate(frame, [revealAt + 12, revealAt + 30], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, background: "rgba(6,10,32,0.78)", border: `3px solid ${GAME.gold}`, borderRadius: 18, padding: "16px 38px", maxWidth: 1500, boxShadow: "0 12px 34px rgba(0,0,0,0.45)" }}>
            <span style={{ fontSize: 42, flex: "none" }}>💡</span>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: 42, color: "#fff", lineHeight: 1.12 }}>{cfg.facts[item[cfg.slugKey || "slug"]]}</span>
          </div>
        </div>
      )}
      <TimerBar accent={accent} revealAt={revealAt} />
      <OwlReact revealed={revealed} revealAt={revealAt} />
      {makeTicks(revealAt).map((tf) => (
        <Sequence key={tf} from={tf} durationInFrames={10}><Audio src={staticFile("sfx/tick.wav")} volume={0.5} /></Sequence>
      ))}
      <Sequence from={revealAt} durationInFrames={40}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>
      <Sequence from={revealAt + 6} durationInFrames={100}><Audio src={staticFile(`sfx/${cfg.voPrefix}${item[cfg.voKey || "slug"]}.wav`)} volume={1} /></Sequence>
    </AbsoluteFill>
  );
};

const ColdOpen = ({ item, cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rAt = 130;
  const revealed = frame >= rAt;
  const s = spring({ frame, fps, config: { damping: 12 } });
  const accent = "#FF5C7A";
  const name = nameOf(item, cfg);
  const cardW = 622, cardH = 522;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 92, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 68, color: "#fff", textShadow: "0 3px 18px rgba(0,0,0,0.5)" }}>
        {revealed ? <span><span style={{ color: "#3BE07A" }}>✓ </span>{name}</span> : <span><span style={{ color: GAME.red }}>95%</span> CAN'T NAME THIS</span>}
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: cardW, height: cardH, borderRadius: 30, background: "#fff", overflow: "hidden", border: `6px solid ${revealed ? "#3BE07A" : accent}`, boxShadow: revealed ? "0 0 80px #3BE07A" : "0 24px 60px rgba(0,0,0,0.55)", transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ItemImg cfg={cfg} slug={item[cfg.slugKey || "slug"]} w={cardW} h={cardH} revealed={false} revealAt={9999} />
        </div>
      </AbsoluteFill>
      {!revealed && <TimerBar accent={accent} revealAt={rAt} />}
      {revealed && (
        <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 800, fontSize: 44, color: GAME.gold }}>…and {cfg.items.length - 1} more. Can you name them all? 👇</div>
      )}
      <Sequence from={0} durationInFrames={rAt}><Audio src={staticFile("sfx/cold-hook.wav")} volume={1} /></Sequence>
      {makeTicks(rAt).map((tf) => (
        <Sequence key={tf} from={tf} durationInFrames={10}><Audio src={staticFile("sfx/tick.wav")} volume={0.5} /></Sequence>
      ))}
      <Sequence from={rAt} durationInFrames={40}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>
      <Sequence from={rAt + 6} durationInFrames={100}><Audio src={staticFile(`sfx/${cfg.voPrefix}${item[cfg.voKey || "slug"]}.wav`)} volume={1} /></Sequence>
    </AbsoluteFill>
  );
};

const Checkpoint = ({ num, cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10 } });
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={30}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 18 }}>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: 44, letterSpacing: 8, color: "rgba(255,255,255,0.7)" }}>CHECKPOINT</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 200, color: GAME.gold, textShadow: `0 0 60px ${GAME.gold}`, transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})` }}>{num}<span style={{ fontSize: 90, color: "#fff", opacity: 0.7 }}>/{cfg.items.length}</span></div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 60, color: "#fff" }}>How many did YOU get right?</div>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: 40, color: "rgba(255,255,255,0.85)" }}>Keep counting — it only gets harder {cfg.emoji || "🔥"}</div>
      </AbsoluteFill>
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

const Intro = ({ cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 11 } });
  return (
    <AbsoluteFill>
      <Audio src={staticFile(`sfx/${cfg.introVo}.wav`)} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 26 }}>
        <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 250, height: 250, objectFit: "contain", transform: `scale(${interpolate(s, [0, 1], [0.5, 1])}) translateY(${Math.sin(frame / 12) * 10}px)`, filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.5))" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: interpolate(frame, [8, 24], [0, 1], { extrapolateRight: "clamp" }) }}>
          <Img src={staticFile("brand/logo-icon.png")} style={{ width: 64, height: 64, objectFit: "contain", borderRadius: "50%" }} />
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: 52, color: "#fff", letterSpacing: 1 }}>INFO CHALLENGE<span style={{ color: GAME.gold }}> 360</span></div>
        </div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 84, color: "#fff", letterSpacing: 2, textAlign: "center", lineHeight: 1.04 }}>GUESS THE<br /><span style={{ color: GAME.gold }}>{cfg.topicWord}</span></div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: 34, color: GAME.blueDeep, background: GAME.gold, padding: "8px 26px", borderRadius: 999 }}>{cfg.items.length} {cfg.topicPlural}</span>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: 34, color: "#fff", border: `2px solid ${GAME.gold}`, padding: "8px 26px", borderRadius: 999 }}>EASY → IMPOSSIBLE</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Outro = ({ cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 7);
  const total = cfg.items.length;
  const avg = Math.round(total * 0.41);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/vo-outro-guy.wav")} volume={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 24 }}>
        <Img src={staticFile("brand/owl-cheer.png")} style={{ width: 220, height: 220, objectFit: "contain", transform: `translateY(${Math.sin(frame / 10) * 10}px)` }} />
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 82, color: "#fff", textAlign: "center", transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})` }}>HOW MANY DID YOU GET? <span style={{ color: GAME.gold }}>/{total}</span></div>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: 44, color: "#fff" }}>Average is <span style={{ color: GAME.gold }}>{avg}/{total}</span> — can you beat it? 👇</div>
        <div style={{ background: "#FF0000", color: "#fff", fontFamily: font, fontWeight: 800, fontSize: 46, padding: "18px 54px", borderRadius: 999, transform: `scale(${pulse})` }}>SUBSCRIBE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const build = (cfg) => {
  const items = cfg.items;
  const segs = [];
  let f = 0;
  const coldItem = (cfg.coldSlug && items.find((l) => l[cfg.slugKey || "slug"] === cfg.coldSlug)) || items.find((l) => l.level === "impossible") || items[0];
  segs.push({ t: "cold", item: coldItem, from: f, dur: LT.cold }); f += LT.cold;
  segs.push({ t: "intro", from: f, dur: LT.intro }); f += LT.intro;
  let last = null, num = 0;
  for (const it of items) {
    if (it.level !== last) { segs.push({ t: "level", level: it.level, from: f, dur: LT.level }); f += LT.level; last = it.level; }
    num += 1;
    segs.push({ t: "round", item: it, num, from: f, dur: roundDur(it.level) }); f += roundDur(it.level);
    if (num === 25 || num === 50 || num === 75) { segs.push({ t: "check", num, from: f, dur: LT.check }); f += LT.check; }
  }
  segs.push({ t: "outro", from: f, dur: LT.outro }); f += LT.outro;
  return { segs, total: f };
};

export const quizFrames = (cfg) => build(cfg).total;

export const QuizV2 = ({ config }) => {
  const { segs } = build(config);
  return (
    <AbsoluteFill style={{ backgroundColor: GAME.blueDeep }}>
      <GameBg />
      <Watermark />
      <Audio loop volume={0.11} src={staticFile("sfx/bed-heartbeat.wav")} />
      {segs.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          {s.t === "cold" && <ColdOpen item={s.item} cfg={config} />}
          {s.t === "intro" && <Intro cfg={config} />}
          {s.t === "level" && <LevelIntro level={s.level} />}
          {s.t === "round" && <Round item={s.item} num={s.num} cfg={config} />}
          {s.t === "check" && <Checkpoint num={s.num} cfg={config} />}
          {s.t === "outro" && <Outro cfg={config} />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
