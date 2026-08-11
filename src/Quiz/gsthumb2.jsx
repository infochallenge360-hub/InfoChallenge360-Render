// ثمبنيل GuessSync v2 — 1280×720 · شبكة 3×3 صور حقيقية + رقم ضخم + بومة حقيقية + سنة
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
const font = loadMont("normal", { weights: ["800", "900"] }).fontFamily;
const G = { blue: "#23429E", blueMid: "#122258", blueDeep: "#0A1436", gold: "#FFC53D", goldDeep: "#A8790A" };

const Bg = () => (
  <AbsoluteFill style={{ background: `radial-gradient(80% 92% at 30% 42%, ${G.blue} 0%, ${G.blueMid} 52%, ${G.blueDeep} 100%)` }}>
    <AbsoluteFill style={{ background: "repeating-conic-gradient(from 90deg at 30% 44%, rgba(255,197,61,0.09) 0deg 4deg, transparent 4deg 12deg)", maskImage: "radial-gradient(circle at 30% 44%, #000 8%, transparent 58%)", WebkitMaskImage: "radial-gradient(circle at 30% 44%, #000 8%, transparent 58%)" }} />
  </AbsoluteFill>
);

// props: mode (topic → asset path/ext/fit), grid (9 slugs/isos; "?" = mystery tile), line1, word, number, year, badge
const ASSET = {
  logos: { dir: "logos", ext: "svg", fit: "contain" },
  flags: { dir: "flags", ext: "svg", fit: "contain" },
  capitals: { dir: "flags", ext: "svg", fit: "contain" },
  countries: { dir: "flags", ext: "svg", fit: "contain" },
  shapes: { dir: "maps", ext: "svg", fit: "contain" },
  animals: { dir: "animals", ext: "png", fit: "cover" },
  foods: { dir: "foods", ext: "png", fit: "cover" },
  dogs: { dir: "dogs", ext: "png", fit: "cover" },
  cars: { dir: "cars", ext: "png", fit: "cover" },
  landmarks: { dir: "landmarks", ext: "png", fit: "cover" },
  birds: { dir: "birds", ext: "jpg", fit: "cover" },
  sea: { dir: "sea", ext: "jpg", fit: "cover" },
  paintings: { dir: "paintings", ext: "jpg", fit: "contain" },
  fruits: { dir: "fruits", ext: "jpg", fit: "cover" },
  flowers: { dir: "flowers", ext: "jpg", fit: "cover" },
  butterflies: { dir: "butterflies", ext: "jpg", fit: "cover" },
  snakes: { dir: "snakes", ext: "jpg", fit: "cover" },
  "silhouettes-e05-thumb": { dir: "silhouettes", ext: "svg", fit: "contain" },
  "maps-e06-thumb": { dir: "maps", ext: "svg", fit: "contain" },
  "carlogos-e07-thumb": { dir: "carlogos", ext: "svg", fit: "contain" },
  "countryfood-e08-thumb": { dir: "countryfood", ext: "jpg", fit: "cover" },
  "landmarks-e09-thumb": { dir: "landmarks", ext: "jpg", fit: "cover" },
  "capitals-e10-thumb": { dir: "capitals", ext: "jpg", fit: "cover" },
  "gamechars-e11-thumb": { dir: "gamechars", ext: "jpg", fit: "cover" },
  "moviechars-e12-thumb": { dir: "moviechars", ext: "jpg", fit: "contain" },
  "touristspots-e13-thumb": { dir: "touristspots", ext: "jpg", fit: "cover" },
  "mountains-e14-thumb": { dir: "mountains", ext: "jpg", fit: "cover" },
  "islands-e15-thumb": { dir: "islands", ext: "jpg", fit: "cover" },
  "volcanoes-e16-thumb": { dir: "volcanoes", ext: "jpg", fit: "cover" },
  "deserts-e17-thumb": { dir: "deserts", ext: "jpg", fit: "cover" },
  "waterfalls-e18-thumb": { dir: "waterfalls", ext: "jpg", fit: "cover" },
  "lakes-e19-thumb": { dir: "lakes", ext: "jpg", fit: "cover" },
  "rivers-e20-thumb": { dir: "rivers", ext: "jpg", fit: "cover" },
  "skylines-e21-thumb": { dir: "skylines", ext: "jpg", fit: "cover" },
  "birds-e22-thumb": { dir: "birds", ext: "jpg", fit: "cover" },
  "dogs-e23-thumb": { dir: "dogs", ext: "jpg", fit: "cover" },
  "reptiles-e24-thumb": { dir: "reptiles", ext: "jpg", fit: "cover" },
  "clubs-e25-thumb": { dir: "clubs", ext: "png", fit: "contain" },
  "airlines-e26-thumb": { dir: "airlines", ext: "png", fit: "contain" },
  "fastfood-e27-thumb": { dir: "fastfood", ext: "png", fit: "contain" },
  "studios-e28-thumb": { dir: "studios", ext: "png", fit: "contain" },
  "fashion-e29-thumb": { dir: "fashion", ext: "png", fit: "contain" },
  "consoles-e30-thumb": { dir: "consoles", ext: "png", fit: "contain" },
  "castles-e32-thumb": { dir: "castles", ext: "jpg", fit: "cover" },
  "costumes-e33-thumb": { dir: "costumes", ext: "jpg", fit: "cover" },
  "currencies-e34-thumb": { dir: "currencies", ext: "jpg", fit: "cover" },
  "ruins-e35-thumb": { dir: "ruins", ext: "jpg", fit: "cover" },
  "emoji-e36-thumb": { dir: "emoji", ext: "png", fit: "contain" },
  "instruments-e37-thumb": { dir: "instruments", ext: "jpg", fit: "cover" },
  "mascots-e38-thumb": { dir: "mascots", ext: "jpg", fit: "cover" },
  "zodiac-e39-thumb": { dir: "zodiac", ext: "jpg", fit: "contain" },
  "space-e40-thumb": { dir: "space", ext: "jpg", fit: "cover" },
  "appicons-e41-thumb": { dir: "app-icons", ext: "png", fit: "contain" },
  "flags-e42-thumb": { dir: "us-flags", ext: "png", fit: "contain" },
  "fruits-e43-thumb": { dir: "fruits", ext: "jpg", fit: "cover" },
  "butterflies-e45-thumb": { dir: "butterflies", ext: "jpg", fit: "cover" },
  "sea-creatures-e46-thumb": { dir: "sea-creatures", ext: "jpg", fit: "cover" },
  "bridges-e47-thumb": { dir: "bridges", ext: "jpg", fit: "cover" },
  "toygames-e48-thumb": { dir: "toy-game-logos", ext: "png", fit: "contain" },
  "paintings-e49-thumb": { dir: "paintings", ext: "jpg", fit: "contain" },
  "gemstones-e50-thumb": { dir: "gemstones", ext: "jpg", fit: "contain" },
  "statues-e51-thumb": { dir: "statues", ext: "jpg", fit: "contain" },
  "elements-e52-thumb": { dir: "elements", ext: "jpg", fit: "contain" },
  "classic-cars-e53-thumb": { dir: "classic-cars", ext: "jpg", fit: "cover" },
  "trophies-e54-thumb": { dir: "trophies", ext: "jpg", fit: "contain" },
  "stadiums-e55-thumb": { dir: "stadiums", ext: "jpg", fit: "cover" },
  "catbreeds-e56-thumb": { dir: "catbreeds", ext: "jpg", fit: "cover" },
  "nationalparks-e57-thumb": { dir: "nationalparks", ext: "jpg", fit: "cover" },
  "skyscrapers-e58-thumb": { dir: "skyscrapers", ext: "jpg", fit: "cover" },
  "palaces-e59-thumb": { dir: "palaces", ext: "jpg", fit: "cover" },
  "cathedrals-e60-thumb": { dir: "cathedrals", ext: "jpg", fit: "cover" },
  "mosques-e61-thumb": { dir: "mosques", ext: "jpg", fit: "cover" },
  "lighthouses-e62-thumb": { dir: "lighthouses", ext: "jpg", fit: "cover" },
  "capitals-e63-thumb": { dir: "maps", ext: "svg", fit: "contain" },
  "capitals-e64-thumb": { dir: "maps", ext: "svg", fit: "contain" },
  "phones-e65-thumb": { dir: "phones", ext: "jpg", fit: "cover" },
  "apple-e66-thumb": { dir: "apple", ext: "jpg", fit: "cover" },
  "phonelogos-e67-thumb": { dir: "logos67", ext: "png", fit: "contain" },
  "nokia-e68-thumb": { dir: "nokia68", ext: "jpg", fit: "cover" },
  "supercars-e69-thumb": { dir: "supercars69", ext: "jpg", fit: "cover" },
  "evcars-e70-thumb": { dir: "evcars70", ext: "jpg", fit: "cover" },
  "pickups-e71-thumb": { dir: "pickups71", ext: "jpg", fit: "cover" },
  "suvs-e72-thumb": { dir: "suvs72", ext: "jpg", fit: "cover" },
};
export const GsThumbV2 = ({
  mode = "fruits",
  folder,
  grid = ["strawberry", "corn", "carrot", "broccoli", "?", "tomato", "dragon-fruit", "cherry", "banana", "grape", "kiwi", "lemon", "?", "pear", "pineapple"],
  line1 = "CAN YOU NAME ALL",
  word = "FRUIT OR VEG?",
  number = "100",
  badge = "Only 1% get 100%",
}) => {
  const TILE = 142, GAP = 10, COLS = 5;
  const A = ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };
  return (
    <AbsoluteFill style={{ fontFamily: font, backgroundColor: G.blueDeep }}>
      <Bg />

      {/* بانر علوي أحمر عريض — نص كبير في المنتصف فقط، بدون شعار القناة وبدون السنة */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "#FF2A2A", borderBottom: `6px solid ${G.gold}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.35)" }}>
        <div style={{ fontWeight: 900, fontSize: 68, color: "#fff", WebkitTextStroke: "3px #7a0000", paintOrder: "stroke fill", letterSpacing: 1, textAlign: "center" }}>{line1} <span style={{ color: G.gold }}>{number}</span>?</div>
      </div>

      {/* الكلمة الكبيرة — شريط أفقي تحت البانر مباشرة */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, height: 158, display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 24px" }}>
        {word.split(" ").map((tok, i) => {
          const conn = /^(or|and|&)$/i.test(tok);
          const tokens = word.split(" ");
          const base = Math.min(150, Math.floor(620 / (tok.length * 0.62)));
          const fitCap = tokens.length > 1 ? Math.floor(1050 / (word.length * 0.62)) : 150;
          return (
            <div key={i} style={{
              fontWeight: 900,
              fontSize: conn ? 80 : Math.min(base, fitCap),
              lineHeight: 1,
              color: conn ? G.gold : "#FF1E1E",
              WebkitTextStroke: conn ? "4px #FF8080" : "6px #4a0000",
              paintOrder: "stroke fill",
              textShadow: conn ? "0 6px 14px rgba(0,0,0,0.5)" : "0 9px 0 #7a0000, 0 18px 28px rgba(0,0,0,0.6)",
            }}>{tok}</div>
          );
        })}
      </div>

      {/* الشبكة 5×3 = 15 صورة */}
      <div style={{ position: "absolute", left: 34, top: 264, display: "grid", gridTemplateColumns: `repeat(${COLS}, ${TILE}px)`, gap: GAP }}>
        {grid.map((slug, i) => (
          slug === "?" ? (
            <div key={i} style={{ width: TILE, height: TILE, background: G.blueDeep, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", border: `4px solid ${G.gold}`, boxShadow: "0 8px 22px rgba(0,0,0,0.5)" }}>
              <span style={{ fontWeight: 900, fontSize: 90, color: G.gold }}>?</span>
            </div>
          ) : (
            <div key={i} style={{ width: TILE, height: TILE, background: "#fff", borderRadius: 18, padding: A.fit === "contain" ? 12 : 6, boxShadow: "0 8px 22px rgba(0,0,0,0.5)" }}>
              <Img src={staticFile(`${A.dir}/${slug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit, borderRadius: 12 }} />
            </div>
          )
        ))}
      </div>

      {/* شارة 1% — بالفراغ يمين الشبكة، فوق البومة، بدون تراكب */}
      <div style={{ position: "absolute", top: 300, left: 792, width: 216, transform: "rotate(-7deg)", background: G.blueDeep, color: G.gold, fontWeight: 900, fontSize: 30, textAlign: "center", lineHeight: 1.15, padding: "16px 14px", borderRadius: 16, border: `5px solid ${G.gold}`, boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>{badge}</div>

      {/* البومة الحقيقية */}
      <Img src={staticFile("brand/owl-cheer.png")} style={{ position: "absolute", right: 6, bottom: -6, width: 238, height: 238, objectFit: "contain", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.55))" }} />
    </AbsoluteFill>
  );
};

// ============================================================
// VARIANT B — "Hero + Reaction": one huge hero image + mascot reacting to a
// mystery "?" insert. No channel name/year anywhere (A/B-test alt design).
// props: mode/folder (asset lookup, shared with GsThumbV2), heroSlug (the big
// image), line1, word, number, badge.
export const GsThumbHeroV2 = ({
  mode = "fruits",
  folder,
  heroSlug = "strawberry",
  line1 = "GUESS THE",
  word = "FRUIT OR VEG?",
  number = "100",
  badge = "Only 1% get 100%",
}) => {
  const A = ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };
  return (
    <AbsoluteFill style={{ fontFamily: font, backgroundColor: G.blueDeep }}>
      <Bg />

      {/* صورة البطل الضخمة — يسار الإطار */}
      <div style={{ position: "absolute", left: -40, top: 70, width: 620, height: 620, background: "#fff", borderRadius: 40, padding: A.fit === "contain" ? 34 : 10, boxShadow: "0 20px 50px rgba(0,0,0,0.55)", border: `6px solid ${G.gold}`, transform: "rotate(-3deg)" }}>
        <Img src={staticFile(`${A.dir}/${heroSlug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit, borderRadius: 26 }} />
      </div>

      {/* مربع "؟" الصغير — زاوية الصورة العلوية اليسار، بعيد عن البومة والنص */}
      <div style={{ position: "absolute", left: 10, top: 26, width: 120, height: 120, background: G.blueDeep, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", border: `5px solid ${G.gold}`, boxShadow: "0 10px 26px rgba(0,0,0,0.55)", transform: "rotate(-9deg)", zIndex: 3 }}>
        <span style={{ fontWeight: 900, fontSize: 64, color: G.gold }}>?</span>
      </div>

      {/* النص الكبير — يمين الإطار */}
      <div style={{ position: "absolute", right: 40, top: 56, width: 700, textAlign: "right" }}>
        <div style={{ fontWeight: 900, fontSize: 56, color: "#fff", WebkitTextStroke: "3px #7a0000", paintOrder: "stroke fill", letterSpacing: 1 }}>{line1}</div>
        {word.split(" ").map((tok, i) => {
          const conn = /^(or|and|&)$/i.test(tok);
          return (
            <div key={i} style={{
              fontWeight: 900,
              fontSize: conn ? 54 : Math.min(108, Math.floor(560 / (tok.length * 0.62))),
              lineHeight: 1.02,
              color: conn ? G.gold : "#FF1E1E",
              WebkitTextStroke: conn ? "3px #FF8080" : "5px #4a0000",
              paintOrder: "stroke fill",
              textShadow: conn ? "0 5px 12px rgba(0,0,0,0.5)" : "0 7px 0 #7a0000, 0 14px 24px rgba(0,0,0,0.6)",
            }}>{tok}</div>
          );
        })}
      </div>

      {/* رقم ضخم — دائرة انفجار */}
      <div style={{ position: "absolute", right: 66, top: 300, width: 190, height: 190, borderRadius: "50%", background: `radial-gradient(circle at 35% 32%, ${G.gold} 0%, ${G.goldDeep} 70%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 34px rgba(0,0,0,0.55)", border: "5px solid #fff", transform: "rotate(-8deg)" }}>
        <span style={{ fontWeight: 900, fontSize: 92, color: G.blueDeep }}>{number}</span>
      </div>

      {/* شارة 1% */}
      <div style={{ position: "absolute", right: 60, top: 500, width: 220, transform: "rotate(5deg)", background: G.blueDeep, color: G.gold, fontWeight: 900, fontSize: 28, textAlign: "center", lineHeight: 1.15, padding: "14px 12px", borderRadius: 16, border: `5px solid ${G.gold}`, boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>{badge}</div>

      {/* البومة عم تشاور بصدمة ناحية مربع "؟" */}
      <Img src={staticFile("brand/owl-think.png")} style={{ position: "absolute", left: 300, bottom: -14, width: 210, height: 210, objectFit: "contain", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.55))" }} />
    </AbsoluteFill>
  );
};

// ============================================================
// VARIANT C — "Easy vs Impossible" split-screen contrast. No channel name/year.
// props: mode/folder, easySlug (bright/clear item), hardSlug (darkened/mystery
// item), word, number, badge.
export const GsThumbSplitV2 = ({
  mode = "fruits",
  folder,
  easySlug = "strawberry",
  hardSlug = "kiwi",
  word = "FRUIT OR VEG?",
  number = "100",
  badge = "Only 1% get 100%",
}) => {
  const A = ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };
  return (
    <AbsoluteFill style={{ fontFamily: font, backgroundColor: G.blueDeep }}>
      {/* نص الخلفية المائل — نصين متباينين */}
      <AbsoluteFill style={{ background: `linear-gradient(115deg, ${G.blue} 0%, ${G.blue} 46%, #050912 54%, #050912 100%)` }} />

      {/* بطاقة السهل — يسار */}
      <div style={{ position: "absolute", left: 40, top: 150, width: 380, height: 380, background: "#fff", borderRadius: 30, padding: 8, boxShadow: "0 16px 40px rgba(0,0,0,0.5)", border: "6px solid #35D07F" }}>
        <Img src={staticFile(`${A.dir}/${easySlug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit, borderRadius: 20 }} />
      </div>
      <div style={{ position: "absolute", left: 40, top: 542, width: 380, textAlign: "center", background: "#35D07F", color: "#08210F", fontWeight: 900, fontSize: 34, padding: "10px 0", borderRadius: 14, letterSpacing: 1 }}>EASY</div>

      {/* بطاقة المستحيل — يمين، معتّمة مع "؟" */}
      <div style={{ position: "absolute", right: 40, top: 150, width: 380, height: 380, background: "#111", borderRadius: 30, padding: 8, boxShadow: "0 16px 40px rgba(0,0,0,0.6)", border: `6px solid ${G.gold}` }}>
        <Img src={staticFile(`${A.dir}/${hardSlug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit, borderRadius: 20, filter: "brightness(0.28) saturate(0.6) blur(6px)" }} />
        {/* Solid opaque scrim — the filter alone leaves high-contrast logo wordmarks legible; this guarantees no answer leak. */}
        <div style={{ position: "absolute", left: 8, top: 8, width: 364, height: 364, borderRadius: 20, background: "rgba(5,5,8,0.86)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 380, height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontWeight: 900, fontSize: 130, color: G.gold, textShadow: "0 8px 20px rgba(0,0,0,0.7)" }}>?</span>
        </div>
      </div>
      <div style={{ position: "absolute", right: 40, top: 542, width: 380, textAlign: "center", background: G.gold, color: "#3a2400", fontWeight: 900, fontSize: 34, padding: "10px 0", borderRadius: 14, letterSpacing: 1 }}>IMPOSSIBLE</div>

      {/* شارة VS بالنص */}
      <div style={{ position: "absolute", left: "50%", top: 300, width: 118, height: 118, marginLeft: -59, borderRadius: "50%", background: "#FF2A2A", border: "5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 28px rgba(0,0,0,0.5)", transform: "rotate(-6deg)", zIndex: 5 }}>
        <span style={{ fontWeight: 900, fontSize: 44, color: "#fff" }}>VS</span>
      </div>

      {/* العنوان الكبير أعلى الإطار */}
      <div style={{ position: "absolute", top: 24, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontWeight: 900, fontSize: 58, color: "#fff", WebkitTextStroke: "3px #7a0000", paintOrder: "stroke fill", letterSpacing: 1 }}>CAN YOU NAME ALL <span style={{ color: G.gold }}>{number}</span>?</div>
      </div>

      {/* الكلمة الكبيرة أسفل الإطار */}
      <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
        {word.split(" ").map((tok, i) => {
          const conn = /^(or|and|&)$/i.test(tok);
          return (
            <div key={i} style={{
              fontWeight: 900,
              fontSize: conn ? 46 : Math.min(80, Math.floor(400 / (tok.length * 0.62))),
              lineHeight: 1,
              color: conn ? G.gold : "#FF1E1E",
              WebkitTextStroke: conn ? "3px #FF8080" : "5px #4a0000",
              paintOrder: "stroke fill",
              textShadow: conn ? "0 5px 12px rgba(0,0,0,0.5)" : "0 6px 0 #7a0000, 0 12px 20px rgba(0,0,0,0.6)",
            }}>{tok}</div>
          );
        })}
      </div>

      {/* شارة 1% */}
      <div style={{ position: "absolute", left: "50%", top: 440, width: 190, marginLeft: -95, transform: "rotate(-4deg)", background: G.blueDeep, color: G.gold, fontWeight: 900, fontSize: 26, textAlign: "center", lineHeight: 1.15, padding: "12px 10px", borderRadius: 14, border: `4px solid ${G.gold}`, boxShadow: "0 10px 26px rgba(0,0,0,0.5)", zIndex: 5 }}>{badge}</div>
    </AbsoluteFill>
  );
};

// ============================================================
// VARIANT D — "Big Number Bullseye": diagonal cascade of 4 photos + a giant
// number badge as the dominant focal point. No channel name/year (4th A/B
// design, visually distinct from Grid/Hero/Split).
// props: mode/folder, cascade[4] (slugs, top-left to bottom-right), line1, word, number, badge.
export const GsThumbNumberV2 = ({
  mode = "fruits",
  folder,
  cascade = ["strawberry", "corn", "carrot", "?"],
  line1 = "CAN YOU NAME ALL",
  word = "FRUIT OR VEG?",
  number = "100",
  badge = "Only 1% get 100%",
}) => {
  const A = ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };
  const POS = [
    { left: 20, top: 190, rot: -6 },
    { left: 170, top: 300, rot: 4 },
    { left: 320, top: 410, rot: -4 },
    { left: 470, top: 500, rot: 5 },
  ];
  const SIZE = 190;
  return (
    <AbsoluteFill style={{ fontFamily: font, backgroundColor: G.blueDeep }}>
      <Bg />

      {/* العنوان أعلى الإطار */}
      <div style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontWeight: 900, fontSize: 54, color: "#fff", WebkitTextStroke: "3px #7a0000", paintOrder: "stroke fill", letterSpacing: 1 }}>{line1}</div>
      </div>

      {/* الكلمة الكبيرة — أعلى الإطار مباشرة تحت السطر الأول */}
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
        {word.split(" ").map((tok, i) => {
          const conn = /^(or|and|&)$/i.test(tok);
          return (
            <div key={i} style={{
              fontWeight: 900,
              fontSize: conn ? 50 : Math.min(90, Math.floor(440 / (tok.length * 0.62))),
              lineHeight: 1,
              color: conn ? G.gold : "#FF1E1E",
              WebkitTextStroke: conn ? "3px #FF8080" : "5px #4a0000",
              paintOrder: "stroke fill",
              textShadow: conn ? "0 5px 12px rgba(0,0,0,0.5)" : "0 7px 0 #7a0000, 0 14px 24px rgba(0,0,0,0.6)",
            }}>{tok}</div>
          );
        })}
      </div>

      {/* تتالي قطري من 4 صور — يسار/وسط الإطار، تحت النص */}
      {cascade.slice(0, 4).map((slug, i) => {
        const p = POS[i];
        return slug === "?" ? (
          <div key={i} style={{ position: "absolute", left: p.left, top: p.top, width: SIZE, height: SIZE, background: G.blueDeep, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", border: `5px solid ${G.gold}`, boxShadow: "0 16px 36px rgba(0,0,0,0.55)", transform: `rotate(${p.rot}deg)`, zIndex: 2 + i }}>
            <span style={{ fontWeight: 900, fontSize: 90, color: G.gold }}>?</span>
          </div>
        ) : (
          <div key={i} style={{ position: "absolute", left: p.left, top: p.top, width: SIZE, height: SIZE, background: "#fff", borderRadius: 24, padding: A.fit === "contain" ? 14 : 8, boxShadow: "0 16px 36px rgba(0,0,0,0.55)", transform: `rotate(${p.rot}deg)`, zIndex: 2 + i }}>
            <Img src={staticFile(`${A.dir}/${slug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit, borderRadius: 16 }} />
          </div>
        );
      })}

      {/* الرقم الضخم — دائرة انفجار مهيمنة، يمين الإطار */}
      <div style={{ position: "absolute", right: 50, top: 220, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle at 35% 32%, ${G.gold} 0%, ${G.goldDeep} 70%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 48px rgba(0,0,0,0.6)", border: "7px solid #fff", transform: "rotate(-6deg)", zIndex: 10 }}>
        <span style={{ fontWeight: 900, fontSize: 150, color: G.blueDeep }}>{number}</span>
      </div>

      {/* شارة 1% */}
      <div style={{ position: "absolute", right: 68, top: 540, width: 220, transform: "rotate(5deg)", background: G.blueDeep, color: G.gold, fontWeight: 900, fontSize: 26, textAlign: "center", lineHeight: 1.15, padding: "12px 12px", borderRadius: 16, border: `5px solid ${G.gold}`, boxShadow: "0 12px 30px rgba(0,0,0,0.5)", zIndex: 10 }}>{badge}</div>

      {/* البومة الحقيقية — الزاوية السفلية اليسار، تحت أول صورة بالتتالي */}
      <Img src={staticFile("brand/owl-cheer.png")} style={{ position: "absolute", left: 6, bottom: -6, width: 170, height: 170, objectFit: "contain", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.55))", zIndex: 20 }} />
    </AbsoluteFill>
  );
};
