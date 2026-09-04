// Resolve the actual Commons/local file used per E71 pickup slug and report its license.
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
  "gmc-sierra": "GMC Sierra 1500 pickup truck, Essex, Ontario, 2025-08-30.jpg",
  "gmc-canyon": "2023 GMC Canyon.jpg",
  "ram-2500": "2012 Ram 2500 Heavy Duty crew cab Cummins diesel - in Aberdeen NC.jpg",
  "toyota-pickup-1980s": "1983-1988 Toyota Hilux N40 in blue.JPG",
  "great-wall-wingle": "Great Wall Wingle 5 European Edition Shishi 01 2022-09-09.jpg",
  "ford-f-350": "18 Ford F-350 Super Duty Lariat.jpg",
  "datsun-720": "Datsun 720 - four-door (front).jpg",
  "ford-ranger-raptor": "Ford Ranger Raptor (P703) 1X7A6774.jpg",
  "nissan-np300": "South African Police Nissan Hardbody NP300 double cab (21716054034).jpg",
  "ssangyong-musso": "0 SsangYong Musso Sports 1.jpg",
  "ford-svt-lightning": "Ford F-150 SVT Lightning.jpg",
  "chevrolet-cheyenne": "Chevrolet Cheyenne GMT400 Extended Cab.JPG",
  "ashok-leyland-dost": "Ashok Leyland Dost (1).JPG",
  "dfsk-super-cab": "Pickup DFSK 1 IIMS 2019.jpg",
  "ford-courier": "1995 Ford Courier (PC) XL 2WD 4-door utility (2015-07-03) 02.jpg",
  "isuzu-hombre": "1997 Isuzu Hombre XS Spacecab, front left, 06-07-2024.jpg",
  "opel-campo": "Opel Campo TDS 4x4 Sportscab 1992-2001 frontleft 2008-07-27 U.jpg",
  "volkswagen-saveiro": "2023 Volkswagen Saveiro 1.6 Comfortline double cab.jpg",
  "skoda-felicia-pickup": "Skoda Felicia Pick up (42951219162).jpg",
  "mahindra-bolero-pickup": "Mahindra Bolero Double Cab Front.JPG",
  "volkswagen-caddy-pickup": "1980 Volkswagen Rabbit Pickup in Alpine White, Front Right, 08-06-2022.jpg",
  "piaggio-porter": "2000 Piaggio Porter pickup front.jpg",
  "great-wall-steed": "Great Wall Steed 5.jpg",
  "toyota-stout": "Toyota Stout RK101P.jpg",
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

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/pickupsE71Data.js");
const items = dataMod.PICKUPS_E71;

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
writeFileSync("out/e71-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
