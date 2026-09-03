// Generates scripts/assets/blankmap-world-v2.png — a genuinely linear
// equirectangular (Plate Carree) blank world map with country borders, used
// by scripts/gen-empiremaps96.mjs (and any future "highlight a region on a
// blank world map" episode).
//
// WHY THIS EXISTS (permanent lesson, 2026-09-03): the original approach for
// E96 downloaded a Wikimedia file named "BlankMap-World-Equirectangular" and
// assumed it was linear (x = lon*k, y = -lat*k), which is what "equirectangular"
// means. It was NOT — verified by projecting 12 real cities across the globe
// onto it: Lisbon/Rome/Cairo/Delhi/Bangkok (all within ~100 deg of the central
// meridian) landed correctly, but Beijing/Seoul/Tokyo/Sydney/Mexico
// City/Sao Paulo (all far from it) landed in open ocean, hundreds of km off —
// classic pseudocylindrical (Robinson-style) meridian curvature, not Plate
// Carree, despite the filename. This silently mispositioned roughly a third
// of E96's 70 empire polygons before it was caught by visual QA (Seoul/Tokyo
// appearing south of Japan in open ocean).
//
// FIX: render our own basemap with d3-geo's geoEquirectangular(), which is
// linear by mathematical definition, from the world-atlas 110m TopoJSON
// (public domain country boundaries). No more guessing a downloaded file's
// true projection — this one is provably correct, and re-running this script
// regenerates it identically.
//
// Before trusting ANY basemap for a future "highlight region on world map"
// episode (downloaded or generated), re-run the same 12-city check used here
// (see the episode's own QA notes / quiz-roadmap.md E96 entry) — never assume
// a filename's claimed projection is correct.
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { readFileSync } from "node:fs";
import sharp from "sharp";

// 50m (not 110m) resolution — needed so small Pacific island nations (Tonga,
// Samoa, Fiji) actually render as visible landmasses; 110m drops them
// entirely, which left the Tu'i Tonga Empire map with zero context land
// anywhere in frame (caught by GATE1 fact-verifier on E96).
const world = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const countries = feature(world, world.objects.countries);

// 7680px wide (4x a "1920" reference width) — needed so genuinely tiny
// countries/islands (Samoa, Tonga's neighbors, etc.) render as more than a
// single stray pixel once a 700x700 card crops in tight on a small empire.
// At 1920px, Samoa was exactly 1 pixel (invisible); at 7680px it's ~80+
// pixels (a small but real, perceptible landmass). Verified empirically —
// see the E96 GATE1 finding that drove this change.
const MAP_W = 7680;
// geoEquirectangular's default scale maps the full sphere (-180..180 lon,
// -90..90 lat) to a projected width of 2*PI*scale and height of PI*scale
// (exactly 2:1) — solve for the scale that gives us MAP_W, then the natural
// height follows exactly (no aspect-ratio guessing).
const scale = MAP_W / (2 * Math.PI);
const projection = geoEquirectangular().scale(scale).translate([MAP_W / 2, Math.round(Math.PI * scale) / 2]).precision(0.1);
const pathGen = geoPath(projection);

const MAP_H = Math.round(Math.PI * scale); // = 960 at MAP_W=1920; covers exactly lat -90..90

const svgParts = [`<svg width="${MAP_W}" height="${MAP_H}" xmlns="http://www.w3.org/2000/svg">`, `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#ffffff"/>`];
for (const f of countries.features) {
  const d = pathGen(f);
  if (d) svgParts.push(`<path d="${d}" fill="#b9b9b9" stroke="#ffffff" stroke-width="1"/>`);
}
svgParts.push("</svg>");

await sharp(Buffer.from(svgParts.join("\n"))).png().toFile("scripts/assets/blankmap-world-v2.png");
console.log(`wrote scripts/assets/blankmap-world-v2.png at ${MAP_W}x${MAP_H} (LON -180..180, LAT -90..90, genuinely linear)`);
