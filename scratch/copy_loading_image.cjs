const fs = require('fs');

const src = `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\media__1780071542270.png`;
const destGif = './public/loading.gif';
const destPng = './public/loading.png';

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destGif);
    fs.copyFileSync(src, destPng);
    console.log("Successfully copied uploaded file to public/loading.gif and public/loading.png!");
  } else {
    console.error("Source file not found in brain folder:", src);
  }
} catch (err) {
  console.error("Error copying file:", err.message);
}
