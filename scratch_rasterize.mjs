import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir = "D:/mnbety-video/public/states77";
const outDir = "C:/Users/Talat/AppData/Local/Temp/claude/D--InfoChallenge360-Channel/92ce5cd3-e8e4-45ee-b4a8-25f0d37d49fc/scratchpad/states77png";

const files = fs.readdirSync(srcDir).filter(f => f.endsWith(".svg")).sort();
console.log("count:", files.length);

const results = [];
for (const f of files) {
  const slug = f.replace(".svg", "");
  const svgPath = path.join(srcDir, f);
  const svgBuf = fs.readFileSync(svgPath);
  try {
    const img = sharp(svgBuf, { density: 300 });
    const meta = await img.metadata();
    const outPath = path.join(outDir, slug + ".png");
    await sharp(svgBuf, { density: 300 })
      .resize(300, 300, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(outPath);
    // compute bounding box aspect ratio and pixel coverage via raw stats
    const stats = await sharp(outPath).stats();
    results.push({ slug, width: meta.width, height: meta.height, aspect: (meta.width/meta.height).toFixed(2) });
  } catch (e) {
    results.push({ slug, error: e.message });
  }
}
console.log(JSON.stringify(results, null, 2));
