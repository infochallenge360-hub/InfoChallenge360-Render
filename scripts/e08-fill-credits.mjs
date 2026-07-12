import { readFileSync, writeFileSync } from "node:fs";
const UA = "InfoChallenge360Bot/1.0 (educational quiz)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const filenames = JSON.parse(readFileSync("C:/Users/Talat/AppData/Local/Temp/e08-all-filenames.json", "utf-8"));

const KNOWN_TITLES = {
  "cheese-fondue": "Fondue",
  "belgian-waffles": "Belgian waffle",
  "kottu-roti": "Kottu",
  "pastel-de-choclo": "Pastel de choclo",
  "fish-amok": "Fish amok",
  "grey-peas-with-bacon": "Grey peas",
  "sopa-paraguaya": "Sopa paraguaya",
  "pom": "Pom (dish)",
};
const DIRECT_FILENAMES = {
  "swedish-meatballs": "Swedish meatballs in Gamla stan, Stockholm.jpg",
  "doro-wat": "Ethiopian wat.jpg",
  "dal-bhat": "Dal Bhat Tarkari 2.jpg",
  "beshbarmak": "Beshbarmak, national dish (3991850909).jpg",
  "pepperpot": "Pepperpot (16135006279).jpg",
  "camel-tibs": "Camel tibs in Djibouti.jpg",
  "kokoda": "Kokodafood.jpg",
  "mumu": "A Mumu in Papua New Guinea.jpg",
  "langouste-a-la-vanille": "Cuisine de l'archipel des Comores par la Brigade de Mayotte aux Grandes Tables de la Friche (Marseille) (53000746104).jpg",
  "gutap": "FriedBreadInErbent.JPG",
  "chili-crab": "Chilli crab-01.jpg",
};
for (const [slug, fname] of Object.entries(DIRECT_FILENAMES)) filenames[slug] = fname;

async function fetchJsonWithRetry(url) {
  for (let a = 0; a < 4; a++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    const t = await r.text();
    if (r.ok && t.trim().startsWith("{")) return JSON.parse(t);
    await sleep(2000 * (a + 1));
  }
  return null;
}
for (const [slug, title] of Object.entries(KNOWN_TITLES)) {
  const j = await fetchJsonWithRetry(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`);
  await sleep(1500);
  const p = j && Object.values(j.query?.pages || {})[0];
  const thumb = p?.thumbnail?.source;
  let fname = null;
  if (thumb) {
    const parts = decodeURIComponent(thumb).split("/");
    fname = thumb.includes("/thumb/") ? parts[parts.length - 2] : parts[parts.length - 1];
  }
  if (fname) filenames[slug] = fname;
  console.error(`${slug} (${title}): ${fname || "NONE"}`);
}
writeFileSync("C:/Users/Talat/AppData/Local/Temp/e08-all-filenames.json", JSON.stringify(filenames, null, 2));
const stillMissing = Object.entries(filenames).filter(([, v]) => !v).map(([k]) => k);
console.log("still missing:", stillMissing);
