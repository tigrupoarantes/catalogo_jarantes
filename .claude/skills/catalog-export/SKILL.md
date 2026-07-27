---
name: catalog-export
description: Use ao trabalhar na exportação de catálogo (SVG, PDF ou Adobe InDesign IDML) — mexer em src/utils/svgExport.ts, src/utils/idmlGenerator.ts, src/controllers/idmlExportController.ts, o modal de preview, ou o fluxo /api/export/idml. Também para diagnosticar por que a exportação IDML falha em produção (Vercel). Gatilhos: "exportar catálogo", "gerar PDF", "gerar SVG", "IDML", "InDesign", "worker_threads", "preview do catálogo", "export não funciona em produção".
---

# Skill: Exportação de catálogo

## Formatos e arquivos
- **SVG / PDF:** `src/utils/svgExport.ts` (usa `jspdf`, `html2canvas`, `canvg`, `file-saver`). Geração no cliente.
- **IDML (Adobe InDesign):** `src/utils/idmlGenerator.ts` + `src/controllers/idmlExportController.ts`. Geração **no backend** via `worker_threads` (não trava o event loop), empacota um `.zip` renomeado `.idml`.
- **Preview:** `src/components/CatalogPreviewModal.tsx` (botão "Exportar IDML", estado `isExporting`, spinner, anti-duplo-clique).
- **Constantes de layout:** `src/utils/exportConstants.ts`.

## Fluxo IDML (cliente ↔ servidor)
1. `handleIdmlExport` em `src/pages/Index.tsx` → `POST /api/export/idml` com os IDs dos produtos selecionados.
2. Cliente faz **polling** do status (GET a cada ~1s).
3. Quando pronto, baixa o `.idml`.
Rota registrada em `server.ts`: `app.post('/api/export/idml', idmlExportHandler)`.

## ⚠️ Caveat em produção (Vercel)
A geração IDML depende de `worker_threads` + **disco local** + estado entre requisições (polling). Funções **serverless da Vercel são efêmeras** (limite ~30s, sem estado compartilhado) → o fluxo quebra. Opções:
- **A (recomendada p/ IDML):** hospedar o Express persistente fora da Vercel (Render/Railway/VPS), apontar o cliente para `VITE_API_URL`, habilitar CORS.
- **B:** tornar a geração síncrona dentro de 30s e persistir o artefato no Supabase Storage (sem `worker_threads`/disco local).
Contexto histórico: `instrucoes_desenvolvedor.md`. Observação: o `vercel.json` **já tem** o rewrite `/api/(.*)` → `/api/index` (o diagnóstico antigo que dizia faltar isso está desatualizado).

## Testar
`npm run dev` (sobe o Express) e exercitar o preview localmente; para produção, validar a rota real antes de mudar arquitetura — isolar se o que falha é só o IDML ou todo `/api/*`.
