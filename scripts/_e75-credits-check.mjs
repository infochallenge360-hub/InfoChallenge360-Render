// Resolve the actual Commons/local file used per E75 motorcycle slug and report its license.
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
  "harley-davidson-fat-boy": "Harley Davidson Fat Boy 2018 FLFBS.jpg",
  "harley-davidson-road-king": "Harley-Davidson Road King (1).jpg",
  "harley-davidson-street-glide": "Harley-Davidson Street Glide, Petrolia, Ontario, 2026-05-17 02.jpg",
  "harley-davidson-iron-883": "Harley-davidson-sportster-iron-883.jpg",
  "harley-davidson-sportster": "Harley-Davidson Sportster 1200 (2004).jpg",
  "yamaha-tenere-700": "Yamaha Ténéré 700 2025.jpg",
  "triumph-tiger": "2018 Triumph Tiger 1200 XRt (2).jpg",
  "ducati-scrambler": "2015 Ducati Scrambler Icon right.JPG",
  "ducati-panigale": "2020 Ducati Panigale V4 Superleggera.jpg",
  "energica-ego": "Energica Ego Fully Charged Europe 2022 01.JPG",
  "husqvarna-vitpilen": "Husqvarna Vitpilen 401.jpg",
  "benelli-tnt": "Benelli TNT 899 S (3).jpg",
  "kawasaki-klr650": "2009 black Kawasaki KLR 650.jpg",
  "suzuki-v-strom": "Suzuki V-Strom 650 XT MY2018.jpg",
  "suzuki-boulevard": "Suzuki Boulevard M109R McDonald's VT Rte 5 Lyndonville VT August 2019.jpg",
  "megola": "MHV Megola 01.jpg",
  "bsa-gold-star": "BSA Gold Star Clubmans three quarter rear.jpg",
  "ariel-square-four": "1935 Ariel Square Four 02.JPG",
  "vespa-gts": "Vespa GTS 300 Super 2.jpg",
  "yamaha-sr400": "Yamaha SR400 2014.JPG",
  "honda-cbr600rr": "Blue 2007 Honda CBR600RR left front.jpg",
  "ossa-mar": "Ossa Trials Motorcycle around 1976.jpg",
  "mz-etz": "MZ ETZ 251.jpg",
  "ural-gear-up": "2023 Ural Gear Up Caribbean.jpg",
  "rokon-trail-breaker": "Rokon Trail Blaser pic2B.jpg",
  "bultaco-sherpa": "Bultaco Sherpa T 250 1971 d.jpg",
  "horex-vr6": "Horex VR6 Classic,2019.jpg",
  "indian-chief": "Indian Chief Black Hawk 80 cubic inch 1950.jpg",
  "jawa-350": "Jawa 350.jpg",
  "indian-scout": "1940s Indian Scout (1) - The Art of the Motorcycle - Memphis.jpg",
  "cz-175": "ČZ 175 typ 501 Čezeta.JPG",
  "vyrus-987": "Vyrus 985 C3 4V noBG.jpg",
  "voxan-wattman": "Voxan-Wattman-Biaggi-speed-records.jpg",
  "cushman-eagle": "1957 Cushman Standard Cast Iron Eagle Lane Motor Museum.jpg",
  "vespa": "1987 Piaggio Vespa PX.jpg",
  "harley-davidson-livewire": "Harley Davidson LiveWire right noBG.jpg",
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

const dataMod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/motorcyclesE75Data.js");
const items = dataMod.MOTORCYCLES_E75;

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
writeFileSync("out/e75-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone,", results.length, "items");
