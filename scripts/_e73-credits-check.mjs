// Resolve the actual Commons/local file used per E73 JDM car slug and report its license.
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
  "nissan-skyline-hakosuka": "Nissan Skyline 2door Hardtop 2000 GT-R (KPGC10).jpg",
  "subaru-impreza-22b": "1998 Subaru Impreza 22B STi.jpg",
  "nissan-skyline-kenmeri": "Nissan KPGC110 Skyline Hardtop 2000GT-R (22091110141).jpg",
  "honda-city-turbo-ii": "Honda City Turbo II AA.jpg",
  "nissan-exa": "Nissan EXA 1987.jpg",
  "datsun-fairlady-sr311": "Datsun Fairlady 2000 SR311.jpg",
  "toyota-gr-supra": "2020 Toyota GR Supra 3.0.jpg",
  "toyota-supra-a70": "Toyota Supra (A70) in white.jpg",
  "subaru-brz": "Subaru BRZ (ZD8) Final Edition IMG 0720.jpg",
  "toyota-gr86": "2022 Toyota GR86 Premium in Halo, Front Right, 04-10-2022.jpg",
  "honda-civic-type-r-ek9": "1997 Honda Civic Type R EK9.jpg",
  "honda-civic-type-r-fk8": "Honda CIVIC TYPE R (FK8).jpg",
  "nissan-silvia-s13": "Nissan S13 Silvia.jpg",
  "nissan-silvia-s14": "Nissan Silvia (S14) 1X7A1571.jpg",
  "nissan-silvia-s15": "1999 Nissan Silvia S15 Spec R.jpg",
  "toyota-corona-mark-ii": "Toyota Corona Mark II.jpg",
  "toyota-mark-ii-jzx100": "JZX100 Toyota Mark II.jpg",
  "mazda-rx7-fc": "Mazda E-FC3S Savanna RX-7 (23052111113).jpg",
  "mazda-rx7-fd": "Mazda RX-7 FD3S, front right, 05-05-2024.jpg",
  "nissan-skyline-gtr-r32": "Nissan Skyline R32 GT-R 001.jpg",
  "nissan-skyline-gtr-r33": "Nissan Skyline R33 GT-R 001.jpg",
  "toyota-celica-gt-four": "Toyota CELICA GT-FOUR (E-ST205) front.jpg",
  "mitsubishi-eclipse-gsx": "1990 Mitsubishi Eclipse GSX Turbo in Maranello Red, front left, 05-23-2026.jpg",
  "toyota-aristo": "Toyota GH-JZS161 Aristo V300 “VERTEX EDITION” (No.) (24042811461).jpg",
  "mazda-familia-gtx": "1991 Mazda Familia GT-X sedan 02.jpg",
  "toyota-altezza": "Toyota ALTEZZA RS200 (SXE10) front.JPG",
  "nissan-pulsar-gti-r": "1990-1994 Nissan Pulsar (N14) GTI-R 3-door hatchback 01.jpg",
  "mitsubishi-evo-ix": "2005 Mitsubishi Lancer Evolution IX FQ-340.jpg",
  "toyota-starlet-gt-turbo": "Toyota STARLET GT turbo (EP82) front.JPG",
  "subaru-legacy-gt": "Subaru Legacy GT (6823301173).jpg",
  "mitsubishi-pajero-evolution": "Mitsubishi PAJERO EVOLUTION (E-V55W) front.JPG",
  "mitsubishi-minica-dangan-zz": "Mitsubishi Minica Dangan 001.JPG",
  "suzuki-alto-works": "Suzuki ALTO Works Turbo ie-s (HA11S) front.JPG",
  "daihatsu-mira-trxx": "Daihatsu Mira TR-XX 001.JPG",
  "subaru-vivio-rxr": "Subaru VIVIO RX-R (KK4) front.JPG",
  "daihatsu-leeza-spider": "Daihatsu Leeza SPIDER.jpg",
  "mitsubishi-fto": "Mitsubishi FTO in Germany.jpg",
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

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/jdmCarsE73Data.js");
const items = dataMod.JDM_CARS_E73;

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
writeFileSync("out/e73-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
