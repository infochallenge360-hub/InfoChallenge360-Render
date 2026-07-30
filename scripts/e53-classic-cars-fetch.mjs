import { writeFileSync, existsSync, mkdirSync } from "node:fs";

// slug -> { wiki: preferred Wikipedia article title, q: Commons search fallback query, name, level }
const TARGETS = {
  // EASY (19) — ~70-95% globally recognizable silhouette
  "volkswagen-beetle": { wiki: "Volkswagen Beetle", q: "Volkswagen Beetle classic car side", name: "Volkswagen Beetle", level: "easy" },
  "mini-cooper": { wiki: "Mini (marque)", q: "classic Mini Cooper car side view", name: "Mini Cooper (Classic Mini)", level: "easy" },
  "ford-mustang": { wiki: "Ford Mustang (first generation)", q: "1965 Ford Mustang side view", name: "Ford Mustang", level: "easy" },
  "delorean-dmc-12": { wiki: "DeLorean DMC-12", q: "DeLorean DMC-12 car", name: "DeLorean DMC-12", level: "easy" },
  "volkswagen-bus": { wiki: "Volkswagen Type 2", q: "Volkswagen Type 2 microbus side view", name: "Volkswagen Type 2 (Microbus)", level: "easy" },
  "fiat-500-classic": { wiki: "Fiat 500 (1957)", q: "Fiat 500 Nuova classic car", name: "Fiat 500 (Classic)", level: "easy" },
  "porsche-911": { wiki: "Porsche 911", q: "Porsche 911 side view car", name: "Porsche 911", level: "easy" },
  "chevrolet-corvette": { wiki: "Chevrolet Corvette (C1)", q: "Chevrolet Corvette C1 side view", name: "Chevrolet Corvette", level: "easy" },
  "jeep-wrangler": { wiki: "Jeep Wrangler", q: "Jeep Wrangler side view car", name: "Jeep Wrangler", level: "easy" },
  "citroen-2cv": { wiki: "Citroën 2CV", q: "Citroen 2CV car side view", name: "Citroën 2CV", level: "easy" },
  "land-rover-defender": { wiki: "Land Rover Defender", q: "Land Rover Defender side view", name: "Land Rover Defender", level: "easy" },
  "rolls-royce-silver-shadow": { wiki: "Rolls-Royce Silver Shadow", q: "Rolls-Royce Silver Shadow car side", name: "Rolls-Royce Silver Shadow", level: "easy" },
  "lamborghini-countach": { wiki: "Lamborghini Countach", q: "Lamborghini Countach side view", name: "Lamborghini Countach", level: "easy" },
  "ferrari-testarossa": { wiki: "Ferrari Testarossa", q: "Ferrari Testarossa side view", name: "Ferrari Testarossa", level: "easy" },
  "cadillac-eldorado": { wiki: "Cadillac Eldorado", q: "1959 Cadillac Eldorado tailfins", name: "Cadillac Eldorado", level: "easy" },
  "smart-fortwo": { wiki: "Smart Fortwo", q: "Smart Fortwo car side view", name: "Smart Fortwo", level: "easy" },
  "ford-model-t": { wiki: "Ford Model T", q: "Ford Model T car", name: "Ford Model T", level: "easy" },
  "volkswagen-golf": { wiki: "Volkswagen Golf Mk1", q: "Volkswagen Golf Mk1 GTI side view", name: "Volkswagen Golf", level: "easy" },
  "austin-fx4-london-taxi": { wiki: "Austin FX4", q: "London black cab Austin FX4", name: "Austin FX4 (London Taxi)", level: "easy" },

  // MEDIUM (19) — ~35-70%, most have seen it
  "toyota-corolla": { wiki: "Toyota Corolla", q: "Toyota Corolla car side view", name: "Toyota Corolla", level: "medium" },
  "honda-civic": { wiki: "Honda Civic", q: "Honda Civic car side view", name: "Honda Civic", level: "medium" },
  "chevrolet-camaro": { wiki: "Chevrolet Camaro", q: "Chevrolet Camaro first generation side view", name: "Chevrolet Camaro", level: "medium" },
  "dodge-charger": { wiki: "Dodge Charger (B-body)", q: "1969 Dodge Charger side view", name: "Dodge Charger", level: "medium" },
  "ferrari-250-gto": { wiki: "Ferrari 250 GTO", q: "Ferrari 250 GTO side view", name: "Ferrari 250 GTO", level: "medium" },
  "nissan-skyline-gtr-r34": { wiki: "Nissan Skyline GT-R (R34)", q: "Nissan Skyline GT-R R34 side view", name: "Nissan Skyline GT-R (R34)", level: "medium" },
  "toyota-supra-a80": { wiki: "Toyota Supra (A80)", q: "Toyota Supra A80 side view", name: "Toyota Supra (A80)", level: "medium" },
  "mazda-mx5-miata": { wiki: "Mazda MX-5", q: "Mazda MX-5 Miata side view", name: "Mazda MX-5 (Miata)", level: "medium" },
  "range-rover-classic": { wiki: "Range Rover (first generation)", q: "Range Rover Classic side view", name: "Range Rover (Classic)", level: "medium" },
  "volvo-240": { wiki: "Volvo 240", q: "Volvo 240 estate side view", name: "Volvo 240", level: "medium" },
  "fiat-panda": { wiki: "Fiat Panda (1980)", q: "Fiat Panda 1980 side view", name: "Fiat Panda", level: "medium" },
  "renault-4": { wiki: "Renault 4", q: "Renault 4 car side view", name: "Renault 4", level: "medium" },
  "chevrolet-bel-air-1957": { wiki: "Chevrolet Bel Air", q: "1957 Chevrolet Bel Air side view", name: "Chevrolet Bel Air (1957)", level: "medium" },
  "hummer-h2": { wiki: "Hummer H2", q: "Hummer H2 side view", name: "Hummer H2", level: "medium" },
  "volkswagen-karmann-ghia": { wiki: "Volkswagen Karmann Ghia", q: "Volkswagen Karmann Ghia side view", name: "Volkswagen Karmann Ghia", level: "medium" },
  "toyota-land-cruiser": { wiki: "Toyota Land Cruiser", q: "Toyota Land Cruiser side view", name: "Toyota Land Cruiser", level: "medium" },
  "mercedes-g-class": { wiki: "Mercedes-Benz G-Class", q: "Mercedes-Benz G-Class side view", name: "Mercedes-Benz G-Class", level: "medium" },
  "ford-focus": { wiki: "Ford Focus", q: "Ford Focus car side view", name: "Ford Focus", level: "medium" },
  "audi-quattro": { wiki: "Audi Quattro", q: "Audi Quattro Ur-Quattro side view", name: "Audi Quattro", level: "medium" },

  // HARD (18) — ~10-35%, enthusiasts recognize it
  "lancia-delta-integrale": { wiki: "Lancia Delta", q: "Lancia Delta Integrale side view", name: "Lancia Delta Integrale", level: "hard" },
  "datsun-240z": { wiki: "Datsun 240Z", q: "Datsun 240Z side view", name: "Datsun 240Z", level: "hard" },
  "alfa-romeo-giulietta": { wiki: "Alfa Romeo Giulietta (1954)", q: "Alfa Romeo Giulietta 1954 side view", name: "Alfa Romeo Giulietta", level: "hard" },
  "peugeot-205-gti": { wiki: "Peugeot 205", q: "Peugeot 205 GTI side view", name: "Peugeot 205 GTI", level: "hard" },
  "renault-5-turbo": { wiki: "Renault 5", q: "Renault 5 Turbo side view", name: "Renault 5 Turbo", level: "hard" },
  "saab-900": { wiki: "Saab 900", q: "Saab 900 classic side view", name: "Saab 900", level: "hard" },
  "triumph-spitfire": { wiki: "Triumph Spitfire", q: "Triumph Spitfire side view", name: "Triumph Spitfire", level: "hard" },
  "mgb": { wiki: "MG B", q: "MGB roadster side view", name: "MG B", level: "hard" },
  "opel-manta": { wiki: "Opel Manta", q: "Opel Manta side view", name: "Opel Manta", level: "hard" },
  "toyota-ae86": { wiki: "Toyota Corolla (E80)", q: "Toyota Corolla AE86 Trueno side view", name: "Toyota Corolla AE86 (Trueno)", level: "hard" },
  "honda-nsx": { wiki: "Honda NSX", q: "Honda NSX first generation side view", name: "Honda NSX", level: "hard" },
  "mitsubishi-lancer-evolution": { wiki: "Mitsubishi Lancer Evolution", q: "Mitsubishi Lancer Evolution side view", name: "Mitsubishi Lancer Evolution", level: "hard" },
  "subaru-impreza-wrx-sti": { wiki: "Subaru Impreza", q: "Subaru Impreza WRX STI side view", name: "Subaru Impreza WRX STI", level: "hard" },
  "volkswagen-corrado": { wiki: "Volkswagen Corrado", q: "Volkswagen Corrado side view", name: "Volkswagen Corrado", level: "hard" },
  "datsun-510": { wiki: "Datsun 510", q: "Datsun 510 side view", name: "Datsun 510", level: "hard" },
  "alpine-a110": { wiki: "Alpine A110", q: "Alpine A110 classic side view", name: "Renault Alpine A110", level: "hard" },
  "lotus-esprit": { wiki: "Lotus Esprit", q: "Lotus Esprit side view", name: "Lotus Esprit", level: "hard" },
  "plymouth-superbird": { wiki: "Plymouth Superbird", q: "Plymouth Superbird side view", name: "Plymouth Superbird", level: "hard" },

  // IMPOSSIBLE (18) — <10%, aimed <3%; genuinely obscure but real models
  "citroen-ds": { wiki: "Citroën DS", q: "Citroen DS side view", name: "Citroën DS", level: "impossible" },
  "saab-92": { wiki: "Saab 92", q: "Saab 92 classic car side view", name: "Saab 92", level: "impossible" },
  "trabant-601": { wiki: "Trabant 601", q: "Trabant 601 side view", name: "Trabant 601", level: "impossible" },
  "bristol-400": { wiki: "Bristol 400", q: "Bristol 400 car side view", name: "Bristol 400", level: "impossible" },
  "skoda-1000mb": { wiki: "Škoda 1000 MB", q: "Skoda 1000 MB side view", name: "Škoda 1000 MB", level: "impossible" },
  "tatra-77": { wiki: "Tatra 77", q: "Tatra 77 side view", name: "Tatra 77", level: "impossible" },
  "wartburg-353": { wiki: "Wartburg 353", q: "Wartburg 353 side view", name: "Wartburg 353", level: "impossible" },
  "reliant-robin": { wiki: "Reliant Robin", q: "Reliant Robin three wheeler side view", name: "Reliant Robin", level: "impossible" },
  "bmw-isetta": { wiki: "BMW Isetta", q: "BMW Isetta bubble car side view", name: "BMW Isetta", level: "impossible" },
  "subaru-360": { wiki: "Subaru 360", q: "Subaru 360 side view", name: "Subaru 360", level: "impossible" },
  "honda-n360": { wiki: "Honda N360", q: "Honda N360 kei car side view", name: "Honda N360", level: "impossible" },
  "daihatsu-midget": { wiki: "Daihatsu Midget", q: "Daihatsu Midget three wheeler", name: "Daihatsu Midget", level: "impossible" },
  "amphicar": { wiki: "Amphicar", q: "Amphicar 770 side view", name: "Amphicar 770", level: "impossible" },
  "messerschmitt-kr200": { wiki: "Messerschmitt KR200", q: "Messerschmitt KR200 bubble car side view", name: "Messerschmitt KR200", level: "impossible" },
  "fso-polonez": { wiki: "FSO Polonez", q: "FSO Polonez side view", name: "FSO Polonez", level: "impossible" },
  "zastava-yugo": { wiki: "Zastava Koral", q: "Zastava Yugo car side view", name: "Zastava Koral (Yugo)", level: "impossible" },
  "autobianchi-bianchina": { wiki: "Autobianchi Bianchina", q: "Autobianchi Bianchina side view", name: "Autobianchi Bianchina", level: "impossible" },
  "panhard-dyna-z": { wiki: "Panhard Dyna Z", q: "Panhard Dyna Z side view", name: "Panhard Dyna Z", level: "impossible" },
};

const UA = "GuessSyncQuizBot/1.0 (educational quiz)";
const DEST = "public/classic-cars";
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

writeFileSync("out/e53-classic-cars-fetch-report-raw.json", JSON.stringify(report, null, 2));
const ok = report.filter((r) => r.status === "ok");
const bad = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${ok.length}/${report.length} ok.`);
if (bad.length) console.log("NEEDS FIX:", bad.map((b) => b.slug).join(", "));
