"use strict";
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/products.json', 'utf-8'));
const images = fs.readdirSync('./public/Imagens de Produtos');

let count = 0;
for (const p of data) {
  const code = String(p['CÓDIGO']);
  const ean = String(p['EAN']);
  
  const byCode = images.find(i => i.includes(code));
  const byEan = images.find(i => i.includes(ean));
  if (byCode || byEan) count++;
}
console.log(`Matched ${count} products with images!`);
