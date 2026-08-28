// Fetches road sign images from Wikimedia Commons -> public/roadsigns82/<slug>.png
// Road signs are pictograms/icons, not photos — search Commons (MUTCD/Vienna Convention/regional)
// rather than Wikipedia pageimages (which would return photos of driving scenes, not the sign itself).
// Usage: node scripts/fetch-roadsigns.mjs
import { writeFileSync, existsSync, mkdirSync, statSync, unlinkSync } from "node:fs";
import { pathToFileURL } from "node:url";

const DEST = "public/roadsigns82";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const mod = await import(pathToFileURL("src/Quiz/roadsignsE82Data.js").href);
const items = Object.values(mod).filter(Array.isArray)[0];

const QUERY = {
  stop: "MUTCD R1-1 stop sign svg",
  yield: "MUTCD R1-2 yield sign svg",
  "no-entry": "Singapore road sign Prohibitory No entry svg",
  "pedestrian-crossing": "Vienna Convention road sign pedestrian crossing svg",
  "speed-limit": "MUTCD speed limit sign svg",
  "one-way": "MUTCD one way sign svg",
  "no-parking": "MUTCD no parking sign svg",
  "railroad-crossing": "MUTCD railroad crossing crossbuck sign svg",
  "traffic-signal-ahead": "MUTCD signal ahead sign svg",
  "school-crossing": "MUTCD school crossing sign svg",
  "no-u-turn": "MUTCD no u-turn sign svg",
  hospital: "MUTCD hospital sign svg",
  roundabout: "Vienna Convention road sign roundabout svg",
  "no-overtaking": "Vienna Convention road sign no overtaking svg",
  "traffic-light": "traffic light icon svg",
  "handicap-parking": "international symbol of access parking sign svg",
  "gas-station": "MUTCD gas station sign svg",
  "dead-end": "MUTCD dead end sign svg",
  merge: "MUTCD merge sign svg",
  "slippery-road": "Vienna Convention road sign slippery road svg",
  "two-way-traffic": "MUTCD two way traffic sign svg",
  "wrong-way": "MUTCD wrong way sign svg",
  "no-trucks": "Vienna Convention road sign no trucks svg",
  "bike-lane": "MUTCD bike lane sign svg",
  "height-restriction": "Vienna Convention road sign height limit svg",
  "deer-crossing": "MUTCD deer crossing sign",
  "curve-ahead": "MUTCD curve warning sign svg",
  "divided-highway": "MUTCD divided highway sign svg",
  "no-bicycles": "Vienna Convention road sign no bicycles svg",
  "steep-hill": "Vienna Convention road sign steep ascent",
  "winding-road": "MUTCD winding road sign svg",
  "no-left-turn": "MUTCD no left turn sign svg",
  "keep-right": "MUTCD keep right sign svg",
  parking: "MUTCD parking sign svg",
  "construction-zone": "MUTCD road work ahead sign svg",
  "rest-area": "MUTCD rest area sign svg",
  "falling-rocks": "Vienna Convention road sign falling rocks svg",
  "minimum-speed": "MUTCD minimum speed sign svg",
  "weight-limit": "MUTCD weight limit sign",
  airport: "MUTCD airport sign",
  "toll-road": "MUTCD toll road sign svg",
  "icy-road": "Vienna Convention road sign ice svg",
  "cattle-crossing": "Vienna Convention road sign cattle svg",
  "no-horn": "sound horn prohibited road sign",
  "narrow-bridge": "road narrows sign svg",
  "camping-area": "MUTCD camping sign svg",
  "emergency-stopping-only": "hard shoulder emergency stopping sign",
  "no-stopping": "Vienna Convention road sign no stopping svg",
  "no-pedestrians": "no pedestrians road sign svg",
  "steep-descent": "Vienna Convention road sign steep descent svg",
  "road-narrows": "MUTCD road narrows sign svg",
  "give-way-to-oncoming-traffic": "give way to oncoming traffic road sign",
  "kangaroo-crossing": "Australian road sign kangaroo",
  "moose-crossing": "road sign moose crossing svg",
  "avalanche-zone": "Vienna Convention road sign D10a avalanche",
  "falling-ice": "falling ice road sign",
  ford: "UK road sign ford svg",
  "loose-gravel": "Vienna Convention road sign loose gravel svg",
  "low-flying-aircraft": "UK road sign low flying aircraft svg",
  "zebra-crossing": "zebra crossing pedestrian sign svg",
  "toad-crossing": "toad crossing road sign UK",
  "concealed-entrance": "concealed entrance road sign UK",
  "adverse-camber": "UK road sign adverse camber svg",
  "wombat-crossing": "Australian road sign wombat",
  "cyclone-shelter": "cyclone shelter road sign",
  quicksand: "quicksand warning sign svg",
  "unmarked-crossroads": "crossroads road sign svg",
  crosswind: "crosswind road sign svg",
  "camel-crossing": "camel crossing road sign",
  "beware-of-frogs": "frog crossing road sign svg",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isHtml = (buf) => buf.slice(0, 15).toString("utf8").trim().toLowerCase().startsWith("<!doctype") || buf.slice(0, 5).toString("utf8") === "<html";
const isSvgText = (buf) => { const s = buf.slice(0, 200).toString("utf8"); return s.includes("<svg") || s.includes("<?xml"); };

async function fetchJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "InfoChallenge360Bot/1.0 (educational quiz)" } });
      const text = await r.text();
      return JSON.parse(text);
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(8000 * (i + 1));
    }
  }
}

async function fetchBuf(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": "InfoChallenge360Bot/1.0 (educational quiz)" } });
    const buf = Buffer.from(await r.arrayBuffer());
    if (!isHtml(buf)) return buf;
    await sleep(15000 * (i + 1));
  }
  throw new Error("kept getting HTML (rate-limited)");
}

const results = { ok: [], missing: [] };

console.log("Cooling down 5min before first request (avoid resuming into an active rate-limit window)...");
await sleep(300000);

for (const it of items) {
  const out = `${DEST}/${it.slug}.png`;
  if (existsSync(out) && statSync(out).size > 1500) { results.ok.push(it.slug); continue; }
  const q = QUERY[it.slug] || it.name;
  const svgTmp = `${DEST}/_${it.slug}.svg`;
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime&iiurlwidth=900`;
    const j = await fetchJson(url);
    const pages = Object.values(j?.query?.pages || {});
    if (!pages.length) { results.missing.push(`${it.slug} (no Commons results for "${q}")`); await sleep(2500); continue; }
    const svgPage = pages.find((p) => p.imageinfo?.[0]?.mime === "image/svg+xml");
    const pngPage = pages.find((p) => p.imageinfo?.[0]?.mime === "image/png");
    const jpgPage = pages.find((p) => p.imageinfo?.[0]?.mime === "image/jpeg");
    const pick = svgPage || pngPage || jpgPage;
    if (!pick) { results.missing.push(`${it.slug} (no usable image mime for "${q}")`); await sleep(2500); continue; }
    const info = pick.imageinfo[0];
    const isSvg = info.mime === "image/svg+xml";
    const srcUrl = isSvg ? info.url : (info.thumburl || info.url);
    const buf = await fetchBuf(srcUrl);
    if (buf.length < 300) { results.missing.push(`${it.slug} (fetched file too small)`); await sleep(2500); continue; }
    if (isSvg) {
      if (!isSvgText(buf)) { results.missing.push(`${it.slug} (expected SVG, got non-SVG bytes)`); await sleep(2500); continue; }
      // شيل width/height (بوحدات فيزيائية زي inch) عشان ما يضخّم الراستر — خلي viewBox هو المرجع
      let svg = buf.toString("utf8");
      svg = svg.replace(/<svg([^>]*)\swidth="[^"]*"/i, "<svg$1").replace(/<svg([^>]*)\sheight="[^"]*"/i, "<svg$1");
      writeFileSync(svgTmp, svg, "utf8");
      const sharp = (await import("sharp")).default;
      try {
        await sharp(svgTmp, { density: 384 }).resize(700, 700, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out);
      } catch (rasterErr) {
        // SVG بوحدات فيزيائية كبيرة (inch) بتخلي density عالي يفجّر حجم الراستر المؤقت — جرب density واطي كـ fallback
        await sharp(svgTmp, { density: 96 }).resize(700, 700, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out);
      }
    } else {
      writeFileSync(out, buf);
    }
    results.ok.push(it.slug + (isSvg ? "" : " [raster/photo source]"));
  } catch (e) {
    results.missing.push(`${it.slug} (${e.message.slice(0, 70)})`);
  } finally {
    if (existsSync(svgTmp)) unlinkSync(svgTmp);
  }
  await sleep(9000);
}

console.log(`\nRoad signs: ${results.ok.length}/${items.length} fetched.`);
if (results.missing.length) console.log(`\nMISSING (need manual fallback):\n  ` + results.missing.join("\n  "));
