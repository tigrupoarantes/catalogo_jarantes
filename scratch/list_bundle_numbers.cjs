const fs = require('fs');

const bundlePath = "./scratch/old_index_bundle.js";
const content = fs.readFileSync(bundlePath, 'utf8');

console.log("Searching for product-like codes in the bundle (8-digit numeric strings)...");

const numbers = content.match(/\b\d{8}\b/g) || [];
const uniqueNumbers = [...new Set(numbers)];

console.log(`Found ${uniqueNumbers.length} unique 8-digit codes in bundle.`);
if (uniqueNumbers.length > 0) {
  console.log("Sample codes:");
  console.log(uniqueNumbers.slice(0, 50).join(', '));
  
  // Let's write them to a file for review
  fs.writeFileSync('./scratch/bundle_codes.json', JSON.stringify(uniqueNumbers, null, 2));
}

// Check for 6-digit numeric strings as well
const sixDigits = content.match(/\b\d{6}\b/g) || [];
const uniqueSix = [...new Set(sixDigits)];
console.log(`Found ${uniqueSix.length} unique 6-digit codes in bundle.`);
if (uniqueSix.length > 0) {
  console.log("Sample 6-digit codes:");
  console.log(uniqueSix.slice(0, 50).join(', '));
}
