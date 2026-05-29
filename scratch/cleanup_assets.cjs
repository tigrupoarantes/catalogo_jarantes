const fs = require('fs');
const path = require('path');

const filesToDelete = [
  './public/videos/story-dica.mp4',
  './public/videos/story-heinz.mp4',
  './public/logo.png'
];

console.log("=== STARTING ASSET CLEANUP ===");

filesToDelete.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Successfully deleted unused asset: ${filePath}`);
    } catch (err) {
      console.error(`Error deleting ${filePath}:`, err.message);
    }
  } else {
    console.log(`Asset already removed: ${filePath}`);
  }
});

console.log("=== ASSET CLEANUP FINISHED ===");
