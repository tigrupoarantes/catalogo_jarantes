# Derivados de imagem estáticos (redução de custo Supabase)

## Por quê
A Supabase cobra **Image Transformations** por **imagem de origem distinta transformada por ciclo de faturamento** (100 grátis no Pro; overage $5/1.000). O contador **reseta todo ciclo** e o catálogo só cresce → custo recorrente e crescente. Cache/CDN não resolve.

**Solução:** parar de usar o endpoint `/render/image/` on-the-fly. Cada imagem é processada **uma vez** e os tamanhos derivados ficam salvos como arquivos estáticos, servidos com `getPublicUrl()` sem transform (só storage + egress, sem contagem de transformação).

## Convenção (flat com sufixo, bucket `product-images`)
| Derivado | Tamanho | Formato | Arquivo | Uso |
|---|---|---|---|---|
| thumb | 200px | WebP | `{code}_thumb.webp` | reserva (listagens densas) |
| card | 600px | WebP | `{code}_card.webp` | grid do catálogo |
| full | 1600px | JPEG | `{code}_full.jpg` | zoom/lightbox + export IDML |
| original | — | orig. | `{code}.{ext}` | mantido (fallback) |

Definições canônicas (manter em sincronia): `src/utils/imageDerivatives.ts` (browser), `src/utils/imageUtils.ts` (`getDerivativeUrl`), `scripts/generate-derivatives.mjs` (backfill).

## Como é gerado
- **Uploads novos:** `supabaseService.uploadProductImage` gera os 3 derivados no **browser** (Canvas) e sobe cada um. Falha em derivado não aborta o upload do original.
- **Imagens existentes (backfill):** script Node com `sharp`.

## Credencial (service_role)
O backfill usa a **`SUPABASE_SERVICE_ROLE_KEY`** (bypassa RLS). É um **segredo**:
- Adicione **manualmente** ao `.env` (que é gitignored): `SUPABASE_SERVICE_ROLE_KEY=<chave>`. **Sem** prefixo `VITE_` (VITE_ vai pro bundle do cliente). Nunca commitar nem colar em chat/PR.
- `SUPABASE_URL` já existe no `.env`.
- O npm script usa `node --env-file-if-exists=.env`, então o `.env` é carregado automaticamente (Node ≥ 20.6 / v24 no projeto). Requer `npm install` antes (para o `sharp`).

## Runbook de rollout (ordem importa — guardrail)
0. `npm install` (instala `sharp`). Garanta `SUPABASE_SERVICE_ROLE_KEY` no `.env` (acima).
1. **Backfill** dos existentes:
   ```bash
   # teste primeiro em poucos SKUs (não sobe nada)
   npm run gen:derivatives -- --dry-run --limit 5
   # rodar de verdade em poucos e validar no bucket
   npm run gen:derivatives -- --limit 5
   # então tudo
   npm run gen:derivatives
   ```
   Confira `scratch/derivatives-report.json` e o bucket (`{code}_thumb.webp/_card.webp/_full.jpg`).
   `--force` regenera derivados já existentes.
2. **Publicar o frontend** (grid/zoom/export já apontam para os derivados; há fallback `onError` → original enquanto o backfill não termina).
3. **Validar 1 ciclo de fatura:** a linha "Storage Images Transformed" deve cair para ~0.
4. **Desativar** `Storage → Settings → Enable Image Transformations` nos projetos.
5. **Habilitar Spend Cap** como trava final (só após validar — não antes, para não bloquear thumbnails na transição).

## Como adicionar/atualizar a imagem de um produto

**Caminho recomendado: pelo `/admin`.** Logado como admin, use o **upload em lote de imagens** (funciona só com imagens, sem planilha):
- Envia o original direto ao bucket `product-images` como `{code}.{ext}` e **gera os 3 derivados no navegador** (`_thumb.webp`/`_card.webp`/`_full.jpg`). Um upload resolve tudo, sem transform cobrado.
- Casa cada arquivo ao produto pelo **código**, extraído do nome do arquivo. Nomeie assim:
  - `12443609.jpg` (só o código), ou
  - `12443609 - PRO PLAN Adult Frango 5x3kg.jpg` (código + ` - ` + descrição), ou
  - `12443609frente.png` (código no começo).

**Alternativas (evitar / com ressalva):**
- 🗄️ **Dashboard do Supabase (upload manual no bucket):** sobe só o original — **não** gera derivados. Depois é obrigatório rodar `npm run gen:derivatives` para criar os `_thumb/_card/_full`.
- 📁 **Pasta `public/uploads/produtos/`:** ❌ não é caminho de produção (gitignored, fs read-only na Vercel). A imagem não chega ao bucket.

> ⏱️ **Timing:** a geração automática de derivados no upload faz parte do código novo. **Faça o deploy primeiro** e só então suba as imagens faltantes (ver `docs/produtos-sem-imagem.csv`) pelo `/admin` — assim cada upload já cria os derivados.

## Notas
- `sharp` é só **devDependency** (script offline). O runtime na Vercel (fs read-only) não usa `sharp` — a geração runtime é no browser.
- **Projeto Chok (`DBO_CATALOGO_CHOK`)** precisa do mesmo tratamento no seu próprio repo — fora deste escopo.
- Referências Supabase: [Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations) · [Manage usage](https://supabase.com/docs/guides/platform/manage-your-usage/storage-image-transformations).
