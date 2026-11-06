import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mouse, MoveDown } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useExperience } from './Motion'
import OrbitField from './OrbitField'
import './orbit-field.css'

const forms = ['Órbita', 'Fluxo', 'Conexões']

export default function KineticOrbit() {
  const { moving } = useExperience()
  const root = useRef<HTMLDivElement>(null)
  const visible = useInView(root, { margin: '80px' })
  const [step, setStep] = useState(0)
  const [pageVisible, setPageVisible] = useState(true)
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const change = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', change)
    return () => document.removeEventListener('visibilitychange', change)
  }, [])
  return <motion.div ref={root} className="hero-scene kinetic-orbit" initial={moving ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: moving ? 1.4 : 0, delay: .3 }} aria-label="Experimento interativo Neural Orbit">
    <div className="kinetic-heading"><span>NEURAL ORBIT</span><span>CONEXÕES EM MOVIMENTO</span></div>
    <button className="kinetic-interaction" type="button" aria-label="Transformar conexões" onClick={() => setStep(value => value + 1)} onPointerMove={event => { if (!moving || event.pointerType === 'touch') return; const bounds = event.currentTarget.getBoundingClientRect(); pointer.current = { x: (event.clientX - bounds.left) / bounds.width - .5, y: (event.clientY - bounds.top) / bounds.height - .5 } }} onPointerLeave={() => { pointer.current = { x: 0, y: 0 } }}>
      <div className="scene-canvas kinetic-canvas"><OrbitField moving={moving} active={visible && pageVisible} step={step} pointer={pointer} /></div>
      <span className="kinetic-action"><span className="kinetic-form"><span className="kinetic-dot" />{forms[step % forms.length]}</span><span className="kinetic-transform">Clique para transformar<ArrowUpRight size={15} strokeWidth={1.5} /></span></span>
    </button>
    <div className="kinetic-caption"><span><Mouse size={11} /> EXPLORE COM O CLIQUE</span><span><MoveDown size={11} /> ACOMPANHE NA ROLAGEM</span></div>
    <span className="sr-only" aria-live="polite">Forma selecionada: {forms[step % forms.length]}.</span>
  </motion.div>
}
