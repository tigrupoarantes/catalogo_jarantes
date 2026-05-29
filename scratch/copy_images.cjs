const fs = require('fs');
const path = require('path');

// Generated master images paths
const masters = {
  fancyFeast: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_fancy_feast_1779904081027.png`,
  oneDog: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_one_dog_1779904101472.png`,
  oneCat: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_one_cat_1779904120599.png`,
  dogChowDry: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_dog_chow_1779904139456.png`,
  dogChowWet: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_dog_pouch_1779904158197.png`,
  doguitos: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_doguitos_1779904177010.png`,
  alpo: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_alpo_1779904197528.png`,
  friskiesCat: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_friskies_1779904215249.png`,
  dustgBox: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_dustg_box_1779904240080.png`,
  genioS: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_genio_s_1779904259211.png`,
  neo: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_neo_1779904279091.png`,
  chocotrio: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_chocotrio_1779904297047.png`,
  negresco: `C:\\Users\\philipe.zirnberger\\.gemini\\antigravity-ide\\brain\\7b49d2e4-dc6a-4384-95fe-827e89eb3926\\master_negresco_1779904315934.png`
};

const mappings = {
  // Fancy Feast wet cat pouches
  "12526276": masters.fancyFeast,
  "12526286": masters.fancyFeast,
  "12526301": masters.fancyFeast,
  "12526303": masters.fancyFeast,
  "12526310": masters.fancyFeast,
  "12526404": masters.fancyFeast,

  // Purina ONE dog bags
  "12454108": masters.oneDog,
  "12454109": masters.oneDog,
  "12454127": masters.oneDog,
  "12454208": masters.oneDog,
  "12454492": masters.oneDog,

  // Purina ONE cat bags
  "12454676": masters.oneCat,
  "12455098": masters.oneCat,
  "12455107": masters.oneCat,

  // Dog Chow Dry bags
  "12501474": masters.dogChowDry,
  "12551257": masters.dogChowDry,

  // Dog Chow Wet pouch
  "12613348": masters.dogChowWet,

  // Doguitos
  "12378083": masters.doguitos,

  // Alpo
  "12489996": masters.alpo,

  // Friskies dry cat bags
  "12562294": masters.friskiesCat,
  "12562410": masters.friskiesCat,
  "12571519": masters.friskiesCat,
  "12571524": masters.friskiesCat,
  "12613546": masters.friskiesCat,
  "12613548": masters.friskiesCat,
  "12613559": masters.friskiesCat,
  "12613570": masters.friskiesCat,
  "12613573": masters.friskiesCat,

  // Dolce Gusto boxes
  "12519987": masters.dustgBox,
  "12519988": masters.dustgBox,
  "12520004": masters.dustgBox,

  // Dolce Gusto machines
  "12520229": masters.genioS,
  "12520236": masters.genioS,
  "12562153": masters.genioS,
  "12562154": masters.genioS,
  "12562164": masters.neo,

  // Chocotrio & Negresco
  "13389256": masters.chocotrio,
  "13528301": masters.negresco
};

const destDir = './public/uploads/produtos';

let count = 0;
for (const [code, srcPath] of Object.entries(mappings)) {
  const destPath = path.join(destDir, `${code}.png`);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied master to ${destPath}`);
    count++;
  } catch (err) {
    console.error(`Error copying ${srcPath} to ${destPath}:`, err.message);
  }
}

console.log(`\nSuccessfully mapped and copied ${count} images!`);
