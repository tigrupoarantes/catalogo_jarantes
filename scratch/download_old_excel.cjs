const fs = require('fs');
const https = require('https');

const url = "https://folder-jarantes.onrender.com/produtos_placeholder.xlsx";
const dest = "./scratch/old_excel.xlsx";

console.log(`Downloading Excel from ${url}...`);

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  if (response.statusCode !== 200) {
    console.error(`Failed to download: Status Code ${response.statusCode}`);
    file.close();
    fs.unlinkSync(dest);
    return;
  }
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Successfully downloaded Excel database!");
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error("Error downloading file:", err.message);
});
