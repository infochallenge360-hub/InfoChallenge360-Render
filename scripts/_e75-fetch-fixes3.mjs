import { writeFileSync } from "node:fs";

const UA = "InfoChallenge360Bot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";

const files = {
  "ducati-panigale": "2020 Ducati Panigale V4 Superleggera.jpg",
  "bsa-gold-star": "BSA Gold Star 500cc (1956).jpg",
  "harley-davidson-iron-883": "Harley-davidson-sportster-iron-883.jpg",
  "harley-davidson-sportster": "Harley-Davidson Sportster 1200 (2004).jpg",
  "honda-cbr600rr": "Blue 2007 Honda CBR600RR left front.jpg",
  "suzuki-boulevard": "Suzuki Boulevard M109R black.jpg",
  "vespa-gts": "Vespa GTS 300 Super 2.jpg",
  "triumph-tiger": "Triumph Tiger 1200 XRt (1).jpg",
  "yamaha-sr400": "Yamaha SR400 2014.JPG",
  "rokon-trail-breaker": "Rokon Trail Blaser pic2B.jpg",
};

async function getUrl(filename) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + filename)}&prop=imageinfo&iiprop=url&iiurlwidth=1400`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const pages = Object.values(j.query.pages);
  const ii = pages[0]?.imageinfo?.[0];
  return ii?.thumburl || ii?.url || null;
}

for (const [slug, filename] of Object.entries(files)) {
  try {
    const url = await getUrl(filename);
    if (!url) { console.log(`${slug} -> NO URL for ${filename}`); continue; }
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(`out/_fix3-${slug}.jpg`, buf);
    console.log(`${slug} -> ${buf.length} bytes from ${filename}`);
  } catch (e) {
    console.log(`${slug} -> ERROR ${e.message}`);
  }
  await new Promise(r => setTimeout(r, 1200));
}
