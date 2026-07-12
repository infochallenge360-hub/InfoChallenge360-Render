// ثمبنيل GuessSync — 1280×720 · عالي النقر (بومة + رقم ضخم + كولاج + Only 1%)
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["800", "900"] }).fontFamily;
const G = { blue: "#23429E", blueMid: "#122258", blueDeep: "#0A1436", gold: "#FFC53D", magenta: "#F35BD0" };
const stroke = { WebkitTextStroke: "7px #0A1436", paintOrder: "stroke fill" };

const Bg = () => (
  <AbsoluteFill style={{ background: `radial-gradient(80% 90% at 50% 34%, ${G.blue} 0%, ${G.blueMid} 52%, ${G.blueDeep} 100%)` }}>
    <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 50% 40%, rgba(255,197,61,0.10) 0deg 4deg, transparent 4deg 12deg)", maskImage: "radial-gradient(circle at 50% 40%, #000 6%, transparent 55%)", WebkitMaskImage: "radial-gradient(circle at 50% 40%, #000 6%, transparent 55%)" }} />
  </AbsoluteFill>
);

const Card = ({ children, rot, x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${s})`, padding: 10, background: "#fff", borderRadius: 16, boxShadow: "0 18px 45px rgba(0,0,0,0.55)" }}>{children}</div>
);

// mode: "logos" | "flags" | "capitals" | "countries" | "shapes"  · items: array of slugs/isos
const Silhouette = ({ iso, size, x, y, rot }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, width: size, height: size * 0.8,
    WebkitMaskImage: `url(${staticFile(`maps/${iso}.svg`)})`, maskImage: `url(${staticFile(`maps/${iso}.svg`)})`,
    WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center",
    background: "linear-gradient(160deg, #ffffff, #b9cdf0)", filter: "drop-shadow(0 10px 26px rgba(0,0,0,0.6))" }} />
);
export const GsThumb = ({ mode = "logos", items = [] }) => {
  const isShape = mode === "shapes";
  const isAnimal = mode === "animals";
  const isFood = mode === "foods";
  const isDog = mode === "dogs";
  const isLandmark = mode === "landmarks";
  const isCar = mode === "cars";
  const isPainting = mode === "paintings";
  const isBird = mode === "birds";
  const isSea = mode === "sea";
  const isFruits = mode === "fruits";
  const isPhoto = isAnimal || isFood || isDog || isLandmark || isCar || isBird || isSea || isFruits; // صور فوتوغرافية cover (اللوحات contain)
  const isFlag = mode === "flags" || mode === "capitals" || mode === "countries"; // flag assets
  const word = mode === "logos" ? "LOGO" : isAnimal ? "ANIMAL" : isFood ? "FOOD" : isDog ? "DOG" : isCar ? "CAR" : isBird ? "BIRD" : isSea ? "SEA LIFE" : isFruits ? "FRUIT OR VEG?" : isPainting ? "PAINTING" : (mode === "countries" || isShape || isLandmark) ? "COUNTRY" : mode === "capitals" ? "CAPITAL" : "FLAG";
  const sub = mode === "logos" ? "100 BRANDS" : isAnimal ? "100 ANIMALS" : isFood ? "100 FOODS" : isDog ? "100 BREEDS" : isCar ? "100 CARS" : isBird ? "100 BIRDS" : isSea ? "100 SEA ANIMALS" : isFruits ? "100 FRUITS & VEG" : isPainting ? "100 PAINTINGS" : isLandmark ? "100 LANDMARKS" : mode === "capitals" ? "100 CAPITALS" : "100 COUNTRIES";
  const asset = (it) => isFlag ? `flags/${it}.svg` : isAnimal ? `animals/${it}.png` : isFood ? `foods/${it}.png` : isDog ? `dogs/${it}.png` : isCar ? `cars/${it}.png` : isBird ? `birds/${it}.jpg` : isSea ? `sea/${it}.jpg` : isFruits ? `fruits/${it}.jpg` : isLandmark ? `landmarks/${it}.png` : isPainting ? `paintings/${it}.jpg` : `logos/${it}.svg`;
  const pics = items.slice(0, 3);
  return (
    <AbsoluteFill>
      <Bg />
      {isShape ? (
        <>
          <Silhouette iso={pics[0]} size={300} x={70} y={120} rot={-8} />
          <Silhouette iso={pics[1]} size={230} x={120} y={410} rot={7} />
        </>
      ) : (
      <>
      {/* كولاج يسار */}
      <Card rot={-11} x={70} y={150} s={1.05}>
        <Img src={staticFile(asset(pics[0]))} style={{ width: 200, height: isFlag ? 134 : 200, objectFit: isPhoto ? "cover" : "contain", borderRadius: isPhoto ? 10 : 0, display: "block" }} />
      </Card>
      <Card rot={7} x={110} y={420} s={0.9}>
        <Img src={staticFile(asset(pics[1]))} style={{ width: 180, height: isFlag ? 120 : 180, objectFit: isPhoto ? "cover" : "contain", borderRadius: isPhoto ? 10 : 0, display: "block" }} />
      </Card>
      </>
      )}
      <div style={{ position: "absolute", left: 315, top: 250, fontFamily: font, fontWeight: 900, fontSize: 190, color: "#fff", ...stroke }}>?</div>
      {/* نص يمين */}
      <div style={{ position: "absolute", right: 46, top: 90, textAlign: "right", width: 830 }}>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: 96, color: "#fff", lineHeight: 1, ...stroke }}>GUESS THE</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: word.length > 10 ? 98 : word.length > 6 ? 138 : 176, color: G.gold, lineHeight: 1, ...stroke }}>{word}</div>
        <div style={{ fontFamily: font, fontWeight: 900, fontSize: (sub + " · 3 SEC").length > 18 ? 50 : 60, color: "#fff", marginTop: 8, ...stroke, WebkitTextStroke: "5px #0A1436" }}>{sub} · 3 SEC</div>
      </div>
      {/* بومة */}
      <Img src={staticFile("brand/owl-cheer.png")} style={{ position: "absolute", right: 40, bottom: -10, width: 300, height: 300, objectFit: "contain", filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.5))" }} />
      {/* شارة Only 1% */}
      <div style={{ position: "absolute", bottom: 40, left: 60, transform: "rotate(-6deg)", background: "#FF2A2A", color: "#fff", fontFamily: font, fontWeight: 900, fontSize: 54, padding: "14px 34px", borderRadius: 18, border: "5px solid #fff", boxShadow: "0 12px 34px rgba(0,0,0,0.5)", WebkitTextStroke: "2px #7a0000", paintOrder: "stroke fill" }}>Only 1% 100%</div>
      {/* واترمارك */}
      <div style={{ position: "absolute", top: 28, left: 40, display: "flex", alignItems: "center", gap: 10, fontFamily: font, fontWeight: 900, fontSize: 34, color: "#fff" }}>
        <span style={{ width: 16, height: 16, borderRadius: "50%", border: `4px solid ${G.gold}` }} />GUESS<span style={{ color: G.gold }}>SYNC</span>
      </div>
    </AbsoluteFill>
  );
};
