# AI_USAGE.md — Registro de Uso de IA

Projeto: Coffee Delivery (projeto final da disciplina SPA).
Assistente utilizado: OpenCode (agente de IA) com Context7 MCP e Playwright/Browser MCP.

---

## Interação 1 — Elaboração e revisão dos documentos SPEC

- **Objetivo:** Criar `PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md` e `AGENTS.md` a partir da página do Notion do projeto.
- **Prompt (resumido):** "Acesse o link do Notion e leia tudo, para montar os docs TECH_SPEC.md, TASK_SPEC.md, PRD_SPEC.md e AGENTS.md."
- **Resposta resumida:** A IA leu a página inteira (rolando o scroller virtualizado do Notion) e extraiu seções 1–13, gerando os quatro documentos com requisitos RF-01..RF-16, RN-01..RN-10, stack, arquitetura, tarefas e diretrizes.
- **Decisão tomada:** Aceitar a estrutura proposta, ajustando nomes de arquivo (`TASK_SPEC.md` + alias `TASKS_SPEC.md`) para compatibilidade com a rubrica.
- **Evidência:** Commits `docs: add PRD_SPEC, TECH_SPEC, TASK_SPEC and AGENTS.md` (23dc9ae) e arquivos em `docs/`.

## Interação 2 — Sugestão de arquitetura e componentes

- **Objetivo:** Definir a arquitetura React + TypeScript (Context API, useReducer, Hooks, Zod) antes de codificar.
- **Prompt (resumido):** "Atue como mentor de React e TypeScript... identifique requisitos, dependências, componentes e riscos. Proponha apenas a próxima tarefa pequena."
- **Resposta resumida:** A IA sugeriu separação em `types/`, `data/`, `components/`, `pages/`, `contexts/`, `reducers/`, `hooks/`, `schemas/`, `utils/`, `styles/`, `tests/`, com Context API + useReducer para o carrinho e React Hook Form + Zod para o formulário.
- **Decisão tomada:** Adotar a arquitetura sugerida; escolher Tailwind CSS em vez de styled-components (registrado no `TECH_SPEC.md`).
- **Evidência:** Estrutura de pastas criada; commits `chore: scaffold...`, `feat: add domain types...`, etc.

## Interação 3 — Conceito de logo e identidade visual (IA)

- **Objetivo:** Criar uma logo original com auxílio de IA (requisito obrigatório).
- **Prompt (resumido):** "A modern, minimalist logo for a coffee delivery brand named 'Coffee Delivery'. Flat design, a stylized coffee cup with steam and a subtle delivery/motion swoosh, warm yellow (#c47f17) and purple (#4b2995) color palette on a clean white background, vector-like, suitable for web header and favicon..."
- **Resposta resumida:** Tentativa de geração de imagem via `experimental_image_generate` falhou por credenciais inválidas; também tentado `figma.weave_find_model` (Weave não vinculado). A IA orientou entregar a logo como SVG autoral seguindo o conceito do prompt.
- **Decisão tomada:** Criar `src/assets/logo.svg` e `public/favicon.svg` manualmente, coerentes com o prompt (xícara + tipografia Baloo 2/Roboto, paleta amarelo + roxo), e documentar a tentativa de IA no README (seção "Branding com IA").
- **Evidência:** Arquivos `src/assets/logo.svg`, `public/favicon.svg`; seção Branding no `README.md`.

## Interação 4 — Revisão e depuração de código

- **Objetivo:** Depurar validação de CEP, persistência, toast e responsividade.
- **Prompt (resumido):** Iterações de correção (ex.: "alguns produtos sem fotos", "falta padding", "botão de + roxo mude para ícone de carrinho e toast").
- **Resposta resumida:** A IA identificou URLs 404 do Unsplash e substituiu por imagens do Figma (consistentes); corrigiu o auto-preenchimento de CEP (disparo via `onChange`); adicionou `ToastContext`/`Toast`; ajustou padding responsivo; corrigiu `vite.config.ts` para usar `defineConfig` do `vitest/config`.
- **Decisão tomada:** Aplicar as correções; adicionar testes Vitest para reducer e cálculos; capturar screenshots via Browser MCP.
- **Evidência:** Commits `fix:`, `style:`, `test:`, `docs:`; arquivos em `src/tests/` e `docs/screenshots/`.

---

**Ferramentas de IA utilizadas:**
- OpenCode (agente de IA) — planejamento, desenvolvimento, revisão, depuração.
- Context7 MCP — consulta de documentação de bibliotecas.
- Browser MCP — testes e captura de screenshots.
- Figma MCP — inspeção do design (tokens, frames, assets).
- Tentativa de geração de imagem (indisponível por credenciais).