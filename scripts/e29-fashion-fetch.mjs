import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/fashion";
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

function extractFieldValue(wikitext, fieldNames) {
  const lines = wikitext.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*\|\s*(logo|image)\s*=\s*(.*)$/i);
    if (m && fieldNames.includes(m[1].toLowerCase())) {
      let value = m[2];
      let j = i + 1;
      while (j < lines.length && !/^\s*[|}]/.test(lines[j])) {
        value += " " + lines[j];
        j++;
      }
      return value.trim();
    }
  }
  return null;
}

function filenameFromFieldValue(value) {
  if (!value) return null;
  const wl = value.match(/\[\[(?:File|Image):([^|\]]+)/i);
  if (wl) return wl[1].trim();
  return value.replace(/^File:/i, "").trim();
}

async function infoboxImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=wikitext&section=0&page=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (j.error) return null;
  const wt = j.parse?.wikitext?.["*"] || "";
  if (/^#REDIRECT/i.test(wt.trim())) return "REDIRECT";
  const value = extractFieldValue(wt, ["logo"]) || extractFieldValue(wt, ["image"]);
  return filenameFromFieldValue(value);
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
  if (info) return info.thumburl || info.url;
  const api2 = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + filename)}&prop=imageinfo&iiprop=url&iiurlwidth=800`;
  const r2 = await fetchWithRetry(api2);
  if (!r2 || !r2.ok) return null;
  const j2 = await r2.json();
  const page2 = Object.values(j2.query.pages)[0];
  const info2 = page2.imageinfo?.[0];
  return info2 ? (info2.thumburl || info2.url) : null;
}

async function commonsSearchLogo(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=800`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/svg+xml" || info.mime === "image/png")) {
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

const TARGETS = {
  "nike": "Nike, Inc.",
  "adidas": "Adidas",
  "gucci": "Gucci",
  "louis-vuitton": "Louis Vuitton",
  "chanel": "Chanel",
  "zara": "Zara (retailer)",
  "hm": "H&M",
  "levis": "Levi Strauss & Co.",
  "puma": "Puma (brand)",
  "calvin-klein": "Calvin Klein (company)",
  "ralph-lauren": "Ralph Lauren Corporation",
  "converse": "Converse",
  "versace": "Versace",
  "vans": "Vans",
  "tommy-hilfiger": "Tommy Hilfiger (company)",
  "prada": "Prada",
  "dior": "Dior",
  "under-armour": "Under Armour",
  "new-balance": "New Balance",
  "reebok": "Reebok",
  "lacoste": "Lacoste",
  "burberry": "Burberry",
  "armani": "Armani",
  "hugo-boss": "Hugo Boss",
  "uniqlo": "Uniqlo",
  "the-north-face": "The North Face",
  "guess": "Guess (clothing)",
  "diesel": "Diesel (brand)",
  "skechers": "Skechers",
  "timberland": "Timberland (company)",
  "fila": "Fila (company)",
  "forever-21": "Forever 21",
  "abercrombie-fitch": "Abercrombie & Fitch",
  "patagonia": "Patagonia, Inc.",
  "champion": "Champion (sportswear)",
  "columbia-sportswear": "Columbia Sportswear",
  "michael-kors": "Michael Kors (brand)",
  "balenciaga": "Balenciaga",
  "valentino": "Valentino (fashion house)",
  "givenchy": "Givenchy",
  "fendi": "Fendi",
  "moncler": "Moncler",
  "supreme": "Supreme (brand)",
  "dolce-gabbana": "Dolce & Gabbana",
  "yves-saint-laurent": "Yves Saint Laurent (brand)",
  "salvatore-ferragamo": "Salvatore Ferragamo (company)",
  "jimmy-choo": "Jimmy Choo (brand)",
  "off-white": "Off-White (brand)",
  "bottega-veneta": "Bottega Veneta",
  "kenzo": "Kenzo (brand)",
  "marc-jacobs": "Marc Jacobs (brand)",
  "tory-burch": "Tory Burch (brand)",
  "missoni": "Missoni",
  "stone-island": "Stone Island",
  "alexander-mcqueen": "Alexander McQueen (brand)",
  "comme-des-garcons": "Comme des Garçons",
  "issey-miyake": "Issey Miyake (brand)",
  "rick-owens": "Rick Owens (brand)",
  "acne-studios": "Acne Studios",
  "apc": "A.P.C.",
  "maison-margiela": "Maison Margiela",
  "thom-browne": "Thom Browne (fashion house)",
  "ermenegildo-zegna": "Zegna",
  "brioni": "Brioni (company)",
  "loro-piana": "Loro Piana",
  "balmain": "Balmain (fashion house)",
  "celine": "Celine (brand)",
  "loewe": "Loewe (brand)",
  "chloe": "Chloé (brand)",
  "isabel-marant": "Isabel Marant",
  "vetements": "Vetements (brand)",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.png`;
  console.log(`${slug} (${title})`);
  let filename = await infoboxImage(title);
  if (filename === "REDIRECT") {
    const realTitle = await resolveTitle(title);
    await new Promise((r) => setTimeout(r, 600));
    filename = await infoboxImage(realTitle);
  }
  let url = null;
  if (filename && filename !== "REDIRECT") {
    url = await localFileUrl(filename);
  }
  if (!url) {
    console.log(`  infobox extraction failed (filename=${filename}), trying Commons search`);
    const found = await commonsSearchLogo(`${title.replace(/\s*\([^)]*\)/, "")} logo`);
    if (found) { url = found.url; filename = found.title; }
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, title, status: "missing" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, filename, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) { console.log("  file too small, skip"); report.push({ slug, title, filename, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) ${filename}`);
  report.push({ slug, title, filename, url, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e29-fashion-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
