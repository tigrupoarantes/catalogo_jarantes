const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const oldExcelDataPath = './scratch/old_excel_data.json';

async function run() {
  if (!fs.existsSync(oldExcelDataPath)) {
    console.error("Old Excel JSON data not found!");
    return;
  }
  
  const oldExcelRows = JSON.parse(fs.readFileSync(oldExcelDataPath, 'utf8'));
  console.log(`Loaded ${oldExcelRows.length} rows from old Excel database.`);
  
  // Create a map of sku -> image url
  const excelMap = new Map();
  oldExcelRows.forEach(row => {
    const sku = String(row.codigosku || '').trim();
    if (sku && row.imagemprincipal) {
      excelMap.set(sku, row.imagemprincipal);
    }
  });
  
  console.log(`Mapped ${excelMap.size} unique SKUs to image URLs.`);
  
  // Fetch missing products from database
  const { data: dbProducts, error } = await supabase
    .from('products_v2')
    .select('code, name');
    
  if (error) {
    console.error("Error fetching db products:", error.message);
    return;
  }
  
  const missing = dbProducts.filter(p => !p.imageUrl);
  console.log(`\nCurrently missing images in database: ${missing.length} products.`);
  
  let matchCount = 0;
  const matches = [];
  const unmatched = [];
  
  missing.forEach(p => {
    const code = String(p.code).trim();
    const url = excelMap.get(code);
    if (url) {
      matchCount++;
      matches.push({ code, name: p.name, url });
    } else {
      unmatched.push({ code, name: p.name });
    }
  });
  
  console.log(`\nMATCH SUMMARY:`);
  console.log(`Matched with image from old Excel: ${matchCount} / ${missing.length}`);
  console.log(`Unmatched: ${unmatched.length}`);
  
  if (matches.length > 0) {
    console.log("\nFirst 10 matches sample:");
    matches.slice(0, 10).forEach(m => {
      console.log(`- ${m.code} (${m.name}): ${m.url}`);
    });
  }
  
  // Write matches to a file
  fs.writeFileSync('./scratch/matched_excel_images.json', JSON.stringify(matches, null, 2));
}

run();
