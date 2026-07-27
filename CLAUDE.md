# CLAUDE.md — Catálogo Digital J. Arantes

Guia para agentes trabalhando neste repositório. Catálogo digital B2B (Grupo Arantes) para navegar o portfólio Nestlé/Purina e exportar catálogos (SVG/PDF/IDML). PRD completo em `docs/PRD.md`.

## Stack
React 18 + TypeScript + **Vite** · shadcn/ui + Radix + Tailwind · React Router · TanStack Query · React Hook Form + Zod · backend **Express 5** (`server.ts`) · deploy **Vercel** (SPA + functions `api/**`).

## Comandos
- `npm run dev` — sobe o **servidor Express via `tsx server.ts`** (NÃO é `vite` puro; o Vite roda como middleware).
- `npm run build` — build do frontend (Vite). `npm run build:prod` — frontend + bundle do server (`dist/server.cjs`). `npm run start` — roda o build do server.
- `npm run lint` — ESLint. `npm run test` — Vitest (`vitest run`). `npm run test:watch` — watch.

## Arquitetura de dados (3 fontes, migração em curso)
1. **Seed estático** — `src/data/products.ts` (~672 produtos, estado inicial).
2. **Supabase (Postgres)** — tabela `products_v2` (`src/services/supabaseService.ts`, `src/integrations/supabase/`). Imagens no bucket `product-images` (migrations em `supabase/migrations/`).
3. **Firebase Auth** — login + gate de admin por e-mail (`src/contexts/FirebaseContext.tsx`, `src/lib/firebase.ts`).

## Convenções e armadilhas (importante)
- **⚠️ Campo `ean` empacotado:** em `Product`, `ean` é a string `ean|ncm|dun|isNew`. SEMPRE usar `parseProductTechnicalData()` / `serializeProductTechnicalData()` de `src/data/products.ts` — nunca fazer split/concat manual.
- **Sistema de categorias** (`src/data/categoryMappings.ts`): `Set`s de códigos + predicados `isPurinaProduct` / `isFoodProduct` / `isBebidasProduct` / `isSecaProduct` / `isLancamento`. **Seca é definida por exclusão** (não-Purina, não-Food, não-Bebidas). Ao mexer em categorias, atualize os `Set`s aqui.
- **Alias de import:** `@/*` → `src/*` (configurado em vite/vitest/tsconfig).
- **Variáveis `VITE_*` são PÚBLICAS** — embutidas no bundle do cliente. Nunca colocar segredo de servidor num `VITE_*`.
- **Imagens de produto** ficam no bucket Supabase `product-images` (`public/uploads/` é gitignored, só backup local). Usar **derivados estáticos** `{code}_{thumb|card|full}` via `getDerivativeUrl` ([src/utils/imageUtils.ts](src/utils/imageUtils.ts)) — **nunca** o transform on-the-fly `/render/image/` (é cobrado por imagem/ciclo). Geração: browser no upload (`imageDerivatives.ts`) + backfill `npm run gen:derivatives`. Ver [docs/image-derivatives.md](docs/image-derivatives.md).
- **`.env` é gitignored** e não versionado (só `.env.example`). Mantenha assim.

## Exportação de catálogo
- SVG/PDF: `src/utils/svgExport.ts` (+ `jspdf`, `html2canvas`, `canvg`).
- IDML: `src/utils/idmlGenerator.ts` + `src/controllers/idmlExportController.ts` (worker em `worker_threads`). Fluxo: cliente `handleIdmlExport` (`src/pages/Index.tsx`) → `POST /api/export/idml` → polling → download.
- **Caveat produção:** o IDML usa `worker_threads` + disco local, incompatível com serverless efêmero da Vercel (30s). Ver `docs/PRD.md` §7 e `instrucoes_desenvolvedor.md`.

## API (Express — `server.ts`)
`POST /api/upload-image`, `POST /api/upload` (planilha+imagens, valida EAN único), `POST /api/export/idml`. Entrypoint serverless: `api/index.ts` reexporta o app; `vercel.json` faz rewrite `/api/(.*)` → `/api/index`. **Produção: https://catalogo.brkarantes.com.br/** (o `/api` funciona; export IDML é síncrono). Rotas que gravam em disco são protegidas por `IS_SERVERLESS` (fs read-only na Vercel).

## Estado / dívidas
Cobertura de testes ~nula (1 arquivo); TS/ESLint frouxos; sem Prettier; lockfiles duplicados (`bun.lock` + `package-lock.json`). Ao adicionar código, prefira reusar utilitários existentes.

## Tooling deste repo
- Skills do projeto em `.claude/skills/` (`product-catalog`, `catalog-export`, `data-sync`, `security-review`).
- Subagentes em `.claude/agents/` (`catalog-domain-expert`, `security-auditor`, `feature-planner`).
