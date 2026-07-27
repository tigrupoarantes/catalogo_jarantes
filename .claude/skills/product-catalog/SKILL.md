---
name: product-catalog
description: Use ao adicionar, editar, classificar ou remover produtos do catálogo J. Arantes — mexer em src/data/products.ts ou src/data/categoryMappings.ts, lidar com o campo EAN empacotado (ean|ncm|dun|isNew), ou entender por que um produto cai em Seca/Purina/Food/Bebidas/Lançamentos. Gatilhos: "adicionar produto", "cadastrar SKU", "campo ean", "ncm", "dun", "categoria do produto", "isSeca", "isPurina", "lançamento", "categoryMappings".
---

# Skill: Catálogo de produtos

Domínio dos dados de produto deste app. **Reutilize as funções existentes — não reimplemente parse/classificação.**

## Modelo `Product` (`src/data/products.ts`)
```ts
interface Product {
  code: string;      // código interno, ex.: "411201"
  name: string;
  brand: string;
  category: string;
  packSize: string;
  ean: string;       // EMPACOTADO — ver abaixo
  imageUrl?: string | null;
  isNew?: boolean;
}
```

## ⚠️ Campo `ean` empacotado
O `ean` guarda 4 dados: `ean|ncm|dun|isNew` (ex.: `7891000120101|0401.50.29|17891000012014|false`).
- **Ler:** `parseProductTechnicalData(product)` → `{ ean, ncm, dun, isNew }`.
- **Gravar:** `serializeProductTechnicalData(ean, ncm, dun, isNew)` → string empacotada.
- Nunca faça `.split("|")` ou concatenação manual espalhada pelo código.

## Classificação de categoria (`src/data/categoryMappings.ts`)
Cada categoria = `Set` de códigos + predicados por marca/keyword:
- `isPurinaProduct(p)`, `isFoodProduct(p)`, `isBebidasProduct(p)` — testam código (`isCodeInCategory`), marca e keywords.
- `isSecaProduct(p)` — **por exclusão**: verdadeiro se NÃO for Purina, Food nem Bebidas.
- `isLancamento(code)` — pertence a `lancamentosProductCodes`.

`isCodeInCategory` normaliza o código (remove zeros à esquerda) antes de comparar.

## Ao adicionar/mudar produtos
1. Insira o objeto em `products` (`src/data/products.ts`) com `ean` já empacotado via `serializeProductTechnicalData`.
2. Se o produto pertence a Purina/Food/Bebidas/Lançamentos, **adicione o `code` ao `Set` correspondente** em `categoryMappings.ts` (Seca não tem Set próprio — é o resto).
3. `imageUrl`: convenção `/uploads/produtos/<code>.png`; em produção as imagens vêm do bucket Supabase `product-images`.
4. Rode `npm run test` (cobre categoryMappings se houver testes) e `npm run lint`.

## Fontes de dados
Além do seed estático, há Supabase `products_v2` (ver skill `data-sync`). Ao editar em massa, confirme com o usuário qual fonte é a canônica para a tarefa.
