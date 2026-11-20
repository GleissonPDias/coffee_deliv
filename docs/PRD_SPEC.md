# PRD_SPEC.md — Coffee Delivery

**Projeto:** [Projeto Final 05] Coffee Delivery — React + TypeScript + IA
**Disciplina:** Single Page Application (SPA)
**Modalidade:** projeto final prático
**Referência:** Coffee Delivery
**Entrega:** repositório GitHub, aplicação publicada, documentos SPEC e evidências de validação

---

## 1. Visão geral

O **Coffee Delivery** é um desafio de e-commerce adaptado como projeto final da disciplina SPA. O cliente de uma cafeteria consulta os cafés disponíveis, escolhe quantidades, monta um carrinho, informa o endereço de entrega, seleciona a forma de pagamento e recebe a confirmação de um pedido fictício.

Não há backend, autenticação, banco de dados ou pagamento real. O foco é consolidar React, TypeScript, componentes, Props, Hooks, Context API, useReducer, imutabilidade, manipulação de arrays, rotas, formulários, persistência local, estilização, boas práticas, testes e documentação.

### 1.1 Problema

O cliente de uma cafeteria precisa de uma forma simples de selecionar cafés, ajustar quantidades, revisar o pedido, informar onde receber e confirmar a compra, com feedback claro em cada etapa. O projeto deve demonstrar domínio de SPA moderna em React + TypeScript, incluindo estado global, validação, persistência e temas.

### 1.2 Objetivos

- Planejar antes de implementar.
- Transformar protótipo em componentes reutilizáveis.
- Modelar estados e regras de negócio com tipagem forte.
- Construir fluxo completo de SPA (Home → Checkout → Sucesso).
- Desenvolver interfaces inclusivas e adaptáveis (mobile-first, dark mode, acessibilidade).
- Utilizar IA de forma crítica (logo, SPEC, arquitetura, revisão).
- Testar, versionar, documentar e demonstrar um produto funcional.

### 1.3 Público-alvo

- **Usuário final:** cliente da cafeteria que compra cafés online.
- **Avaliador (professor):** verifica fluxo, arquitetura, fidelidade ao Figma, dark mode, mobile, documentos e uso de IA.

---

## 2. Referências

- **Figma — Coffee Delivery | Projeto Final React** (arquivo fornecido pelo professor).
  - Home — referência visual (frame `2:1550`)
  - Checkout — referência visual (frame `217:511`)
  - Confirmação — referência visual (frame `222:824`)
- No Figma existem: Home, Checkout, Checkout preenchido, tela de sucesso e Style Guide.
- Identidade de referência: amarelo e roxo, tipografias **Baloo 2** (títulos) e **Roboto** (textos).
- O aluno poderá personalizar a marca (nome, logo, paleta), sem remover o fluxo funcional nem comprometer a clareza visual. A nova identidade deve ser coerente nos temas claro e escuro.

---

## 3. Escopo

### 3.1 Funcionalidades (in)

- Catálogo de cafés com imagem, nome, descrição, preço e categoria/tag.
- Seleção de quantidade e adição ao carrinho (acumulando produto repetido).
- Edição do carrinho (aumentar, diminuir, remover item).
- Contador de unidades no Header (soma das quantidades).
- Persistência do carrinho em `localStorage`.
- Navegação Home / Checkout / Sucesso com React Router (sem recarregamento completo).
- Formulário de endereço com validação e consulta a API pública de CEP (ex.: ViaCEP).
- Seleção de forma de pagamento (crédito, débito, dinheiro) — apenas informativa.
- Resumo financeiro (subtotal, taxa de entrega, total).
- Confirmação de pedido fictício com snapshot independente do carrinho.
- Limpeza do carrinho após confirmação.
- Alternância light/dark mode persistida.
- Layout responsivo (mobile-first).
- Logo original criada com auxílio de IA.

### 3.2 Exclusões (out) — o que NÃO será feito

- Backend próprio, API de produtos, banco de dados.
- Autenticação/autorização de usuários.
- Pagamento real ou integração com gateway.
- Painel administrativo, gestão de estoque, histórico de pedidos (exceto como desafio extra).
- Envio de e-mail/SMS de confirmação.

---

## 4. Fluxos de usuário

### 4.1 Fluxo principal

```
Home → (adicionar cafés ao carrinho) → Checkout (endereço + pagamento) → Sucesso (confirmação)
```

- **Home:** hero + catálogo de cafés; cada card permite selecionar quantidade e adicionar ao carrinho; Header exibe badge com total de unidades.
- **Checkout:** lista de itens do carrinho com edição; formulário de endereço (com auto-preenchimento por CEP); seletor de pagamento; resumo financeiro (subtotal, entrega, total); CTA de confirmar pedido (bloqueado se inválido/vazio).
- **Sucesso:** confirmação do pedido fictício com endereço e forma de pagamento (snapshot), mensagem de sucesso; carrinho limpo.

### 4.2 Fluxos alternativos / estados vazios

- Carrinho vazio → mensagem de estado vazio no Checkout; impossível confirmar.
- Confirmação sem pedido válido → mensagem de estado vazio.
- CEP inválido/não encontrado/falha de API → erro acessível, campos editáveis para correção.

---

## 5. Requisitos funcionais (RF)

| ID | Requisito funcional | Critério de aceite |
|---|---|---|
| RF-01 | Exibir catálogo de cafés com imagem, nome, descrição, preço e categoria/tag | Produtos aparecem corretamente na Home |
| RF-02 | Selecionar a quantidade de cada café antes de adicioná-lo | Quantidade inteira positiva e controles funcionais |
| RF-03 | Adicionar café ao carrinho e acumular quantidade de produto repetido | Carrinho apresenta os itens e quantidades corretos |
| RF-04 | Exibir contador de unidades no Header | Contador representa a soma das quantidades, não apenas a quantidade de tipos |
| RF-05 | Aumentar, diminuir e remover individualmente itens do carrinho | Totais e contador atualizados imediatamente |
| RF-06 | Persistir carrinho com `localStorage` | Dados recuperados após atualizar a página |
| RF-07 | Navegar entre Home, Checkout e Confirmação com React Router | Troca de telas sem recarregamento completo |
| RF-08 | Preencher e validar endereço de entrega (CEP, rua, número, complemento opcional, bairro, cidade e UF), consultando obrigatoriamente uma API pública de CEP para preencher os campos disponíveis | Ao informar um CEP válido, rua, bairro, cidade e UF são preenchidos automaticamente conforme os dados retornados pela API; número e complemento permanecem para preenchimento manual. Exibir erros para CEP inválido, não encontrado ou falha da consulta |
| RF-09 | Selecionar uma forma de pagamento: crédito, débito ou dinheiro | Uma opção válida é exigida |
| RF-10 | Exibir subtotal dos produtos, taxa de entrega e total geral | Valores são calculados de forma consistente |
| RF-11 | Impedir finalização com carrinho vazio ou formulário inválido | Usuário recebe feedback acessível |
| RF-12 | Confirmar pedido fictício e mostrar endereço e forma de pagamento | Resumo correto na tela de sucesso |
| RF-13 | Limpar o carrinho após pedido confirmado, preservando os dados do pedido concluído | Sucesso permanece correto mesmo com carrinho esvaziado |
| RF-14 | Alternar entre light mode e dark mode | Tema aplicado a todas as telas e persistido |
| RF-15 | Adaptar layout, componentes, formulário e carrinho para dispositivos móveis | Fluxo completo utilizável em telas pequenas |
| RF-16 | Aplicar logo original desenvolvida com auxílio de IA | Logo integrada ao Header, favicon e documentação da marca |

---

## 6. Regras de negócio (RN)

- **RN-01 — Quantidades:** não permitir quantidade igual a zero ou negativa em uma operação de adição. No carrinho, diminuir de 1 para 0 deve remover o produto ou impedir a redução, conforme regra escolhida e documentada.
- **RN-02 — Produto único:** ao adicionar novamente o mesmo café, atualizar a quantidade do item existente, sem gerar linhas duplicadas.
- **RN-03 — Cálculo:** subtotal = soma de (preço unitário × quantidade); total = subtotal + taxa de entrega. Definir a regra da taxa no SPEC (pode ser um valor fixo fictício), sem deixar valores inconsistentes ou espalhados pelo código.
- **RN-04 — Valores monetários:** exibir em BRL com duas casas decimais; evitar erros de precisão monetária (por exemplo, calculando em centavos).
- **RN-05 — Pagamento:** a escolha é apenas informativa, sem transação financeira real.
- **RN-06 — Persistência:** os dados do carrinho devem sobreviver a um refresh; o pedido concluído deve ser representado por um snapshot independente do estado atual do carrinho.
- **RN-07 — Endereço:** complemento é opcional; demais campos precisam respeitar as validações definidas. É obrigatória a integração com uma API de consulta de CEP (por exemplo, ViaCEP) para preencher automaticamente logradouro, bairro, cidade e estado/UF quando esses dados estiverem disponíveis. O número e o complemento são informados pelo usuário. Tratar CEP inválido, não encontrado, carregamento e indisponibilidade da API, permitindo corrigir o endereço quando necessário.
- **RN-08 — Dados:** o catálogo pode ser carregado de um arquivo local tipado. Uma API própria e um backend não são obrigatórios; a consulta a uma API pública de CEP no checkout é obrigatória.
- **RN-09 — Estados vazios:** apresentar mensagens quando o carrinho não tiver itens e quando a confirmação não tiver um pedido válido.
- **RN-10 — Navegação:** não permitir confirmar a compra enquanto existirem erros de validação ou itens inexistentes.

---

## 7. Requisitos não funcionais (RNF)

- **Acessibilidade:** navegação por teclado, labels associados, mensagens de erro perceptíveis, foco visível, referência WCAG 2.2 AA. `aria-label` em botões de ícone; `alt` em imagens.
- **Responsividade:** mobile-first; testar larguras aproximadas de 375/390 px (celular), 768 px (tablet) e 1280/1440 px (desktop), incluindo pelo menos 320 px quando possível. Sem rolagem horizontal involuntária, sobreposição de textos, imagens deformadas ou botões inacessíveis.
- **Desempenho:** compilação sem erros; carregamento adequado; evitar re-renderizações desnecessárias.
- **Persistência:** carrinho e preferência de tema em `localStorage`; fallback para `prefers-color-scheme` quando não houver escolha salva.
- **Compatibilidade:** navegadores modernos; aplicação publicada (ex.: Vercel/Netlify).
- **Manutenibilidade:** separação de responsabilidades (dados, tipos, componentes, páginas, contextos, reducer, hooks, utils, estilos, testes); sem `any` como atalho; sem concentrar regras no `App.tsx`.

---

## 8. Identidade visual criada com IA (obrigatório)

- O nome comercial pode ser mantido como **Coffee Delivery** ou substituído por marca autoral, desde que o propósito de cafeteria permaneça.
- Utilizar uma ferramenta de geração de imagem/identidade visual com IA para criar pelo menos uma proposta de logo original.
- Definir conceito da marca, paleta de cores, tipografia e variações da logo para fundos claros/escuros.
- Inserir a logo na interface, salvar arquivos em `src/assets/` (ou `public/` conforme uso), preparar favicon e evitar imagens quebradas.
- Criar seção **Branding com IA** no README ou SPEC mostrando ferramenta utilizada, prompt, resultado e motivos da escolha.
- Verificar legibilidade em dimensões reduzidas e os direitos de uso do material gerado.
- A IA é ferramenta de criação; o aluno responde pela curadoria, aplicação e coerência visual. Não é necessário usar a marca/logotipo original do protótipo.

---

## 9. Dark mode e responsividade (obrigatórios)

### 9.1 Tema claro/escuro

- Botão de alternância acessível, preferencialmente no Header.
- Tokens/variáveis semânticas para plano de fundo, superfície, textos, bordas, botões, feedback e estados.
- Contraste legível; distinguir botões, links, foco, erros e elementos selecionados nos dois temas.
- Persistir escolha em `localStorage`, com fallback para preferência do sistema (`prefers-color-scheme`).
- Evitar que apenas a cor de fundo mude: cards, formulários, modais, carrinho e página de sucesso devem respeitar o tema.

### 9.2 Mobile-first e adaptação

- Testar larguras ~375/390 px, 768 px, 1280/1440 px (e 320 px quando possível).
- Grid de produtos em colunas adequadas à largura; endereço e resumo do pedido em coluna no celular.
- Navegação, botões de quantidade, opção de pagamento, campos e CTA confortáveis para toque.
- Sem rolagem horizontal involuntária, sobreposição de textos, imagens deformadas ou botões inacessíveis.

---

## 10. Critérios de aceite gerais

- Interface visualmente fiel ao Figma em desktop e mobile.
- Alternância de tema funcionando e persistindo após recarregar a página.
- Links externos abrindo corretamente (quando aplicável).
- Componentes reutilizáveis alimentados por Props.
- Uso de `useState`, eventos e `map()` conforme escopo.
- Sem erros no console e layout estável nas larguras de referência.
- Documentos `PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md`/`TASK_SPEC.md` e `AGENTS.md` versionados.
- Uso de IA documentado com pelo menos três evidências.

---

## 11. Decisões de produto (a registrar)

- **Frete:** valor fixo fictício (definir no TECH_SPEC, ex.: R$ 3,50 ou R$ 0,00) — não deixar valores inconsistentes/espalhados.
- **Quantidade mínima no carrinho:** diminuir de 1 para 0 remove o item (ou impede redução) — documentar a escolha.
- **Validação de CEP:** ViaCEP (ou similar); tratar inválido/não encontrado/falha.
- **Formas de pagamento:** crédito, débito, dinheiro — apenas informativo.
- **Persistência do pedido:** snapshot independente do carrinho após confirmação.

---

## 12. Desafios extras (opcionais)

- Busca por nome e filtro por categoria de café.
- Histórico de pedidos fictícios local, com detalhes.
- Cupom de desconto com regras documentadas e testes.
- Testes end-to-end com Playwright e CI no GitHub Actions.
- Animações discretas respeitando `prefers-reduced-motion`.
- Tela de detalhes de produto ou acessibilidade ampliada.

> Atenção: extras não substituem os requisitos obrigatórios. Priorize o fluxo principal completo e a qualidade.

---

## 13. Entrega final

- Repositório GitHub público com código-fonte (sem `node_modules`, secrets ou `.env` reais).
- Link da aplicação publicada (ex.: Vercel/Netlify).
- README com objetivos, stack, instalação, scripts, decisões, screenshots desktop/mobile, modo escuro, link do Figma, logo/branding e evidências do uso de IA.
- Repositório contendo `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md` (ou `TASK_SPEC.md`), `AGENTS.md`, código e testes.
- Capturas de tela de Home, Checkout, Sucesso e Dark Mode em mobile, além de breve demonstração do fluxo de compra.
- O professor poderá pedir explicação de arquitetura, reducer, Context API, validação e persistência na apresentação.

---

*Fonte: Notion — [Projeto Final 05] Coffee Delivery — React + TypeScript + IA.*
