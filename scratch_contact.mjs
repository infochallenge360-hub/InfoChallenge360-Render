import sharp from "sharp";
import fs from "fs";
import path from "path";

const outDir = "C:/Users/Talat/AppData/Local/Temp/claude/D--InfoChallenge360-Channel/92ce5cd3-e8e4-45ee-b4a8-25f0d37d49fc/scratchpad/states77png";
const files = fs.readdirSync(outDir).filter(f => f.endsWith(".png") && !f.startsWith("sheet")).sort();
console.log(files.length, "pngs");

const cell = 220; // cell size including label
const cols = 5;
const rows = Math.ceil(files.length / cols);

// chunk into groups of 10 for readable sheets
const chunkSize = 10;
for (let c = 0; c < files.length; c += chunkSize) {
  const chunk = files.slice(c, c + chunkSize);
  const sheetCols = 5;
  const sheetRows = Math.ceil(chunk.length / sheetCols);
  const composites = [];
  for (let i = 0; i < chunk.length; i++) {
    const slug = chunk[i].replace(".png", "");
    const x = (i % sheetCols) * cell;
    const y = Math.floor(i / sheetCols) * cell;
    const resized = await sharp(path.join(outDir, chunk[i]))
      .resize(200, 180, { fit: "contain", background: "#ffffff" })
      .toBuffer();
    composites.push({ input: resized, left: x + 10, top: y + 10 });
  }
  const svgLabels = chunk.map((f, i) => {
    const slug = f.replace(".png", "");
    const x = (i % sheetCols) * cell + 10;
    const y = Math.floor(i / sheetCols) * cell + 195;
    return `<text x="${x+90}" y="${y}" font-size="18" text-anchor="middle" font-family="Arial" fill="black">${slug.toUpperCase()}</text>`;
  }).join("");
  const labelSvg = Buffer.from(`<svg width="${sheetCols*cell}" height="${sheetRows*cell}">${svgLabels}</svg>`);
  composites.push({ input: labelSvg, left: 0, top: 0 });

  await sharp({
    create: { width: sheetCols * cell, height: sheetRows * cell, channels: 3, background: "#dddddd" }
  })
  .composite(composites)
  .png()
  .toFile(path.join(outDir, `sheet_${c}.png`));
  console.log("wrote sheet_" + c + ".png for", chunk.map(f=>f.replace(".png","")).join(","));
}
