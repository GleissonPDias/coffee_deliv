# TASK_SPEC.md — Coffee Delivery

**Projeto:** [Projeto Final 05] Coffee Delivery — React + TypeScript + IA
**Relacionado a:** `PRD_SPEC.md` (RF/RN) e `TECH_SPEC.md`

> Criar um checklist de pequenas tarefas em ordem de execução, cada uma com ID, objetivo, requisitos relacionados, arquivos afetados, critério de pronto e status. Ao finalizar cada tarefa, marcar o checklist, registrar teste realizado e realizar commit semântico (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`).

**Legenda de status:** `[ ]` pendente · `[x]` concluída · `[-]` em andamento

---

## Fase 1 — Preparação

### T-01 · Estudar o Figma e identificar telas/estados/componentes
- **Objetivo:** analisar o Figma (Home, Checkout, Checkout preenchido, Sucesso, Style Guide), identificar telas, estados, componentes e fluxos.
- **Requisitos relacionados:** RF-01..RF-16, RN-01..RN-10.
- **Arquivos afetados:** docs de análise (opcional).
- **Critério de pronto:** lista de componentes e referência do Figma documentada.
- **Status:** [ ]

### T-02 · Criar projeto Vite React + TypeScript
- **Objetivo:** inicializar o projeto com Vite + React + TS, configurar Git, dependências, rotas e estrutura de pastas.
- **Requisitos relacionados:** RNF (manutenibilidade).
- **Arquivos afetados:** `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`.
- **Critério de pronto:** aplicação inicial executando (`npm run dev`) e primeiro commit.
- **Status:** [ ]

### T-03 · Configurar estrutura de pastas e dependências
- **Objetivo:** criar pastas `components`, `pages`, `contexts`, `reducers`, `hooks`, `data`, `types`, `schemas`, `utils`, `styles`, `tests`, `assets`; instalar React Router, RHF+Zod, styled-components (ou Tailwind).
- **Requisitos relacionados:** RF-07, RN-08.
- **Arquivos afetados:** `src/**`, `package.json`.
- **Critério de pronto:** estrutura criada e dependências instaladas; build sem erros.
- **Status:** [ ]

### T-04 · Escrever/validar SPECs e AGENTS.md
- **Objetivo:** finalizar `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASK_SPEC.md` e `AGENTS.md`; manter atualizados.
- **Requisitos relacionados:** RNF (documentação).
- **Arquivos afetados:** `docs/*`, `AGENTS.md`.
- **Critério de pronto:** documentos versionados no GitHub.
- **Status:** [ ]

---

## Fase 2 — Branding e tokens

### T-05 · Criar logo com IA e identidade visual
- **Objetivo:** gerar logo original com IA, definir conceito, paleta, tipografia, variações light/dark; salvar em `src/assets/` ou `public/`; preparar favicon.
- **Requisitos relacionados:** RF-16.
- **Arquivos afetados:** `src/assets/*`, `public/favicon.*`, README/SPEC (seção Branding com IA).
- **Critério de pronto:** logo presente, nítida, documentada (ferramenta, prompt, resultado, motivos).
- **Status:** [ ]

### T-06 · Definir tokens de tema (light/dark)
- **Objetivo:** criar variáveis semânticas para background, surface, text, border, button, feedback, estados; aplicar via ThemeProvider.
- **Requisitos relacionados:** RF-14, RN (tema).
- **Arquivos afetados:** `src/styles/*`, `src/contexts/ThemeProvider*`, `src/hooks/useTheme*`.
- **Critério de pronto:** tokens aplicados e contraste legível nos dois temas.
- **Status:** [ ]

### T-07 · Configurar tipografia (Baloo 2 / Roboto ou equivalente)
- **Objetivo:** carregar fontes e aplicar aos títulos/textos.
- **Requisitos relacionados:** referências Figma.
- **Arquivos afetados:** `src/styles/*`, `index.html`.
- **Critério de pronto:** tipografia aplicada conforme identidade.
- **Status:** [ ]

---

## Fase 3 — Tipos, dados e estado

### T-08 · Criar tipos (`Coffee`, `CartItem`, `DeliveryAddress`, `PaymentMethod`, `Order`)
- **Objetivo:** definir interfaces/tipos em `src/types/`.
- **Requisitos relacionados:** RNF (tipagem), RF-01, RF-08, RF-09, RF-12.
- **Arquivos afetados:** `src/types/*.ts`.
- **Critério de pronto:** tipos compilando sem `any`.
- **Status:** [ ]

### T-09 · Criar catálogo de cafés (dados locais tipados)
- **Objetivo:** montar array tipado de cafés (imagem, nome, descrição, preço em centavos, categoria).
- **Requisitos relacionados:** RF-01, RN-08.
- **Arquivos afetados:** `src/data/*.ts`.
- **Critério de pronto:** catálogo renderizável na Home.
- **Status:** [ ]

### T-10 · Implementar reducer do carrinho + Context API
- **Objetivo:** criar ações `ADD_ITEM`, `INCREMENT`, `DECREMENT`, `REMOVE_ITEM`, `CLEAR_CART` com atualização imutável; prover contexto.
- **Requisitos relacionados:** RF-03, RF-05, RF-13, RN-01, RN-02.
- **Arquivos afetados:** `src/reducers/*`, `src/contexts/CartProvider*`.
- **Critério de pronto:** ações funcionando sem mutação direta.
- **Status:** [ ]

### T-11 · Implementar Hooks (`useCart`, `useLocalStorage`)
- **Objetivo:** consumir contexto e persistir dados.
- **Requisitos relacionados:** RF-06, RN-06.
- **Arquivos afetados:** `src/hooks/*`.
- **Critério de pronto:** carrinho persiste após refresh.
- **Status:** [ ]

---

## Fase 4 — Home

### T-12 · Criar layout base (`PageLayout`, `Header`, `ThemeToggle`)
- **Objetivo:** estrutura de página, Header com logo e badge, botão de tema acessível.
- **Requisitos relacionados:** RF-04, RF-14, RF-16.
- **Arquivos afetados:** `src/components/PageLayout*`, `Header*`, `ThemeToggle*`.
- **Critério de pronto:** Header renderizado com badge e toggle.
- **Status:** [ ]

### T-13 · Implementar `CoffeeCard` e `CoffeeCatalog`
- **Objetivo:** card com imagem, nome, descrição, preço, categoria, seletor de quantidade e botão adicionar.
- **Requisitos relacionados:** RF-01, RF-02.
- **Arquivos afetados:** `src/components/CoffeeCard*`, `CoffeeCatalog*`, `QuantityInput*`.
- **Critério de pronto:** produtos aparecem corretamente na Home.
- **Status:** [ ]

### T-14 · Página Home (hero + catálogo)
- **Objetivo:** montar Home com hero e catálogo responsivo.
- **Requisitos relacionados:** RF-01, RF-15.
- **Arquivos afetados:** `src/pages/Home*`.
- **Critério de pronto:** Home funcional em desktop/mobile.
- **Status:** [ ]

---

## Fase 5 — Carrinho

### T-15 · Implementar `CartItem`, `CartSummary`, `EmptyCart`
- **Objetivo:** item com +/- e remover; resumo; estado vazio.
- **Requisitos relacionados:** RF-05, RF-10, RN-09.
- **Arquivos afetados:** `src/components/CartItem*`, `CartSummary*`, `EmptyCart*`.
- **Critério de pronto:** edição atualiza totais imediatamente.
- **Status:** [ ]

### T-16 · Badge do Header (soma de unidades)
- **Objetivo:** contador representa soma das quantidades.
- **Requisitos relacionados:** RF-04.
- **Arquivos afetados:** `src/components/CartBadge*` / `Header*`.
- **Critério de pronto:** badge correto.
- **Status:** [ ]

### T-17 · Persistência do carrinho (`localStorage`)
- **Objetivo:** salvar/recuperar carrinho; testar refresh.
- **Requisitos relacionados:** RF-06, RN-06.
- **Arquivos afetados:** `src/hooks/useLocalStorage*`, `CartProvider`.
- **Critério de pronto:** dados recuperados após atualizar a página.
- **Status:** [ ]

---

## Fase 6 — Checkout

### T-18 · Schema Zod + formulário de endereço
- **Objetivo:** validar CEP, rua, número, complemento (opcional), bairro, cidade, UF.
- **Requisitos relacionados:** RF-08, RF-11, RN-07.
- **Arquivos afetados:** `src/schemas/*`, `src/components/DeliveryAddressForm*`.
- **Critério de pronto:** validação funcionando com mensagens acessíveis.
- **Status:** [ ]

### T-19 · Integração com API pública de CEP (ViaCEP ou similar)
- **Objetivo:** auto-preencher rua, bairro, cidade, UF; tratar loading/erro/não encontrado.
- **Requisitos relacionados:** RF-08, RN-07, RN-08.
- **Arquivos afetados:** `src/hooks/useCep*`, `DeliveryAddressForm`.
- **Critério de pronto:** CEP válido preenche campos; erros exibidos.
- **Status:** [ ]

### T-20 · Seletor de forma de pagamento
- **Objetivo:** crédito/débito/dinheiro; obrigatório; apenas informativo.
- **Requisitos relacionados:** RF-09, RN-05.
- **Arquivos afetados:** `src/components/PaymentMethodSelector*`.
- **Critério de pronto:** opção válida exigida.
- **Status:** [ ]

### T-21 · Resumo financeiro (subtotal, entrega, total)
- **Objetivo:** calcular e exibir valores em BRL.
- **Requisitos relacionados:** RF-10, RN-03, RN-04.
- **Arquivos afetados:** `src/utils/*`, `CartSummary*`.
- **Critério de pronto:** valores consistentes e formatados.
- **Status:** [ ]

### T-22 · Bloqueio de confirmação (carrinho vazio / formulário inválido)
- **Objetivo:** desabilitar CTA e feedback acessível.
- **Requisitos relacionados:** RF-11, RN-10.
- **Arquivos afetados:** `src/pages/Checkout*`.
- **Critério de pronto:** não confirma pedido inválido/vazio.
- **Status:** [ ]

### T-23 · Página Checkout
- **Objetivo:** montar Checkout (itens + endereço + pagamento + resumo + CTA).
- **Requisitos relacionados:** RF-05, RF-07, RF-08, RF-09, RF-10, RF-11.
- **Arquivos afetados:** `src/pages/Checkout*`.
- **Critério de pronto:** fluxo de checkout utilizável.
- **Status:** [ ]

---

## Fase 7 — Sucesso

### T-24 · Confirmar pedido (snapshot) e limpar carrinho
- **Objetivo:** gerar `Order` snapshot, salvar para exibição, limpar carrinho.
- **Requisitos relacionados:** RF-12, RF-13, RN-06.
- **Arquivos afetados:** `src/pages/Checkout*`, `src/pages/Success*`, estado/contexto.
- **Critério de pronto:** sucesso mostra dados corretos mesmo com carrinho esvaziado.
- **Status:** [ ]

### T-25 · Página Success
- **Objetivo:** exibir confirmação com endereço e forma de pagamento; estado vazio se não houver pedido.
- **Requisitos relacionados:** RF-12, RN-09.
- **Arquivos afetados:** `src/pages/Success*`.
- **Critério de pronto:** resumo correto na tela de sucesso.
- **Status:** [ ]

---

## Fase 8 — Rotas e navegação

### T-26 · Configurar React Router (`/`, `/checkout`, `/success`)
- **Objetivo:** rotas sem recarregamento completo.
- **Requisitos relacionados:** RF-07.
- **Arquivos afetados:** `src/App.tsx`, `src/main.tsx`.
- **Critério de pronto:** navegação funcionando.
- **Status:** [ ]

---

## Fase 9 — Tema e responsividade

### T-27 · Dark mode completo + persistência
- **Objetivo:** toggle acessível, tokens nos dois temas, persistência, fallback `prefers-color-scheme`.
- **Requisitos relacionados:** RF-14, RN (tema).
- **Arquivos afetados:** `ThemeProvider`, `useTheme`, estilos.
- **Critério de pronto:** tema aplicado a todas as telas e persistido.
- **Status:** [ ]

### T-28 · Responsividade mobile-first
- **Objetivo:** adaptar grid, formulário, carrinho; testar 320/375/390/768/1280/1440.
- **Requisitos relacionados:** RF-15, RNF (responsividade).
- **Arquivos afetados:** estilos/componentes.
- **Critério de pronto:** sem overflow; fluxo utilizável em telas pequenas.
- **Status:** [ ]

### T-29 · Acessibilidade (teclado, labels, foco, WCAG 2.2 AA)
- **Objetivo:** garantir navegação por teclado, labels, erros perceptíveis, foco visível.
- **Requisitos relacionados:** RNF (acessibilidade).
- **Arquivos afetados:** componentes.
- **Critério de pronto:** checklist de acessibilidade atendido.
- **Status:** [ ]

---

## Fase 10 — Qualidade

### T-30 · Testes de lógica/validação
- **Objetivo:** testar reducer, cálculos, formatação, schema Zod.
- **Requisitos relacionados:** RF-03, RF-10, RF-08, RN-03, RN-04.
- **Arquivos afetados:** `src/tests/*`.
- **Critério de pronto:** testes passando.
- **Status:** [ ]

### T-31 · Testes de fluxos principais (UI/E2E opcional)
- **Objetivo:** demonstrar fluxos (adicionar, editar, checkout, sucesso, persistência).
- **Requisitos relacionados:** RF-01..RF-16.
- **Arquivos afetados:** `src/tests/*`, Playwright (extras).
- **Critério de pronto:** fluxos demonstrados.
- **Status:** [ ]

### T-32 · Revisão de console, lint e build
- **Objetivo:** sem erros no console; build ok.
- **Requisitos relacionados:** RNF.
- **Arquivos afetados:** todo o projeto.
- **Critério de pronto:** `npm run build` sem erros.
- **Status:** [ ]

---

## Fase 11 — Entrega

### T-33 · Atualizar SPECs e README (screenshots, evidências de IA)
- **Objetivo:** documentar stack, instalação, scripts, decisões, screenshots desktop/mobile, dark mode, link Figma, logo/branding, evidências de IA (≥3).
- **Requisitos relacionados:** RF-16, RNF (docs).
- **Arquivos afetados:** `README.md`, `docs/*`.
- **Critério de pronto:** README completo.
- **Status:** [ ]

### T-34 · Publicar aplicação (Vercel/Netlify)
- **Objetivo:** deploy e link público.
- **Requisitos relacionados:** RNF (compatibilidade).
- **Arquivos afetados:** config de deploy.
- **Critério de pronto:** link publicado funcionando.
- **Status:** [ ]

### T-35 · Capturas de tela e demonstração
- **Objetivo:** capturas de Home, Checkout, Sucesso, Dark Mode (mobile) + breve demo do fluxo.
- **Requisitos relacionados:** RNF (evidências).
- **Arquivos afetados:** `docs/` ou README.
- **Critério de pronto:** evidências disponíveis.
- **Status:** [ ]

---

## Desafios extras (opcionais)

- [ ] Busca por nome e filtro por categoria.
- [ ] Histórico de pedidos fictícios local.
- [ ] Cupom de desconto com regras e testes.
- [ ] Testes E2E com Playwright + CI (GitHub Actions).
- [ ] Animações discretas respeitando `prefers-reduced-motion`.
- [ ] Tela de detalhes de produto ou acessibilidade ampliada.

---

*Fonte: Notion — [Projeto Final 05] Coffee Delivery — React + TypeScript + IA (seções 7, 9 e 10).*
