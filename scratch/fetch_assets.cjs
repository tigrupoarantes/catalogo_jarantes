const fs = require('fs');
const https = require('https');

const url = "https://folder-jarantes.onrender.com/assets/index-Bjtc8ita.js";
const dest = "./scratch/old_index_bundle.js";

console.log(`Downloading JS bundle from ${url}...`);

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Successfully downloaded index bundle!");
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error("Error downloading file:", err.message);
});
