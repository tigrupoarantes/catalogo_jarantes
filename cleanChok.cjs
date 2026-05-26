const fs = require('fs');

const content = fs.readFileSync('./src/data/products.ts', 'utf-8');

// The file exports `products` array and `allCategories`, `allBrands`.
// We can parse the array out, filter it, and rewrite it.
// The easiest way is to read the original JSON, filter, and run the same generation code.

let data = JSON.parse(fs.readFileSync('./src/products.json', 'utf-8'));

// Filter out anything related to 'Chok'
data = data.filter(p => {
    const name = String(p['DESCRIÇÃO'] || '').toLowerCase();
    const brand = String(p['CATEGORIA'] || '').toLowerCase();
    const cat = String(p['SUB CATEGORIA'] || '').toLowerCase();
    return !name.includes('chok') && !brand.includes('chok') && !cat.includes('chok');
});

const images = fs.readdirSync('./public/Imagens de Produtos');

// helper
function normalize(str) {
    if (!str) return '';
    return str.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function findImage(code, ean, name) {
    let match = images.find(i => i.includes(code) || i.includes(ean));
    if (match) return match;

    const eanNoZeros = ean.replace(/^0+/, '');
    if (eanNoZeros.length > 5) {
       match = images.find(i => i.includes(eanNoZeros));
       if (match) return match;
    }

    const normName = normalize(name);
    if (normName.length > 8) {
       match = images.find(i => {
          const normImg = normalize(i.replace('.png', '').replace('.jpg', ''));
          return normName.includes(normImg) || normImg.includes(normName);
       });
       if (match) return match;
    }

    if (name.toUpperCase().includes('SUFLAIR')) {
         const altName = name.toUpperCase().replace('SUFLAIR', 'SFLR');
         const normAltName = normalize(altName);
         match = images.find(i => {
           const normImg = normalize(i.replace('.png', '').replace('.jpg', ''));
           return normAltName.includes(normImg) || normImg.includes(normAltName);
         });
         if (match) return match;
    }
    
    const chunks = name.split(' ').filter(x => x.length > 4);
    for (const img of images) {
        if (img.includes('.db')) continue;
        const normImg = normalize(img);
        let matches = 0;
        for (const chunk of chunks) {
            if (normImg.includes(normalize(chunk))) {
                matches++;
            }
        }
        if (matches >= 2) return img; 
    }

    return null;
}

const productsTsData = data.map(p => {
  const code = String(p['CÓDIGO']);
  const ean = String(p['EAN']).padStart(13, '0');
  const name = String(p['DESCRIÇÃO'] || '');
  
  let imageMatch = findImage(code, ean, name);
  
  return {
    code: code,
    name: name,
    brand: p['CATEGORIA'] ? String(p['CATEGORIA']) : '',
    category: p['SUB CATEGORIA'] ? String(p['SUB CATEGORIA']) : '',
    packSize: String(p['FATOR'] || ''),
    ean: ean,
    imageUrl: imageMatch ? '/Imagens de Produtos/' + encodeURIComponent(imageMatch) : null
  };
});

const fileContent = `export interface Product {
  code: string;
  name: string;
  brand: string;
  category: string;
  packSize: string;
  ean: string;
  imageUrl?: string | null;
}

export const products: Product[] = ${JSON.stringify(productsTsData, null, 2)};

export const allCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();
export const allBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();
`;

fs.writeFileSync('./src/data/products.ts', fileContent);
console.log('Removed all Chok products and rewrote products.ts. Remaining: ' + productsTsData.length);
