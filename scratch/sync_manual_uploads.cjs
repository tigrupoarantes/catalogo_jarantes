const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const uploadDir = './public/uploads/produtos';

const extractCodeFromFilename = (filename) => {
  const nameWithoutExt = path.parse(filename).name;
  
  if (nameWithoutExt.includes(" - ")) {
    return nameWithoutExt.split(" - ")[0].trim();
  }
  
  const match = nameWithoutExt.match(/^([a-zA-Z0-9]+)/);
  if (match) {
    return match[1].trim();
  }
  
  return nameWithoutExt.trim();
};

async function run() {
  console.log("=== STARTING SYNC OF MANUALLY UPLOADED IMAGES ===");
  
  if (!fs.existsSync(uploadDir)) {
    console.error(`Directory ${uploadDir} does not exist!`);
    return;
  }
  
  const files = fs.readdirSync(uploadDir);
  console.log(`Found ${files.length} files in local uploads directory.`);
  
  let successCount = 0;
  let skipCount = 0;
  
  // We can query all products from the database first to know which codes are valid
  const { data: dbProducts, error: fetchError } = await supabase
    .from('products_v2')
    .select('code');
    
  if (fetchError) {
    console.error("Error fetching database products:", fetchError.message);
    return;
  }
  
  const dbCodes = new Set(dbProducts.map(p => String(p.code)));
  console.log(`Database has ${dbCodes.size} active products.`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Ignore folders or system files
    const localFilePath = path.join(uploadDir, file);
    if (!fs.lstatSync(localFilePath).isFile()) {
      continue;
    }
    
    const code = extractCodeFromFilename(file);
    const ext = path.extname(file).toLowerCase();
    
    if (!code || code.length < 3) {
      console.log(`[${i+1}/${files.length}] Skipping file ${file} (invalid code extracted: "${code}")`);
      skipCount++;
      continue;
    }
    
    if (!dbCodes.has(code)) {
      console.log(`[${i+1}/${files.length}] Skipping file ${file} (extracted code ${code} not found in database)`);
      skipCount++;
      continue;
    }
    
    const cleanFileName = `${code}${ext}`;
    const storagePath = cleanFileName;
    
    console.log(`[${i+1}/${files.length}] Uploading ${file} as ${storagePath}...`);
    
    const buffer = fs.readFileSync(localFilePath);
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(storagePath, buffer, {
        upsert: true,
        contentType: ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png',
        cacheControl: '3600'
      });
      
    if (uploadError) {
      console.error(`Error uploading ${file}:`, uploadError.message);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(storagePath);
      
    const publicUrl = publicUrlData.publicUrl;
    
    console.log(`Updating database for product ${code}...`);
    const { error: dbError } = await supabase
      .from('products_v2')
      .update({ imageUrl: publicUrl })
      .eq('code', code);
      
    if (dbError) {
      console.error(`Error updating DB for code ${code}:`, dbError.message);
    } else {
      console.log(`Successfully synced code ${code}!`);
      successCount++;
    }
    
    // Tiny throttle to avoid rate limits
    await new Promise(r => setTimeout(r, 50));
  }
  
  console.log(`\n=== SYNC COMPLETED ===`);
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Successfully synced: ${successCount}`);
  console.log(`Skipped/unmatched files: ${skipCount}`);
}

run();
