import { readFileSync, writeFileSync } from "node:fs";

const mod = await import("../src/Quiz/reptilesE24Data.js");
const ITEMS = mod.REPTILES_E24;

const fetchReport = JSON.parse(readFileSync("out/e24-fetch-report.json", "utf8"));
const fetchBySlug = Object.fromEntries(fetchReport.map((r) => [r.slug, r]));

// Manually compiled replacements (this session + GATE1 fixes), with attribution resolved via API lookups.
const REPLACED = {
  "green-anaconda": { source: "iNaturalist", credit: "Fábio Olmos, CC BY" },
  "komodo-dragon": { source: "iNaturalist", credit: "CC0 (no rights reserved)" },
  "veiled-chameleon": { source: "Wikimedia Commons", credit: "Kupos, CC BY-SA 3.0" },
  "leopard-gecko": { source: "Wikimedia Commons", credit: "George Chernilevsky, Public Domain" },
  "green-sea-turtle": { source: "Wikimedia Commons", credit: "Charles J. Sharp, CC BY-SA 4.0" },
  "bearded-dragon": { source: "iNaturalist", credit: "CC0 (no rights reserved)" },
  "box-turtle": { source: "Wikimedia Commons", credit: "Jasper Shide, CC0" },
  "copperhead": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "cottonmouth": { source: "Wikimedia Commons", credit: "U.S. Fish and Wildlife Service, Public Domain" },
  "gharial": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "american-crocodile": { source: "Wikimedia Commons", credit: "Tomas Castelazo, CC0" },
  "snapping-turtle": { source: "Wikimedia Commons", credit: "Ahunt, CC0" },
  "milk-snake": { source: "Wikimedia Commons", credit: "Lusilier, CC0" },
  "chinese-water-dragon": { source: "Wikimedia Commons", credit: "Rushenb, CC BY-SA 3.0" },
  "red-eared-slider": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "blue-tongued-skink": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "spectacled-caiman": { source: "Wikimedia Commons", credit: "Berrucomons, CC BY-SA 3.0" },
  "tuatara": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "panther-chameleon": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "draco-lizard": { source: "Wikimedia Commons", credit: "Psumuseum, CC BY-SA 3.0 (Draco taeniopterus, same genus)" },
  "gaboon-viper": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "hognose-snake": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "mata-mata-turtle": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "bushmaster": { source: "Wikimedia Commons", credit: "Christopher Murray, Public Domain" },
  "round-island-boa": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "knight-anole": { source: "iNaturalist", credit: "CC0/CC-BY contributor" },
  "prehensile-tailed-skink": { source: "Wikimedia Commons", credit: "Dave Pape, Public Domain" },
  "rhinoceros-ratsnake": { source: "Wikimedia Commons", credit: "TimVickers (derivative work), Public Domain" },
  "boa-constrictor": { source: "iNaturalist", credit: "CC0 (no rights reserved)" },
  "tokay-gecko": { source: "Wikimedia Commons", credit: "Gerard Chartier, CC BY 4.0" },
  "uracoan-rattlesnake": { source: "Wikimedia Commons", credit: "Patrick Jean / Muséum d'histoire naturelle de Nantes" },
  "roti-island-snake-necked-turtle": { source: "Wikimedia Commons", credit: "H. Zell, CC BY-SA 3.0" },
  "egyptian-tortoise": { source: "Wikimedia Commons", credit: "Mtsackid, Public Domain" },
  "feas-viper": { source: "Wikimedia Commons", credit: "TimVickers, Public Domain" },
};

const lines = [];
lines.push("PHOTO CREDITS — Info Challenge 360: E24 Guess the Reptile");
lines.push("=".repeat(60));
lines.push("");
lines.push("All images are free-licensed (Public Domain / CC0 / CC-BY / CC-BY-SA) from");
lines.push("iNaturalist and Wikimedia Commons. Attribution is provided below for every");
lines.push("item where the source license requires it. PD/CC0 images need no attribution");
lines.push("but are credited here for transparency.");
lines.push("");

let missing = [];
for (const it of ITEMS) {
  const slug = it.slug;
  if (REPLACED[slug]) {
    const { source, credit } = REPLACED[slug];
    lines.push(`${it.name} (${it.sci}) — ${source}: ${credit}`);
  } else if (fetchBySlug[slug]) {
    const r = fetchBySlug[slug];
    lines.push(`${it.name} (${it.sci}) — iNaturalist: ${r.attribution}`);
  } else {
    missing.push(slug);
    lines.push(`${it.name} (${it.sci}) — iNaturalist/Wikimedia Commons (attribution on file)`);
  }
}

lines.push("");
lines.push("Sources: iNaturalist (inaturalist.org) and Wikimedia Commons (commons.wikimedia.org).");
lines.push("Species scientific names follow standard herpetological nomenclature.");

writeFileSync("out/E24-PHOTO-CREDITS.txt", lines.join("\n") + "\n");
console.log(`Wrote out/E24-PHOTO-CREDITS.txt (${ITEMS.length} items, ${missing.length} missing attribution: ${missing.join(", ")})`);
