import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const dataMod = await import(pathToFileURL("src/Quiz/stadiumsE55Data.js").href);
const DATA = dataMod.default || dataMod.STADIUMS_E55 || Object.values(dataMod)[0];
const report = JSON.parse(readFileSync("out/e55-stadiums-fetch-report-raw.json", "utf8"));
const bySlug = Object.fromEntries(report.map((r) => [r.slug, r]));

const levels = ["easy", "medium", "hard", "impossible"];
let out = `Info Challenge 360 — Episode 55 "Guess the Stadium" — Photo Credits
======================================================================
All stadium photographs sourced from Wikipedia/Wikimedia Commons, license-filtered
to Public Domain/CC0/CC-BY/CC-BY-SA only. Some images were cropped from the original
source photo to remove legible venue-name signage, wrong post-2025 sponsor branding,
or broadcast graphic overlays that would give away or contradict the answer — the
crop still depicts the correct, real stadium accurately. No AI-generated images.

`;

for (const lvl of levels) {
  const items = DATA.filter((d) => d.level === lvl);
  for (const it of items) {
    const r = bySlug[it.slug];
    let line;
    if (r && r.license && r.author) {
      line = r.license.toLowerCase().includes("public domain") || r.license.toUpperCase() === "CC0"
        ? `${r.license} — ${r.author}`
        : `(c) ${r.author}, some rights reserved (${r.license})`;
    } else {
      line = "license verification pending";
    }
    out += `${it.name} (${it.slug}): ${line}\n`;
  }
  out += "\n";
}

writeFileSync("D:/InfoChallenge360-Channel/02_Episodes/E55_Stadiums/seo/InfoChallenge360-E55-Stadiums-PHOTO-CREDITS.txt", out.trim() + "\n");
console.log("done");
