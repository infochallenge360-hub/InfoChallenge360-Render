import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
function valid(b){return b.length>=15000&&((b[0]===0xFF&&b[1]===0xD8)||(b[0]===0x89&&b[1]===0x50));}
const s=`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent("asparagus green bunch")}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200`;
const r=await fetch(s,{headers:{"User-Agent":UA}});const t=await r.text();
if(t[0]!=="{"){console.log("RATE");process.exit(0);}
const j=JSON.parse(t);const pages=Object.values(j.query.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0));
for(const p of pages){const ii=p.imageinfo&&p.imageinfo[0];console.log((ii&&ii.mime)||"?", p.title);}
// grab first valid jpeg/png
for(const p of pages){const ii=p.imageinfo&&p.imageinfo[0];if(!ii||!/image\/(jpeg|png)/.test(ii.mime||""))continue;
  const rr=await fetch(ii.thumburl||ii.url,{headers:{"User-Agent":UA}});const buf=Buffer.from(await rr.arrayBuffer());
  if(!valid(buf))continue;writeFileSync("public/fruits/asparagus.jpg",buf);console.log("SAVED",buf.length,p.title);break;}
