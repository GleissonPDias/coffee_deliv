# Coffee Delivery

Aplicação de e-commerce de cafeteria (catálogo, carrinho, checkout e confirmação de pedido) desenvolvida como projeto final da disciplina **Single Page Application (SPA)**.

## Objetivos

- Consolidar React, TypeScript, componentes, Props, Hooks, Context API, useReducer, imutabilidade, rotas, formulários, persistência local, estilização, boas práticas, testes e documentação.
- Planejar antes de implementar; transformar protótipo em componentes; modelar estados e regras de negócio.
- Construir fluxo completo de SPA (Home → Checkout → Sucesso) com tema claro/escuro e responsividade mobile.
- Utilizar IA de forma crítica (logo, SPEC, arquitetura, revisão) e documentar o uso.

## Decisões

- **Estilização:** Tailwind CSS (em vez de styled-components do desafio original) — produtividade e consistência de tokens; registrado no `TECH_SPEC.md`.
- **Frete:** valor fixo fictício de R$ 3,50 (350 centavos), definido em `src/utils/money.ts`.
- **Quantidade no carrinho:** decrementar de 1 para 0 remove o item.
- **Validação de CEP:** ViaCEP; auto-preenchimento de rua, bairro, cidade e UF; número e complemento manuais.
- **Pagamento:** apenas informativo (crédito, débito, dinheiro), sem transação real.
- **Pedido:** snapshot independente do carrinho (preservado após limpar o carrinho).
- **Preços:** armazenados em centavos; formatação BRL com duas casas decimais.

## Stack

- React + Vite + TypeScript
- React Router (`/`, `/checkout`, `/success`)
- Context API + useReducer (carrinho)
- React Hook Form + Zod (formulário e validação)
- Tailwind CSS (estilização) — escolhido por produtividade e consistência de tokens; registrado no `TECH_SPEC.md`
- localStorage (carrinho e tema)

## Instalação

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview do build
- `npm run lint` — lint

## Estrutura

Ver `docs/TECH_SPEC.md` (seção 3).

## Documentação

- `docs/PRD_SPEC.md` — requisitos de produto (RF-01..RF-16, RN-01..RN-10)
- `docs/TECH_SPEC.md` — especificação técnica
- `docs/TASK_SPEC.md` / `docs/TASKS_SPEC.md` — plano de tarefas
- `AGENTS.md` — diretrizes para o assistente de IA

## Figma

Referência: arquivo "Coffee Delivery | Projeto Final React" (Home frame 2:1550, Checkout 217:511, Confirmação 222:824). Identidade de referência: amarelo e roxo, tipografias Baloo 2 e Roboto.

## Branding com IA

- **Ferramenta utilizada:** geração de imagem por IA (tentativa via assistente; credenciais de imagem indisponíveis neste ambiente).
- **Prompt utilizado:**
  > "A modern, minimalist logo for a coffee delivery brand named 'Coffee Delivery'. Flat design, a stylized coffee cup with steam and a subtle delivery/motion swoosh, warm yellow (#c47f17) and purple (#4b2995) color palette on a clean white background, vector-like, suitable for web header and favicon, no photorealism, crisp edges, centered composition, brand name 'Coffee Delivery' in a friendly rounded sans-serif font below the icon."
- **Resultado:** logo entregue como `src/assets/logo.svg` e favicon `public/favicon.svg`, seguindo o conceito do prompt (xícara de café + tipografia Baloo 2/Roboto, paleta amarelo + roxo), legível em dimensões reduzidas.
- **Motivos da escolha:** paleta quente (café) contrastando com roxo (entrega/movimento); tipografia amigável e legível em tamanhos pequenos; formato SVG escalável e sem imagens quebradas.

## Demonstração do fluxo de compra

Fluxo completo: Home → adicionar cafés ao carrinho → Checkout (endereço com auto-preenchimento por CEP + forma de pagamento) → Confirmação do pedido. Pode ser gravado localmente com o app em execução (`npm run dev`) em http://localhost:5173.

## Screenshots

### Desktop

| Home (Light) | Home (Dark) |
|---|---|
| ![Home Light](docs/screenshots/home-light.jpg) | ![Home Dark](docs/screenshots/home-dark.jpg) |

| Checkout | Sucesso |
|---|---|
| ![Checkout](docs/screenshots/checkout.jpg) | ![Sucesso](docs/screenshots/success.jpg) |

### Mobile

| Home (Light) | Home (Dark) | Checkout | Sucesso |
|---|---|---|---|
| ![Mobile Home](docs/screenshots/mobile-home.jpg) | ![Mobile Dark](docs/screenshots/mobile-dark.jpg) | ![Mobile Checkout](docs/screenshots/mobile-checkout.jpg) | ![Mobile Success](docs/screenshots/mobile-success.jpg) |

## Tema e responsividade

- Light/dark mode com toggle no Header, persistido em `localStorage`, fallback `prefers-color-scheme`.
- Mobile-first; testado em 320/375/390/768/1280/1440 px.

## Uso de IA (evidências)

1. Elaboração/revisão dos documentos SPEC (`docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASK_SPEC.md`) e `AGENTS.md`.
2. Sugestão de arquitetura (Context API + useReducer, Hooks, Zod) e componentes.
3. Geração do conceito de logo e paleta (prompt documentado acima).
4. Revisão/depuração de código (ex.: validação de CEP, persistência).

## Deploy

Aplicação publicada em: **https://coffee-deliv.vercel.app**

Build: `npm run build` (output `dist/`). Hospedagem: Vercel.
