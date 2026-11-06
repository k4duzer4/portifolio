import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type Point = { x: number; y: number; z: number }
const count = 180, columns = 36
const shapes: Point[][] = [[], [], []]
for (let i = 0; i < count; i++) {
  const row = Math.floor(i / columns), u = (i % columns) / columns
  const a = u * Math.PI * 2, latitude = (row - 2) * .4
  shapes[0].push({ x: Math.cos(a) * Math.cos(latitude) * 1.12, y: Math.sin(latitude) * 1.12, z: Math.sin(a) * Math.cos(latitude) * 1.12 })
  shapes[1].push({ x: (u - .5) * 2.7, y: Math.sin(u * Math.PI * 2 + row * .34) * .3 + (row - 2) * .13, z: Math.cos(u * Math.PI * 2 + row * .32) * .25 })
  const radius = Math.sqrt((i + .5) / count) * 1.14, theta = i * 2.399963
  shapes[2].push({ x: Math.cos(theta) * radius, y: Math.sin(theta) * radius * .83, z: Math.sin(i * 1.7) * .2 })
}
const links: [number, number][] = []
for (let i = 0; i < count; i++) {
  const nearest = shapes[2].map((p, j) => ({ j, d: Math.hypot(p.x - shapes[2][i].x, p.y - shapes[2][i].y) })).filter(p => p.j > i && p.d < .24).sort((a, b) => a.d - b.d).slice(0, 2)
  nearest.forEach(({ j }) => links.push([i, j]))
}
const mix = (a: number, b: number, t: number) => a + (b - a) * t

export default function OrbitField({ moving, active, step, pointer }: { moving: boolean; active: boolean; step: number; pointer: RefObject<{ x: number; y: number }> }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const phase = useRef(step), time = useRef(0), follow = useRef({ x: 0, y: 0 })
  const settings = useRef({ moving, active, step })
  settings.current = { moving, active, step }
  const redraw = useRef<() => void>(() => {})
  useEffect(() => { redraw.current() }, [step, moving, active])
  useEffect(() => {
    const element = canvas.current, ctx = element?.getContext('2d')
    if (!element || !ctx) return
    let width = 1, height = 1, frame = 0, last = 0
    const render = (timestamp = performance.now()) => {
      frame = 0
      const state = settings.current
      const dt = last ? Math.min((timestamp - last) / 1000, .04) : .016
      last = timestamp
      if (state.moving && state.active) time.current += dt
      const scroll = state.moving ? Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * .85))) : 0
      const target = state.step + scroll * 1.05
      phase.current = state.moving ? mix(phase.current, target, 1 - Math.exp(-dt * 3.4)) : target
      const normalized = ((phase.current % 3) + 3) % 3, from = Math.floor(normalized), to = (from + 1) % 3
      const fraction = normalized - from, blend = fraction * fraction * (3 - 2 * fraction)
      const weights = [0, 0, 0]; weights[from] = 1 - blend; weights[to] += blend
      const ease = state.moving ? 1 - Math.exp(-dt * 2.6) : 1
      follow.current.x = mix(follow.current.x, state.moving ? pointer.current.x : 0, ease)
      follow.current.y = mix(follow.current.y, state.moving ? pointer.current.y : 0, ease)
      const t = time.current, yaw = t * .085 + follow.current.x * .24, pitch = -.26 + follow.current.y * .18 + scroll * .15
      const scale = Math.min(width * .33, height * .35)
      ctx.clearRect(0, 0, width, height)
      const projected = shapes[from].map((a, i) => {
        const b = shapes[to][i]
        const x = mix(a.x, b.x, blend), y = mix(a.y, b.y, blend), z = mix(a.z, b.z, blend)
        const x1 = x * Math.cos(yaw) - z * Math.sin(yaw), z1 = x * Math.sin(yaw) + z * Math.cos(yaw)
        const y1 = y * Math.cos(pitch) - z1 * Math.sin(pitch), depth = y * Math.sin(pitch) + z1 * Math.cos(pitch)
        const lens = 4 / (4 - depth * .27)
        return { x: width * .5 + x1 * scale * lens, y: height * .49 + y1 * scale * lens, depth, i }
      })
      const line = (a: number, b: number, alpha: number) => {
        ctx.strokeStyle = `rgba(174,178,177,${alpha})`; ctx.lineWidth = .65
        ctx.beginPath(); ctx.moveTo(projected[a].x, projected[a].y); ctx.lineTo(projected[b].x, projected[b].y); ctx.stroke()
      }
      if (weights[0] + weights[1] > .01) {
        for (let row = 0; row < 5; row++) for (let col = 0; col < columns - 1; col++) line(row * columns + col, row * columns + col + 1, .15 * (weights[0] + weights[1]))
        for (let row = 0; row < 5; row++) line(row * columns + columns - 1, row * columns, .15 * weights[0])
        for (let col = 0; col < columns; col += 6) for (let row = 0; row < 4; row++) line(row * columns + col, (row + 1) * columns + col, .065 * weights[0])
      }
      if (weights[2] > .01) links.forEach(([a, b]) => line(a, b, .15 * weights[2]))
      projected.sort((a, b) => a.depth - b.depth).forEach(p => {
        const focus = (p.depth + 1.6) / 3.2, accent = p.i % 37 === 0
        ctx.fillStyle = accent ? `rgba(255,143,105,${.65 + focus * .3})` : `rgba(223,225,217,${.2 + focus * .48})`
        ctx.beginPath(); ctx.arc(p.x, p.y, accent ? 2.1 : .85 + focus * .5, 0, Math.PI * 2); ctx.fill()
        if (accent) { ctx.strokeStyle = '#ff8f6922'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.stroke() }
      })
      if (state.moving && state.active) frame = requestAnimationFrame(render)
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(render) }
    redraw.current = request
    const resize = () => {
      const bounds = element.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      width = bounds.width; height = bounds.height
      element.width = Math.round(width * dpr); element.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); request()
    }
    const observer = new ResizeObserver(resize); observer.observe(element); resize()
    return () => { observer.disconnect(); cancelAnimationFrame(frame); redraw.current = () => {} }
  }, [pointer])
  return <canvas ref={canvas} aria-hidden="true" />
}
