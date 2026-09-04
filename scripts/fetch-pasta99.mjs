// Fetches real free photos for the Guess the Pasta Shape episode from
// Wikipedia's pageimages API (free, keyless, per quiz-free-images memory).
// Sequential requests + a real User-Agent to avoid Wikimedia throttling.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { PASTA_SHAPES_E99 } from "../src/Quiz/pastaShapesE99Data.js";

const DEST = "public/pasta99";
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
for (const item of PASTA_SHAPES_E99) {
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
  await sleep(1200);
}
console.log(`\n${ok}/${only ? only.length : PASTA_SHAPES_E99.length} fetched.`);
if (fail.length) console.log("failed:", fail.join(", "));
