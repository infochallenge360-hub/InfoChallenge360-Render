import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/instruments";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

function toThumbUrl(url, width = 1280) {
  if (url.includes("/thumb/")) return url;
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, base, d1, d2, filename] = m;
  return `${base}/thumb/${d1}/${d2}/${filename}/${width}px-${filename}`;
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
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1280`;
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
  "guitar": "Acoustic guitar",
  "piano": "Piano",
  "violin": "Violin",
  "drum-kit": "Drum kit",
  "flute": "Western concert flute",
  "trumpet": "Trumpet",
  "saxophone": "Saxophone",
  "cello": "Cello",
  "harmonica": "Harmonica",
  "accordion": "Accordion",
  "banjo": "Banjo",
  "trombone": "Trombone",
  "clarinet": "Clarinet",
  "bagpipes": "Bagpipes",
  "ukulele": "Ukulele",
  "xylophone": "Xylophone",
  "tambourine": "Tambourine",
  "harp": "Harp",
  "double-bass": "Double bass",
  "oboe": "Oboe",
  "french-horn": "French horn",
  "tuba": "Tuba",
  "mandolin": "Mandolin",
  "sitar": "Sitar",
  "bongo-drums": "Bongo drum",
  "marimba": "Marimba",
  "recorder": "Recorder (musical instrument)",
  "cajon": "Cajón",
  "djembe": "Djembe",
  "bass-guitar": "Bass guitar",
  "pipe-organ": "Pipe organ",
  "triangle": "Triangle (musical instrument)",
  "castanets": "Castanets",
  "maracas": "Maracas",
  "bassoon": "Bassoon",
  "viola": "Viola",
  "piccolo": "Piccolo",
  "bouzouki": "Bouzouki",
  "kalimba": "Kalimba",
  "handpan": "Handpan",
  "ocarina": "Ocarina",
  "erhu": "Erhu",
  "koto": "Koto (instrument)",
  "zither": "Zither",
  "bandoneon": "Bandoneon",
  "steel-pan": "Steelpan",
  "theremin": "Theremin",
  "balalaika": "Balalaika",
  "dulcimer": "Appalachian dulcimer",
  "concertina": "Concertina",
  "vibraphone": "Vibraphone",
  "shamisen": "Shamisen",
  "duduk": "Duduk",
  "hurdy-gurdy": "Hurdy-gurdy",
  "nyckelharpa": "Nyckelharpa",
  "sarod": "Sarod",
  "tabla": "Tabla",
  "rebab": "Rebab",
  "oud": "Oud",
  "guzheng": "Guzheng",
  "pipa": "Pipa",
  "cimbalom": "Cimbalom",
  "charango": "Charango",
  "hulusi": "Hulusi",
  "yangqin": "Yangqin",
  "guqin": "Guqin",
  "sackbut": "Sackbut",
  "crumhorn": "Crumhorn",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(`${slug} (${title})`);
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages failed, trying Commons search");
    const found = await commonsSearch(`${title} instrument`);
    if (found) { url = found.url; source = found.title; }
  } else {
    url = toThumbUrl(url);
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, title, status: "missing" }); await new Promise((r) => setTimeout(r, 600)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, url, status: "download-fail" }); await new Promise((r) => setTimeout(r, 600)); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  file too small, skip"); report.push({ slug, title, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, title, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e37-instruments-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
