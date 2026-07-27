# Instruções para Correção do Banco de Dados e Ambiente do Catálogo J. Arantes

> ## ✅ NOTA DE STATUS (2026-07-24) — RESOLVIDO
> O Supabase **oficial e atual** da J. Arantes é **`bzdpgsfmbbhpqbyugrmg`** (`https://bzdpgsfmbbhpqbyugrmg.supabase.co`), conforme o `.env` e o código em uso. Os refs `bzdpgsfmbbhpqbyugrmg` que apareciam neste guia eram de um projeto **anterior/obsoleto** e foram atualizados abaixo. O projeto da **Chok** (`imvrwcaxsapqhogjkalt`) não tem mais relação com este catálogo.
>
> Domínio de produção atual: **https://catalogo.brkarantes.com.br/**. Este documento é mantido como referência da estrutura da tabela `products_v2` e do fluxo de sincronização.

Este documento descreve as etapas necessárias para corrigir o problema (já sanado) onde os produtos da **Chok** (como GTEX URCA, BOMBRIL, RAYOVAC, etc.) apareciam indevidamente no catálogo online da **J. Arantes**.

---

## 🔍 Análise do Problema

1. **Desalinhamento de Credenciais em Produção**:
   * A aplicação da **J. Arantes** em produção (Vercel/Render) está configurada usando o banco de dados do Supabase da **Chok** (`imvrwcaxsapqhogjkalt`).
   * Como resultado, a aplicação busca os 1000 produtos inseridos no banco da Chok e os mescla com os 624 produtos estáticos locais da J. Arantes, totalizando **1624 produtos**.
2. **Inexistência de Tabela no Banco Correto**:
   * O banco de dados correto e atual da J. Arantes (`bzdpgsfmbbhpqbyugrmg`) precisa da tabela `products_v2` criada no schema, sem a qual a sincronização não funciona mesmo com as variáveis de ambiente corretas.

---

## 🛠️ Passo a Passo para Solução

### Passo 1: Atualizar as Variáveis de Ambiente na Hospedagem (Vercel ou Render)
Acesse a plataforma onde o catálogo da **J. Arantes** está hospedado (Vercel/Render), acesse as configurações de variáveis de ambiente do projeto (**Settings > Environment Variables**) e substitua as chaves atuais pelas credenciais corretas da J. Arantes:

* **`VITE_SUPABASE_URL`**: 
  `https://bzdpgsfmbbhpqbyugrmg.supabase.co`
* **`VITE_SUPABASE_PUBLISHABLE_KEY`**: 
  use o valor atual do arquivo `.env` local (chave `anon`/publishable do projeto `bzdpgsfmbbhpqbyugrmg`). Não versionar a chave neste doc — a fonte da verdade é o `.env` (não commitado).

> ⚠️ **Importante**: Após salvar as variáveis, **gere um novo deploy (Redeploy)** da aplicação para recompilar os arquivos estáticos com os novos valores.

---

### Passo 2: Criar a tabela `products_v2` no Supabase da J. Arantes
Acesse o console do projeto no Supabase da J. Arantes e configure a estrutura de dados:

1. Acesse o **[Dashboard do Supabase](https://supabase.com)** no projeto correspondente à J. Arantes (`bzdpgsfmbbhpqbyugrmg`).
2. Abra a aba **SQL Editor** no menu lateral esquerdo.
3. Crie uma nova query (**New Query**), cole o script SQL abaixo e clique em **Run** (Executar):

```sql
-- 1. Criar a tabela products_v2
CREATE TABLE IF NOT EXISTS public.products_v2 (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  "packSize" TEXT,
  ean TEXT,
  "imageUrl" TEXT,
  "isNew" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar RLS (Row Level Security) na tabela
ALTER TABLE public.products_v2 ENABLE ROW LEVEL SECURITY;

-- 3. Criar política que permite leitura pública para visitantes
DROP POLICY IF EXISTS "Allow public read access" ON public.products_v2;
CREATE POLICY "Allow public read access" ON public.products_v2
  FOR SELECT USING (true);

-- 4. Criar política que permite controle total para usuários autenticados (Admin)
DROP POLICY IF EXISTS "Allow all access to authenticated users" ON public.products_v2;
CREATE POLICY "Allow all access to authenticated users" ON public.products_v2
  ALL USING (auth.role() = 'authenticated');
```

---

### Passo 3: Executar a Sincronização dos Produtos
Uma vez que a tabela foi criada e as variáveis de ambiente foram atualizadas no servidor:

1. Acesse a aplicação do Catálogo da J. Arantes (no ambiente de produção atualizado ou localmente em modo de desenvolvimento através do comando `npm run dev`).
2. Navegue até o **Painel Administrativo** (`/admin`).
3. Realize o login e clique no botão **Sincronizar** (ou **Sincronizar Dados**).
4. O sistema irá sincronizar os produtos locais corretos com a nova tabela no Supabase da J. Arantes.
