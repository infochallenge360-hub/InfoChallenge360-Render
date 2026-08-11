// Resolve the actual Commons/local file used per E69 supercar slug and report its license.
import { writeFileSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (r.ok) return r;
    await new Promise((res) => setTimeout(res, 4000 * (i + 1)));
  }
  throw new Error("failed: " + url);
}

const MANUAL = {
  "nissan-gt-r": "NISSAN GT-R (R35) China.jpg",
  "ford-gt": "Ford GT Road Car (35661116320).jpg",
  "ford-gt-2005": "2005 Ford GT SCD 24.jpg",
  "chevrolet-corvette-zr1": "Chevrolet Corvette ZR1 (C7) Washington DC Metro Area, USA (1).jpg",
  "zenvo-ts1": "Zenvo TS1 GT (58000).jpg",
  "nissan-gt-r50": "Nissan GT-R50 by Italdesign (2).jpg",
  "koenigsegg-one1": "Koenigsegg One-1 - Genève 2014 - 01.jpg",
  "porsche-911-turbo-s": "2017 Porsche 911 991 Turbo S.jpg",
  "dodge-viper-acr": "2009 Dodge Viper ACR.jpg",
  "audi-r8": "2020 Audi R8 V10 5.2 Front.jpg",
};

async function licenseForFile(file) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + file)}&prop=imageinfo&iiprop=extmetadata`;
  const r = await fetchWithRetry(api);
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const meta = page?.imageinfo?.[0]?.extmetadata;
  if (!meta) {
    const api2 = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + file)}&prop=imageinfo&iiprop=extmetadata`;
    const r2 = await fetchWithRetry(api2);
    const j2 = await r2.json();
    const page2 = Object.values(j2.query.pages)[0];
    const meta2 = page2?.imageinfo?.[0]?.extmetadata;
    if (!meta2) return null;
    return { license: meta2.LicenseShortName?.value || null, artist: meta2.Artist?.value?.replace(/<[^>]+>/g, "").trim() || null };
  }
  return { license: meta.LicenseShortName?.value || null, artist: meta.Artist?.value?.replace(/<[^>]+>/g, "").trim() || null };
}

async function pageimageTitle(wikiTitle) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=name&redirects=1&titles=${encodeURIComponent(wikiTitle)}`;
  const r = await fetchWithRetry(api);
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.pageimage || null;
}

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/supercarsE69Data.js");
const items = dataMod.SUPERCARS_E69;

const results = [];
for (const item of items) {
  let file = MANUAL[item.slug];
  if (!file) {
    file = await pageimageTitle(item.wiki);
    await new Promise((r) => setTimeout(r, 800));
  }
  if (!file) { results.push({ slug: item.slug, name: item.name, status: "NO FILE" }); continue; }
  const lic = await licenseForFile(file);
  results.push({ slug: item.slug, name: item.name, file, license: lic?.license || "UNKNOWN", artist: lic?.artist || "" });
  console.log(item.slug, "->", file, "|", lic?.license, "|", lic?.artist);
  await new Promise((r) => setTimeout(r, 1300));
}
writeFileSync("out/e69-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
