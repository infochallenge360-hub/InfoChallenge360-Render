// Resolve the actual Commons/local file used per E70 EV slug and report its license.
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
  "audi-e-tron": "Audi e-tron 55 quattro at IAA 2019 IMG 0655.jpg",
  "volvo-c40-recharge": "Volvo C40 Recharge Twin Ultra CMA Crystal White Pearl (1).jpg",
  "smart-1": "Smart 1 001.jpg",
  "dodge-charger-daytona": "25 Dodge Charger Daytona Scat Pack EV.jpg",
  "subaru-solterra": "2023 Subaru Solterra AWD Technology Package in Smoked Carbon, Front Left, 07-14-2023.jpg",
  "maxus-mifa-9": "Maxus Mifa 9 001.jpg",
  "volkswagen-e-golf": "Salon de l'auto de Genève 2014 - 20140305 - Volkswagen e-Golf.jpg",
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

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/evCarsE70Data.js");
const items = dataMod.EVCARS_E70;

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
writeFileSync("out/e70-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
