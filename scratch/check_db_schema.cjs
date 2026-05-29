const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase
    .from('products_v2')
    .select('*')
    .limit(1);

  if (error) {
    console.error("Error fetching product:", error.message);
    return;
  }

  if (data.length > 0) {
    console.log("Columns in products_v2 table:", Object.keys(data[0]));
    console.log("Full product sample data:", data[0]);
  } else {
    console.log("No products found in products_v2 table.");
  }
}

run();
