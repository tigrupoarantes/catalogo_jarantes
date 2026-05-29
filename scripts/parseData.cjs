"use strict";
const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('./Itens.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync('./src/products.json', JSON.stringify(data, null, 2));
console.log("Products extracted successfully!");
