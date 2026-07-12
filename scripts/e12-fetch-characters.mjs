// Fetches official character art for E12 (animated movie characters) via Wikipedia.
// Like E11, most animated-character art on Wikipedia is "non-free" (fair-use) rather than
// Commons-licensed, so we go straight to the infobox-image heuristic (generator=images)
// instead of the free-only pageimages API. Same nominative/fair-use identification usage
// already accepted for the video-game-character episode.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { MOVIE_CHARACTERS_E12 } from "../src/Quiz/movieCharactersE12Data.js";

const UA = "InfoChallenge360Bot/1.0 (educational quiz)";
const DEST = "public/moviechars";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TITLE_OVERRIDE = {
  "mickey-mouse": "Mickey Mouse",
  "elsa-frozen": "Elsa (Frozen)",
  shrek: "Shrek (character)",
  minions: "Minions (Despicable Me)",
  "woody-toy-story": "Woody (Toy Story)",
  "buzz-lightyear": "Buzz Lightyear",
  simba: "Simba",
  "ariel-little-mermaid": "Ariel (The Little Mermaid)",
  dory: "Dory (Finding Nemo)",
  "genie-aladdin": "Genie (Aladdin)",
  stitch: "Stitch (Lilo & Stitch)",
  "snow-white": "Snow White",
  nemo: "Nemo (Finding Nemo)",
  gru: "Gru (Despicable Me)",
  "aladdin-character": "Aladdin (character)",
  olaf: "Olaf (Frozen)",
  "mike-wazowski": "Mike Wazowski",
  sulley: "James P. Sullivan",
  "anna-frozen": "Anna (Frozen)",
  belle: "Belle (Beauty and the Beast)",
  "donkey-shrek": "Donkey (Shrek)",
  "lightning-mcqueen": "Lightning McQueen",
  "wall-e": "WALL-E",
  toothless: "Toothless (How to Train Your Dragon)",
  "po-kung-fu-panda": "Po (Kung Fu Panda)",
  "judy-hopps": "Judy Hopps",
  baymax: "Baymax",
  totoro: "Totoro",
  mater: "Mater (Cars)",
  "puss-in-boots": "Puss in Boots (Shrek)",
  "fiona-shrek": "Fiona (Shrek)",
  "remy-ratatouille": "Remy (Ratatouille)",
  hiccup: "Hiccup Horrendous Haddock III",
  "carl-fredricksen": "Carl Fredricksen",
  "rapunzel-tangled": "Rapunzel (Tangled)",
  moana: "Moana (Disney character)",
  "mr-incredible": "Mr. Incredible",
  "joy-inside-out": "Joy (Inside Out)",
  "mulan-character": "Mulan (character)",
  "scar-lion-king": "Scar (The Lion King)",
  ursula: "Ursula (The Little Mermaid)",
  "maleficent-animated": "Maleficent",
  merida: "Merida (Brave)",
  scrat: "Scrat",
  "sid-sloth": "Sid (Ice Age)",
  "anastasia-1997": "Anastasia (1997 film)",
  "no-face": "No-Face",
  "miles-morales-animated": "Miles Morales (Spider-Man: Into the Spider-Verse)",
  "nick-wilde": "Nick Wilde",
  "alex-the-lion": "Alex (Madagascar)",
  "grinch-animated": "The Grinch",
  "edna-mode": "Edna Mode",
  "coraline-jones": "Coraline Jones",
  gromit: "Gromit",
  "milo-thatch": "Milo Thatch",
  "iron-giant": "The Iron Giant (character)",
  balto: "Balto (film)",
  littlefoot: "Littlefoot",
  kubo: "Kubo and the Two Strings",
  "robyn-goodfellowe": "Wolfwalkers",
  "saoirse-song-of-the-sea": "Song of the Sea (2014 film)",
  "brendan-secret-of-kells": "The Secret of Kells",
  "max-mary-and-max": "Mary and Max",
  "klaus-2019": "Klaus (2019 film)",
  "cale-tucker": "Titan A.E.",
  "kayley-quest-for-camelot": "Quest for Camelot",
  "osmosis-jones": "Osmosis Jones (character)",
  "sinbad-legend-seven-seas": "Sinbad: Legend of the Seven Seas",
  "chanticleer-rock-a-doodle": "Rock-A-Doodle",
  "odette-swan-princess": "The Swan Princess",
  "tack-thief-and-cobbler": "The Thief and the Cobbler",
};

async function fetchJsonWithRetry(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      const text = await r.text();
      if (r.ok && text.trim().startsWith("{")) return JSON.parse(text);
    } catch {}
    await sleep(2000 * (attempt + 1));
  }
  return null;
}

const BAD_FILE_PATTERN = /\.(svg|ogg|oga|webm)$|commons-logo|wiki(pedia|media|data)[-_]?logo|edit-icon|semi-protection|padlock|question[_-]?mark|disambig|symbol[_-]?(support|category|template)/i;

async function bestInfoboxImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(title)}&generator=images&gimlimit=20&prop=imageinfo&iiprop=url|size|extmetadata`;
  const j = await fetchJsonWithRetry(api);
  if (!j || !j.query || !j.query.pages) return null;
  const pages = Object.values(j.query.pages);
  const candidates = pages
    .filter((p) => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url)
    .map((p) => ({ title: p.title, info: p.imageinfo[0] }))
    .filter((c) => !BAD_FILE_PATTERN.test(c.title))
    .filter((c) => c.info.width >= 150 && c.info.height >= 150);
  if (!candidates.length) return null;
  candidates.sort((a, b) => (b.info.width * b.info.height) - (a.info.width * a.info.height));
  const best = candidates[0];
  return { url: best.info.url, filename: best.title.replace(/^File:/, "") };
}

function isRealImage(buf) {
  if (buf.length < 2000) return false;
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8;
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  return jpeg || png;
}

async function download(url, path) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return { ok: false, reason: `http-${r.status}` };
  const buf = Buffer.from(await r.arrayBuffer());
  if (!isRealImage(buf)) return { ok: false, reason: "not-real-image" };
  writeFileSync(path, buf);
  return { ok: true, size: buf.length };
}

const results = [];
let n = 0;
for (const it of MOVIE_CHARACTERS_E12) {
  n++;
  const outPath = `${DEST}/${it.slug}.jpg`;
  if (existsSync(outPath)) { results.push({ slug: it.slug, name: it.name, status: "SKIP_EXISTS" }); console.error(`${n}/71 ${it.slug}: SKIP`); continue; }
  const title = TITLE_OVERRIDE[it.slug] || it.name;
  try {
    const found = await bestInfoboxImage(title);
    await sleep(900);
    if (!found) { results.push({ slug: it.slug, name: it.name, status: "NO_IMAGE", triedTitle: title }); console.error(`${n}/71 ${it.slug}: NO_IMAGE (tried "${title}")`); continue; }
    const dl = await download(found.url, outPath);
    await sleep(900);
    if (!dl.ok) { results.push({ slug: it.slug, name: it.name, status: "DL_FAIL", reason: dl.reason, filename: found.filename }); console.error(`${n}/71 ${it.slug}: DL_FAIL ${dl.reason}`); continue; }
    results.push({ slug: it.slug, name: it.name, status: "OK", size: dl.size, filename: found.filename });
    console.error(`${n}/71 ${it.slug}: OK (${dl.size}b, via "${found.filename}")`);
  } catch (e) {
    results.push({ slug: it.slug, name: it.name, status: "ERR", err: String(e) });
    console.error(`${n}/71 ${it.slug}: ERR ${e.message}`);
  }
}

const ok = results.filter((r) => r.status === "OK" || r.status === "SKIP_EXISTS");
const bad = results.filter((r) => r.status !== "OK" && r.status !== "SKIP_EXISTS");
console.log(`\nOK ${ok.length} / ${MOVIE_CHARACTERS_E12.length}`);
if (bad.length) { console.log("NEED FALLBACK:"); for (const b of bad) console.log(` - ${b.slug} (${b.name}): ${b.status} ${b.reason || ""}`); }
writeFileSync("scripts/e12-fetch-report.json", JSON.stringify(results, null, 2), "utf8");
