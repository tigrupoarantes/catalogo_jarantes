const fs = require('fs');
const path = require('path');

const scriptsToMove = [
  'append.cjs',
  'checkImages.cjs',
  'cleanChok.cjs',
  'countImages.cjs',
  'generateProductsTsFinal.cjs',
  'listImages.cjs',
  'matchImages.cjs',
  'parseData.cjs',
  'renameImages.cjs',
  'unmatched.cjs'
];

const destDir = './scripts';

console.log("=== STARTING SCRIPTS REORGANIZATION ===");

// 1. Create scripts/ directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
  console.log(`Created directory: ${destDir}`);
}

// 2. Move files
scriptsToMove.forEach(script => {
  const srcPath = path.join('.', script);
  const destPath = path.join(destDir, script);
  
  if (fs.existsSync(srcPath)) {
    try {
      fs.renameSync(srcPath, destPath);
      console.log(`Moved ${script} to ${destPath}`);
    } catch (err) {
      console.error(`Error moving ${script}:`, err.message);
    }
  } else {
    console.log(`Script already moved or not present: ${srcPath}`);
  }
});

console.log("=== SCRIPTS REORGANIZATION FINISHED ===");
