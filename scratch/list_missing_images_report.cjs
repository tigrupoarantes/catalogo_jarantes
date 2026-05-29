const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log("Fetching missing images from database...");
  
  const { data, error } = await supabase
    .from('products_v2')
    .select('code, name, brand, category, imageUrl')
    .order('brand', { ascending: true })
    .order('category', { ascending: true });
    
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  
  const missing = data.filter(p => !p.imageUrl);
  
  console.log(`\nFound ${missing.length} products without images.`);
  
  let md = `# Lista de Produtos Sem Imagem (Total: ${missing.length})\n\n`;
  md += `Esta lista contém todos os produtos do banco de dados que não possuem imagem associada atualmente, ordenados por Marca/Categoria para facilitar a identificação:\n\n`;
  
  // Group by brand
  const groups = {};
  missing.forEach(p => {
    const brand = p.brand || "SEM CATEGORIA";
    if (!groups[brand]) groups[brand] = [];
    groups[brand].push(p);
  });
  
  for (const [brand, items] of Object.entries(groups)) {
    md += `## ${brand} (${items.length} produtos)\n`;
    items.forEach(p => {
      md += `- **${p.code}** - ${p.name} *(Sub Categoria: ${p.category || 'N/A'})*\n`;
    });
    md += `\n`;
  }
  
  fs.writeFileSync('./scratch/products_missing_images_report.md', md);
  console.log("Saved report to ./scratch/products_missing_images_report.md");
}

run();
