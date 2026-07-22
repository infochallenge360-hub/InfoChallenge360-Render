import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { ZODIAC_SIGNS_E39 } from "../src/Quiz/zodiacSignsE39Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/zodiac";
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

function toThumbUrl(url, width = 1200) {
  if (url.includes("/thumb/")) return url;
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, base, d1, d2, filename] = m;
  return `${base}/thumb/${d1}/${d2}/${filename}/${width}px-${filename}`;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/jpeg" || info.mime === "image/png" || info.mime === "image/svg+xml")) {
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

// Precise Wikipedia article titles / search terms per culture, to get the right depiction
// (zodiac SYMBOL for Western/Chinese/Aztec; deity ART for Egyptian; tree-species photo for Celtic).
const TITLE_BY_SLUG = {
  aries: "Aries (astrology)", taurus: "Taurus (astrology)", gemini: "Gemini (astrology)",
  cancer: "Cancer (astrology)", leo: "Leo (astrology)", libra: "Libra (astrology)",
  scorpio: "Scorpio (astrology)", pisces: "Pisces (astrology)", virgo: "Virgo (astrology)",
  sagittarius: "Sagittarius (astrology)", capricorn: "Capricorn (astrology)", aquarius: "Aquarius (astrology)",
  dragon: "Dragon (zodiac)", tiger: "Tiger (zodiac)", rabbit: "Rabbit (zodiac)", snake: "Snake (zodiac)",
  horse: "Horse (zodiac)", monkey: "Monkey (zodiac)", dog: "Dog (zodiac)", rat: "Rat (zodiac)",
  ox: "Ox (zodiac)", pig: "Pig (zodiac)", rooster: "Rooster (zodiac)", goat: "Goat (zodiac)",
  isis: "Isis", anubis: "Anubis", osiris: "Osiris", horus: "Horus", bastet: "Bastet",
  "amun-ra": "Amun", thoth: "Thoth", sekhmet: "Sekhmet", geb: "Geb", mut: "Mut", selket: "Serket", shu: "Shu (deity)",
  oak: "Oak", holly: "Holly", willow: "Willow", vine: "Vitis", ivy: "Hedera", hazel: "Hazel",
  ash: "Fraxinus", elder: "Sambucus", hawthorn: "Crataegus", reed: "Phragmites", rowan: "Sorbus aucuparia",
  birch: "Betula", alder: "Alnus",
  coatl: "Cōātl", cuauhtli: "Cuāuhtli", xochitl: "Xōchitl", ocelotl: "Ocēlōtl", ehecatl: "Ehēcatl",
  ollin: "Ōllin", cipactli: "Cipactli", miquiztli: "Miquiztli", tochtli: "Tōchtli", atl: "Ātl",
  itzcuintli: "Itzcuintli", ozomatli: "Ozomahtli", mazatl: "Mazātl", tecpatl: "Tecpatl",
  quiahuitl: "Quiyahuitl", calli: "Calli",
};

const COMMONS_QUERY = {
  aries: "aries zodiac symbol", taurus: "taurus zodiac symbol", gemini: "gemini zodiac symbol",
  cancer: "cancer zodiac symbol", leo: "leo zodiac symbol", libra: "libra zodiac symbol",
  scorpio: "scorpio zodiac symbol", pisces: "pisces zodiac symbol", virgo: "virgo zodiac symbol",
  sagittarius: "sagittarius zodiac symbol", capricorn: "capricorn zodiac symbol", aquarius: "aquarius zodiac symbol",
  geb: "Geb Egyptian god art", mut: "Mut Egyptian goddess art", selket: "Serket Egyptian goddess art", shu: "Shu Egyptian god art",
  coatl: "Aztec Coatl day sign codex", cuauhtli: "Aztec Cuauhtli day sign codex", xochitl: "Aztec Xochitl day sign codex",
  ocelotl: "Aztec Ocelotl day sign codex", ehecatl: "Aztec Ehecatl day sign codex", ollin: "Aztec Ollin day sign codex",
  cipactli: "Aztec Cipactli day sign codex", miquiztli: "Aztec Miquiztli day sign codex", tochtli: "Aztec Tochtli day sign codex",
  atl: "Aztec Atl day sign codex", itzcuintli: "Aztec Itzcuintli day sign codex", ozomatli: "Aztec Ozomatli day sign codex",
  mazatl: "Aztec Mazatl day sign codex", tecpatl: "Aztec Tecpatl day sign codex", quiahuitl: "Aztec Quiahuitl day sign codex",
  calli: "Aztec Calli day sign codex",
};

const report = [];
for (const item of ZODIAC_SIGNS_E39) {
  const dest = `${DEST}/${item.slug}.jpg`;
  console.log(`${item.slug} (${item.culture})`);
  const title = TITLE_BY_SLUG[item.slug] || item.name;
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages miss, trying Commons search");
    const q = COMMONS_QUERY[item.slug] || `${item.name} ${item.culture} zodiac`;
    const found = await commonsSearch(q);
    if (found) { url = found.url; source = found.title; }
  } else {
    url = toThumbUrl(url);
  }
  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug: item.slug, name: item.name, culture: item.culture, status: "missing" });
    await new Promise((r) => setTimeout(r, 600));
    continue;
  }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) {
    console.log("  download failed");
    report.push({ slug: item.slug, name: item.name, culture: item.culture, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 600));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1000) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, name: item.name, culture: item.culture, url, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, name: item.name, culture: item.culture, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e39-zodiac-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
