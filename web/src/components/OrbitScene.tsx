import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Group, Mesh, MeshPhysicalMaterial, Points, ShaderMaterial, TorusKnotGeometry } from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  attribute vec3 aNormal;
  varying float vDepth;
  void main() {
    float wave = sin(position.y * 4.0 + uTime * .7) * .035;
    vec3 p = position + aNormal * (wave + uMorph * (.18 + .12 * sin(position.x * 3.0 + uTime)));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(12.0 / -mv.z, 1.0, 3.8);
    vDepth = clamp((p.z + 2.0) / 4.0, .2, 1.0);
  }
`
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float d = distance(gl_PointCoord, vec2(.5));
    if(d > .5) discard;
    float alpha = smoothstep(.5, .1, d);
    gl_FragColor = vec4(mix(uColor * .5, vec3(1.0, .83, .68), pow(vDepth, 3.0)), alpha * uOpacity * (.35 + vDepth * .65));
  }
`

function Sculpture({ moving, mode }: { moving: boolean; mode: 'surface' | 'particles' }) {
  const group = useRef<Group>(null), mesh = useRef<Mesh>(null), particles = useRef<Points>(null)
  const elapsed = useRef(0)
  const { pointer, invalidate } = useThree()
  const [compact] = useState(() => window.innerWidth < 700)
  const geometry = useMemo(() => new TorusKnotGeometry(1.15, .32, compact ? 180 : 300, compact ? 12 : 20, 2, 3), [compact])
  const dotGeometry = useMemo(() => {
    const result = new BufferGeometry()
    result.setAttribute('position', geometry.getAttribute('position').clone())
    result.setAttribute('aNormal', geometry.getAttribute('normal').clone())
    return result
  }, [geometry])
  const starGeometry = useMemo(() => {
    const points = []
    for (let i = 0; i < 100; i++) {
      const a = i * 2.39996323, r = 2.1 + (i % 11) * .14
      points.push(Math.cos(a) * r, Math.sin(a) * r * .72, -.8 + (i % 7) * .15)
    }
    const geo = new BufferGeometry(); geo.setAttribute('position', new Float32BufferAttribute(points, 3)); return geo
  }, [])
  const material = useMemo(() => new ShaderMaterial({ vertexShader, fragmentShader, uniforms: { uTime: { value: 0 }, uMorph: { value: 0 }, uColor: { value: new Color('#ff805c') }, uOpacity: { value: .65 } }, transparent: true, depthWrite: false, blending: AdditiveBlending }), [])
  useEffect(() => { invalidate() }, [mode, moving, invalidate])
  useEffect(() => () => { geometry.dispose(); dotGeometry.dispose(); starGeometry.dispose(); material.dispose() }, [geometry, dotGeometry, starGeometry, material])
  useFrame((_, delta) => {
    if (!group.current) return
    if (moving) elapsed.current += Math.min(delta, .05)
    const t = elapsed.current
    if (moving) {
      group.current.rotation.y += (Math.sin(t * .15) * .45 + pointer.x * .18 - group.current.rotation.y) * .035
      group.current.rotation.x += (.3 + Math.sin(t * .22) * .13 - pointer.y * .13 - group.current.rotation.x) * .035
      group.current.rotation.z = -.35 + t * .06
    }
    if (mesh.current) {
      const m = mesh.current.material as MeshPhysicalMaterial
      const target = mode === 'surface' ? .96 : .08
      m.opacity += (target - m.opacity) * (moving ? .055 : 1)
    }
    material.uniforms.uTime.value = t
    material.uniforms.uMorph.value += ((mode === 'particles' ? 1 : 0) - material.uniforms.uMorph.value) * (moving ? .045 : 1)
    material.uniforms.uOpacity.value = mode === 'particles' ? 1 : .32
  })
  return <group>
    <group ref={group} rotation={[.3, .35, -.35]}>
      <mesh ref={mesh} geometry={geometry}><meshPhysicalMaterial color="#b45734" metalness={.82} roughness={.28} clearcoat={.6} clearcoatRoughness={.25} emissive="#32150c" emissiveIntensity={.28} transparent opacity={.96} /></mesh>
      <points ref={particles} geometry={dotGeometry} material={material} scale={1.006} />
    </group>
    <points geometry={starGeometry}><pointsMaterial size={.012} color="#ffb090" transparent opacity={.35} depthWrite={false} /></points>
  </group>
}

export default function OrbitScene({ moving, visible, mode }: { moving: boolean; visible: boolean; mode: 'surface' | 'particles' }) {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6.6], fov: 42 }} frameloop={moving && visible ? 'always' : 'demand'} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} fallback={<div className="orbital-fallback" aria-hidden="true"><span /><span /><span /></div>} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}>
    <ambientLight intensity={.7} color="#ffd8c4" />
    <directionalLight position={[3, 4, 5]} intensity={4.2} color="#fff1dc" />
    <pointLight position={[-3, 1, 2]} intensity={24} color="#ff7041" />
    <pointLight position={[2, -3, 1]} intensity={19} color="#efcab0" />
    <Sculpture moving={moving && visible} mode={mode} />
  </Canvas>
}
