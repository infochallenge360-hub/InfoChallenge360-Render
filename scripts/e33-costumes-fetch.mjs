import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/costumes";
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

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&iiurlwidth=1400`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) {
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

const TARGETS = {
  "japan-kimono": { title: "Kimono", query: "kimono traditional Japan" },
  "india-sari": { title: "Sari", query: "sari traditional India woman" },
  "scotland-kilt": { title: "Kilt", query: "kilt traditional Scotland" },
  "mexico-china-poblana": { title: "China poblana", query: "China poblana traditional Mexico" },
  "south-korea-hanbok": { title: "Hanbok", query: "hanbok traditional Korea" },
  "netherlands-volendam": { title: "Klederdracht", query: "Volendam traditional costume Netherlands" },
  "germany-lederhosen": { title: "Dirndl", query: "Dirndl Lederhosen Bavarian traditional" },
  "china-qipao": { title: "Cheongsam", query: "qipao cheongsam traditional China" },
  "spain-flamenco": { title: "Flamenco", query: "flamenco dress traditional Spain" },
  "switzerland-tracht": { title: null, query: "Swiss traditional costume Tracht" },
  "vietnam-ao-dai": { title: "Áo dài", query: "ao dai traditional Vietnam" },
  "peru-andean-dress": { title: null, query: "Peru traditional Andean dress woman" },
  "norway-bunad": { title: "Bunad", query: "bunad traditional Norway" },
  "austria-tracht": { title: null, query: "Austrian traditional Tracht costume" },
  "greece-fustanella": { title: "Fustanella", query: "fustanella traditional Greece" },
  "philippines-barong": { title: "Barong Tagalog", query: "Barong Tagalog Filipiniana traditional" },
  "thailand-silk-dress": { title: "Chut Thai", query: "traditional Thai silk dress" },
  "nigeria-agbada": { title: "Agbada", query: "agbada traditional Nigeria" },
  "poland-folk-costume": { title: null, query: "Polish folk costume traditional" },
  "russia-sarafan": { title: "Sarafan", query: "sarafan traditional Russia" },
  "ukraine-vyshyvanka": { title: "Vyshyvanka", query: "vyshyvanka traditional Ukraine" },
  "sweden-folk-dress": { title: null, query: "Swedish folk costume traditional" },
  "morocco-djellaba": { title: "Djellaba", query: "djellaba traditional Morocco" },
  "turkey-ottoman-dress": { title: null, query: "Turkish traditional dress costume" },
  "indonesia-kebaya": { title: "Kebaya", query: "kebaya traditional Indonesia" },
  "ireland-aran-dance": { title: null, query: "Irish step dance costume traditional" },
  "egypt-galabeya": { title: "Galabia", query: "galabeya traditional Egypt dress" },
  "kenya-maasai-dress": { title: null, query: "Maasai traditional dress Kenya" },
  "ghana-kente": { title: "Kente cloth", query: "kente cloth traditional Ghana" },
  "bolivia-cholita-dress": { title: "Cholita", query: "cholita traditional dress Bolivia" },
  "guatemala-huipil": { title: "Huipil", query: "huipil traditional Guatemala" },
  "colombia-traditional-dress": { title: null, query: "Colombian traditional dress" },
  "mongolia-deel": { title: "Deel (clothing)", query: "deel traditional Mongolia" },
  "bhutan-gho-kira": { title: "Gho (clothing)", query: "Bhutanese traditional dress gho kira" },
  "sri-lanka-osariya": { title: "Osariya", query: "osariya traditional Sri Lanka" },
  "ethiopia-habesha-kemis": { title: "Habesha kemis", query: "habesha kemis traditional Ethiopia" },
  "romania-ie-blouse": { title: "Ie (garment)", query: "Romanian blouse ie traditional" },
  "hungary-folk-dress": { title: null, query: "Hungarian folk costume traditional" },
  "czech-kroj": { title: null, query: "Czech folk costume kroj traditional" },
  "slovakia-kroj": { title: null, query: "Slovak folk costume traditional" },
  "bulgaria-folk-dress": { title: null, query: "Bulgarian folk costume traditional" },
  "serbia-folk-costume": { title: null, query: "Serbian folk costume traditional" },
  "croatia-folk-costume": { title: null, query: "Croatian folk costume traditional" },
  "finland-kansallispuku": { title: null, query: "Finnish national costume kansallispuku" },
  "wales-traditional-dress": { title: null, query: "Welsh traditional dress costume" },
  "nepal-daura-suruwal": { title: "Daura-Suruwal", query: "Nepali traditional dress daura suruwal" },
  "laos-sinh": { title: "Sinh (clothing)", query: "sinh traditional Laos dress" },
  "cambodia-sampot": { title: "Sampot", query: "sampot traditional Cambodia" },
  "myanmar-longyi": { title: "Longyi", query: "longyi traditional Myanmar" },
  "senegal-boubou": { title: "Boubou", query: "boubou traditional Senegal" },
  "ivory-coast-traditional-dress": { title: null, query: "Ivory Coast traditional dress" },
  "madagascar-lamba": { title: "Lamba (garment)", query: "lamba traditional Madagascar" },
  "georgia-chokha": { title: "Chokha", query: "chokha traditional Georgia dress" },
  "armenia-taraz": { title: null, query: "Armenian taraz traditional dress" },
  "azerbaijan-traditional-dress": { title: null, query: "Azerbaijani traditional dress costume" },
  "uzbekistan-traditional-dress": { title: null, query: "Uzbek traditional clothing dress" },
  "kazakhstan-traditional-dress": { title: null, query: "Kazakh traditional clothing dress" },
  "kyrgyzstan-traditional-dress": { title: null, query: "Kyrgyz traditional clothing dress" },
  "tajikistan-traditional-dress": { title: null, query: "Tajik traditional clothing dress" },
  "latvia-folk-costume": { title: null, query: "Latvian folk costume traditional" },
  "lithuania-folk-costume": { title: null, query: "Lithuanian folk costume traditional" },
  "estonia-folk-costume": { title: null, query: "Estonian folk costume traditional" },
  "iceland-thjodbuningur": { title: null, query: "Icelandic national costume thjodbuningur" },
  "albania-folk-costume": { title: "Albanian traditional clothing", query: "Albanian folk costume traditional" },
  "montenegro-folk-costume": { title: null, query: "Montenegrin national costume traditional" },
  "north-macedonia-folk-costume": { title: null, query: "Macedonian folk costume traditional" },
  "bosnia-folk-costume": { title: null, query: "Bosnian folk costume traditional" },
  "slovenia-gorenjska": { title: null, query: "Slovenian national costume Gorenjska" },
  "panama-pollera": { title: "Pollera", query: "pollera traditional Panama dress" },
  "paraguay-traditional-dress": { title: null, query: "Paraguayan traditional dress costume" },
  "papua-new-guinea-bilas": { title: "Bilas", query: "bilas traditional Papua New Guinea" },
};

const report = [];
for (const [slug, cfg] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.jpg`;
  if (existsSync(dest)) { console.log(`${slug} (skip, already exists)`); report.push({ slug, status: "ok", skipped: true }); continue; }
  console.log(`${slug}`);
  let url = null;
  let source = null;
  if (cfg.title) {
    url = await pageImage(cfg.title);
    if (url) source = "pageimages:" + cfg.title;
  }
  if (!url) {
    const found = await commonsSearch(cfg.query);
    if (found) { url = found.url; source = found.title; }
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, status: "missing" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  file too small, skip"); report.push({ slug, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 500));
}

writeFileSync("out/e33-costumes-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
