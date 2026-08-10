// Resolve the actual Commons/local file used per E68 Nokia slug and report its license.
// Manually-resourced items (found via targeted Commons search during QA fixes) are hardcoded here
// since they don't match the `wiki` field's default pageimages result. Everything else re-queries
// the Wikipedia pageimages API on the `wiki` title (same image the original bulk fetch used).
import { readFileSync, writeFileSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (r.ok) return r;
    await new Promise((res) => setTimeout(res, 4000 * (i + 1)));
  }
  throw new Error("failed: " + url);
}

// slug -> exact Commons "File:" title actually downloaded (manual re-sources during QA rounds)
const MANUAL = {
  "nokia-3510": "Nokia 3510 (2002).jpg",
  "nokia-3410": "Nokia 3410 (cutout).jpg",
  "nokia-n70": "Nokia N70 z kartą pamięci miniSD.jpg",
  "nokia-7110": "Nokia 7110 (2016-06-17).jpg",
  "nokia-lumia-520": "Nokia Lumia 520 Black.jpg",
  "nokia-9210-communicator": "Nokia 9210 RAE-5N.jpg",
  "nokia-6310i": "Nokia6310i.JPG",
  "nokia-2110i": "Nokia 2110i (2016-06-17).jpg",
  "nokia-1208": "Nokia 1208 phone.JPG",
  "nokia-lumia-1520": "Nokia Lumia 1520.jpg",
  "nokia-e5": "Nokia E5.png",
  "nokia-lumia-900": "Nokia Lumia 900 black.jpg",
  "nokia-asha-200": "Nokia Asha 200.JPG",
  "nokia-6021": "Nokia 6021.jpg",
  "nokia-2610": "Nokia 2610 (Brown) - Front.jpg",
  "nokia-6131": "Nokia 6131-8731.jpg",
  "nokia-c3-00": "Nokia C3-00 - Front.jpg",
  "nokia-asha-305": "Nokia Asha 305.jpg",
  "nokia-x2-01": "Nokia x2-01.jpg",
  "nokia-105": "Nokia 105 (2019 4th Edn Black) (Ready to call contact).jpg",
  "nokia-9110-communicator": "Nokia-9110-1.jpg",
  "nokia-6220-classic": "Nokia 6220 classic.jpg",
  "nokia-6260": "Nokia 6260.jpg",
  "nokia-6820": "Nokia 6820.jpg",
};

async function licenseForFile(file) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + file)}&prop=imageinfo&iiprop=extmetadata`;
  const r = await fetchWithRetry(api);
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const meta = page?.imageinfo?.[0]?.extmetadata;
  if (!meta) {
    // try en.wikipedia local repo (non-free/local uploads)
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

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/nokiaE68Data.js");
const items = dataMod.NOKIA_E68;

const results = [];
for (const item of items) {
  let file = MANUAL[item.slug];
  if (!file) {
    file = await pageimageTitle(item.wiki);
    await new Promise((r) => setTimeout(r, 700));
  }
  if (!file) { results.push({ slug: item.slug, name: item.name, status: "NO FILE" }); continue; }
  const lic = await licenseForFile(file);
  results.push({ slug: item.slug, name: item.name, file, license: lic?.license || "UNKNOWN", artist: lic?.artist || "" });
  console.log(item.slug, "->", file, "|", lic?.license, "|", lic?.artist);
  await new Promise((r) => setTimeout(r, 1200));
}
writeFileSync("out/e68-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
