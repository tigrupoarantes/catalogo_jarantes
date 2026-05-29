const fs = require('fs');

const filePath = `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\media__1780071542270.png`;

if (!fs.existsSync(filePath)) {
  console.error("File does not exist:", filePath);
  process.exit(1);
}

const buffer = fs.readFileSync(filePath);
const header = buffer.toString('ascii', 0, 6);
console.log("File size in bytes:", buffer.length);
console.log("First 6 bytes (ASCII):", header);
console.log("First 8 bytes (Hex):", buffer.slice(0, 8).toString('hex'));

if (header.startsWith('GIF89') || header.startsWith('GIF87')) {
  console.log("CONFIRMED: The file is an animated GIF!");
} else if (buffer.slice(0, 4).toString('hex') === '89504e47') {
  console.log("CONFIRMED: The file is a standard PNG!");
} else {
  console.log("UNKNOWN file header format.");
}
