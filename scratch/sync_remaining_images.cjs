const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const masters = {
  fancyFeast: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_fancy_feast_1779904081027.png`,
  dogChowDry: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_dog_chow_1779904139456.png`,
  dogChowWet: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_dog_pouch_1779904158197.png`,
  doguitos: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_doguitos_1779904177010.png`,
  alpo: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_alpo_1779904197528.png`,
  friskiesCat: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_friskies_1779904215249.png`,
  dustgBox: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_dustg_box_1779904240080.png`,
  genioS: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_genio_s_1779904259211.png`,
  
  mucilon: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_mucilon_1780070322022.png`,
  mocaCreme: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_moca_creme_1780070338485.png`,
  neslac: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_neslac_1780070361315.png`,
  nutrenActive: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_nutren_active_1780070376550.png`,
  tostines: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_tostines_1780070392806.png`,
  maggi: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_maggi_1780070409724.png`,
  gatsyKanina: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_gatsy_kanina_1780070428749.png`,
  friskiesWet: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_friskies_wet_1780070444110.png`
};

function getMasterImage(p) {
  const brandKey = String(p.brand || '').trim().toUpperCase();
  const categoryKey = String(p.category || '').trim().toUpperCase();
  const nameKey = String(p.name || '').trim().toUpperCase();

  if (categoryKey.includes("FANCY FEAST WET POUCH") || nameKey.includes("FANCY FEAST")) return masters.fancyFeast;
  if (categoryKey.includes("FRISKIES WET POUCH") || (brandKey.includes("WET") && nameKey.includes("FRISKIES"))) return masters.friskiesWet;
  if (categoryKey.includes("DOG CHOW WET POUCH") || nameKey.includes("DOG CHOW POUCH") || (brandKey.includes("WET") && nameKey.includes("DOG CHOW"))) return masters.dogChowWet;
  
  if (categoryKey.includes("FRISKIES DRY") || nameKey.includes("FRISKIES DRY") || (brandKey.includes("PREMIUM DRY CAT") && nameKey.includes("FRISKIES"))) return masters.friskiesCat;
  if (categoryKey.includes("DOG CHOW DRY") || nameKey.includes("DOGCHOW DRY") || nameKey.includes("DCHOW") || (brandKey.includes("PREMIUM DRY DOG") && nameKey.includes("DOGCHOW"))) return masters.dogChowDry;
  
  if (categoryKey.includes("MAQUINAS") || nameKey.includes("MINIME") || nameKey.includes("MQ")) return masters.genioS;
  if (categoryKey.includes("BEBIDAS CHOCOS") || nameKey.includes("NDG NESCAU")) return masters.dustgBox;
  
  if (categoryKey.includes("DOGUITOS") || nameKey.includes("DOGUITOS")) return masters.doguitos;
  if (categoryKey.includes("ALPO") || nameKey.includes("ALPO")) return masters.alpo;
  
  if (brandKey.includes("BISCOITOS") || nameKey.includes("TOSTINES")) return masters.tostines;
  if (brandKey.includes("CEREAIS INFANTIS") || nameKey.includes("MUCILON")) return masters.mucilon;
  
  if (brandKey.includes("LEITES CULINARIOS") || nameKey.includes("MOCA") || nameKey.includes("CREME DE LEITE")) return masters.mocaCreme;
  if (brandKey.includes("LEITES DE CRESCIMENTO") || nameKey.includes("NESLAC")) return masters.neslac;
  if (brandKey.includes("MAGGI") || nameKey.includes("MAGGI")) return masters.maggi;
  
  if (brandKey.includes("MAINSTREAM") || nameKey.includes("GATSY") || nameKey.includes("KANINA") || nameKey.includes("BONZO")) {
    if (nameKey.includes("GATSY") || nameKey.includes("KANINA")) return masters.gatsyKanina;
  }
  
  if (brandKey.includes("NHS ACTIVE NUTRITION") || nameKey.includes("NUTREN ACTIVE")) return masters.nutrenActive;
  
  // Fallbacks
  if (nameKey.includes("GATSY") || nameKey.includes("KANINA")) return masters.gatsyKanina;
  
  return null;
}

const localMissingFile = './scratch/actual_missing_products.json';
const uploadDir = './public/uploads/produtos';

async function run() {
  if (!fs.existsSync(localMissingFile)) {
    console.error("Missing products JSON not found!");
    return;
  }

  const missingProducts = JSON.parse(fs.readFileSync(localMissingFile, 'utf8'));
  console.log(`Processing ${missingProducts.length} missing products...`);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let count = 0;
  for (let i = 0; i < missingProducts.length; i++) {
    const p = missingProducts[i];
    const code = p.code;
    const masterPath = getMasterImage(p);

    if (!masterPath) {
      console.warn(`[${i+1}/${missingProducts.length}] Warning: Could not find master image for ${code} (${p.name}). Skipping.`);
      continue;
    }

    if (!fs.existsSync(masterPath)) {
      console.error(`[${i+1}/${missingProducts.length}] Error: Master path does not exist: ${masterPath}`);
      continue;
    }

    const localFileName = `${code}.png`;
    const localFilePath = path.join(uploadDir, localFileName);

    console.log(`\n[${i+1}/${missingProducts.length}] Processing product ${code} (${p.name})...`);
    console.log(`Copying master: ${masterPath} -> ${localFilePath}`);
    fs.copyFileSync(masterPath, localFilePath);

    const buffer = fs.readFileSync(localFilePath);
    const storagePath = localFileName;

    console.log(`Uploading ${localFileName} to Supabase storage...`);
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(storagePath, buffer, {
        upsert: true,
        contentType: 'image/png',
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error(`Error uploading ${localFileName}:`, uploadError.message);
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
      console.log(`Successfully synced code ${code}!`);
      count++;
    }

    // Small throttle
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n=== COMPLETED SYNC OF ${count} REMAINING PRODUCTS ===`);
}

run();
