import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'motion/react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Braces, BrainCircuit, Check, Code2, Copy, ExternalLink, FileText, GitFork as Github, GraduationCap, Layers3, ContactRound as Linkedin, LoaderCircle, Menu, Pause, Play, Sparkles, Terminal, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Cursor, ExperienceProvider, HeroHeading, MagneticLink, Reveal, Scramble, useExperience } from './components/Motion'
import { experiences, knowledge, profile, projects, skillGroups } from './data'
import type { Project } from './data'
import Resume from './Resume'
import NeuralOrbit from './components/KineticOrbit'

gsap.registerPlugin(ScrollTrigger)
const nav = [{ id: 'projetos', label: 'Projetos' }, { id: 'sobre', label: 'Sobre' }, { id: 'trajetoria', label: 'Trajetória' }, { id: 'contato', label: 'Contato' }]


function Header() {
  const { moving, toggleMotion } = useExperience()
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }) }, { rootMargin: '-20% 0px -45% 0px' })
    nav.forEach(item => { const el = document.getElementById(item.id); if (el) observer.observe(el) })
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', escape)
    return () => { observer.disconnect(); window.removeEventListener('keydown', escape) }
  }, [])
  return <header className="site-header">
    <motion.div className="reading-progress" style={{ scaleX: moving ? progress : scrollYProgress }} />
    <div className="header-inner shell">
      <a className="wordmark" href="#inicio" aria-label="Carlos Franco, início"><span className="brand-symbol" aria-hidden="true"><span>{'{'}</span><Sparkles /><span>{'}'}</span></span>carlos franco<span className="brand-period">.</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'nav-active' : ''}><Scramble text={item.label} />{active === item.id && <motion.span className="nav-indicator" layoutId="nav-indicator" />}</a>)}</nav>
      <div className="header-actions"><button className="motion-toggle" onClick={toggleMotion} aria-label={moving ? 'Pausar animações' : 'Ativar animações'} aria-pressed={!moving}><span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span><span className="motion-toggle-label">{moving ? 'Em movimento' : 'Movimento pausado'}</span>{moving ? <Pause size={11} /> : <Play size={11} />}</button><a className="header-contact" href="mailto:kadusa09@gmail.com" aria-label="Enviar e-mail"><ArrowUpRight size={19} /></a><button className="menu-toggle" aria-label={menu ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
    </div>
    <AnimatePresence>{menu && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: moving ? .35 : 0 }}>{nav.map((item, index) => <a href={`#${item.id}`} key={item.id} onClick={() => setMenu(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight /></a>)}<a href="/curriculo" onClick={() => setMenu(false)}><span>05</span>Currículo<FileText /></a></motion.nav>}</AnimatePresence>
  </header>
}

function Hero() {
  return <section className="hero shell" id="inicio" aria-label="Apresentação de Carlos Franco">
    <div className="hero-copy">
      <Reveal className="hero-eyebrow" delay={.1}><span className="status-dot" />CARLOS FRANCO / PORTFÓLIO 2026</Reveal>
      <HeroHeading />
      <Reveal delay={.55}><p className="hero-description">Entre a ideia e o produto, <span>eu construo as conexões.</span> Aplicações web, arquitetura e inteligência artificial para resolver problemas reais.</p></Reveal>
      <Reveal className="hero-actions" delay={.65}><MagneticLink className="button button-primary" href="#projetos"><span>Explore meus projetos</span><ArrowUpRight size={19} /></MagneticLink><MagneticLink className="button button-text" href="/curriculo" target="_blank"><FileText size={16} /><span>Ver currículo</span><ArrowUpRight size={14} /></MagneticLink></Reveal>
      <Reveal className="hero-socials" delay={.75}><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={14} />GitHub<ArrowUpRight size={11} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={14} />LinkedIn<ArrowUpRight size={11} /></a><span className="hero-location">PATOS, PB / BRASIL</span></Reveal>
    </div>
    <NeuralOrbit />
    <div className="hero-bottom"><a className="scroll-cue" href="#projetos"><span className="scroll-cue-line" /><span>ROLE PARA DESCOBRIR</span><ArrowDown size={13} /></a><span>BOAS IDEIAS MERECEM BOM CÓDIGO.</span></div>
  </section>
}

function TechMarquee() {
  const items = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Inteligência artificial', 'PostgreSQL', 'AWS', 'Arquitetura']
  return <div className="tech-marquee" aria-label="React, TypeScript, Next.js, Node.js, Inteligência artificial, PostgreSQL, AWS e arquitetura"><div className="marquee-track" aria-hidden="true">{[...items, ...items].map((item, index) => <span key={index}><span>{item}</span><span className="marquee-star">✳</span></span>)}</div></div>
}

function SectionHeading({ number, label, title, children }: { number: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <Reveal className="section-heading"><div><p className="section-kicker"><span>{number}</span> / {label}</p><h2>{title}</h2></div>{children}</Reveal>
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) return <div className={`project-art art-image art-${project.id}`}><img src={project.image} alt={`Interface do ${project.name}`} loading="lazy" width={1440} height={project.id === 'reservas' ? 711 : 1000} /><span className="art-image-label">CAPTURA REAL / {project.name.toUpperCase()}</span></div>
  if (project.visual === 'intelligence') return <div className="project-art art-intelligence" aria-label="Ilustração da integração de inteligência artificial ao software"><span className="art-topline">SAVE / EXPERIÊNCIA PROFISSIONAL</span><div className="intelligence-orbits"><i /><i /><i /><div className="intelligence-core"><BrainCircuit size={48} strokeWidth={1} /></div><span className="intelligence-node node-context">CONTEXTO</span><span className="intelligence-node node-system">SISTEMA</span><span className="intelligence-node node-model">LLM</span></div><span className="art-caption">Um sistema em que trabalhei.</span><span className="art-footnote">COMPOSIÇÃO ILUSTRATIVA</span></div>
  return <div className="project-art art-games" aria-label="Mapa visual da arquitetura do GameLog"><span className="art-topline">GAMELOG / FULL STACK PLATFORM</span><span className="gamelog-wordmark">gamelog<span>®</span></span><div className="game-stack"><div className="game-tile tile-frontend"><span>01 / EXPERIÊNCIA</span><Code2 /><strong>React</strong></div><div className="game-tile tile-backend"><span>02 / SISTEMA</span><Braces /><strong>Node.js</strong></div><div className="game-tile tile-data"><span>03 / DADOS</span><Layers3 /><strong>PostgreSQL</strong></div></div><span className="art-footnote">MAPA DO PROJETO · REACT → EXPRESS → PRISMA</span></div>
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  const { moving } = useExperience()
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 160, damping: 24 }), rotateY = useSpring(ry, { stiffness: 160, damping: 24 })
  return <Reveal delay={index % 2 * .1} className={`project-card-wrap project-${project.id}`}><motion.button className="project-card" type="button" onClick={() => onSelect(project)} aria-label={`Explorar projeto: ${project.name}`} style={{ rotateX: moving ? rotateX : 0, rotateY: moving ? rotateY : 0, transformPerspective: 1200 }} onPointerMove={e => { if (!moving || e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; rx.set((.5 - y) * 5); ry.set((x - .5) * 5); e.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`); e.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`) }} onPointerLeave={() => { rx.set(0); ry.set(0) }} whileTap={moving ? { scale: .985 } : undefined}>
    <div className="project-visual"><ProjectVisual project={project} /><span className="project-open"><ArrowUpRight size={22} /></span><span className="project-number">{project.number}</span><div className="project-shine" /></div>
    <div className="project-meta"><span className="project-category">{project.category}</span><div className="project-title-line"><h3>{project.name}</h3><ArrowUpRight className="project-title-arrow" /></div><p>{project.summary}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </motion.button>{project.demoLabel && project.demo && <a className="text-link project-site-link" href={project.demo} target="_blank" rel="noopener noreferrer">{project.demoLabel}<ExternalLink size={14} /></a>}</Reveal>
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = ref.current
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { element?.close(); document.body.style.overflow = previous; if (trigger?.isConnected) trigger.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={ref} className="project-dialog" aria-labelledby="case-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }} data-lenis-prevent><motion.article className="case-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}><div className="case-top"><span>CASE / {project.number}</span><button onClick={onClose} aria-label="Fechar projeto"><X size={22} /></button></div><p className="section-kicker">{project.category}</p><h2 id="case-title">{project.name}</h2><p className="case-summary">{project.summary}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="case-visual"><ProjectVisual project={project} /></div><section><span className="case-section-number">01 / CONTEXTO</span><h3>O problema e o produto.</h3><p>{project.context}</p></section><section><span className="case-section-number">02 / PARTICIPAÇÃO</span><h3>Código, escolhas e construção.</h3><ul>{project.contribution.map(item => <li key={item}><ArrowDownRight size={15} /><span>{item}</span></li>)}</ul></section><section><span className="case-section-number">03 / ESTRUTURA</span><h3>Como as peças se conectam.</h3><p>{project.architecture}</p></section><div className="case-links">{project.github && <a className="button button-primary" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17} />Ver código<ArrowUpRight size={17} /></a>}{project.demo && <a className="button button-secondary" href={project.demo} target="_blank" rel="noopener noreferrer">{project.demoLabel ?? 'Abrir projeto'}<ExternalLink size={16} /></a>}{!project.github && <a className="button button-primary" href={`mailto:${profile.email}`}>Conversar sobre minha experiência<ArrowUpRight size={17} /></a>}</div></motion.article></dialog>
}

function Projects({ onSelect }: { onSelect: (project: Project) => void }) {
  return <section className="projects-section shell section" id="projetos"><SectionHeading number="01" label="PROJETOS SELECIONADOS" title={<>O que eu<br /><span className="heading-indent">coloco no mundo<span className="accent">.</span></span></>}><p className="section-aside">Da interface à arquitetura.<br />Da curiosidade à aplicação.</p></SectionHeading><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={onSelect} />)}</div><Reveal className="projects-more"><span>CADA PROJETO, UMA NOVA FORMA DE APRENDER.</span><MagneticLink href={profile.github} className="text-link" target="_blank">Mais código no GitHub<ArrowUpRight size={18} /></MagneticLink></Reveal></section>
}

function About() {
  const text = 'Gosto de entender o problema. Conectar as peças. E construir o que vem depois.'
  return <section className="about-section section" id="sobre"><div className="shell"><SectionHeading number="02" label="QUEM ESTÁ POR TRÁS" title={<>Curiosidade é<br />o ponto de partida<span className="accent">.</span></>}><span className="about-coordinate">07°01′ S<br />37°16′ W</span></SectionHeading><div className="about-grid"><Reveal className="about-identity"><div className="identity-mark" aria-hidden="true"><span>c</span><span>f</span><i /></div><div><span className="identity-name">Carlos Eduardo</span><span className="identity-location">Patos, Paraíba · Brasil</span></div></Reveal><div className="about-story"><p className="scroll-statement">{text.split(' ').map((word, index) => <span className="statement-word" key={index}>{word}{' '}</span>)}</p><Reveal><p className="body-copy">Sou Carlos Franco, graduando em Ciência da Computação pela <strong>Universidade Estadual da Paraíba</strong>. Minha atuação conecta desenvolvimento de aplicações web, arquitetura e integração de inteligência artificial.</p><p className="body-copy">Do componente na tela à regra de negócio na API, gosto de pensar em como cada escolha ajuda o software a funcionar melhor — e a continuar evoluindo. Trabalho com código, mas também com colaboração, aprendizado e contexto.</p><a className="text-link" href="/curriculo" target="_blank" rel="noopener noreferrer">Conheça minha trajetória completa<FileText size={16} /><ArrowUpRight size={16} /></a></Reveal></div></div><Reveal className="education-strip"><GraduationCap size={25} /><div><span>FORMAÇÃO ACADÊMICA</span><h3>Bacharelado em Ciência da Computação</h3></div><div><strong>UEPB</strong><span>2022.2 — atual</span></div><ArrowUpRight size={22} /></Reveal></div></section>
}

function Stack() {
  const icons = [Code2, Braces, BrainCircuit, Layers3]
  return <section className="stack-section shell section" id="stack"><SectionHeading number="03" label="FERRAMENTAS & REPERTÓRIO" title={<>Tecnologia com<br /><span className="accent">intenção.</span></>}><p className="section-aside">Escolher a ferramenta é parte<br />de entender o problema.</p></SectionHeading><div className="skill-grid">{skillGroups.map((group, index) => { const Icon = icons[index]; return <Reveal key={group.number} delay={index * .08} className="skill-card"><div className="skill-top"><Icon size={26} strokeWidth={1.4} /><span>{group.number}</span></div><h3>{group.title}</h3><p>{group.subtitle}</p><div className="skill-tags">{group.tech.map(tech => <span key={tech}><Scramble text={tech} /></span>)}</div></Reveal> })}</div></section>
}

function AILab() {
  const { moving } = useExperience()
  const [query, setQuery] = useState('')
  const [step, setStep] = useState(-1)
  const [answer, setAnswer] = useState<{ text: string; source: string; target: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const steps = ['PERGUNTA', 'CONTEXTO', 'RESPOSTA']
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  function run(value: string) {
    if (!value.trim() || busy) return
    setQuery(value); setBusy(true); setAnswer(null); setStep(0)
    const normalized = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const result = knowledge.find(item => item.test.test(normalized)) ?? { text: 'Ainda não tenho uma informação específica sobre essa pergunta nesta demonstração. Explore minhas experiências, projetos, tecnologias ou formação — ou converse comigo por e-mail.', source: 'Perfil · informação não encontrada', target: '#contato' }
    timers.current.push(setTimeout(() => setStep(1), moving ? 450 : 0))
    timers.current.push(setTimeout(() => { setStep(2); setAnswer(result); setBusy(false) }, moving ? 1150 : 30))
  }
  function submit(event: FormEvent) { event.preventDefault(); run(query) }
  return <section className="lab-section section" id="laboratorio"><div className="shell"><SectionHeading number="04" label="LABORATÓRIO DE IDEIAS" title={<>IA se demonstra.<br /><span className="accent">Na prática.</span></>}><span className="lab-section-mark"><Sparkles size={27} /> HUMAN × MACHINE</span></SectionHeading><Reveal className="lab-panel"><div className="lab-explanation"><span className="lab-badge"><span className="status-dot" />EXPERIMENTO INTERATIVO</span><h3>Uma pergunta.<br />O contexto certo.<br /><span>Novas conexões.</span></h3><p>IA útil começa por contexto. Explore informações do meu perfil e acompanhe o caminho entre a sua pergunta e uma resposta com origem.</p><div className="lab-architecture"><span><Terminal size={16} />Entrada</span><i /><span><Layers3 size={16} />Contexto</span><i /><span><BrainCircuit size={16} />Resposta</span></div><p className="lab-disclosure">Demonstração com busca local no meu perfil. Sem chamada a um modelo de IA.</p></div><div className="lab-workspace"><div className="workspace-top"><span><span className="terminal-dots"><i /><i /><i /></span> orbit / knowledge-explorer</span><span>LOCAL DEMO</span></div><div className="workspace-body"><span className="workspace-label">O QUE VOCÊ QUER DESCOBRIR?</span><form onSubmit={submit} className="lab-form"><label className="sr-only" htmlFor="profile-question">Pergunte sobre minha experiência, stack ou formação</label><input id="profile-question" value={query} onChange={e => setQuery(e.target.value)} placeholder="Pergunte sobre meu trabalho…" maxLength={250} autoComplete="off" /><button type="submit" disabled={busy || !query.trim()} aria-label="Explorar pergunta">{busy ? <LoaderCircle className="spin" size={19} /> : <ArrowUpRight size={21} />}</button></form><div className="suggested-questions">{['Experiência com IA', 'Stack principal', 'Formação e Cloud'].map(question => <button key={question} onClick={() => run(question)} disabled={busy}>{question}<ArrowUpRight size={10} /></button>)}</div><div className="lab-stepper" aria-label="Etapas da busca">{steps.map((label, index) => <div className={step >= index ? 'step-active' : ''} key={label}><span>{step > index ? <Check size={11} /> : `0${index + 1}`}</span><span>{label}</span>{index < 2 && <i />}</div>)}</div><div className="lab-result" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait">{busy ? <motion.div className="lab-loading" key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span /><span /><span /><p>{step === 0 ? 'Entendendo sua pergunta…' : 'Conectando informações do perfil…'}</p></motion.div> : answer ? <motion.div key={answer.text} initial={moving ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }}><p>{answer.text}</p><a className="lab-source" href={answer.target}><FileText size={12} /><span>{answer.source}</span><ArrowUpRight size={12} /></a></motion.div> : <div className="lab-empty"><Sparkles size={25} strokeWidth={1.2} /><p>Uma boa resposta começa<br />com uma boa pergunta.</p><span>Escolha uma sugestão para explorar.</span></div>}</AnimatePresence></div></div></div></Reveal></div></section>
}

function Timeline() {
  return <section className="timeline-section shell section" id="trajetoria"><SectionHeading number="05" label="EXPERIÊNCIA & APRENDIZADO" title={<>Cada etapa<br />deixa uma conexão<span className="accent">.</span></>}><p className="section-aside">Pessoas, desafios e código.<br />Uma trajetória em construção.</p></SectionHeading><div className="timeline"><div className="timeline-track"><span className="timeline-track-fill" /></div>{experiences.map((experience, index) => <Reveal className="timeline-item" key={experience.company} delay={index * .08}><div className="timeline-index"><span>0{index + 1}</span><span className="timeline-dot" /></div><div className="timeline-company"><span className="timeline-type">{experience.type}</span><h3>{experience.company}</h3><span className="timeline-location">{experience.location}</span></div><div className="timeline-description"><p>{experience.text}</p><span>{experience.detail}</span></div><ArrowDownRight className="timeline-arrow" size={23} /></Reveal>)}</div></section>
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); timer.current = setTimeout(() => setCopied(false), 2400) } catch { window.location.href = `mailto:${profile.email}` }
  }
  return <section className="contact-section section" id="contato"><div className="contact-glow" aria-hidden="true" /><div className="shell"><Reveal><p className="section-kicker"><span>06</span> / VAMOS CONVERSAR</p></Reveal><Reveal><a href={`mailto:${profile.email}`} className="contact-headline"><h2>O próximo capítulo<br />pode ser <span>na sua equipe.</span></h2><span className="contact-big-arrow"><ArrowUpRight strokeWidth={1} /></span></a></Reveal><Reveal className="contact-bottom"><div><p>Tem uma oportunidade ou quer conhecer meu trabalho?</p><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy-button" onClick={copy} aria-label={copied ? 'E-mail copiado' : 'Copiar e-mail'}>{copied ? <Check size={17} /> : <Copy size={17} />}</button><span className="copy-status" aria-live="polite">{copied ? 'Copiado!' : ''}</span></div></div><div className="contact-links"><MagneticLink href={profile.github} target="_blank"><Github size={17} />GitHub<ArrowUpRight size={14} /></MagneticLink><MagneticLink href={profile.linkedin} target="_blank"><Linkedin size={17} />LinkedIn<ArrowUpRight size={14} /></MagneticLink><MagneticLink href="/curriculo" target="_blank"><FileText size={17} />Currículo<ArrowUpRight size={14} /></MagneticLink></div></Reveal><footer className="footer"><a className="footer-brand" href="#inicio">carlos franco<span>.</span></a><span>ENGENHARIA DE SOFTWARE / FEITO COM INTENÇÃO</span><a href="#inicio" className="back-top">VOLTAR AO TOPO<ArrowUpRight size={15} /></a></footer></div></section>
}

function Portfolio() {
  const { moving } = useExperience()
  const page = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  useLayoutEffect(() => {
    if (!moving) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1, anchors: { offset: -96 }, prevent: node => !!node.closest('dialog') })
    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    const ctx = gsap.context(() => {
      gsap.fromTo('.statement-word', { opacity: .18 }, { opacity: 1, stagger: .15, ease: 'none', scrollTrigger: { trigger: '.scroll-statement', start: 'top 82%', end: 'bottom 45%', scrub: .6 } })
      gsap.fromTo('.timeline-track-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 65%', scrub: .6 } })
      gsap.fromTo('.about-identity .identity-mark', { rotate: -8, y: 35 }, { rotate: 7, y: -35, ease: 'none', scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
    }, page)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { ctx.revert(); gsap.ticker.remove(ticker); lenis.destroy(); window.removeEventListener('load', refresh) }
  }, [moving])
  useEffect(() => { document.title = 'Carlos Franco — Engenheiro de Software' }, [])
  return <div className="portfolio" ref={page}>
    <a className="skip-link" href="#projetos">Pular para os projetos</a>
    <Cursor /><div className="ambient-noise" aria-hidden="true" />
    {moving && <motion.div className="intro-curtain" aria-hidden="true" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: .85, ease: [.76, 0, .24, 1] }} />}
    <Header /><main><Hero /><TechMarquee /><Projects onSelect={setSelected} /><About /><Stack /><AILab /><Timeline /><Contact /></main>
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </div>
}

export default function App() {
  if (window.location.pathname.replace(/\/$/, '') === '/curriculo') return <Resume />
  return <ExperienceProvider><Portfolio /></ExperienceProvider>
}
