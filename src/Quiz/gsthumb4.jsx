// ثمبنيل GuessSync v4 "HYPE" — 1280×720 · نص ثلاثي الأبعاد لمّاع + انفجار ضوئي + مربعات متوهّجة
// شارات ONLY 1% / GET 100% + ARE YOU A GENIUS? + بومة · مجاني بالكامل (Remotion، بدون AI)
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["800", "900"] }).fontFamily;
const G = { blue: "#1E44B0", blueMid: "#0E1E5A", blueDeep: "#070f30", gold: "#FFC21E", red: "#FF2222", redDeep: "#8a0000" };

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

// انفجار أشعة ناعمة + بلوم ذهبي دافئ خلف الكلمة (طبقات)
const Burst = ({ cx = 66, cy = 48 }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {/* بلوم مركزي كبير دافئ ذهبي */}
    <AbsoluteFill style={{ background: `radial-gradient(46% 58% at ${cx}% ${cy}%, rgba(255,240,170,0.95), rgba(255,193,30,0.6) 38%, rgba(255,160,20,0.22) 64%, transparent 80%)` }} />
    {/* أشعة عريضة ذهبية */}
    <AbsoluteFill style={{ background: `repeating-conic-gradient(from 0deg at ${cx}% ${cy}%, rgba(255,206,60,0.7) 0deg 3deg, transparent 3deg 9deg)`, maskImage: `radial-gradient(circle at ${cx}% ${cy}%, transparent 5%, #000 30%, transparent 66%)`, WebkitMaskImage: `radial-gradient(circle at ${cx}% ${cy}%, transparent 5%, #000 30%, transparent 66%)`, opacity: 0.85 }} />
    {/* أشعة دقيقة صفراء لامعة */}
    <AbsoluteFill style={{ background: `repeating-conic-gradient(from 4deg at ${cx}% ${cy}%, rgba(255,236,120,0.5) 0deg 1deg, transparent 1deg 6.5deg)`, maskImage: `radial-gradient(circle at ${cx}% ${cy}%, transparent 8%, #000 34%, transparent 60%)`, WebkitMaskImage: `radial-gradient(circle at ${cx}% ${cy}%, transparent 8%, #000 34%, transparent 60%)`, opacity: 0.55 }} />
  </AbsoluteFill>
);

const Spark = ({ x, y, s = 26, r = 0 }) => (
  <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, fontSize: s, color: "#fff", transform: `rotate(${r}deg)`, textShadow: "0 0 10px rgba(255,255,255,0.9)", filter: "drop-shadow(0 0 6px #FFE9A0)" }}>✦</div>
);

// props: mode, grid[9] (slug/iso ; "?"=غموض), word (كلمة الموضوع), top("CAN YOU NAME ALL"), number, year, genius, pctTop, pctBot
export const GsThumbV4 = ({
  mode = "logos", folder,
  grid = ["apple", "nike", "?", "mcdonalds", "?", "cocacola", "?", "netflix", "spotify"],
  word = "LOGO?", wordImg, top = "CAN YOU NAME ALL", number = "100", year = "2026",
  genius = "ARE YOU A GENIUS?", pctTop = "ONLY 1%", pctBot = "GET 100%",
}) => {
  const A = ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };
  const TILE = 132, GAP = 12;
  const wordSize = Math.max(110, Math.min(184, Math.floor(540 / (word.length * 0.56))));
  // ظل ثلاثي الأبعاد متدرّج (extrude)
  const extrude = Array.from({ length: 12 }, (_, i) => `${i + 1}px ${i + 1}px 0 ${G.redDeep}`).join(", ") + ", 0 26px 34px rgba(0,0,0,0.7)";
  return (
    <AbsoluteFill style={{ fontFamily: font, backgroundColor: G.blueDeep }}>
      {/* خلفية AI فخمة (انفجار ذهبي حقيقي) — أصل ثابت لكل الحلقات */}
      <Img src={staticFile("brand/hype-bg.png")} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />

      {/* بانر علوي أحمر */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 84, background: `linear-gradient(180deg, #FF3A3A, ${G.red})`, borderBottom: `5px solid ${G.gold}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", boxShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 900, fontSize: 30, color: "#fff" }}>
          <span style={{ width: 15, height: 15, borderRadius: "50%", border: `4px solid ${G.gold}` }} />GUESS<span style={{ color: G.gold }}>SYNC</span>
        </div>
        <div style={{ fontWeight: 900, fontSize: 50, color: "#fff", WebkitTextStroke: "3px #6a0000", paintOrder: "stroke fill", letterSpacing: 1, textShadow: "0 3px 0 #6a0000" }}>{top} <span style={{ color: G.gold }}>{number}</span>?</div>
        <div style={{ background: G.gold, color: G.blueDeep, fontWeight: 900, fontSize: 26, padding: "5px 16px", borderRadius: 999, border: "3px solid #fff" }}>{year}</div>
      </div>

      {/* شبكة 3×3 — إطار المربّع من GPT (أصل ثابت) + الشعار داخله بالكود (دقيق) */}
      <div style={{ position: "absolute", left: 36, top: 112, display: "grid", gridTemplateColumns: `repeat(3, ${TILE}px)`, gap: GAP }}>
        {grid.slice(0, 9).map((slug, i) => (
          <div key={i} style={{ position: "relative", width: TILE, height: TILE }}>
            <Img src={staticFile("brand/tile-frame.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill" }} />
            {slug === "?" ? (
              <div style={{ position: "absolute", inset: "17%", borderRadius: 12, background: "radial-gradient(60% 60% at 50% 42%, #1b2c60, #0a1130)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 16px rgba(67,180,255,0.4)" }}>
                <span style={{ fontWeight: 900, fontSize: 78, color: G.gold, textShadow: `0 0 20px ${G.gold}` }}>?</span>
              </div>
            ) : (
              <div style={{ position: "absolute", inset: "18%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: A.fit === "cover" ? 10 : 0 }}>
                <Img src={staticFile(`${A.dir}/${slug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* شارة ONLY 1% (فوق) */}
      <div style={{ position: "absolute", top: 150, left: 700, transform: "rotate(-4deg)", background: `linear-gradient(180deg,#FFE477,${G.gold})`, color: G.blueDeep, fontWeight: 900, fontSize: 44, padding: "8px 30px", borderRadius: 14, border: "4px solid #fff", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }}>{pctTop}</div>

      {/* الكلمة البطل — صورة AI لامعة إذا توفّرت، وإلا نص كود */}
      {wordImg ? (
        <div style={{ position: "absolute", left: 576, right: 20, top: 196, height: 288, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(wordImg)} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.55))", transform: "rotate(-2deg)" }} />
        </div>
      ) : (
      <div style={{ position: "absolute", left: 588, right: 34, top: 210, height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", transform: "rotate(-3deg)" }}>
          {/* طبقة العمق: حدّ ذهبي + إكسترود أحمر غامق */}
          <div style={{ fontWeight: 900, fontSize: wordSize, lineHeight: 0.9, color: "#C40000", WebkitTextStroke: `12px ${G.gold}`, paintOrder: "stroke fill", textShadow: extrude }}>{word}</div>
          {/* طبقة الوجه اللامع: تدرّج فاتح→غامق (نفس المكان) — بلا حدّ عشان الذهبي الخلفي يبان */}
          <div style={{ position: "absolute", inset: 0, fontWeight: 900, fontSize: wordSize, lineHeight: 0.9, background: "linear-gradient(178deg,#FFD3D3 0%,#FF5B5B 34%,#FF1717 52%,#D20000 74%,#A00000 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{word}</div>
          {/* بريق علوي أبيض خفيف */}
          <div style={{ position: "absolute", inset: 0, fontWeight: 900, fontSize: wordSize, lineHeight: 0.9, background: "linear-gradient(180deg,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.12) 26%,transparent 40%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{word}</div>
        </div>
      </div>
      )}

      {/* شارة GET 100% (تحت) */}
      <div style={{ position: "absolute", top: 486, left: 726, transform: "rotate(-3deg)", background: G.blueDeep, color: "#fff", fontWeight: 900, fontSize: 46, padding: "10px 34px", borderRadius: 16, border: `4px solid ${G.gold}`, boxShadow: "0 10px 24px rgba(0,0,0,0.55)" }}>{pctBot.split(" ")[0]} <span style={{ color: G.gold }}>{pctBot.split(" ").slice(1).join(" ")}</span></div>

      {/* ARE YOU A GENIUS? + سهم */}
      <div style={{ position: "absolute", bottom: 40, left: 34, transform: "rotate(-4deg)", background: `linear-gradient(180deg,#FF4040,${G.red})`, color: "#fff", fontWeight: 900, fontSize: 44, padding: "10px 26px", borderRadius: 14, border: "4px solid #fff", boxShadow: "0 10px 24px rgba(0,0,0,0.55)" }}>
        {genius.replace(/GENIUS\??/i, "").trim()} <span style={{ color: G.gold }}>{(genius.match(/GENIUS\??/i) || [""])[0]}</span>
      </div>
      <div style={{ position: "absolute", bottom: 66, left: 470, fontSize: 70, color: "#fff", transform: "rotate(16deg)", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))" }}>➜</div>

      {/* برق + بريق */}
      <div style={{ position: "absolute", top: 96, right: 150, fontSize: 68, transform: "rotate(12deg)", filter: "drop-shadow(0 0 10px #FFE070)" }}>⚡</div>
      <Spark x={54} y={20} s={30} r={10} /><Spark x={95} y={30} s={22} /><Spark x={60} y={70} s={24} r={20} /><Spark x={88} y={62} s={18} />

      {/* البومة */}
      <Img src={staticFile("brand/owl-hype.png")} style={{ position: "absolute", right: 4, bottom: 6, width: 252, height: 182, objectFit: "contain", filter: "drop-shadow(0 12px 26px rgba(0,0,0,0.6))" }} />
    </AbsoluteFill>
  );
};
