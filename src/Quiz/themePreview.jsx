// معاينة ثيمات GuessSync — 4 اتجاهات مختلفة كلياً للاختيار
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["600", "700", "800", "900"] }).fontFamily;

// ── تعريف الثيمات ──
export const THEMES = {
  // 1) داكن نظيف — بدون زحمة، توهّج واحد ناعم
  midnight: {
    label: "Midnight (Clean Dark)",
    text: "#FFFFFF", sub: "rgba(255,255,255,0.6)", card: "#FFFFFF",
    accent: "#38BDF8", accent2: "#A78BFA",
    Bg: () => (
      <AbsoluteFill style={{ background: "linear-gradient(165deg,#0A0E1F 0%,#111A33 60%,#0A0E1F 100%)" }}>
        <AbsoluteFill style={{ background: "radial-gradient(60% 45% at 50% 22%, rgba(56,189,248,0.22), transparent 70%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(50% 40% at 80% 90%, rgba(167,139,250,0.16), transparent 70%)" }} />
      </AbsoluteFill>
    ),
  },
  // 2) تدرّج نابض — طاقة وحيوية
  aurora: {
    label: "Aurora (Vibrant Gradient)",
    text: "#FFFFFF", sub: "rgba(255,255,255,0.75)", card: "#FFFFFF",
    accent: "#FDE047", accent2: "#FB7185",
    Bg: () => (
      <AbsoluteFill style={{ background: "linear-gradient(135deg,#4C1D95 0%,#7C3AED 32%,#DB2777 66%,#F97316 100%)" }}>
        <AbsoluteFill style={{ background: "radial-gradient(45% 40% at 30% 25%, rgba(255,255,255,0.22), transparent 70%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(40% 35% at 85% 80%, rgba(0,0,0,0.25), transparent 70%)" }} />
      </AbsoluteFill>
    ),
  },
  // 3) استوديو فاتح — نظيف، مشرق، مقروء
  studio: {
    label: "Studio (Bright / Light)",
    text: "#0F172A", sub: "rgba(15,23,42,0.55)", card: "#FFFFFF",
    accent: "#2563EB", accent2: "#F97316",
    Bg: () => (
      <AbsoluteFill style={{ background: "radial-gradient(70% 70% at 50% 28%, #FFFFFF 0%,#EEF2F7 55%,#DCE3ED 100%)" }}>
        <AbsoluteFill style={{ background: "radial-gradient(40% 30% at 82% 82%, rgba(37,99,235,0.10), transparent 70%)" }} />
      </AbsoluteFill>
    ),
  },
  // 0) ⭐ ترشيح الخبير — بنفسجي ملكي عميق + ذهبي (فخم، مملوك، مختلف عن الكل)
  signature: {
    label: "Signature ⭐ Royal Violet + Gold",
    text: "#FFFFFF", sub: "rgba(255,255,255,0.6)", card: "#FFFFFF",
    accent: "#FFC53D", accent2: "#F35BD0",
    Bg: () => (
      <AbsoluteFill style={{ background: "radial-gradient(85% 80% at 50% 30%, #2E1065 0%,#1B0B45 52%,#0D0524 100%)" }}>
        <AbsoluteFill style={{ background: "radial-gradient(48% 40% at 50% 26%, rgba(255,197,61,0.16), transparent 70%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(45% 40% at 82% 85%, rgba(243,91,208,0.20), transparent 70%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(40% 35% at 15% 80%, rgba(124,58,237,0.25), transparent 70%)" }} />
      </AbsoluteFill>
    ),
  },
  // 4) استوديو ملكي — أزرق ملكي + ذهبي، إحساس برنامج مسابقات
  gameshow: {
    label: "Gameshow (Royal + Gold)",
    text: "#FFFFFF", sub: "rgba(255,255,255,0.65)", card: "#FFFFFF",
    accent: "#FFC53D", accent2: "#38BDF8",
    Bg: () => (
      <AbsoluteFill style={{ background: "radial-gradient(75% 75% at 50% 38%, #1E3A8A 0%,#122258 55%,#0A1436 100%)" }}>
        <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 50% 42%, rgba(255,197,61,0.08) 0deg 4deg, transparent 4deg 12deg)", maskImage: "radial-gradient(circle at 50% 42%, #000 8%, transparent 55%)", WebkitMaskImage: "radial-gradient(circle at 50% 42%, #000 8%, transparent 55%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(55% 45% at 50% 30%, rgba(255,197,61,0.16), transparent 70%)" }} />
      </AbsoluteFill>
    ),
  },
};

const Logo = ({ t }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <svg width="54" height="54" viewBox="0 0 100 100">
      <defs><linearGradient id={`g${t.accent}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={t.accent} /><stop offset="1" stopColor={t.accent2} /></linearGradient></defs>
      <circle cx="50" cy="50" r="34" fill="none" stroke={`url(#g${t.accent})`} strokeWidth="9" strokeLinecap="round" strokeDasharray="150 40" transform="rotate(-40 50 50)" />
      <text x="50" y="61" textAnchor="middle" fontFamily={font} fontWeight="900" fontSize="30" fill={t.text}>?</text>
    </svg>
    <div style={{ fontFamily: font, fontWeight: 900, fontSize: 34, color: t.text }}>GUESS<span style={{ color: t.accent }}>SYNC</span></div>
  </div>
);

export const ThemePreview = ({ theme = "midnight" }) => {
  const t = THEMES[theme];
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <t.Bg />
      {/* عنوان */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", fontFamily: font, fontWeight: 900, fontSize: 58, color: t.text, letterSpacing: 1 }}>GUESS THE LOGO</div>
      {/* تقدّم */}
      <div style={{ position: "absolute", top: 54, left: 60, fontFamily: font, fontWeight: 800, fontSize: 38, color: theme === "studio" ? "#fff" : "#0b1022", background: t.accent, padding: "8px 22px", borderRadius: 14, boxShadow: `0 0 24px ${t.accent}` }}>7<span style={{ opacity: 0.6, fontSize: 26 }}> / 100</span></div>
      {/* عدّاد */}
      <div style={{ position: "absolute", top: 46, right: 60, width: 150, height: 150 }}>
        <svg width="150" height="150" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="75" cy="75" r="62" stroke={theme === "studio" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.14)"} strokeWidth="11" fill="none" />
          <circle cx="75" cy="75" r="62" stroke={t.accent} strokeWidth="11" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 62} strokeDashoffset={2 * Math.PI * 62 * 0.55} style={{ filter: `drop-shadow(0 0 8px ${t.accent})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontWeight: 800, fontSize: 64, color: t.text }}>2</div>
      </div>
      {/* بطاقة الشعار */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 360, height: 360, borderRadius: 34, background: t.card, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: theme === "studio" ? "0 24px 60px rgba(15,23,42,0.18)" : "0 30px 70px rgba(0,0,0,0.5)", border: `4px solid ${theme === "studio" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.25)"}` }}>
          <Img src={staticFile("logos/spotify.svg")} style={{ width: 210, height: 210, objectFit: "contain", filter: "drop-shadow(0 0 1.2px rgba(0,0,0,0.4))" }} />
        </div>
      </AbsoluteFill>
      {/* واترمارك */}
      <div style={{ position: "absolute", bottom: 40, left: 60 }}><Logo t={t} /></div>
      {/* اسم الثيم */}
      <div style={{ position: "absolute", bottom: 44, right: 60, fontFamily: font, fontWeight: 800, fontSize: 30, color: t.sub, letterSpacing: 1 }}>{t.label}</div>
    </AbsoluteFill>
  );
};
