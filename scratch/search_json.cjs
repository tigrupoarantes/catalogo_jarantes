const fs = require('fs');

const bundlePath = "./scratch/old_index_bundle.js";
const content = fs.readFileSync(bundlePath, 'utf8');

console.log("Searching for json/csv/xlsx file paths in bundle...");

const matches = content.match(/"[^"]*?\.json"|'[^']*?\.json'|"[^"]*?\.xlsx"|'[^']*?\.xlsx'/g) || [];
console.log(`Found ${matches.length} file paths:`);
matches.forEach(m => console.log(`- ${m}`));

// Search for any fetch or axios request templates
const fetchIndex = content.indexOf("fetch(");
if (fetchIndex !== -1) {
  console.log(`Found fetch( at index ${fetchIndex}`);
  console.log(`Snippet: ${content.substring(fetchIndex - 50, fetchIndex + 150)}`);
}
