// مولّد ثمبنيلات يوتيوب عالية النقر — Info Challenge 360
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { font } from "./parts";

const G = "#22E06A", C = "#22C3FF";
const stroke = { WebkitTextStroke: "6px #0b1022", paintOrder: "stroke fill" };

const FlagCard = ({ iso, rot, x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${s})`, padding: 10, background: "#fff", borderRadius: 14, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
    <Img src={staticFile(`flags/${iso}.svg`)} style={{ width: 240, height: 160, objectFit: "cover", borderRadius: 6, display: "block" }} />
  </div>
);

// خلفية مشعّة
const Bg = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 30% 40%, #1e3a8f, #0b1022 75%)", overflow: "hidden" }}>
    <AbsoluteFill style={{ background: `repeating-conic-gradient(from 0deg at 32% 45%, rgba(255,255,255,0.08) 0deg 5deg, transparent 5deg 13deg)`, maskImage: "radial-gradient(circle at 32% 45%, #000 5%, transparent 60%)" }} />
  </AbsoluteFill>
);

const Logo = () => (
  <div style={{ position: "absolute", top: 34, left: 40, display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 40, height: 40, borderRadius: "50%", border: `6px solid ${G}` }} />
    <div style={{ fontFamily: font, fontWeight: 800, fontSize: 30, color: "#fff" }}>INFO CHALLENGE <span style={{ color: G }}>360</span></div>
  </div>
);

const Badge = () => (
  <div style={{ position: "absolute", bottom: 46, right: 54, transform: "rotate(-8deg)", background: "#FF2A2A", color: "#fff", fontFamily: font, fontWeight: 900, fontSize: 60, padding: "16px 40px", borderRadius: 20, border: "6px solid #fff", boxShadow: "0 14px 40px rgba(0,0,0,0.5)", ...stroke, WebkitTextStroke: "3px #7a0000" }}>0/48?</div>
);

export const Thumb = ({ mode = "flags" }) => {
  if (mode === "players") {
    return (
      <AbsoluteFill>
        <Bg />
        <Logo />
        {/* بطاقة تلميح */}
        <div style={{ position: "absolute", left: 70, top: 210, width: 380, background: "rgba(255,255,255,0.1)", border: `4px solid ${C}`, borderRadius: 24, padding: 30, transform: "rotate(-4deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: 120, textAlign: "center" }}>⚽</div>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: 60, color: "#fff", textAlign: "center" }}>???</div>
        </div>
        <div style={{ position: "absolute", right: 60, top: 150, textAlign: "right", width: 720 }}>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: 96, color: "#fff", lineHeight: 1, ...stroke }}>GUESS THE</div>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: 150, color: G, lineHeight: 1, ...stroke, WebkitTextStroke: "6px #063d1f" }}>PLAYER</div>
          <div style={{ fontFamily: font, fontWeight: 900, fontSize: 70, color: C, marginTop: 10, ...stroke, WebkitTextStroke: "5px #063a4d" }}>60 STARS ⭐</div>
        </div>
        <div style={{ position: "absolute", bottom: 46, right: 54, transform: "rotate(-8deg)", background: "#FF2A2A", color: "#fff", fontFamily: font, fontWeight: 900, fontSize: 60, padding: "16px 40px", borderRadius: 20, border: "6px solid #fff", boxShadow: "0 14px 40px rgba(0,0,0,0.5)", WebkitTextStroke: "3px #7a0000", paintOrder: "stroke fill" }}>60/60?</div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <Bg />
      <Logo />
      <FlagCard iso="jp" rot={-12} x={70} y={200} s={1.15} />
      <FlagCard iso="br" rot={8} x={250} y={330} s={1} />
      <FlagCard iso="kr" rot={-6} x={120} y={470} s={0.9} />
      <div style={{ position: "absolute", left: 300, top: 240, fontFamily: font, fontWeight: 900, fontSize: 220, color: "#fff", ...stroke, WebkitTextStroke: "8px #0b1022" }}>?</div>
      <div style={{ position: "absolute", right: 56, top: 150, textAlign: "right", width: 720 }}>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 100, color: "#fff", lineHeight: 1, ...stroke }}>GUESS THE</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 168, color: G, lineHeight: 1, ...stroke, WebkitTextStroke: "7px #063d1f" }}>FLAG</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 66, color: C, marginTop: 12, ...stroke, WebkitTextStroke: "5px #063a4d" }}>48 COUNTRIES</div>
      </div>
      <Badge />
    </AbsoluteFill>
  );
};
