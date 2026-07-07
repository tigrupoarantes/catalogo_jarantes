# Instruções para Correção do Banco de Dados e Ambiente do Catálogo J. Arantes

Este documento descreve as etapas necessárias para corrigir o problema onde os produtos da **Chok** (como GTEX URCA, BOMBRIL, RAYOVAC, etc.) aparecem indevidamente no catálogo online da **J. Arantes**.

---

## 🔍 Análise do Problema

1. **Desalinhamento de Credenciais em Produção**:
   * A aplicação da **J. Arantes** em produção (Vercel/Render) está configurada usando o banco de dados do Supabase da **Chok** (`imvrwcaxsapqhogjkalt`).
   * Como resultado, a aplicação busca os 1000 produtos inseridos no banco da Chok e os mescla com os 624 produtos estáticos locais da J. Arantes, totalizando **1624 produtos**.
2. **Inexistência de Tabela no Banco Correto**:
   * O banco de dados correto da J. Arantes (`menzddyttyfjyxamdiqm`) não possui a tabela `products_v2` criada no schema, o que impede a sincronização de funcionar mesmo se as variáveis de ambiente locais forem corrigidas.

---

## 🛠️ Passo a Passo para Solução

### Passo 1: Atualizar as Variáveis de Ambiente na Hospedagem (Vercel ou Render)
Acesse a plataforma onde o catálogo da **J. Arantes** está hospedado (Vercel/Render), acesse as configurações de variáveis de ambiente do projeto (**Settings > Environment Variables**) e substitua as chaves atuais pelas credenciais corretas da J. Arantes:

* **`VITE_SUPABASE_URL`**: 
  `https://menzddyttyfjyxamdiqm.supabase.co`
* **`VITE_SUPABASE_PUBLISHABLE_KEY`**: 
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lbnpkZHl0dHlmanl4YW1kaXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjA5ODgsImV4cCI6MjA5MDUzNjk4OH0.RKHOUodzpM3CIxTjO16C1D3k35R_UEHIP577tYHq42o`

> ⚠️ **Importante**: Após salvar as variáveis, **gere um novo deploy (Redeploy)** da aplicação para recompilar os arquivos estáticos com os novos valores.

---

### Passo 2: Criar a tabela `products_v2` no Supabase da J. Arantes
Acesse o console do projeto no Supabase da J. Arantes e configure a estrutura de dados:

1. Acesse o **[Dashboard do Supabase](https://supabase.com)** no projeto correspondente à J. Arantes (`menzddyttyfjyxamdiqm`).
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
