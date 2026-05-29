const xlsx = require('xlsx');
const fs = require('fs');

const file = "./scratch/old_excel.xlsx";
if (!fs.existsSync(file)) {
  console.error("Excel file does not exist!");
  process.exit(1);
}

const workbook = xlsx.readFile(file);
const sheetName = workbook.SheetNames[0];
console.log(`Sheet name: ${sheetName}`);

const sheet = workbook.Sheets[sheetName];
const rawData = xlsx.utils.sheet_to_json(sheet);

console.log(`Total rows in Excel: ${rawData.length}`);
if (rawData.length > 0) {
  console.log("\nSample Row keys:", Object.keys(rawData[0]));
  console.log("\nSample Rows:");
  console.log(rawData.slice(0, 5));
  
  // Let's write the JSON representation to scratch folder
  fs.writeFileSync('./scratch/old_excel_data.json', JSON.stringify(rawData, null, 2));
  console.log("\nSaved json representation to ./scratch/old_excel_data.json");
}
