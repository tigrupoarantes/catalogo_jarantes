const fs = require('fs');
const content = fs.readFileSync('./src/data/products.ts', 'utf8');

const lines = content.split('\n');
const imageUrlLines = lines.filter(l => l.includes('imageUrl') && !l.includes('null') && !l.includes('?'));
console.log(imageUrlLines);
