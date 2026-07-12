import { readFileSync, writeFileSync } from "node:fs";
const UA = "InfoChallenge360Bot/1.0 (educational quiz)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const filenames = JSON.parse(readFileSync("C:/Users/Talat/AppData/Local/Temp/e09-all-filenames.json", "utf-8"));

const TITLES = {
  "christ-the-redeemer": "Christ the Redeemer (statue)",
  "mount-rushmore": "Mount Rushmore",
  "golden-gate-bridge": "Golden Gate Bridge",
  "table-mountain": "Table Mountain",
  "forbidden-city": "Forbidden City",
  "blue-mosque": "Blue Mosque, Istanbul",
  "moai-statues-easter-island": "Moai",
  "fushimi-inari-shrine": "Fushimi Inari-taisha",
  "meteora": "Meteora",
  "zhangjiajie-national-forest": "Zhangjiajie National Forest Park",
  "potala-palace": "Potala Palace",
  "lalibela-rock-hewn-churches": "Rock-Hewn Churches, Lalibela",
  "ales-stenar": "Ale's Stones",
  "kawah-ijen": "Ijen",
  "rainbow-mountain-vinicunca": "Vinicunca",
  "gobustan-petroglyphs": "Gobustan Rock Art Cultural Landscape",
};

async function fetchJsonWithRetry(url) {
  for (let a = 0; a < 5; a++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    const t = await r.text();
    if (r.ok && t.trim().startsWith("{")) return JSON.parse(t);
    await sleep(2500 * (a + 1));
  }
  return null;
}
for (const [slug, title] of Object.entries(TITLES)) {
  const j = await fetchJsonWithRetry(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`);
  await sleep(2000);
  const p = j && Object.values(j.query?.pages || {})[0];
  const thumb = p?.thumbnail?.source;
  let fname = null;
  if (thumb) {
    const parts = decodeURIComponent(thumb).split("/");
    fname = thumb.includes("/thumb/") ? parts[parts.length - 2] : parts[parts.length - 1];
  }
  if (fname) filenames[slug] = fname;
  console.error(`${slug} (${title}): ${fname || "STILL NONE"}`);
}
writeFileSync("C:/Users/Talat/AppData/Local/Temp/e09-all-filenames.json", JSON.stringify(filenames, null, 2));
console.log("done");
