# Instruções para Integração do Backend e Deploy (Exportação IDML)

Este documento detalha o status da implementação do fluxo de exportação IDML (Adobe InDesign).

> ## ✅ STATUS ATUAL (2026-07-24) — RESOLVIDO
> O `/api` em produção **funciona**. Domínio oficial: **https://catalogo.brkarantes.com.br/**.
> O backend Express roda como **Vercel Serverless Function** (`api/index.ts` reexporta o app; `vercel.json` faz rewrite `/api/(.*)` → `/api/index`), e a exportação IDML foi refatorada para ser **síncrona** (sem `worker_threads`/polling).
>
> Verificação: `POST /api/export/idml` com produtos reais retorna `HTTP 200 application/zip` (~2,7s por produto), com o `.idml` e as imagens embutidas via Supabase Storage. **O diagnóstico "405 / nada acontece" abaixo é histórico e não se aplica mais** — mantido apenas como registro. As "Opções A/B" seguem válidas apenas se, no futuro, o volume de produtos por export estourar o limite de 30s da função serverless.

---

## 1. Status da Implementação
Toda a lógica de frontend e backend para a exportação IDML já está integrada no repositório:
* **Interface (`src/components/CatalogPreviewModal.tsx`)**: Botão "Exportar IDML" integrado no modal de pré-visualização, com controle de estado de carregamento (`isExporting`), spinner visual e desabilitação contra múltiplos cliques.
* **Fluxo no Cliente (`src/pages/Index.tsx`)**: Função `handleIdmlExport` que inicia a exportação enviando os IDs dos produtos selecionados via POST para `/api/export/idml`, faz o polling do status da tarefa via GET a cada segundo, e realiza o download do arquivo `.idml` assim que finalizado.
* **Servidor Express (`server.ts`)**: Rotas criadas e associadas aos controladores correspondentes.
* **Controlador e Worker (`src/controllers/idmlExportController.ts` & `src/workers/idmlExportWorker.js`)**: Controlador em conformidade com ES Modules e Worker em segundo plano utilizando `worker_threads` para não travar o processo principal do Node.js ao gerar o arquivo zip do IDML.

---

## 2. O Diagnóstico (HISTÓRICO — já resolvido)
> ⚠️ Esta seção descreve um problema **passado**, quando o domínio ainda apontava para uma configuração antiga sem as rotas serverless. Hoje o `/api` funciona (ver banner de status no topo). Mantido apenas como registro histórico.

Ao monitorar as requisições de rede no ambiente de produção, qualquer requisição enviada para rotas sob `/api/*` (como `/api/export/idml` ou `/api/upload`) retornava **`405 Method Not Allowed`** ou o conteúdo HTML da página principal (`index.html`).

### Causa Raiz:
O domínio está apontado para os servidores da **Vercel** (`vercel-dns-016.com`). O arquivo `vercel.json` na raiz do projeto está configurado para servir a aplicação apenas como um app estático SPA (Single Page Application):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Como não há configurações de Proxy ou Serverless Functions mapeando as rotas `/api/*`, a Vercel reescreve a chamada da API para retornar a página estática `index.html`. O frontend tenta ler isso como JSON e falha silenciosamente (lançando um erro de parsing no console do navegador).

---

## 3. Caminhos Recomendados para o Desenvolvedor

Para que a exportação IDML e outras chamadas de API funcionem na nuvem, deve-se adotar uma das duas estratégias abaixo:

### Opção A: Hospedar o Servidor Node/Express em um Servidor Externo (Recomendado)
Caso você queira manter o servidor Node/Express persistente (com suporte nativo a `worker_threads` e armazenamento temporário local em disco):
1. Faça o deploy do código do backend (`server.ts` compilado para `dist/server.cjs` via `npm run build:prod`) em um serviço de hospedagem Node (ex: **Render**, **Railway**, **AWS EC2**, ou servidor local/VPS dedicado).
2. Configure o frontend para usar a URL absoluta desse servidor para chamadas de API. No arquivo `.env` de produção, ou criando uma constante de configuração, ajuste as chamadas de:
   ```typescript
   // De:
   fetch('/api/export/idml')
   // Para:
   fetch('https://sua-api-idml.com.br/api/export/idml')
   ```
3. Garanta que o CORS esteja ativado no Express para permitir requisições vindas do domínio da Vercel.

### Opção B: Migrar o Backend para Vercel Serverless Functions
Caso queira manter toda a infraestrutura unificada na Vercel:
1. Remova o servidor persistente e crie uma pasta `/api` na raiz do projeto Vercel.
2. Crie funções Serverless individuais (ex: `/api/export/idml.ts` e `/api/export/status.ts`).
3. Mude a lógica do Worker: uma vez que Serverless Functions possuem limite de tempo de execução (10s a 60s) e são efêmeras, a geração do IDML deve ser feita de forma síncrona dentro da requisição ou integrada a uma fila externa/armazenamento na nuvem (como S3 ou Supabase Storage), evitando o uso de `worker_threads` local.
4. Ajuste as rotas no `vercel.json` para direcionar requisições `/api/*` às funções do diretório `/api/`.
