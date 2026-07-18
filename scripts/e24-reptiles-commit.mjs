import { copyFileSync, existsSync, rmSync } from "node:fs";

const DEST = "public/reptiles";
const SRC = "public/reptiles/_candidates";

const REPLACEMENTS = {
  "green-anaconda": "green-anaconda-inat5.jpg",
  "komodo-dragon": "komodo-dragon-inat4.jpg",
  "veiled-chameleon": "veiled-chameleon-wiki1.jpg",
  "leopard-gecko": "leopard-gecko-1.jpg",
  "green-sea-turtle": "green-sea-turtle-wiki1.jpg",
  "bearded-dragon": "bearded-dragon-inat4.jpg",
  "box-turtle": "box-turtle-2-1.jpg",
  "copperhead": "copperhead-inat1.jpg",
  "cottonmouth": "cottonmouth-2-1.jpg",
  "gharial": "gharial-inat1.jpg",
  "american-crocodile": "american-crocodile-2-1.jpg",
  "snapping-turtle": "snapping-turtle-2-1.jpg",
  "milk-snake": "milk-snake-2-2.jpg",
  "chinese-water-dragon": "chinese-water-dragon-wiki1.jpg",
  "red-eared-slider": "red-eared-slider-inat5.jpg",
  "blue-tongued-skink": "blue-tongued-skink-inat5.jpg",
  "spectacled-caiman": "spectacled-caiman-wiki1.jpg",
  "tuatara": "tuatara-inat2.jpg",
  "panther-chameleon": "panther-chameleon-inat4.jpg",
  "draco-lizard": "draco-lizard-wiki1.jpg",
  "gaboon-viper": "gaboon-viper-inat2.jpg",
  "hognose-snake": "hognose-snake-inat3.jpg",
  "mata-mata-turtle": "mata-mata-turtle-inat1.jpg",
  "bushmaster": "bushmaster-2-1.jpg",
  "round-island-boa": "round-island-boa-inat3.jpg",
  "knight-anole": "knight-anole-inat1.jpg",
  "prehensile-tailed-skink": "prehensile-tailed-skink-2-1.jpg",
  "rhinoceros-ratsnake": "rhinoceros-ratsnake-wiki1.jpg",
};

let ok = 0, missing = [];
for (const [slug, file] of Object.entries(REPLACEMENTS)) {
  const src = `${SRC}/${file}`;
  const dest = `${DEST}/${slug}.jpg`;
  if (!existsSync(src)) { missing.push(slug); continue; }
  copyFileSync(src, dest);
  console.log(`  ${slug}.jpg <- ${file}`);
  ok++;
}
console.log(`\nCommitted ${ok}/${Object.keys(REPLACEMENTS).length} replacements.`);
if (missing.length) console.log("MISSING SOURCE FILES:", missing);

// clean up the candidates staging folder
rmSync(SRC, { recursive: true, force: true });
console.log("Removed _candidates staging folder.");
