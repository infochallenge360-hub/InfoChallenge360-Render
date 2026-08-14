const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";
const files = {
  "harley-davidson-fat-boy": "Harley Davidson Fat Boy 2018 FLFBS.jpg",
  "harley-davidson-road-king": "Harley-Davidson Road King (1).jpg",
  "indian-scout": "Indian Scout FTR750.jpg",
  "harley-davidson-street-glide": "Harley-Davidson Street Glide, Petrolia, Ontario, 2026-05-17 02.jpg",
  "yamaha-tenere-700": "Yamaha Ténéré 700 2025.jpg",
  "triumph-tiger": "Triumph Tiger 1200 XCA - Mondial de l'Automobile de Paris 2018 - 001.jpg",
  "ducati-scrambler": "Ducati Scrambler Icon right.JPG",
  "energica-ego": "Energica Ego Fully Charged Europe 2022 01.JPG",
  "husqvarna-vitpilen": "Husqvarna Vitpilen 401.jpg",
  "benelli-tnt": "Benelli TNT 899 S (3).jpg",
  "kawasaki-klr650": "2009 black Kawasaki KLR 650.jpg",
  "suzuki-v-strom": "Suzuki V-Strom 650 XT MY2018.jpg",
  "confederate-wraith": "Confederate Wraith B120 at 2007 Goodwood Festival of Speed.jpg",
  "cushman-eagle": "1957 Cushman Standard Cast Iron Eagle Lane Motor Museum.jpg",
  "ossa-mar": "Ossa Trials Motorcycle around 1976.jpg",
  "mz-etz": "MZ ETZ 251.jpg",
  "ural-gear-up": "2023 Ural Gear Up Caribbean.jpg",
  "cz-175": "ČZ 175 Special.JPG",
  "rokon-trail-breaker": "Rokon Trail-Breaker.JPG",
};

import { writeFileSync } from "node:fs";

for (const [slug, file] of Object.entries(files)) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + file)}&prop=imageinfo&iiprop=url&iiurlwidth=1200`;
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const url = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
  if (!url) { console.log("FAIL", slug, file, "no url"); continue; }
  const imgRes = await fetch(url, { headers: { "User-Agent": UA } });
  const buf = Buffer.from(await imgRes.arrayBuffer());
  writeFileSync(`public/moto75/${slug}.jpg`, buf);
  console.log("ok", slug, buf.length, "bytes");
  await new Promise((res) => setTimeout(res, 1200));
}
