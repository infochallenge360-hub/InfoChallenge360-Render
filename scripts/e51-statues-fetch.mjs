import { writeFileSync, existsSync, mkdirSync } from "node:fs";

// slug -> { wiki: preferred Wikipedia article title, q: Commons search fallback query, name, country, level }
const TARGETS = {
  // EASY (18)
  "statue-of-liberty": { wiki: "Statue of Liberty", q: "Statue of Liberty", name: "Statue of Liberty", country: "United States", level: "easy" },
  "christ-the-redeemer": { wiki: "Christ the Redeemer (statue)", q: "Christ the Redeemer statue Rio", name: "Christ the Redeemer", country: "Brazil", level: "easy" },
  "mount-rushmore": { wiki: "Mount Rushmore", q: "Mount Rushmore", name: "Mount Rushmore", country: "United States", level: "easy" },
  "great-sphinx-of-giza": { wiki: "Great Sphinx of Giza", q: "Great Sphinx of Giza", name: "Great Sphinx of Giza", country: "Egypt", level: "easy" },
  "venus-de-milo": { wiki: "Venus de Milo", q: "Venus de Milo Louvre", name: "Venus de Milo", country: "France", level: "easy" },
  "lincoln-memorial-statue": { wiki: "Abraham Lincoln (Lincoln Memorial)", q: "Lincoln Memorial statue seated", name: "Lincoln Memorial Statue", country: "United States", level: "easy" },
  "winged-victory-of-samothrace": { wiki: "Winged Victory of Samothrace", q: "Winged Victory of Samothrace Louvre", name: "Winged Victory of Samothrace", country: "France", level: "easy" },
  "charging-bull": { wiki: "Charging Bull", q: "Charging Bull Wall Street", name: "Charging Bull", country: "United States", level: "easy" },
  "nelsons-column": { wiki: "Nelson's Column", q: "Nelson's Column statue Trafalgar Square", name: "Nelson's Column", country: "United Kingdom", level: "easy" },
  "merlion": { wiki: "Merlion", q: "Merlion Singapore statue", name: "Merlion", country: "Singapore", level: "easy" },
  "angel-of-independence": { wiki: "Angel of Independence", q: "Angel of Independence Mexico City", name: "Angel of Independence", country: "Mexico", level: "easy" },
  "statue-of-unity": { wiki: "Statue of Unity", q: "Statue of Unity India", name: "Statue of Unity", country: "India", level: "easy" },
  "iwo-jima-memorial": { wiki: "Marine Corps War Memorial", q: "Iwo Jima Memorial statue", name: "Marine Corps War Memorial (Iwo Jima)", country: "United States", level: "easy" },
  "tian-tan-buddha": { wiki: "Tian Tan Buddha", q: "Tian Tan Buddha Hong Kong", name: "Tian Tan Buddha", country: "Hong Kong", level: "easy" },
  "great-buddha-of-kamakura": { wiki: "Great Buddha of Kamakura", q: "Great Buddha of Kamakura statue", name: "Great Buddha of Kamakura", country: "Japan", level: "easy" },
  "angel-of-the-north": { wiki: "Angel of the North", q: "Angel of the North sculpture", name: "Angel of the North", country: "United Kingdom", level: "easy" },
  "queen-victoria-memorial": { wiki: "Victoria Memorial, London", q: "Victoria Memorial London statue", name: "Victoria Memorial", country: "United Kingdom", level: "easy" },
  "fearless-girl": { wiki: "Fearless Girl", q: "Fearless Girl statue", name: "Fearless Girl", country: "United States", level: "easy" },

  // MEDIUM (18)
  "motherland-calls": { wiki: "The Motherland Calls", q: "The Motherland Calls statue Volgograd", name: "The Motherland Calls", country: "Russia", level: "medium" },
  "the-thinker-rodin": { wiki: "The Thinker", q: "The Thinker Rodin statue", name: "The Thinker", country: "France", level: "medium" },
  "david-michelangelo": { wiki: "David (Michelangelo)", q: "David Michelangelo statue Florence", name: "David (Michelangelo)", country: "Italy", level: "medium" },
  "manneken-pis": { wiki: "Manneken Pis", q: "Manneken Pis Brussels", name: "Manneken Pis", country: "Belgium", level: "medium" },
  "little-mermaid-copenhagen": { wiki: "The Little Mermaid (statue)", q: "Little Mermaid statue Copenhagen", name: "The Little Mermaid", country: "Denmark", level: "medium" },
  "nefertiti-bust": { wiki: "Nefertiti Bust", q: "Nefertiti bust Neues Museum", name: "Bust of Nefertiti", country: "Germany", level: "medium" },
  "pieta-michelangelo": { wiki: "Pietà (Michelangelo)", q: "Pieta Michelangelo St Peter's Basilica", name: "Pietà (Michelangelo)", country: "Vatican City", level: "medium" },
  "martin-luther-king-memorial": { wiki: "Martin Luther King Jr. Memorial", q: "Martin Luther King Jr Memorial statue Stone of Hope", name: "Martin Luther King Jr. Memorial", country: "United States", level: "medium" },
  "great-buddha-of-nara": { wiki: "Vairocana Buddha (Tōdai-ji)", q: "Great Buddha Nara Todai-ji statue", name: "Great Buddha of Nara", country: "Japan", level: "medium" },
  "wat-pho-reclining-buddha": { wiki: "Wat Pho", q: "Reclining Buddha Wat Pho Bangkok statue", name: "Reclining Buddha of Wat Pho", country: "Thailand", level: "medium" },
  "golden-buddha-wat-traimit": { wiki: "Wat Traimit", q: "Golden Buddha Wat Traimit statue", name: "Golden Buddha of Wat Traimit", country: "Thailand", level: "medium" },
  "bronze-horseman": { wiki: "The Bronze Horseman", q: "Bronze Horseman statue Saint Petersburg", name: "The Bronze Horseman", country: "Russia", level: "medium" },
  "discobolus": { wiki: "Discobolus", q: "Discobolus statue ancient Roman copy", name: "Discobolus", country: "Italy", level: "medium" },
  "christopher-columbus-monument-barcelona": { wiki: "Columbus Monument, Barcelona", q: "Columbus Monument Barcelona statue", name: "Columbus Monument", country: "Spain", level: "medium" },
  "motherland-monument-kyiv": { wiki: "Motherland Monument", q: "Motherland Monument Kyiv statue", name: "Motherland Monument", country: "Ukraine", level: "medium" },
  "peter-the-great-statue-moscow": { wiki: "Peter the Great Statue, Moscow", q: "Peter the Great statue Moscow Tsereteli", name: "Peter the Great Statue", country: "Russia", level: "medium" },
  "laocoon-and-his-sons": { wiki: "Laocoön and His Sons", q: "Laocoon and His Sons statue Vatican", name: "Laocoön and His Sons", country: "Vatican City", level: "medium" },
  "cristo-rei-almada": { wiki: "Cristo Rei", q: "Cristo Rei Almada statue", name: "Cristo Rei", country: "Portugal", level: "medium" },

  // HARD (18)
  "perseus-with-the-head-of-medusa": { wiki: "Perseus with the Head of Medusa", q: "Perseus with the Head of Medusa Cellini statue Florence", name: "Perseus with the Head of Medusa", country: "Italy", level: "hard" },
  "leshan-giant-buddha": { wiki: "Leshan Giant Buddha", q: "Leshan Giant Buddha statue", name: "Leshan Giant Buddha", country: "China", level: "hard" },
  "colossi-of-memnon": { wiki: "Colossi of Memnon", q: "Colossi of Memnon statues Luxor", name: "Colossi of Memnon", country: "Egypt", level: "hard" },
  "heroes-square-millennium-monument": { wiki: "Millennium Monument (Budapest)", q: "Millennium Monument Heroes Square Budapest statue", name: "Millennium Monument, Heroes' Square", country: "Hungary", level: "hard" },
  "the-kelpies": { wiki: "The Kelpies", q: "The Kelpies sculpture Scotland", name: "The Kelpies", country: "United Kingdom", level: "hard" },
  "peter-pan-statue-kensington": { wiki: "Peter Pan (statue)", q: "Peter Pan statue Kensington Gardens", name: "Peter Pan Statue", country: "United Kingdom", level: "hard" },
  "alice-in-wonderland-statue": { wiki: "Alice in Wonderland (sculpture)", q: "Alice in Wonderland statue Central Park", name: "Alice in Wonderland Statue", country: "United States", level: "hard" },
  "cristo-de-la-concordia": { wiki: "Cristo de la Concordia", q: "Cristo de la Concordia statue Cochabamba", name: "Cristo de la Concordia", country: "Bolivia", level: "hard" },
  "christ-the-king-swiebodzin": { wiki: "Christ the King (Świebodzin)", q: "Christ the King statue Swiebodzin Poland", name: "Christ the King Statue", country: "Poland", level: "hard" },
  "apollo-belvedere": { wiki: "Apollo Belvedere", q: "Apollo Belvedere statue Vatican", name: "Apollo Belvedere", country: "Vatican City", level: "hard" },
  "bamiyan-buddhas": { wiki: "Buddhas of Bamiyan", q: "Buddhas of Bamiyan statue niche", name: "Buddhas of Bamiyan", country: "Afghanistan", level: "hard" },
  "alexander-the-great-skopje": { wiki: "Warrior on a Horse", q: "Warrior on a Horse statue Skopje Alexander", name: "Warrior on a Horse (Alexander the Great)", country: "North Macedonia", level: "hard" },
  "vulcan-statue-birmingham": { wiki: "Vulcan (Birmingham)", q: "Vulcan statue Birmingham Alabama", name: "Vulcan Statue", country: "United States", level: "hard" },
  "cristo-blanco-cusco": { wiki: "Cristo Blanco (Cusco)", q: "Cristo Blanco statue Cusco Peru", name: "Cristo Blanco", country: "Peru", level: "hard" },
  "boudicca-statue-london": { wiki: "Statue of Boudica, London", q: "Statue of Boudica London statue", name: "Statue of Boudica", country: "United Kingdom", level: "hard" },
  "richard-the-lionheart-statue": { wiki: "Statue of Richard I, Palace of Westminster", q: "Statue of Richard the Lionheart Westminster", name: "Statue of Richard the Lionheart", country: "United Kingdom", level: "hard" },
  "spring-temple-buddha": { wiki: "Spring Temple Buddha", q: "Spring Temple Buddha statue China", name: "Spring Temple Buddha", country: "China", level: "hard" },
  "african-renaissance-monument": { wiki: "African Renaissance Monument", q: "African Renaissance Monument Dakar statue", name: "African Renaissance Monument", country: "Senegal", level: "hard" },

  // IMPOSSIBLE (18)
  "monument-to-the-battle-of-the-nations": { wiki: "Monument to the Battle of the Nations", q: "Monument to the Battle of the Nations Leipzig", name: "Monument to the Battle of the Nations", country: "Germany", level: "impossible" },
  "genghis-khan-equestrian-statue": { wiki: "Genghis Khan Equestrian Statue", q: "Genghis Khan Equestrian Statue Mongolia", name: "Genghis Khan Equestrian Statue", country: "Mongolia", level: "impossible" },
  "ushiku-daibutsu": { wiki: "Ushiku Daibutsu", q: "Ushiku Daibutsu statue Japan", name: "Ushiku Daibutsu", country: "Japan", level: "impossible" },
  "awakening-sculpture": { wiki: "The Awakening (sculpture)", q: "The Awakening sculpture Seward Johnson", name: "The Awakening", country: "United States", level: "impossible" },
  "tear-of-grief": { wiki: "To the Struggle Against World Terrorism", q: "Tear of Grief statue Bayonne New Jersey Tsereteli", name: "Tear of Grief", country: "United States", level: "impossible" },
  "skanderbeg-statue-tirana": { wiki: "Skanderbeg Square", q: "Skanderbeg equestrian statue Tirana", name: "Skanderbeg Statue", country: "Albania", level: "impossible" },
  "guanyin-of-nanshan": { wiki: "Guanyin of the South Sea of Sanya", q: "Guanyin of the South Sea of Sanya statue", name: "Guanyin of Nanshan", country: "China", level: "impossible" },
  "diana-princess-of-wales-statue": { wiki: "Diana, Princess of Wales statue, Kensington Palace", q: "Diana Princess of Wales statue Kensington Palace", name: "Diana, Princess of Wales Memorial Statue", country: "United Kingdom", level: "impossible" },
  "bahubali-statue-shravanabelagola": { wiki: "Gommateshwara statue", q: "Gommateshwara Bahubali statue Shravanabelagola", name: "Statue of Gommateshwara (Bahubali)", country: "India", level: "impossible" },
  "lamassu-winged-bull": { wiki: "Lamassu", q: "Lamassu winged bull statue Nineveh museum", name: "Lamassu (Winged Bull of Nineveh)", country: "Iraq", level: "impossible" },
  "hermannsdenkmal": { wiki: "Hermannsdenkmal", q: "Hermannsdenkmal statue Germany", name: "Hermannsdenkmal", country: "Germany", level: "impossible" },
  "alyosha-monument-plovdiv": { wiki: "Alyosha Monument", q: "Alyosha Monument statue Plovdiv", name: "Alyosha Monument", country: "Bulgaria", level: "impossible" },
  "vercingetorix-statue": { wiki: "Statue of Vercingetorix", q: "Vercingetorix statue Bartholdi", name: "Statue of Vercingetorix", country: "France", level: "impossible" },
  "leonidas-monument-thermopylae": { wiki: "Leonidas Monument", q: "Leonidas Monument statue Thermopylae", name: "Leonidas Monument", country: "Greece", level: "impossible" },
  "cerro-de-los-angeles-christ": { wiki: "Cerro de los Ángeles", q: "Cerro de los Angeles Christ statue monument", name: "Sacred Heart Monument (Cerro de los Ángeles)", country: "Spain", level: "impossible" },
  "robin-hood-statue-nottingham": { wiki: "Robin Hood statue, Nottingham", q: "Robin Hood statue Nottingham Castle", name: "Robin Hood Statue", country: "United Kingdom", level: "impossible" },
  "ofuna-kannon": { wiki: "Ofuna Kannon", q: "Ofuna Kannon statue Japan", name: "Ofuna Kannon", country: "Japan", level: "impossible" },
  "colossus-of-barletta": { wiki: "Colossus of Barletta", q: "Colossus of Barletta statue Italy", name: "Colossus of Barletta", country: "Italy", level: "impossible" },
};

const UA = "GuessSyncQuizBot/1.0 (educational quiz)";
const DEST = "public/statues";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
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
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) {
      return { url: info.thumburl || info.url, title: p.title, extmetadata: info.extmetadata };
    }
  }
  return null;
}

function urlToFileTitle(url) {
  if (!url) return null;
  const m = url.match(/\/(?:commons|wikipedia\/[a-z]+)\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+?)(?:\/\d+px-[^/]+)?$/);
  if (!m) return null;
  let name = decodeURIComponent(m[1]);
  name = name.replace(/^\d+px-/, "");
  return "File:" + name;
}

async function licenseFor(fileTitle, isEnwiki) {
  const host = isEnwiki ? "en.wikipedia.org" : "commons.wikimedia.org";
  const api = `https://${host}/w/api.php?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=extmetadata`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const meta = page?.imageinfo?.[0]?.extmetadata;
  if (!meta) return null;
  return meta;
}

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, "").trim();

function buildAttribution(meta) {
  if (!meta) return { license: "unknown", attribution: "" };
  const license = meta.LicenseShortName?.value || "unknown";
  const artist = stripHtml(meta.Artist?.value);
  if (/public domain|^pd$|cc0/i.test(license)) {
    return { license, attribution: artist ? `Public domain — ${artist}` : "Public domain" };
  }
  if (/^cc[- ]by/i.test(license)) {
    return { license, attribution: artist ? `${artist} / ${license}` : `Unknown author / ${license}` };
  }
  return { license, attribution: artist ? `${artist} / ${license}` : license };
}

const report = [];
const entries = Object.entries(TARGETS);
for (const [slug, t] of entries) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(`\n${slug} (${t.wiki})`);
  let url = await pageImage(t.wiki);
  let source = "wikipedia-pageimages";
  let sourceTitle = t.wiki;
  let extmeta = null;
  let isEnwikiFile = false;

  if (!url) {
    console.log("  pageimages failed, trying Commons search");
    const found = await commonsSearch(t.q);
    if (found) { url = found.url; source = "commons-search"; sourceTitle = found.title; extmeta = found.extmetadata; }
  }
  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug, title: t.name, status: "missing" });
    await new Promise((r) => setTimeout(r, 600));
    continue;
  }

  const r = await fetchWithRetry(url);
  if (!r || !r.ok) {
    console.log("  download failed");
    report.push({ slug, title: t.name, status: "download-fail", url });
    await new Promise((r2) => setTimeout(r2, 600));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 8000) {
    console.log(`  file too small (${buf.length}b), flagging`);
    report.push({ slug, title: t.name, status: "too-small", url, size: buf.length });
    await new Promise((r2) => setTimeout(r2, 600));
    continue;
  }
  writeFileSync(dest, buf);

  // resolve license/attribution if we don't already have it (commons-search path gives extmetadata inline)
  if (!extmeta) {
    const fileTitle = urlToFileTitle(url);
    if (fileTitle) {
      isEnwikiFile = /upload\.wikimedia\.org\/wikipedia\/en\//.test(url);
      extmeta = await licenseFor(fileTitle, isEnwikiFile);
    }
  }
  const { license, attribution } = buildAttribution(extmeta);
  console.log(`  OK (${buf.length} bytes) via ${source} | ${license}`);
  report.push({ slug, status: "ok", source, title: sourceTitle, license, attribution, size: buf.length, url });
  await new Promise((r2) => setTimeout(r2, 700));
}

writeFileSync("out/e51-statues-fetch-report-raw.json", JSON.stringify(report, null, 2));
const ok = report.filter((r) => r.status === "ok");
const bad = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${ok.length}/${report.length} ok.`);
if (bad.length) console.log("NEEDS FIX:", bad.map((b) => b.slug).join(", "));
