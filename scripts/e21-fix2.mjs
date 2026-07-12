import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
// commons file search -> imageinfo url
async function commons(query, slug){
  const s=`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size&iiurlwidth=1200`;
  const r=await fetch(s,{headers:{"User-Agent":UA}});const t=await r.text();if(t[0]!=="{"){console.log(slug,"RATE");return;}
  const j=JSON.parse(t);const pages=j.query&&j.query.pages?Object.values(j.query.pages):[];
  // pick first jpg/png with decent width
  for(const p of pages){const ii=p.imageinfo&&p.imageinfo[0];if(!ii)continue;const u=ii.thumburl||ii.url;if(!/\.(jpg|jpeg|png)$/i.test(ii.url))continue;
    const rr=await fetch(u,{headers:{"User-Agent":UA}});const buf=Buffer.from(await rr.arrayBuffer());
    if(buf.length<15000)continue;writeFileSync(`public/fruits/${slug}.jpg`,buf);console.log(`${slug}: OK ${buf.length} | ${p.title}`);return;}
  console.log(`${slug}: NONE`);
}
await commons("green asparagus spears bunch","asparagus");
await new Promise(r=>setTimeout(r,4000));
await commons("salsify root Tragopogon porrifolius vegetable","salsify");
