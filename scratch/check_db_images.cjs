const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase.from('products_v2').select('*');
  if (error) {
    console.error("Error:", error);
    return;
  }
  
  console.log(`Total products in db: ${data.length}`);
  const withImages = data.filter(p => !!p.imageUrl);
  console.log(`Products in db with non-null imageUrl: ${withImages.length}`);
  
  if (withImages.length > 0) {
    console.log("Sample imageUrls from DB:");
    withImages.slice(0, 10).forEach(p => console.log(`${p.code}: ${p.imageUrl}`));
  }
}

run();
