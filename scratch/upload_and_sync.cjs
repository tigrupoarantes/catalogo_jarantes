const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || "https://imvrwcaxsapqhogjkalt.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const userListRaw = `12028625	NESCAFE DOPCAFE Forte 6x(20x50g) BR	NESCAFE SOLUVEL + T&M	SACHETS
12378083	DOGUITOS Bifinho Frango 20x65g BR	SNACKS	DOGUITOS SNACKS
12454108	ONEAdltMiniPeqc/Frg&CarneDeVdd 11x700gBR	SUPER PREMIUM DRY	ONE DRY DOG SMALL BAGS
12454109	ONE AdltMiniPeqc/Frgo&CarneDeVdd6x2kgBR	SUPER PREMIUM DRY	ONE DRY DOG SMALL BAGS
12454127	ONEFilhTdTm c/Frango&CarneDeVdd11x700gBR	SUPER PREMIUM DRY	ONE DRY DOG SMALL BAGS
12454208	ONEFilhTdTm c/Frango&CarneDeVdd6x2kgBR	SUPER PREMIUM DRY	ONE DRY DOG SMALL BAGS
12454492	ONEAdltMedGde c/Frango&CarneDeVdd6x2kgBR	SUPER PREMIUM DRY	ONE DRY DOG LARGE BAGS
12454676	ONEGatoFilhc/Frango&CarneDeVdd6x2kgBR	SUPER PREMIUM DRY	ONE DRY CAT SMALL BAGS
12455098	ONECatFilh c/Frango&CarneDeVdd20x500gBR	SUPER PREMIUM DRY	ONE DRY CAT SMALL BAGS
12455107	ONECatAdultos c/Frg&CarneDeVdd20x500gBR	SUPER PREMIUM DRY	ONE DRY CAT SMALL BAGS
12489996	ALPO Filhotes CarFrgCerVeg Lei 10x1kg BR	MAINSTREAM	ALPO DRY SMALL BAGS
12501474	DOGCHOWXLfeAdltMedioGdeCarFrgArz5x3kgBR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12519987	NESCAFE DUSTG Espresso Intenso 3(16 caps)	SISTEMA DOLCE GUSTO	ESPRESSO
12519988	NESCAFE DUSTG Espresso Decaf 3(16 caps)	SISTEMA DOLCE GUSTO	ESPRESSO
12520004	NESCAFE DUSTG Ristretto Ardent 3(16caps)	SISTEMA DOLCE GUSTO	ESPRESSO
12520229	NESCAFE DUSTG Genio S Touch MqCinza 1x1	SISTEMA DOLCE GUSTO	MAQUINAS E ACESSORIOS G1
12520236	NESCAFE DUSTG Genio S Basic MqPreta 1x1	SISTEMA DOLCE GUSTO	MAQUINAS E ACESSORIOS G1
12526276	FANCY FEAST Cass Frango e Peru15x85gN1XI	WET	FANCY FEAST WET POUCH
12526286	FANCY FEAST Cass Atum e Salmao15x85gN1XI	WET	FANCY FEAST WET POUCH
12526301	FANCY FEAST Cass Carne e Figado15x85gN1XI	WET	FANCY FEAST WET POUCH
12526303	FANCY FEAST Cass Peixe e Salmao15x85gN1XI	WET	FANCY FEAST WET POUCH
12526304	FANCY FEAST Cass Truta e Salmao15x85gN1XI	WET	FANCY FEAST WET POUCH
12526310	FANCY FEAST Cass Pato e Peru 15x85gN1XI	WET	FANCY FEAST WET POUCH
12526320	FANCY FEAST Cass Sereia e Frango15x85gN1	WET	FANCY FEAST WET POUCH
12526404	FANCY FEAST Cass Frg Peru Coel15x85gN1XI	WET	FANCY FEAST WET POUCH
12527297	FRISKIES Pouch Carne de Sol 30x85g N1 BR	WET	FRISKIES WET POUCH
12527298	FRISKIES Pouch Frango de Sol 30x85g N1BR	WET	FRISKIES WET POUCH
12527302	FRISKIES Pouch Atum de Sol 30x85g N1 BR	WET	FRISKIES WET POUCH
12527322	FRISKIES Pouch Salmao de Sol 30x85g N1BR	WET	FRISKIES WET POUCH
12527324	FRISKIES Pouch Sardinha Sol 30x85g N1 BR	WET	FRISKIES WET POUCH
12527418	FRISKIES Pouch Filh Frango 30x85g N1 BR	WET	FRISKIES WET POUCH
12527434	FRISKIES Pouch CastrSalmao 30x85g N1 BR	WET	FRISKIES WET POUCH
12528243	DOGCHOW Pouch Filh Carne 30x100g N1 BR	WET	DOG CHOW WET POUCH
12528254	DOGCHOW Pouch Filh Frango 30x100g N1 BR	WET	DOG CHOW WET POUCH
12534547	CARNATION Leite Evaporado Uht 12x410gBR	LEITES CULINARIOS	LEITE EVAPORADO
12535260	NESCAFE DUSTG Mochaccino 3(16 caps)	SISTEMA DOLCE GUSTO	ESPRESSO
12537280	DOGCHOW Pouch AdltSaborCarne 30x100gN1BR	WET	DOG CHOW WET POUCH
12551246	DOGCHOWXLfeFilhCarneArroz 5x3kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12551249	DOGCHOWXLfeFilhCarneArroz 2x15kg BR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
12551257	DOGCHOWXLfeAdltRacaPqCarArz 10x1kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12551265	DOGCHOWXLfeAdltRacaPqCarArz 5x3kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12551271	DOGCHOWXLfeAdltRacaPqFrgArz 5x3kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12551300	DOGCHOWXLfeAdltRacaPqCarArz 2x10,1kg BR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
12551301	DOGCHOWXLfeAdltMedioGdeCarFrgArz2x15kgBR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
12551302	DOGCHOWXLfeAdltMedioGdeFrgArz 2x15kg BR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
12551448	DOGCHOWXLfeCastrCarneArroz 2x15kg BR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
12551459	DOGCHOWXLfeCastrCarneArroz 5x3kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12551463	DOGCHOWXLfeSeniorRacaPqCarArz 5x3kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12551473	DOGCHOWXLfeSeniorMedGdeCarArz 2x15kg BR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
12552456	DOGCHOWXLfeAdltRacaPqFrgArz 10x1kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12562153	NESCAFE DUSTG Genio S Plus MqPreta 1x1	SISTEMA DOLCE GUSTO	MAQUINAS E ACESSORIOS G1
12562154	NESCAFE DUSTG Genio S Plus MqVerm 1x1	SISTEMA DOLCE GUSTO	MAQUINAS E ACESSORIOS G1
12562164	NESCAFE DUSTG Neo MqBranca 1x1	SISTEMA DOLCE GUSTO	MAQUINAS E ACESSORIOS G1
12562294	FRISKIES Dry Adlt MixCarResFrg10x1kgBR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12562410	FRISKIES Dry Castr CenVeg 10x1kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12571519	FRISKIES Dry Adlt MixCarResFrg 4x3kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12571524	FRISKIES Dry Castr CenVeg 4x3kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12586544	DOGCHOWXLfeFilhCarneArroz 10x1kg BR	PREMIUM DRY DOG	DOG CHOW DRY SMALL BAGS
12613348	DOGCHOW Pouch AdltSaborFrango30x100gN1BR	WET	DOG CHOW WET POUCH
12613546	FRISKIES Dry Filh FrgLteCenVeg10x1kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12613548	FRISKIES Dry Adlt MixPeixAtSal10x1kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12613559	FRISKIES Dry Adlt DelMar AtuLag10x1kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12613570	FRISKIES Dry Filh FrgLteCenVeg 4x3kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12613573	FRISKIES Dry Adlt MixPeixAtSal 4x3kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12627358	FRISKIES Dry Adlt DelMar AtuLag 4x3kg BR	PREMIUM DRY CAT	FRISKIES DRY SMALL BAGS
12629924	DOGCHOWXLfeContrPesoCarneArz 2x15kg BR	PREMIUM DRY DOG	DOG CHOW DRY LARGE BAGS
13389256	NESTLE Chocotrio aoLeite ST 4(12x90g) BR	CHOCOLATES NESTLE	NESTLE CHOCOTRIO
13528301	NEGRESCO Biscoito Rech Mrg 66x90g N1 BR	BISCOITOS	BISCOITOS RECHEADOS NEGRESCO`;

const lines = userListRaw.split('\n').filter(l => l.trim().length > 0);
const codes = lines.map(line => line.split('\t')[0].trim());

const uploadDir = './public/uploads/produtos';

async function run() {
  console.log(`Starting upload and sync of ${codes.length} products to Supabase...`);
  
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const fileName = `${code}.png`;
    const localFilePath = path.join(uploadDir, fileName);
    
    if (!fs.existsSync(localFilePath)) {
      console.warn(`[${i+1}/${codes.length}] Warning: ${localFilePath} does not exist. Skipping.`);
      continue;
    }
    
    const buffer = fs.readFileSync(localFilePath);
    const storagePath = `${code}.png`;
    
    console.log(`[${i+1}/${codes.length}] Uploading ${fileName} to storage...`);
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(storagePath, buffer, {
        upsert: true,
        contentType: 'image/png',
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
    
    // Add a tiny delay to avoid hitting rate limits
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log("\nFinished uploading and database synchronization!");
}

run();
