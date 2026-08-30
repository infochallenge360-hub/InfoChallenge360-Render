// Fetches real public-domain portrait/photo images for the Guess the
// Historical Figure episode from Wikipedia's pageimages API (free, keyless,
// per quiz-free-images memory). Sequential requests + a real User-Agent to
// avoid Wikimedia throttling (parallel requests at concurrency >3 have
// caused 0-byte responses on prior episodes).
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { HISTORICAL_FIGURES_E93 } from "../src/Quiz/historicalFiguresE93Data.js";

const DEST = "public/historicalfigures93";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchThumb(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const json = await res.json();
  const pages = Object.values(json.query.pages);
  return pages[0]?.thumbnail?.source || null;
}

const only = process.argv[2] ? process.argv.slice(2) : null;
let ok = 0, fail = [];
for (const item of HISTORICAL_FIGURES_E93) {
  if (only && !only.includes(item.slug)) continue;
  const out = `${DEST}/${item.slug}.jpg`;
  try {
    const src = await fetchThumb(item.wiki);
    if (!src) throw new Error("no thumbnail found");
    const imgRes = await fetch(src, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (buf.length < 3000) throw new Error(`suspiciously small (${buf.length} bytes)`);
    writeFileSync(out, buf);
    console.log("ok", item.slug, `(${buf.length} bytes)`);
    ok++;
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
    fail.push(item.slug);
  }
  await sleep(400);
}
console.log(`\n${ok}/${only ? only.length : HISTORICAL_FIGURES_E93.length} fetched.`);
if (fail.length) console.log("failed:", fail.join(", "));
