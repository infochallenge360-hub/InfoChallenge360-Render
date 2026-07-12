import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
function valid(b){return b.length>=15000&&((b[0]===0xFF&&b[1]===0xD8)||(b[0]===0x89&&b[1]===0x50));}
async function commons(query, slug){
  const s=`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1200`;
  const r=await fetch(s,{headers:{"User-Agent":UA}});const t=await r.text();if(t[0]!=="{"){console.log(slug,"RATE");return false;}
  const j=JSON.parse(t);const pages=j.query&&j.query.pages?Object.values(j.query.pages):[];
  pages.sort((a,b)=>(a.index||0)-(b.index||0));
  for(const p of pages){const ii=p.imageinfo&&p.imageinfo[0];if(!ii)continue;
    if(!/image\/(jpeg|png)/.test(ii.mime||""))continue;
    const u=ii.thumburl||ii.url;const rr=await fetch(u,{headers:{"User-Agent":UA}});const buf=Buffer.from(await rr.arrayBuffer());
    if(!valid(buf))continue;writeFileSync(`public/fruits/${slug}.jpg`,buf);console.log(`${slug}: OK ${buf.length} | ${p.title}`);return true;}
  console.log(`${slug}: NONE`);return false;
}
await commons("Asparagus officinalis harvested spears vegetable","asparagus");
await new Promise(r=>setTimeout(r,4000));
await commons("Vigna unguiculata sesquipedalis yardlong bean pods","yardlong-bean");
