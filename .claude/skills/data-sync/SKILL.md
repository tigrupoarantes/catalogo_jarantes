---
name: data-sync
description: Use ao sincronizar dados de produto com o Supabase (tabela products_v2), lidar com migrations, o bucket de imagens product-images, ou rodar os scripts utilitários de importação (Excel Itens.xlsx, casamento de imagens). Gatilhos: "supabase", "products_v2", "migration", "bucket de imagens", "product-images", "importar planilha", "Itens.xlsx", "sincronizar produtos", "scripts/*.cjs", "RLS".
---

# Skill: Sincronização de dados (Supabase & scripts)

## Supabase
- **Cliente:** `src/integrations/supabase/client.ts` (usa `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` — chaves **públicas** por design). Tipos gerados em `src/integrations/supabase/types.ts`.
- **CRUD:** `src/services/supabaseService.ts` — opera na tabela **`products_v2`**.
- **Migrations:** `supabase/migrations/` (ex.: criação do bucket `product-images` com políticas RLS). `supabase/config.toml` presente.
- **Imagens:** bucket público `product-images`; `public/uploads/` é gitignored (backup local).

## Scripts utilitários (`scripts/*.cjs`, `scratch/`)
Node one-off scripts para importar Excel (`Itens.xlsx`), casar imagens a produtos por código, e sincronizar com Supabase. `scratch/` é gitignored. Ao rodar, verifique variáveis de ambiente necessárias no `.env` (não versionado) e confirme com o usuário qual é a fonte canônica antes de escrever em massa.

## Backend (upload — `server.ts`)
- `POST /api/upload` — recebe planilha + imagens (multer `upload.fields`), valida **EAN único** (`validateUniqueEAN`).
- `POST /api/upload-image` — imagem individual; extrai o código do nome do arquivo (`extractCodeFromFilename`: split por `" - "` ou regex de prefixo alfanumérico).

## Cuidados
- O campo `ean` segue empacotado `ean|ncm|dun|isNew` também na camada de dados — ver skill `product-catalog`.
- Três fontes coexistem (seed estático, Supabase, Firebase) — evite divergência; documente qual foi atualizada.
- Nunca commitar `.env`. `VITE_*` são públicas; segredos de servidor (ex.: service_role) nunca vão em `VITE_*`.
