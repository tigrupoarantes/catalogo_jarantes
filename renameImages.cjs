const fs = require('fs');
const path = require('path');

const dir = './public/product-images';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file === 'Thumbs.db') continue;
  
  // Create a clean filename: alphanumeric, hyphens, and extension
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  
  const cleanBase = base.replace(/[^a-zA-Z0-9-]/g, '_');
  const newName = cleanBase + ext;
  
  if (newName !== file) {
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
  }
}

console.log("Renamed images.");
