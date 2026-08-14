import { writeFileSync } from "node:fs";

const UA = "InfoChallenge360Bot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";

const files = {
  "bultaco-sherpa": "Bultaco Sherpa T 250 1971 d.jpg",
  "horex-vr6": "Horex VR6 Classic,2019.jpg",
  "indian-chief": "Indian Chief Black Hawk 80 cubic inch 1950.jpg",
  "jawa-350": "Jawa 350.jpg",
  "indian-scout": "1940s Indian Scout (1) - The Art of the Motorcycle - Memphis.jpg",
  "cz-175": "ČZ 175 typ 501 Čezeta.JPG",
  "vyrus-987": "Vyrus 985 C3 4V.jpg",
  "voxan-wattman": "Voxan-Wattman-Biaggi-speed-records.jpg",
  "cushman-eagle": "1957 Cushman Standard Cast Iron Eagle Lane Motor Museum.jpg",
  "vespa": "1987 Piaggio Vespa PX.jpg",
  "harley-davidson-livewire": "Harley Davidson LiveWire right noBG.jpg",
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
    writeFileSync(`public/moto75/${slug}.jpg`, buf);
    console.log(`${slug} -> ${buf.length} bytes from ${filename}`);
  } catch (e) {
    console.log(`${slug} -> ERROR ${e.message}`);
  }
  await new Promise(r => setTimeout(r, 1200));
}
