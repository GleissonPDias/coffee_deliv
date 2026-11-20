# TECH_SPEC.md — Coffee Delivery

**Projeto:** [Projeto Final 05] Coffee Delivery — React + TypeScript + IA
**Relacionado a:** `PRD_SPEC.md` (requisitos RF-01..RF-16, RN-01..RN-10)

---

## 1. Stack e justificativa

| Tecnologia/conceito | Aplicação esperada |
|---|---|
| React + Vite + TypeScript | SPA, componentes TSX e tipagem forte |
| React Router | Rotas `/`, `/checkout` e `/success` |
| Context API + useReducer | Estado global e ações do carrinho |
| useState, useEffect e custom Hooks | Estado local, persistência, tema e lógica reutilizável |
| localStorage | Carrinho e preferência de tema |
| React Hook Form + Zod | Formulário de endereço e validação |
| styled-components | Estilização baseada no desafio de origem; **Tailwind CSS** pode ser alternativa, desde que o motivo esteja registrado neste TECH_SPEC |
| Métodos de arrays + imutabilidade | `map`, `filter`, `find`, `reduce`; nunca alterar diretamente o estado |
| Git e GitHub | Histórico de implementação e versionamento |
| Testes | Testes de lógica/validação e demonstração dos fluxos principais |

**Justificativas:**

- **Vite** oferece dev server rápido e build otimizado para SPA React.
- **TypeScript** garante tipagem de `Coffee`, `CartItem`, `DeliveryAddress`, `PaymentMethod`, `Order`, reduzindo erros.
- **React Router** permite navegação sem recarregamento completo (RF-07).
- **Context API + useReducer** centraliza estado do carrinho e torna ações previsíveis/imutáveis.
- **React Hook Form + Zod** simplifica formulários performáticos com validação declarativa (RF-08).
- **styled-components (ou Tailwind)**: tokens de tema aplicados via CSS variables; manter consistência. Registrar a escolha final.

---

## 2. Arquitetura da SPA

Padrão arquitetural esperado: **separar dados de catálogo, tipos, componentes, páginas, contextos, reducer, Hooks, utilitários, estilos e testes.** Não concentrar todas as regras no `App.tsx` e não usar `any` como atalho.

### 2.1 Responsabilidades

- **`data/`** — catálogo de cafés (arquivo local tipado) — RN-08.
- **`types/`** — interfaces/tipos (`Coffee`, `CartItem`, `DeliveryAddress`, `PaymentMethod`, `Order`).
- **`components/`** — UI reutilizável (Header, ThemeToggle, CoffeeCard, QuantityInput, CartItem, CartSummary, DeliveryAddressForm, PaymentMethodSelector, EmptyCart, PageLayout...).
- **`pages/`** — Home, Checkout, Success.
- **`contexts/`** — `CartProvider`, `ThemeProvider`.
- **`reducers/`** — ações e atualização imutável do carrinho.
- **`hooks/`** — `useCart`, `useTheme`, `useLocalStorage`, `useCep`...
- **`schemas/`** — Zod do checkout.
- **`utils/`** — formatação (BRL) e cálculos (subtotal, total).
- **`styles/`** — temas/tokens/estilos globais.
- **`tests/`** — testes automatizados.

### 2.2 Componentes sugeridos

`Header`, `ThemeToggle`, `CoffeeCard`, `CoffeeCatalog`, `QuantityInput`, `CartBadge`, `CartItem`, `CartSummary`, `DeliveryAddressForm`, `PaymentMethodSelector`, `OrderSuccess`, `EmptyCart`, `PageLayout`.

---

## 3. Estrutura de diretórios (orientativa)

```
coffee-delivery/
├── public/
├── src/
│   ├── assets/                 # Logo criada com IA e imagens
│   ├── components/             # UI reutilizável
│   ├── pages/                  # Home, Checkout, Success
│   ├── contexts/               # CartProvider e ThemeProvider
│   ├── reducers/               # Ações e atualização imutável
│   ├── hooks/                  # useCart, useTheme, useLocalStorage...
│   ├── data/                   # Catálogo de cafés
│   ├── types/                  # Tipos/interfaces
│   ├── schemas/                # Zod do checkout
│   ├── utils/                  # Formatação e cálculos
│   ├── styles/                 # Temas/tokens/estilos
│   ├── tests/                  # Testes automatizados
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── PRD_SPEC.md
│   ├── TECH_SPEC.md
│   └── TASKS_SPEC.md (ou TASK_SPEC.md)
├── AGENTS.md
└── README.md
```

> Observação: o exemplo mostra responsabilidades de pastas, não uma implementação obrigatória. O aluno pode propor outra organização, desde que a documente e mantenha boa separação de responsabilidades.

---

## 4. Tipos / interfaces

### 4.1 Coffee

```ts
interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;        // em centavos (RN-04)
  image: string;
  category: string;     // tag/categoria
}
```

### 4.2 CartItem

```ts
interface CartItem {
  coffee: Coffee;
  quantity: number;     // inteiro positivo
}
```

### 4.3 DeliveryAddress

```ts
interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;  // opcional (RN-07)
  neighborhood: string;
  city: string;
  state: string;        // UF
}
```

### 4.4 PaymentMethod

```ts
type PaymentMethod = "credit" | "debit" | "cash";
```

### 4.5 Order (snapshot)

```ts
interface Order {
  id: string;
  items: CartItem[];          // snapshot no momento da confirmação
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;           // centavos
  deliveryFee: number;        // centavos
  total: number;              // centavos
  createdAt: string;
}
```

> O pedido concluído é um **snapshot independente** do estado atual do carrinho (RN-06, RF-13).

---

## 5. Context API + useReducer (carrinho)

### 5.1 Estado

```ts
interface CartState {
  items: CartItem[];
}
```

### 5.2 Ações

- `ADD_ITEM` — adiciona café ou acumula quantidade (RN-02).
- `INCREMENT` — aumenta quantidade de um item.
- `DECREMENT` — diminui quantidade; de 1 para 0 remove ou impede (RN-01).
- `REMOVE_ITEM` — remove item individualmente (RF-05).
- `CLEAR_CART` — limpa após confirmação (RF-13).

### 5.3 Regras de imutabilidade

- Nunca mutar o estado diretamente; usar `map`, `filter`, `find`, `reduce`.
- Reducer puro, sem efeitos colaterais.

### 5.4 Derivados (selectors)

- `totalItems` = soma das quantidades (RF-04).
- `subtotal` = Σ preço × quantidade (RN-03).
- `total` = subtotal + taxa de entrega (RN-03).

---

## 6. Hooks, eventos e efeitos

- **`useCart`** — consome o contexto do carrinho; expõe ações e derivados.
- **`useTheme`** — alterna tema, persiste em `localStorage`, fallback `prefers-color-scheme` (RF-14).
- **`useLocalStorage`** — hook genérico de persistência (carrinho e tema).
- **`useCep`** — consulta API pública de CEP, trata loading/erro/sucesso (RF-08, RN-07).
- **`useEffect`** — sincronizar carrinho/tema com `localStorage`.
- **Eventos:** `onClick` (adicionar, +/-, remover, toggle tema, confirmar), `onChange` (quantidade, campos, pagamento), `onSubmit` (checkout).

---

## 7. Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Hero + catálogo |
| `/checkout` | Checkout | Carrinho + endereço + pagamento + resumo |
| `/success` | Success | Confirmação do pedido |

Navegação via React Router, sem recarregamento completo (RF-07).

---

## 8. Validação de formulários (Zod)

Campos do endereço: `cep`, `street`, `number`, `complement` (opcional), `neighborhood`, `city`, `state` (UF).

- Schema Zod com validações (CEP formato, campos obrigatórios, UF válida, número).
- React Hook Form integra o schema via resolver.
- Erros exibidos de forma acessível (RF-11).
- CEP consulta API pública; ao retornar dados, preenche `street`, `neighborhood`, `city`, `state`; `number` e `complement` permanecem manuais (RF-08, RN-07).
- Tratar CEP inválido, não encontrado, carregamento e indisponibilidade da API.

Forma de pagamento: obrigatória (RF-09).

---

## 9. Regras de cálculo (RN-03, RN-04)

- Preços armazenados em **centavos** (evita erros de precisão monetária).
- `subtotal = Σ (priceInCents × quantity)`.
- `deliveryFee` = valor fixo fictício definido aqui (ex.: 350 centavos = R$ 3,50). **Definir e não espalhar.**
- `total = subtotal + deliveryFee`.
- Formatação BRL com duas casas decimais via utilitário `formatCurrency` (centavos → "R$ X,XX").

---

## 10. Tema, tokens, breakpoints e acessibilidade

### 10.1 Tema

- Tokens semânticos (CSS variables) para: background, surface, text, border, button, feedback, estados.
- `ThemeProvider` aplica classe/atributo no root; persiste escolha em `localStorage`; fallback `prefers-color-scheme`.
- Todos os componentes (cards, formulários, modais, carrinho, sucesso) respeitam o tema.

### 10.2 Breakpoints (orientativos)

- Mobile: ~375/390 px (e 320 px).
- Tablet: ~768 px.
- Desktop: ~1280/1440 px.

### 10.3 Acessibilidade

- Navegação por teclado, labels associados, erros perceptíveis, foco visível.
- `aria-label` em botões de ícone; `alt` em imagens.
- Referência WCAG 2.2 AA.

---

## 11. Casos de teste

- Lógica: reducer (adicionar/acumular, incrementar, decrementar, remover, limpar), cálculos (subtotal/total), formatação BRL.
- Validação: schema Zod (CEP, campos obrigatórios, UF).
- Fluxos: adicionar mesmo café sem duplicar; badge soma unidades; persistência após refresh; CEP auto-preenche; bloqueio de confirmação com carrinho vazio/inválido; snapshot do pedido após limpar carrinho.
- UI: estados vazios, dark mode, responsividade.

### 11.1 Ferramentas de qualidade

- Lint (ESLint) + formatação (Prettier) se configurados.
- Testes unitários (Vitest/Jest) para lógica/validação.
- Playwright MCP para testes E2E (opcional/extras).

### 11.2 Instruções de execução (a completar no README)

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test` (se configurado)

---

## 12. Referência aos requisitos do PRD

Todos os requisitos funcionais (RF-01..RF-16) e regras de negócio (RN-01..RN-10) do `PRD_SPEC.md` devem ser rastreáveis a componentes, hooks e testes. A `TASKS_SPEC.md`/`TASK_SPEC.md` mapeia cada tarefa aos IDs de requisito.

---

## 13. Decisões técnicas a registrar

- Escolha entre styled-components vs Tailwind (e motivo).
- Valor do frete (centavos).
- Regra de decremento 1→0 (remove vs bloqueia).
- API de CEP escolhida (ViaCEP ou similar).
- Biblioteca de testes (Vitest/Jest) e E2E (Playwright).

---

*Fonte: Notion — [Projeto Final 05] Coffee Delivery — React + TypeScript + IA.*
