export const profile = {
  name: 'Carlos Franco',
  fullName: 'Carlos Eduardo Amaro de Sousa Franco de Sá',
  title: 'Engenheiro de Software',
  location: 'Patos, Paraíba · Brasil',
  email: 'kadusa09@gmail.com',
  github: 'https://github.com/k4duzer4',
  linkedin: 'https://www.linkedin.com/in/carlosfrancosa/',
}

export type Project = {
  id: string; number: string; name: string; category: string; summary: string
  tags: string[]; image?: string; github?: string; demo?: string; demoLabel?: string
  status?: 'Em desenvolvimento'
  context: string; contribution: string[]; architecture: string; visual: 'intelligence' | 'games' | 'image'
}

export const projects: Project[] = [
  {
    id: 'contabilidade', number: '01', name: 'Save',
    category: 'EXPERIÊNCIA PROFISSIONAL · CLAIR & LEITÃO',
    summary: 'Sistema em que trabalhei na Clair & Leitão, atuando no desenvolvimento full stack e na integração de um assistente com IA para contabilidade pública.',
    tags: ['React', 'APIs REST', 'LLMs'], visual: 'intelligence',
    demo: 'https://savest.com.br/', demoLabel: 'Visitar site do Save',
    context: 'O Save é o sistema de contabilidade pública em que trabalhei na Clair & Leitão, voltado ao atendimento de prefeituras da Paraíba. Atuei no desenvolvimento de funcionalidades full stack e participei da integração de um assistente conversacional com IA, em colaboração com a equipe.',
    contribution: ['Desenvolvimento de interfaces responsivas e componentes reutilizáveis com React, JavaScript, Bootstrap e Styled Components.', 'Construção e manutenção de funcionalidades, APIs REST, regras de negócio e integração com bancos de dados.', 'Participação no desenvolvimento e na integração de um assistente conversacional com LLM, adaptado ao contexto do sistema.', 'Colaboração em melhorias, correções e evolução da arquitetura da aplicação.'],
    architecture: 'Interface web → APIs e regras de negócio → persistência de dados. A integração do assistente acrescenta uma camada conversacional às funcionalidades do sistema. Este case descreve minha participação na equipe; a ilustração é uma composição visual, não uma captura do produto.',
  },
  {
    id: 'tripsplit', number: '02', name: 'TripSplit', category: 'FULL STACK · VIAGENS & DESPESAS',
    summary: 'Organização de viagens em grupo, divisão de despesas e cálculo do acerto entre participantes.',
    tags: ['React', 'Node.js', 'Tailwind CSS'], visual: 'image', image: '/projects/tripsplit.webp',
    github: 'https://github.com/k4duzer4/tripsplit1', demo: 'https://tripsplit1-seven.vercel.app',
    context: 'Uma aplicação para acompanhar os gastos de uma viagem compartilhada e organizar o que cada pessoa precisa acertar ao final.',
    contribution: ['Interface para viagens, participantes, despesas e pagamentos.', 'API Node.js para autenticação, convites e regras de divisão de valores.', 'Cálculo de transferências entre participantes, encerramento de viagens e exportação de relatórios.'],
    architecture: 'Frontend React integrado a uma API Node.js. A lógica de acerto organiza os saldos do grupo; a versão descrita no repositório utiliza persistência local em arquivo JSON.',
  },
  {
    id: 'anade', number: '03', name: 'ANADE', category: 'PORTAL · ORGANIZAÇÃO SUPRAPARTIDÁRIA',
    summary: 'Portal de uma organização suprapartidária, com área de membros, gestão de acesso e identidade visual própria.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'], visual: 'image', image: '/projects/anade.webp',
    github: 'https://github.com/k4duzer4/anade', demo: 'https://anade.vercel.app',
    context: 'Uma presença digital para uma organização suprapartidária, reunindo informações institucionais e uma área de acesso para seus membros.',
    contribution: ['Interface responsiva em Next.js, React e TypeScript, com temas claro e escuro.', 'API Express com autenticação OAuth2 e controle de acesso por perfil.', 'Organização em monorepo, com migrações SQL e sessões persistidas no PostgreSQL.'],
    architecture: 'Frontend Next.js conectado a uma API Express. PostgreSQL mantém os dados e as sessões; o acesso dos membros utiliza OAuth2 e permissões verificadas no backend.',
  },
  {
    id: 'filmefaves', number: '04', name: 'FilmeFaves', category: 'FRONTEND · EXPLORAÇÃO DE FILMES',
    summary: 'Descoberta de filmes, detalhes e avaliações em uma experiência conectada à API do TMDb.',
    tags: ['React', 'JavaScript', 'TMDb API'], visual: 'image', image: '/projects/filmefaves.webp',
    github: 'https://github.com/k4duzer4/film-faves', demo: 'https://film-faves-two.vercel.app',
    context: 'Uma aplicação para descobrir filmes e consultar informações, detalhes, avaliações e títulos populares usando o catálogo do The Movie Database.',
    contribution: ['Desenvolvimento da interface em React e JavaScript.', 'Integração com a API TMDb para consultar informações de filmes.', 'Composição de uma experiência de navegação e descoberta de títulos.'],
    architecture: 'Interface React → integração HTTP → API TMDb. O projeto destaca consumo de API externa e organização da experiência no cliente. A capa é uma captura real da demonstração pública.',
  },
  {
    id: 'gamelog', number: '05', name: 'GameLog', category: 'FULL STACK · JOGOS & DESCOBERTA',
    status: 'Em desenvolvimento',
    summary: 'Plataforma social em desenvolvimento para catalogar, avaliar e descobrir jogos digitais.',
    tags: ['React', 'Node.js', 'Prisma', 'PostgreSQL'], visual: 'games',
    github: 'https://github.com/k4duzer4/gamelog',
    context: 'Um projeto em desenvolvimento que conecta um catálogo de jogos a uma experiência social de descoberta e avaliação.',
    contribution: ['Construção do frontend em React e TypeScript.', 'Estruturação de API Express, Prisma e PostgreSQL.', 'Integração com o catálogo IGDB e organização do monorepo com Docker e Turborepo.'],
    architecture: 'React → API Express → Prisma / PostgreSQL, com integração ao catálogo IGDB. O projeto está em desenvolvimento e suas funcionalidades seguem em evolução.',
  },
  {
    id: 'bazar-nina', number: '06', name: 'Bazar Solidário Nina', category: 'SITE · PROJETO SOLIDÁRIO',
    summary: 'Site do I Bazar Solidário Nina, criado para divulgar um evento beneficente em apoio ao cuidado de animais acolhidos.',
    tags: ['HTML5', 'CSS3', 'Responsivo'], visual: 'image', image: '/projects/bazar-nina.webp',
    github: 'https://github.com/k4duzer4/bazar-nina-2024', demo: 'https://bazarnina.vercel.app',
    context: 'Um site para apresentar o bazar realizado em 2024 e orientar a participação e as doações para castrações e medicamentos de animais acolhidos.',
    contribution: ['Criação das páginas de apresentação, sobre o evento e doações.', 'Organização das informações e dos links de participação.', 'Construção da identidade do site com HTML e CSS.'],
    architecture: 'Site estático em HTML e CSS, com páginas informativas e links externos para redes sociais e doações.',
  },
]

export const experiences = [
  { company: 'KNEX Consultoria Júnior', type: 'DESENVOLVIMENTO FULL STACK', location: 'Patos, PB', text: 'Aplicações web com React, Next.js, TypeScript e Node.js. Interfaces, APIs REST, autenticação, regras de negócio e bancos relacionais.', detail: 'Colaboração em equipe com Git, GitHub e metodologias ágeis.' },
  { company: 'Clair & Leitão', type: 'DESENVOLVIMENTO WEB & IA', location: 'Remoto', text: 'Sistema de contabilidade pública para prefeituras da Paraíba. Desenvolvimento full stack e participação na integração de assistente conversacional com LLM.', detail: 'React, JavaScript, componentes reutilizáveis e evolução da aplicação.' },
  { company: 'Compass UOL', type: 'FORMAÇÃO PRÁTICA', location: 'Remoto', text: 'Mais de 160 horas de formação prática em Cloud Computing, Engenharia de Dados e Inteligência Artificial.', detail: 'Projetos com AWS e participação em mais de cinco desafios técnicos.' },
]

export const skillGroups = [
  { number: '01', title: 'A experiência', subtitle: 'Interfaces que fazem sentido.', tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Styled Components', 'TanStack Query', 'Zustand'] },
  { number: '02', title: 'A estrutura', subtitle: 'O que sustenta o produto.', tech: ['Node.js', 'Express', 'APIs REST', 'PostgreSQL', 'SQL', 'JWT', 'Zod'] },
  { number: '03', title: 'A inteligência', subtitle: 'Contexto que vira possibilidade.', tech: ['LLMs', 'LangChain', 'RAG', 'Gemini', 'Ollama', 'Contexto & memória'] },
  { number: '04', title: 'O ecossistema', subtitle: 'Do código à evolução.', tech: ['AWS', 'Docker', 'Git', 'GitHub', 'Scrum', 'Kanban'] },
]

export const knowledge = [
  { test: /\b(ia|llm|llms|rag|langchain|gemini|ollama|inteligencia|assistente)\b/, text: 'Na Clair & Leitão, participei da integração de um assistente conversacional com LLM em um sistema de contabilidade pública. Meu repertório também inclui LangChain, RAG, Gemini, Ollama e gerenciamento de contexto e memória em aplicações com IA.', source: 'Experiência · Clair & Leitão / Competências · IA', target: '#trajetoria' },
  { test: /\b(cloud|aws|compass|dados|nuvem)\b/, text: 'Na Compass UOL, participei de mais de 160 horas de formação prática em Cloud Computing, Engenharia de Dados e IA, com projetos usando serviços AWS e mais de cinco desafios técnicos.', source: 'Formação prática · Compass UOL', target: '#trajetoria' },
  { test: /\b(formacao|estudo|universidade|faculdade|uepb|curso|graduacao)\b/, text: 'Sou graduando em Ciência da Computação pela Universidade Estadual da Paraíba, em Patos, desde 2022.2. Minha formação inclui algoritmos, estruturas de dados, programação orientada a objetos, redes e arquitetura de computadores.', source: 'Formação acadêmica · UEPB', target: '#sobre' },
  { test: /\b(back|backend|api|node|express|banco|sql|autenticacao)\b/, text: 'Trabalho com Node.js, Express, APIs REST, autenticação, regras de negócio e bancos relacionais. No GameLog, o repositório conecta React a uma API Express com Prisma e PostgreSQL.', source: 'Competências · Backend / Projeto · GameLog', target: '#projetos' },
  { test: /\b(stack|tecnologia|tecnologias|front|frontend|react|next|typescript|linguagem)\b/, text: 'Minha base de desenvolvimento web inclui React, Next.js, TypeScript e Node.js. No frontend, utilizo Tailwind, Styled Components e ferramentas como TanStack Query e Zustand; no backend, APIs REST e bancos relacionais.', source: 'Competências técnicas · Currículo', target: '#stack' },
  { test: /\b(projeto|projetos|save|tripsplit|anade|filme|gamelog|bazar|nina|portfolio)\b/, text: 'Meus projetos selecionados são Save, sistema em que trabalhei na Clair & Leitão; TripSplit, para viagens e despesas; ANADE, portal de uma organização suprapartidária; FilmeFaves; GameLog, em desenvolvimento; e Bazar Solidário Nina.', source: 'Projetos selecionados · Portfólio', target: '#projetos' },
  { test: /\b(experiencia|trabalho|knex|clair|equipe)\b/, text: 'Minha trajetória inclui desenvolvimento web full stack na KNEX Consultoria Júnior e em um sistema de contabilidade pública na Clair & Leitão, além de formação prática em Cloud, Dados e IA na Compass UOL.', source: 'Experiência e aprendizado · Currículo', target: '#trajetoria' },
  { test: /\b(contato|email|linkedin|github|onde|cidade|local)\b/, text: 'Sou de Patos, na Paraíba. Meu e-mail é kadusa09@gmail.com, meu GitHub é k4duzer4 e meu LinkedIn é carlosfrancosa. Os links estão na seção de contato.', source: 'Contato · Carlos Franco', target: '#contato' },
]
