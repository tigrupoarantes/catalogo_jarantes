const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: products, error } = await supabase
    .from('products_v2')
    .select('code, name, brand, category, imageUrl')
    .order('brand', { ascending: true })
    .order('category', { ascending: true });

  if (error) {
    console.error("Error fetching products:", error.message);
    return;
  }

  const missing = products.filter(p => !p.imageUrl);
  console.log(`Found ${missing.length} missing products in database.`);

  fs.writeFileSync('./scratch/actual_missing_products.json', JSON.stringify(missing, null, 2));
  console.log("Wrote actual_missing_products.json");

  // Create structured report
  let report = "# Real Missing Products (" + missing.length + ")\n\n";
  const grouped = {};
  missing.forEach(p => {
    const key = `${p.brand} - ${p.category}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  for (const [key, list] of Object.entries(grouped)) {
    report += `## ${key}\n`;
    list.forEach(p => {
      report += `- **${p.code}** - ${p.name}\n`;
    });
    report += "\n";
  }

  fs.writeFileSync('./scratch/actual_missing_products_report.md', report);
  console.log("Wrote actual_missing_products_report.md");
}

run();
