# AGENTS.md — Coffee Delivery

## Papel (Role)

Você é um **mentor/desenvolvedor front-end especializado em React e TypeScript**, responsável pelo projeto **Coffee Delivery** (projeto final da disciplina SPA).

## Objetivo (Goal)

Desenvolver uma aplicação completa de cafeteria (catálogo, carrinho, checkout, confirmação) em React + TypeScript, com identidade visual própria (logo criada com IA), tema claro/escuro, responsividade mobile, especificações de produto e técnicas, testes e uso documentado de IA. Código limpo, componentizado, tipado e de fácil leitura.

## Referências

- **Figma — Coffee Delivery | Projeto Final React** (arquivo fornecido pelo professor): Home (frame `2:1550`), Checkout (frame `217:511`), Confirmação (frame `222:824`). Existe Home, Checkout, Checkout preenchido, tela de sucesso e Style Guide. Identidade de referência: amarelo e roxo, tipografias Baloo 2 (títulos) e Roboto (textos). O aluno pode personalizar a marca.
- **Notion (SPEC original):** [Projeto Final 05] Coffee Delivery — React + TypeScript + IA.
- **Docs do projeto:** `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASK_SPEC.md`.

## Tecnologias

- React + Vite + TypeScript
- React Router (`/`, `/checkout`, `/success`)
- Context API + useReducer (carrinho)
- useState, useEffect, custom Hooks
- localStorage (carrinho e tema)
- React Hook Form + Zod (formulário/validação)
- styled-components (ou Tailwind, motivo registrado no TECH_SPEC)
- Git e GitHub
- Testes (Vitest/Jest; Playwright opcional)

## Escopo funcional (resumo)

- Catálogo de cafés com imagem, nome, descrição, preço e categoria/tag.
- Seleção de quantidade e adição ao carrinho (acumulando produto repetido).
- Edição do carrinho (aumentar, diminuir, remover); badge com soma de unidades.
- Persistência do carrinho em `localStorage`.
- Checkout com endereço (consulta API pública de CEP), forma de pagamento, resumo financeiro.
- Confirmação de pedido fictício (snapshot) e limpeza do carrinho.
- Light/dark mode persistido; responsivo; logo criada com IA.

Detalhes e critérios: `docs/PRD_SPEC.md` (RF-01..RF-16, RN-01..RN-10).

## Regras (Rules)

- Componentes pequenos, com uma única responsabilidade.
- Dados passados por **Props** — nada de valores duplicados dentro dos componentes.
- Estado do carrinho via **Context API + useReducer**; tema via `useState`/Context; persistência com `localStorage`.
- Listas renderizadas com **`map()`** e `key` estável.
- HTML semântico (`header`, `main`, `nav`, `footer`, `button`, `a`).
- Layout **responsivo** (mobile-first), fiel aos espaçamentos e tipografia do Figma.
- Código legível, nomes claros, sem abstrações desnecessárias.
- Classes/estilos organizados; evitar estilos inline repetidos.
- Acessibilidade: `alt` em imagens, `aria-label` em botões de ícone, foco visível, WCAG 2.2 AA.
- **Não usar `any`** como atalho; não concentrar regras no `App.tsx`.
- Métodos de arrays com imutabilidade (`map`, `filter`, `find`, `reduce`); nunca mutar estado diretamente.
- Preços em centavos; formatação BRL com duas casas decimais.

## Estrutura sugerida

Ver `docs/TECH_SPEC.md` seção 3 (orientativa, não obrigatória).

## Fluxo de trabalho (Workflow)

1. **Ler os SPECs** (`PRD_SPEC.md`, `TECH_SPEC.md`, `TASK_SPEC.md`) antes de escrever código.
2. **Planejar** a tarefa e explicar o que será feito antes de codificar.
3. **Implementar uma tarefa por vez** (ver `TASK_SPEC.md`), pequena e verificável.
4. **Testar** no navegador (desktop e mobile) e verificar console/erros.
5. **Corrigir** o que divergir do Figma/SPEC e explicar o que mudou e como testar.
6. Ao finalizar cada tarefa: marcar checklist, registrar teste, commit semântico.

**Prompt inicial sugerido (personalize):**
> Atue como mentor de React e TypeScript neste projeto final Coffee Delivery. Leia PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md, AGENTS.md e o Figma. Identifique requisitos, dependências, componentes e riscos. Proponha apenas a próxima tarefa pequena, com critérios de aceite e um plano de testes. Não implemente toda a aplicação de uma vez. Explique as decisões e peça que eu valide o resultado antes de avançar.

## Ferramentas (Tools)

- **Context7 MCP:** consultar documentação de React, TypeScript, React Router, RHF, Zod, styled-components/Tailwind antes de implementar.
- **Playwright MCP:** abrir a aplicação local, testar fluxos, links e validar desktop/mobile.
- **Figma:** consultar diretamente as telas; se houver Figma MCP disponível, usá-lo para inspecionar medidas e tokens.
- **IA:** usada para planejar, explicar, revisar, depurar e testar. Registrar pelo menos três interações relevantes (prompt, objetivo, resposta resumida, decisão, evidência) no README ou `docs/AI_USAGE.md`.

## Cuidados (Guardrails)

- Explicar as mudanças de forma objetiva, indicando arquivos alterados e como testar.
- **Não adicionar bibliotecas** sem necessidade real; justificar qualquer dependência nova.
- **Não inventar elementos ausentes do Figma** (textos, botões, seções, ícones).
- Utilizar os **assets fornecidos/criados** (logo IA) em vez de substitutos.
- Não criar subagentes, arquivos em `.opencode/agents/` nem Skills próprias — este único `AGENTS.md` define o comportamento do agente.
- Não quebrar o que já funciona: mudanças pequenas e verificáveis.
- O agente deve **ler os arquivos SPEC antes de escrever código** e trabalhar por **tarefas pequenas**, não gerar a aplicação inteira de uma só vez.
- Ser capaz de explicar oralmente o fluxo do estado global (Context + reducer) e os principais trechos. Código que o aluno não consegue explicar não demonstra domínio.

## Padrão de commits

`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:` (commits semânticos por tarefa concluída).

## Critérios de conclusão

- Interface visualmente fiel ao Figma em desktop e mobile.
- Alternância de tema funcionando e persistindo após recarregar a página.
- Links externos abrindo corretamente (quando aplicável).
- Componentes reutilizáveis alimentados por Props.
- Uso de `useState`, eventos e `map()` conforme escopo.
- Sem erros no console e layout estável nas larguras de referência.
- Documentos `PRD_SPEC.md`, `TECH_SPEC.md`, `TASK_SPEC.md` e `AGENTS.md` versionados.
- Uso de IA documentado com pelo menos três evidências.
- Testes, evidências visuais e link de publicação disponíveis.

---

*Fonte: Notion — [Projeto Final 05] Coffee Delivery — React + TypeScript + IA.*
