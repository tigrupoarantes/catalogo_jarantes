# PRD — Catálogo Digital J. Arantes

> **Documento de Requisitos de Produto (as-is)** — descreve a aplicação **como ela está hoje**, derivado do código-fonte. Não é um roadmap de futuro. Última revisão: 2026-07-24.

---

## 1. Visão geral & objetivo

O **Catálogo Digital J. Arantes** é uma aplicação web B2B do **Grupo Arantes / J. Arantes** (distribuidora) para navegar e filtrar o portfólio de produtos Nestlé / Garoto / Purina e **gerar peças de catálogo** (SVG, PDF e Adobe InDesign IDML) para uso comercial pela equipe de vendas.

**Objetivo do produto:** dar à força de vendas uma ferramenta única para consultar o mix de produtos vigente, montar seleções por categoria/campanha e exportar catálogos prontos para envio ao cliente ou para a agência/gráfica.

**Domínio:** ~672 produtos de consumo (Creme de Leite, Nutren, Neston, Nescafé, Nescau, linha Purina pet etc.), com códigos internos, EAN/NCM/DUN e tamanho de pack brasileiros.

---

## 2. Personas & usuários

| Persona | Descrição | Acesso |
|---|---|---|
| **Vendedor / Representante** | Navega o catálogo, aplica filtros, monta seleção de produtos e exporta peças. | Público (rota `/`). |
| **Administrador** | Gerencia o cadastro de produtos (importação de planilha/imagens, atualização). | Autenticado via Firebase; gate de admin por e-mail (`/admin`, `/login`). |

---

## 3. Funcionalidades atuais

Todas derivadas do código existente:

### 3.1 Navegação e catálogo (`src/pages/Index.tsx`, `src/components/ProductFilters.tsx`)
- **Busca textual** por nome/código/marca.
- **Filtro por categoria** e **por marca**.
- **Toggle "só novos"** (`isNew`).
- **Quick filters** de marca/linha: Seca, Purina, Food, Bebidas, Lançamentos (`src/components/QuickBrandFilters.tsx`, `src/data/categoryMappings.ts`).
- **Paginação** de 48 itens por página.
- **Card de produto** com imagem, nome, marca, categoria e pack (`src/components/ProductCard.tsx`).

### 3.2 Mix sazonal / calendário comercial (`src/pages/Index.tsx` → `calendarMixMapping`)
- Mapeia datas comerciais brasileiras (Páscoa, Dia das Mães, Black Friday, Natal etc.) a grupos de produtos/marcas relevantes para a campanha.

### 3.3 Exportação de catálogo (`src/utils/`, `src/controllers/idmlExportController.ts`)
- **SVG** e **PDF** (`src/utils/svgExport.ts`, `jspdf`, `html2canvas`, `canvg`).
- **Adobe InDesign IDML** (`src/utils/idmlGenerator.ts`) — geração assíncrona via worker (`worker_threads`) no backend Express, com fluxo cliente → `POST /api/export/idml` → polling de status → download do `.idml`.
- **Modal de pré-visualização** antes de exportar (`src/components/CatalogPreviewModal.tsx`).

### 3.4 Administração de produtos (`src/pages/Admin.tsx`, `server.ts`)
- Upload de **planilha Excel** (`Itens.xlsx`) e **tabelas Markdown** para ingestão de produtos.
- **Validação de EAN único** (`validateUniqueEAN`) na rota `POST /api/upload`.
- Upload de **imagem individual** (`POST /api/upload-image`), com extração de código a partir do nome do arquivo.

---

## 4. Modelo de dados

Interface `Product` (`src/data/products.ts`):

```ts
interface Product {
  code: string;      // código interno (ex.: "411201")
  name: string;      // ex.: "NESTLE Creme de Leite Lata 48x300g BR"
  brand: string;     // ex.: "LEITES CULINARIOS"
  category: string;  // ex.: "CREME LATA"
  packSize: string;  // ex.: "48"
  ean: string;       // CAMPO EMPACOTADO — ver abaixo
  imageUrl?: string | null;
  isNew?: boolean;
}
```

**⚠️ Campo `ean` empacotado:** é uma string `ean|ncm|dun|isNew` (ex.: `7891000120101|0401.50.29|17891000012014|false`). **Nunca** ler/gravar direto — usar `parseProductTechnicalData(product)` e `serializeProductTechnicalData(ean, ncm, dun, isNew)`.

**Sistema de categorias** (`src/data/categoryMappings.ts`): combinação de `Set` de códigos (`secaProductCodes`, `purinaProductCodes`, `foodProductCodes`, `bebidasProductCodes`, `lancamentosProductCodes`) + predicados por marca/keyword:
- `isPurinaProduct`, `isFoodProduct`, `isBebidasProduct` — por código, marca ou keyword.
- `isSecaProduct` — **definido por exclusão** (é "Seca" se não for Purina, Food nem Bebidas).
- `isLancamento(code)` — pertence ao Set de lançamentos.

---

## 5. Arquitetura

- **Frontend:** React 18 + TypeScript, Vite, shadcn/ui + Radix + Tailwind, React Router, TanStack Query, React Hook Form + Zod.
- **Backend:** Express 5 (`server.ts`) para uploads e exportação IDML (multer para upload; `worker_threads` para geração IDML).
- **Fontes de dados (3, com migração em curso):**
  1. **Seed estático** — `src/data/products.ts` (~672 produtos hardcoded, estado inicial).
  2. **Supabase (Postgres)** — tabela `products_v2` (`src/services/supabaseService.ts`, `src/integrations/supabase/`); imagens no bucket `product-images`.
  3. **Firebase Auth** — login e gate de admin por e-mail (`src/contexts/FirebaseContext.tsx`, `src/lib/firebase.ts`).
- **Deploy:** Vercel — SPA + Serverless Functions em `api/**` (`api/index.ts` reexporta o app Express; `vercel.json` faz rewrite `/api/(.*)` → `/api/index`). Produção: **https://catalogo.brkarantes.com.br/**.
- **Rotas de API:** `POST /api/upload-image`, `POST /api/upload`, `POST /api/export/idml`.

---

## 6. Requisitos não-funcionais & estado atual

| Aspecto | Estado atual |
|---|---|
| **Performance/custo de imagens** | Derivados estáticos pré-gerados (`{code}_thumb.webp` 200 / `{code}_card.webp` 600 / `{code}_full.jpg` 1600), servidos sem transform on-the-fly. Elimina o custo recorrente de Supabase Image Transformations. Ver `docs/image-derivatives.md`. |
| **Cobertura de testes** | Praticamente nula — 1 arquivo (`src/test/example.test.ts`). Vitest + Playwright configurados mas não usados. |
| **Qualidade de código** | TypeScript frouxo (`strictNullChecks:false`, `noImplicitAny:false`); ESLint com `no-unused-vars` desligado; sem Prettier. |
| **CI/CD** | CI (lint/test/build) + Security (npm audit/CodeQL) + Dependabot configurados em `.github/`. |
| **Estabilidade de API** | `/api/*` **funcional** em produção (Vercel serverless); export IDML síncrono (~2,7s/produto). Único risco: limite de 30s para exports muito grandes. |

---

## 7. Limitações conhecidas & riscos

- **Exportação IDML — escala:** a geração é síncrona e funciona na Vercel, mas roda dentro do limite de **30s** por função. Exports com muitos produtos/imagens podem se aproximar desse teto; se isso virar problema, migrar para backend persistente externo **ou** fila + storage na nuvem.
- **Gate de admin frágil:** autorização de administrador por **e-mail hardcoded** no cliente — idealmente via custom claims/allowlist no backend.
- **Upload sem limite de tamanho explícito no multer:** apenas `express.json({ limit: '50mb' })`; conferir limites de arquivo em `server.ts`.
- **Redundância de fontes de dados:** seed estático + Supabase + Firebase coexistem (migração em andamento) — risco de divergência.
- **Lockfiles duplicados:** `bun.lock` e `package-lock.json` presentes — definir um gerenciador único.

---

## 8. Referências de código

| Área | Arquivo(s) |
|---|---|
| Catálogo / filtros | `src/pages/Index.tsx`, `src/components/ProductFilters.tsx`, `src/components/QuickBrandFilters.tsx` |
| Dados de produto | `src/data/products.ts`, `src/data/categoryMappings.ts` |
| Exportação | `src/utils/svgExport.ts`, `src/utils/idmlGenerator.ts`, `src/controllers/idmlExportController.ts`, `src/components/CatalogPreviewModal.tsx` |
| Backend | `server.ts`, `api/index.ts`, `vercel.json` |
| Dados/Auth | `src/services/supabaseService.ts`, `src/services/firebaseService.ts`, `src/contexts/FirebaseContext.tsx` |
