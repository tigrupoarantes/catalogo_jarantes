const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const uploadDir = './public/uploads/produtos';

async function run() {
  console.log("=== STARTING COMPLETE CLEANUP OF ALL IMAGES ===");

  // 1. Reset Database imageUrl columns
  console.log("\n1. Resetting imageUrl column in Supabase database products_v2 table...");
  const { data: dbData, error: dbError } = await supabase
    .from('products_v2')
    .update({ imageUrl: null })
    .neq('code', ''); // Match all records safely
    
  if (dbError) {
    console.error("Database update error:", dbError.message);
  } else {
    console.log("Successfully set imageUrl to null for all products in products_v2 database!");
  }

  // 2. Delete all files in Supabase Storage product-images bucket
  console.log("\n2. Fetching list of files in product-images storage bucket...");
  const { data: files, error: listError } = await supabase.storage
    .from('product-images')
    .list('', { limit: 5000 });
    
  if (listError) {
    console.error("Error listing storage files:", listError.message);
  } else if (files && files.length > 0) {
    const filesToDelete = files
      .map(f => f.name)
      .filter(name => name !== '.emptyFolderPlaceholder'); // Don't delete system placeholders if any
      
    if (filesToDelete.length > 0) {
      console.log(`Found ${filesToDelete.length} files in storage. Deleting in bulk...`);
      const { data: delData, error: delError } = await supabase.storage
        .from('product-images')
        .remove(filesToDelete);
        
      if (delError) {
        console.error("Error deleting storage files:", delError.message);
      } else {
        console.log(`Successfully deleted ${filesToDelete.length} files from Supabase Storage bucket!`);
      }
    } else {
      console.log("No files to delete in storage bucket.");
    }
  } else {
    console.log("Storage bucket is already empty.");
  }

  // 3. Clear local uploads folder
  console.log("\n3. Clearing local folder ./public/uploads/produtos/...");
  if (fs.existsSync(uploadDir)) {
    const localFiles = fs.readdirSync(uploadDir);
    let deletedLocalCount = 0;
    
    for (const file of localFiles) {
      // Don't delete directories if any, only files
      const filePath = path.join(uploadDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        deletedLocalCount++;
      }
    }
    console.log(`Successfully deleted ${deletedLocalCount} files from local folder ${uploadDir}!`);
  } else {
    console.log("Local uploads directory does not exist.");
  }

  console.log("\n=== COMPLETE CLEANUP FINISHED ===");
}

run();
