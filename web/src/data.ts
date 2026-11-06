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
    id: 'gamelog', number: '02', name: 'GameLog', category: 'PROJETO FULL STACK · JOGOS & DESCOBERTA',
    summary: 'Uma plataforma social para catalogar, avaliar e descobrir jogos. Frontend, API e dados em um monorepo.',
    tags: ['React', 'Node.js', 'Prisma', 'PostgreSQL'], visual: 'games',
    github: 'https://github.com/k4duzer4/gamelog',
    context: 'Uma plataforma inspirada na ideia de um diário de entretenimento, aplicada ao universo dos jogos digitais. O repositório organiza a experiência web, os serviços e a infraestrutura no mesmo monorepo.',
    contribution: ['Estrutura de frontend com React, TypeScript, Tailwind, shadcn/ui, TanStack Query e Zustand.', 'Backend com Node.js, Express, TypeScript, Prisma e PostgreSQL.', 'Integração de catálogo com a API IGDB e organização de infraestrutura com Docker Compose.', 'Organização do projeto com Turborepo e npm workspaces.'],
    architecture: 'React / TypeScript → API Express → Prisma / PostgreSQL. O catálogo integra a API IGDB. A organização em monorepo aproxima interface, serviços e infraestrutura. O mapa visual representa essa estrutura; consulte o repositório para acompanhar o estágio atual do projeto.',
  },
  {
    id: 'reservas', number: '03', name: 'FlowReserva', category: 'FRONTEND · ARQUITETURA CLIENT-SIDE',
    summary: 'Um dashboard de reservas com foco em experiência de uso, organização de código e componentes reutilizáveis.',
    tags: ['React', 'TypeScript', 'Dashboard'], visual: 'image', image: '/projects/reservas.webp',
    github: 'https://github.com/k4duzer4/react-ts-reservation-architecture', demo: 'https://react-ts-reservation-architecture.vercel.app',
    context: 'Dashboard de gerenciamento de reservas desenvolvido com React e TypeScript. O foco é a arquitetura do cliente, a organização do código e a experiência de navegação.',
    contribution: ['Desenvolvimento de uma interface de gerenciamento de reservas.', 'Organização client-side com React e TypeScript.', 'Exploração de componentes reutilizáveis e de fluxos de interação em dashboard.'],
    architecture: 'Aplicação React e TypeScript com organização client-side. A autenticação da demonstração é simulada; o projeto é apresentado como trabalho de frontend. A imagem vem da documentação pública do repositório e contém dados de demonstração.',
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
  { test: /\b(projeto|projetos|gamelog|reserva|filme|portfolio)\b/, text: 'Você pode explorar o GameLog, uma plataforma full stack para jogos; o FlowReserva, um dashboard React e TypeScript; e o FilmeFaves, integrado à API TMDb. Também apresento minha participação profissional em um sistema de contabilidade pública com IA.', source: 'Projetos selecionados · Portfólio', target: '#projetos' },
  { test: /\b(experiencia|trabalho|knex|clair|equipe)\b/, text: 'Minha trajetória inclui desenvolvimento web full stack na KNEX Consultoria Júnior e em um sistema de contabilidade pública na Clair & Leitão, além de formação prática em Cloud, Dados e IA na Compass UOL.', source: 'Experiência e aprendizado · Currículo', target: '#trajetoria' },
  { test: /\b(contato|email|linkedin|github|onde|cidade|local)\b/, text: 'Sou de Patos, na Paraíba. Meu e-mail é kadusa09@gmail.com, meu GitHub é k4duzer4 e meu LinkedIn é carlosfrancosa. Os links estão na seção de contato.', source: 'Contato · Carlos Franco', target: '#contato' },
]
