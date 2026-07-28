/**
 * Apaga do bucket product-images as imagens ÓRFÃS: objetos cujo código de produto
 * não existe mais em products_v2. Cobre o original e os derivados
 * ({code}.ext, {code}_thumb.webp, {code}_card.webp, {code}_full.jpg).
 *
 * DESTRUTIVO e IRREVERSÍVEL. Rode o dry-run antes.
 *
 * Uso (Node 20.6+; carrega .env):
 *   node --env-file=.env scripts/delete-orphan-images.mjs            # DRY-RUN (não apaga)
 *   node --env-file=.env scripts/delete-orphan-images.mjs --apply    # apaga
 *
 * Requer SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY no ambiente/.env.
 */
import { createClient } from "@supabase/supabase-js";

const APPLY = process.argv.includes("--apply");
const BUCKET = "product-images";
const DERIV = /(_thumb|_card|_full)?\.[^.]+$/; // remove sufixo de derivado + extensão

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// --- códigos válidos (products_v2) ---
const { data: prod, error: pErr } = await supabase.from("products_v2").select("code");
if (pErr) { console.error("Erro ao ler products_v2:", pErr.message); process.exit(1); }
const validCodes = new Set(prod.map(r => String(r.code).trim()));

// --- lista TODOS os objetos do bucket (paginado) ---
async function listAll() {
  const names = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      limit: pageSize, offset, sortBy: { column: "name", order: "asc" },
    });
    if (error) { console.error("Erro ao listar bucket:", error.message); process.exit(1); }
    for (const o of data) if (o?.name) names.push(o.name);
    if (data.length < pageSize) break;
  }
  return names;
}

const all = await listAll();
const orphanFiles = all.filter(name => {
  const code = name.replace(DERIV, "");
  return /^[0-9]+$/.test(code) && !validCodes.has(code); // só códigos numéricos, fora do catálogo
});
const orphanCodes = new Set(orphanFiles.map(n => n.replace(DERIV, "")));

console.log(`Objetos no bucket: ${all.length} | products_v2: ${validCodes.size}`);
console.log(`Órfãos: ${orphanCodes.size} códigos / ${orphanFiles.length} arquivos`);
console.log("Amostra:", JSON.stringify(orphanFiles.slice(0, 8)));

if (!APPLY) {
  console.log("\n(DRY-RUN — nada foi apagado. Rode com --apply para excluir.)");
  process.exit(0);
}

let removed = 0;
for (let i = 0; i < orphanFiles.length; i += 100) {
  const chunk = orphanFiles.slice(i, i + 100);
  const { error } = await supabase.storage.from(BUCKET).remove(chunk);
  if (error) { console.error("Erro ao remover lote:", error.message); process.exit(1); }
  removed += chunk.length;
  console.log(`  removidos ${removed}/${orphanFiles.length}`);
}
console.log(`\n✅ ${removed} arquivo(s) órfão(s) removido(s).`);
