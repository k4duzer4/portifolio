import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, MotionConfig, useMotionValue, useSpring } from 'motion/react'

const ExperienceContext = createContext({ moving: true, paused: false, toggleMotion: () => {} })

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(preference.matches)
    preference.addEventListener('change', update)
    update()
    return () => preference.removeEventListener('change', update)
  }, [])
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('orbita-motion') === 'paused' } catch { return false }
  })
  const moving = !paused && !reduced
  useEffect(() => { document.documentElement.dataset.motion = moving ? 'on' : 'off' }, [moving])
  function toggleMotion() {
    setPaused(value => {
      try { localStorage.setItem('orbita-motion', value ? 'on' : 'paused') } catch { /* Storage is optional. */ }
      return !value
    })
  }
  return <ExperienceContext value={{ moving, paused, toggleMotion }}><MotionConfig reducedMotion={moving ? 'user' : 'always'}>{children}</MotionConfig></ExperienceContext>
}

export const useExperience = () => useContext(ExperienceContext)

export function Reveal({ children, className = '', delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const { moving } = useExperience()
  return <motion.div id={id} className={className} initial={moving ? { opacity: 0, y: 42, filter: 'blur(8px)' } : false} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .12 }} transition={{ duration: moving ? .85 : 0, delay: moving ? delay : 0, ease: [.16, 1, .3, 1] }}>{children}</motion.div>
}

export function HeroHeading() {
  const { moving } = useExperience()
  const lines = ['Engenheiro', 'de software.']
  return <h1 className="hero-heading" aria-label="Engenheiro de software.">{lines.map((line, lineIndex) => <span className={`hero-line ${lineIndex ? 'hero-line-accent' : ''}`} aria-hidden="true" key={line}>{[...line].map((char, index) => <motion.span className="hero-char" key={index} initial={moving ? { y: '112%', rotateX: -45, opacity: 0 } : false} animate={{ y: '0%', rotateX: 0, opacity: 1 }} transition={{ duration: moving ? 1.15 : 0, delay: moving ? .22 + lineIndex * .12 + index * .028 : 0, ease: [.16, 1, .3, 1] }}>{char === ' ' ? '\u00a0' : char}</motion.span>)}</span>)}</h1>
}

export function MagneticLink({ href, children, className = '', target, ariaLabel }: { href: string; children: ReactNode; className?: string; target?: string; ariaLabel?: string }) {
  const { moving } = useExperience()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 170, damping: 16 }), sy = useSpring(y, { stiffness: 170, damping: 16 })
  return <motion.a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} aria-label={ariaLabel} className={className} style={{ x: moving ? sx : 0, y: moving ? sy : 0 }} onPointerMove={e => { if (!moving || e.pointerType !== 'mouse') return; const box = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - box.left - box.width / 2) * .13); y.set((e.clientY - box.top - box.height / 2) * .2) }} onPointerLeave={() => { x.set(0); y.set(0) }} whileTap={moving ? { scale: .97 } : undefined}>{children}</motion.a>
}

export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const { moving } = useExperience()
  const [value, setValue] = useState(text)
  const interval = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  useEffect(() => () => clearInterval(interval.current), [])
  function run() {
    if (!moving) return
    clearInterval(interval.current)
    let iteration = 0
    const glyphs = '01{}<>/+=_'
    interval.current = setInterval(() => {
      setValue([...text].map((letter, i) => letter === ' ' || i < iteration ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''))
      iteration += .7
      if (iteration >= text.length) { clearInterval(interval.current); setValue(text) }
    }, 30)
  }
  return <span className={className} onPointerEnter={run} onFocus={run} aria-label={text}><span aria-hidden="true">{value}</span></span>
}

export function Cursor() {
  const { moving } = useExperience()
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 130, damping: 25 }), sy = useSpring(y, { stiffness: 130, damping: 25 })
  const [hovering, setHovering] = useState(false)
  useEffect(() => {
    if (!moving || !matchMedia('(pointer: fine)').matches) return
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setHovering(!!(e.target as Element).closest('a, button, summary')) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [moving, x, y])
  if (!moving) return null
  return <motion.div className={`orbit-cursor ${hovering ? 'orbit-cursor-active' : ''}`} aria-hidden="true" style={{ x: sx, y: sy }} />
}
