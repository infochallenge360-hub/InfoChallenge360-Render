// ثمبنيل GuessSync v3 — 1280×720 · بؤرة واحدة قوية (بحث CTR 2026)
// 2×2 صور كبيرة + كلمة بطل ضخمة + هيدر رفيع + بومة زاوية صغيرة · ≤6 كلمات · يُقرأ على 168×94
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["800", "900"] }).fontFamily;
const G = { blue: "#23429E", blueMid: "#122258", blueDeep: "#0A1436", gold: "#FFC53D" };

const Bg = () => (
  <AbsoluteFill style={{ background: `radial-gradient(85% 95% at 68% 46%, ${G.blue} 0%, ${G.blueMid} 50%, ${G.blueDeep} 100%)` }}>
    <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 68% 46%, rgba(255,197,61,0.08) 0deg 4deg, transparent 4deg 12deg)", maskImage: "radial-gradient(circle at 68% 46%, #000 6%, transparent 56%)", WebkitMaskImage: "radial-gradient(circle at 68% 46%, #000 6%, transparent 56%)" }} />
    {/* سكرim غامق خلف النص يمين لرفع التباين (طبقة تباين) */}
    <AbsoluteFill style={{ background: "linear-gradient(90deg, transparent 40%, rgba(5,8,25,0.55) 100%)" }} />
  </AbsoluteFill>
);

const ASSET = {
  logos: { dir: "logos", ext: "svg", fit: "contain" }, flags: { dir: "flags", ext: "svg", fit: "contain" },
  capitals: { dir: "flags", ext: "svg", fit: "contain" }, countries: { dir: "flags", ext: "svg", fit: "contain" },
  shapes: { dir: "maps", ext: "svg", fit: "contain" }, animals: { dir: "animals", ext: "png", fit: "cover" },
  foods: { dir: "foods", ext: "png", fit: "cover" }, dogs: { dir: "dogs", ext: "png", fit: "cover" },
  cars: { dir: "cars", ext: "png", fit: "cover" }, landmarks: { dir: "landmarks", ext: "png", fit: "cover" },
  birds: { dir: "birds", ext: "jpg", fit: "cover" }, sea: { dir: "sea", ext: "jpg", fit: "cover" },
  paintings: { dir: "paintings", ext: "jpg", fit: "contain" }, fruits: { dir: "fruits", ext: "jpg", fit: "cover" },
  butterflies: { dir: "butterflies", ext: "jpg", fit: "cover" }, snakes: { dir: "snakes", ext: "jpg", fit: "cover" },
};

// grid = 4 عناصر فقط (واحد منها "?" للغموض). word = كلمة الموضوع البطل. headline ≤3 كلمات.
export const GsThumbV3 = ({
  mode = "snakes",
  folder,
  grid = ["king-cobra", "eyelash-viper", "?", "eastern-coral-snake"],
  headline = "NAME ALL 100?",
  word = "SNAKE?",
  badge = "1% WIN",
}) => {
  const A = ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };
  const TILE = 292, GAP = 12;
  // hero box is ~600px wide (left:648→right:20); size to fit with stroke margin
  const wordSize = Math.max(96, Math.min(190, Math.floor(540 / (word.length * 0.56))));
  return (
    <AbsoluteFill style={{ fontFamily: font, backgroundColor: G.blueDeep }}>
      <Bg />

      {/* هيدر رفيع (≤14% ارتفاع) — مطفّي، مو بانر ضخم */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 92, background: "rgba(6,10,32,0.62)", borderBottom: `4px solid ${G.gold}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 900, fontSize: 32, color: "#fff" }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", border: `4px solid ${G.gold}` }} />GUESS<span style={{ color: G.gold }}>SYNC</span>
        </div>
        <div style={{ fontWeight: 900, fontSize: 50, color: "#fff", WebkitTextStroke: "2px #000", paintOrder: "stroke fill", letterSpacing: 1 }}>{headline}</div>
      </div>

      {/* 2×2 صور كبيرة يسار — رول أوف ثيردز، كل مربع يُقرأ على الجوال */}
      <div style={{ position: "absolute", left: 44, top: 156, display: "grid", gridTemplateColumns: `repeat(2, ${TILE}px)`, gap: GAP }}>
        {grid.slice(0, 4).map((slug, i) => (
          slug === "?" ? (
            <div key={i} style={{ width: TILE, height: TILE, background: G.blueDeep, borderRadius: 26, display: "flex", alignItems: "center", justifyContent: "center", border: `6px solid ${G.gold}`, boxShadow: `0 0 34px rgba(255,197,61,0.5), 0 10px 26px rgba(0,0,0,0.55)` }}>
              <span style={{ fontWeight: 900, fontSize: 200, color: G.gold }}>?</span>
            </div>
          ) : (
            <div key={i} style={{ width: TILE, height: TILE, background: "#fff", borderRadius: 26, padding: A.fit === "contain" ? 20 : 8, boxShadow: "0 10px 26px rgba(0,0,0,0.55)" }}>
              <Img src={staticFile(`${A.dir}/${slug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit, borderRadius: 18 }} />
            </div>
          )
        ))}
      </div>

      {/* الكلمة البطل الضخمة يمين — بؤرة واحدة مهيمنة */}
      <div style={{ position: "absolute", left: 648, right: 20, top: 92, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{
          fontWeight: 900, fontSize: wordSize, lineHeight: 0.9, color: "#FF1E1E",
          WebkitTextStroke: "6px #4a0000", paintOrder: "stroke fill",
          textShadow: "0 10px 0 #7a0000, 0 20px 30px rgba(0,0,0,0.65)", transform: "rotate(-3deg)",
        }}>{word}</div>
      </div>

      {/* شارة صغيرة 1% — أسفل الكلمة البطل (منطقة فاضية، لا تصادم مع الشبكة) */}
      <div style={{ position: "absolute", bottom: 44, left: 690, transform: "rotate(-6deg)", background: G.blueDeep, color: G.gold, fontWeight: 900, fontSize: 46, padding: "10px 28px", borderRadius: 16, border: `5px solid ${G.gold}`, boxShadow: "0 10px 26px rgba(0,0,0,0.5)" }}>{badge}</div>

      {/* بومة زاوية صغيرة (مصدومة — عيون الساعة) */}
      <Img src={staticFile("brand/owl-cheer.png")} style={{ position: "absolute", right: 14, bottom: -4, width: 188, height: 188, objectFit: "contain", filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.6))" }} />
    </AbsoluteFill>
  );
};
