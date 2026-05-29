const fs = require('fs');
const path = require('path');
const https = require('https');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const uploadDir = './public/uploads/produtos';

// Matches list from previous analysis script
const matches = [
  { code: "13383314", name: "NESCAU Cookie Cereal Matinal 20x180g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6952d2415ea4ec001a609a54_1.jpg" },
  { code: "13463462", name: "NESCAU Cookie Cereal Matinal 20x80g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6952d2585ea4ec001a609a55_1.jpg" },
  { code: "12429007", name: "NUTREN Protein Chocolate Po 12x400g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6933546756d5820019b57393_1.jpg" },
  { code: "13466600", name: "NESCAFE ICE 24x40g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/68c87bfb44a25d0012245585_1.jpg" },
  { code: "12310601", name: "BONZO Adultos Carne e Cereais 18kg BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/694164a348e32700185e7484_1.jpg" },
  { code: "12384866", name: "DOG CHOW Oral Med Gde 20x80g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/606f77e0f127650bf6f00793.jpg" },
  { code: "12384867", name: "DOG CHOW Oral Pequeno 20x105g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/62acc0db94f2000bffe3eb8d.jpg" },
  { code: "12454108", name: "ONEAdltMiniPeqc/Frg&CarneDeVdd 11x700gBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/62c31d3adeea581eef68835f.jpg" },
  { code: "12454109", name: "ONE AdltMiniPeqc/Frgo&CarneDeVdd6x2kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/62abfc2b94f2000bffe3e897.jpg" },
  { code: "12454127", name: "ONEFilhTdTm c/Frango&CarneDeVdd11x700gBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/62669ead37cf5b0c032f3ec4.jpg" },
  { code: "12454208", name: "ONEFilhTdTm c/Frango&CarneDeVdd6x2kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6266d625a0a6631ef99fc134.jpg" },
  { code: "12454492", name: "ONEAdltMedGde c/Frango&CarneDeVdd6x2kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6266a420925e2e0c7a78432d.jpg" },
  { code: "12454676", name: "ONEGatoFilhc/Frango&CarneDeVdd6x2kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6266d70ae9a40e1eb4a1ebed.jpg" },
  { code: "12455098", name: "ONECatFilh c/Frango&CarneDeVdd20x500gBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6266b194e9a40e1eb4a1eaf5.jpg" },
  { code: "12455107", name: "ONECatAdultos c/Frg&CarneDeVdd20x500gBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6262e4c3bcf67a0c170e837a.jpg" },
  { code: "12455124", name: "ONECatAdulto c/Frango&CarneDeVdd6x2kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6266da83a0a6631ef99fc15a.jpg" },
  { code: "12464177", name: "SUFLAIR Chocolate Duo 4(16x80g) BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/699cac7aa797d900181f3349_1.jpg" },
  { code: "12464249", name: "SUFLAIR Chocolate ao Leite 4(16x80g) BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/699cac7aa797d900181f334a_1.jpg" },
  { code: "12489996", name: "ALPO Filhotes CarFrgCerVeg Lei 10x1kg BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/62d6e25b7fed8d0c064d145e.jpg" },
  { code: "14024359", name: "KK 4Fngr Latte Macchiato 4(24x41,5g) BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/69bc1cb9a8a63900194c689e_1.jpg" },
  { code: "12519758", name: "FRISKIES Megamix Adulto 10x1kg BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/63beafb652951d1a764c49b1.jpg" },
  { code: "12519762", name: "FRISKIES Megamix Adulto 6x3kg BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/63beb142d59ba31a2270cfab.jpg" },
  { code: "12519867", name: "FRISKIES Mix Carne Castrados 6x3kg BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/63bebd9452951d1a764c4a0c.jpg" },
  { code: "12519874", name: "FRISKIES Mix Carne Castrados 10x1kg BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/63bebd0bd59ba31a2270d000.jpg" },
  { code: "12598254", name: "FRISKIES Petiscos Carne 15x40g N2 BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/66ab84e193a305001baedea1_1.jpg" },
  { code: "12598255", name: "FRISKIES Petiscos Frango 15x40g N1 BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/66ab84e193a305001baede9f_1.jpg" },
  { code: "12590501", name: "DOG CHOW Biscoito Filh FrgLei 16x300g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/668eeac8c71b400019e17b26_1.jpg" },
  { code: "12591103", name: "NDG ESPRS Cerrado Mineiro 10Caps 6x60gBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/67c1da972d1235001222da7f_1.jpg" },
  { code: "12592351", name: "DOG CHOW BiscoitosFrg MedGde 16x500gN1BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/668eeac8c71b400019e17b24_1.jpg" },
  { code: "12592352", name: "DOGCHOW BiscoitosFrg MiniPeq 16x500gN1BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/668eeac8c71b400019e17b25_1.jpg" },
  { code: "12598146", name: "FRISKIES Petiscos Salmao 15x40g BR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/66ab84e193a305001baedea0_1.jpg" },
  { code: "12624229", name: "DOGCHOW XLfeAdltMnPeq CarFrgArz6x2,5kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6839e6c39604fd001284619e_1.jpg" },
  { code: "12624153", name: "DOGCHOW XLfeAdltMedGdeCarFrgArz6x2,5kgBR", url: "https://cdn-download.lett.com.br/placeholder-media/gslett/pic-primary/6839e6c39604fd00128461a0_1.jpg" }
];

async function downloadFile(url, dest) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: Status Code ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
}

async function run() {
  console.log(`Starting download, upload, and sync of ${matches.length} products...`);
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const code = match.code;
    const url = match.url;
    
    // Extract file extension
    let ext = '.jpg';
    if (url.toLowerCase().endsWith('.png')) ext = '.png';
    else if (url.toLowerCase().endsWith('.jpeg')) ext = '.jpeg';
    
    const localFileName = `${code}${ext}`;
    const localFilePath = path.join(uploadDir, localFileName);
    
    console.log(`\n[${i+1}/${matches.length}] Downloading image for ${code} (${match.name})...`);
    try {
      await downloadFile(url, localFilePath);
      console.log(`Successfully downloaded to ${localFilePath}`);
      
      const buffer = fs.readFileSync(localFilePath);
      const storagePath = localFileName;
      
      console.log(`Uploading ${localFileName} to Supabase storage...`);
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(storagePath, buffer, {
          upsert: true,
          contentType: ext === '.png' ? 'image/png' : 'image/jpeg',
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
      }
      
    } catch (err) {
      console.error(`Failed to process ${code}:`, err.message);
    }
    
    // Small throttle
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log("\n=== COMPLETED DOWNLOAD AND SYNC ===");
}

run();
