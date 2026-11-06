import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { Atom, Grip, Orbit, RotateCcw, Sparkles, Waves, Zap } from 'lucide-react'
import { useExperience } from './Motion'
import type { OrbitMode, OrbitRotation } from './NeuralScene'
import './neural-orbit.css'

const NeuralScene = lazy(() => import('./NeuralScene'))
const modes = [
  { id: 'surface', label: 'Escultura', icon: Orbit },
  { id: 'particles', label: 'Partículas', icon: Atom },
  { id: 'galaxy', label: 'Galáxia', icon: Sparkles },
] as const

function LoadingOrbit() {
  return <div className="neural-loading" aria-hidden="true"><div className="neural-loading-orbit"><i /><i /><i /><span /></div><span>CONECTANDO PONTOS</span></div>
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <div className="neural-loading neural-static"><div className="neural-loading-orbit"><i /><i /><i /><span /></div><span>NEURAL ORBIT / MODO LEVE</span></div> : this.props.children }
}

export default function NeuralOrbit() {
  const { moving } = useExperience()
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: '100px' })
  const [mode, setMode] = useState<OrbitMode>('surface')
  const [energy, setEnergy] = useState(.65)
  const [pulse, setPulse] = useState(0)
  const [pulsing, setPulsing] = useState(false)
  const [ready, setReady] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [revision, setRevision] = useState(0)
  const [pageVisible, setPageVisible] = useState(true)
  const rotation = useRef<OrbitRotation>({ x: 0, y: 0 })
  const drag = useRef<{ x: number; y: number; pointer: number } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const sceneReady = useCallback(() => setReady(true), [])
  useEffect(() => {
    const change = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', change)
    return () => { document.removeEventListener('visibilitychange', change); clearTimeout(timer.current) }
  }, [])
  function release() { drag.current = null; setDragging(false) }
  function triggerPulse() {
    clearTimeout(timer.current); setPulse(value => value + 1); setPulsing(true)
    timer.current = setTimeout(() => setPulsing(false), moving ? 2100 : 300)
  }
  return <motion.div ref={ref} className={`hero-scene neural-experiment ${ready ? 'neural-ready' : ''} ${dragging ? 'neural-dragging' : ''} ${pulsing ? 'neural-pulsing' : ''}`} initial={moving ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: moving ? 1 : 0, delay: .25 }} aria-label="Experimento interativo Neural Orbit">
    <div className="neural-heading"><div><span className="neural-index">EXPERIMENTO / 001</span><h2>Neural Orbit<span>®</span></h2></div><span className="neural-status"><i />{!ready ? 'INICIALIZANDO' : pulsing ? 'PULSO ATIVO' : 'INTERATIVO'}</span></div>
    <div className="neural-viewfinder" aria-hidden="true"><i /><i /><i /><i /></div>
    <div className="scene-glow" aria-hidden="true" /><div className="scene-ring scene-ring-one" aria-hidden="true" /><div className="scene-ring scene-ring-two" aria-hidden="true" /><div className="scene-ring scene-ring-three" aria-hidden="true" />
    <div className="neural-trace neural-trace-one" aria-hidden="true" /><div className="neural-trace neural-trace-two" aria-hidden="true" />
    <div className="scene-canvas neural-canvas" role="img" aria-label={`Escultura 3D interativa em modo ${modes.find(item => item.id === mode)?.label}. Arraste para girar ou use os controles abaixo.`} onPointerDown={event => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, pointer: event.pointerId }; setDragging(true) }} onPointerMove={event => { if (!drag.current || drag.current.pointer !== event.pointerId) return; rotation.current.x += (event.clientY - drag.current.y) * .006; rotation.current.y += (event.clientX - drag.current.x) * .006; drag.current = { x: event.clientX, y: event.clientY, pointer: event.pointerId }; if (!moving) setRevision(value => value + 1) }} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
      <SceneBoundary><Suspense fallback={<LoadingOrbit />}><NeuralScene moving={moving && pageVisible} visible={visible} mode={mode} energy={energy} pulse={pulse} rotation={rotation} revision={revision} onReady={sceneReady} /></Suspense></SceneBoundary>
    </div>
    <div className="neural-drag-hint"><Grip size={12} /><span>{dragging ? 'EXPLORANDO A FORMA' : 'ARRASTE PARA GIRAR'}</span><button type="button" onClick={() => { rotation.current.x = 0; rotation.current.y = 0; setRevision(value => value + 1) }} aria-label="Restaurar orientação"><RotateCcw size={12} /></button></div>
    <div className="neural-control-deck">
      <div className="neural-mode-picker" role="group" aria-label="Forma do Neural Orbit">{modes.map(({ id, label, icon: Icon }) => <button type="button" key={id} onClick={() => setMode(id)} aria-pressed={mode === id} className={mode === id ? 'neural-mode-active' : ''}>{mode === id && <motion.span className="neural-mode-highlight" layoutId="neural-mode-highlight" transition={{ type: 'spring', stiffness: 340, damping: 32 }} />}<Icon size={15} strokeWidth={1.5} /><span>{label}</span></button>)}</div>
      <div className="neural-tools"><label className="neural-energy" htmlFor="orbit-energy"><span><Waves size={12} />Energia <output htmlFor="orbit-energy">{Math.round(energy * 100)}%</output></span><input id="orbit-energy" type="range" min=".2" max="1" step=".01" value={energy} onChange={event => setEnergy(Number(event.target.value))} /></label><button type="button" className="neural-pulse-button" onClick={triggerPulse}><span className="neural-pulse-icon"><Zap size={16} fill="currentColor" /></span><span>{pulsing ? 'Reconectando…' : 'Emitir pulso'}</span><span className="neural-pulse-shortcut" aria-hidden="true">↗</span></button></div>
    </div>
    <span className="sr-only" aria-live="polite">{pulsing ? 'Pulso de energia ativado.' : `Modo ${modes.find(item => item.id === mode)?.label} selecionado.`}</span>
  </motion.div>
}
