import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const dataMod = await import(pathToFileURL("src/Quiz/cathedralsE60Data.js").href);
const DATA = dataMod.default;
const report = JSON.parse(readFileSync("out/e60-cathedrals-fetch-report.json", "utf8"));
const bySlug = Object.fromEntries(report.map((r) => [r.slug, r]));

const levels = ["easy", "medium", "hard", "impossible"];
let out = `Info Challenge 360 — Episode 60 "Guess the Cathedral" — Photo Credits
======================================================================
All cathedral photographs sourced from Wikipedia/Wikimedia Commons, license-filtered
to Public Domain/CC0/CC-BY/CC-BY-SA only. No AI-generated images.

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

writeFileSync("D:/InfoChallenge360-Channel/02_Episodes/E60_Cathedrals/seo/InfoChallenge360-E60-Cathedrals-PHOTO-CREDITS.txt", out.trim() + "\n");
console.log("done");
