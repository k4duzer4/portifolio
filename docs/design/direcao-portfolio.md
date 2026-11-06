# Carlos Franco — Engenharia de Software / Órbita

Pesquisa e proposta de 6 de novembro de 2026. Direção escolhida: Órbita. O autor definiu o posicionamento como **Engenheiro de Software** e autorizou a implementação, com animação como prioridade central. A aplicação está em `web/`.

## Objetivo

Apresentar um desenvolvedor para contratação por uma empresa: quem ele é, o que sabe fazer, como resolve problemas e o que já construiu. O público principal são recrutadores, lideranças e equipes técnicas. O site deve permitir que essas pessoas encontrem especialidade, competências, projetos, trajetória, currículo e contato rapidamente, com uma camada de exploração visual para quem quiser ficar mais tempo.

O objetivo confirmado pelo autor é conseguir uma vaga como desenvolvedor em uma empresa. A comunicação e a hierarquia devem refletir essa finalidade: apresentação pessoal e evidências de capacidade técnica. Currículo, GitHub, LinkedIn e e-mail ficam acessíveis desde a primeira tela. Disponibilidade para emprego, senioridade e experiência serão declaradas somente depois de confirmadas.

O projeto estava vazio na inspeção inicial. A primeira entrega foi o estudo visual, separado na visualização desta conversa. Após a escolha de Órbita, a aplicação foi criada com React, TypeScript e Vite, Motion, GSAP, Lenis e Three.js/React Three Fiber.

O currículo enviado pelo autor orientou a personalização. Nome visual proposto: **Carlos Franco**. Nome completo: Carlos Eduardo Amaro de Sousa Franco de Sá. Localização: Patos, Paraíba, Brasil. Contatos: [e-mail](mailto:kadusa09@gmail.com), [GitHub](https://github.com/k4duzer4) e [LinkedIn](https://www.linkedin.com/in/carlosfrancosa/).

Formação declarada: Ciência da Computação na UEPB, de 2022.2 até o presente. Experiências informadas: KNEX Consultoria Júnior e Clair & Leitão Contabilidade Pública. A passagem pela Compass UOL é apresentada como formação prática em Cloud, Dados e IA, conforme as atividades descritas; não se presume um cargo empregatício. Datas profissionais, cargos oficiais, senioridade e disponibilidade ainda precisam ser definidos.

O estudo visual já usa projetos do currículo e repositórios públicos. As capas são ilustrações de design, não capturas dos produtos. O AI Lab continua sendo uma demonstração local simulada. O currículo foi recebido como texto, sem um arquivo PDF para download; sua ação fica identificada como pendente no estudo visual.

## Referências e o que aproveitar

| Referência primária | Aspecto observado | Aplicação proposta |
| --- | --- | --- |
| [Bruno Simon](https://bruno-simon.com/) | Portfólio como experiência 3D; o próprio autor descreve Three.js e TSL no projeto. | Criar uma assinatura interativa própria. Manter projetos e contato acessíveis pela navegação convencional. |
| [Lusion](https://lusion.co/about/) | Integração de direção de arte, interação, WebGL e produção 3D. | Tratar a cena principal como peça de direção de arte, com composição e luz consistentes. |
| [Dennis Snellenberg](https://www.dennissnellenberg.com/) | Identidade tipográfica marcante e trabalhos como conteúdo central. | Escala editorial no título, bastante respiro e estudos de caso claros. |
| [Arnaud Rocca — relato do autor no Codrops, março de 2026](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/) | Sistema reutilizável de animação com GSAP, transições tipográficas e interação WebGL. | Definir uma linguagem de movimento compartilhada entre as seções. |

Essas referências sustentam a curadoria; não significam que exista uma única tendência universal em 2026. Os conceitos abaixo são uma interpretação autoral para este portfólio.

## Direções visuais

### Órbita — escolhida

Um estúdio de engenharia criativa. Fundo de carvão no modo escuro e mineral claro no modo claro, texto amplo, acento coral e uma escultura que combina superfícies metálicas com linhas digitais. O objeto representa a conexão entre código, produto e inteligência artificial.

Composição principal: texto à esquerda, peça interativa à direita, chamada para projetos imediatamente visível. A seção de trabalhos alterna uma peça maior com uma menor. O laboratório tem uma experiência própria, identificada como demonstração. Sobre e contato encerram a página com bastante respiro.

Título aprovado como posicionamento: **Engenheiro de Software**. Desenvolvimento full stack e integração de IA aparecem como competências demonstradas nos projetos, em vez de compor o título principal.

Linha de apoio implementada: **Entre a ideia e o produto, eu construo as conexões. Aplicações web, arquitetura e inteligência artificial para resolver problemas reais.** Esse posicionamento se apoia nas competências e na participação em integração de LLM descritas no currículo.

### Sistema — alternativa

Um ambiente de criação de software. Identidade monoespaçada, acento verde, navegação compacta, título centralizado e uma visualização do caminho entre interface, API e modelo. Os projetos aparecem em linhas editoriais, com metadados visíveis. A interação principal mostra as etapas de uma aplicação de IA.

Mais técnico e direto; a direção Órbita dá mais espaço à expressão visual e à diferenciação da marca pessoal.

## Sistema visual da direção Órbita

| Elemento | Especificação proposta |
| --- | --- |
| Fundo escuro | `#0B0D10` |
| Superfície escura | `#13171C` |
| Texto principal escuro | `#F1F1EB` |
| Texto secundário escuro | `#A5ADB7` |
| Acento em fundo escuro | `#FF805C`; texto escuro sobre botão coral |
| Fundo claro | `#F5F4EE` |
| Superfície clara | `#FFFFFF` |
| Texto em fundo claro | `#15181C` |
| Acento em fundo claro | `#AD3D20`; texto claro sobre botão coral escuro |
| Tipografia de destaque | Space Grotesk, com tamanhos fluidos |
| Detalhes técnicos | IBM Plex Mono; apenas rótulos, tecnologias e metadados |
| Título desktop real | Aproximadamente 80–104 px, conforme largura; mockup reduz proporcionalmente |
| Texto corrido | 16–18 px na implementação; largura de leitura de até 65 caracteres |
| Espaçamento | Base de 8 px; seções de 88–128 px no desktop e 56–72 px no celular |
| Cantos | 14–20 px nas prévias de projetos; botões mais contidos |
| Ícones | Lucide, traço consistente e uso pontual |
| Efeitos | Luz coral localizada, reflexos, linhas finas e textura discreta |

Cor e iluminação ficam concentradas na peça principal e nas imagens dos projetos. O contraste precisa ser medido na implementação para os pares efetivamente usados, inclusive textos sobre gradientes. A paleta acima é uma especificação inicial, não uma auditoria WCAG concluída.

## Arquitetura da informação

1. **Abertura:** nome, especialidade, apresentação pessoal, escultura interativa e ações “Conheça meus projetos” e “Quem eu sou”. Links diretos para currículo, GitHub e LinkedIn. Sem introdução que bloqueie a leitura.
2. **Projetos selecionados:** projetos reais com imagem, problema resolvido, papel desempenhado e tecnologias efetivamente utilizadas. O estudo destaca a experiência em contabilidade pública com IA e o GameLog, com Reservas e FilmeFaves em uma lista complementar. As capas ilustram a direção de arte; capturas reais poderão substituí-las.
3. **Estudos de caso:** contexto → problema → decisões → arquitetura → resultado → demonstração e repositório, quando disponíveis. Mostrar trade-offs e a participação individual. Métricas apenas quando existirem evidências.
4. **AI Lab:** uma demonstração pequena, útil e relacionada ao trabalho real do autor. Sugestão: consulta a documentos com trechos de origem visíveis. No estudo de design o fluxo é simulado e rotulado.
5. **Sobre, trajetória e competências:** apresentação humana curta, foto opcional, formação, experiência e competências agrupadas por frontend, backend e IA. Projetos pessoais e estudos devem ser identificados corretamente. Sem barras percentuais de habilidade.
6. **Contato:** convite para conversar sobre uma oportunidade na equipe, e-mail, GitHub, LinkedIn e currículo, somente com endereços e arquivo reais.
7. **Rodapé:** autoria e navegação essencial. Idioma português como ponto de partida; inglês fica previsto se houver objetivo internacional.

## Roteiro de animação

Os tempos são metas de design; deverão ser ajustados depois de observar a implementação em aparelhos reais.

| Momento | Movimento proposto | Duração/intensidade | Comportamento no celular e com movimento reduzido |
| --- | --- | --- | --- |
| Entrada | Título revelado por linhas; peça entra com luz e pequena rotação. | 600–900 ms; intervalos de 60–90 ms. | Texto visível de imediato; usar opacidade breve ou estado estático. |
| Peça principal | Nó orbital com leve resposta ao ponteiro e rotação ambiente lenta. | Resposta amortecida; deslocamento de até 8 px. | Sem dependência do ponteiro. Pausar fora da tela, em aba oculta e com movimento reduzido. |
| Navegação | Indicador acompanha seção atual; botão muda com suavidade. | 160–220 ms. | Alvos de toque de pelo menos 44 px e foco visível. |
| Projetos | Revelação vertical curta; imagem ganha escala e leve profundidade no hover/foco. | 400–650 ms na entrada; 180–240 ms na interação. | Conteúdo e ação sempre visíveis. Sem inclinação no toque. |
| Abertura de case | Imagem transita para o cabeçalho do projeto. | 350–500 ms. | Navegação normal quando a transição não for suportada ou desejada. |
| Laboratório | Etapas da consulta são ativadas; resposta revela trechos de origem. | Baseada em estado real, sem atraso artificial na versão final. | Lista vertical com status em texto; resposta acessível. |
| Sobre | Competências surgem em pequenos grupos durante a leitura. | 300–450 ms. | Layout permanece estável e conteúdo legível sem animação. |
| Contato | Seta desloca discretamente ao interagir com o convite. | 180 ms. | Mesmo feedback no foco; toque convencional. |

Evitar colocar transformações concorrentes de GSAP e Motion no mesmo elemento. O site deverá ter um controle de pausa para animação contínua, respeitar `prefers-reduced-motion` e não exigir som, arraste ou movimento para acessar conteúdo.

## Bibliotecas pesquisadas e seleção

### Núcleo recomendado

| Tecnologia e fonte primária | Papel | Decisão |
| --- | --- | --- |
| [Next.js / App Router](https://nextjs.org/docs/app) + React + TypeScript | Estrutura, páginas de projetos, metadados e rotas de servidor se houver IA real. | Boa base para evoluir o portfólio. Confirmar versões estáveis e compatibilidade ao implementar. |
| CSS e tokens próprios | Identidade, layout responsivo, estados e efeitos simples. | Base visual autoral. Tailwind é opcional, conforme preferência na implementação. |
| [Motion](https://motion.dev/docs) | Microinterações, transições de componentes e estados. | Usar para UI; o pacote atual é `motion`, importado como `motion/react`. |
| [GSAP + ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Sequências de rolagem e coordenação da cena principal. | Usar se a coreografia aprovada exigir. |
| [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) | Revelação e transformação de linhas/palavras. | Apenas nos títulos escolhidos, preservando texto acessível. |
| [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) + [Drei](https://drei.docs.pmnd.rs/getting-started/introduction) | Escultura interativa, câmera, materiais e iluminação. | Um único canvas principal, carregado separadamente. Usar combinação estável de versões compatíveis. |
| [Lucide](https://lucide.dev/guide/) | Ícones de navegação e ações. | Poucos ícones, com rótulos e consistência de traço. |
| [shadcn/ui](https://ui.shadcn.com/docs) | Componentes acessíveis para menus, diálogos e controles do laboratório. | Incorporar somente o necessário e adaptar ao sistema visual. |

### Recursos opcionais e alternativas

| Recurso e fonte primária | Uso possível | Limite proposto |
| --- | --- | --- |
| [Lenis](https://github.com/darkroomengineering/lenis) | Suavizar a rolagem no desktop e sincronizar sequências. | Opcional. Avaliar toque, teclado, âncoras e movimento reduzido; rolagem nativa continua sendo uma opção. |
| [React Bits](https://reactbits.dev/) | Referência e código de efeitos de texto, fundos e interações. | Escolher e adaptar um ou dois efeitos, em vez de combinar fundos concorrentes. |
| [Magic UI](https://magicui.design/docs) | Fluxo de conexões, terminal e pequenos detalhes. | Pode acelerar o AI Lab; revisar dependências e licença do item selecionado. |
| [Aceternity UI](https://ui.aceternity.com/components) | Referências de spotlight, cards, shaders e texto. | Alternativa à curadoria anterior; evitar sobreposição de bibliotecas para o mesmo efeito. |
| [Rive](https://rive.app/docs/runtimes/web/web-js) | Ilustração vetorial interativa com estados. | Adotar somente se o design pedir uma peça vetorial própria; não é requisito junto do 3D. |
| [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) | Transição entre projetos e páginas. | Aprimoramento progressivo com navegação normal como fallback. |
| [CSS animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) | Efeitos simples vinculados à rolagem. | Verificar suporte dos navegadores-alvo; não é necessária para o conteúdo funcionar. |
| [WebGPURenderer / Three.js](https://threejs.org/docs/pages/WebGPURenderer.html) | Exploração gráfica mais recente, com backend WebGPU e fallback WebGL 2 no renderer. | Investigar como aprimoramento. Na documentação consultada, R3F v10 ainda está em alpha; não basear o site inteiro nessa migração. |
| [AI SDK](https://ai-sdk.dev/docs/introduction) | Streaming e integração de modelos no AI Lab real. | Adotar apenas quando a demonstração e o provedor forem definidos. O mockup não chama modelos. |

Motion, GSAP e Three.js resolvem camadas diferentes neste projeto. A instalação final será feita a partir do design aprovado; esta lista é uma curadoria, não uma ordem de instalar tudo. Versões, licenças, tamanho transferido e compatibilidade devem ser verificados novamente nessa etapa.

## IA como demonstração de capacidade

A primeira opção é um explorador de documentos: pergunta → recuperação de trechos → geração da resposta → fontes. Uma segunda possibilidade é mostrar uma automação real, com entrada, decisão e saída. Escolher o que estiver mais próximo dos projetos existentes do autor.

Para uma integração pública: chamadas por servidor, segredo fora do cliente, limite de uso e de tamanho de entrada, mensagens de erro claras e exemplos pré-calculados como alternativa. O desenho deve prever estados vazio, executando, resultado e indisponível. O modelo não deve inventar informações sobre o autor; respostas sobre sua experiência precisam se apoiar no conteúdo aprovado.

## Curadoria dos projetos de Carlos

| Projeto / fonte | Evidência para contratação | Como apresentar |
| --- | --- | --- |
| Contabilidade pública + IA — currículo enviado | Participação em aplicação profissional e integração de assistente LLM. | Case de contribuição individual: interfaces, APIs, regras de negócio, bancos e integração de IA. Não atribuir sozinho todo o sistema ao autor nem inferir o modelo/provedor utilizado. |
| [GameLog](https://github.com/k4duzer4/gamelog) | README descreve plataforma de jogos com React, Express, Prisma, PostgreSQL e Docker. | Demonstrar conexão entre frontend e backend. O estado de conclusão das funcionalidades deve ser confirmado antes do texto final. |
| [Reservas](https://github.com/k4duzer4/react-ts-reservation-architecture) | Projeto descrito como dashboard com React e TypeScript e foco em arquitetura client-side. | Evidenciar organização de código, UI e estado. Não apresentar como backend completo. |
| [FilmeFaves](https://github.com/k4duzer4/film-faves) | Aplicação React integrada à API TMDb. | Projeto complementar sobre consumo de API e experiência de navegação. |

As descrições dos repositórios foram consultadas, sem auditoria do código ou execução dos projetos. A seleção final deve considerar quais versões Carlos considera mais prontas e representativas. O telefone fornecido pode ficar no currículo; e-mail e LinkedIn bastam para o contato direto no site.

### Competências em destaque

Exibir primeiro React, Next.js, TypeScript, Node.js, Express, PostgreSQL e integração de LLMs. Em uma camada de detalhe, agrupar LangChain, RAG, Gemini, Ollama, AWS, Docker, autenticação, validação e ferramentas de estado/formulário. A listagem deve seguir o currículo e os projetos demonstráveis, sem sugerir que todas essas tecnologias foram usadas em cada experiência.

## Responsividade e acessibilidade

- Desktop: composição em 12 colunas e conteúdo com largura máxima aproximada de 1280 px. A cena e o título dividem o primeiro bloco.
- Tablet: reduzir a escala da tipografia e aproximar a cena do texto.
- Celular: coluna única; título e ações vêm antes da cena. Projetos empilhados, laboratório vertical e navegação compacta acessível.
- Planejar 360, 390, 768, 1024 e 1440 px, verificando também 320 px e zoom de texto.
- Menu utilizável por teclado, link para pular navegação, foco claro e hierarquia semântica.
- Canvas decorativo com alternativa textual. Conteúdo profissional em HTML indexável.
- Nenhuma informação ou ação essencial apenas no hover, dentro do 3D ou em animação.

## Orçamento de desempenho proposto

Metas para validar após a implementação: LCP de até 2,5 s, INP de até 200 ms e CLS de até 0,1 no percentil 75 das visitas, conforme [Core Web Vitals](https://web.dev/articles/vitals). Não são resultados já medidos.

Carregar título e conteúdo sem esperar pela cena. Separar o bundle de 3D, limitar resolução e efeitos em telas pequenas, pausar cenas sem visibilidade e manter uma imagem estática alternativa. Otimizações de renderização e uso de recursos devem seguir as recomendações de [React Three Fiber](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

Objetivo visual: movimento fluido em aparelho intermediário. A qualidade e o número de partículas se adaptam ao dispositivo; o site permanece completo quando o canvas não puder ser renderizado.

## Próxima etapa

A direção Órbita e o título Engenheiro de Software já foram escolhidos. A implementação apresenta quatro projetos, currículo em uma página própria com impressão, busca local no perfil, trajetória e contato. Datas e cargos oficiais das experiências poderão ser complementados pelo autor. O laboratório é identificado como busca local e não depende de chaves ou serviços de IA.

## Conferência do estudo visual

As duas propostas foram abertas em Chromium/Edge, com larguras de janela de 320, 360, 430, 800 e 1080 px. A inspeção não encontrou erros JavaScript nem transbordamento horizontal. Foram exercitados os dois fluxos simulados de IA, a reprodução e pausa da cena e a expansão dos detalhes de projeto. A aparência clara e as seções de apresentação, laboratório e contato também receberam inspeção visual; a preferência por movimento reduzido foi exercitada.

Essa primeira conferência se limitou ao estudo de design. Após a implementação, o site também passou por verificação de tipos, build de produção e testes de navegador em 320, 390, 768, 1024 e 1440 px, sem erros JavaScript, falhas de recursos locais ou transbordamento horizontal. Foram conferidos menu móvel, projetos em diálogo, retorno do foco, busca local com resposta e caso sem informação, currículo e movimento reduzido. As metas de Core Web Vitals ainda exigem medição com tráfego real.
