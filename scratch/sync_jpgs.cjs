const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const jpgCodes = ["12527418", "12552456"];
const uploadDir = './public/uploads/produtos';

async function run() {
  console.log("Uploading and syncing skipped JPG files...");
  
  for (const code of jpgCodes) {
    const fileName = `${code}.jpg`;
    const localFilePath = path.join(uploadDir, fileName);
    
    if (!fs.existsSync(localFilePath)) {
      console.warn(`Warning: ${localFilePath} does not exist.`);
      continue;
    }
    
    const buffer = fs.readFileSync(localFilePath);
    const storagePath = `${code}.jpg`;
    
    console.log(`Uploading ${fileName} to storage...`);
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(storagePath, buffer, {
        upsert: true,
        contentType: 'image/jpeg',
        cacheControl: '3600'
      });
      
    if (uploadError) {
      console.error(`Error uploading ${fileName}:`, uploadError.message);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(storagePath);
      
    const publicUrl = publicUrlData.publicUrl;
    console.log(`Public URL: ${publicUrl}`);
    
    console.log(`Updating database for product ${code}...`);
    const { error: dbError } = await supabase
      .from('products_v2')
      .update({ imageUrl: publicUrl })
      .eq('code', code);
      
    if (dbError) {
      console.error(`Error updating DB for code ${code}:`, dbError.message);
    } else {
      console.log(`Successfully updated database for product ${code}!`);
    }
  }
  
  console.log("Finished JPG sync!");
}

run();
