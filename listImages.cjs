const fs = require('fs');
const images = fs.readdirSync('./public/Imagens de Produtos');
console.log(images.slice(0, 50).join('\n'));
