# Carlos Franco — Órbita

Portfólio de engenharia de software com direção de arte Órbita: tipografia editorial, cor coral, escultura 3D e animações ao longo de toda a experiência.

A aplicação está em [`web/`](web/). A pesquisa e as decisões visuais estão em [`docs/design/direcao-portfolio.md`](docs/design/direcao-portfolio.md).

```powershell
cd web
npm install
npm run dev
```

Para gerar a versão de produção:

```powershell
npm run build
npm run preview
```

Node.js 22.12+ ou 24+ é necessário para a versão de Vite utilizada. Use o endereço mostrado pelo terminal: o Vite escolhe outra porta quando a solicitada está ocupada.

## Conteúdo

- Apresentação como Engenheiro de Software.
- Projetos com detalhes em diálogo acessível e links para repositórios e demonstrações públicas.
- Sobre, formação, competências e trajetória profissional.
- Laboratório com busca local em informações do perfil; não chama uma API de IA.
- Contato com cópia de e-mail e links reais.
- Currículo em `/curriculo`, com impressão e opção de salvar PDF pelo navegador.

## Movimento

React + TypeScript + Vite; Motion para entradas, transições, ponteiro e interações; GSAP/ScrollTrigger para sequências vinculadas à rolagem; Lenis para suavização; Three.js/React Three Fiber para a escultura 3D com material de cobre e partículas.

A animação da cena é pausada fora da área visível e em abas ocultas. O controle no cabeçalho pausa os movimentos; a preferência `prefers-reduced-motion` é respeitada. O canvas tem uma composição alternativa para dispositivos sem suporte.

## Verificação

`npm run typecheck` verifica TypeScript; `npm run build` verifica os tipos e produz os assets. O roteiro `web/scripts/inspect-browser.cjs` usa o Playwright do runtime do Codex para conferir navegação, projetos, foco, busca local, currículo, movimento reduzido e larguras de 320 a 1440 px. Esse roteiro é uma ferramenta do ambiente de autoria, não uma dependência do site.

## Instalação nesta máquina

O disco C: ficou sem espaço durante a primeira instalação. As dependências concluídas estão em `D:/CodexWorkspaces/carlos-franco-orbita-deps/node_modules`, conectadas a `web/node_modules` por uma junção. A tentativa parcial original foi preservada em `D:/CodexWorkspaces/carlos-franco-orbita-deps/node_modules.incomplete`. Uma instalação normal em outra máquina continua sendo `npm install` ou `npm ci` dentro de `web`.
