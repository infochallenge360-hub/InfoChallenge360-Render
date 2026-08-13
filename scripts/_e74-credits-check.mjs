// Resolve the actual Commons/local file used per E74 vegetable slug and report its license.
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
  "corn": "Raw Sweet Corn.jpg",
  "garlic": "Garlic bulbs and cloves.jpg",
  "ginger": "Root ginger, greengrocers display, Redruth, Cornwall - October 2022.jpg",
  "jicama": "Pachyrhizus erosus 2.jpg",
  "bitter-melon": "Fresh bitter melons.jpg",
  "yardlong-bean": "Long Bean.JPG",
  "fennel": "Fennel bulb.jpg",
  "parsnip": "PastinakePflanzegeerntet.jpg",
  "daikon": "Daikon.Japan.jpg",
  "sunchoke": "Jerusalem Artichokes tubers.jpg",
  "horseradish": "Horseradish root.jpg",
  "taro": "Taro Root.jpg",
  "cassava": "Balanghoy (Manihot esculenta) tubers.jpg",
  "turmeric": "Liat Portal for Foodie Disorder - Turmeric Root.jpg",
  "water-spinach": "Water spinach.jpg",
  "endive": "Cichorium endivia var. crispum (01).jpg",
  "asparagus": "Asparagus-Bundle.jpg",
  "water-chestnut": "Peeled water chestnuts.jpg",
  "purslane": "Portulaca oleracea MHNT.jpg",
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

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/vegetablesE74Data.js");
const items = dataMod.VEGETABLES_E74;

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
writeFileSync("out/e74-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
