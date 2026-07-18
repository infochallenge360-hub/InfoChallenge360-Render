import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/airlines";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function infoboxImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=wikitext&section=0&page=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const wt = j.parse?.wikitext?.["*"] || "";
  if (/^#REDIRECT/i.test(wt.trim())) return "REDIRECT";
  const m = wt.match(/\|\s*(?:logo|image)\s*=\s*([^\n|]+)/i);
  return m ? m[1].trim().replace(/^File:/i, "") : null;
}

async function resolveTitle(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return title;
  const j = await r.json();
  return Object.values(j.query.pages)[0]?.title || title;
}

async function localFileUrl(filename) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + filename)}&prop=imageinfo&iiprop=url&iiurlwidth=800`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const info = page.imageinfo?.[0];
  return info ? (info.thumburl || info.url) : null;
}

const TARGETS = {
  "american-airlines": "American Airlines",
  "delta-air-lines": "Delta Air Lines",
  "united-airlines": "United Airlines",
  "emirates": "Emirates (airline)",
  "qatar-airways": "Qatar Airways",
  "lufthansa": "Lufthansa",
  "british-airways": "British Airways",
  "air-france": "Air France",
  "singapore-airlines": "Singapore Airlines",
  "southwest-airlines": "Southwest Airlines",
  "ryanair": "Ryanair",
  "easyjet": "EasyJet",
  "qantas": "Qantas",
  "air-canada": "Air Canada",
  "turkish-airlines": "Turkish Airlines",
  "klm": "KLM",
  "etihad-airways": "Etihad Airways",
  "cathay-pacific": "Cathay Pacific",
  "jetblue": "JetBlue",
  "alaska-airlines": "Alaska Airlines",
  "virgin-atlantic": "Virgin Atlantic",
  "air-india": "Air India",
  "china-southern-airlines": "China Southern Airlines",
  "all-nippon-airways": "All Nippon Airways",
  "japan-airlines": "Japan Airlines",
  "thai-airways": "Thai Airways",
  "iberia": "Iberia (airline)",
  "swiss-international-air-lines": "Swiss International Air Lines",
  "finnair": "Finnair",
  "aeroflot": "Aeroflot",
  "latam-airlines": "LATAM Airlines",
  "norwegian-air-shuttle": "Norwegian Air Shuttle",
  "vietnam-airlines": "Vietnam Airlines",
  "malaysia-airlines": "Malaysia Airlines",
  "south-african-airways": "South African Airways",
  "air-new-zealand": "Air New Zealand",
  "aer-lingus": "Aer Lingus",
  "austrian-airlines": "Austrian Airlines",
  "tap-air-portugal": "TAP Air Portugal",
  "scandinavian-airlines": "Scandinavian Airlines",
  "egyptair": "EgyptAir",
  "royal-jordanian": "Royal Jordanian",
  "kuwait-airways": "Kuwait Airways",
  "saudia": "Saudia",
  "philippine-airlines": "Philippine Airlines",
  "garuda-indonesia": "Garuda Indonesia",
  "china-eastern-airlines": "China Eastern Airlines",
  "air-china": "Air China",
  "copa-airlines": "Copa Airlines",
  "avianca": "Avianca",
  "aeromexico": "Aeromexico",
  "westjet": "WestJet",
  "icelandair": "Icelandair",
  "ethiopian-airlines": "Ethiopian Airlines",
  "royal-air-maroc": "Royal Air Maroc",
  "kenya-airways": "Kenya Airways",
  "tunisair": "Tunisair",
  "azerbaijan-airlines": "Azerbaijan Airlines",
  "uzbekistan-airways": "Uzbekistan Airways",
  "air-serbia": "Air Serbia",
  "lot-polish-airlines": "LOT Polish Airlines",
  "tarom": "Tarom",
  "air-baltic": "Air Baltic",
  "bulgaria-air": "Bulgaria Air",
  "cyprus-airways": "Cyprus Airways",
  "nepal-airlines": "Nepal Airlines",
  "myanmar-airways": "Myanmar Airways International",
  "air-mauritius": "Air Mauritius",
  "fiji-airways": "Fiji Airways",
  "surinam-airways": "Surinam Airways",
  "croatia-airlines": "Croatia Airlines",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.png`;
  console.log(`${slug} (${title})`);
  let realTitle = title;
  let filename = await infoboxImage(title);
  if (filename === "REDIRECT") {
    realTitle = await resolveTitle(title);
    await new Promise((r) => setTimeout(r, 600));
    filename = await infoboxImage(realTitle);
  }
  if (!filename || filename === "REDIRECT") { console.log("  no infobox image found"); report.push({ slug, title, status: "no-infobox-image" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const url = await localFileUrl(filename);
  if (!url) { console.log(`  file "${filename}" not resolvable`); report.push({ slug, title, filename, status: "unresolvable" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, filename, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) { console.log("  file too small, skip"); report.push({ slug, title, filename, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) ${filename}`);
  report.push({ slug, title, filename, url, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e26-airlines-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
