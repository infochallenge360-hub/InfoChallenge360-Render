// هوية GuessSync — لوجو (بروفايل + لوك أب) + بانر · ثيم Royal Violet + Gold
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["700", "800", "900"] }).fontFamily;

export const BRAND = {
  violet: "#2E1065", violetDeep: "#1B0B45", violetLit: "#7C3AED",
  gold: "#FFC53D", gold2: "#F59E0B", magenta: "#F35BD0", white: "#FFFFFF",
};

// العلامة (أيقونة) — حلقة تزامن ذهبية مفتوحة + سهمان + «؟»
export const GsMark = ({ s = 300 }) => (
  <svg width={s} height={s} viewBox="0 0 200 200">
    <defs>
      <radialGradient id="gsbg" cx="50%" cy="42%" r="70%">
        <stop offset="0" stopColor="#3A1478" /><stop offset="1" stopColor={BRAND.violetDeep} />
      </radialGradient>
      <linearGradient id="gsring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={BRAND.gold} /><stop offset="0.6" stopColor={BRAND.gold2} /><stop offset="1" stopColor={BRAND.magenta} />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="100" fill="url(#gsbg)" />
    <circle cx="100" cy="100" r="66" fill="none" stroke="url(#gsring)" strokeWidth="15" strokeLinecap="round" strokeDasharray="300 110" transform="rotate(-52 100 100)" style={{ filter: "drop-shadow(0 0 6px rgba(255,197,61,0.5))" }} />
    {/* رأسا السهمين عند فتحة الحلقة (إيحاء التزامن) */}
    <polygon points="150,54 168,60 152,74" fill={BRAND.gold} />
    <polygon points="50,146 32,140 48,126" fill={BRAND.magenta} />
    <text x="100" y="133" textAnchor="middle" fontFamily={font} fontWeight="900" fontSize="96" fill="#fff">?</text>
  </svg>
);

// لوجو أفقي (أيقونة + اسم)
export const GsLockup = ({ s = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 26 * s }}>
    <GsMark s={104 * s} />
    <div style={{ fontFamily: font, fontWeight: 900, fontSize: 92 * s, color: "#fff", letterSpacing: 1, lineHeight: 1 }}>
      GUESS<span style={{ color: BRAND.gold }}>SYNC</span>
    </div>
  </div>
);

// صورة البروفايل (مربّعة 1:1 — تُقصّ دائرية في يوتيوب) — بومة GuessSync
export const ProfileLogo = () => (
  <AbsoluteFill style={{ background: "#0A1436", overflow: "hidden" }}>
    <Img src={staticFile("brand/owl-portrait.png")} style={{ position: "absolute", width: "108%", height: "108%", left: "-4%", top: "-2%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "radial-gradient(74% 74% at 50% 46%, transparent 60%, rgba(6,12,36,0.5) 100%)" }} />
  </AbsoluteFill>
);

// لوجو أفقي شفّاف (بومة + اسم) — للمقدمة/العروض
export const LogoLockupImg = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 24 }}>
    <Img src={staticFile("brand/owl-cut.png")} style={{ width: 360, height: 360, objectFit: "contain" }} />
    <div style={{ fontFamily: font, fontWeight: 900, fontSize: 150, color: "#fff", letterSpacing: 1 }}>GUESS<span style={{ color: BRAND.gold }}>SYNC</span></div>
  </AbsoluteFill>
);

// علامة مائية للفيديو 150×150 شفّاف — البومة
export const Watermark = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    <Img src={staticFile("brand/owl-cut.png")} style={{ width: 150, height: 150, objectFit: "contain" }} />
  </AbsoluteFill>
);

// ألوان ثيم Gameshow (أزرق ملكي + ذهبي)
const GAME = { blue: "#23429E", blueMid: "#122258", blueDeep: "#0A1436", gold: "#FFC53D", magenta: "#F35BD0" };

// البانر (غلاف القناة) 2048×1152 — خلفية نظيفة مقروءة + قناة شاملة
export const Banner = () => (
  <AbsoluteFill style={{ background: `radial-gradient(85% 95% at 50% 38%, ${GAME.blue} 0%, ${GAME.blueMid} 52%, ${GAME.blueDeep} 100%)`, overflow: "hidden" }}>
    {/* أشعة ذهبية خفيفة (خلف الوسط فقط، لا تلمس النص) */}
    <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 50% 40%, rgba(255,197,61,0.09) 0deg 4deg, transparent 4deg 13deg)", maskImage: "radial-gradient(circle at 50% 40%, #000 4%, transparent 46%)", WebkitMaskImage: "radial-gradient(circle at 50% 40%, #000 4%, transparent 46%)" }} />
    <AbsoluteFill style={{ background: "radial-gradient(42% 42% at 50% 36%, rgba(255,197,61,0.12), transparent 72%)" }} />
    {/* البومة يسار (مفرّغة) — زينة */}
    <Img src={staticFile("brand/owl-cut.png")} style={{ position: "absolute", left: 110, top: "50%", transform: "translateY(-50%)", width: 470, height: 470, objectFit: "contain", filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.5))" }} />
    {/* النص داخل المنطقة الآمنة الوسطى */}
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 18 }}>
      <div style={{ fontFamily: font, fontWeight: 900, fontSize: 156, color: "#fff", letterSpacing: 1, lineHeight: 1, textShadow: `0 4px 26px rgba(0,0,0,0.55)` }}>GUESS<span style={{ color: GAME.gold }}>SYNC</span></div>
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 48, color: "#fff" }}>
        The Ultimate <span style={{ color: GAME.gold }}>Quiz</span> — <span style={{ color: GAME.gold }}>Beat the Clock</span> ⏱️
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        <span style={{ fontFamily: font, fontWeight: 800, fontSize: 30, color: "#fff", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.3)", padding: "9px 26px", borderRadius: 999 }}>Logos · Flags · Football · Movies · Trivia</span>
        <span style={{ fontFamily: font, fontWeight: 800, fontSize: 30, color: GAME.blueDeep, background: GAME.gold, padding: "9px 28px", borderRadius: 999 }}>🔔 New Quiz Every Week</span>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
