import { readFileSync, writeFileSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";
const urls = JSON.parse(readFileSync("out/nokia68-refix-urls.json", "utf8"));

async function download(slug, url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 8000 && buf.slice(0, 9).toString() !== "<!DOCTYPE" && buf.slice(0, 20).toString() !== "You are making too ") {
      writeFileSync(`public/nokia68/${slug}.jpg`, buf);
      console.log(slug, buf.length, "bytes OK");
      return true;
    }
    console.log(slug, "attempt", i, "failed, retrying...");
    await new Promise((res) => setTimeout(res, 5000 * (i + 1)));
  }
  console.log(slug, "GAVE UP");
  return false;
}

for (const [slug, info] of Object.entries(urls)) {
  if (info.error) { console.log(slug, "skip (no url)"); continue; }
  await download(slug, info.url);
  await new Promise((r) => setTimeout(r, 2500));
}
