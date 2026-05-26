const fs = require('fs');
fs.appendFileSync('./src/data/products.ts', '\nexport const allCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();\nexport const allBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();\n');
console.log('done');
