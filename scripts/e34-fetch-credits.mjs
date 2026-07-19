import { writeFileSync, readdirSync, statSync } from "node:fs";
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

const ITEMS = [
  ["usa-dollar", "United States dollar", "US dollar banknote"],
  ["eurozone-euro", "Euro", "Euro banknotes"],
  ["japan-yen", "Japanese yen", "Japanese yen coin"],
  ["china-yuan", "Renminbi", "Chinese yuan banknote"],
  ["india-rupee", "Indian rupee", "Indian rupee banknote"],
  ["australia-dollar", "Australian dollar", "Australian dollar banknote"],
  ["switzerland-franc", "Swiss franc", "Swiss franc banknote"],
  ["brazil-real", "Brazilian real", "Brazilian real banknote"],
  ["russia-ruble", "Russian ruble", "Russian ruble banknote"],
  ["south-korea-won", "South Korean won", "South Korean won banknote"],
  ["saudi-arabia-riyal", "Saudi riyal", "Saudi riyal banknote"],
  ["turkey-lira", "Turkish lira", "Turkish lira banknote"],
  ["poland-zloty", "Polish złoty", "Polish zloty banknote"],
  ["indonesia-rupiah", "Indonesian rupiah", "Indonesian rupiah banknote"],
  ["philippines-peso", "Philippine peso", "Philippine peso banknote"],
  ["vietnam-dong", "Vietnamese đồng", "Vietnamese dong banknote"],
  ["egypt-pound", "Egyptian pound", "Egyptian pound banknote"],
  ["czech-koruna", "Czech koruna", "Czech koruna banknote"],
  ["hungary-forint", "Hungarian forint", "Hungarian forint banknote"],
  ["romania-leu", "Romanian leu", "Romanian leu banknote"],
  ["ukraine-hryvnia", "Ukrainian hryvnia", "Ukrainian hryvnia banknote"],
  ["ethiopia-birr", "Ethiopian birr", "Ethiopian birr banknote"],
  ["ghana-cedi", "Ghanaian cedi", "Ghanaian cedi banknote"],
  ["sri-lanka-rupee", "Sri Lankan rupee", "Sri Lankan rupee banknote"],
  ["myanmar-kyat", "Kyat", "Myanmar kyat banknote"],
  ["jordan-dinar", "Jordanian dinar", "Jordanian dinar banknote"],
  ["kuwait-dinar", "Kuwaiti dinar", "Kuwaiti dinar banknote"],
  ["mongolia-tugrik", "Mongolian tögrög", "Mongolian tugrik banknote"],
  ["samoa-tala", "Samoan tālā", "Samoan tala banknote"],
  ["bahrain-dinar", "Bahraini dinar", "Bahraini dinar banknote"],
  ["azerbaijan-manat", "Azerbaijani manat", "Azerbaijani manat banknote"],
  ["armenia-dram", "Armenian dram", "Armenian dram banknote"],
  ["georgia-lari", "Georgian lari", "Georgian lari banknote"],
  ["moldova-leu", "Moldovan leu", "Moldovan leu banknote"],
];

const localSize = {};
for (const f of readdirSync("public/currencies")) {
  if (f.endsWith(".jpg")) localSize[f.replace(".jpg", "")] = statSync(`public/currencies/${f}`).size;
}

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, "").trim();

async function fetchJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 5000 * (i + 1))); continue; }
      if (r.ok) return await r.json();
    } catch (e) {}
    await new Promise((res) => setTimeout(res, 2000));
  }
  return null;
}

function closeEnough(a, b) {
  if (!a || !b) return false;
  return Math.abs(a - b) / Math.max(a, b) < 0.08;
}

const results = [];
for (const [slug, wikiTitle, searchTerm] of ITEMS) {
  const target = localSize[slug];
  let found = null;

  // Try 1: pageimages original + imageinfo via title lookup
  const piUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=name&titles=${encodeURIComponent(wikiTitle)}&redirects=1`;
  const piJson = await fetchJson(piUrl);
  const page = piJson ? Object.values(piJson.query?.pages || {})[0] : null;
  const pageImageName = page?.pageimage;

  if (pageImageName) {
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + pageImageName)}&prop=imageinfo&iiprop=extmetadata|size|url`;
    const infoJson = await fetchJson(infoUrl);
    const p = infoJson ? Object.values(infoJson.query?.pages || {})[0] : null;
    const ii = p?.imageinfo?.[0];
    if (ii) {
      found = { filename: pageImageName, license: ii.extmetadata?.LicenseShortName?.value, artist: stripHtml(ii.extmetadata?.Artist?.value), sizeMatch: false };
    }
  }

  // Try 2: Commons search, look for a byte-size match among top candidates
  if (!found || !found.license) {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=extmetadata|size|url&iiurlwidth=1200`;
    const sj = await fetchJson(searchUrl);
    const pages = sj ? Object.values(sj.query?.pages || {}) : [];
    for (const p of pages) {
      const ii = p.imageinfo?.[0];
      if (!ii) continue;
      const thumbSize = ii.thumbsize || null;
      if (closeEnough(target, ii.size) || closeEnough(target, thumbSize)) {
        found = { filename: p.title.replace(/^File:/, ""), license: ii.extmetadata?.LicenseShortName?.value, artist: stripHtml(ii.extmetadata?.Artist?.value), sizeMatch: true };
        break;
      }
    }
  }

  results.push({ slug, wikiTitle, target, ...(found || {}) });
  console.log(slug, "->", found ? `${found.license || "no-license"} (${found.sizeMatch ? "size-matched" : "pageimage"})` : "NOT FOUND");
  await new Promise((r) => setTimeout(r, 900));
}

writeFileSync("out/e34-currencies-credits.json", JSON.stringify(results, null, 2));
console.log("\ndone", results.length);
