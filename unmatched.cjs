const fs = require('fs');
const content = fs.readFileSync('./src/data/products.ts', 'utf8');

const images = fs.readdirSync('./public/Imagens de Produtos')
  .filter(f => !f.includes('.db'));

const unmatched = [];
for (let img of images) {
  // Try to find if this image is present in the products.ts content
  const encoded1 = encodeURIComponent(img); // original method
  const encoded2 = encodeURIComponent(img).replace(/%28/g, '(').replace(/%29/g, ')'); // current method
  if (!content.includes(encoded2)) {
    unmatched.push(img);
  }
}
console.log(`Unmatched images (${unmatched.length}):`);
console.log(unmatched.join('\n'));
