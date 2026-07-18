import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/consoles";
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
  "playstation": "PlayStation",
  "xbox": "Xbox",
  "nintendo-switch": "Nintendo Switch",
  "wii": "Wii",
  "game-boy": "Game Boy",
  "nintendo-64": "Nintendo 64",
  "sega-genesis": "Sega Genesis",
  "playstation-2": "PlayStation 2",
  "xbox-360": "Xbox 360",
  "wii-u": "Wii U",
  "nintendo-ds": "Nintendo DS",
  "playstation-4": "PlayStation 4",
  "xbox-one": "Xbox One",
  "gamecube": "GameCube",
  "sega-dreamcast": "Dreamcast",
  "atari-2600": "Atari 2600",
  "playstation-5": "PlayStation 5",
  "xbox-series-x": "Xbox Series X and Series S",
  "super-nintendo": "Super Nintendo Entertainment System",
  "nes": "Nintendo Entertainment System",
  "sega-saturn": "Sega Saturn",
  "sega-master-system": "Master System",
  "nintendo-3ds": "Nintendo 3DS",
  "playstation-portable": "PlayStation Portable",
  "playstation-vita": "PlayStation Vita",
  "sega-game-gear": "Game Gear",
  "neo-geo": "Neo Geo",
  "turbografx-16": "TurboGrafx-16",
  "commodore-64": "Commodore 64",
  "colecovision": "ColecoVision",
  "intellivision": "Intellivision",
  "virtual-boy": "Virtual Boy",
  "steam-deck": "Steam Deck",
  "nintendo-switch-lite": "Nintendo Switch Lite",
  "xbox-series-s": "Xbox Series X and Series S",
  "atari-5200": "Atari 5200",
  "atari-7800": "Atari 7800",
  "atari-jaguar": "Atari Jaguar",
  "3do-interactive-multiplayer": "3DO Interactive Multiplayer",
  "sega-32x": "Sega 32X",
  "philips-cd-i": "CD-i",
  "nokia-n-gage": "Nokia N-Gage",
  "wonderswan": "WonderSwan",
  "neo-geo-pocket": "Neo Geo Pocket",
  "magnavox-odyssey": "Magnavox Odyssey",
  "vectrex": "Vectrex",
  "atari-lynx": "Atari Lynx",
  "sega-nomad": "Sega Nomad",
  "pokemon-mini": "Pokémon Mini",
  "gizmondo": "Gizmondo",
  "ouya": "Ouya",
  "nvidia-shield": "Nvidia Shield",
  "sega-game-gear-micro": "Game Gear Micro",
  "amstrad-gx4000": "Amstrad GX4000",
  "fairchild-channel-f": "Fairchild Channel F",
  "rca-studio-ii": "RCA Studio II",
  "bally-astrocade": "Bally Astrocade",
  "emerson-arcadia-2001": "Emerson Arcadia 2001",
  "entex-adventure-vision": "Entex Adventure Vision",
  "coleco-telstar": "Coleco Telstar",
  "apf-imagination-machine": "APF Imagination Machine",
  "interton-vc-4000": "Interton VC 4000",
  "vtech-creativision": "CreatiVision",
  "casio-pv-1000": "Casio PV-1000",
  "epoch-cassette-vision": "Cassette Vision",
  "tomy-tutor": "Tomy Tutor",
  "watara-supervision": "Watara Supervision",
  "tiger-r-zone": "Tiger R-Zone",
  "amiga-cd32": "Amiga CD32",
  "pioneer-laseractive": "Pioneer LaserActive",
  "gp2x": "GP2X",
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

writeFileSync("out/e30-gaming-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
