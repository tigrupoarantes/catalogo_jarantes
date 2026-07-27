---
name: security-review
description: Use para revisar a segurança deste projeto — segredos/env, controle de acesso (Firestore rules, RLS do Supabase, gate de admin), superfície de upload/API do Express, e vulnerabilidades de dependências (npm audit). Rode antes de commits sensíveis, ao mexer em auth/backend, ou quando pedirem uma "revisão de segurança". Gatilhos: "revisão de segurança", "security review", "segredos", "vazamento de chave", ".env", "RLS", "firestore rules", "npm audit", "vulnerabilidade", "admin", "auth".
---

# Skill: Revisão de segurança (projeto Catálogo J. Arantes)

Checklist específico deste repo. Rode os comandos e reporte achados por severidade — **não** faça mudanças destrutivas sem confirmar.

## 1. Segredos / variáveis de ambiente
- `.env` deve estar **gitignored e não versionado**. Verificar:
  ```bash
  git ls-files | grep -i "\.env"   # deve retornar SOMENTE .env.example
  git check-ignore .env            # deve imprimir ".env"
  ```
- `VITE_*` são **públicas** (embutidas no bundle do cliente). Confirmar que nenhum segredo de servidor (ex.: Supabase `service_role`, chave privada Firebase) está exposto num `VITE_*`. Apenas anon/publishable keys são aceitáveis aqui.
- Procurar segredos hardcoded no código:
  ```bash
  git grep -nE "(service_role|BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{20,})" -- ':!*.example'
  ```

## 2. Controle de acesso
- **Firestore:** revisar `firestore.rules` — regras não podem estar abertas (`allow read, write: if true`).
- **Supabase RLS:** revisar políticas do bucket `product-images` e tabela `products_v2` em `supabase/migrations/`.
- **Gate de admin:** `src/contexts/FirebaseContext.tsx` autoriza admin por **e-mail hardcoded no cliente** — fragilidade conhecida. Recomendar migração para custom claims / allowlist no backend. Qualquer checagem de autorização apenas no cliente é contornável.

## 3. Backend / superfície de API (`server.ts`)
- Uploads (`multer`): conferir **limite de tamanho** e **validação de tipo** de arquivo (`/api/upload`, `/api/upload-image`). Hoje só há `express.json({ limit: '50mb' })` — confirmar limites do multer para evitar abuso.
- **CORS:** validar origens permitidas (não usar `*` em produção com credenciais).
- Rotas `/api/*`: garantir que erros não vazam stack traces em produção.

## 4. Dependências
```bash
npm audit --audit-level=high
```
Registrar o baseline de vulnerabilidades. Atenção aos **dois lockfiles** (`bun.lock` + `package-lock.json`) — auditar o que realmente é instalado; padronizar um gerenciador.

## Saída esperada
Lista de achados: severidade (crítico/alto/médio/baixo), arquivo:linha, descrição, e correção sugerida. Não commitar correções sem aprovação do usuário.
