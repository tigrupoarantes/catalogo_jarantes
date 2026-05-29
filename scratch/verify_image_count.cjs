const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase
    .from('products_v2')
    .select('code, imageUrl');
    
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  
  const total = data.length;
  const withImages = data.filter(p => !!p.imageUrl);
  const nullImages = data.filter(p => !p.imageUrl);
  
  console.log(`DATABASE COUNTS:`);
  console.log(`Total active products: ${total}`);
  console.log(`With non-null imageUrl: ${withImages.length}`);
  console.log(`With null imageUrl: ${nullImages.length}`);
}

run();
