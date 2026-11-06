import { useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Group, MathUtils, Mesh, MeshPhysicalMaterial, Points, ShaderMaterial, TorusKnotGeometry } from 'three'

export type OrbitMode = 'surface' | 'particles' | 'galaxy'
export type OrbitRotation = { x: number; y: number }
type SceneProps = { moving: boolean; visible: boolean; mode: OrbitMode; energy: number; pulse: number; rotation: RefObject<OrbitRotation>; revision: number; onReady: () => void }
const vertexShader = `
  uniform float uTime;
  uniform float uGalaxy;
  uniform float uPulse;
  uniform float uEntrance;
  uniform float uEnergy;
  uniform float uSize;
  uniform vec2 uPointer;
  attribute vec3 aGalaxy;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vBrightness;
  void main() {
    vec3 galaxy = aGalaxy;
    float spin = uTime * .07 * (1.4 - length(galaxy.xy) * .2);
    galaxy.x = aGalaxy.x * cos(spin) - aGalaxy.y * sin(spin);
    galaxy.y = aGalaxy.x * sin(spin) + aGalaxy.y * cos(spin);
    vec3 p = mix(position, galaxy, uGalaxy);
    p += normalize(position + .001) * sin(aRandom * 14.0 + uTime * .6) * .022 * uEnergy;
    p += aScatter * uPulse * (.6 + aRandom * .8);
    p = mix(aScatter * 1.3, p, uEntrance);
    vec2 diff = p.xy - uPointer * 2.1;
    float repulsion = (1.0 - smoothstep(.0, .85, length(diff))) * .16 * uEnergy;
    p.xy += normalize(diff + .001) * repulsion;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(uSize * (1.0 + aRandom * .8) / -mv.z, 1.0, 4.0);
    vBrightness = .35 + aRandom * .5 + uPulse * .5;
  }
`
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vBrightness;
  void main() {
    float d = length(gl_PointCoord - .5);
    if (d > .5) discard;
    float core = exp(-d * 9.0);
    vec3 color = mix(uColor, vec3(1.0, .89, .72), core * .65);
    gl_FragColor = vec4(color * (1.0 + core), (1.0 - smoothstep(.08, .5, d)) * uOpacity * vBrightness);
  }
`
function Sculpture({ moving, mode, energy, pulse, rotation, revision, onReady }: Omit<SceneProps, 'visible'>) {
  const group = useRef<Group>(null), mesh = useRef<Mesh>(null), dust = useRef<Points>(null)
  const time = useRef(0), entrance = useRef(moving ? 0 : 1), shock = useRef(0), lastPulse = useRef(pulse)
  const lastRotation = useRef({ x: 0, y: 0 })
  const { pointer, invalidate } = useThree()
  const [compact] = useState(() => window.innerWidth < 700)
  const geometry = useMemo(() => new TorusKnotGeometry(1.06, .245, compact ? 200 : 340, compact ? 18 : 28, 2, 3), [compact])
  const dotGeometry = useMemo(() => {
    const g = new BufferGeometry(), positions = geometry.getAttribute('position').array
    const count = positions.length / 3, galaxy = [], scatter = [], random = []
    for (let i = 0; i < count; i++) {
      const n = Math.abs(Math.sin(i * 127.1 + 311.7)), r = .13 + Math.sqrt(n) * 2.1
      const a = r * 2.4 + (i % 3) * Math.PI * 2 / 3 + Math.sin(i * 1.9) * .18
      galaxy.push(Math.cos(a) * r, Math.sin(a) * r, Math.sin(i * 7.3) * .16 * (1.1 - r * .2))
      const phi = i * 2.399963, z = (i / count) * 2 - 1, f = Math.sqrt(1 - z * z)
      scatter.push(Math.cos(phi) * f * 3, Math.sin(phi) * f * 3, z * 2)
      random.push(n)
    }
    g.setAttribute('position', new Float32BufferAttribute(positions, 3))
    g.setAttribute('aGalaxy', new Float32BufferAttribute(galaxy, 3))
    g.setAttribute('aScatter', new Float32BufferAttribute(scatter, 3))
    g.setAttribute('aRandom', new Float32BufferAttribute(random, 1))
    return g
  }, [geometry])
  const stars = useMemo(() => {
    const positions = []
    for (let i = 0; i < (compact ? 110 : 220); i++) {
      const a = i * 2.399963, r = 1.8 + Math.abs(Math.sin(i * 7.3)) * .8
      positions.push(Math.cos(a) * r, Math.sin(a) * r * .82, Math.sin(i) * .8 - 1)
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(positions, 3)); return g
  }, [compact])
  const color = useMemo(() => ({ copper: new Color('#ff976a'), galaxy: new Color('#ffc293') }), [])
  const material = useMemo(() => new ShaderMaterial({ vertexShader, fragmentShader, uniforms: { uTime: { value: 0 }, uGalaxy: { value: 0 }, uPulse: { value: 0 }, uEntrance: { value: 0 }, uEnergy: { value: .65 }, uPointer: { value: [0, 0] }, uSize: { value: compact ? 11 : 12 }, uColor: { value: new Color('#ff976a') }, uOpacity: { value: .8 } }, transparent: true, depthWrite: false, blending: AdditiveBlending }), [compact])
  useEffect(() => { const a = requestAnimationFrame(() => { invalidate(); onReady() }); return () => cancelAnimationFrame(a) }, [invalidate, onReady])
  useEffect(() => { invalidate() }, [mode, moving, energy, pulse, revision, invalidate])
  useEffect(() => () => { geometry.dispose(); dotGeometry.dispose(); stars.dispose(); material.dispose() }, [geometry, dotGeometry, stars, material])
  useFrame((_, delta) => {
    if (!group.current) return
    const dt = Math.min(delta, .05), smooth = moving ? 1 - Math.exp(-dt * 4) : 1
    if (moving) { time.current += dt * (.35 + energy * 1.1); entrance.current = Math.min(1, entrance.current + dt / 2) } else entrance.current = 1
    if (pulse !== lastPulse.current) { lastPulse.current = pulse; shock.current = moving ? 1 : 0 }
    if (moving) shock.current = Math.max(0, shock.current - dt * .65)
    const t = time.current, formed = 1 - Math.pow(1 - entrance.current, 3), burst = Math.sin(shock.current * Math.PI)
    if (moving) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, Math.sin(t * .18) * .28 + pointer.x * .13 + rotation.current.y, smooth * .6)
      group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, .28 + Math.sin(t * .21) * .1 - pointer.y * .08 + rotation.current.x, smooth * .6)
      group.current.rotation.z = -.3 + t * .055
      group.current.position.y = Math.sin(t * .6) * .055
      if (dust.current) { dust.current.rotation.z = -t * .045; dust.current.rotation.y = Math.sin(t * .15) * .15 }
    } else {
      group.current.rotation.x += rotation.current.x - lastRotation.current.x
      group.current.rotation.y += rotation.current.y - lastRotation.current.y
    }
    lastRotation.current = { ...rotation.current }
    group.current.scale.setScalar(.92 + formed * .08 + burst * .025)
    const targetOpacity = mode === 'surface' ? .88 * formed * (1 - burst * .92) : 0
    if (mesh.current) {
      const m = mesh.current.material as MeshPhysicalMaterial
      m.opacity = MathUtils.lerp(m.opacity, targetOpacity, smooth)
      mesh.current.visible = m.opacity > .005
      m.emissiveIntensity = .1 + energy * .08 + burst * .3
    }
    material.uniforms.uTime.value = t
    material.uniforms.uGalaxy.value = MathUtils.lerp(material.uniforms.uGalaxy.value, mode === 'galaxy' ? 1 : 0, smooth * .65)
    material.uniforms.uPulse.value = burst
    material.uniforms.uEntrance.value = formed
    material.uniforms.uEnergy.value = energy
    material.uniforms.uPointer.value = moving ? [pointer.x, pointer.y] : [0, 0]
    material.uniforms.uOpacity.value = MathUtils.lerp(material.uniforms.uOpacity.value, mode === 'surface' ? .3 + burst * .9 : .95, smooth)
    material.uniforms.uColor.value.lerp(mode === 'galaxy' ? color.galaxy : color.copper, smooth)
  })
  return <group><group ref={group} rotation={[.28, .2, -.3]}><mesh ref={mesh} geometry={geometry}><meshPhysicalMaterial color="#9b4c30" metalness={.67} roughness={.36} clearcoat={.72} clearcoatRoughness={.32} emissive="#552614" emissiveIntensity={.12} transparent opacity={0} /></mesh><points geometry={dotGeometry} material={material} scale={1.005} /></group><points ref={dust} geometry={stars}><pointsMaterial size={.011} color="#ffd2ab" transparent opacity={.5} depthWrite={false} /></points></group>
}

export default function NeuralScene({ moving, visible, ...props }: SceneProps) {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6.2], fov: 42 }} frameloop={moving && visible ? 'always' : 'demand'} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}><ambientLight intensity={.9} color="#ffe1c7" /><directionalLight position={[2, 4, 5]} intensity={3.4} color="#fff0db" /><pointLight position={[-3, .5, 2]} intensity={15} color="#ff9563" /><pointLight position={[3, -2, 2]} intensity={12} color="#bed0dc" /><Sculpture moving={moving && visible} {...props} /></Canvas>
}
