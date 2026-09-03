// ثمبنيل GuessSync v5 — إعادة تصميم الثمبنيلات 2026-09 (طلب المالك: "الطريقة الحالية ما
// عم تجيب مشاهدات، بدي اشي كرييتف كثير"). 5 قوالب جديدة تحل مكان مجموعة v2 القديمة
// (Grid/Hero/Split) لكل الحلقات من E96 وطالع. باليت أسود/أحمر/أصفر، خط Archivo Black
// بولد، موزاييك صور حقيقية متلاصقة، بدون بومة (أو صغيرة جداً) حسب ملاحظات المالك.
// props موحّدة عبر الخمسة: mode/folder (بحث الأصول، نفس خريطة gsthumb2)، grid (قائمة
// slugs)، topicPlural (مثلاً "SPORTS")، number (عدد العناصر، مثلاً "70").
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { ASSET } from "./gsthumb2";

const display = loadArchivoBlack("normal", { weights: ["400"] }).fontFamily;
const body = loadInter("normal", { weights: ["700", "800"] }).fontFamily;

const C = { bg: "#0c0c10", bg2: "#1a0a0a", red: "#ff2f2f", redDeep: "#b40000", gold: "#ffd400" };

const resolveAsset = (mode, folder) => ASSET[mode] || { dir: folder || mode, ext: "jpg", fit: "cover" };

const Tile = ({ slug, A, radius = "12%" }) => (
  <div style={{ background: "#fff", borderRadius: radius, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0.5cqw 0 rgba(0,0,0,0.35), 0 0.8cqw 1.4cqw rgba(0,0,0,0.35)", border: "0.24cqw solid #000", padding: "10%", overflow: "hidden" }}>
    <Img src={staticFile(`${A.dir}/${slug}.${A.ext}`)} style={{ width: "100%", height: "100%", objectFit: A.fit }} />
  </div>
);

const Logo = ({ side = "left" }) => (
  <div style={{ position: "absolute", [side]: "2.5%", bottom: "2.5%", fontFamily: body, fontWeight: 800, color: "rgba(255,255,255,0.55)", fontSize: "2.6cqw", letterSpacing: "0.03em" }}>INFO CHALLENGE 360</div>
);

// container-type:inline-size makes every cqw below resolve against the fixed
// 1280px composition width, so this JSX is a near-literal port of the
// approved HTML mockups (thumbmock2/thumbnail_directions.html).
const Frame = ({ children, bg }) => (
  <AbsoluteFill style={{ containerType: "inline-size", background: C.bg, overflow: "hidden" }}>
    {bg}
    {children}
  </AbsoluteFill>
);

// ============================================================
// V5-A "Mosaic" — tight 5x3 grid + bold ONLY 1% headline. The owner-approved
// direction, refined (tighter gaps, Archivo Black instead of Bebas Neue).
// grid: 15 slugs. mirror=true flips grid/text sides.
export const GsThumbMosaicV5 = ({
  mode = "sportequipment-e95-thumb", folder, grid = [], topicPlural = "SPORTS", number = "70", mirror = false,
}) => {
  const A = resolveAsset(mode, folder);
  const items = grid.slice(0, 15);
  const bg = (
    <AbsoluteFill style={{ background: `radial-gradient(60% 80% at ${mirror ? 22 : 78}% 50%, rgba(255,47,47,0.35) 0%, transparent 60%), linear-gradient(${mirror ? 245 : 115}deg, ${C.bg} 55%, ${C.bg2} 100%)` }}>
      <AbsoluteFill style={{ background: "repeating-linear-gradient(-15deg, rgba(255,212,0,0.05) 0 18px, transparent 18px 46px)" }} />
    </AbsoluteFill>
  );
  return (
    <Frame bg={bg}>
      <div style={{ position: "absolute", [mirror ? "right" : "left"]: "3%", top: "8%", width: "56%", height: "84%", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(3,1fr)", gap: "0.9%" }}>
        {items.map((slug, i) => <Tile key={i} slug={slug} A={A} />)}
      </div>
      <div style={{ position: "absolute", [mirror ? "left" : "right"]: "3.5%", top: 0, height: "100%", width: "38%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: mirror ? "flex-start" : "flex-end", textAlign: mirror ? "left" : "right", gap: "1.3%" }}>
        <div style={{ fontFamily: body, fontWeight: 800, color: "#fff", fontSize: "5.6cqw", letterSpacing: "0.02em", textShadow: "0 0.3cqw 0 #000" }}>{number} {topicPlural}</div>
        <div style={{ fontFamily: display, color: C.gold, fontSize: "10cqw", lineHeight: 0.88, letterSpacing: "-0.01em", WebkitTextStroke: "0.3cqw #000", paintOrder: "stroke fill", textShadow: `0 0.5cqw 0 ${C.redDeep}, 0 1cqw 1.2cqw rgba(0,0,0,0.5)` }}>ONLY<br />1%</div>
        <div style={{ fontFamily: display, color: "#fff", fontSize: "5.2cqw", lineHeight: 0.95, WebkitTextStroke: "0.2cqw #000", paintOrder: "stroke fill", textShadow: "0 0.4cqw 0.8cqw rgba(0,0,0,0.5)" }}>SCORE 100%</div>
        <div style={{ marginTop: "2%", background: C.red, color: "#fff", fontFamily: display, fontSize: "3.6cqw", letterSpacing: "0.01em", padding: "2% 5.5%", borderRadius: 999, border: "0.22cqw solid #000", boxShadow: "0 0.4cqw 0 rgba(0,0,0,0.4)" }}>CAN YOU?</div>
      </div>
      <Logo side={mirror ? "right" : "left"} />
    </Frame>
  );
};

// ============================================================
// V5-B "Mirror" — grid flipped right, diagonal red ribbon + "99% FAIL" ego-bait
// copy instead of scarcity framing. grid: 15 slugs.
export const GsThumbMirrorV5 = ({
  mode = "sportequipment-e95-thumb", folder, grid = [], topicPlural = "SPORTS", number = "70",
}) => {
  const A = resolveAsset(mode, folder);
  const items = grid.slice(0, 15);
  const bg = (
    <AbsoluteFill style={{ background: `radial-gradient(60% 80% at 22% 50%, rgba(255,47,47,0.35) 0%, transparent 60%), linear-gradient(245deg, ${C.bg} 55%, ${C.bg2} 100%)` }}>
      <AbsoluteFill style={{ background: "repeating-linear-gradient(-15deg, rgba(255,212,0,0.05) 0 18px, transparent 18px 46px)" }} />
    </AbsoluteFill>
  );
  return (
    <Frame bg={bg}>
      <div style={{ position: "absolute", right: "3%", top: "8%", width: "56%", height: "84%", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(3,1fr)", gap: "0.9%" }}>
        {items.map((slug, i) => <Tile key={i} slug={slug} A={A} />)}
      </div>
      <div style={{ position: "absolute", left: "-6%", top: "5%", width: "46%", background: C.red, color: "#fff", fontFamily: display, fontSize: "3.2cqw", textAlign: "center", padding: "1.8% 0", transform: "rotate(-8deg)", borderTop: "0.22cqw solid #000", borderBottom: "0.22cqw solid #000", boxShadow: "0 0.6cqw 1cqw rgba(0,0,0,0.4)", zIndex: 5 }}>CAN'T NAME ALL</div>
      <div style={{ position: "absolute", left: "3.5%", top: "26%", height: "70%", width: "38%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", textAlign: "left", gap: "1.5%" }}>
        <div style={{ fontFamily: body, fontWeight: 800, color: "#fff", fontSize: "3.8cqw", letterSpacing: "0.02em", textShadow: "0 0.3cqw 0 #000" }}>{number} {topicPlural}</div>
        <div style={{ fontFamily: display, color: C.gold, fontSize: "10.5cqw", lineHeight: 0.85, letterSpacing: "-0.01em", WebkitTextStroke: "0.3cqw #000", paintOrder: "stroke fill", textShadow: `0 0.5cqw 0 ${C.redDeep}, 0 1cqw 1.2cqw rgba(0,0,0,0.5)` }}>99%</div>
        <div style={{ fontFamily: display, color: "#fff", fontSize: "7cqw", lineHeight: 0.9, WebkitTextStroke: "0.24cqw #000", paintOrder: "stroke fill", textShadow: "0 0.4cqw 0.8cqw rgba(0,0,0,0.5)" }}>FAIL</div>
      </div>
      <Logo />
    </Frame>
  );
};

// ============================================================
// V5-C "FullBleed" — mosaic fills the entire frame (dimmed), diagonal red cut
// band with the hook line, yellow coin badge with the item count.
// grid: up to 24 slugs (repeats the pool if the episode's sample is shorter).
export const GsThumbFullBleedV5 = ({
  mode = "sportequipment-e95-thumb", folder, grid = [], number = "70",
}) => {
  const A = resolveAsset(mode, folder);
  let items = grid.length ? grid : ["?"];
  while (items.length < 24) items = items.concat(grid.length ? grid : items);
  items = items.slice(0, 24);
  return (
    <Frame>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(6,1fr)", gridTemplateRows: "repeat(4,1fr)", gap: "0.7%", padding: "2%", filter: "brightness(0.55)" }}>
        {items.map((slug, i) => <Tile key={i} slug={slug} A={A} />)}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: "38%", height: "24%", background: `linear-gradient(90deg, ${C.red} 0%, ${C.redDeep} 100%)`, transform: "skewY(-3deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0.8cqw 2cqw rgba(0,0,0,0.5)", borderTop: "0.3cqw solid #000", borderBottom: "0.3cqw solid #000" }}>
        <span style={{ fontFamily: display, color: "#fff", fontSize: "9.5cqw", letterSpacing: "-0.01em", transform: "skewY(3deg)", textShadow: "0 0.4cqw 0 #000" }}>NAME ALL {number}?</span>
      </div>
      <div style={{ position: "absolute", top: "4%", right: "4%", background: C.gold, color: "#000", fontFamily: display, fontSize: "6cqw", borderRadius: "50%", width: "22%", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", border: "0.35cqw solid #000", boxShadow: "0 0.6cqw 0 rgba(0,0,0,0.4)", textAlign: "center", lineHeight: 0.9 }}>{number}</div>
      <Logo />
    </Frame>
  );
};

// ============================================================
// V5-D "Coin" — grid masked into a gold medallion/emblem, red ribbon band,
// centered "1%" hook text. grid: 12 slugs.
export const GsThumbCoinV5 = ({
  mode = "sportequipment-e95-thumb", folder, grid = [], topicPlural = "SPORTS", number = "70",
}) => {
  const A = resolveAsset(mode, folder);
  const items = grid.slice(0, 12);
  const bg = (
    <AbsoluteFill style={{ background: `radial-gradient(70% 90% at 30% 50%, rgba(255,47,47,0.3) 0%, transparent 60%), linear-gradient(120deg, ${C.bg} 55%, ${C.bg2} 100%)` }} />
  );
  return (
    <Frame bg={bg}>
      <div style={{ position: "absolute", left: "2%", top: "9%", width: "52%", height: "82%", borderRadius: "50%", background: "linear-gradient(145deg,#ffe873,#ffd400 45%,#b8860b 100%)", padding: "2.6%", boxShadow: "0 1cqw 2.5cqw rgba(0,0,0,0.55)" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "0.3cqw solid #000", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "repeat(3,1fr)", gap: "0.9%", background: "#000" }}>
          {items.map((slug, i) => <Tile key={i} slug={slug} A={A} radius="0" />)}
        </div>
      </div>
      <div style={{ position: "absolute", left: "2%", top: "44%", width: "52%", textAlign: "center", background: C.red, color: "#fff", fontFamily: display, fontSize: "4cqw", padding: "2.6% 0", borderTop: "0.3cqw solid #000", borderBottom: "0.3cqw solid #000", boxShadow: "0 0.5cqw 1cqw rgba(0,0,0,0.4)", zIndex: 4 }}>{number} {topicPlural}</div>
      <div style={{ position: "absolute", right: "3%", top: 0, height: "100%", width: "42%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: "1.5%" }}>
        <div style={{ fontFamily: body, fontWeight: 800, color: "#fff", fontSize: "4cqw", letterSpacing: "0.02em", textShadow: "0 0.3cqw 0 #000", whiteSpace: "nowrap" }}>ARE YOU IN THE</div>
        <div style={{ fontFamily: display, color: C.gold, fontSize: "13cqw", lineHeight: 0.85, WebkitTextStroke: "0.3cqw #000", paintOrder: "stroke fill", textShadow: `0 0.6cqw 0 ${C.redDeep}, 0 1.2cqw 1.4cqw rgba(0,0,0,0.5)` }}>1%</div>
        <div style={{ fontFamily: display, color: "#fff", fontSize: "5cqw", lineHeight: 1.05, WebkitTextStroke: "0.2cqw #000", paintOrder: "stroke fill" }}>WHO SCORES 100%?</div>
      </div>
      <Logo />
    </Frame>
  );
};

// ============================================================
// V5-E "Strip" — thin image row up top fading to black, giant bold type owns
// the bottom half. Most legible at small/mobile size. grid: 10 slugs.
export const GsThumbStripV5 = ({
  mode = "sportequipment-e95-thumb", folder, grid = [], topicPlural = "SPORTS", number = "70",
}) => {
  const A = resolveAsset(mode, folder);
  const items = grid.slice(0, 10);
  const bg = <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)` }} />;
  return (
    <Frame bg={bg}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "42%", display: "grid", gridTemplateColumns: "repeat(10,1fr)", gap: "0.6%", padding: "1.4% 1.4% 0" }}>
        {items.map((slug, i) => <Tile key={i} slug={slug} A={A} radius="8%" />)}
      </div>
      <div style={{ position: "absolute", left: 0, top: "38%", width: "100%", height: "8%", background: "linear-gradient(180deg, rgba(12,12,16,0) 0%, rgba(12,12,16,1) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: "44%", bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.9%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, color: C.gold, fontSize: "3.8cqw", letterSpacing: "0.05em" }}>{number} {topicPlural}</div>
        <div style={{ fontFamily: display, color: "#fff", fontSize: "8.8cqw", lineHeight: 0.86, letterSpacing: "-0.01em", WebkitTextStroke: "0.26cqw #000", paintOrder: "stroke fill", textShadow: "0 0.5cqw 1cqw rgba(0,0,0,0.5)" }}>GUESS<br />ALL {number}?</div>
        <div style={{ background: C.red, color: "#fff", fontFamily: display, fontSize: "3.2cqw", padding: "1.4% 4.5%", borderRadius: 999, border: "0.2cqw solid #000", boxShadow: "0 0.4cqw 0 rgba(0,0,0,0.4)" }}>ONLY 1% CAN</div>
      </div>
      <Logo />
    </Frame>
  );
};
