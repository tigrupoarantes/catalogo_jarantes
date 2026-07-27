/**
 * Backfill de derivados de imagem no Supabase Storage.
 *
 * Para cada imagem ORIGINAL `{code}.{ext}` do bucket product-images, gera 3
 * arquivos estáticos e os sobe no mesmo bucket (convenção flat com sufixo):
 *   {code}_thumb.webp  (200px, webp)
 *   {code}_card.webp   (600px, webp)
 *   {code}_full.jpg    (1600px, jpeg)
 *
 * Objetivo: eliminar a dependência do endpoint /render/image/ (Image
 * Transformations), que é cobrado por imagem de origem transformada por ciclo.
 * Depois do backfill + swap do frontend, o toggle "Enable Image Transformations"
 * pode ser desligado no painel do Supabase (ver docs/image-derivatives.md).
 *
 * Uso:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/generate-derivatives.mjs [--dry-run] [--limit N] [--force]
 *
 * - Preferir SERVICE_ROLE key (bypassa RLS). SUPABASE_ANON_KEY funciona se o
 *   bucket tiver policies de leitura+insert para anon.
 * - --dry-run: não sobe nada, só planeja e gera o relatório.
 * - --limit N: processa no máximo N originais (útil p/ validar em poucos SKUs).
 * - --force: regenera mesmo que o derivado já exista.
 *
 * Requer `sharp` (devDependency).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");
const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg !== -1 ? parseInt(process.argv[limitArg + 1], 10) : Infinity;

const BUCKET = "product-images";
const CONCURRENCY = 8;
const REPORT_PATH = path.join(process.cwd(), "scratch", "derivatives-report.json");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (ou ANON) no ambiente.");
  process.exit(1);
}

// Precisa bater com src/utils/imageDerivatives.ts e imageUtils.ts
const SPECS = [
  { size: "thumb", max: 200, ext: "webp", contentType: "image/webp" },
  { size: "card", max: 600, ext: "webp", contentType: "image/webp" },
  { size: "full", max: 1600, ext: "jpg", contentType: "image/jpeg" },
];

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const DERIVATIVE_SUFFIX = /_(thumb|card|full)$/i;

const authHeaders = { apikey: SUPABASE_KEY, authorization: `Bearer ${SUPABASE_KEY}` };

/** Lista todos os objetos do bucket (paginado). */
async function listAllObjects() {
  const names = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
      method: "POST",
      headers: { ...authHeaders, "content-type": "application/json" },
      body: JSON.stringify({
        prefix: "",
        limit: pageSize,
        offset,
        sortBy: { column: "name", order: "asc" },
      }),
    });
    if (!res.ok) throw new Error(`Falha ao listar bucket: ${res.status} ${await res.text()}`);
    const page = await res.json();
    for (const obj of page) if (obj?.name) names.push(obj.name);
    if (page.length < pageSize) break;
  }
  return names;
}

async function downloadObject(key) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(key)}`,
    { headers: authHeaders }
  );
  if (!res.ok) throw new Error(`download ${key}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadObject(key, body, contentType) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: {
        ...authHeaders,
        "content-type": contentType,
        "cache-control": "max-age=3600",
        "x-upsert": FORCE ? "true" : "false",
      },
      body,
    }
  );
  if (res.ok) return "uploaded";
  const text = await res.text();
  if (res.status === 409 || text.includes("Duplicate")) return "already-exists";
  throw new Error(`upload ${key}: HTTP ${res.status}: ${text}`);
}

async function makeDerivative(srcBuffer, spec) {
  let pipeline = sharp(srcBuffer).resize(spec.max, spec.max, {
    fit: "inside",
    withoutEnlargement: true,
  });
  if (spec.ext === "webp") return pipeline.webp({ quality: 80 }).toBuffer();
  // JPEG não tem alpha: fundo branco para evitar transparência preta.
  return pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: 85 }).toBuffer();
}

// --- Planejamento ---
const allObjects = await listAllObjects();
const existing = new Set(allObjects);

const originals = allObjects.filter((name) => {
  const ext = path.extname(name).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) return false;
  const base = path.basename(name, ext);
  return !DERIVATIVE_SUFFIX.test(base); // exclui *_thumb/_card/_full
});

console.log(`${allObjects.length} objetos no bucket | ${originals.length} originais.`);

const tasks = [];
for (const name of originals) {
  if (tasks.length >= LIMIT) break;
  const ext = path.extname(name).toLowerCase();
  const code = path.basename(name, ext);
  const needed = SPECS.filter((s) => FORCE || !existing.has(`${code}_${s.size}.${s.ext}`));
  if (needed.length === 0) continue;
  tasks.push({ code, sourceKey: name, needed });
}

console.log(`${tasks.length} originais precisam de derivados${FORCE ? " (--force)" : ""}.`);

const done = [];
const failed = [];

if (!DRY_RUN) {
  let cursor = 0;
  async function worker() {
    while (cursor < tasks.length) {
      const task = tasks[cursor++];
      try {
        const src = await downloadObject(task.sourceKey);
        for (const spec of task.needed) {
          const derived = await makeDerivative(src, spec);
          const key = `${task.code}_${spec.size}.${spec.ext}`;
          const status = await uploadObject(key, derived, spec.contentType);
          done.push({ key, status });
        }
        if (done.length % 50 === 0) console.log(`  ${done.length} derivados enviados...`);
      } catch (err) {
        failed.push({ code: task.code, source: task.sourceKey, error: String(err) });
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
} else {
  console.log("(dry-run: nada foi gerado/enviado)");
}

const report = {
  generatedAt: new Date().toISOString(),
  supabaseUrl: SUPABASE_URL,
  options: { dryRun: DRY_RUN, force: FORCE, limit: LIMIT === Infinity ? null : LIMIT },
  totals: {
    objects: allObjects.length,
    originals: originals.length,
    planned: tasks.length,
    derivativesUploaded: done.length,
    failed: failed.length,
  },
  failed,
};

fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`Relatório salvo em ${REPORT_PATH}`);
console.log(JSON.stringify(report.totals));
if (failed.length > 0) {
  console.error("ATENÇÃO: houve falhas — ver relatório.");
  process.exit(2);
}
