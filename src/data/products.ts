export interface Product {
  code: string;
  name: string;
  brand: string;
  category: string;
  packSize: string;
  ean: string;
  imageUrl?: string | null;
  isNew?: boolean;
}

export function parseProductTechnicalData(product: Product) {
  const parts = (product.ean || "").split("|");
  return {
    ean: parts[0] || "",
    ncm: parts[1] || "",
    dun: parts[2] || "",
    isNew: parts[3] === "true" || !!product.isNew
  };
}

export function serializeProductTechnicalData(ean: string, ncm: string, dun: string, isNew?: boolean) {
  return `${ean || ""}|${ncm || ""}|${dun || ""}|${isNew ? "true" : "false"}`;
}

export const products: Product[] = [
  {
    "code": "411201",
    "name": "NESTLE Creme de Leite Lata 48x300g BR",
    "brand": "LEITES CULINARIOS",
    "category": "CREME LATA",
    "packSize": "48",
    "ean": "7891000120101|0401.50.29|17891000012014|false",
    "imageUrl": "/uploads/produtos/411201.png",
    "isNew": false
  },
  {
    "code": "411269",
    "name": "NESTLE Creme de Leite Uht 27x200g BR",
    "brand": "LEITES CULINARIOS",
    "category": "CREME TP",
    "packSize": "27",
    "ean": "7891000126905|0401.50.21|17891000012694|false",
    "imageUrl": "/uploads/produtos/411269 - NESTLE Creme de Leite Uht 27x200g BR.png",
    "isNew": false
  },
  {
    "code": "412340",
    "name": "NUTREN ACTIVE PBIO1 Baunilha 12x400g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN ACTIVE",
    "packSize": "12",
    "ean": "7891000234006|1901.90.90|17891000003692|false",
    "imageUrl": "/uploads/produtos/412340.png",
    "isNew": false
  },
  {
    "code": "412341",
    "name": "NUTREN ACTIVE PBIO1 Chocolate 12x400g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN ACTIVE",
    "packSize": "12",
    "ean": "7891000234105|2106.90.30|17891000003708|false",
    "imageUrl": "/uploads/produtos/412341.png",
    "isNew": false
  },
  {
    "code": "412681",
    "name": "NESTON Vitamina MrgPB 24x400g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTON LATA",
    "packSize": "24",
    "ean": "7891000268100|1104.29.00|17891000026813|false",
    "imageUrl": "/uploads/produtos/412681 - NESTON Vitamina MrgPB 24x400g BR.png",
    "isNew": false
  },
  {
    "code": "412685",
    "name": "NESTON Vitamina MamaoBM 24x400g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTON LATA",
    "packSize": "24",
    "ean": "7891000268506|1104.29.00|17891000026851|false",
    "imageUrl": "/uploads/produtos/412685 - NESTON Vitamina MamaoBM 24x400g BR.png",
    "isNew": false
  },
  {
    "code": "413695",
    "name": "SNOW FLAKES Cereal Matinal 14x620g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW 300G+",
    "packSize": "14",
    "ean": "7891000369500|1904.10.00|17891000036959|false",
    "imageUrl": "/uploads/produtos/413695 - SNOW FLAKES Cereal Matinal 14x620g BR (2).png",
    "isNew": false
  },
  {
    "code": "414216",
    "name": "CHOKITO Chocolate 18(30x32g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000462300|1806.31.20|17891000002930|false",
    "imageUrl": "/uploads/produtos/414216 - CHOKITO Chocolate 18(30x32g) BR.png",
    "isNew": false
  },
  {
    "code": "414513",
    "name": "NESTLE Choc em Po Soluvel 25x200g XI",
    "brand": "CHOCOLATES NESTLE",
    "category": "POS NESTLE",
    "packSize": "25",
    "ean": "7891000451304|1806.10.00|17891000045135|false",
    "imageUrl": "/uploads/produtos/414513 - NESTLE Choc em Po Soluvel 25x200g XI.png",
    "isNew": false
  },
  {
    "code": "414602",
    "name": "PRESTIGIO Chocolate 30x33g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000460207|1806.31.20|17891000046026|false",
    "imageUrl": "/uploads/produtos/414602 - PRESTIGIO Chocolate 30x33g BR.png",
    "isNew": false
  },
  {
    "code": "414649",
    "name": "CHARGE Chocolate 12(30x40g) XW",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000464908|1806.31.20|17891000046491|false",
    "imageUrl": "/uploads/produtos/414649 - CHARGE Chocolate 12(30x40g) XW.png",
    "isNew": false
  },
  {
    "code": "415013",
    "name": "MAGGI Amaciante Car c/ Tempero 30x120gBR",
    "brand": "MAGGI",
    "category": "TEMPEROS FRASCO",
    "packSize": "30",
    "ean": "7891000502303|3507.90.49|17891000000097|false",
    "imageUrl": "/uploads/produtos/415013 - MAGGI Amaciante Car c Tempero 30x120gBR.png",
    "isNew": false
  },
  {
    "code": "415084",
    "name": "MAGGI MEU SEGREDO Temp Gran 42(7x7g)BR",
    "brand": "MAGGI",
    "category": "TEMPEROS CARTONADO",
    "packSize": "42",
    "ean": "7891000006689|2103.90.21|17891000005153|false",
    "imageUrl": "/uploads/produtos/415084 - MAGGI MEU SEGREDO Temp Gran 42(7x7g)BR.png",
    "isNew": false
  },
  {
    "code": "415306",
    "name": "MAGGI Sopa Cebola 12x68g BR",
    "brand": "MAGGI",
    "category": "DEMAIS SOPAS",
    "packSize": "12",
    "ean": "7891000530603|2104.10.11|17891000053062|false",
    "imageUrl": "/uploads/produtos/415306 - MAGGI Sopa Cebola 12x68g BR.png",
    "isNew": false
  },
  {
    "code": "415385",
    "name": "MAGGI Creme Cebola 12x68g BR",
    "brand": "MAGGI",
    "category": "DEMAIS SOPAS",
    "packSize": "12",
    "ean": "7891000538500|2104.10.11|17891000053857|false",
    "imageUrl": "/uploads/produtos/415385 - MAGGI Creme Cebola 12x68g BR.png",
    "isNew": false
  },
  {
    "code": "415400",
    "name": "MAGGI Sopao Sp Costela 24x200g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000026182|2104.10.11|7891000026199|false",
    "imageUrl": "/uploads/produtos/415400 - MAGGI Sopao Sp Costela 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "415444",
    "name": "MAGGI Sopa Carne&Conchinhas 10x63g BR",
    "brand": "MAGGI",
    "category": "DEMAIS SOPAS",
    "packSize": "10",
    "ean": "7891000544402|2104.10.11|17891000054441|false",
    "imageUrl": "/uploads/produtos/415444 - MAGGI Sopa Carne&Conchinhas 10x63g BR.png",
    "isNew": false
  },
  {
    "code": "415446",
    "name": "MAGGI Sopa Gl&Fidelini 12(10x60g BR",
    "brand": "MAGGI",
    "category": "DEMAIS SOPAS",
    "packSize": "10",
    "ean": "7891000544600|2104.10.11|17891000054465|false",
    "imageUrl": "/uploads/produtos/415446 - MAGGI Sopa Gl&Fidelini 12(10x60g BR.png",
    "isNew": false
  },
  {
    "code": "415820",
    "name": "MAGGI Sopao Galinha 24x200g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000582008|2104.10.11|17891000058203|false",
    "imageUrl": "/uploads/produtos/415820 - MAGGI Sopao Galinha 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "415821",
    "name": "MAGGI Sopao Sp Carne 24x200g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000582107|2104.10.11|17891000058210|false",
    "imageUrl": "/uploads/produtos/415821 - MAGGI Sopao Sp Carne 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "415823",
    "name": "MAGGI SOPaO Sp Canja Galinha 24x200g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000582305|2104.10.11|17891000058234|false",
    "imageUrl": "/uploads/produtos/415823 - MAGGI SOPaO Sp Canja Galinha 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "418817",
    "name": "TOSTINES Bisc Cracker Agua 40x200g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS SALGADOS",
    "packSize": "40",
    "ean": "7891168100069|1905.31.00|17891168100066|false",
    "imageUrl": "/uploads/produtos/418817.png",
    "isNew": false
  },
  {
    "code": "418872",
    "name": "TOSTINES Biscoito Maisena 40x200g XI",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES TOSTINES",
    "packSize": "40",
    "ean": "7891168100014|1905.31.00|17891168100011|false",
    "imageUrl": "/uploads/produtos/418872 - TOSTINES Biscoito Maisena 40x200g XI.png",
    "isNew": false
  },
  {
    "code": "418897",
    "name": "CALIPSO Biscoito Coberto 40x130g XI",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COBERTOS",
    "packSize": "40",
    "ean": "7891000889701|1905.31.00|17891000088972|false",
    "imageUrl": "/uploads/produtos/418897 - CALIPSO Biscoito Coberto 40x130g XI.png",
    "isNew": false
  },
  {
    "code": "6220411",
    "name": "SBUX PIKE PLACE Rst SRP 12x53g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "7613036961745|0901.21.00|7613037048223|false",
    "imageUrl": "/uploads/produtos/6220411 - SBUX PIKE PLACE Rst SRP 12x53g B11.png",
    "isNew": false
  },
  {
    "code": "6220511",
    "name": "SBUX COLOMBIA SO SRP 12x57g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "7613036961448|0901.21.00|7613037048124|false",
    "imageUrl": "/uploads/produtos/6220511 - SBUX COLOMBIA SO SRP 12x57g B11.png",
    "isNew": false
  },
  {
    "code": "6220711",
    "name": "SBUX BLNDE ESPRS Rst SRP 12x53g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "7613036961004|0901.21.00|7613037048278|false",
    "imageUrl": "/uploads/produtos/6220711 - SBUX BLNDE ESPRS Rst SRP 12x53g B11.png",
    "isNew": false
  },
  {
    "code": "6223111",
    "name": "SBUX ESPRS RST SRP 12x55g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291367272|0901.21.00|8445291369153|false",
    "imageUrl": "/uploads/produtos/6223111 - SBUX ESPRS RST SRP 12x55g B11.png",
    "isNew": false
  },
  {
    "code": "6620911",
    "name": "NESC ANDES SRP 12x44g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291159693|0901.21.00|8445291159686|false",
    "imageUrl": "/uploads/produtos/6620911 - NESC ANDES SRP 12x44g R11.png",
    "isNew": false
  },
  {
    "code": "6621011",
    "name": "NESC COL SRP 12x44g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291111257|0901.21.00|8445291111240|false",
    "imageUrl": "/uploads/produtos/6621011 - NESC COL SRP 12x44g R11.png",
    "isNew": false
  },
  {
    "code": "6621211",
    "name": "NESC BRAZIL SRP 12x44g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291144385|0901.21.00|8445291144378|false",
    "imageUrl": "/uploads/produtos/6621211 - NESC BRAZIL SRP 12x44g R11.png",
    "isNew": false
  },
  {
    "code": "6621311",
    "name": "NESC INDIA SRP 12x44g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291150249|0901.21.00|8445291150232|false",
    "imageUrl": "/uploads/produtos/6621311 - NESC INDIA SRP 12x44g R11.png",
    "isNew": false
  },
  {
    "code": "6621411",
    "name": "NESC AFRICAS SRP 12x44g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291149878|0901.21.00|8445291149861|false",
    "imageUrl": "/uploads/produtos/6621411 - NESC AFRICAS SRP 12x44g R11.png",
    "isNew": false
  },
  {
    "code": "6621511",
    "name": "NESC SOUTH ASIA SRP 12x46g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291159969|0901.21.00|8445291159952|false",
    "imageUrl": "/uploads/produtos/6621511 - NESC SOUTH ASIA SRP 12x46g R11.png",
    "isNew": false
  },
  {
    "code": "6621611",
    "name": "NESC MEXICO SRP 12x44g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291143968|0901.21.00|8445291143951|false",
    "imageUrl": "/uploads/produtos/6621611 - NESC MEXICO SRP 12x44g R11.png",
    "isNew": false
  },
  {
    "code": "11320040",
    "name": "GAROTO Chocolate em Po 20x200g XI",
    "brand": "GAROTO",
    "category": "POS GAROTO",
    "packSize": "20",
    "ean": "7891008040029|1806.10.00|27891008040030|false",
    "imageUrl": "/uploads/produtos/11320040 - GAROTO Chocolate em Po 20x200g XI.png",
    "isNew": false
  },
  {
    "code": "11320042",
    "name": "GAROTO Cacau em Po 20x200g XW",
    "brand": "GAROTO",
    "category": "POS GAROTO",
    "packSize": "20",
    "ean": "7891008042023|1805.00.00|27891008042034|false",
    "imageUrl": "/uploads/produtos/11320042 - GAROTO Cacau em Po 20x200g XW.png",
    "isNew": false
  },
  {
    "code": "11320197",
    "name": "TALENTO Tab Leite Amen Pas 18(15x25g) XW",
    "brand": "GAROTO",
    "category": "TABLETES GAROTO",
    "packSize": "15",
    "ean": "78907492|1806.32.10|27891008197031|false",
    "imageUrl": "/uploads/produtos/11320197 - TALENTO Tab Leite Amen Pas 18(15x25g) XW.png",
    "isNew": false
  },
  {
    "code": "11320198",
    "name": "TALENTO Tab Leite Cast Para 18(15x25g)XW",
    "brand": "GAROTO",
    "category": "TABLETES GAROTO",
    "packSize": "15",
    "ean": "78907478|1806.32.10|27891008198038|false",
    "imageUrl": "/uploads/produtos/11320198 - TALENTO Tab Leite Cast Para 18(15x25g)XW.png",
    "isNew": false
  },
  {
    "code": "11320199",
    "name": "TALENTO Tab Choc Bco Cer 18(15x25g) XW",
    "brand": "GAROTO",
    "category": "TABLETES GAROTO",
    "packSize": "15",
    "ean": "78907485|1704.90.10|27891008199035|false",
    "imageUrl": "/uploads/produtos/11320199 - TALENTO Tab Choc Bco Cer 18(15x25g) XW.png",
    "isNew": false
  },
  {
    "code": "11320209",
    "name": "TALENTO Tab Leite Avelas 18(15x25g) XW",
    "brand": "GAROTO",
    "category": "TABLETES GAROTO",
    "packSize": "15",
    "ean": "78907461|1806.32.10|27891008209031|false",
    "imageUrl": "/uploads/produtos/11320209 - TALENTO Tab Leite Avelas 18(15x25g) XW.png",
    "isNew": false
  },
  {
    "code": "11320331",
    "name": "BATON Bastao Choc Branco 32(30x16g)XW",
    "brand": "GAROTO",
    "category": "BATON",
    "packSize": "30",
    "ean": "78912366|1704.90.10|27891008331039|false",
    "imageUrl": "/uploads/produtos/11320331 - BATON Bastao Choc Branco 32(30x16g)XW.png",
    "isNew": false
  },
  {
    "code": "11320367",
    "name": "BATON Bastao Choc Leite 32(30x16g)XW",
    "brand": "GAROTO",
    "category": "BATON",
    "packSize": "30",
    "ean": "78912359|1806.32.10|27891008367038|false",
    "imageUrl": "/uploads/produtos/11320367 - BATON Bastao Choc Leite 32(30x16g)XW.png",
    "isNew": false
  },
  {
    "code": "11322004",
    "name": "GAROTO Pastilha Hortela 24(40x17g) XW",
    "brand": "GAROTO",
    "category": "PASTILHAS",
    "packSize": "40",
    "ean": "78910041|1704.90.20|17891008200437|false",
    "imageUrl": "/uploads/produtos/11322004 - GAROTO Pastilha Hortela 24(40x17g) XW.jpg",
    "isNew": false
  },
  {
    "code": "11324001",
    "name": "TALENTO Tab Diet Avelas 12(15x25g) XI",
    "brand": "GAROTO",
    "category": "TABLETES GAROTO",
    "packSize": "15",
    "ean": "78917125|1806.32.10|17891008074038|false",
    "imageUrl": "/uploads/produtos/11324001 - TALENTO Tab Diet Avelas 12(15x25g) XI.png",
    "isNew": false
  },
  {
    "code": "12028625",
    "name": "NESCAFE ORIGINAL 24x100g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 100G",
    "packSize": "24",
    "ean": "7891000300503|2101.11.10|17891000030056|false",
    "imageUrl": "/uploads/produtos/12028625 - NESCAFE ORIGINAL 24x100g BR.png",
    "isNew": false
  },
  {
    "code": "12029252",
    "name": "NESCAFE TRADICAO 24x100g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 100G",
    "packSize": "24",
    "ean": "7891000029329|2101.11.10|7891000029336|false",
    "imageUrl": "/uploads/produtos/12029252 - NESCAFE TRADICAO 24x100g BR.png",
    "isNew": false
  },
  {
    "code": "12029565",
    "name": "NESCAFE MATINAL 24x100g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 100G",
    "packSize": "24",
    "ean": "7891000315507|2101.11.10|17891000031558|false",
    "imageUrl": "/uploads/produtos/12029565 - NESCAFE MATINAL 24x100g BR.png",
    "isNew": false
  },
  {
    "code": "12041117",
    "name": "MAGGI Sopao Galinha Caipira 24x200g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000049891|2104.10.11|7891000049907|false",
    "imageUrl": "/uploads/produtos/12041117 - MAGGI Sopao Galinha Caipira 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "12045051",
    "name": "PASSATEMPO Biscoito Leite 54x150g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES PASSATEMPO",
    "packSize": "54",
    "ean": "7891000051436|1905.31.00|7891000051443|false",
    "imageUrl": "/uploads/produtos/12045051 - PASSATEMPO Biscoito Leite 54x150g BR.png",
    "isNew": false
  },
  {
    "code": "12091059",
    "name": "MOCA Lei CondSemiDesnCaixinha 27x395g BR",
    "brand": "LEITES CULINARIOS",
    "category": "MOCA CAIXINHA",
    "packSize": "27",
    "ean": "7891000065440|0402.99.00|7891000065457|false",
    "imageUrl": "/uploads/produtos/12091059 - MOCA Lei CondSemiDesnCaixinha 27x395g BR.png",
    "isNew": false
  },
  {
    "code": "12097176",
    "name": "ALPINO Bebida Garrafa Plas 4(6x280ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS REGULAR",
    "packSize": "24",
    "ean": "7891000067048|2202.99.00EX01|7891000067062|false",
    "imageUrl": "/uploads/produtos/12097176 - ALPINO Bebida Garrafa Plas 4(6x280ml) BR.png",
    "isNew": false
  },
  {
    "code": "12099104",
    "name": "ALPINO Chocolate Bag 24x195g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CAIXAS ESPECIAIS NESTLE",
    "packSize": "24",
    "ean": "7891000067253|1806.90.00|7891000067260|false",
    "imageUrl": "/uploads/produtos/12099104 - ALPINO Chocolate Bag 24x195g BR.png",
    "isNew": false
  },
  {
    "code": "12105545",
    "name": "MUCILON  Multicereais Lata 18x400g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON TRAD LATA",
    "packSize": "18",
    "ean": "7891000035832|1901.10.30|7891000035849|false",
    "imageUrl": "/uploads/produtos/12105545.png",
    "isNew": false
  },
  {
    "code": "12105548",
    "name": "MUCILON Milho Lata 18x400g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON TRAD LATA",
    "packSize": "18",
    "ean": "7891000011294|1901.10.30|17891000009250|false",
    "imageUrl": "/uploads/produtos/12105548 - MUCILON Milho Lata 18x400g BR.png",
    "isNew": false
  },
  {
    "code": "12105550",
    "name": "MUCILON Arroz Lata 18x400g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON TRAD LATA",
    "packSize": "18",
    "ean": "7891000011287|1901.10.30|17891000009243|false",
    "imageUrl": "/uploads/produtos/12105550 - MUCILON Arroz Lata 18x400g BR.png",
    "isNew": false
  },
  {
    "code": "12106251",
    "name": "MUCILON Arroz Aveia Lata 18x400g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON TRAD LATA",
    "packSize": "18",
    "ean": "7891000040898|1901.10.30|7891000040904|false",
    "imageUrl": "/uploads/produtos/12106251.png",
    "isNew": false
  },
  {
    "code": "12127625",
    "name": "MUCILON Arroz e Aveia Sachet 9x600g N1BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 600G",
    "packSize": "9",
    "ean": "7891000073100|1901.10.30|7891000073117|false",
    "imageUrl": "/uploads/produtos/12127625 - MUCILON Arroz e Aveia Sachet 9x600g N1BR (1).png",
    "isNew": false
  },
  {
    "code": "12136357",
    "name": "PRESTIGIO Wafer 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000077924|1905.32.00|7891000077931|false",
    "imageUrl": "/uploads/produtos/12136357 - PRESTIGIO Wafer 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12136358",
    "name": "CLASSIC Wafer 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000077948|1905.32.00|7891000077955|false",
    "imageUrl": "/uploads/produtos/12136358 - CLASSIC Wafer 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12136359",
    "name": "NEGRESCO Wafer 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000077962|1905.32.00|7891000077979|false",
    "imageUrl": "/uploads/produtos/12136359 - NEGRESCO Wafer 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12138557",
    "name": "NESTLE Farinha Lactea Trdl Sac 9x600g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "FARINHA LACTEA SACHET 600G+",
    "packSize": "9",
    "ean": "7891000078518|1901.10.20|7891000078525|false",
    "imageUrl": "/uploads/produtos/12138557 - NESTLE Farinha Lactea Trdl Sac 9x600g BR.jpg",
    "isNew": false
  },
  {
    "code": "12146794",
    "name": "PASSATEMPO Mini Wfr Mrg 16(28x20g) BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "28",
    "ean": "7891000081211|1905.32.00|7891000081235|false",
    "imageUrl": "/uploads/produtos/12146794 - PASSATEMPO Mini Wfr Mrg 16(28x20g) BR.png",
    "isNew": false
  },
  {
    "code": "12146795",
    "name": "PASSATEMPO MiniWfrChoc 16(28x20g)BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "28",
    "ean": "7891000081242|1905.32.00|7891000081266|false",
    "imageUrl": "/uploads/produtos/12146795 - PASSATEMPO MiniWfrChoc 16(28x20g)BR.png",
    "isNew": false
  },
  {
    "code": "12150285",
    "name": "NESCAU Prontinho Bebida Lactea 12x1L BR",
    "brand": "RTD KIDS",
    "category": "RTD KIDS 1L",
    "packSize": "12",
    "ean": "7891000081501|2202.99.00EX01|7891000081518|false",
    "imageUrl": "/uploads/produtos/12150285 - NESCAU Prontinho Bebida Lactea 12x1L BR.png",
    "isNew": false
  },
  {
    "code": "12155337",
    "name": "BATON Bastao Duo 32(30x16g) XW",
    "brand": "GAROTO",
    "category": "BATON",
    "packSize": "30",
    "ean": "78930193|1806.32.10|27891008533730|false",
    "imageUrl": "/uploads/produtos/12155337 - BATON Bastao Duo 32(30x16g) XW.png",
    "isNew": false
  },
  {
    "code": "12171055",
    "name": "MUCILON Multicereais Sachet 9x600g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 600G",
    "packSize": "9",
    "ean": "7891000086131|1901.10.30|7891000086148|false",
    "imageUrl": "/uploads/produtos/12171055 - MUCILON Multicereais Sachet 9x600g BR.png",
    "isNew": false
  },
  {
    "code": "12177187",
    "name": "NUTREN KIDS Baunilha 12x350g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN KIDS",
    "packSize": "12",
    "ean": "7891000087794|2106.90.30|7891000087800|false",
    "imageUrl": "/uploads/produtos/12177187 - NUTREN KIDS Baunilha 12x350g BR.jpg",
    "isNew": false
  },
  {
    "code": "12177188",
    "name": "NUTREN KIDS Chocolate 12x350gBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN KIDS",
    "packSize": "12",
    "ean": "7891000087817|2106.90.30|7891000087824|false",
    "imageUrl": "/uploads/produtos/12177188 - NUTREN KIDS Chocolate 12x350gBR.png",
    "isNew": false
  },
  {
    "code": "12182407",
    "name": "CLASSIC Biscoito Recheado 60x140g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "60",
    "ean": "7891000089194|1905.31.00|7891000089200|false",
    "imageUrl": "/uploads/produtos/12182407 - CLASSIC Biscoito Recheado 60x140g BR.png",
    "isNew": false
  },
  {
    "code": "12182408",
    "name": "NESCAU Biscoito Recheado 60x140g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "60",
    "ean": "7891000089279|1905.31.00|7891000089286|false",
    "imageUrl": "/uploads/produtos/12182408 - NESCAU Biscoito Recheado 60x140g BR.png",
    "isNew": false
  },
  {
    "code": "12182409",
    "name": "MOCA Biscoito Recheado 60x140g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "60",
    "ean": "7891000089255|1905.31.00|7891000089262|false",
    "imageUrl": "/uploads/produtos/12182409 - MOCA Biscoito Recheado 60x140g BR.png",
    "isNew": false
  },
  {
    "code": "12182430",
    "name": "PRESTIGIO Biscoito Recheado 60x140g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "60",
    "ean": "7891000089231|1905.31.00|7891000089248|false",
    "imageUrl": "/uploads/produtos/12182430 - PRESTIGIO Biscoito Recheado 60x140g BR.png",
    "isNew": false
  },
  {
    "code": "12187083",
    "name": "NESTON Bebida Garrafa Plas 4(6x280ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS REGULAR",
    "packSize": "24",
    "ean": "7891000090732|2202.99.00|7891000090046|false",
    "imageUrl": "/uploads/produtos/12187083 - NESTON Bebida Garrafa Plas 4(6x280ml) BR.png",
    "isNew": false
  },
  {
    "code": "12196210",
    "name": "LOLLO Chocolate 12(30x28g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000092606|1806.31.20|7891000092620|false",
    "imageUrl": "/uploads/produtos/12196210 - LOLLO Chocolate 12(30x28g) BR.png",
    "isNew": false
  },
  {
    "code": "12223291",
    "name": "MAGGI Sopao Carne Panela 24x200g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000097694|2104.10.11|7891000097700|false",
    "imageUrl": "/uploads/produtos/12223291 - MAGGI Sopao Carne Panela 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "12227748",
    "name": "CLASSIC Diet Chocolate 12(22x25g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "TABLETES NESTLE",
    "packSize": "22",
    "ean": "7891000098844|1806.32.10|7891000098868|false",
    "imageUrl": "/uploads/produtos/12227748 - CLASSIC Diet Chocolate 12(22x25g) BR.png",
    "isNew": false
  },
  {
    "code": "12228413",
    "name": "NESTON 3 Cereais Sachet 12x210g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTON SACHET",
    "packSize": "12",
    "ean": "7891000098950|1104.29.00|7891000098967|false",
    "imageUrl": "/uploads/produtos/12228413 - NESTON 3 Cereais Sachet 12x210g BR.png",
    "isNew": false
  },
  {
    "code": "12228529",
    "name": "NESTLE Farlact Trdl Sachet 24x210g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "FARINHA LACTEA SACHET ATE 400G",
    "packSize": "24",
    "ean": "7891000099032|1901.10.20|7891000099049|false",
    "imageUrl": "/uploads/produtos/12228529 - NESTLE Farlact Trdl Sachet 24x210g BR.jpg",
    "isNew": false
  },
  {
    "code": "12234477",
    "name": "NESCAU Cereal Matinal 14x770g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU 300G+",
    "packSize": "14",
    "ean": "7891000100448|1904.10.00|7891000100455|false",
    "imageUrl": "/uploads/produtos/12234477 - NESCAU Cereal Matinal 14x770g BR.png",
    "isNew": false
  },
  {
    "code": "12240800",
    "name": "MOLICO LepoDesnSac TotalCalcio 12x500gBR",
    "brand": "MOLICO",
    "category": "MOLICO SACHET",
    "packSize": "12",
    "ean": "7891000101520|0402.21.20|7891000101537|false",
    "imageUrl": "/uploads/produtos/12240800 - MOLICO LepoDesnSac TotalCalcio 12x500gBR.jpg",
    "isNew": false
  },
  {
    "code": "12240801",
    "name": "MOLICO Lepo Desn Total Calcio 24x280g BR",
    "brand": "MOLICO",
    "category": "MOLICO LATA",
    "packSize": "24",
    "ean": "7891000101506|0402.21.20|7891000101513|false",
    "imageUrl": "/uploads/produtos/12240801 - MOLICO Lepo Desn Total Calcio 24x280g BR.png",
    "isNew": false
  },
  {
    "code": "12241562",
    "name": "NESTON Vitamina Mamao Bna Mc 24x210g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTON SACHET",
    "packSize": "24",
    "ean": "7891000101674|1104.29.00|7891000101681|false",
    "imageUrl": "/uploads/produtos/12241562 - NESTON Vitamina Mamao Bna Mc 24x210g BR.jpg",
    "isNew": false
  },
  {
    "code": "12242943",
    "name": "NESCAU Bebida Garrafa Plas 4(6x270ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS REGULAR",
    "packSize": "24",
    "ean": "7891000101926|2202.99.00EX01|7891000101940|false",
    "imageUrl": "/uploads/produtos/12242943 - NESCAU Bebida Garrafa Plas 4(6x270ml) BR.png",
    "isNew": false
  },
  {
    "code": "12243344",
    "name": "MOCA LeiCondTradlLataAbreFacil 48x395gBR",
    "brand": "LEITES CULINARIOS",
    "category": "MOCA LATA",
    "packSize": "48",
    "ean": "7891000100103|0402.99.00|17891000010010|false",
    "imageUrl": "/uploads/produtos/12243344.png",
    "isNew": false
  },
  {
    "code": "12246308",
    "name": "NESTLE Aveia Flocos 28x170g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS",
    "packSize": "28",
    "ean": "7891000102640|1104.12.00|7891000102657|false",
    "imageUrl": "/uploads/produtos/12246308 - NESTLE Aveia Flocos 28x170g BR.png",
    "isNew": false
  },
  {
    "code": "12246309",
    "name": "NESTLE Aveia Flocos Finos 28x170g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS",
    "packSize": "28",
    "ean": "7891000102626|1104.12.00|7891000102633|false",
    "imageUrl": "/uploads/produtos/12246309 - NESTLE Aveia Flocos Finos 28x170g BR.png",
    "isNew": false
  },
  {
    "code": "12248107",
    "name": "NUTREN SENIOR Po 6x740g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "6",
    "ean": "7891000103487|1901.90.90|7891000103494|false",
    "imageUrl": "/uploads/produtos/12248107 - NUTREN SENIOR Po 6x740g BR.png",
    "isNew": false
  },
  {
    "code": "12250611",
    "name": "NESQUIK Morango 24x380g BR",
    "brand": "BEBIDAS POS",
    "category": "NESQUIK",
    "packSize": "24",
    "ean": "7891000104101|2106.90.10|7891000104118|false",
    "imageUrl": "/uploads/produtos/12250611 - NESQUIK Morango 24x380g BR.png",
    "isNew": false
  },
  {
    "code": "12272482",
    "name": "SUFLAIR Chocolate Leite 12(20x50g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "TABLETES NESTLE",
    "packSize": "20",
    "ean": "7891000107836|1806.32.10|7891000107850|false",
    "imageUrl": "/uploads/produtos/12272482 - SUFLAIR Chocolate Leite 12(20x50g) BR.png",
    "isNew": false
  },
  {
    "code": "12273955",
    "name": "BATON Bastao Recheado Leite 32(30x16g)XW",
    "brand": "GAROTO",
    "category": "BATON",
    "packSize": "30",
    "ean": "78930230|1806.31.10|17891008339557|false",
    "imageUrl": "/uploads/produtos/12273955 - BATON Bastao Recheado Leite 32(30x16g)XW.png",
    "isNew": false
  },
  {
    "code": "12277350",
    "name": "TALENTO Tablete Meio Amargo 18(15x25g)BR",
    "brand": "GAROTO",
    "category": "TABLETES GAROTO",
    "packSize": "15",
    "ean": "78907355|1806.32.10|17891008373506|false",
    "imageUrl": "/uploads/produtos/12277350 - TALENTO Tablete Meio Amargo 18(15x25g)BR.png",
    "isNew": false
  },
  {
    "code": "12278536",
    "name": "PASSATEMPO Cookie Gotas Choc 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000109298|1905.31.00|7891000109304|false",
    "imageUrl": "/uploads/produtos/12278536 - PASSATEMPO Cookie Gotas Choc 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12290967",
    "name": "NESCAFE BebidaGarrafa Plas 4(6x270ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000110829|2202.99.00EX01|7891000110843|false",
    "imageUrl": "/uploads/produtos/12290967 - NESCAFE BebidaGarrafa Plas 4(6x270ml) BR.png",
    "isNew": false
  },
  {
    "code": "12301285",
    "name": "NINHO 3+ PBIO3 Fases Lepo 24x400g N3 BR",
    "brand": "NINHO FASES",
    "category": "NINHO FASES OUTROS",
    "packSize": "24",
    "ean": "7891000003404|1901.90.90|17891000003142|false",
    "imageUrl": "/uploads/produtos/12301285 - NINHO 3+ PBIO3 Fases Lepo 24x400g N3 BR.png",
    "isNew": false
  },
  {
    "code": "12303027",
    "name": "MUCILON Ameixa e Aveia 12x180g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000113295|1901.10.30|7891000113301|false",
    "imageUrl": "/uploads/produtos/12303027 - MUCILON Ameixa e Aveia 12x180g BR.png",
    "isNew": false
  },
  {
    "code": "12305178",
    "name": "KANINA Filhotes 15kg N3 BR",
    "brand": "MAINSTREAM",
    "category": "KANINA LARGE BAGS",
    "packSize": "1",
    "ean": "7896015605193|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12305178.jpg",
    "isNew": false
  },
  {
    "code": "12307594",
    "name": "MOCA FLAKES Cereal Mat Sachet 20x120g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "20",
    "ean": "7891000050927|1904.10.00|7891000116111|false",
    "imageUrl": "/uploads/produtos/12307594 - MOCA FLAKES Cereal Mat Sachet 20x120g BR.png",
    "isNew": false
  },
  {
    "code": "12307595",
    "name": "NESCAU Cereal Matinal Sachet 20x120g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU ATE 300G",
    "packSize": "20",
    "ean": "7891000070673|1904.10.00|7891000116104|false",
    "imageUrl": "/uploads/produtos/12307595 - NESCAU Cereal Matinal Sachet 20x120g BR (1).png",
    "isNew": false
  },
  {
    "code": "12307596",
    "name": "SNOW FLAKES Cer Mat Sachet 20x120g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW ATE 300G",
    "packSize": "20",
    "ean": "7891000050880|1904.10.00|7891000116128|false",
    "imageUrl": "/uploads/produtos/12307596 - SNOW FLAKES Cer Mat Sachet 20x120g BR.png",
    "isNew": false
  },
  {
    "code": "12310601",
    "name": "BONZO Adultos Carne e Cereais 18kg BR",
    "brand": "MAINSTREAM",
    "category": "BONZO LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116432|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12313896",
    "name": "BATON Bastao Rech Morango 32(30x16g) BR",
    "brand": "GAROTO",
    "category": "BATON",
    "packSize": "30",
    "ean": "78936911|1806.31.10|17891008338963|false",
    "imageUrl": "/uploads/produtos/12313896 - BATON Bastao Rech Morango 32(30x16g) BR.png",
    "isNew": false
  },
  {
    "code": "12316706",
    "name": "PRESTIGIO Dark Chocolate 18(30x33g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000118580|1806.90.00|7891000118603|false",
    "imageUrl": "/uploads/produtos/12316706 - PRESTIGIO Dark Chocolate 18(30x33g) BR.png",
    "isNew": false
  },
  {
    "code": "12321616",
    "name": "NESTLE Cacau em Po Soluvel 25x200g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "POS NESTLE",
    "packSize": "25",
    "ean": "7891000120095|1805.00.00|7891000120330|false",
    "imageUrl": "/uploads/produtos/12321616 - NESTLE Cacau em Po Soluvel 25x200g BR.png",
    "isNew": false
  },
  {
    "code": "12325104",
    "name": "PASSATEMPO Bisc Recheado Mrg 70x130g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "70",
    "ean": "7891000241295|1905.31.00|7891000241301|false",
    "imageUrl": "/uploads/produtos/12325104 - PASSATEMPO Bisc Recheado Mrg 70x130g BR.png",
    "isNew": false
  },
  {
    "code": "12325231",
    "name": "PASSATEMPO Bisc Recheado Choc 70x130g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "70",
    "ean": "7891000241356|1905.31.00|7891000241363|false",
    "imageUrl": "/uploads/produtos/12325231 - PASSATEMPO Bisc Recheado Choc 70x130g BR.png",
    "isNew": false
  },
  {
    "code": "12325232",
    "name": "PASSATEMPO Bisc Recheado Leite 70x130gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "70",
    "ean": "7891000241370|1905.31.00|7891000241387|false",
    "imageUrl": "/uploads/produtos/12325232 - PASSATEMPO Bisc Recheado Leite 70x130gBR.png",
    "isNew": false
  },
  {
    "code": "12329921",
    "name": "MAGGI Caldo Galinha Tira 35(24x19g) BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "24",
    "ean": "7891000242483|2104.10.11|7891000242490|false",
    "imageUrl": "/uploads/produtos/12329921 - MAGGI Caldo Galinha Tira 35(24x19g) BR.png",
    "isNew": false
  },
  {
    "code": "12329922",
    "name": "MAGGI Caldo Carne Tira 35(24x19g) BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "24",
    "ean": "7891000242452|2104.10.11|7891000242476|false",
    "imageUrl": "/uploads/produtos/12329922 - MAGGI Caldo Carne Tira 35(24x19g) BR.png",
    "isNew": false
  },
  {
    "code": "12340089",
    "name": "NEGRESCO Cookie Choc Gotas Baun 52x60gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000247624|1905.31.00|7891000247631|false",
    "imageUrl": "/uploads/produtos/12340089 - NEGRESCO Cookie Choc Gotas Baun 52x60gBR.png",
    "isNew": false
  },
  {
    "code": "12340110",
    "name": "CLASSIC Cookie Choc Gotas Choc 52x60gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000247648|1905.31.00|7891000247655|false",
    "imageUrl": "/uploads/produtos/12340110 - CLASSIC Cookie Choc Gotas Choc 52x60gBR.png",
    "isNew": false
  },
  {
    "code": "12342557",
    "name": "KIT KAT 4Fngr Leite 4(24x41.5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000248768|1905.32.00|7891000248782|false",
    "imageUrl": "/uploads/produtos/12342557 - KIT KAT 4Fngr Leite 4(24x41.5g) BR.png",
    "isNew": false
  },
  {
    "code": "12342558",
    "name": "KITKAT 4Fngr Dark 4(24x41,5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000248829|1905.32.00|7891000248843|false",
    "imageUrl": "/uploads/produtos/12342558 - KITKAT 4Fngr Dark 4(24x41,5g) BR.png",
    "isNew": false
  },
  {
    "code": "12343630",
    "name": "KITKAT 4Fngr Branco 4(24x41,5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000249239|1905.32.00|7891000249253|false",
    "imageUrl": "/uploads/produtos/12343630 - KITKAT 4Fngr Branco 4(24x41,5g) BR.png",
    "isNew": false
  },
  {
    "code": "12343960",
    "name": "MOLICOLepoDesnTotalCa24x280gPRAvestruzBR",
    "brand": "MOLICO",
    "category": "MOLICO LATA",
    "packSize": "24",
    "ean": "7891000249376|0402.21.20|7891000249383|false",
    "imageUrl": "/uploads/produtos/12343960 - MOLICOLepoDesnTotalCa24x280gPRAvestruzBR.png",
    "isNew": false
  },
  {
    "code": "12344609",
    "name": "MAGGI Caldo Galinha 15(10x57g) BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "150",
    "ean": "7891000250174|2104.10.11|7891000250044|false",
    "imageUrl": "/uploads/produtos/12344609 - MAGGI Caldo Galinha 15(10x57g) BR.png",
    "isNew": false
  },
  {
    "code": "12344650",
    "name": "MAGGI Caldo Carne Dspl 15(10x57g) BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "150",
    "ean": "7891000250150|2104.10.11|7891000250013|false",
    "imageUrl": "/uploads/produtos/12344650 - MAGGI Caldo Carne Dspl 15(10x57g) BR.png",
    "isNew": false
  },
  {
    "code": "12344651",
    "name": "MAGGI Caldo Bacon Display 15(10x57g) BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "150",
    "ean": "7891000249932|2104.10.11|7891000249956|false",
    "imageUrl": "/uploads/produtos/12344651 - MAGGI Caldo Bacon Display 15(10x57g) BR.png",
    "isNew": false
  },
  {
    "code": "12346031",
    "name": "MAGGI Caldo de Legumes Dspl 15(10x57g)BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "150",
    "ean": "7891000249963|2104.10.11|7891000249987|false",
    "imageUrl": "/uploads/produtos/12346031 - MAGGI Caldo de Legumes Dspl 15(10x57g)BR.png",
    "isNew": false
  },
  {
    "code": "12349928",
    "name": "MAGGI Caldo Bacon 100x114g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000251492|2104.10.11|7891000251508|false",
    "imageUrl": "/uploads/produtos/12349928 - MAGGI Caldo Bacon 100x114g BR.png",
    "isNew": false
  },
  {
    "code": "12350064",
    "name": "MAGGI Caldo Galinha 100x114g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000251539|2104.10.11|7891000251546|false",
    "imageUrl": "/uploads/produtos/12350064 - MAGGI Caldo Galinha 100x114g BR.png",
    "isNew": false
  },
  {
    "code": "12350073",
    "name": "MAGGI Caldo Carne 100x114g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000251515|2104.10.11|7891000251522|false",
    "imageUrl": "/uploads/produtos/12350073 - MAGGI Caldo Carne 100x114g BR.png",
    "isNew": false
  },
  {
    "code": "12350074",
    "name": "MAGGI Caldo Galinha 76x152g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "76",
    "ean": "7891000251430|2104.10.11|7891000251447|false",
    "imageUrl": "/uploads/produtos/12350074 - MAGGI Caldo Galinha 76x152g BR (1).png",
    "isNew": false
  },
  {
    "code": "12350100",
    "name": "MAGGI Caldo Carne 76x152g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "76",
    "ean": "7891000251454|2104.10.11|7891000251461|false",
    "imageUrl": "/uploads/produtos/12350100 - MAGGI Caldo Carne 76x152g BR.png",
    "isNew": false
  },
  {
    "code": "12351488",
    "name": "MOLICO Zero Lact CmptoLact Po 24x260g BR",
    "brand": "MOLICO",
    "category": "MOLICO ESPECIAIS",
    "packSize": "24",
    "ean": "7891000251638|1901.10.10|7891000251645|false",
    "imageUrl": "/uploads/produtos/12351488 - MOLICO Zero Lact CmptoLact Po 24x260g BR.png",
    "isNew": false
  },
  {
    "code": "12355348",
    "name": "NESTLE Crmlt Zero Lact Uht 27x200g BR",
    "brand": "LEITES CULINARIOS",
    "category": "CREME TP",
    "packSize": "27",
    "ean": "7891000253182|0401.50.21|7891000253199|false",
    "imageUrl": "/uploads/produtos/12355348 - NESTLE Crmlt Zero Lact Uht 27x200g BR.jpg",
    "isNew": false
  },
  {
    "code": "12355785",
    "name": "MAGGI Caldo Carne MenosSodio 100x114g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000253526|2104.10.11|7891000253533|false",
    "imageUrl": "/uploads/produtos/12355785 - MAGGI Caldo Carne MenosSodio 100x114g BR.png",
    "isNew": false
  },
  {
    "code": "12355788",
    "name": "MAGGI Caldo Galinha MenosSodio 180x57gBR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "180",
    "ean": "7891000253540|2104.10.11|7891000253557|false",
    "imageUrl": "/uploads/produtos/12355788 - MAGGI Caldo Galinha MenosSodio 180x57gBR.png",
    "isNew": false
  },
  {
    "code": "12355789",
    "name": "MAGGI Caldo Carne Menos Sodio 180x57g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "180",
    "ean": "7891000253564|2104.10.11|7891000253571|false",
    "imageUrl": "/uploads/produtos/12355789 - MAGGI Caldo Carne Menos Sodio 180x57g BR.png",
    "isNew": false
  },
  {
    "code": "12355810",
    "name": "MAGGI Caldo GalinhaMenosSodio 100x114gBR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000253588|2104.10.11|7891000253595|false",
    "imageUrl": "/uploads/produtos/12355810 - MAGGI Caldo GalinhaMenosSodio 100x114gBR.png",
    "isNew": false
  },
  {
    "code": "12365022",
    "name": "CRUNCH Cereal Matinal Sachet 20x120g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "20",
    "ean": "7891000255445|1904.10.00|7891000255452|false",
    "imageUrl": "/uploads/produtos/12365022 - CRUNCH Cereal Matinal Sachet 20x120g BR.png",
    "isNew": false
  },
  {
    "code": "12368428",
    "name": "PRESTIGIO ao Leite Flowpack 30x114g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000256152|1806.31.20|7891000256169|false",
    "imageUrl": "/uploads/produtos/12368428 - PRESTIGIO ao Leite Flowpack 30x114g BR.png",
    "isNew": false
  },
  {
    "code": "12368980",
    "name": "BATON Extra Milk 32(30x16g) XW",
    "brand": "GAROTO",
    "category": "BATON",
    "packSize": "30",
    "ean": "78939363|1806.31.10|17891008389804|false",
    "imageUrl": "/uploads/produtos/12368980 - BATON Extra Milk 32(30x16g) XW.png",
    "isNew": false
  },
  {
    "code": "12370783",
    "name": "NESCAU Cereal Matinal 24x210g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU ATE 300G",
    "packSize": "24",
    "ean": "7891000111161|1904.10.00|7891000257104|false",
    "imageUrl": "/uploads/produtos/12370783 - NESCAU Cereal Matinal 24x210g BR.png",
    "isNew": false
  },
  {
    "code": "12377050",
    "name": "NUTREN SENIOR semSabor6x740gPRGrts100gBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "6",
    "ean": "7891000258187|1901.90.90|7891000258194|false",
    "imageUrl": "/uploads/produtos/12377050 - NUTREN SENIOR semSabor6x740gPRGrts100gBR.png",
    "isNew": false
  },
  {
    "code": "12377691",
    "name": "CHARGE Flowpack 30x117g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000258477|1806.31.20|7891000258484|false",
    "imageUrl": "/uploads/produtos/12377691 - CHARGE Flowpack 30x117g BR.png",
    "isNew": false
  },
  {
    "code": "12378082",
    "name": "DOGUITOS Bifinho Carne 20x65g BR",
    "brand": "SNACKS",
    "category": "DOGUITOS SNACKS",
    "packSize": "20",
    "ean": "7891000623008|2309.10.00|7891000258552|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12378083",
    "name": "DOGUITOS Bifinho Frango 20x65g BR",
    "brand": "SNACKS",
    "category": "DOGUITOS SNACKS",
    "packSize": "20",
    "ean": "7891000623107|2309.10.00|7891000258569|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12378133",
    "name": "NESCAU DUO Cereal Matinal 24x210g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU ATE 300G",
    "packSize": "24",
    "ean": "7891000258613|1904.10.00|7891000258620|false",
    "imageUrl": "/uploads/produtos/12378133 - NESCAU DUO Cereal Matinal 24x210g BR.png",
    "isNew": false
  },
  {
    "code": "12379167",
    "name": "DOGUITOS Linguicinha 20x45g BR",
    "brand": "SNACKS",
    "category": "DOGUITOS SNACKS",
    "packSize": "20",
    "ean": "7891000005620|2309.10.00|7891000259078|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12379776",
    "name": "PASSATEMPO Bisc RechChocChoc 70x130g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "70",
    "ean": "7891000259405|1905.31.00|7891000259412|false",
    "imageUrl": "/uploads/produtos/12379776 - PASSATEMPO Bisc RechChocChoc 70x130g BR.png",
    "isNew": false
  },
  {
    "code": "12379785",
    "name": "PASSATEMPO Bisc Rech Choc Mrg 70x130g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "70",
    "ean": "7891000259351|1905.31.00|7891000259368|false",
    "imageUrl": "/uploads/produtos/12379785 - PASSATEMPO Bisc Rech Choc Mrg 70x130g BR.png",
    "isNew": false
  },
  {
    "code": "12380253",
    "name": "NESTLE Cob Choc Leite 20x500g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "COBERTURAS NESTLE",
    "packSize": "20",
    "ean": "7891000259818|1806.32.10|7891000259825|false",
    "imageUrl": "/uploads/produtos/12380253 - NESTLE Cob Choc Leite 20x500g BR.png",
    "isNew": false
  },
  {
    "code": "12384866",
    "name": "DOG CHOW Oral Med Gde 20x80g BR",
    "brand": "ORAL CARE",
    "category": "DOG CHOW ORAL SNACKS",
    "packSize": "20",
    "ean": "7891000261989|2309.10.00|7891000261996|false",
    "imageUrl": "/uploads/produtos/12384866.png",
    "isNew": false
  },
  {
    "code": "12384867",
    "name": "DOG CHOW Oral Pequeno 20x105g BR",
    "brand": "ORAL CARE",
    "category": "DOG CHOW ORAL SNACKS",
    "packSize": "20",
    "ean": "7891000262023|2309.10.00|7891000262030|false",
    "imageUrl": "/uploads/produtos/12384867.png",
    "isNew": false
  },
  {
    "code": "12384868",
    "name": "DOG CHOW Oral Pequeno 20x45g BR",
    "brand": "ORAL CARE",
    "category": "DOG CHOW ORAL SNACKS",
    "packSize": "20",
    "ean": "7891000262009|2309.10.00|7891000262016|false",
    "imageUrl": "/uploads/produtos/12384868.png",
    "isNew": false
  },
  {
    "code": "12386036",
    "name": "NDG Minime Antr1 127V BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "MAQUINAS E ACESSORIOS G1",
    "packSize": "2",
    "ean": "3016661142536|8516.71.00|13016661142533|false",
    "imageUrl": "/uploads/produtos/12386036.png",
    "isNew": false
  },
  {
    "code": "12386037",
    "name": "NDG Minime Antr1 220V BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "MAQUINAS E ACESSORIOS G1",
    "packSize": "2",
    "ean": "3016661142543|8516.71.00|13016661142540|false",
    "imageUrl": "/uploads/produtos/12386037.png",
    "isNew": false
  },
  {
    "code": "12392354",
    "name": "MAGGI Sopao Gl Menos Sodio 24x150g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000275122|2104.10.11|7891000275139|false",
    "imageUrl": "/uploads/produtos/12392354 - MAGGI Sopao Gl Menos Sodio 24x150g BR.png",
    "isNew": false
  },
  {
    "code": "12392355",
    "name": "MAGGI Sopao Car Menos Sodio 24x150g BR",
    "brand": "MAGGI",
    "category": "SOPAO",
    "packSize": "24",
    "ean": "7891000275108|2104.10.11|7891000275115|false",
    "imageUrl": "/uploads/produtos/12392355 - MAGGI Sopao Car Menos Sodio 24x150g BR.png",
    "isNew": false
  },
  {
    "code": "12394435",
    "name": "MUCILON BL 5 Cereais Zero 12x180g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON ZERO",
    "packSize": "12",
    "ean": "7891000275740|1901.10.30|7891000275757|false",
    "imageUrl": "/uploads/produtos/12394435 - MUCILON BL 5 Cereais Zero 12x180g BR.png",
    "isNew": false
  },
  {
    "code": "12400662",
    "name": "MAGGI Crm Ceb Menos Sodio 12(12x61g) BR",
    "brand": "MAGGI",
    "category": "DEMAIS SOPAS",
    "packSize": "12",
    "ean": "7891000279380|2104.10.11|7891000283042|false",
    "imageUrl": "/uploads/produtos/12400662 - MAGGI Crm Ceb Menos Sodio 12(12x61g) BR.png",
    "isNew": false
  },
  {
    "code": "12405428",
    "name": "DOG CHOW Adlt Mini Peq Carne 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000244135|2309.10.00|7891000244142|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12405429",
    "name": "DOGCHOW Adlt Mini Peq Salmao 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000244722|2309.10.00|7891000244739|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12405432",
    "name": "DOG CHOW Adlt TdTm Frango 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000115657|2309.10.00|7891000115664|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12405471",
    "name": "DOG CHOW Adlt Mini Peq Frango 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000244111|2309.10.00|7891000244128|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12405472",
    "name": "DOG CHOW Filh TdTm Carne 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000244746|2309.10.00|7891000244753|false",
    "imageUrl": "/uploads/produtos/12655182 - DCHOW XLfeLactFilhMdGdCarFrgArz7x2,5kgBR.png",
    "isNew": false
  },
  {
    "code": "12405475",
    "name": "DOG CHOW Adlt TdTm Carne 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000115633|2309.10.00|7891000115640|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12405477",
    "name": "DOG CHOW Adlt TdTm Cordeiro 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000115671|2309.10.00|7891000115688|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12405478",
    "name": "DOG CHOW Filh TdTm Frango 15x100g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000115695|2309.10.00|7891000115701|false",
    "imageUrl": "/uploads/produtos/12655182 - DCHOW XLfeLactFilhMdGdCarFrgArz7x2,5kgBR.png",
    "isNew": false
  },
  {
    "code": "12406317",
    "name": "NINHO 3+ PBIO3 Fases Lepo 6x800g BR",
    "brand": "NINHO FASES",
    "category": "NINHO FASES OUTROS",
    "packSize": "6",
    "ean": "7891000282809|1901.90.90|7891000282816|false",
    "imageUrl": "/uploads/produtos/12406317 - NINHO 3+ PBIO3 Fases Lepo 6x800g BR.png",
    "isNew": false
  },
  {
    "code": "12406967",
    "name": "NESCAFE GOLD TorrMoidoSuaveSac 12x250gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "TORRADO E MOIDO PREMIUM",
    "packSize": "12",
    "ean": "7891000283707|0901.21.00|7891000283714|false",
    "imageUrl": "/uploads/produtos/12406967 - NESCAFE GOLD TorrMoidoSuaveSac 12x250gBR (1).png",
    "isNew": false
  },
  {
    "code": "12406968",
    "name": "NESCAFE GOLDTorrMoidoIntensoSac12x250gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "TORRADO E MOIDO PREMIUM",
    "packSize": "12",
    "ean": "7891000283745|0901.21.00|7891000283752|false",
    "imageUrl": "/uploads/produtos/12406968 - NESCAFE GOLDTorrMoidoIntensoSac12x250gBR (1).png",
    "isNew": false
  },
  {
    "code": "12406969",
    "name": "NESC GOLD TorrMdoEquilibradoSac12x250gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "TORRADO E MOIDO PREMIUM",
    "packSize": "12",
    "ean": "7891000283783|0901.21.00|7891000283790|false",
    "imageUrl": "/uploads/produtos/12406969 - NESC GOLD TorrMdoEquilibradoSac12x250gBR (1).png",
    "isNew": false
  },
  {
    "code": "12408826",
    "name": "MOLICO LepoParcialDesn+Fibras24x260gBR",
    "brand": "MOLICO",
    "category": "MOLICO ESPECIAIS",
    "packSize": "24",
    "ean": "7891000285015|1901.90.90|7891000285022|false",
    "imageUrl": "/uploads/produtos/12408826 - MOLICO LepoParcialDesn+Fibras24x260gBR.png",
    "isNew": false
  },
  {
    "code": "12410107",
    "name": "MAGGI Caldo Po Carne 96x35g BR",
    "brand": "MAGGI",
    "category": "CALDOS PO",
    "packSize": "96",
    "ean": "7891000285800|2104.10.11|7891000285817|false",
    "imageUrl": "/uploads/produtos/12410107 - MAGGI Caldo Po Carne 96x35g BR.png",
    "isNew": false
  },
  {
    "code": "12410129",
    "name": "MAGGI Caldo Po Galinha 96x35g BR",
    "brand": "MAGGI",
    "category": "CALDOS PO",
    "packSize": "96",
    "ean": "7891000285848|2104.10.11|7891000285855|false",
    "imageUrl": "/uploads/produtos/12410129 - MAGGI Caldo Po Galinha 96x35g BR.png",
    "isNew": false
  },
  {
    "code": "12412175",
    "name": "NDG Minime ArctGryBlk2 127V BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "MAQUINAS E ACESSORIOS G1",
    "packSize": "2",
    "ean": "7891000406625|8516.71.00|17891000406622|false",
    "imageUrl": "/uploads/produtos/12412175.png",
    "isNew": false
  },
  {
    "code": "12412520",
    "name": "NDG Minime ArctGryBlk2 220V BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "MAQUINAS E ACESSORIOS G1",
    "packSize": "1",
    "ean": "7891000406632|8516.71.00|17891000406639|false",
    "imageUrl": "/uploads/produtos/12412520.png",
    "isNew": false
  },
  {
    "code": "12413903",
    "name": "NESTLE Creme deLeiteUht 10%Gdr 27x200gBR",
    "brand": "LEITES CULINARIOS",
    "category": "CREME TP",
    "packSize": "27",
    "ean": "7891000327371|0401.50.21|7891000327388|false",
    "imageUrl": "/uploads/produtos/12413903 - NESTLE Creme deLeiteUht 10%Gdr 27x200gBR.png",
    "isNew": false
  },
  {
    "code": "12414266",
    "name": "BONZO Adultos Carne e Cereais 10,1kg BR",
    "brand": "MAINSTREAM",
    "category": "BONZO LARGE BAGS",
    "packSize": "1",
    "ean": "7891000287293|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12416237",
    "name": "SERENATA DE AMOR Wafer Cstn 10x825g XW",
    "brand": "GAROTO",
    "category": "BOMBONS GAROTO",
    "packSize": "10",
    "ean": "7891008114126|1905.32.00|17891008114130|false",
    "imageUrl": "/uploads/produtos/12416237 - SERENATA DE AMOR Wafer Cstn 10x825g XW.png",
    "isNew": false
  },
  {
    "code": "12416339",
    "name": "NUTREN SENIOR Po Baunilha 6x740g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "6",
    "ean": "7891000287736|1901.90.90|7891000287743|false",
    "imageUrl": "/uploads/produtos/12416339 - NUTREN SENIOR Po Baunilha 6x740g BR.png",
    "isNew": false
  },
  {
    "code": "12416364",
    "name": "NUTREN SENIOR Po Cafe c/ Leite 6x740g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "6",
    "ean": "7891000287699|1901.90.90|7891000287705|false",
    "imageUrl": "/uploads/produtos/12416364 - NUTREN SENIOR Po Cafe c Leite 6x740g BR (1).png",
    "isNew": false
  },
  {
    "code": "12418204",
    "name": "NESTON 3 Cereais Sachet 9x600g N2 BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTON SACHET",
    "packSize": "9",
    "ean": "7891000288474|1104.29.00|7891000288481|false",
    "imageUrl": "/uploads/produtos/12418204 - NESTON 3 Cereais Sachet 9x600g N2 BR.png",
    "isNew": false
  },
  {
    "code": "12418415",
    "name": "NESFIT CerMat 0%Adicao Acucar 24x220g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "24",
    "ean": "7891000288801|1904.10.00|7891000288818|false",
    "imageUrl": "/uploads/produtos/12418415 - NESFIT CerMat 0%Adicao Acucar 24x220g BR.png",
    "isNew": false
  },
  {
    "code": "12420220",
    "name": "NESFIT Delice Bisc CacaueAvela 45x140gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "45",
    "ean": "7891000289709|1905.31.00|7891000289716|false",
    "imageUrl": "/uploads/produtos/12420220 - NESFIT Delice Bisc CacaueAvela 45x140gBR (2).png",
    "isNew": false
  },
  {
    "code": "12420221",
    "name": "NESFIT DeliceBiscMacaeCanela 45x140g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "45",
    "ean": "7891000289747|1905.31.00|7891000289754|false",
    "imageUrl": "/uploads/produtos/12420221 - NESFIT DeliceBiscMacaeCanela 45x140g BR (1).png",
    "isNew": false
  },
  {
    "code": "12420288",
    "name": "NEGRESCO Bisc Rech Coberto 36x120g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COBERTOS",
    "packSize": "36",
    "ean": "7891000290026|1905.31.00|7891000290033|false",
    "imageUrl": "/uploads/produtos/12420288 - NEGRESCO Bisc Rech Coberto 36x120g BR.png",
    "isNew": false
  },
  {
    "code": "12429007",
    "name": "NUTREN Protein Chocolate Po 12x400g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN LATA",
    "packSize": "12",
    "ean": "7891000295458|2106.90.30|7891000295465|false",
    "imageUrl": "/uploads/produtos/12429007.jpg",
    "isNew": false
  },
  {
    "code": "12432473",
    "name": "NUTRENSENIOR PoZeroLact s/Sabor 6x740gBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "6",
    "ean": "7891000320457|1901.90.90|7891000320464|false",
    "imageUrl": "/uploads/produtos/12432473 - NUTRENSENIOR PoZeroLact sSabor 6x740gBR.png",
    "isNew": false
  },
  {
    "code": "12439442",
    "name": "NESFIT Biscoito Cacau e Cereais48x160gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "48",
    "ean": "7891000304556|1905.31.00|7891000304563|false",
    "imageUrl": "/uploads/produtos/12439442 - NESFIT Biscoito Cacau e Cereais48x160gBR.png",
    "isNew": false
  },
  {
    "code": "12439444",
    "name": "NESFIT Bisc Laranja e Cenoura 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "48",
    "ean": "7891000304754|1905.31.00|7891000304761|false",
    "imageUrl": "/uploads/produtos/12439444 - NESFIT Bisc Laranja e Cenoura 48x160g BR.png",
    "isNew": false
  },
  {
    "code": "12439451",
    "name": "NESFIT Biscoito Mrg e Cereais 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "48",
    "ean": "7891000304594|1905.31.00|7891000304600|false",
    "imageUrl": "/uploads/produtos/12439451 - NESFIT Biscoito Mrg e Cereais 48x160g BR.png",
    "isNew": false
  },
  {
    "code": "12439453",
    "name": "NESFIT Biscoito LimaoeCereais 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "48",
    "ean": "7891000304716|1905.31.00|7891000304723|false",
    "imageUrl": "/uploads/produtos/12439453 - NESFIT Biscoito LimaoeCereais 48x160g BR.jpg",
    "isNew": false
  },
  {
    "code": "12439496",
    "name": "NESFIT Biscoito Coco 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "48",
    "ean": "7891000304792|1905.31.00|7891000304990|false",
    "imageUrl": "/uploads/produtos/12439496 - NESFIT Biscoito Coco 48x160g BR.png",
    "isNew": false
  },
  {
    "code": "12439508",
    "name": "NESFIT Bisc Banana Ava e Canl 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES NESFIT",
    "packSize": "48",
    "ean": "7891000304839|1905.31.00|7891000304846|false",
    "imageUrl": "/uploads/produtos/12439508 - NESFIT Bisc Banana Ava e Canl 48x160g BR.png",
    "isNew": false
  },
  {
    "code": "12439521",
    "name": "BONO Bisc Rech Fininho Choc 44x57g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "44",
    "ean": "7891000304877|1905.31.00|7891000304891|false",
    "imageUrl": "/uploads/produtos/12439521 - BONO Bisc Rech Fininho Choc 44x57g BR (1).png",
    "isNew": false
  },
  {
    "code": "12439770",
    "name": "MOCA LeiCond Light Desn Cxnha 27x410g BR",
    "brand": "LEITES CULINARIOS",
    "category": "MOCA ESPECIAIS",
    "packSize": "27",
    "ean": "7891000107041|0402.99.00|7891000306376|false",
    "imageUrl": "/uploads/produtos/12439770 - MOCA LeiCond Light Desn Cxnha 27x410g BR.png",
    "isNew": false
  },
  {
    "code": "12440848",
    "name": "MOCA Lei CondSemiDesn Caixinha 27x340gBR",
    "brand": "LEITES CULINARIOS",
    "category": "MOCA CAIXINHA",
    "packSize": "27",
    "ean": "7891000305553|0402.99.00|7891000305560|false",
    "imageUrl": "/uploads/produtos/12440848 - MOCA Lei CondSemiDesn Caixinha 27x340gBR.png",
    "isNew": false
  },
  {
    "code": "12442206",
    "name": "NESCAFE TRADICAO Forte Sachet 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000307083|2101.11.10|7891000307090|false",
    "imageUrl": "/uploads/produtos/12442206 - NESCAFE TRADICAO Forte Sachet 24x40g BR.jpg",
    "isNew": false
  },
  {
    "code": "12442213",
    "name": "NESCAFEORGNL ExtraForte Sachet 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000307120|2101.11.10|7891000307137|false",
    "imageUrl": "/uploads/produtos/12442213 - NESCAFEORGNL ExtraForte Sachet 24x40g BR.jpg",
    "isNew": false
  },
  {
    "code": "12442256",
    "name": "NESCAFE MATINAL Suave Sachet 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000307045|2101.11.10|7891000307052|false",
    "imageUrl": "/uploads/produtos/12442256 - NESCAFE MATINAL Suave Sachet 24x40g BR.jpg",
    "isNew": false
  },
  {
    "code": "12445411",
    "name": "MAGGI Caldo Po Legumes 96x35g BR",
    "brand": "MAGGI",
    "category": "CALDOS PO",
    "packSize": "96",
    "ean": "7891000310199|2104.10.11|7891000310205|false",
    "imageUrl": "/uploads/produtos/12445411 - MAGGI Caldo Po Legumes 96x35g BR.png",
    "isNew": false
  },
  {
    "code": "12446238",
    "name": "NUTREN SENIOR Po Sem Sabor 3(2x740g) BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "3",
    "ean": "7891000311172|1901.90.90|7891000311189|false",
    "imageUrl": "/uploads/produtos/12446238 - NUTREN SENIOR Po Sem Sabor 3(2x740g) BR.png",
    "isNew": false
  },
  {
    "code": "12447487",
    "name": "SBUX Medium Pike Place RST R&G 12x250gUY",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "STARBUCKS T&M",
    "packSize": "12",
    "ean": "762111364388|0901.21.00|40762111364393|false",
    "imageUrl": "/uploads/produtos/12447487 - SBUX Medium Pike Place RST R&G 12x250gUY.png",
    "isNew": false
  },
  {
    "code": "12447585",
    "name": "SBUX Medium Colombia R&G 12X250g UY",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "STARBUCKS T&M",
    "packSize": "12",
    "ean": "762111364357|0901.21.00|40762111364355|false",
    "imageUrl": "/uploads/produtos/12447585 - SBUX Medium Colombia R&G 12X250g UY.png",
    "isNew": false
  },
  {
    "code": "12449862",
    "name": "NESCIntensidadeMaxima Fco 12x160gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM DEMAIS",
    "packSize": "12",
    "ean": "7891000718025|2101.11.10|7891000426517|false",
    "imageUrl": "/uploads/produtos/12449862 - NESCIntensidadeMaxima Fco 12x160gBR.jpg",
    "isNew": false
  },
  {
    "code": "12451066",
    "name": "MOCALeiCondParcDesnZrLactCxnha27x395gBR",
    "brand": "LEITES CULINARIOS",
    "category": "MOCA ZERO LACTOSE",
    "packSize": "27",
    "ean": "7891000317396|0402.99.00|7891000317402|false",
    "imageUrl": "/uploads/produtos/12451066 - MOCALeiCondParcDesnZrLactCxnha27x395gBR.png",
    "isNew": false
  },
  {
    "code": "12453854",
    "name": "MUCILON Multicereais Sachet 12x180g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000319505|1901.10.30|7891000319512|false",
    "imageUrl": "/uploads/produtos/12453854 - MUCILON Multicereais Sachet 12x180g BR.png",
    "isNew": false
  },
  {
    "code": "12453855",
    "name": "MUCILON Milho Sachet 12x180g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000319581|1901.10.30|7891000319598|false",
    "imageUrl": "/uploads/produtos/12453855 - MUCILON Milho Sachet 12x180g BR.png",
    "isNew": false
  },
  {
    "code": "12453868",
    "name": "MUCILON Arroz Aveia Sachet 12x180g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000319543|1901.10.30|7891000319550|false",
    "imageUrl": "/uploads/produtos/12453868 - MUCILON Arroz Aveia Sachet 12x180g BR.png",
    "isNew": false
  },
  {
    "code": "12454108",
    "name": "ONEAdltMiniPeqc/Frg&CarneDeVdd 11x700gBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY DOG SMALL BAGS",
    "packSize": "11",
    "ean": "7891000319826|2309.10.00|7891000319833|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12454109",
    "name": "ONE AdltMiniPeqc/Frgo&CarneDeVdd6x2kgBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY DOG SMALL BAGS",
    "packSize": "6",
    "ean": "7891000319901|2309.10.00|7891000319918|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12454127",
    "name": "ONEFilhTdTm c/Frango&CarneDeVdd11x700gBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY DOG SMALL BAGS",
    "packSize": "11",
    "ean": "7891000319864|2309.10.00|7891000319871|false",
    "imageUrl": "/uploads/produtos/12454127.jpg",
    "isNew": false
  },
  {
    "code": "12454208",
    "name": "ONEFilhTdTm c/Frango&CarneDeVdd6x2kgBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY DOG SMALL BAGS",
    "packSize": "6",
    "ean": "7891000319956|2309.10.00|7891000319963|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12454355",
    "name": "MUCILON Snack Tradicional 15x35g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "15",
    "ean": "7891000320242|1905.90.20|7891000320259|false",
    "imageUrl": "/uploads/produtos/12454355 - MUCILON Snack Tradicional 15x35g BR.png",
    "isNew": false
  },
  {
    "code": "12454380",
    "name": "MUCILON Snack Tomate 15x35g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "15",
    "ean": "7891000320280|1905.90.20|7891000320297|false",
    "imageUrl": "/uploads/produtos/12454380 - MUCILON Snack Tomate 15x35g BR.png",
    "isNew": false
  },
  {
    "code": "12454492",
    "name": "ONEAdltMedGde c/Frango&CarneDeVdd6x2kgBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY DOG SMALL BAGS",
    "packSize": "6",
    "ean": "7891000320426|2309.10.00|7891000320433|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12454676",
    "name": "ONEGatoFilhc/Frango&CarneDeVdd6x2kgBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY CAT SMALL BAGS",
    "packSize": "6",
    "ean": "7891000320518|2309.10.00|7891000320525|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12454893",
    "name": "BONO Bisc Rech Choc Coberto 36x109g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COBERTOS",
    "packSize": "36",
    "ean": "7891000321164|1905.31.00|7891000321171|false",
    "imageUrl": "/uploads/produtos/12454893 - BONO Bisc Rech Choc Coberto 36x109g BR.png",
    "isNew": false
  },
  {
    "code": "12455021",
    "name": "ONEGatEsterilizadosFrg&SlmDeVdd20x500gBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY CAT SMALL BAGS",
    "packSize": "20",
    "ean": "7891000321805|2309.10.00|7891000321812|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12455098",
    "name": "ONECatFilh c/Frango&CarneDeVdd20x500gBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY CAT SMALL BAGS",
    "packSize": "20",
    "ean": "7891000321881|2309.10.00|7891000321898|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12455107",
    "name": "ONECatAdultos c/Frg&CarneDeVdd20x500gBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY CAT SMALL BAGS",
    "packSize": "20",
    "ean": "7891000321966|2309.10.00|7891000321973|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12455123",
    "name": "ONECatEsterilizadosFrg&SlmDeVdd6x2kgBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY CAT SMALL BAGS",
    "packSize": "6",
    "ean": "7891000322000|2309.10.00|7891000322017|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12455124",
    "name": "ONECatAdulto c/Frango&CarneDeVdd6x2kgBR",
    "brand": "SUPER PREMIUM DRY",
    "category": "ONE DRY CAT SMALL BAGS",
    "packSize": "6",
    "ean": "7891000322123|2309.10.00|7891000322130|false",
    "imageUrl": "/uploads/produtos/12455124.jpg",
    "isNew": false
  },
  {
    "code": "12458810",
    "name": "NESTLE ESPECIALIDADES Bombons 30x251g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CAIXAS NESTLE",
    "packSize": "30",
    "ean": "7891000325131|1806.90.00|7891000325148|false",
    "imageUrl": "/uploads/produtos/12458810 - NESTLE ESPECIALIDADES Bombons 30x251g BR.png",
    "isNew": false
  },
  {
    "code": "12463773",
    "name": "BONO Wafer Limao 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000329207|1905.32.00|7891000329214|false",
    "imageUrl": "/uploads/produtos/12463773 - BONO Wafer Limao 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12463859",
    "name": "TOSTINES Maca&Canela 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES TOSTINES",
    "packSize": "48",
    "ean": "7891000329450|1905.31.00|7891000329467|false",
    "imageUrl": "/uploads/produtos/12463859 - TOSTINES Maca&Canela 48x160g BR.png",
    "isNew": false
  },
  {
    "code": "12463873",
    "name": "TOSTINES Coco 48x160g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES TOSTINES",
    "packSize": "48",
    "ean": "7891000329498|1905.31.00|7891000329504|false",
    "imageUrl": "/uploads/produtos/12463873 - TOSTINES Coco 48x160g BR.png",
    "isNew": false
  },
  {
    "code": "12464177",
    "name": "SUFLAIR Chocolate Duo 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000329665|1806.32.10|7891000329689|false",
    "imageUrl": "/uploads/produtos/12464177.jpg",
    "isNew": false
  },
  {
    "code": "12464249",
    "name": "SUFLAIR Chocolate ao Leite 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000329856|1806.32.10|7891000329870|false",
    "imageUrl": "/uploads/produtos/12464249.jpg",
    "isNew": false
  },
  {
    "code": "12468787",
    "name": "ONE Caes Superfoods Adlt e Filh 15x85gXI",
    "brand": "WET",
    "category": "ONE DOG WET POUCH",
    "packSize": "15",
    "ean": "7891000332108|2309.10.00|7891000333051|false",
    "imageUrl": "/uploads/produtos/12468787.jpg",
    "isNew": false
  },
  {
    "code": "12468794",
    "name": "ONE Caes MultiProteinaAdlteFilh 15x85gXI",
    "brand": "WET",
    "category": "ONE DOG WET POUCH",
    "packSize": "15",
    "ean": "7891000332344|2309.10.00|7891000332931|false",
    "imageUrl": "/uploads/produtos/12468794.jpg",
    "isNew": false
  },
  {
    "code": "12468803",
    "name": "ONEGatosSuperfoodsAdlteCastrado15x85gXI",
    "brand": "WET",
    "category": "ONE CAT WET POUCH",
    "packSize": "15",
    "ean": "7891000332382|2309.10.00|7891000333099|false",
    "imageUrl": "/uploads/produtos/12468803.jpg",
    "isNew": false
  },
  {
    "code": "12468816",
    "name": "ONEGatSuperNutrientesAdlteCastr15x85gXI",
    "brand": "WET",
    "category": "ONE CAT WET POUCH",
    "packSize": "15",
    "ean": "7891000332429|2309.10.00|7891000332894|false",
    "imageUrl": "/uploads/produtos/12468816.jpg",
    "isNew": false
  },
  {
    "code": "12468817",
    "name": "ONE GatosMultiProteina AdlteFilh15x85gXI",
    "brand": "WET",
    "category": "ONE CAT WET POUCH",
    "packSize": "15",
    "ean": "7891000332467|2309.10.00|7891000332979|false",
    "imageUrl": "/uploads/produtos/12468817.jpg",
    "isNew": false
  },
  {
    "code": "12468818",
    "name": "ONECaesSuperNutrientesAdlteFilh15x85gXI",
    "brand": "WET",
    "category": "ONE DOG WET POUCH",
    "packSize": "15",
    "ean": "7891000332306|2309.10.00|7891000333013|false",
    "imageUrl": "/uploads/produtos/12468818.jpg",
    "isNew": false
  },
  {
    "code": "12469063",
    "name": "NESFITCerMatCacau0%AdicaoAcu24x220gBR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "24",
    "ean": "7891000333600|1904.10.00|7891000333617|false",
    "imageUrl": "/uploads/produtos/12469063 - NESFITCerMatCacau0%AdicaoAcu24x220gBR.png",
    "isNew": false
  },
  {
    "code": "12470571",
    "name": "NUTREN SENIOR Po Baunilha 3(2x740g) BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "3",
    "ean": "7891000334492|1901.90.90|7891000334508|false",
    "imageUrl": "/uploads/produtos/12470571 - NUTREN SENIOR Po Baunilha 3(2x740g) BR.png",
    "isNew": false
  },
  {
    "code": "12475946",
    "name": "NUTREN SENIOR Po Baunilha 24x370g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "24",
    "ean": "7891000241547|1901.90.90|7891000589335|false",
    "imageUrl": "/uploads/produtos/12475946 - NUTREN SENIOR Po Baunilha 24x370g BR.png",
    "isNew": false
  },
  {
    "code": "12475952",
    "name": "NUTREN SENIOR Po 24x370g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "24",
    "ean": "7891000096482|1901.90.90|7891000215784|false",
    "imageUrl": "/uploads/produtos/12475952 - NUTREN SENIOR Po 24x370g BR.png",
    "isNew": false
  },
  {
    "code": "12476875",
    "name": "NUTREN SENIOR Po Chocolate 24x370g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "24",
    "ean": "7891000243015|1901.90.90|7891000337615|false",
    "imageUrl": "/uploads/produtos/12476875 - NUTREN SENIOR Po Chocolate 24x370g BR.png",
    "isNew": false
  },
  {
    "code": "12477866",
    "name": "NESCAU ACTGO Achoc Po Sachet 12x550g BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU SACHET ATE 600G",
    "packSize": "12",
    "ean": "7891000338087|1806.90.00EX01|17891000338091|false",
    "imageUrl": "/uploads/produtos/12477866 - NESCAU ACTGO Achoc Po Sachet 12x550g BR.png",
    "isNew": false
  },
  {
    "code": "12477871",
    "name": "NESCAU ACTGO Achoc Po Sachet 12x730g BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU SACHET 730G",
    "packSize": "12",
    "ean": "7891000338162|1806.90.00EX01|17891000338176|false",
    "imageUrl": "/uploads/produtos/12477871 - NESCAU ACTGO Achoc Po Sachet 12x730g BR.png",
    "isNew": false
  },
  {
    "code": "12478287",
    "name": "NESCAU BALL Chocolate 4(12x75g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CONFEITOS NESTLE",
    "packSize": "48",
    "ean": "7891000338285|1806.90.00|17891000338312|false",
    "imageUrl": "/uploads/produtos/12478287 - NESCAU BALL Chocolate 4(12x75g) BR.png",
    "isNew": false
  },
  {
    "code": "12479709",
    "name": "PRESTIGIO CookieChoc GotasChoc 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000339237|1905.31.00|17891000339241|false",
    "imageUrl": "/uploads/produtos/12479709 - PRESTIGIO CookieChoc GotasChoc 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12479850",
    "name": "NESCAU Cookie Choc Gotas Duo 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000339558|1905.31.00|17891000339562|false",
    "imageUrl": "/uploads/produtos/12479850 - NESCAU Cookie Choc Gotas Duo 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12479852",
    "name": "NESTLECLASSICCookieBaunGotasChoc52x60gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000339596|1905.31.00|17891000339609|false",
    "imageUrl": "/uploads/produtos/12479852 - NESTLECLASSICCookieBaunGotasChoc52x60gBR.png",
    "isNew": false
  },
  {
    "code": "12480738",
    "name": "MAGGI MEU SEGREDO AlhoCebola 42(7x7g)BR",
    "brand": "MAGGI",
    "category": "TEMPEROS CARTONADO",
    "packSize": "42",
    "ean": "7891000339954|2103.90.21|17891000339968|false",
    "imageUrl": "/uploads/produtos/12480738 - MAGGI MEU SEGREDO AlhoCebola 42(7x7g)BR.png",
    "isNew": false
  },
  {
    "code": "12480745",
    "name": "MAGGI MEU SEGREDO CheiroVerde 42(7x7g)BR",
    "brand": "MAGGI",
    "category": "TEMPEROS CARTONADO",
    "packSize": "42",
    "ean": "7891000339916|2103.90.21|17891000339920|false",
    "imageUrl": "/uploads/produtos/12480745 - MAGGI MEU SEGREDO CheiroVerde 42(7x7g)BR.jpg",
    "isNew": false
  },
  {
    "code": "12480752",
    "name": "MAGGI MEU SEGREDO Tomate 42(7x7g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS CARTONADO",
    "packSize": "42",
    "ean": "7891000340073|2103.90.21|17891000340087|false",
    "imageUrl": "/uploads/produtos/12480752 - MAGGI MEU SEGREDO Tomate 42(7x7g) BR.png",
    "isNew": false
  },
  {
    "code": "12489996",
    "name": "ALPO Filhotes CarFrgCerVeg Lei 10x1kg BR",
    "brand": "MAINSTREAM",
    "category": "ALPO SMALL BAGS",
    "packSize": "10",
    "ean": "7891000347263|2309.10.00|7891000001462|false",
    "imageUrl": "/uploads/produtos/12489996.jpg",
    "isNew": false
  },
  {
    "code": "12492194",
    "name": "ALPO Adulto Car Frg Cer Veg 18kg BR",
    "brand": "MAINSTREAM",
    "category": "ALPO LARGE BAGS",
    "packSize": "1",
    "ean": "7891000050781|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12492195",
    "name": "ALPO Adulto Car Frg Cer Veg 10,1kg BR",
    "brand": "MAINSTREAM",
    "category": "ALPO LARGE BAGS",
    "packSize": "1",
    "ean": "7891000240380|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12492196",
    "name": "ALPO Adulto Car Frg Cer Veg 10x1kg BR",
    "brand": "MAINSTREAM",
    "category": "ALPO SMALL BAGS",
    "packSize": "10",
    "ean": "7891000050804|2309.10.00|7891000113967|false",
    "imageUrl": "/uploads/produtos/12492196.jpg",
    "isNew": false
  },
  {
    "code": "12492197",
    "name": "TALENTO ChocBrancoDocedeLeite8(12x85g)BR",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121629|1704.90.10|17891008121640|false",
    "imageUrl": "/uploads/produtos/12492197 - TALENTO ChocBrancoDocedeLeite8(12x85g)BR.png",
    "isNew": false
  },
  {
    "code": "12492199",
    "name": "TALENTO Tab Choc Branco Cer 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121674|1704.90.10|17891008121695|false",
    "imageUrl": "/uploads/produtos/12492199 - TALENTO Tab Choc Branco Cer 8(12x85g) XW.png",
    "isNew": false
  },
  {
    "code": "12492201",
    "name": "ALPO Filhotes CarFrgCerVegLei 10,1kg BR",
    "brand": "MAINSTREAM",
    "category": "ALPO LARGE BAGS",
    "packSize": "1",
    "ean": "7891000240496|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12492201.jpg",
    "isNew": false
  },
  {
    "code": "12492202",
    "name": "TALENTO Tablete Meio Amargo 8(12x85g) BR",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121575|1806.32.10|17891008121596|false",
    "imageUrl": "/uploads/produtos/12492202 - TALENTO Tablete Meio Amargo 8(12x85g) BR.png",
    "isNew": false
  },
  {
    "code": "12492203",
    "name": "TALENTO Tab Leite Cstn Para 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121773|1806.32.10|17891008121794|false",
    "imageUrl": "/uploads/produtos/12492203 - TALENTO Tab Leite Cstn Para 8(12x85g) XW.png",
    "isNew": false
  },
  {
    "code": "12492209",
    "name": "TALENTO Tab Choc Amendoa Pas 8(12x85g)XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121827|1806.32.10|17891008121848|false",
    "imageUrl": "/uploads/produtos/12492209 - TALENTO Tab Choc Amendoa Pas 8(12x85g)XW.png",
    "isNew": false
  },
  {
    "code": "12492210",
    "name": "TALENTO Tab Leite Avelas 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121728|1806.32.10|17891008121749|false",
    "imageUrl": "/uploads/produtos/12492210 - TALENTO Tab Leite Avelas 8(12x85g) XW.png",
    "isNew": false
  },
  {
    "code": "12492216",
    "name": "TALENTO Tab Rech Morango 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121872|1806.31.10|17891008121893|false",
    "imageUrl": "/uploads/produtos/12492216 - TALENTO Tab Rech Morango 8(12x85g) XW.png",
    "isNew": false
  },
  {
    "code": "12494821",
    "name": "NESLAC SUPREME CmptoLact 6x800g N1 BR",
    "brand": "LEITES DE CRESCIMENTO",
    "category": "NESLAC SUPREME",
    "packSize": "6",
    "ean": "7891000119976|1901.10.10|7891000119983|false",
    "imageUrl": "/uploads/produtos/12494821.png",
    "isNew": false
  },
  {
    "code": "12495822",
    "name": "ALPINO Cookie Gotas Choc 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000350119|1905.31.00|17891000350123|false",
    "imageUrl": "/uploads/produtos/12495822 - ALPINO Cookie Gotas Choc 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12495833",
    "name": "GALAK CookieGotasChocBranco 52x60gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000350072|1905.31.00|17891000350086|false",
    "imageUrl": "/uploads/produtos/12495833 - GALAK CookieGotasChocBranco 52x60gBR.png",
    "isNew": false
  },
  {
    "code": "12501474",
    "name": "DOGCHOWXLfeAdltMedioGdeCarFrgArz5x3kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "5",
    "ean": "7891000116722|2309.10.00|7891000116739|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12501505",
    "name": "DOGCHOWXLfeAdltMnPeqCarFrgArz5x3kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "5",
    "ean": "7891000116579|2309.10.00|7891000116586|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12506651",
    "name": "KANINA Carne e Cereais 15kg N4 BR",
    "brand": "MAINSTREAM",
    "category": "KANINA LARGE BAGS",
    "packSize": "1",
    "ean": "7896015603236|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12506651.jpg",
    "isNew": false
  },
  {
    "code": "12510020",
    "name": "CRUNCH Cereal Matinal 24x230g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "24",
    "ean": "7891000356791|1904.10.00|17891000356804|false",
    "imageUrl": "/uploads/produtos/12510020 - CRUNCH Cereal Matinal 24x230g BR.png",
    "isNew": false
  },
  {
    "code": "12510030",
    "name": "MOCA FLAKES Cereal Matinal 24x230g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "24",
    "ean": "7891000356838|1904.10.00|17891000356842|false",
    "imageUrl": "/uploads/produtos/12510030 - MOCA FLAKES Cereal Matinal 24x230g BR.png",
    "isNew": false
  },
  {
    "code": "12510167",
    "name": "MUCILON Milho Sachet 9x360g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 360G",
    "packSize": "9",
    "ean": "7891000356975|1901.10.30|17891000356989|false",
    "imageUrl": "/uploads/produtos/12510167 - MUCILON Milho Sachet 9x360g BR.png",
    "isNew": false
  },
  {
    "code": "12510168",
    "name": "MUCILON Arroz e Aveia Sachet 9x360g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 360G",
    "packSize": "9",
    "ean": "7891000357019|1901.10.30|17891000357023|false",
    "imageUrl": "/uploads/produtos/12510168 - MUCILON Arroz e Aveia Sachet 9x360g BR.png",
    "isNew": false
  },
  {
    "code": "12510173",
    "name": "MUCILON Arroz Sachet 9x360g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 360G",
    "packSize": "9",
    "ean": "7891000357170|1901.10.30|17891000357184|false",
    "imageUrl": "/uploads/produtos/12510173 - MUCILON Arroz Sachet 9x360g BR.png",
    "isNew": false
  },
  {
    "code": "12510643",
    "name": "SNOW FLAKES Cereal Matinal 24x230g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW ATE 300G",
    "packSize": "24",
    "ean": "7891000357460|1904.10.00|17891000357474|false",
    "imageUrl": "/uploads/produtos/12510643 - SNOW FLAKES Cereal Matinal 24x230g BR.png",
    "isNew": false
  },
  {
    "code": "12511794",
    "name": "NESTLE CORN FLAKES Cer Mat 24x190g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "24",
    "ean": "7891000357897|1904.10.00|17891000357900|false",
    "imageUrl": "/uploads/produtos/12511794 - NESTLE CORN FLAKES Cer Mat 24x190g BR.png",
    "isNew": false
  },
  {
    "code": "12511795",
    "name": "NEGRESCO Bisc Rech Fininho 44x57g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "44",
    "ean": "7891000357972|1905.31.00|17891000357986|false",
    "imageUrl": "/uploads/produtos/12511795 - NEGRESCO Bisc Rech Fininho 44x57g BR.png",
    "isNew": false
  },
  {
    "code": "12513225",
    "name": "NESTLE Farinha Lactea Trdl 24x360g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "FARINHA LACTEA LATA",
    "packSize": "24",
    "ean": "7891000358764|1901.10.20|17891000358778|false",
    "imageUrl": "/uploads/produtos/12513225 - NESTLE Farinha Lactea Trdl 24x360g BR.png",
    "isNew": false
  },
  {
    "code": "12513226",
    "name": "NESTON 3 Cereais 18x360g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTON LATA",
    "packSize": "18",
    "ean": "7891000358801|1104.29.00|17891000358815|false",
    "imageUrl": "/uploads/produtos/12513226 - NESTON 3 Cereais 18x360g BR.png",
    "isNew": false
  },
  {
    "code": "12513468",
    "name": "NESTLE CLASSIC Duo Cookie 22x150g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS FAMILIARES NESTLE",
    "packSize": "22",
    "ean": "7891000359006|1806.32.10|17891000359010|false",
    "imageUrl": "/uploads/produtos/12513468 - NESTLE CLASSIC Duo Cookie 22x150g BR.png",
    "isNew": false
  },
  {
    "code": "12513483",
    "name": "NESTLE CLASSIC Amendoim 22x150g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS FAMILIARES NESTLE",
    "packSize": "22",
    "ean": "7891000358887|1806.32.10|17891000358891|false",
    "imageUrl": "/uploads/produtos/12513483 - NESTLE CLASSIC Amendoim 22x150g BR.png",
    "isNew": false
  },
  {
    "code": "12514534",
    "name": "NESCAU Prontinho Blactea 27x180ml BR",
    "brand": "RTD KIDS",
    "category": "RTD KIDS REGULAR",
    "packSize": "27",
    "ean": "7891000359822|2202.99.00EX01|17891000359836|false",
    "imageUrl": "/uploads/produtos/12514534 - NESCAU Prontinho Blactea 27x180ml BR.png",
    "isNew": false
  },
  {
    "code": "12517524",
    "name": "NESCAU+SNWFLAKE Cer Mat 12x440g PRM BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU 300G+",
    "packSize": "12",
    "ean": "7891000361078|1904.10.00|17891000361082|false",
    "imageUrl": "/uploads/produtos/12517524 - NESCAU+SNWFLAKE Cer Mat 12x440g PRM BR.png",
    "isNew": false
  },
  {
    "code": "12517928",
    "name": "NESTLE CLASSIC Choc Ao Leite 22x150g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS FAMILIARES NESTLE",
    "packSize": "22",
    "ean": "7891000361214|1806.32.10|17891000361228|false",
    "imageUrl": "/uploads/produtos/12517928 - NESTLE CLASSIC Choc Ao Leite 22x150g BR.png",
    "isNew": false
  },
  {
    "code": "12518098",
    "name": "NESCAU Cereal Matinal 14x540g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU 300G+",
    "packSize": "14",
    "ean": "7891000361641|1904.10.00|17891000361655|false",
    "imageUrl": "/uploads/produtos/12518098 - NESCAU Cereal Matinal 14x540g BR.png",
    "isNew": false
  },
  {
    "code": "12519758",
    "name": "FRISKIES Megamix Adulto 10x1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000363898|2309.10.00|17891000363901|false",
    "imageUrl": "/uploads/produtos/12519758.jpg",
    "isNew": false
  },
  {
    "code": "12519762",
    "name": "FRISKIES Megamix Adulto 6x3kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000363935|2309.10.00|17891000363949|false",
    "imageUrl": "/uploads/produtos/12623819 - FRISKIES Megamix 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12519867",
    "name": "FRISKIES Mix Carne Castrados 6x3kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000364000|2309.10.00|17891000364014|false",
    "imageUrl": "/uploads/produtos/12519867.jpg",
    "isNew": false
  },
  {
    "code": "12519874",
    "name": "FRISKIES Mix Carne Castrados 10x1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000364079|2309.10.00|17891000364083|false",
    "imageUrl": "/uploads/produtos/12623506 - FRISKIES Mix de Carnes 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12519987",
    "name": "FRISKIES Megamix Castrado 6x3kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000257968|2309.10.00|7891000298275|false",
    "imageUrl": "/uploads/produtos/12519987.jpg",
    "isNew": false
  },
  {
    "code": "12519988",
    "name": "FRISKIES Mar de Sabores 6x3kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000069431|2309.10.00|7891000298138|false",
    "imageUrl": "/uploads/produtos/12519988.jpg",
    "isNew": false
  },
  {
    "code": "12520001",
    "name": "NESCAU Wafer Chocolate 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000364253|1905.32.00|17891000364267|false",
    "imageUrl": "/uploads/produtos/12520001 - NESCAU Wafer Chocolate 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12520004",
    "name": "FRISKIES Delicias da Granja Frg 6x3kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000032664|2309.10.00|7891000298169|false",
    "imageUrl": "/uploads/produtos/13392684 - FRISKIES Delicias daGranja Frg 7x2,5kgBR.jpeg",
    "isNew": false
  },
  {
    "code": "12520011",
    "name": "FRISKIES Filhotes Frango 10x1kg N1 BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000077276|2309.10.00|7891000244807|false",
    "imageUrl": "/uploads/produtos/13754078 - FRSK Filhotes Frango 9x850g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12520012",
    "name": "FRISKIES Mix Carne Adulto 10x1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000069905|2309.10.00|7891000244791|false",
    "imageUrl": "/uploads/produtos/12623506 - FRISKIES Mix de Carnes 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12520223",
    "name": "FRISKIES Delicias daGranja Frg 10x1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000621608|2309.10.00|7891000244715|false",
    "imageUrl": "/uploads/produtos/13392684 - FRISKIES Delicias daGranja Frg 7x2,5kgBR.jpeg",
    "isNew": false
  },
  {
    "code": "12520224",
    "name": "FRISKIES Megamix Castrados 10x1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000257944|2309.10.00|7891000257951|false",
    "imageUrl": "/uploads/produtos/12623819 - FRISKIES Megamix 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12520229",
    "name": "FRISKIES Mix Carne Adulto 10,1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000069462|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12320782 - MAGGI Caldo de Carne NPro 6x1,01kg BR.png",
    "isNew": false
  },
  {
    "code": "12520234",
    "name": "FRISKIES Filhotes Frango 12x500g N1 BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "12",
    "ean": "7891000324127|2309.10.00|7891000324134|false",
    "imageUrl": "/uploads/produtos/13754078 - FRSK Filhotes Frango 9x850g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12520236",
    "name": "FRISKIES Mar de Sabores 10,1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000069455|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12623520 - FRISKIES Mar de Sabores 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12521363",
    "name": "PASSATEMPO Biscoito Maisena 40x170g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES PASSATEMPO",
    "packSize": "40",
    "ean": "7891000365335|1905.31.00|17891000365318|false",
    "imageUrl": "/uploads/produtos/12521363 - PASSATEMPO Biscoito Maisena 40x170g BR.png",
    "isNew": false
  },
  {
    "code": "12521371",
    "name": "PASSATEMPO BiscoitoLeiteMaltado54x150gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES PASSATEMPO",
    "packSize": "54",
    "ean": "7891000365267|1905.31.00|17891000365271|false",
    "imageUrl": "/uploads/produtos/12521371 - PASSATEMPO BiscoitoLeiteMaltado54x150gBR.png",
    "isNew": false
  },
  {
    "code": "12521749",
    "name": "NESCAFE CAPPUCCINO Trdl Lata 24x180g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "DEMAIS NESCAFE",
    "packSize": "24",
    "ean": "7891000613597|1806.90.00|7891000365656|false",
    "imageUrl": "/uploads/produtos/12521749 - NESCAFE CAPPUCCINO Trdl Lata 24x180g BR.png",
    "isNew": false
  },
  {
    "code": "12521837",
    "name": "NESCAFECAPPUCCINODoisFradesLata24x180gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "DEMAIS NESCAFE",
    "packSize": "24",
    "ean": "7891000892473|1806.90.00|7891000682371|false",
    "imageUrl": "/uploads/produtos/12521837 - NESCAFECAPPUCCINODoisFradesLata24x180gBR.png",
    "isNew": false
  },
  {
    "code": "12522825",
    "name": "GAROTO Tablete Choc Mamgo 4(16x80g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008124026|1806.32.10|17891008124047|false",
    "imageUrl": "/uploads/produtos/12522825 - GAROTO Tablete Choc Mamgo 4(16x80g) XW.png",
    "isNew": false
  },
  {
    "code": "12522826",
    "name": "GAROTO Crocante Tablete 4(16x80g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008124071|1806.32.10|17891008124108|false",
    "imageUrl": "/uploads/produtos/12522826 - GAROTO Crocante Tablete 4(16x80g) XW.png",
    "isNew": false
  },
  {
    "code": "12522829",
    "name": "GAROTO Tablete ChocBco Bisc 4(16x80g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008124477|1704.90.10|17891008124351|false",
    "imageUrl": "/uploads/produtos/12522829 - GAROTO Tablete ChocBco Bisc 4(16x80g) XW.png",
    "isNew": false
  },
  {
    "code": "12522832",
    "name": "GAROTO Tablete Choc aoLeite 4(16x80g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008123975|1806.32.10|17891008124009|false",
    "imageUrl": "/uploads/produtos/12522832 - GAROTO Tablete Choc aoLeite 4(16x80g) XW (1).png",
    "isNew": false
  },
  {
    "code": "12522835",
    "name": "GAROTO Tablete Castanha Caju 4(16x80g)XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008124170|1806.32.10|17891008124207|false",
    "imageUrl": "/uploads/produtos/12522835 - GAROTO Tablete Castanha Caju 4(16x80g)XW.png",
    "isNew": false
  },
  {
    "code": "12523120",
    "name": "NESQUIK Bebida Lactea Morango 27x180mlBR",
    "brand": "RTD KIDS",
    "category": "RTD KIDS ESPECIAIS",
    "packSize": "27",
    "ean": "7891000366141|2202.99.00|17891000366155|false",
    "imageUrl": "/uploads/produtos/12523120 - NESQUIK Bebida Lactea Morango 27x180mlBR.png",
    "isNew": false
  },
  {
    "code": "12525293",
    "name": "FANCY FEAST Petit Filet Carne 15x85gN1BR",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000296073|2309.10.00|7891000296080|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526276",
    "name": "FANCY FEAST Cass Frango e Peru15x85gN1XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000295915|2309.10.00|17891000368319|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526286",
    "name": "FANCY FEAST Cass Atum e Salmao15x85gN1XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000296196|2309.10.00|17891000368357|false",
    "imageUrl": "/uploads/produtos/12526286.jpg",
    "isNew": false
  },
  {
    "code": "12526301",
    "name": "FANCY FEAST Goulash Atum 15x85g N1 XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000295717|2309.10.00|17891000368432|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526303",
    "name": "FANCY FEAST Goulash Peru 15x85g N1 XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000295991|2309.10.00|17891000368470|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526304",
    "name": "CLASSIC Chocolate Mamgo 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000368572|1806.32.10|17891000368609|false",
    "imageUrl": "/uploads/produtos/12526304 - CLASSIC Chocolate Mamgo 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12526310",
    "name": "FANCY FEAST Petit Filet Salmao15x85gN1XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000296158|2309.10.00|17891000368517|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526311",
    "name": "GAROTO Tab ChocLei CajuPas 4(16x80g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008124828|1806.32.10|17891008124849|false",
    "imageUrl": "/uploads/produtos/12526311 - GAROTO Tab ChocLei CajuPas 4(16x80g) XW.png",
    "isNew": false
  },
  {
    "code": "12526320",
    "name": "GALAK Chocolate 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000368626|1704.90.10|17891000368654|false",
    "imageUrl": "/uploads/produtos/12526320 - GALAK Chocolate 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12526404",
    "name": "FANCY FEAST Demi Glace Frango 15x85gN1XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000295793|2309.10.00|17891000368692|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12527297",
    "name": "DIPLOMATA Chocolate 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000368893|1806.32.10|17891000368920|false",
    "imageUrl": "/uploads/produtos/12527297 - DIPLOMATA Chocolate 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12527298",
    "name": "CLASSIC Chocolate ao Leite 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000369098|1806.32.10|17891000369125|false",
    "imageUrl": "/uploads/produtos/12527298 - CLASSIC Chocolate ao Leite 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12527302",
    "name": "CLASSIC Duo Chocolate 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000368992|1806.32.10|17891000369026|false",
    "imageUrl": "/uploads/produtos/12527302 - CLASSIC Duo Chocolate 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12527322",
    "name": "CLASSIC Prestigio 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000368947|1806.32.10|17891000368975|false",
    "imageUrl": "/uploads/produtos/12527322 - CLASSIC Prestigio 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12527324",
    "name": "MUCILON SNACKS Laranja &Banana 15x35g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "15",
    "ean": "7891000369203|1905.90.20|17891000369217|false",
    "imageUrl": "/uploads/produtos/12527324 - MUCILON SNACKS Laranja &Banana 15x35g BR.png",
    "isNew": false
  },
  {
    "code": "12527418",
    "name": "NESTLE Farinha Lactea Trdl 24x160g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "FARINHA LACTEA SACHET ATE 400G",
    "packSize": "24",
    "ean": "7891000369340|1901.10.20|17891000369354|false",
    "imageUrl": "/uploads/produtos/12527418 - NESTLE Farinha Lactea Trdl 24x160g BR.jpg",
    "isNew": false
  },
  {
    "code": "12527434",
    "name": "CRUNCH Chocolate 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000369371|1806.32.10|17891000369408|false",
    "imageUrl": "/uploads/produtos/12527434 - CRUNCH Chocolate 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12527435",
    "name": "GAROTO Tablete Choc Bco 4(16x80g) N1 XW",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891008125214|1704.90.10|17891008125242|false",
    "imageUrl": "/uploads/produtos/12527435 - GAROTO Tablete Choc Bco 4(16x80g) N1 XW.png",
    "isNew": false
  },
  {
    "code": "12528243",
    "name": "SBUX Frappuccino Classic 4(6x280ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000369753|2202.99.00|17891000369767|false",
    "imageUrl": "/uploads/produtos/12528243 - SBUX Frappuccino Classic 4(6x280ml) BR.png",
    "isNew": false
  },
  {
    "code": "12528254",
    "name": "STARBUCKS Frappuccino Crml 4(6x280ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000369715|2202.99.00|17891000369729|false",
    "imageUrl": "/uploads/produtos/12528254 - STARBUCKS Frappuccino Crml 4(6x280ml) BR.png",
    "isNew": false
  },
  {
    "code": "12531949",
    "name": "SBUX Frappuccino Mocha 4(6x280ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000371336|2202.99.00EX01|17891000371340|false",
    "imageUrl": "/uploads/produtos/12531949 - SBUX Frappuccino Mocha 4(6x280ml) BR.png",
    "isNew": false
  },
  {
    "code": "12533720",
    "name": "GAROTO Tab Choc aoLei Amendi 22x150g XI",
    "brand": "GAROTO",
    "category": "JUMBOS FAMILIARES GAROTO",
    "packSize": "22",
    "ean": "7891008125719|1806.32.10|17891008125723|false",
    "imageUrl": "/uploads/produtos/12533720 - GAROTO Tab Choc aoLei Amendi 22x150g XI.png",
    "isNew": false
  },
  {
    "code": "12534256",
    "name": "GALAK Wafer 48x110g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000372548|1905.32.00|17891000372552|false",
    "imageUrl": "/uploads/produtos/12534256 - GALAK Wafer 48x110g N1 BR.png",
    "isNew": false
  },
  {
    "code": "12534263",
    "name": "BONO Wafer Chocolate 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000372586|1905.32.00|17891000372590|false",
    "imageUrl": "/uploads/produtos/12534263 - BONO Wafer Chocolate 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12534475",
    "name": "FRISKIES Atum ao Molho 15x85g N1 BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000118115|2309.10.00|7891000116043|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12534476",
    "name": "FRISKIES Peru ao Molho 15x85g N1 BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000118061|2309.10.00|7891000116012|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12534477",
    "name": "FRISKIES Carne ao Molho 15x85g N1 BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000115763|2309.10.00|7891000115770|false",
    "imageUrl": "/uploads/produtos/12534477.jpg",
    "isNew": false
  },
  {
    "code": "12534494",
    "name": "FRISKIES Salmao ao Molho 15x85g N1 BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000118108|2309.10.00|7891000116067|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12534495",
    "name": "FRISKIES Frango ao Molho 15x85g N1 BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000118054|2309.10.00|7891000116005|false",
    "imageUrl": "/uploads/produtos/12534495.jpg",
    "isNew": false
  },
  {
    "code": "12534514",
    "name": "FRISKIES Cordeiro ao Molho 15x85g N1 BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000115787|2309.10.00|7891000115794|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12534547",
    "name": "BONO Wafer Morango 48x110g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS WAFER",
    "packSize": "48",
    "ean": "7891000373262|1905.32.00|17891000373276|false",
    "imageUrl": "/uploads/produtos/12534547 - BONO Wafer Morango 48x110g BR.png",
    "isNew": false
  },
  {
    "code": "12535219",
    "name": "NESCAFE GOLD ESPRS Intsd6 Lata 12x100gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM DEMAIS",
    "packSize": "12",
    "ean": "7891000734926|2101.11.10|7891000489741|false",
    "imageUrl": "/uploads/produtos/12535219 - NESCAFE GOLD ESPRS Intsd6 Lata 12x100gBR.png",
    "isNew": false
  },
  {
    "code": "12535260",
    "name": "NESCAFE GOLD ESPRS Intsd9 Lata 12x100gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM DEMAIS",
    "packSize": "12",
    "ean": "7891000507193|2101.11.10|7891000391525|false",
    "imageUrl": "/uploads/produtos/12535260 - NESCAFE GOLD ESPRS Intsd9 Lata 12x100gBR.png",
    "isNew": false
  },
  {
    "code": "12535685",
    "name": "FRISKIES FilhotesCarne aoMolho15x85gN1BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000115800|2309.10.00|7891000115817|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12535692",
    "name": "FRISKIES PeixeBranco aoMolho 15x85g N1BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000118085|2309.10.00|7891000116036|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12537280",
    "name": "NESLAC Zero Lactose 6x700g N1 BR",
    "brand": "LEITES DE CRESCIMENTO",
    "category": "NESLAC COMFOR",
    "packSize": "6",
    "ean": "7891000309711|2106.90.90|7891000309704|false",
    "imageUrl": "/uploads/produtos/12537280 - NESLAC Zero Lactose 6x700g N1 BR.png",
    "isNew": false
  },
  {
    "code": "12537601",
    "name": "FANCY FEAST Demi Glace Carne 15x85g N2XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000295830|2309.10.00|17891000374587|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12549968",
    "name": "NEGRESCO Biscoito Recheado 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000376768|1905.31.00|17891000376772|false",
    "imageUrl": "/uploads/produtos/12549968 - NEGRESCO Biscoito Recheado 66x90g BR.png",
    "isNew": false
  },
  {
    "code": "12549969",
    "name": "NEGRESCO Biscoito Recheado Mrg 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000376805|1905.31.00|17891000376819|false",
    "imageUrl": "/uploads/produtos/12549969 - NEGRESCO Biscoito Recheado Mrg 66x90g BR.png",
    "isNew": false
  },
  {
    "code": "12549982",
    "name": "BONO Biscoito Recheado Morango 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "66",
    "ean": "7891000376959|1905.31.00|17891000376734|false",
    "imageUrl": "/uploads/produtos/12549982 - BONO Biscoito Recheado Morango 66x90g BR.jpg",
    "isNew": false
  },
  {
    "code": "12549995",
    "name": "BONO Biscoito Recheado Limao 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "66",
    "ean": "7891000376881|1905.31.00|17891000376895|false",
    "imageUrl": "/uploads/produtos/12549995 - BONO Biscoito Recheado Limao 66x90g BR.png",
    "isNew": false
  },
  {
    "code": "12550001",
    "name": "BONO Biscoito Recheado Choc 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "66",
    "ean": "7891000376843|1905.31.00|17891000376857|false",
    "imageUrl": "/uploads/produtos/12550001 - BONO Biscoito Recheado Choc 66x90g BR.png",
    "isNew": false
  },
  {
    "code": "12550004",
    "name": "BONO Biscoito Recheado Ddl 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "66",
    "ean": "7891000376928|1905.31.00|17891000376932|false",
    "imageUrl": "/uploads/produtos/12550004 - BONO Biscoito Recheado Ddl 66x90g BR.png",
    "isNew": false
  },
  {
    "code": "12550128",
    "name": "BONO Biscoito Recheado Coco 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "66",
    "ean": "7891000377017|1905.31.00|17891000377021|false",
    "imageUrl": "/uploads/produtos/12550128 - BONO Biscoito Recheado Coco 66x90g BR.png",
    "isNew": false
  },
  {
    "code": "12550520",
    "name": "NEGRESCO Bisc Rech LiSiciliano 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000377055|1905.31.00|17891000377069|false",
    "imageUrl": "/uploads/produtos/12550520 - NEGRESCO Bisc Rech LiSiciliano 66x90g BR.jpg",
    "isNew": false
  },
  {
    "code": "12550953",
    "name": "NESTLE Chocotrio Leite 4(12x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CHOCOTRIO NESTLE",
    "packSize": "12",
    "ean": "7891000377543|1806.31.10|17891000377571|false",
    "imageUrl": "/uploads/produtos/12550953 - NESTLE Chocotrio Leite 4(12x90g) BR.png",
    "isNew": false
  },
  {
    "code": "12550965",
    "name": "NESTLE Chocotrio PastaAmendi 4(12x90g)BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CHOCOTRIO NESTLE",
    "packSize": "12",
    "ean": "7891000377642|1806.31.10|17891000377670|false",
    "imageUrl": "/uploads/produtos/12550965 - NESTLE Chocotrio PastaAmendi 4(12x90g)BR.png",
    "isNew": false
  },
  {
    "code": "12550971",
    "name": "NESTLE Chocotrio Choc 4(12x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CHOCOTRIO NESTLE",
    "packSize": "12",
    "ean": "7891000377598|1806.31.10|17891000377625|false",
    "imageUrl": "/uploads/produtos/12550971 - NESTLE Chocotrio Choc 4(12x90g) BR.png",
    "isNew": false
  },
  {
    "code": "12551154",
    "name": "NESCAU Achocolatado Po 30% Ccu 24x180gBR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU ESPECIAIS",
    "packSize": "24",
    "ean": "7891000377765|1806.90.00EX01|17891000377779|false",
    "imageUrl": "/uploads/produtos/12551154 - NESCAU Achocolatado Po 30% Ccu 24x180gBR.png",
    "isNew": false
  },
  {
    "code": "12551184",
    "name": "NESCAU Achocolatado Po 60% Ccu 24x180gBR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU ESPECIAIS",
    "packSize": "24",
    "ean": "7891000377727|1806.90.00EX01|17891000377731|false",
    "imageUrl": "/uploads/produtos/12551184 - NESCAU Achocolatado Po 60% Ccu 24x180gBR.png",
    "isNew": false
  },
  {
    "code": "12551246",
    "name": "NDG MOCHACCINO Canl 10Caps 6x172g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "QUERIDINHOS BEBIDAS",
    "packSize": "6",
    "ean": "7891000294376|2101.12.00|7891000543757|false",
    "imageUrl": "/uploads/produtos/12551246 - NDG MOCHACCINO Canl 10Caps 6x172g BR.png",
    "isNew": false
  },
  {
    "code": "12551249",
    "name": "NDG Cafe Caseiro 10Caps 6x80g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS CAFES",
    "packSize": "6",
    "ean": "7891000302750|0901.21.00|7891000681565|false",
    "imageUrl": "/uploads/produtos/12551249 - NDG Cafe Caseiro 10Caps 6x80g BR.png",
    "isNew": false
  },
  {
    "code": "12551257",
    "name": "NDG Nescau 10Caps 6x170g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "BEBIDAS CHOCOS",
    "packSize": "6",
    "ean": "7891000243688|1806.90.00EX01|7891000519523|false",
    "imageUrl": "/uploads/produtos/12551257.png",
    "isNew": false
  },
  {
    "code": "12551265",
    "name": "NDG ESPRESSO 10Caps 6x60g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "QUERIDINHOS CAFES",
    "packSize": "6",
    "ean": "7891000243787|0901.21.00|7891000327746|false",
    "imageUrl": "/uploads/produtos/12551265 - NDG ESPRESSO 10Caps 6x60g BR.png",
    "isNew": false
  },
  {
    "code": "12551271",
    "name": "NDG CAFE AU LAIT Baun 10Caps 6x110g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS BEBIDAS",
    "packSize": "6",
    "ean": "7891000907573|2101.12.00|7891000155059|false",
    "imageUrl": "/uploads/produtos/12551271 - NDG CAFE AU LAIT Baun 10Caps 6x110g BR.png",
    "isNew": false
  },
  {
    "code": "12551300",
    "name": "NDG ESPRESSO Inso 10Caps 6x80g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "QUERIDINHOS CAFES",
    "packSize": "6",
    "ean": "7891000243725|0901.21.00|7891000589717|false",
    "imageUrl": "/uploads/produtos/12551300 - NDG ESPRESSO Inso 10Caps 6x80g BR.png",
    "isNew": false
  },
  {
    "code": "12551301",
    "name": "NDG CAPPUCCINO 10Caps 6x117g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "QUERIDINHOS BEBIDAS",
    "packSize": "6",
    "ean": "7891000291863|0901.21.00|7891000567944|false",
    "imageUrl": "/uploads/produtos/12551301 - NDG CAPPUCCINO 10Caps 6x117g BR.png",
    "isNew": false
  },
  {
    "code": "12551302",
    "name": "NDG Caffe Matinal 10Caps 6x80g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "QUERIDINHOS CAFES",
    "packSize": "6",
    "ean": "7891000621981|0901.21.00|7891000435922|false",
    "imageUrl": "/uploads/produtos/12551302 - NDG Caffe Matinal 10Caps 6x80g BR.png",
    "isNew": false
  },
  {
    "code": "12551448",
    "name": "NDG LUNGO 10Caps 6x70g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS CAFES",
    "packSize": "6",
    "ean": "7891000147238|0901.21.00|7891000656853|false",
    "imageUrl": "/uploads/produtos/12551448 - NDG LUNGO 10Caps 6x70g BR.png",
    "isNew": false
  },
  {
    "code": "12551459",
    "name": "NDG CAFE AU LAIT 10Caps 6x100g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "QUERIDINHOS BEBIDAS",
    "packSize": "6",
    "ean": "7891000243954|2101.12.00|7891000689257|false",
    "imageUrl": "/uploads/produtos/12551459 - NDG CAFE AU LAIT 10Caps 6x100g BR.png",
    "isNew": false
  },
  {
    "code": "12551463",
    "name": "NDG LATTE MACCHIATO 10Caps 6x112,5g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS BEBIDAS",
    "packSize": "6",
    "ean": "7891000388655|0901.21.00|7891000140062|false",
    "imageUrl": "/uploads/produtos/12551463 - NDG LATTE MACCHIATO 10Caps 6x112,5g BR (1).png",
    "isNew": false
  },
  {
    "code": "12551473",
    "name": "NDG CAPPUCCINO Ddl 10Caps 6x170g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS BEBIDAS",
    "packSize": "6",
    "ean": "7891000877456|2101.12.00|7891000609187|false",
    "imageUrl": "/uploads/produtos/12551473 - NDG CAPPUCCINO Ddl 10Caps 6x170g BR.png",
    "isNew": false
  },
  {
    "code": "12552456",
    "name": "NDG Origem Organico 10Caps 6x80g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS CAFES",
    "packSize": "6",
    "ean": "7891000452127|0901.21.00|7891000523896|false",
    "imageUrl": "/uploads/produtos/12552456 - NDG Origem Organico 10Caps 6x80g BR.jpg",
    "isNew": false
  },
  {
    "code": "12555551",
    "name": "NESCAU Achoc Po Cilindrico 24x200g BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU LATA 200G",
    "packSize": "24",
    "ean": "7891000379585|1806.90.00EX01|17891000379599|false",
    "imageUrl": "/uploads/produtos/12555551 - NESCAU Achoc Po Cilindrico 24x200g BR.png",
    "isNew": false
  },
  {
    "code": "12556035",
    "name": "NESCAU Achoc Po Cilindro 12x670g BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU LATA 670G",
    "packSize": "12",
    "ean": "7891000379738|1806.90.00EX01|17891000379742|false",
    "imageUrl": "/uploads/produtos/12556035 - NESCAU Achoc Po Cilindro 12x670g BR.png",
    "isNew": false
  },
  {
    "code": "12558286",
    "name": "NESTLE Aveia Flocos Finos 18x450g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS",
    "packSize": "18",
    "ean": "7891000381038|1104.12.00|17891000381042|false",
    "imageUrl": "/uploads/produtos/12558286 - NESTLE Aveia Flocos Finos 18x450g BR.png",
    "isNew": false
  },
  {
    "code": "12558441",
    "name": "NESCAU Beb Menos Acucar ZrLact27x180mlBR",
    "brand": "RTD KIDS",
    "category": "RTD KIDS ESPECIAIS",
    "packSize": "27",
    "ean": "7891000381113|2202.99.00EX01|17891000381127|false",
    "imageUrl": "/uploads/produtos/12558441 - NESCAU Beb Menos Acucar ZrLact27x180mlBR.png",
    "isNew": false
  },
  {
    "code": "12559766",
    "name": "NESTLE Aveia Farelo 28x170g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS",
    "packSize": "28",
    "ean": "7891000382301|1104.12.00|17891000382315|false",
    "imageUrl": "/uploads/produtos/12559766 - NESTLE Aveia Farelo 28x170g BR.png",
    "isNew": false
  },
  {
    "code": "12559794",
    "name": "NESTLE Aveia Farinha 28x170g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS",
    "packSize": "28",
    "ean": "7891000382547|1102.90.00|17891000382551|false",
    "imageUrl": "/uploads/produtos/12559794 - NESTLE Aveia Farinha 28x170g BR.png",
    "isNew": false
  },
  {
    "code": "12560459",
    "name": "SNOW FLAKES Cer Mat 14x620gPRL620P470BR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW 300G+",
    "packSize": "14",
    "ean": "7891000382837|1904.10.00|17891000382841|false",
    "imageUrl": "/uploads/produtos/12560459 - SNOW FLAKES Cer Mat 14x620gPRL620P470BR.png",
    "isNew": false
  },
  {
    "code": "12561091",
    "name": "MUCILON Snack Pipoquinha Milho 15x35g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "15",
    "ean": "7891000383063|1905.90.20|17891000383077|false",
    "imageUrl": "/uploads/produtos/12561091 - MUCILON Snack Pipoquinha Milho 15x35g BR.png",
    "isNew": false
  },
  {
    "code": "12561814",
    "name": "NESCAFE Descafeinado Sachet 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000184004|2101.11.10|17891000383442|false",
    "imageUrl": "/uploads/produtos/12561814 - NESCAFE Descafeinado Sachet 24x40g BR.png",
    "isNew": false
  },
  {
    "code": "12562153",
    "name": "DCHOW XLfe Lact FilhMedGdeCarFrArz15kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116449|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12655182 - DCHOW XLfeLactFilhMdGdCarFrgArz7x2,5kgBR.png",
    "isNew": false
  },
  {
    "code": "12562154",
    "name": "DCHOWXLfeLactFilhMedGdeCarFrgArz10,1kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000350652|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12562164",
    "name": "DOGCHOW PAPITA XLfe Lact CarFrArz 20kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000016213|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12655182 - DCHOW XLfeLactFilhMdGdCarFrgArz7x2,5kgBR.png",
    "isNew": false
  },
  {
    "code": "12562294",
    "name": "DCHOW XLfeLactFilhMnPeqCarFrgArz10,1kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000350591|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12562302",
    "name": "DCHOW XLfeLact FilhMnPeqCarFrgArz5x3kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "5",
    "ean": "7891000116494|2309.10.00|7891000116500|false",
    "imageUrl": "/uploads/produtos/12655182 - DCHOW XLfeLactFilhMdGdCarFrgArz7x2,5kgBR.png",
    "isNew": false
  },
  {
    "code": "12562402",
    "name": "DCHOWXLfeLactFilhMedGdeCarFrgArz10x1kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "10",
    "ean": "7891000350881|2309.10.00|7891000001547|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12562410",
    "name": "DOGCHOW XLfeLactFilhMnPeqCarFrgArz15kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116463|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12562410.jpeg",
    "isNew": false
  },
  {
    "code": "12562754",
    "name": "NESCAFE GOLD Intsd 9 Sachet 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM SACHET",
    "packSize": "24",
    "ean": "7891000357064|2101.11.10|17891000384579|false",
    "imageUrl": "/uploads/produtos/12562754 - NESCAFE GOLD Intsd 9 Sachet 24x40g BR.png",
    "isNew": false
  },
  {
    "code": "12562774",
    "name": "NESCAFE GOLD Intsd 6 Sachet 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM SACHET",
    "packSize": "24",
    "ean": "7891000491249|2101.11.10|17891000384623|false",
    "imageUrl": "/uploads/produtos/12562774 - NESCAFE GOLD Intsd 6 Sachet 24x40g BR.png",
    "isNew": false
  },
  {
    "code": "12566987",
    "name": "NEGRESCO Cereal Matinal 24x200g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "DEMAIS CEREAIS MATINAIS",
    "packSize": "24",
    "ean": "7891000385791|1904.10.00|17891000385675|false",
    "imageUrl": "/uploads/produtos/12566987 - NEGRESCO Cereal Matinal 24x200g BR (1).png",
    "isNew": false
  },
  {
    "code": "12570879",
    "name": "GAROTO Bombom CrocanteCaribe 30x215,2gBR",
    "brand": "GAROTO",
    "category": "CAIXAS ESPECIAIS GAROTO",
    "packSize": "30",
    "ean": "7891000388754|1806.90.00|17891000388768|false",
    "imageUrl": "/uploads/produtos/12570879 - GAROTO Bombom CrocanteCaribe 30x215,2gBR.png",
    "isNew": false
  },
  {
    "code": "12571027",
    "name": "PSTMP Fininho Bisc Rech Avela 44x57g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "44",
    "ean": "7891000389096|1905.31.00|17891000389109|false",
    "imageUrl": "/uploads/produtos/12571027 - PSTMP Fininho Bisc Rech Avela 44x57g BR.png",
    "isNew": false
  },
  {
    "code": "12571139",
    "name": "NESCAFE CAPPU CanelaBebGarr 4(6x270ml)BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000389225|2202.99.00EX01|17891000389239|false",
    "imageUrl": "/uploads/produtos/12571139 - NESCAFE CAPPU CanelaBebGarr 4(6x270ml)BR.png",
    "isNew": false
  },
  {
    "code": "12571160",
    "name": "NESCAFE LATTE BebGarrPlas 4(6x270ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000389171|2202.99.00|17891000389185|false",
    "imageUrl": "/uploads/produtos/12571160 - NESCAFE LATTE BebGarrPlas 4(6x270ml) BR.png",
    "isNew": false
  },
  {
    "code": "12571161",
    "name": "NESCAFEChocnoBebGarrafaPlas4(6x270ml)BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS CAFES",
    "packSize": "24",
    "ean": "7891000389300|2202.99.00EX01|17891000389314|false",
    "imageUrl": "/uploads/produtos/12571161 - NESCAFEChocnoBebGarrafaPlas4(6x270ml)BR.png",
    "isNew": false
  },
  {
    "code": "12571519",
    "name": "GATSY Carne 20kg N1 BR",
    "brand": "MAINSTREAM",
    "category": "GATSY DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000325506|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12571524",
    "name": "GATSY Carne 10,1kg N1 BR",
    "brand": "MAINSTREAM",
    "category": "GATSY DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000318492|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12571524.jpg",
    "isNew": false
  },
  {
    "code": "12572613",
    "name": "SBUX MEDIUM COLUMB 10Caps 6x55g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "STARBUCKS CAPS NDG",
    "packSize": "6",
    "ean": "7891000594711|0901.21.00|17891000390464|false",
    "imageUrl": "/uploads/produtos/12572613 - SBUX MEDIUM COLUMB 10Caps 6x55g BR.png",
    "isNew": false
  },
  {
    "code": "12572694",
    "name": "NCUAchocPo33%MenosAcuCilindro36x350gBR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU ESPECIAIS",
    "packSize": "36",
    "ean": "7891000390030|1806.90.00EX01|17891000390044|false",
    "imageUrl": "/uploads/produtos/12572694 - NCUAchocPo33%MenosAcuCilindro36x350gBR.png",
    "isNew": false
  },
  {
    "code": "12574653",
    "name": "SBUX CAPPUCCINO Wht 10Caps 6x100g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "STARBUCKS CAPS NDG",
    "packSize": "6",
    "ean": "7891000592007|0901.21.00|17891000390938|false",
    "imageUrl": "/uploads/produtos/12574653 - SBUX CAPPUCCINO Wht 10Caps 6x100g BR.png",
    "isNew": false
  },
  {
    "code": "12574985",
    "name": "NDG Alpino Tradicional 10Caps 6x178g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "BEBIDAS CHOCOS",
    "packSize": "6",
    "ean": "7891000738481|1806.90.00EX01|17891000391041|false",
    "imageUrl": "/uploads/produtos/12574985 - NDG Alpino Tradicional 10Caps 6x178g BR.png",
    "isNew": false
  },
  {
    "code": "12576094",
    "name": "NAN COMFOR 6-12Meses HMO 6x800g BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NAN COMFOR",
    "packSize": "6",
    "ean": "7891000079515|1901.10.90|7891000079522|false",
    "imageUrl": "/uploads/produtos/12576094 - NAN COMFOR 6-12Meses HMO 6x800g BR.png",
    "isNew": false
  },
  {
    "code": "12577865",
    "name": "NINHO Leite Integral Inst Lata 24x380gBR",
    "brand": "NINHO",
    "category": "NINHO INSTANTANEO LATA",
    "packSize": "24",
    "ean": "7891000393284|0402.21.10|17891000393281|false",
    "imageUrl": "/uploads/produtos/12577865 - NINHO Leite Integral Inst Lata 24x380gBR.png",
    "isNew": false
  },
  {
    "code": "12580999",
    "name": "KIT KAT Cereal Matinal 24x210g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "KIT KAT",
    "packSize": "24",
    "ean": "7891000394939|1904.10.00|17891000394936|false",
    "imageUrl": "/uploads/produtos/12580999 - KIT KAT Cereal Matinal 24x210g BR.png",
    "isNew": false
  },
  {
    "code": "12581678",
    "name": "GAROTO Choco Trio Negresco 4(12x90g) BR",
    "brand": "GAROTO",
    "category": "CHOCOTRIO GAROTO",
    "packSize": "12",
    "ean": "7891000395417|1806.31.10|17891000395445|false",
    "imageUrl": "/uploads/produtos/12581678 - GAROTO Choco Trio Negresco 4(12x90g) BR.png",
    "isNew": false
  },
  {
    "code": "12581976",
    "name": "GAROTO TableteChocLeiNegresco 22x150gBR",
    "brand": "GAROTO",
    "category": "JUMBOS FAMILIARES GAROTO",
    "packSize": "22",
    "ean": "7891000395561|1806.32.10|17891000395575|false",
    "imageUrl": "/uploads/produtos/12581976 - GAROTO TableteChocLeiNegresco 22x150gBR.png",
    "isNew": false
  },
  {
    "code": "12581977",
    "name": "GAROTO TableteChocLeiCrocante 22x150gBR",
    "brand": "GAROTO",
    "category": "JUMBOS FAMILIARES GAROTO",
    "packSize": "22",
    "ean": "7891000395608|1806.32.10|17891000395629|false",
    "imageUrl": "/uploads/produtos/12581977 - GAROTO TableteChocLeiCrocante 22x150gBR.png",
    "isNew": false
  },
  {
    "code": "12582848",
    "name": "NINHO LeitePo Integral Sachet 12x575g BR",
    "brand": "NINHO",
    "category": "NINHO INTEGRAL SACHET",
    "packSize": "12",
    "ean": "7891000395943|0402.21.10|17891000395940|false",
    "imageUrl": "/uploads/produtos/12582848 - NINHO LeitePo Integral Sachet 12x575g BR.png",
    "isNew": false
  },
  {
    "code": "12582856",
    "name": "NINHO Leite Integral Inst Sac 12x575g BR",
    "brand": "NINHO",
    "category": "NINHO INSTANTANEO SACHET",
    "packSize": "12",
    "ean": "7891000395981|0402.21.10|17891000395988|false",
    "imageUrl": "/uploads/produtos/12582856 - NINHO Leite Integral Inst Sac 12x575g BR.png",
    "isNew": false
  },
  {
    "code": "12582874",
    "name": "NINHO Leite Integral Inst Sac 12x350g BR",
    "brand": "NINHO",
    "category": "NINHO INSTANTANEO SACHET",
    "packSize": "12",
    "ean": "7891000395905|0402.21.10|17891000395902|false",
    "imageUrl": "/uploads/produtos/12582874 - NINHO Leite Integral Inst Sac 12x350g BR.png",
    "isNew": false
  },
  {
    "code": "12583426",
    "name": "MAGGI Tempera & Amacia 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS PO SACHET",
    "packSize": "48",
    "ean": "7891000396377|3507.90.49|17891000396374|false",
    "imageUrl": "/uploads/produtos/12583426 - MAGGI Tempera & Amacia 48(10x5g) BR.png",
    "isNew": false
  },
  {
    "code": "12583436",
    "name": "NINHO Leite Po Integral Sac 12x350g BR",
    "brand": "NINHO",
    "category": "NINHO INTEGRAL SACHET",
    "packSize": "12",
    "ean": "7891000396599|0402.21.10|17891000396596|false",
    "imageUrl": "/uploads/produtos/12583436 - NINHO Leite Po Integral Sac 12x350g BR.png",
    "isNew": false
  },
  {
    "code": "12584239",
    "name": "KIT KAT Cereal Matinal 22x90g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "KIT KAT",
    "packSize": "22",
    "ean": "7891000396919|1904.10.00|17891000396916|false",
    "imageUrl": "/uploads/produtos/12584239 - KIT KAT Cereal Matinal 22x90g BR.png",
    "isNew": false
  },
  {
    "code": "12584369",
    "name": "NINHO Adulto Leite em Po 24x350g BR",
    "brand": "NINHO",
    "category": "NINHO ADULTO",
    "packSize": "24",
    "ean": "7891000397077|0402.21.20|17891000397074|false",
    "imageUrl": "/uploads/produtos/12584369 - NINHO Adulto Leite em Po 24x350g BR.png",
    "isNew": false
  },
  {
    "code": "12584392",
    "name": "GAROTO Tablete Crunch 4(16x80g) BR",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891000397107|1806.32.10|17891000397128|false",
    "imageUrl": "/uploads/produtos/12584392 - GAROTO Tablete Crunch 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12586084",
    "name": "TOSTINES Biscoito Especiarias 54x150g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES TOSTINES",
    "packSize": "54",
    "ean": "7891000397961|1905.31.00|17891000397975|true",
    "imageUrl": "/uploads/produtos/12586084 - TOSTINES Biscoito Especiarias 54x150g BR.png",
    "isNew": true
  },
  {
    "code": "12586515",
    "name": "NINHO Cmpto Lact Zero Lactose 6x700g BR",
    "brand": "NINHO",
    "category": "NINHO ZERO LACTOSE",
    "packSize": "6",
    "ean": "7891000261965|1901.10.10|17891000261962|false",
    "imageUrl": "/uploads/produtos/12586515 - NINHO Cmpto Lact Zero Lactose 6x700g BR.png",
    "isNew": false
  },
  {
    "code": "12586516",
    "name": "NINHO Cmpto Lact Zero Lactose 24x380g BR",
    "brand": "NINHO",
    "category": "NINHO ZERO LACTOSE",
    "packSize": "24",
    "ean": "7891000109908|1901.10.10|17891000109905|false",
    "imageUrl": "/uploads/produtos/12586516 - NINHO Cmpto Lact Zero Lactose 24x380g BR.png",
    "isNew": false
  },
  {
    "code": "12586544",
    "name": "NINHO Leite Po Integral Lata 24x380g BR",
    "brand": "NINHO",
    "category": "NINHO INTEGRAL LATA",
    "packSize": "24",
    "ean": "7891000325858|0402.21.10|17891000325855|false",
    "imageUrl": "/uploads/produtos/12586544 - NINHO Leite Po Integral Lata 24x380g BR.png",
    "isNew": false
  },
  {
    "code": "12589907",
    "name": "NESTONUTRI 1+ FI 12x800g BR",
    "brand": "LEITES DE CRESCIMENTO",
    "category": "NESTONUTRI",
    "packSize": "12",
    "ean": "7891000400210|1901.10.90|17891000400217|true",
    "imageUrl": "/uploads/produtos/12589907 - NESTONUTRI 1+ FI 12x800g BR.png",
    "isNew": true
  },
  {
    "code": "12590501",
    "name": "DOG CHOW Biscoito Filh FrgLei 16x300g BR",
    "brand": "SNACKS",
    "category": "DOG CHOW BISCUITS SNACKS",
    "packSize": "16",
    "ean": "7891000400548|2309.90.30|17891000400545|false",
    "imageUrl": "/uploads/produtos/12590501.png",
    "isNew": false
  },
  {
    "code": "12591103",
    "name": "NDG ESPRS Cerrado Mineiro 10Caps 6x60gBR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS CAFES",
    "packSize": "6",
    "ean": "7891000401583|0901.21.00|17891000401580|false",
    "imageUrl": "/uploads/produtos/12591103.jpg",
    "isNew": false
  },
  {
    "code": "12591179",
    "name": "NESCAU ACT-GO BebExtraCacau 4(6x270ml)BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS REGULAR",
    "packSize": "24",
    "ean": "7891000401903|2202.99.00EX01|17891000401900|false",
    "imageUrl": "/uploads/produtos/12591179 - NESCAU ACT-GO BebExtraCacau 4(6x270ml)BR.png",
    "isNew": false
  },
  {
    "code": "12591933",
    "name": "NESTLE Chocobiscuit Choc aoLei 30x78g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOBISCUIT",
    "packSize": "30",
    "ean": "7891000402979|1905.31.00|17891000402976|false",
    "imageUrl": "/uploads/produtos/12591933 - NESTLE Chocobiscuit Choc aoLei 30x78g BR.png",
    "isNew": false
  },
  {
    "code": "12591944",
    "name": "GAROTO Chocobiscuit Choc aoLei 30x78g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOBISCUIT",
    "packSize": "30",
    "ean": "7891000402931|1905.31.00|17891000402938|false",
    "imageUrl": "/uploads/produtos/12591944 - GAROTO Chocobiscuit Choc aoLei 30x78g BR.png",
    "isNew": false
  },
  {
    "code": "12591961",
    "name": "GAROTO Crocante Cookie 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000402856|1905.31.00|17891000402853|false",
    "imageUrl": "/uploads/produtos/12591961 - GAROTO Crocante Cookie 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12591962",
    "name": "CARIBE Cookie 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000402894|1905.31.00|17891000402891|false",
    "imageUrl": "/uploads/produtos/12591962 - CARIBE Cookie 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12592351",
    "name": "DOG CHOW BiscoitosFrg MedGde 16x500gN1BR",
    "brand": "SNACKS",
    "category": "DOG CHOW BISCUITS SNACKS",
    "packSize": "16",
    "ean": "7891000403037|2309.90.30|17891000403034|false",
    "imageUrl": "/uploads/produtos/12592351.jpg",
    "isNew": false
  },
  {
    "code": "12592352",
    "name": "DOGCHOW BiscoitosFrg MiniPeq 16x500gN1BR",
    "brand": "SNACKS",
    "category": "DOG CHOW BISCUITS SNACKS",
    "packSize": "16",
    "ean": "7891000403075|2309.90.30|17891000403072|false",
    "imageUrl": "/uploads/produtos/12592352.png",
    "isNew": false
  },
  {
    "code": "12592353",
    "name": "NESCAU Achocolatado Po Sac 12x900g N1 BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU SACHET 900G+",
    "packSize": "12",
    "ean": "7891000403129|1806.90.00EX01|17891000403126|false",
    "imageUrl": "/uploads/produtos/12592353 - NESCAU Achocolatado Po Sac 12x900g N1 BR.png",
    "isNew": false
  },
  {
    "code": "12592511",
    "name": "GAROTO ChocoCookies Rech Choc 40x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "40",
    "ean": "7891000403150|1905.31.00|17891000403157|false",
    "imageUrl": "/uploads/produtos/12592511 - GAROTO ChocoCookies Rech Choc 40x100g BR.png",
    "isNew": false
  },
  {
    "code": "12595377",
    "name": "NUTREN Protein 15g RTD Choc 4(6x260ml)BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000405079|2202.99.00EX01|17891000405076|true",
    "imageUrl": "/uploads/produtos/12595377 - NUTREN Protein 15g RTD Choc 4(6x260ml)BR.png",
    "isNew": true
  },
  {
    "code": "12595468",
    "name": "NUTREN Protein 15g Baunilha 4(6x260ml)BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000405222|2202.99.00|17891000405229|true",
    "imageUrl": "/uploads/produtos/12595468 - NUTREN Protein 15g Baunilha 4(6x260ml)BR.png",
    "isNew": true
  },
  {
    "code": "12598146",
    "name": "FRISKIES Petiscos Salmao 15x40g BR",
    "brand": "SNACKS",
    "category": "FRISKIES TREATS",
    "packSize": "15",
    "ean": "7891000406960|2309.10.00|17891000406967|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12598254",
    "name": "FRISKIES Petiscos Carne 15x40g N2 BR",
    "brand": "SNACKS",
    "category": "FRISKIES TREATS",
    "packSize": "15",
    "ean": "7891000407189|2309.10.00|17891000407186|false",
    "imageUrl": "/uploads/produtos/12623506 - FRISKIES Mix de Carnes 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12598255",
    "name": "FRISKIES Petiscos Frango 15x40g N1 BR",
    "brand": "SNACKS",
    "category": "FRISKIES TREATS",
    "packSize": "15",
    "ean": "7891000407196|2309.10.00|17891000407193|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12599819",
    "name": "SURPRESA TableteChocAoLeite 12(22x20g)BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "TABLETES NESTLE",
    "packSize": "22",
    "ean": "7891000408490|1806.32.10|17891000408497|false",
    "imageUrl": "/uploads/produtos/12599819 - SURPRESA TableteChocAoLeite 12(22x20g)BR.png",
    "isNew": false
  },
  {
    "code": "12600478",
    "name": "MAGGI Tempero Para Feijao 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS PO SACHET",
    "packSize": "48",
    "ean": "7891000066898|2103.90.21|17891000066895|false",
    "imageUrl": "/uploads/produtos/12600478 - MAGGI Tempero Para Feijao 48(10x5g) BR.png",
    "isNew": false
  },
  {
    "code": "12600497",
    "name": "MAGGI Tempero Para Frango 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS PO SACHET",
    "packSize": "48",
    "ean": "7891000037270|2103.90.21|17891000037277|false",
    "imageUrl": "/uploads/produtos/12600497 - MAGGI Tempero Para Frango 48(10x5g) BR.png",
    "isNew": false
  },
  {
    "code": "12600498",
    "name": "MAGGI Tempero Para Legumes 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS PO SACHET",
    "packSize": "48",
    "ean": "7891000037256|2103.90.21|27891000037250|false",
    "imageUrl": "/uploads/produtos/12600498 - MAGGI Tempero Para Legumes 48(10x5g) BR.png",
    "isNew": false
  },
  {
    "code": "12600499",
    "name": "MAGGI Tempero Para Massas 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS PO SACHET",
    "packSize": "48",
    "ean": "7891000057452|2103.90.21|17891000057459|false",
    "imageUrl": "/uploads/produtos/12600499.png",
    "isNew": false
  },
  {
    "code": "12600503",
    "name": "MAGGI Tempero Para Carnes 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS PO SACHET",
    "packSize": "48",
    "ean": "7891000037300|2103.90.21|17891000037307|false",
    "imageUrl": "/uploads/produtos/12600503 - MAGGI Tempero Para Carnes 48(10x5g) BR.png",
    "isNew": false
  },
  {
    "code": "12601436",
    "name": "GAROTO ChocoTrio Prestigio 4(12x90g) BR",
    "brand": "GAROTO",
    "category": "CHOCOTRIO GAROTO",
    "packSize": "12",
    "ean": "7891000409640|1806.31.10|17891000409647|false",
    "imageUrl": "/uploads/produtos/12601436 - GAROTO ChocoTrio Prestigio 4(12x90g) BR.png",
    "isNew": false
  },
  {
    "code": "12602527",
    "name": "ALPINO Chocolate 4(16x80g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000410707|1806.32.10|17891000410704|false",
    "imageUrl": "/uploads/produtos/12602527 - ALPINO Chocolate 4(16x80g) BR.png",
    "isNew": false
  },
  {
    "code": "12604954",
    "name": "NESTLE ChocoCookiesRechPeanut 40x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "40",
    "ean": "7891000412503|1905.31.00|17891000412500|false",
    "imageUrl": "/uploads/produtos/12604954 - NESTLE ChocoCookiesRechPeanut 40x100g BR.png",
    "isNew": false
  },
  {
    "code": "12604964",
    "name": "NESCAU Achoc Po Cilindrico 36x350g BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU LATA 350G",
    "packSize": "36",
    "ean": "7891000412855|1806.90.00EX01|17891000412852|false",
    "imageUrl": "/uploads/produtos/12604964 - NESCAU Achoc Po Cilindrico 36x350g BR.png",
    "isNew": false
  },
  {
    "code": "12606771",
    "name": "TOSTINES Leite Maltado 48x160g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES TOSTINES",
    "packSize": "48",
    "ean": "7891000413579|1905.31.00|17891000413576|true",
    "imageUrl": "/uploads/produtos/12606771 - TOSTINES Leite Maltado 48x160g N1 BR.png",
    "isNew": true
  },
  {
    "code": "12609048",
    "name": "NESTLE ChocoCookies Brownie 40x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "40",
    "ean": "7891000415306|1905.31.00|17891000415303|false",
    "imageUrl": "/uploads/produtos/12609048 - NESTLE ChocoCookies Brownie 40x100g BR.png",
    "isNew": false
  },
  {
    "code": "12609059",
    "name": "NESTLE ChocoCookies RechAvela 40x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "40",
    "ean": "7891000415313|1905.31.00|17891000415310|false",
    "imageUrl": "/uploads/produtos/12609059 - NESTLE ChocoCookies RechAvela 40x100g BR (1).png",
    "isNew": false
  },
  {
    "code": "12609061",
    "name": "NESTLE ChocoCookies Rech Choc 40x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "40",
    "ean": "7891000415283|1905.31.00|17891000415280|false",
    "imageUrl": "/uploads/produtos/12609061 - NESTLE ChocoCookies Rech Choc 40x100g BR.png",
    "isNew": false
  },
  {
    "code": "12609164",
    "name": "SERENATA DE AMOR ChocoCookies 40x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "40",
    "ean": "7891000415320|1905.31.00|17891000415327|false",
    "imageUrl": "/uploads/produtos/12609164 - SERENATA DE AMOR ChocoCookies 40x100g BR.png",
    "isNew": false
  },
  {
    "code": "12610012",
    "name": "NESCAFETRADICAO ForteSac24x40gPR10%DesBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000416228|2101.11.10|17891000416225|false",
    "imageUrl": "/uploads/produtos/12610012 - NESCAFETRADICAO ForteSac24x40gPR10%DesBR.png",
    "isNew": false
  },
  {
    "code": "12610213",
    "name": "MUCILON Ameixa e Aveia 9x600g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 600G",
    "packSize": "9",
    "ean": "7891000416525|1901.10.30|17891000416522|false",
    "imageUrl": "/uploads/produtos/12610213 - MUCILON Ameixa e Aveia 9x600g BR.png",
    "isNew": false
  },
  {
    "code": "12610403",
    "name": "MUCILON BL 5 Cereais Zero 9x600g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON ZERO",
    "packSize": "9",
    "ean": "7891000416976|1901.10.30|17891000416973|false",
    "imageUrl": "/uploads/produtos/12610403 - MUCILON BL 5 Cereais Zero 9x600g BR.png",
    "isNew": false
  },
  {
    "code": "12610745",
    "name": "NESCAFE CAPPU ProEnergy Canl4(6x270ml)BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS PROTEINADOS",
    "packSize": "24",
    "ean": "7891000417348|2202.99.00EX01|17891000417345|true",
    "imageUrl": "/uploads/produtos/12610745 - NESCAFE CAPPU ProEnergy Canl4(6x270ml)BR.png",
    "isNew": true
  },
  {
    "code": "12610767",
    "name": "NESCAFE CAPPU ClasProEnergy 4(6x270ml)BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS PROTEINADOS",
    "packSize": "24",
    "ean": "7891000417331|2202.99.00EX01|17891000417338|true",
    "imageUrl": "/uploads/produtos/12610767 - NESCAFE CAPPU ClasProEnergy 4(6x270ml)BR.png",
    "isNew": true
  },
  {
    "code": "12610829",
    "name": "NESCAFE ProEnergy Chocno 4(6x270ml) BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS PROTEINADOS",
    "packSize": "24",
    "ean": "7891000417409|2202.99.00EX01|17891000417406|true",
    "imageUrl": "/uploads/produtos/12610829 - NESCAFE ProEnergy Chocno 4(6x270ml) BR.png",
    "isNew": true
  },
  {
    "code": "12611501",
    "name": "MAGGI Tempr Grnul p/ Frango 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS GRANULADO SACHET",
    "packSize": "48",
    "ean": "7891000418277|2103.90.21|17891000418274|true",
    "imageUrl": "/uploads/produtos/12611501 - MAGGI Tempr Grnul p Frango 48(10x5g) BR.png",
    "isNew": true
  },
  {
    "code": "12611512",
    "name": "MAGGI Tempr Grnl p/ Carne 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS GRANULADO SACHET",
    "packSize": "48",
    "ean": "7891000418284|2103.90.21|17891000418281|true",
    "imageUrl": "/uploads/produtos/12611512 - MAGGI Tempr Grnl p Carne 48(10x5g) BR.png",
    "isNew": true
  },
  {
    "code": "12611772",
    "name": "KITKAT+SNF CerMat 12(210+230)g PRBpak BR",
    "brand": "CEREAIS MATINAIS",
    "category": "KIT KAT",
    "packSize": "12",
    "ean": "7891000418376|1904.10.00|17891000418373|false",
    "imageUrl": "/uploads/produtos/12611772 - KITKAT+SNF CerMat 12(210+230)g PRBpak BR.png",
    "isNew": false
  },
  {
    "code": "12612400",
    "name": "NESTLE ChocoCookies CobChoc 35x100g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOCOOKIES",
    "packSize": "35",
    "ean": "7891000419076|1905.31.00|17891000419073|false",
    "imageUrl": "/uploads/produtos/12612400 - NESTLE ChocoCookies CobChoc 35x100g BR.png",
    "isNew": false
  },
  {
    "code": "12612574",
    "name": "MAGGI Tempr Grnl p/ Legumes 48(10x5g) BR",
    "brand": "MAGGI",
    "category": "TEMPEROS GRANULADO SACHET",
    "packSize": "48",
    "ean": "7891000419601|2103.90.21|17891000419608|true",
    "imageUrl": "/uploads/produtos/12612574 - MAGGI Tempr Grnl p Legumes 48(10x5g) BR.png",
    "isNew": true
  },
  {
    "code": "12613072",
    "name": "NESTOGENO 1 Formula Infantil 6x800g N4BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NESTOGENO",
    "packSize": "6",
    "ean": "7891000062722|1901.10.90|17891000062729|false",
    "imageUrl": "/uploads/produtos/12613072 - NESTOGENO 1 Formula Infantil 6x800g N4BR.png",
    "isNew": false
  },
  {
    "code": "12613081",
    "name": "NESTOGENO 2 Formula Infantil 12x400gN4BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NESTOGENO",
    "packSize": "12",
    "ean": "7891000056615|1901.10.90|17891000056612|false",
    "imageUrl": "/uploads/produtos/12613081 - NESTOGENO 2 Formula Infantil 12x400gN4BR.png",
    "isNew": false
  },
  {
    "code": "12613109",
    "name": "NESTOGENO 2 Formula Infantil 6x800g N4BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NESTOGENO",
    "packSize": "6",
    "ean": "7891000062760|1901.10.90|17891000062767|false",
    "imageUrl": "/uploads/produtos/12613109 - NESTOGENO 2 Formula Infantil 6x800g N4BR.png",
    "isNew": false
  },
  {
    "code": "12613319",
    "name": "MAGGI FONDOR Tempero 30x120g N1 BR",
    "brand": "MAGGI",
    "category": "TEMPEROS FRASCO",
    "packSize": "30",
    "ean": "7891000502105|2103.90.21|17891000502102|false",
    "imageUrl": "/uploads/produtos/12613319 - MAGGI FONDOR Tempero 30x120g N1 BR.png",
    "isNew": false
  },
  {
    "code": "12613348",
    "name": "DOGCHOWXLfeAdltMedGdeCarFrgArz20kgN1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000350942|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613349",
    "name": "MAGGI Amaciante Car c/Tempero30x120gN1BR",
    "brand": "MAGGI",
    "category": "TEMPEROS FRASCO",
    "packSize": "30",
    "ean": "7891000502303|3507.90.49|17891000502300|false",
    "imageUrl": "/uploads/produtos/12613349 - MAGGI Amaciante Car cTempero30x120gN1BR.png",
    "isNew": false
  },
  {
    "code": "12613367",
    "name": "CHARGE Cookie Gotas Choc 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000420867|1905.31.00|17891000420864|false",
    "imageUrl": "/uploads/produtos/12613367 - CHARGE Cookie Gotas Choc 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12613375",
    "name": "NDG Gold Espresso Intsd6 10Caps 6x60g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS CAFES",
    "packSize": "6",
    "ean": "7891000420782|0901.21.00|17891000420789|false",
    "imageUrl": "/uploads/produtos/12613375 - NDG Gold Espresso Intsd6 10Caps 6x60g BR.png",
    "isNew": false
  },
  {
    "code": "12613380",
    "name": "MAGGI GRIL Tempero 30x120g BR",
    "brand": "MAGGI",
    "category": "TEMPEROS FRASCO",
    "packSize": "30",
    "ean": "7891000502204|2103.90.21|17891000502201|false",
    "imageUrl": "/uploads/produtos/12613380 - MAGGI GRIL Tempero 30x120g BR.jpg",
    "isNew": false
  },
  {
    "code": "12613546",
    "name": "DOGCHOWXLfeAdltMedioGdeCarFrgArz15kgN1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116715|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12613546.jpg",
    "isNew": false
  },
  {
    "code": "12613548",
    "name": "DOGCHOWXLfeAdltMnPeqCarFrgArz10,1kgN1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000350560|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613559",
    "name": "DOGCHOW ExtraLife 7+ CarFrgArz 15kg N1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000247518|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613570",
    "name": "DOGCHOWXLfeAdltMnPeqCarFrgArz20kgN1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000350973|2309.10.00||false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613573",
    "name": "DOGCHOWXLfeAdltMnPeqCarFrgArz15kgN1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116487|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12613573.jpeg",
    "isNew": false
  },
  {
    "code": "12614177",
    "name": "NESTLE Chocotrio Avela 4(12x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CHOCOTRIO NESTLE",
    "packSize": "12",
    "ean": "7891000422083|1806.31.10|17891000422080|false",
    "imageUrl": "/uploads/produtos/12614177 - NESTLE Chocotrio Avela 4(12x90g) BR.png",
    "isNew": false
  },
  {
    "code": "12615562",
    "name": "NDG ESPRESSO Kopenhagen 10Caps 6x60g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS CAFES",
    "packSize": "6",
    "ean": "7891000423431|0901.21.00|17891000423438|false",
    "imageUrl": "/uploads/produtos/12615562 - NDG ESPRESSO Kopenhagen 10Caps 6x60g BR.png",
    "isNew": false
  },
  {
    "code": "12615567",
    "name": "NDG CAPPUCCINO Kopng 10Caps 6x135g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS BEBIDAS",
    "packSize": "6",
    "ean": "7891000423615|2101.12.00|17891000423612|false",
    "imageUrl": "/uploads/produtos/12615567 - NDG CAPPUCCINO Kopng 10Caps 6x135g BR.png",
    "isNew": false
  },
  {
    "code": "12615709",
    "name": "KIT KAT Cereal Mat Sachet 12(16x25g) BR",
    "brand": "CEREAIS MATINAIS",
    "category": "KIT KAT",
    "packSize": "192",
    "ean": "7891000423806|1904.10.00|17891000423803|false",
    "imageUrl": "/uploads/produtos/12615709 - KIT KAT Cereal Mat Sachet 12(16x25g) BR (3).png",
    "isNew": false
  },
  {
    "code": "12615841",
    "name": "MAGGI Caldo Picanha Tablete 100x114g BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000424254|2104.10.11|17891000424251|false",
    "imageUrl": "/uploads/produtos/12615841 - MAGGI Caldo Picanha Tablete 100x114g BR.png",
    "isNew": false
  },
  {
    "code": "12616029",
    "name": "TOSTINES Espec Bisc Rech Cappu 66x93g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "66",
    "ean": "7891000424834|1905.31.00|17891000424831|true",
    "imageUrl": "/uploads/produtos/12616029 - TOSTINES Espec Bisc Rech Cappu 66x93g BR.png",
    "isNew": true
  },
  {
    "code": "12616589",
    "name": "NESTLE Aveia Proteinada 24x160g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS PREMIUM",
    "packSize": "24",
    "ean": "7891000425657|1904.20.00|17891000425654|false",
    "imageUrl": "/uploads/produtos/12616589 - NESTLE Aveia Proteinada 24x160g BR.png",
    "isNew": false
  },
  {
    "code": "12616626",
    "name": "NESC Chapada Torr Mdo Sachet 12x250g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "TORRADO E MOIDO PREMIUM",
    "packSize": "12",
    "ean": "7891000425626|0901.21.00|17891000425623|false",
    "imageUrl": "/uploads/produtos/12616626 - NESC Chapada Torr Mdo Sachet 12x250g BR.png",
    "isNew": false
  },
  {
    "code": "12618462",
    "name": "SNOW FLAKES CerMat Frutas 24x240g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW ATE 300G",
    "packSize": "24",
    "ean": "7891000427910|1904.10.00|17891000427917|false",
    "imageUrl": "/uploads/produtos/12618462 - SNOW FLAKES CerMat Frutas 24x240g BR.png",
    "isNew": false
  },
  {
    "code": "12618976",
    "name": "KIT KAT Rech&Cob Chocolate 12x330g BR",
    "brand": "LEITES CULINARIOS",
    "category": "SPREADS",
    "packSize": "12",
    "ean": "7891000432143|1806.90.00|17891000432140|true",
    "imageUrl": "/uploads/produtos/12618976 - KIT KAT Rech&Cob Chocolate 12x330g BR.png",
    "isNew": true
  },
  {
    "code": "12620125",
    "name": "NINHO CmptoLact Fibras Lata 24x380g BR",
    "brand": "NINHO",
    "category": "NINHO FORTI+",
    "packSize": "24",
    "ean": "7891000432402|1901.90.90|17891000432409|false",
    "imageUrl": "/uploads/produtos/12620125 - NINHO CmptoLact Fibras Lata 24x380g BR.png",
    "isNew": false
  },
  {
    "code": "12623003",
    "name": "KIT KAT 4Fngr Churros 4(24x41,5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000433843|1905.32.00|17891000433840|true",
    "imageUrl": "/uploads/produtos/12623003 - KIT KAT 4Fngr Churros 4(24x41,5g) BR.png",
    "isNew": true
  },
  {
    "code": "12624035",
    "name": "DOGCHOW XLfeAdlt MnPeq CarFrgArz8x900gBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "8",
    "ean": "7891000434796|2309.10.00|17891000434793|false",
    "imageUrl": "/uploads/produtos/12624035.jpeg",
    "isNew": false
  },
  {
    "code": "12624062",
    "name": "DOGCHOW XLfeAdlt MdGd CarFrgArz 8x900gBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "8",
    "ean": "7891000434802|2309.10.00|17891000434809|false",
    "imageUrl": "/uploads/produtos/12624062.jpeg",
    "isNew": false
  },
  {
    "code": "12624098",
    "name": "TOSTINES Cookie Especiarias 52x60g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COOKIES",
    "packSize": "52",
    "ean": "7891000434925|1905.31.00|17891000434922|false",
    "imageUrl": "/uploads/produtos/12624098 - TOSTINES Cookie Especiarias 52x60g BR.png",
    "isNew": false
  },
  {
    "code": "12624122",
    "name": "NDG CHOCOCINO Nestle 10Caps6x150gBR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "BEBIDAS CHOCOS",
    "packSize": "6",
    "ean": "7891000434482|1806.90.00EX01|17891000434489|false",
    "imageUrl": "/uploads/produtos/12624122 - NDG CHOCOCINO Nestle 10Caps6x150gBR.png",
    "isNew": false
  },
  {
    "code": "12624153",
    "name": "DOGCHOW XLfeAdltMedGdeCarFrgArz6x2,5kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000435106|2309.10.00|17891000435103|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12624229",
    "name": "DOGCHOW XLfeAdltMnPeq CarFrgArz6x2,5kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "6",
    "ean": "7891000435151|2309.10.00|17891000435158|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12624355",
    "name": "NESTLE Tab Rech Negresco 4(14x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS RECHEADOS NESTLE",
    "packSize": "14",
    "ean": "7891000435267|1806.31.10|17891000435264|true",
    "imageUrl": "/uploads/produtos/12624355 - NESTLE Tab Rech Negresco 4(14x90g) BR.png",
    "isNew": true
  },
  {
    "code": "12624593",
    "name": "PRESTIGIO Tablete Recheado 4(14x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS RECHEADOS NESTLE",
    "packSize": "14",
    "ean": "7891000435458|1806.31.10|17891000435455|true",
    "imageUrl": "/uploads/produtos/12624593 - PRESTIGIO Tablete Recheado 4(14x90g) BR.png",
    "isNew": true
  },
  {
    "code": "12625382",
    "name": "TOSTINES Bisc Espec Gengibre 54x150g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS PLENOS DOCES TOSTINES",
    "packSize": "54",
    "ean": "7891000436110|1905.31.00|17891000436117|true",
    "imageUrl": "/uploads/produtos/12625382 - TOSTINES Bisc Espec Gengibre 54x150g BR.png",
    "isNew": true
  },
  {
    "code": "12625733",
    "name": "NESCAFEGOLD Intsd5SacLiofilizado24x40gBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM SACHET",
    "packSize": "24",
    "ean": "7891000436349|2101.11.10|17891000436346|false",
    "imageUrl": "/uploads/produtos/12625733 - NESCAFEGOLD Intsd5SacLiofilizado24x40gBR.png",
    "isNew": false
  },
  {
    "code": "12627332",
    "name": "NUTRENPrtn15g PpbBaun4(6x260ml)PRLMPMBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "4",
    "ean": "7891000437810|2202.99.00|17891000437817|false",
    "imageUrl": "/uploads/produtos/12627332 - NUTRENPrtn15g PpbBaun4(6x260ml)PRLMPMBR.png",
    "isNew": false
  },
  {
    "code": "12627341",
    "name": "NUTRENPrtn15g PpbChoc4(6x260ml)PRLMPMBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "4",
    "ean": "7891000437759|2202.99.00EX01|17891000437756|false",
    "imageUrl": "/uploads/produtos/12627341 - NUTRENPrtn15g PpbChoc4(6x260ml)PRLMPMBR.png",
    "isNew": false
  },
  {
    "code": "12627358",
    "name": "TALENTO CstnCajuParaAmendoim 8(15x75g)BR",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "15",
    "ean": "7891000392805|1806.32.10|17891000392826|true",
    "imageUrl": "/uploads/produtos/12627358 - TALENTO CstnCajuParaAmendoim 8(15x75g)BR.png",
    "isNew": true
  },
  {
    "code": "12628857",
    "name": "NUTREN Prtn15gRTDChocoWafer 4(6x260ml)BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000440483|2202.99.00EX01|17891000440480|true",
    "imageUrl": "/uploads/produtos/12628857 - NUTREN Prtn15gRTDChocoWafer 4(6x260ml)BR.png",
    "isNew": true
  },
  {
    "code": "12629594",
    "name": "NESTLE Chocopretzel ao Leite 40x80g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COBERTOS",
    "packSize": "40",
    "ean": "7891000441046|1905.31.00|17891000441043|false",
    "imageUrl": "/uploads/produtos/12629594 - NESTLE Chocopretzel ao Leite 40x80g BR.png",
    "isNew": false
  },
  {
    "code": "12629924",
    "name": "NESCAU Achoc Po Protn Cilindro 36x330gBR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU ESPECIAIS",
    "packSize": "36",
    "ean": "7891000441312|1806.90.00|17891000441319|false",
    "imageUrl": "/uploads/produtos/12629924 - NESCAU Achoc Po Protn Cilindro 36x330gBR.png",
    "isNew": false
  },
  {
    "code": "12630217",
    "name": "GAROTO Chocopretzel ao Leite 40x80g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS COBERTOS",
    "packSize": "40",
    "ean": "7891000441831|1905.31.00|17891000441838|false",
    "imageUrl": "/uploads/produtos/12630217 - GAROTO Chocopretzel ao Leite 40x80g BR.png",
    "isNew": false
  },
  {
    "code": "12631039",
    "name": "CHARGE Tablete Recheado 4(14x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS RECHEADOS NESTLE",
    "packSize": "14",
    "ean": "7891000442265|1806.31.10|17891000442262|true",
    "imageUrl": "/uploads/produtos/12631039 - CHARGE Tablete Recheado 4(14x90g) BR.png",
    "isNew": true
  },
  {
    "code": "12655014",
    "name": "DCHOW XLfeLactFilhMnPeqCarFrgArz8x900gBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "8",
    "ean": "7891000442838|2309.10.00|17891000442835|false",
    "imageUrl": "/uploads/produtos/12655014.jpeg",
    "isNew": false
  },
  {
    "code": "12655184",
    "name": "DCHOWXLfeLactFilhMedGdeCarFrgArz8x900gBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "8",
    "ean": "7891000442845|2309.10.00|17891000442842|false",
    "imageUrl": "/uploads/produtos/12655184.jpeg",
    "isNew": false
  },
  {
    "code": "12664895",
    "name": "KITKAT 2Fngr Leite Bag 10x417,6gPRLMPMBR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 2 FINGERS",
    "packSize": "10",
    "ean": "7891000443071|1905.32.00|17891000443078|false",
    "imageUrl": "/uploads/produtos/12664895 - KITKAT 2Fngr Leite Bag 10x417,6gPRLMPMBR.png",
    "isNew": false
  },
  {
    "code": "12799262",
    "name": "NUTREN ACTIVE Baun 12x400g PRL400P340gBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN ACTIVE",
    "packSize": "12",
    "ean": "7891000443422|1901.90.90|17891000443429|true",
    "imageUrl": "/uploads/produtos/12799262 - NUTREN ACTIVE Baun 12x400g PRL400P340gBR.png",
    "isNew": true
  },
  {
    "code": "12804629",
    "name": "NUTREN KIDS Choc 12x350g PRL350P300g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN KIDS",
    "packSize": "12",
    "ean": "7891000443538|2106.90.30|17891000443535|false",
    "imageUrl": "/uploads/produtos/12804629 - NUTREN KIDS Choc 12x350g PRL350P300g BR.png",
    "isNew": false
  },
  {
    "code": "13069775",
    "name": "NINHO 1+ PBIO1 Fases Lepo 24x400g N5 BR",
    "brand": "NINHO FASES",
    "category": "NINHO FASES",
    "packSize": "24",
    "ean": "7891000001080|1901.10.90|17891000001087|true",
    "imageUrl": "/uploads/produtos/13069775 - NINHO 1+ PBIO1 Fases Lepo 24x400g N5 BR.jpg",
    "isNew": true
  },
  {
    "code": "13320068",
    "name": "NUTREN SENIOR Po 24x370g PRL370gP330g BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "24",
    "ean": "7891000446720|1901.90.90|17891000446727|false",
    "imageUrl": "/uploads/produtos/13320068 - NUTREN SENIOR Po 24x370g PRL370gP330g BR.png",
    "isNew": false
  },
  {
    "code": "13383314",
    "name": "NESCAU Cookie Cereal Matinal 20x180g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU ATE 300G",
    "packSize": "20",
    "ean": "7891000447277|1904.10.00|17891000447274|true",
    "imageUrl": "/uploads/produtos/13383314.jpg",
    "isNew": true
  },
  {
    "code": "13389256",
    "name": "NESTLE Chocotrio aoLeite ST 4(12x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CHOCOTRIO NESTLE",
    "packSize": "12",
    "ean": "7891000377543|1806.31.10|17891000377571|false",
    "imageUrl": "/uploads/produtos/13389256 - NESTLE Chocotrio aoLeite ST 4(12x90g) BR (1).png",
    "isNew": false
  },
  {
    "code": "13463462",
    "name": "NESCAU Cookie Cereal Matinal 20x80g BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU ATE 300G",
    "packSize": "20",
    "ean": "7891000449486|1904.10.00|17891000449483|true",
    "imageUrl": "/uploads/produtos/13463462.jpg",
    "isNew": true
  },
  {
    "code": "13466600",
    "name": "NESCAFE ICE 24x40g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "DEMAIS NESCAFE",
    "packSize": "24",
    "ean": "7891000449608|2101.11.10|17891000449605|true",
    "imageUrl": "/uploads/produtos/13466600.jpg",
    "isNew": true
  },
  {
    "code": "13522061",
    "name": "BONO Biscoito Recheado Choc 66x90g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "66",
    "ean": "7891000376843|1905.31.00|17891000376857|false",
    "imageUrl": "/uploads/produtos/13522061 - BONO Biscoito Recheado Choc 66x90g N1 BR.png",
    "isNew": false
  },
  {
    "code": "13528301",
    "name": "NEGRESCO Biscoito Rech Mrg 66x90g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000376805|1905.31.00|17891000376819|true",
    "imageUrl": "/uploads/produtos/13528301 - NEGRESCO Biscoito Rech Mrg 66x90g N1 BR.png",
    "isNew": true
  },
  {
    "code": "13528866",
    "name": "NEGRESCO Bisc Rech Choc 66x90g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000377130|1905.31.00|17891000377144|true",
    "imageUrl": "/uploads/produtos/13528866 - NEGRESCO Bisc Rech Choc 66x90g N1 BR.png",
    "isNew": true
  },
  {
    "code": "13528867",
    "name": "NEGRESCO Biscoito Recheado 66x90g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000376768|1905.31.00|17891000376772|true",
    "imageUrl": "/uploads/produtos/13528867 - NEGRESCO Biscoito Recheado 66x90g N1 BR.png",
    "isNew": true
  },
  {
    "code": "13597100",
    "name": "NEGRES Nevado Recheado Baun 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000451656|1905.31.00|17891000451653|true",
    "imageUrl": "/uploads/produtos/13597100 - NEGRES Nevado Recheado Baun 66x90g BR.png",
    "isNew": true
  },
  {
    "code": "13597926",
    "name": "NEGRES Nevado Recheado Morango 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000451786|1905.31.00|17891000451783|true",
    "imageUrl": "/uploads/produtos/13597926 - NEGRES Nevado Recheado Morango 66x90g BR.png",
    "isNew": true
  },
  {
    "code": "13720753",
    "name": "SNWFLAKE CerMat 24x230g PR15%Grts BR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW ATE 300G",
    "packSize": "24",
    "ean": "7891000453414|1904.10.00|17891000453411|false",
    "imageUrl": "/uploads/produtos/13720753 - SNWFLAKE CerMat 24x230g PR15%Grts BR.png",
    "isNew": false
  },
  {
    "code": "13926876",
    "name": "NEST Chocobiscuit Choc Branco 30x78g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS CHOCOBISCUIT",
    "packSize": "30",
    "ean": "7891000456941|1905.31.00|17891000456948|true",
    "imageUrl": "/uploads/produtos/13926876 - NEST Chocobiscuit Choc Branco 30x78g BR.png",
    "isNew": true
  },
  {
    "code": "13945245",
    "name": "GRT Bombons Sortidos Caixa 30x220g BR",
    "brand": "GAROTO",
    "category": "CAIXAS GAROTO",
    "packSize": "30",
    "ean": "7891000457092|1806.90.00|17891000457099|true",
    "imageUrl": "/uploads/produtos/13945245 - GRT Bombons Sortidos Caixa 30x220g BR.png",
    "isNew": true
  },
  {
    "code": "13982513",
    "name": "PSTMP Bisc Rech Choc 70x130g PR10%GrtsBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "70",
    "ean": "7891000457368|1905.31.00|17891000457365|false",
    "imageUrl": "/uploads/produtos/13982513 - PSTMP Bisc Rech Choc 70x130g PR10%GrtsBR.png",
    "isNew": false
  },
  {
    "code": "14024359",
    "name": "KK 4Fngr Latte Macchiato 4(24x41,5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000457641|1905.32.00|17891000457648|true",
    "imageUrl": "/uploads/produtos/14024359.jpg",
    "isNew": true
  },
  {
    "code": "6221211",
    "name": "SBUX GUAT SO SRP 12x52g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "7613287855282|0901.21.00|7613287855664|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "6222911",
    "name": "SBUX HSBLD SRP 12x52g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291363656|0901.21.00|8445291362994|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "6223311",
    "name": "SBUX RIST SHOT SRP 12x57g B11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "STARBUCKS CAPS NESPRESSO",
    "packSize": "12",
    "ean": "8445291451193|0901.21.00|8445291452015|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "6681411",
    "name": "NESC AFRICAS BP18 7x79.2g R11",
    "brand": "COMPATIVEIS NESPRESSO",
    "category": "NESCAFE CAPS NESPRESSO",
    "packSize": "7",
    "ean": "8445291146686|0901.21.00|8445291146679|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "11320349",
    "name": "GAROTO Cobertura Choc AoLeite 20x500g XW",
    "brand": "GAROTO",
    "category": "COBERTURAS GAROTO",
    "packSize": "20",
    "ean": "7891008349023|1806.32.10|27891008349034|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "11320351",
    "name": "GAROTO Cobert Choc MeioAmargo 20x500g XW",
    "brand": "GAROTO",
    "category": "COBERTURAS GAROTO",
    "packSize": "20",
    "ean": "7891008351026|1806.32.10|27891008351037|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12350191",
    "name": "PRESTIGIO Branco Chocolate 18(30x33)g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000251133|1704.90.10|7891000251157|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12351271",
    "name": "MAGGI Caldo Galinha 76x152g PRL16P14 BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "76",
    "ean": "7891000251577|2104.10.11|17891000251574|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12351876",
    "name": "MAGGI Caldo de Carne 76x152g PRL16P14 BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "76",
    "ean": "7891000251928|2104.10.11|17891000251925|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12438998",
    "name": "MAGGI Crm Cebola Bacon 12(12x61g) BR",
    "brand": "MAGGI",
    "category": "DEMAIS SOPAS",
    "packSize": "12",
    "ean": "7891000304020|2104.10.11|7891000304044|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12453877",
    "name": "MUCILON Arroz Sachet 12x180g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000319628|1901.10.30|7891000319635|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12454356",
    "name": "SNOW FLAKESCerMat10x620gPRBPGrtsTigelaBR",
    "brand": "CEREAIS MATINAIS",
    "category": "SNOW 300G+",
    "packSize": "10",
    "ean": "7891000320341|1904.10.00|7891000320327|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12458949",
    "name": "GAROTO CaixaBombonsSortidos30x250g N1 BR",
    "brand": "GAROTO",
    "category": "CAIXAS GAROTO",
    "packSize": "30",
    "ean": "7891008116632|1806.90.00|17891008116646|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12460205",
    "name": "GAROTO Pastilha Mentol 24(40x17g) XW",
    "brand": "GAROTO",
    "category": "PASTILHAS",
    "packSize": "40",
    "ean": "7891008116779|1704.90.20|17891008116790|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12475961",
    "name": "NUTREN SENIOR Cafe com Leite 24x370gBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "24",
    "ean": "7891000120606|1901.90.90|7891000343302|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12492220",
    "name": "TALENTO Tab Rech Maracuja 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008121926|1806.31.10|17891008121947|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12505778",
    "name": "MOCA Lei Cond Semi Desn 27x395g PRCx BR",
    "brand": "LEITES CULINARIOS",
    "category": "MOCA CAIXINHA",
    "packSize": "27",
    "ean": "7891000356135|0402.99.00|17891000356149|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12510108",
    "name": "MUCILON Multicereais Sachet 9x360g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 360G",
    "packSize": "9",
    "ean": "7891000356890|1901.10.30|17891000356903|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12512137",
    "name": "TALENTO Tab Rech Holandesa 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008123418|1806.31.10|17891008123446|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12512370",
    "name": "TALENTO Tab Rech Tiramisu 8(12x85g) XW",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "12",
    "ean": "7891008123463|1806.31.10|17891008123491|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12519868",
    "name": "FRISKIES Megamix Adulto 10,1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000364154|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12623819 - FRISKIES Megamix 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12519873",
    "name": "FRISKIES Mix Carne Castrados 10,1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000363973|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12320782 - MAGGI Caldo de Carne NPro 6x1,01kg BR.png",
    "isNew": false
  },
  {
    "code": "12520225",
    "name": "FRISKIES Mar de Sabores 20kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116814|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12623520 - FRISKIES Mar de Sabores 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12520226",
    "name": "FRISKIES Mix Carne Adulto 20kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000116807|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12623506 - FRISKIES Mix de Carnes 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12521771",
    "name": "FRISKIES Megamix Castrado 10,1kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000292150|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12623819 - FRISKIES Megamix 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12524586",
    "name": "GAROTO Crocante Chocolate 18(30x25g) BR",
    "brand": "GAROTO",
    "category": "CANDY BARS GAROTO",
    "packSize": "30",
    "ean": "7891008124583|1806.31.20|17891008124603|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526259",
    "name": "MUCILON Arz Ava 12x180g PRL180P160 BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000368145|1901.10.30|17891000368159|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526285",
    "name": "MUCILON Multrs 12x180g PRL180P160 BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 180G",
    "packSize": "12",
    "ean": "7891000368183|1901.10.30|17891000368197|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526305",
    "name": "PRESTIGIO Maxi Chocolate 4(12x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "12",
    "ean": "7891000370087|1806.31.20|17891000370114|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12526838",
    "name": "MAGGI Caldo Carne 100x114g PRL12P10 N1BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000251591|2104.10.11|7891000251607|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12527323",
    "name": "MUCILON SNACKS Morango & Bna 15x35g BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "15",
    "ean": "7891000369159|1905.90.20|17891000369163|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12538266",
    "name": "MAGGI CaldoGalinha 100x114g PRL12P10N1BR",
    "brand": "MAGGI",
    "category": "CALDOS TABLETE",
    "packSize": "100",
    "ean": "7891000251614|2104.10.11|7891000251621|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12549142",
    "name": "NESLAC Comfor 3+ CmptoLact 6x800g BR",
    "brand": "LEITES DE CRESCIMENTO",
    "category": "NESLAC COMFOR",
    "packSize": "6",
    "ean": "7891000106099|1901.10.10|7891000106105|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12550648",
    "name": "NEGRESCO Biscoito Recheado Choc 66x90gBR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS NEGRESCO",
    "packSize": "66",
    "ean": "7891000377130|1905.31.00|17891000377144|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12558277",
    "name": "NESTLE Aveia Flocos 18x450g BR",
    "brand": "CEREAIS FAMILIA",
    "category": "NESTLE AVEIAS",
    "packSize": "18",
    "ean": "7891000380994|1104.12.00|17891000381004|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12561840",
    "name": "NESCAFE DOLCA Sachet 24x40g N1 BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000383421|2101.12.00|17891000383435|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12575945",
    "name": "DOG CHOW Oral Medio e Grande 12x200g BR",
    "brand": "ORAL CARE",
    "category": "DOG CHOW ORAL SNACKS",
    "packSize": "12",
    "ean": "7891000391570|2309.10.00|17891000391584|false",
    "imageUrl": "/uploads/produtos/12575945.png",
    "isNew": false
  },
  {
    "code": "12576834",
    "name": "NANLAC COMFOR HMO FI 1+ 6x800g BR",
    "brand": "LEITES DE CRESCIMENTO",
    "category": "NANLAC COMFOR",
    "packSize": "6",
    "ean": "7891000097649|1901.10.90|7891000097656|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12577859",
    "name": "TALENTO Amendoa Amendoim Avl 8(15x75g)BR",
    "brand": "GAROTO",
    "category": "JUMBOS TALENTO",
    "packSize": "15",
    "ean": "7891000393475|1806.32.10|17891000393335|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12581702",
    "name": "GAROTO Choco Trio Bono Mrg 4(12x90g) BR",
    "brand": "GAROTO",
    "category": "CHOCOTRIO GAROTO",
    "packSize": "12",
    "ean": "7891000395509|1806.31.10|17891000395537|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12588590",
    "name": "NINHOLepoIntegrInstSac12x750gPR50gGrtsBR",
    "brand": "NINHO",
    "category": "NINHO INSTANTANEO SACHET",
    "packSize": "12",
    "ean": "7891000399552|0402.21.10|17891000399559|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12590487",
    "name": "NINHO Lepo Integral 24x380gPR10%DscBR",
    "brand": "NINHO",
    "category": "NINHO INTEGRAL LATA",
    "packSize": "24",
    "ean": "7891000340981|0402.21.10|17891000340988|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12590502",
    "name": "NINHO Lepo Integral Sac12x750gPR50gBR",
    "brand": "NINHO",
    "category": "NINHO INTEGRAL SACHET",
    "packSize": "12",
    "ean": "7891000342176|0402.21.10|17891000342173|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12601967",
    "name": "FRISKIES Petiscos Salmao 15x80g BR",
    "brand": "SNACKS",
    "category": "FRISKIES TREATS",
    "packSize": "15",
    "ean": "7891000409930|2309.10.00|17891000409937|false",
    "imageUrl": "/uploads/produtos/12623506 - FRISKIES Mix de Carnes 15x80g BR.jpeg",
    "isNew": false
  },
  {
    "code": "12609999",
    "name": "NESCAFEORIGINALXForteSac24x40gPR10%DesBR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "NESCAFE 40G",
    "packSize": "24",
    "ean": "7891000416266|2101.11.10|17891000416263|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613132",
    "name": "NESTOGENO 1 Formula Infantil 12x400gN4BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NESTOGENO",
    "packSize": "12",
    "ean": "7891000056523|1901.10.90|17891000056520|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613138",
    "name": "NESCAFE GOLD Signature Jar 6x100g N4 BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM DEMAIS",
    "packSize": "6",
    "ean": "7613037064643|2101.11.10|7613037064650|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613556",
    "name": "DOGCHOWXLfeAdltMedGdeCarFrgArz10,1kgN1BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY LARGE BAGS",
    "packSize": "1",
    "ean": "7891000350621|2309.10.00||false",
    "imageUrl": "/uploads/produtos/12613556.png",
    "isNew": false
  },
  {
    "code": "12615198",
    "name": "NESCAFE GOLD INTENSO Sgnt Jar 6x100g BR",
    "brand": "NESCAFE SOLUVEL + T&M",
    "category": "SOLUVEL PREMIUM DEMAIS",
    "packSize": "6",
    "ean": "8445291748590|2101.11.10|8445291748583|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12616031",
    "name": "DOG CHOW Adulto TriploProt Pc 15x85g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000424841|2309.10.00|17891000424848|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12616032",
    "name": "DOG CHOW Adulto TriploProt Slm 15x85gBR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000424896|2309.10.00|17891000424893|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12616033",
    "name": "DOG CHOW Adulto MultiProteina 15x85g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000424957|2309.10.00|17891000424954|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12616042",
    "name": "DOG CHOW Adulto Cordeiro&Arroz 15x85g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000424964|2309.10.00|17891000424961|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12616045",
    "name": "DOG CHOW Filhote Carne&Leite 15x85g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000424988|2309.10.00|17891000424985|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12616996",
    "name": "DOG CHOW Adulto Frango & Arroz 15x85g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000426098|2309.10.00|17891000426095|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12617000",
    "name": "NESCAU Achoc Sachet 12x550g PR50gGrts BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU SACHET ATE 600G",
    "packSize": "12",
    "ean": "7891000426067|1806.90.00EX01|17891000426064|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12617012",
    "name": "NESCAU Achoc Sachet 12x900g PR90gGrts BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU SACHET 900G+",
    "packSize": "12",
    "ean": "7891000426074|1806.90.00EX01|17891000426071|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12617019",
    "name": "DOG CHOW Adulto Carne & Arroz 15x85g BR",
    "brand": "WET",
    "category": "DOG CHOW WET POUCH",
    "packSize": "15",
    "ean": "7891000426081|2309.10.00|17891000426088|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12617495",
    "name": "FANCY FEAST Supremo Carne 15x75g XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000426784|2309.10.00|17891000426781|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12620119",
    "name": "NINHO Cmpto Lact Lata 24x380gPR10%Dsc BR",
    "brand": "NINHO",
    "category": "NINHO FORTI+",
    "packSize": "24",
    "ean": "7891000432396|1901.90.90|17891000432393|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12621147",
    "name": "FANCY FEAST CassAtum&Salmao 15x85g N2 XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000296196|2309.10.00|17891000368357|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12621148",
    "name": "FANCY FEAST Demi Glace Frango 15x85gN2XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000295793|2309.10.00|17891000368692|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12621896",
    "name": "FANCY FEAST Petit Filet Salmao15x85gN2XI",
    "brand": "WET",
    "category": "FANCY FEAST WET POUCH",
    "packSize": "15",
    "ean": "7891000296158|2309.10.00|17891000368517|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12622761",
    "name": "NAN COMFOR 0-6Meses HMO 6x800g N1 BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NAN COMFOR",
    "packSize": "6",
    "ean": "7891000071625|1901.10.90|17891000071622|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12622772",
    "name": "NAN COMFOR 0-6Meses HMO 12x400g N1 BR",
    "brand": "FORMULAS INFANTIS",
    "category": "FAMILIA NAN COMFOR",
    "packSize": "12",
    "ean": "7891000065389|1901.10.90|17891000065386|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12623506",
    "name": "FRISKIES Mix de Carnes 15x80g BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000434345|2309.10.00|17891000434342|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12623520",
    "name": "FRISKIES Mar de Sabores 15x80g BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000434352|2309.10.00|17891000434359|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12623819",
    "name": "FRISKIES Megamix 15x80g BR",
    "brand": "WET",
    "category": "FRISKIES WET POUCH",
    "packSize": "15",
    "ean": "7891000434611|2309.10.00|17891000434618|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12624063",
    "name": "DOGCHOW ExtraLife 7+ CarFrgArz 8x900g BR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "8",
    "ean": "7891000434819|2309.10.00|17891000434816|false",
    "imageUrl": "/uploads/produtos/12624063.jpeg",
    "isNew": false
  },
  {
    "code": "12627469",
    "name": "MUCILON MltrsSac 9x600g PRL600P500 BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 600G",
    "packSize": "9",
    "ean": "7891000438466|1901.10.30|17891000438463|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12627478",
    "name": "MUCILON ArzAva Sac 9x600g PRL600P500 BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SACHET 600G",
    "packSize": "9",
    "ean": "7891000438107|1901.10.30|17891000438104|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12628280",
    "name": "NINHO 1+ PREBIO 1 Fases Lepo 6x800g N4BR",
    "brand": "NINHO FASES",
    "category": "NINHO FASES",
    "packSize": "6",
    "ean": "7891000062661|1901.10.90|17891000062668|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "12629983",
    "name": "MUCILON Arroz Lata Lito 18x400g N1 BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON TRAD LATA",
    "packSize": "18",
    "ean": "7891000011287|1901.10.30|17891000011284|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12655183",
    "name": "DCHOWXLfeLactFilhMnPeqCarFrgArz7x2,5kgBR",
    "brand": "PREMIUM DRY DOG",
    "category": "DOG CHOW DRY SMALL BAGS",
    "packSize": "7",
    "ean": "7891000442852|2309.10.00|27891000442856|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12805884",
    "name": "NESCAFE com Leite 12x300g N1 BR",
    "brand": "Produto Sem Grupo",
    "category": "Prod.s/grupo/familia",
    "packSize": "12",
    "ean": "7891000443613|2101.12.00|17891000443610|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12997472",
    "name": "NINHO1+PREBIO1FasesLata3x1,6kgPR20%N2BR",
    "brand": "NINHO FASES",
    "category": "NINHO FASES",
    "packSize": "3",
    "ean": "7891000282236|1901.10.90|17891000282233|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13129259",
    "name": "NINHO 3+ PBIO3 Fases Lepo 6x800g N1 BR",
    "brand": "NINHO FASES",
    "category": "NINHO FASES OUTROS",
    "packSize": "6",
    "ean": "7891000282809|1901.90.90|17891000282806|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13389250",
    "name": "NESTON Bebida Lactea Ppb 27x180ml BR",
    "brand": "RTD KIDS",
    "category": "RTD KIDS ESPECIAIS",
    "packSize": "27",
    "ean": "7891000447345|2202.99.00|17891000447342|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13392666",
    "name": "FRISKIES Mix Carne Castrados 7x2,5kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "PREMIUM DRY CAT",
    "packSize": "7",
    "ean": "7891000447796|2309.10.00|17891000447793|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13392667",
    "name": "FRISKIES Megamix Castrado 7x2,5kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "7",
    "ean": "7891000447802|2309.10.00|17891000447809|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13392668",
    "name": "FRISKIES Megamix Adulto 7x2,5kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "7",
    "ean": "7891000447819|2309.10.00|17891000447816|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13392684",
    "name": "FRISKIES Delicias daGranja Frg 7x2,5kgBR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "7",
    "ean": "7891000447772|2309.10.00|17891000447779|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13392701",
    "name": "FRISKIES Mar de Sabores 7x2,5kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "7",
    "ean": "7891000447789|2309.10.00|17891000447786|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13400567",
    "name": "FRISKIES Mix Carne Adulto 7x2,5kg BR",
    "brand": "PREMIUM DRY CAT",
    "category": "PREMIUM DRY CAT",
    "packSize": "7",
    "ean": "7891000447840|2309.10.00|17891000447847|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13563758",
    "name": "NTRN Prtn 15g Ppb VitFrutas 4(6x260ml)BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000451014|2202.99.00|17891000451011|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13612736",
    "name": "BONO Mini Biscoito Rech Mrg 60x24g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "60",
    "ean": "7891000452158|1905.31.00|17891000452155|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13612737",
    "name": "BONO Mini Biscoito Rech Choc 60x24g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS BONO",
    "packSize": "60",
    "ean": "7891000452165|1905.31.00|17891000452162|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13680781",
    "name": "NTRN Protein15gRTD ColagChoc4(6x260ml)BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000452912|2202.99.00EX01|17891000452919|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13720732",
    "name": "SPRSA Biscoito Recheado 70x130g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "70",
    "ean": "7891000453407|1905.31.00|17891000453404|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13720757",
    "name": "NCU Cereal Matinal 24x210g PR15%Grts BR",
    "brand": "CEREAIS MATINAIS",
    "category": "NESCAU ATE 300G",
    "packSize": "24",
    "ean": "7891000453421|1904.10.00|17891000453428|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13754078",
    "name": "FRSK Filhotes Frango 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454152|2309.10.00|17891000454159|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13754108",
    "name": "FRSK Mar de Sabores 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454145|2309.10.00|17891000454142|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13759759",
    "name": "FRSK Delicias da Granja Frango 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454169|2309.10.00|17891000454166|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13760030",
    "name": "FRSK Megamix Adulto 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454176|2309.10.00|17891000454173|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13760031",
    "name": "FRSK Megamix Castrados 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454183|2309.10.00|17891000454180|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13760032",
    "name": "FRSK Mix Carne Adulto 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454206|2309.10.00|17891000454203|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13760063",
    "name": "NEST ChocoTrio Cappuccino 4(12x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CHOCOTRIO NESTLE",
    "packSize": "12",
    "ean": "7891000454213|1806.31.10|17891000454210|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13799711",
    "name": "MAG Tempero Sabor Manteiga 30x110g BR",
    "brand": "MAGGI",
    "category": "TEMPEROS FRASCO",
    "packSize": "30",
    "ean": "7891000454695|2103.90.21|17891000454692|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13800870",
    "name": "MAG Tempero Lemmon Pepper 30x110g BR",
    "brand": "MAGGI",
    "category": "TEMPEROS FRASCO",
    "packSize": "30",
    "ean": "7891000454794|2103.90.21|17891000454791|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13837463",
    "name": "MAG Tempero Empana LemonPpr 12(9x60g)BR",
    "brand": "MAGGI",
    "category": "TEMPERA E EMPANA",
    "packSize": "108",
    "ean": "7891000455227|1901.90.90|17891000455224|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13837465",
    "name": "KK 4Fngr Tutti Frutti 4(24x41,5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000455296|1905.32.00|17891000455293|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13837609",
    "name": "KK 4Fngr Dark ChocMint 4(24x41,5g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000455487|1905.32.00|17891000455484|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13850171",
    "name": "SFLR Chocolate Duo 4(16x80g) N1 BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000455708|1704.90.10|17891000455705|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13850440",
    "name": "SFLR Chocolate ao Leite 12(20x50g) N1 BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "TABLETES NESTLE",
    "packSize": "20",
    "ean": "7891000455722|1806.31.10|17891000455729|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13864756",
    "name": "GLK Tablete Recheado 4(14x90g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS RECHEADOS NESTLE",
    "packSize": "14",
    "ean": "7891000455951|1806.31.10|17891000455958|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13882992",
    "name": "MAG Macarrao Sabor Bechamel 12(9x65g) BR",
    "brand": "MAGGI",
    "category": "MASSAS",
    "packSize": "108",
    "ean": "7891000456217|1902.30.00|17891000456214|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13882993",
    "name": "MAG Macarrao Sabor Tomate 12(9x65g) BR",
    "brand": "MAGGI",
    "category": "MASSAS",
    "packSize": "108",
    "ean": "7891000456200|1902.30.00|17891000456207|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13882994",
    "name": "MAG Macarrao Sab MacN Chse 12(9x65g) BR",
    "brand": "MAGGI",
    "category": "MASSAS",
    "packSize": "108",
    "ean": "7891000456224|1902.30.00|17891000456221|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13991250",
    "name": "ESPD Bombons Sortidos Caixa 30x220g BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CAIXAS NESTLE",
    "packSize": "30",
    "ean": "7891000457467|1806.90.00|17891000457464|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14106543",
    "name": "GRT Tablete Rech Crocante 4(14x90g) N1BR",
    "brand": "GAROTO",
    "category": "JUMBOS RECHEADOS GAROTO",
    "packSize": "14",
    "ean": "7891000459041|1806.31.10|17891000459048|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14106626",
    "name": "SRT AMOR Tablete Recheado 4(14x90g)BR",
    "brand": "GAROTO",
    "category": "JUMBOS RECHEADOS GAROTO",
    "packSize": "14",
    "ean": "7891000459058|1806.31.10|17891000459055|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14123615",
    "name": "SFLR Duo 12(20x50g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "TABLETES NESTLE",
    "packSize": "20",
    "ean": "7891000460221|1704.90.10|17891000460228|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14123616",
    "name": "SRT AMOR Choco Trio 4(12x90g) BR",
    "brand": "GAROTO",
    "category": "CHOCOTRIO GAROTO",
    "packSize": "12",
    "ean": "7891000460245|1806.31.10|17891000460242|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14131309",
    "name": "BTN Tablete Rech 4(14x90g) BR",
    "brand": "GAROTO",
    "category": "JUMBOS RECHEADOS GAROTO",
    "packSize": "14",
    "ean": "7891000460665|1806.31.10|17891000460662|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14317522",
    "name": "NCU Achoc Po Cilindro Copa 36x350g BR",
    "brand": "BEBIDAS POS",
    "category": "NESCAU LATA 350G",
    "packSize": "36",
    "ean": "7891000412855|1806.90.00EX01|17891000412852|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14376159",
    "name": "NTRN Prtn 15g Choc 4(6x260ml)PR25%Dsc BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000465769|2202.99.00EX01|17891000465766|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14376161",
    "name": "NTRN Prtn15g Wafer 4(6x260ml) PR25%DscBR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000465806|2202.99.00EX01|17891000465803|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14376162",
    "name": "NTRN Prtn15g Baun 4(6x260ml) PR25%Dsc BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "24",
    "ean": "7891000465783|2202.99.00|17891000465780|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14385458",
    "name": "NTRN SENIOR Po Baun 6x740g PR25%Dsc BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN SENIOR LATA",
    "packSize": "6",
    "ean": "7891000465981|1901.90.90|17891000465988|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14476614",
    "name": "GRT Tablete Pe de Moleque 4(16x80g) BR",
    "brand": "GAROTO",
    "category": "JUMBOS GAROTO",
    "packSize": "16",
    "ean": "7891000466728|1806.32.10|17891000466725|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14510841",
    "name": "ESPD Bombons 30x220g PR10%Dsc BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CAIXAS NESTLE",
    "packSize": "30",
    "ean": "7891000474990|1806.90.00|17891000474997|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "14513265",
    "name": "NEST ChocoStickCrmlSalgado 12(12x24g)BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "12",
    "ean": "7891000476444|0|17891000476441|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "411059",
    "name": "MOCA Leite Condensado NPro 6x2,6kg XW",
    "brand": "01-NP LACTEOS",
    "category": "01E-CONDENSADOS INTEGRAL LATA",
    "packSize": "6",
    "ean": "7891000004180|0402.99.00|17891000003579|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "411522",
    "name": "MOCA Beijinho NPro 6x2400g XW",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000004197|1901.90.90|17891000003586|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "411524",
    "name": "MOCA Doce de Leite NPro 6x2,540g XW",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000004210|1901.90.20|17891000003609|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "411526",
    "name": "MOCA Chocolate NPro 6x2,540kg XW",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000004234|1806.20.00|17891000003623|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "415328",
    "name": "MAGGI Creme de Cebola NPro 6x1kg XW",
    "brand": "03-NP CULINARIOS",
    "category": "03C-MAGGI MOLHOS E CREMES",
    "packSize": "6",
    "ean": "7891000532805|2104.10.11|17891000053284|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "415533",
    "name": "MOCA LeiteCondensadoRech NPro 6x2,6kg XW",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000027387|0402.99.00|7891000027394|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "419489",
    "name": "NEGRESCO Bisc Granulado NPro 6x1000g XR",
    "brand": "05-NP BISCOITOS",
    "category": "05A-BISCOITOS",
    "packSize": "6",
    "ean": "7891000948903|1905.31.00|17891000094898|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "11320308",
    "name": "GAROTO Cobertura Choc Ao Leite 12x1kg XW",
    "brand": "02-NP CHOCOLATES",
    "category": "02G-COBERTURA REGULAR GAROTO 500G - 1KG",
    "packSize": "12",
    "ean": "7891008312003|1806.32.10|17891008308034|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "11320309",
    "name": "GAROTO Cobert Choc Meio Amargo 12x1kg XW",
    "brand": "02-NP CHOCOLATES",
    "category": "02G-COBERTURA REGULAR GAROTO 500G - 1KG",
    "packSize": "12",
    "ean": "7891008309010|1806.32.10|17891008309031|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "11320339",
    "name": "GAROTO Cobertura Choc Branco 12x1kg XW",
    "brand": "02-NP CHOCOLATES",
    "category": "02G-COBERTURA REGULAR GAROTO 500G - 1KG",
    "packSize": "12",
    "ean": "7891008339017|1704.90.10|17891008339038|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "11321851",
    "name": "GAROTO Cobert ChocLeite Blend 12x1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02G-COBERTURA REGULAR GAROTO 500G - 1KG",
    "packSize": "12",
    "ean": "7891008085105|1806.32.10|17891008085133|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12133006",
    "name": "MOCA Doce de Leite NPro 5x3kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "5",
    "ean": "7891000077177|1901.90.20|7891000077184|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12133009",
    "name": "NESTLE Nestilly UHT NPro 12x1kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01C-CREMES",
    "packSize": "12",
    "ean": "7891000027448|0401.50.21|7891000027455|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12133134",
    "name": "NESTLE Creme de Leite UHT NPro 12x1kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01C-CREMES",
    "packSize": "12",
    "ean": "7891000121702|0401.50.21|17891000012175|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12144488",
    "name": "GAROTO Cob Choc Branco 5x2,1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02F-COBERTURA REGULAR GAROTO 2KG",
    "packSize": "5",
    "ean": "7891008044881|1704.90.10|17891008344889|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12144489",
    "name": "GAROTO Cob Choc Meio Amargo 5x2,1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02F-COBERTURA REGULAR GAROTO 2KG",
    "packSize": "5",
    "ean": "7891008044898|1806.20.00|17891008344896|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12144515",
    "name": "GAROTO Cob Choc ao Leite Blend 5x2,1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02F-COBERTURA REGULAR GAROTO 2KG",
    "packSize": "5",
    "ean": "7891008045154|1806.20.00|17891008345152|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12144708",
    "name": "GAROTO Cob Choc ao Leite 5x2,1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02F-COBERTURA REGULAR GAROTO 2KG",
    "packSize": "5",
    "ean": "7891008047080|1806.20.00|17891008347088|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12168360",
    "name": "MAGGI FONDOR Tempero NPro 6x1,1kg BR",
    "brand": "03-NP CULINARIOS",
    "category": "03B-MAGGI TEMPEROS",
    "packSize": "6",
    "ean": "7891000085431|2103.90.29|7891000085448|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12168361",
    "name": "MAGGI Amaciante de Carne NPro 6x1,1kg BR",
    "brand": "03-NP CULINARIOS",
    "category": "03B-MAGGI TEMPEROS",
    "packSize": "6",
    "ean": "7891000085455|3507.90.49|7891000085462|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12168362",
    "name": "MAGGI GRIL Tempero NPro 6x1,1kg BR",
    "brand": "03-NP CULINARIOS",
    "category": "03B-MAGGI TEMPEROS",
    "packSize": "6",
    "ean": "7891000085479|2103.90.29|7891000085486|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12209621",
    "name": "MOCA Recheio Morango NPro 6x2,6kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000095348|1901.20.90|7891000095355|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12220263",
    "name": "MOCA Brigadeiro NPro 6x2,570kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000004227|1806.20.00|17891000003616|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12255799",
    "name": "NESTLE Cob Chocolate Marfim NPro12x1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02A-COBERTURA REGULAR NESTLE 500G - 1KG",
    "packSize": "12",
    "ean": "7891000104866|1704.90.10|7891000104873|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12255810",
    "name": "NESTLE Cob Chocolate Blend NPro 12x1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02A-COBERTURA REGULAR NESTLE 500G - 1KG",
    "packSize": "12",
    "ean": "7891000104804|1806.32.10|7891000104811|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12255811",
    "name": "NESTLE Cob Chocolate Leite Npro 12x1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02A-COBERTURA REGULAR NESTLE 500G - 1KG",
    "packSize": "12",
    "ean": "7891000104828|1806.32.10|7891000104835|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12255812",
    "name": "NESTLE Cob Chocolate Mamgo NPro 12x1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02A-COBERTURA REGULAR NESTLE 500G - 1KG",
    "packSize": "12",
    "ean": "7891000104842|1806.32.10|7891000104859|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12267768",
    "name": "NESTLE Creme de Lei Lata NPro 48x300g BR",
    "brand": "01-NP LACTEOS",
    "category": "01C-CREMES",
    "packSize": "48",
    "ean": "7891000107331|0401.50.29|7891000107348|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12318446",
    "name": "CHARGE Recheio NPro 6x2,4kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000119938|1806.20.00|7891000119945|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12320781",
    "name": "MAGGI Caldo de Galinha NPro 6x1,01kg BR",
    "brand": "03-NP CULINARIOS",
    "category": "03A-MAGGI CALDOS",
    "packSize": "6",
    "ean": "7891000120163|2104.10.19|7891000120170|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12320782",
    "name": "MAGGI Caldo de Carne NPro 6x1,01kg BR",
    "brand": "03-NP CULINARIOS",
    "category": "03A-MAGGI CALDOS",
    "packSize": "6",
    "ean": "7891000120187|2104.10.19|7891000120194|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12346804",
    "name": "ALPINO Recheio NPro 6x2,54kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000250884|1806.20.00|7891000250891|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12350533",
    "name": "ALPINO Achocolatado Po NPro 6x1kg BR",
    "brand": "06-NP STANDARD",
    "category": "06A-INGREDIENTE ACHOCOLATADO",
    "packSize": "6",
    "ean": "7891000251355|1806.90.00EX01|7891000251362|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12351872",
    "name": "NESTLE Cob Choc Leite NPro 6x2,1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02B-COBERTURA REGULAR NESTLE 2KG",
    "packSize": "6",
    "ean": "7891000251805|1806.20.00|7891000251812|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12351873",
    "name": "NESTLE Cob Choc Marfim NPro 6x2,1 kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02B-COBERTURA REGULAR NESTLE 2KG",
    "packSize": "6",
    "ean": "7891000251782|1704.90.10|7891000251799|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12351875",
    "name": "NESTLE Cob Choc Blend NPro 6x2,1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02B-COBERTURA REGULAR NESTLE 2KG",
    "packSize": "6",
    "ean": "7891000251744|1806.20.00|7891000251751|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12383770",
    "name": "NESTLE Rech Torta 6x600g NPro BR",
    "brand": "04-NP SOBREMESAS",
    "category": "04A-SOBREMESAS",
    "packSize": "6",
    "ean": "7891000261651|2106.90.29|7891000261668|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12439522",
    "name": "KITKAT Rech&Cob Choc NPro 6x1,01kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02E-PASTAS",
    "packSize": "6",
    "ean": "7891000304952|1806.90.00|7891000304976|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12462203",
    "name": "GALAK Rech&CobSabChocbra 6x1,01kgNProBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02E-PASTAS",
    "packSize": "6",
    "ean": "7891000327654|2106.90.90|7891000327678|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12479830",
    "name": "MOCA Doce de Leite 8x1,01kg NPro BR",
    "brand": "01-NP LACTEOS",
    "category": "01A-TOP LACTEOS MANGA",
    "packSize": "8",
    "ean": "7891000339350|1901.90.20|17891000339364|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12520114",
    "name": "NESTLE Choc Po Solu 32% NPro 9x1,01kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02D-CHOCOLATE PO",
    "packSize": "9",
    "ean": "7891000364567|1806.10.00|17891000364571|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12575461",
    "name": "MAGGI Base Demi Glace NPro 6x600g BR",
    "brand": "03-NP CULINARIOS",
    "category": "03C-MAGGI MOLHOS E CREMES",
    "packSize": "6",
    "ean": "7891000391310|2103.90.99|17891000391324|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12581664",
    "name": "PRESTIGIO Pasta NPro 6x1,01kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02E-PASTAS",
    "packSize": "6",
    "ean": "7891000395370|1806.90.00|17891000395391|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12595044",
    "name": "MOCA Leite Cond Semi Desn NPro 5x3kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01F-CONDENSADOS SEMI-DESNATADO BAG",
    "packSize": "5",
    "ean": "7891000404881|0402.99.00|17891000404888|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12607311",
    "name": "TOSTINES Biscoito Granulado NPro 6x1kgBR",
    "brand": "05-NP BISCOITOS",
    "category": "05A-BISCOITOS",
    "packSize": "6",
    "ean": "7891000413937|1905.31.00|17891000413934|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12608991",
    "name": "NINHO Recheio NPro 6x2,61kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01B-TOP LACTEOS LATA E BAG",
    "packSize": "6",
    "ean": "7891000415054|1901.90.90|17891000415051|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12611191",
    "name": "GAROTO Cob Sabor Choc AoLei NPro12x1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02I-COMPOUND 500G - 1KG",
    "packSize": "12",
    "ean": "7891000417942|1806.32.20|17891000417949|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12611545",
    "name": "GAROTO Cob Sabor ChocAoLei NPro5x2,1kgBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02J-COMPOUND 2KG",
    "packSize": "5",
    "ean": "7891000418307|1806.20.00|17891000418304|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12611997",
    "name": "MOCA Leite Condensado NPro 2x5kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01D-CONDENSADOS INTEGRAL BAG",
    "packSize": "2",
    "ean": "7891000418598|0402.99.00|17891000418595|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12612029",
    "name": "MOCA Leite Condensado NPro 5x2,37kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01D-CONDENSADOS INTEGRAL BAG",
    "packSize": "5",
    "ean": "7891000418642|0402.99.00|17891000418649|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12613366",
    "name": "MOCA Leite Condensado NPro 8x1,18kg BR",
    "brand": "01-NP LACTEOS",
    "category": "01D-CONDENSADOS INTEGRAL BAG",
    "packSize": "8",
    "ean": "7891000420850|0402.99.00|17891000420857|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12615097",
    "name": "GALAK NPro Cobertura Choc 6x2,1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02B-COBERTURA REGULAR NESTLE 2KG",
    "packSize": "6",
    "ean": "7891000423240|1704.90.10|17891000423247|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12615149",
    "name": "GALAK NPro Cobertura Choc 12x1kg BR",
    "brand": "02-NP CHOCOLATES",
    "category": "02A-COBERTURA REGULAR NESTLE 500G - 1KG",
    "packSize": "12",
    "ean": "7891000423257|1704.90.10|17891000423254|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12620861",
    "name": "NESCAU ACTIGEN-E AchocPo NPro 4x2,01kgBR",
    "brand": "06-NP STANDARD",
    "category": "06A-INGREDIENTE ACHOCOLATADO",
    "packSize": "4",
    "ean": "7891000432679|1806.90.00EX01|17891000432676|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13970140",
    "name": "GRT CobChoc aoLei 12x1kg PR10%Dsc XW",
    "brand": "02-NP CHOCOLATES",
    "category": "02G-COBERTURA REGULAR GAROTO 500G - 1KG",
    "packSize": "12",
    "ean": "7891000457276|1806.32.10|17891000457273|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13970185",
    "name": "NEST NPro CobChoc aoLei 12x1kgPR10%DscBR",
    "brand": "02-NP CHOCOLATES",
    "category": "02A-COBERTURA REGULAR NESTLE",
    "packSize": "12",
    "ean": "7891000457283|1806.32.10|17891000457280|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "412884",
    "name": "NESCAFE Cappuccino Latte 6x1300g XI",
    "brand": "07-NP SOLUCOES",
    "category": "07H-CAPPUCCINO NESCAFE",
    "packSize": "6",
    "ean": "7891000017562|2101.12.00|7891000017579|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12153428",
    "name": "NESCAU Com Leite NPro 6x1,3kg BR",
    "brand": "07-NP SOLUCOES",
    "category": "07E-ACHOCOLATADO NESCAU",
    "packSize": "6",
    "ean": "7891000082430|1806.90.00EX01|7891000082447|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12157199",
    "name": "ALPINO Achoc Com Leite NPro 6x1,3kg BR",
    "brand": "07-NP SOLUCOES",
    "category": "07G-DEMAIS ACHOCOLATADOS",
    "packSize": "6",
    "ean": "7891000083567|1806.90.00EX01|7891000083574|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12189531",
    "name": "MILANO LeiteemPo DesnatadoNPro 24x300gBR",
    "brand": "07-NP SOLUCOES",
    "category": "07I-LEITE NESCAFE",
    "packSize": "24",
    "ean": "7891000090664|0402.21.20|7891000090671|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12257968",
    "name": "NESCAFE ALEGRIA Cafe NPro 6x500g BR",
    "brand": "07-NP SOLUCOES",
    "category": "07B-CAFE MOIDO NESCAFE",
    "packSize": "6",
    "ean": "7891000105177|2101.11.10|7891000105184|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12302038",
    "name": "NESTLE DoisFrades AchocPoNPro 6x1,3kg BR",
    "brand": "07-NP SOLUCOES",
    "category": "07G-DEMAIS ACHOCOLATADOS",
    "packSize": "6",
    "ean": "7891000113219|1806.90.00EX01|7891000113226|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12338492",
    "name": "NESCAFE Cafe em Graos NPro 6x1Kg BR",
    "brand": "07-NP SOLUCOES",
    "category": "07A-CAFE GRAO NESCAFE",
    "packSize": "6",
    "ean": "7891000246306|0901.21.00|7891000246313|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12596287",
    "name": "NESCAFE Forte NPro 12x250g BR",
    "brand": "07-NP SOLUCOES",
    "category": "07B-CAFE MOIDO NESCAFE",
    "packSize": "12",
    "ean": "7891000405543|0901.21.00|17891000405540|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12608178",
    "name": "NESCAFE Tampa Papel NPro 40x50uni BR",
    "brand": "07-NP SOLUCOES",
    "category": "07D-ACESSORIOS NESCAFE",
    "packSize": "40",
    "ean": "7891000414804|4823.69.00|17891000414801|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12608573",
    "name": "NESCAFE CopoPpl NPro 200ml 20x50Uni BR",
    "brand": "07-NP SOLUCOES",
    "category": "07D-ACESSORIOS NESCAFE",
    "packSize": "20",
    "ean": "7891000414897|4823.69.00|17891000414894|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12618958",
    "name": "NESCAFE Copo PET NPro 400ml 15x30Uni BR",
    "brand": "07-NP SOLUCOES",
    "category": "07D-ACESSORIOS NESCAFE",
    "packSize": "15",
    "ean": "7891000432129|3924.10.00|17891000432126|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12622733",
    "name": "KIT KAT Achocolatado Po NPro 6x1,3kg BR",
    "brand": "07-NP SOLUCOES",
    "category": "07F-ACHOCOLATADO KIT KAT",
    "packSize": "6",
    "ean": "7891000433614|1806.90.00EX01|17891000433611|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12624628",
    "name": "NESCAFE Tampa PET 400ml NPro 6x75Uni BR",
    "brand": "07-NP SOLUCOES",
    "category": "07D-ACESSORIOS NESCAFE",
    "packSize": "6",
    "ean": "7891000435762|3923.50.00|17891000435769|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "12876665",
    "name": "NESCAFE Mexedores Cintas NPro30x100UniBR",
    "brand": "07-NP SOLUCOES",
    "category": "07D-ACESSORIOS NESCAFE",
    "packSize": "30",
    "ean": "7891000444498|4419.90.00|17891000444495|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13522062",
    "name": "BONO Biscoito Recheado Ddl 66x90g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADO BONO",
    "packSize": "66",
    "ean": "7891000376928|1905.31.00|17891000376932|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13522060",
    "name": "BONO Biscoito Recheado Mrg 66x90g N1 BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADO BONO",
    "packSize": "66",
    "ean": "7891000376959|1905.31.00|17891000376734|false",
    "imageUrl": null,
    "isNew": false
  },
  {
    "code": "13760033",
    "name": "FRSK Mix Carne Castrados 9x850g BR",
    "brand": "PREMIUM DRY CAT",
    "category": "FRISKIES DRY SMALL BAGS",
    "packSize": "9",
    "ean": "7891000454190|2309.10.00|17891000454197|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "12941325",
    "name": "KIT KAT 4Fngr Cereja 4(24x41,5g) BR",
    "brand": "CHOCOLATES",
    "category": "KIT KAT 4 FINGERS",
    "packSize": "24",
    "ean": "7891000445020|1905.32.00|17891000445027|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13563897",
    "name": "NDG Caramelo Salgado 10Caps 6x175g BR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS BEBIDAS",
    "packSize": "6",
    "ean": "7891000451106|2101.12.00|17891000451103|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13332567",
    "name": "NESCAU Protein 24x250ml BR",
    "brand": "RTD ADULTOS",
    "category": "RTD ADULTOS PROTEINADOS",
    "packSize": "24",
    "ean": "7891000446799|2202.99.00EX01|17891000446796|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13783814",
    "name": "PRST Frutas Vermelhas Choc 18(30x33g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "30",
    "ean": "7891000454589|1806.31.20|17891000454586|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13842963",
    "name": "SFLR Chocolate ao Leite 4(16x80g) N1 BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "JUMBOS NESTLE",
    "packSize": "16",
    "ean": "7891000455562|1806.31.10|17891000455569|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "12581445",
    "name": "MUCILON Mini Biscuits Banana 8(7x30g) BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "7",
    "ean": "7891000395189|1905.31.00|17891000395209|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "12581433",
    "name": "MUCILON Mini Biscuits Leite 8(7x30g) BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "7",
    "ean": "7891000395134|1905.31.00|17891000395155|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "12581434",
    "name": "MUCILON Mini Biscuits Maisena 8(7x30g)BR",
    "brand": "CEREAIS INFANTIS",
    "category": "MUCILON SNACKS",
    "packSize": "7",
    "ean": "7891000395233|1905.31.00|17891000395254|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "12612894",
    "name": "CHARGE Biscoito Recheado 70x130g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS OUTROS",
    "packSize": "70",
    "ean": "7891000419939|1905.31.00|17891000419936|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14506131",
    "name": "PSTMP Biscoito Rech Galak 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "66",
    "ean": "7891000469156|1905.31.00|17891000469153|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14506333",
    "name": "PSTMP Biscoito Rech Prestigio 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "66",
    "ean": "7891000469552|1905.31.00|17891000469559|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14506353",
    "name": "PSTMP Biscoito Rech Alpino 66x90g BR",
    "brand": "BISCOITOS",
    "category": "BISCOITOS RECHEADOS PASSATEMPO",
    "packSize": "66",
    "ean": "7891000469545|1905.31.00|17891000469542|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14506130",
    "name": "NDG Moca PistacchioLatte 10Caps 6x175gBR",
    "brand": "SISTEMA DOLCE GUSTO",
    "category": "DEMAIS BEBIDAS",
    "packSize": "6",
    "ean": "7891000469132|2101.12.00|17891000469139|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13837644",
    "name": "MAG Tempero Empana Parmesao12(9x60g)BR",
    "brand": "MAGGI",
    "category": "TEMPERA E EMPANA",
    "packSize": "9",
    "ean": "7891000455289|1901.90.90|17891000455286|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "13680782",
    "name": "NTRN Protein15gRTD ColagBaun4(6x260ml)BR",
    "brand": "NHS ACTIVE NUTRITION",
    "category": "NUTREN PROTEIN RTD",
    "packSize": "6",
    "ean": "7891000452936|2202.99.00|17891000452933|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14513277",
    "name": "BTN ChocoStick Caribe 12(12x24g) BR",
    "brand": "GAROTO",
    "category": "CANDY BARS GAROTO",
    "packSize": "12",
    "ean": "7891000476475|0|17891000476472|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14513949",
    "name": "BTN ChocoStick TriploChoc 12(12x26g)BR",
    "brand": "GAROTO",
    "category": "CANDY BARS GAROTO",
    "packSize": "12",
    "ean": "7891000477274|0|17891000477271|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14513974",
    "name": "BTN ChocoStickCookies&Cream 12(12x26g)BR",
    "brand": "GAROTO",
    "category": "CANDY BARS GAROTO",
    "packSize": "12",
    "ean": "7891000477366|0|17891000477363|true",
    "imageUrl": null,
    "isNew": true
  },
  {
    "code": "14513980",
    "name": "NEST ChocoStick Avela 12(12x26g) BR",
    "brand": "CHOCOLATES NESTLE",
    "category": "CANDY BARS NESTLE",
    "packSize": "12",
    "ean": "7891000477410|0|17891000477417|true",
    "imageUrl": null,
    "isNew": true
  }
];

export const allCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();
export const allBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();
