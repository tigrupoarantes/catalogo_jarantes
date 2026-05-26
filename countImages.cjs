const fs = require('fs');
const images = fs.readdirSync('./public/Imagens de Produtos');
console.log('Total images: ' + images.length);
