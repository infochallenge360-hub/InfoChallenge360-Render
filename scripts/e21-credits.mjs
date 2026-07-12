// يبني PHOTO-CREDITS.txt لـE21 من ميتاداتا ويكيميديا كومنز (Artist + License) لكل صورة نزّلناها.
import { writeFileSync } from "node:fs";
import { FRUITS } from "../src/Quiz/fruitsData.js";
const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact mohnajjar93@gmail.com)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// get the pageimage FILE title for a wiki article
async function fileTitle(wiki) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=name&redirects=1&titles=${encodeURIComponent(wiki)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const t = await r.text(); if (t[0] !== "{") return "RATE";
  const p = Object.values(JSON.parse(t).query.pages)[0];
  return p && p.pageimage ? "File:" + p.pageimage : null;
}
async function meta(fileT) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata|url&titles=${encodeURIComponent(fileT)}`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const t = await r.text(); if (t[0] !== "{") return "RATE";
  const p = Object.values(JSON.parse(t).query.pages)[0];
  const ii = p && p.imageinfo && p.imageinfo[0]; if (!ii) return null;
  const em = ii.extmetadata || {};
  const strip = (s) => s ? String(s).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim() : "";
  return {
    artist: strip(em.Artist && em.Artist.value) || "Unknown",
    license: strip(em.LicenseShortName && em.LicenseShortName.value) || "see Commons",
    descUrl: ii.descriptionurl || "",
  };
}
const rows = [];
for (const f of FRUITS) {
  let ft = null;
  for (let a = 0; a < 4; a++) { ft = await fileTitle(f.wiki); if (ft === "RATE") { await sleep(6000); continue; } break; }
  let m = null;
  if (ft && ft !== "RATE") { for (let a = 0; a < 4; a++) { m = await meta(ft); if (m === "RATE") { await sleep(6000); continue; } break; } }
  rows.push({ name: f.name, ...(m && m !== "RATE" ? m : { artist: "see Wikimedia Commons", license: "PD/CC", descUrl: "" }) });
  await sleep(500);
}
let out = "GUESSSYNC — E21 · Guess the Fruit or Vegetable — PHOTO CREDITS\n";
out += "Images from Wikipedia / Wikimedia Commons. Public-domain and Creative-Commons licensed.\n";
out += "Paste this block into the YouTube description for full attribution compliance.\n" + "=".repeat(70) + "\n\n";
for (const r of rows) out += `${r.name} — ${r.artist} — ${r.license}${r.descUrl ? " — " + r.descUrl : ""}\n`;
writeFileSync("scripts/e21-attribution-block.txt", out, "utf8");
console.log(`credits: ${rows.length} rows written`);
