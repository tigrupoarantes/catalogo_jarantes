/**
 * Sincroniza o catálogo a partir da planilha mestre (aba CATÁLOGO):
 *  - products_v2 (Supabase): upsert dos produtos da planilha + delete dos que
 *    não estão nela (preserva imageUrl dos existentes).
 *  - regenera src/data/products.ts (seed estático) para bater com a planilha.
 *  - atualiza lancamentosProductCodes em src/data/categoryMappings.ts (coluna K).
 *
 * Mapeamento (planilha -> Product): CÓDIGO->code, DESCRIÇÃO->name,
 * CATEGORIA->brand, SUB CATEGORIA->category, FATOR->packSize,
 * Classificação Fiscal->ncm, EAN->ean, DUN->dun, coluna "Lançamentos"->isNew.
 * O campo ean é empacotado: ean|ncm|dun|isNew.
 *
 * Uso (Node 20.6+; carrega .env):
 *   node --env-file=.env scripts/sync-catalog-from-xlsx.mjs <caminho.xlsx>            # DRY-RUN (não escreve nada)
 *   node --env-file=.env scripts/sync-catalog-from-xlsx.mjs <caminho.xlsx> --apply    # executa
 *
 * Requer SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY no ambiente/.env.
 */
import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

const XLSX_PATH = process.argv[2];
const APPLY = process.argv.includes("--apply");
// --sets-only: NÃO toca no banco nem no products.ts; só regenera os Sets de
// categoria (Seca/Purina/Food/Bebidas) + lançamentos em categoryMappings.ts.
const SETS_ONLY = process.argv.includes("--sets-only");
const SHEET = "CATÁLOGO";
const TABLE = "products_v2";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!XLSX_PATH) { console.error("Informe o caminho do .xlsx como 1º argumento."); process.exit(1); }
if (!SETS_ONLY && (!SUPABASE_URL || !SERVICE_KEY)) { console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env."); process.exit(1); }

const supabase = SETS_ONLY ? null : createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const s = (v) => String(v ?? "").trim();

// Regenera uma declaração `export const <name> = new Set([...])` no arquivo.
function patchSet(content, name, codes) {
  const quoted = codes.map((c) => `"${c}"`);
  const lines = [];
  for (let i = 0; i < quoted.length; i += 8) lines.push("  " + quoted.slice(i, i + 8).join(", "));
  const body = lines.length ? `\n${lines.join(",\n")}\n` : "";
  const decl = `export const ${name} = new Set<string>([${body}]);`;
  const re = new RegExp(`export const ${name} = new Set(?:<string>)?\\(\\[[\\s\\S]*?\\]\\);`);
  if (!re.test(content)) throw new Error(`Não achei ${name} em categoryMappings.ts`);
  return content.replace(re, decl);
}

// Regenera os 4 Sets de categoria (ORGANIZAÇÃO) + lançamentos.
function regenerateCategoryMappings(orgGroups, launchCodes) {
  const mapPath = path.join(process.cwd(), "src", "data", "categoryMappings.ts");
  let c = fs.readFileSync(mapPath, "utf-8");
  c = patchSet(c, "secaProductCodes", orgGroups.Seca);
  c = patchSet(c, "purinaProductCodes", orgGroups.Purina);
  c = patchSet(c, "foodProductCodes", orgGroups.Food);
  c = patchSet(c, "bebidasProductCodes", orgGroups.Bebidas);
  c = patchSet(c, "lancamentosProductCodes", launchCodes);
  fs.writeFileSync(mapPath, c);
}

// --- 1. Ler planilha ---
const wb = XLSX.readFile(XLSX_PATH);
if (!wb.Sheets[SHEET]) { console.error(`Aba "${SHEET}" não encontrada. Abas: ${wb.SheetNames}`); process.exit(1); }
const rawRows = XLSX.utils.sheet_to_json(wb.Sheets[SHEET], { defval: "" }).filter(r => s(r["CÓDIGO"]) !== "");

const seen = new Set();
const dups = [];
const sheetProducts = [];
for (const r of rawRows) {
  const code = s(r["CÓDIGO"]);
  if (seen.has(code)) { dups.push(code); continue; }
  seen.add(code);
  const isNew = s(r["Lançamentos"]).toLowerCase() === "lançamentos";
  const ean = s(r["EAN"]);
  const ncm = s(r["Classificação Fiscal"]);
  const dun = s(r["DUN"]);
  sheetProducts.push({
    code,
    name: s(r["DESCRIÇÃO"]),
    brand: s(r["CATEGORIA"]),
    category: s(r["SUB CATEGORIA"]),
    packSize: s(r["FATOR"]),
    ean: `${ean}|${ncm}|${dun}|${isNew ? "true" : "false"}`,
    isNew,
    org: s(r["ORGANIZAÇÃO"]),
  });
}
const sheetCodes = new Set(sheetProducts.map(p => p.code));
const launchCodes = sheetProducts.filter(p => p.isNew).map(p => p.code);

// Agrupa por ORGANIZAÇÃO (coluna A) — fonte autoritativa dos filtros do catálogo.
const orgGroups = { Seca: [], Purina: [], Food: [], Bebidas: [] };
const orgOutros = [];
for (const p of sheetProducts) {
  const key = p.org.toLowerCase();
  if (key === "seca") orgGroups.Seca.push(p.code);
  else if (key === "purina") orgGroups.Purina.push(p.code);
  else if (key === "food") orgGroups.Food.push(p.code);
  else if (key === "bebidas") orgGroups.Bebidas.push(p.code);
  else orgOutros.push(`${p.code}:${p.org || "(vazio)"}`);
}
if (orgOutros.length) console.warn(`ATENÇÃO: ${orgOutros.length} produto(s) com ORGANIZAÇÃO fora de Seca/Purina/Food/Bebidas:`, orgOutros.slice(0, 10));

// Modo --sets-only: só regenera categoryMappings.ts (sem DB, sem products.ts).
if (SETS_ONLY) {
  regenerateCategoryMappings(orgGroups, launchCodes);
  console.log("=== --sets-only: categoryMappings.ts regenerado ===");
  console.log(`Seca ${orgGroups.Seca.length} · Purina ${orgGroups.Purina.length} · Food ${orgGroups.Food.length} · Bebidas ${orgGroups.Bebidas.length} · Lançamentos ${launchCodes.length}`);
  console.log(`(soma categorias = ${orgGroups.Seca.length + orgGroups.Purina.length + orgGroups.Food.length + orgGroups.Bebidas.length}; produtos = ${sheetProducts.length})`);
  process.exit(0);
}

// --- 2. Estado atual do DB ---
const { data: dbRows, error: fetchErr } = await supabase.from(TABLE).select("code, imageUrl");
if (fetchErr) { console.error("Erro ao ler products_v2:", fetchErr.message); process.exit(1); }
const dbImageByCode = new Map(dbRows.map(r => [s(r.code), r.imageUrl ?? null]));
const dbCodes = new Set(dbRows.map(r => s(r.code)));

const toAdd = sheetProducts.filter(p => !dbCodes.has(p.code));
const toUpdate = sheetProducts.filter(p => dbCodes.has(p.code));
const toDeleteCodes = [...dbCodes].filter(c => !sheetCodes.has(c));

console.log("=== SYNC CATÁLOGO (planilha -> products_v2) ===");
console.log(`Planilha: ${sheetProducts.length} produtos únicos | duplicados descartados: ${dups.length} ${JSON.stringify(dups)}`);
console.log(`Lançamentos (coluna K): ${launchCodes.length}`);
console.log(`products_v2 atual: ${dbCodes.size}`);
console.log(`A ADICIONAR: ${toAdd.length} | A REMOVER: ${toDeleteCodes.length} | A ATUALIZAR: ${toUpdate.length}`);
console.log("Primeiros a REMOVER:", JSON.stringify(toDeleteCodes.slice(0, 12)));

if (!APPLY) {
  console.log("\n(DRY-RUN — nada foi escrito. Rode com --apply para executar.)");
  process.exit(0);
}

// --- 3. Upsert no products_v2 (preserva imageUrl existente) ---
const rowsForDb = sheetProducts.map(p => ({
  id: p.code,
  code: p.code,
  name: p.name,
  brand: p.brand,
  category: p.category,
  packSize: p.packSize,
  ean: p.ean,
  imageUrl: dbImageByCode.has(p.code) ? dbImageByCode.get(p.code) : null,
  isNew: p.isNew,
}));

const BATCH = 500;
let upserted = 0;
for (let i = 0; i < rowsForDb.length; i += BATCH) {
  const chunk = rowsForDb.slice(i, i + BATCH);
  const { error } = await supabase.from(TABLE).upsert(chunk, { onConflict: "id" });
  if (error) { console.error("Erro no upsert:", error.message); process.exit(1); }
  upserted += chunk.length;
  console.log(`  upsert ${upserted}/${rowsForDb.length}`);
}

// --- 4. Delete dos ausentes ---
let deleted = 0;
for (let i = 0; i < toDeleteCodes.length; i += 100) {
  const chunk = toDeleteCodes.slice(i, i + 100);
  const { error } = await supabase.from(TABLE).delete().in("id", chunk);
  if (error) { console.error("Erro no delete:", error.message); process.exit(1); }
  deleted += chunk.length;
}
console.log(`Upserted: ${upserted} | Deleted: ${deleted}`);

// --- 5. Regenerar src/data/products.ts ---
const productsPath = path.join(process.cwd(), "src", "data", "products.ts");
const current = fs.readFileSync(productsPath, "utf-8");
const headerEnd = current.indexOf("export const products");
if (headerEnd === -1) { console.error("Não achei 'export const products' em products.ts"); process.exit(1); }
const header = current.slice(0, headerEnd); // interface + helpers + blank lines

const seedProducts = sheetProducts.map(p => ({
  code: p.code,
  name: p.name,
  brand: p.brand,
  category: p.category,
  packSize: p.packSize,
  ean: p.ean,
  imageUrl: dbImageByCode.has(p.code) ? dbImageByCode.get(p.code) : null,
  isNew: p.isNew,
}));

const newProductsTs =
  header +
  `export const products: Product[] = ${JSON.stringify(seedProducts, null, 2)};\n\n` +
  `export const allCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();\n` +
  `export const allBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();\n`;
fs.writeFileSync(productsPath, newProductsTs);
console.log(`products.ts regenerado com ${seedProducts.length} produtos.`);

// --- 6. Atualizar lancamentosProductCodes em categoryMappings.ts ---
regenerateCategoryMappings(orgGroups, launchCodes);
console.log(`categoryMappings.ts: Sets regenerados — Seca ${orgGroups.Seca.length} · Purina ${orgGroups.Purina.length} · Food ${orgGroups.Food.length} · Bebidas ${orgGroups.Bebidas.length} · Lançamentos ${launchCodes.length}.`);

console.log("\n✅ Sync concluído.");
