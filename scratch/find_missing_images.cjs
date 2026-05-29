const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log("Analyzing products in Supabase to find missing images...");
  
  const { data, error } = await supabase
    .from('products_v2')
    .select('code, name, brand, category, imageUrl');
    
  if (error) {
    console.error("Error fetching data:", error.message);
    return;
  }
  
  const total = data.length;
  const missing = data.filter(p => !p.imageUrl);
  const coverage = ((total - missing.length) / total * 100).toFixed(1);
  
  console.log(`\nANALYSIS SUMMARY:`);
  console.log(`Total products: ${total}`);
  console.log(`With images: ${total - missing.length}`);
  console.log(`Missing images: ${missing.length}`);
  console.log(`Image coverage: ${coverage}%`);
  
  if (missing.length > 0) {
    console.log(`\nList of products missing images (first 100):`);
    missing.slice(0, 100).forEach((p, idx) => {
      console.log(`${idx + 1}. ${p.code} - ${p.name} [${p.brand} | ${p.category}]`);
    });
    
    // Save list to a file for review
    fs.writeFileSync('./scratch/products_missing_images.json', JSON.stringify(missing, null, 2));
    console.log(`\nSaved full list of missing products to ./scratch/products_missing_images.json`);
  } else {
    console.log("\nCongratulations! All products in the database have images!");
  }
}

// Need to require fs here
const fs = require('fs');

run();
