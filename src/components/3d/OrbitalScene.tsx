/** Lightweight original WebGL sculpture: a kinetic engineering core, not a downloaded model. */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import type { Group, Mesh } from 'three'

function Core() {
  const group = useRef<Group>(null)
  const inner = useRef<Mesh>(null)
  const positions = useMemo(() => {
    const points = new Float32Array(180 * 3)
    // Deterministic pseudo-random field avoids new geometry per render.
    for (let i = 0; i < 180; i++) {
      const u = ((i * 67) % 263) / 263
      const v = ((i * 131) % 269) / 269
      const theta = u * Math.PI * 2
      const phi = Math.acos(2 * v - 1)
      const r = 3.2 + ((i * 37) % 73) / 74 * 1.5
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      points[i * 3 + 2] = r * Math.cos(phi)
    }
    return points
  }, [])
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.11
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.19) * 0.12
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.28
  })
  return <group ref={group}>
    <Float speed={1.45} rotationIntensity={0.1} floatIntensity={0.17}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 4]} />
        <meshPhysicalMaterial color="#b9e18d" roughness={0.28} metalness={0.35} clearcoat={0.85} clearcoatRoughness={0.15} wireframe />
      </mesh>
      <mesh scale={0.94}>
        <icosahedronGeometry args={[1.15, 2]}/>
        <meshPhysicalMaterial color="#263c29" roughness={0.23} metalness={0.42} clearcoat={1} />
      </mesh>
      <mesh rotation={[0.8, -0.15, 0.4]}>
        <torusGeometry args={[1.77, 0.018, 10, 96]}/>
        <meshStandardMaterial color="#d5ff8b" metalness={0.28} emissive="#98cb46" emissiveIntensity={0.3}/>
      </mesh>
      <mesh rotation={[1.8, 0.6, 0.35]}>
        <torusGeometry args={[2.08, 0.011, 8, 96]}/>
        <meshStandardMaterial color="#94ad8a" transparent opacity={0.65}/>
      </mesh>
      <mesh rotation={[0.3, 1.2, 1.5]}>
        <torusGeometry args={[1.52, 0.008, 8, 96]}/>
        <meshStandardMaterial color="#9dcca0" transparent opacity={0.65}/>
      </mesh>
      <mesh position={[1.44, 0.58, 0.5]}>
        <sphereGeometry args={[0.085, 16, 16]}/>
        <meshStandardMaterial color="#dbff9c" emissive="#c8ff74" emissiveIntensity={1.5}/>
      </mesh>
    </Float>
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]}/></bufferGeometry>
      <pointsMaterial color="#bfe8a6" size={0.027} transparent opacity={0.65} sizeAttenuation depthWrite={false}/>
    </points>
  </group>
}

export default function OrbitalScene({ active = true }: { active?: boolean }) {
  return <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.35]} camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ alpha: true, antialias:true, powerPreference:'low-power' }} aria-label="Interactive 3D orbital engineering sculpture">
    <ambientLight intensity={1.15} />
    <directionalLight position={[4, 7, 5]} intensity={2.4} color="#d8ffb0" />
    <pointLight position={[-4, -2, 3]} intensity={2} color="#90b5bd" />
    <Core />
    <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.045} autoRotate autoRotateSpeed={0.43} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI * 2 / 3}/>
  </Canvas>
}
