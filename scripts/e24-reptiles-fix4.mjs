import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/reptiles/_candidates";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function wikiImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page.thumbnail ? page.thumbnail.source : null;
}

async function commonsSearch(query, limit = 10) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const pages = j.query?.pages || {};
  return Object.values(pages).map((p) => ({
    title: p.title,
    url: p.imageinfo?.[0]?.thumburl,
    mime: p.imageinfo?.[0]?.mime,
    license: p.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value,
    artist: (p.imageinfo?.[0]?.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, ""),
  })).filter((x) => x.url && x.mime && x.mime.startsWith("image/"));
}

const SAFE_LICENSE = /public domain|cc0|cc-by|pd-/i;
const BAD_TITLE = /stamp|iconographia|zoologica|diagram|comparison|illustration|print|lithograph|engraving|skeleton|specimen|carcass|dead/i;

// Direct Wikipedia article lead images (species pages)
const WIKI_TARGETS = {
  "veiled-chameleon": "Veiled chameleon",
  "green-sea-turtle": "Green sea turtle",
  "spectacled-caiman": "Spectacled caiman",
  "chinese-water-dragon": "Chinese water dragon",
  "draco-lizard": "Draco (genus)",
  "rhinoceros-ratsnake": "Rhynchophis boulengeri",
};

const report = {};
for (const [slug, title] of Object.entries(WIKI_TARGETS)) {
  console.log(`\n=== ${slug} (wiki: "${title}") ===`);
  report[slug] = [];
  const url = await wikiImage(title);
  if (url) {
    const dest = `${DEST}/${slug}-wiki1.jpg`;
    const r = await fetchWithRetry(url);
    if (r && r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length >= 8000) {
        writeFileSync(dest, buf);
        console.log(`  [wiki1] -> ${dest} (${buf.length}b) from ${url}`);
        report[slug].push({ file: dest, url });
      }
    }
  } else {
    console.log("  no wiki lead image");
  }
  await new Promise((res) => setTimeout(res, 1000));
}

// Commons search retry with tighter queries + bad-title filter
const COMMONS_TARGETS = {
  "veiled-chameleon": "Chamaeleo calyptratus wild",
  "green-sea-turtle": "Chelonia mydas reef",
  "spectacled-caiman": "Caiman crocodilus head",
  "chinese-water-dragon": "Physignathus cocincinus captive",
  "draco-lizard": "Draco volans lizard gliding membrane",
  "rhinoceros-ratsnake": "Rhynchophis boulengeri snake",
};

for (const [slug, q] of Object.entries(COMMONS_TARGETS)) {
  console.log(`\n=== ${slug} (commons: "${q}") ===`);
  const cands = await commonsSearch(q);
  const safe = cands.filter((c) => SAFE_LICENSE.test(c.license || "") && !BAD_TITLE.test(c.title || ""));
  if (!report[slug]) report[slug] = [];
  let i = 0;
  for (const c of safe.slice(0, 4)) {
    i++;
    const dest = `${DEST}/${slug}-cm${i}.jpg`;
    const r = await fetchWithRetry(c.url);
    if (!r || !r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 8000) continue;
    writeFileSync(dest, buf);
    console.log(`  [cm${i}] ${c.license} | ${c.title} | ${c.artist} -> ${dest} (${buf.length}b)`);
    report[slug].push({ file: dest, title: c.title, license: c.license, artist: c.artist, url: c.url });
    await new Promise((res) => setTimeout(res, 400));
  }
  if (!safe.length) console.log("  no safe commons candidates");
  await new Promise((res) => setTimeout(res, 600));
}

writeFileSync("out/e24-fix4-candidates.json", JSON.stringify(report, null, 2));
console.log("\nDone. Candidates report -> out/e24-fix4-candidates.json");
