const fs = require('fs');

const bundlePath = "./scratch/old_index_bundle.js";

if (!fs.existsSync(bundlePath)) {
  console.error("Bundle file not found!");
  process.exit(1);
}

const content = fs.readFileSync(bundlePath, 'utf8');
console.log(`Loaded old bundle. Length: ${content.length} characters.`);

// Let's find any occurrences of storage URL or image paths
// Standard formats: "/product-images/", "/uploads/produtos/", ".png", ".jpg", "supabase"
const matches = [];
const regex = /"[^"]*?\.png"|'[^']*?\.jpg'/g;

let match;
console.log("\nSearching for image references in bundle...");

// Let's check if there is an array of products
// Usually contains fields: code, name, brand, category, ean, imageUrl
// Let's search for some product codes in the bundle!
// From our missing list, let's check code "12455124" or "12526276"
const testCodes = ["12455124", "12526276", "12454108", "12378083", "12520011"];

testCodes.forEach(code => {
  const index = content.indexOf(code);
  if (index !== -1) {
    console.log(`Found code ${code} at index ${index}!`);
    const snippet = content.substring(index - 100, index + 300);
    console.log(`Snippet: ${snippet}\n`);
  } else {
    console.log(`Code ${code} not found in bundle.`);
  }
});

// Let's check for any mention of Supabase or image bucket url
const supabaseIndex = content.toLowerCase().indexOf("supabase");
if (supabaseIndex !== -1) {
  console.log(`Found 'supabase' at index ${supabaseIndex}!`);
  console.log(`Snippet: ${content.substring(supabaseIndex - 100, supabaseIndex + 200)}\n`);
} else {
  console.log("'supabase' not found in bundle.");
}
