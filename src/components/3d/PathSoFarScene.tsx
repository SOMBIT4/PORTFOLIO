import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface TimelineNodeProps {
  position: [number, number, number]
  index: number
  total: number
  color: string
  reduced: boolean
}

function TimelineNode({ position, index, total, color, reduced }: TimelineNodeProps) {
  const ref = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!ref.current || reduced) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.3 + index
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2 + index) * 0.1)
    }
  })

  return (
    <group position={position}>
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.3} floatIntensity={reduced ? 0 : 0.5}>
        <group ref={ref}>
          {/* Core node */}
          <mesh>
            <octahedronGeometry args={[0.35, 0]} />
            <meshPhysicalMaterial
              color={color}
              metalness={0.6}
              roughness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
          
          {/* Glow effect */}
          <mesh ref={glowRef}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
          
          {/* Ring indicator */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.03, 12, 32]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      </Float>
      
      {/* Connection line to next node */}
      {index < total - 1 && (
        <mesh position={[0, 0, 1.5]}>
          <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      )}
    </group>
  )
}

function PathTimeline({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const milestones = [
    { color: '#89aafc', label: 'NOW' },
    { color: '#ffb778', label: 'AWARD' },
    { color: '#9df5f3', label: '2026' }
  ]

  useFrame((state) => {
    if (!groupRef.current || reduced) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
  })

  return (
    <group ref={groupRef}>
      {milestones.map((milestone, i) => (
        <TimelineNode
          key={i}
          position={[0, 0, i * 3]}
          index={i}
          total={milestones.length}
          color={milestone.color}
          reduced={reduced}
        />
      ))}
      
      {/* Central spine */}
      <mesh position={[0, 0, 3]}>
        <cylinderGeometry args={[0.04, 0.04, 9, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} opacity={0.3} transparent />
      </mesh>
    </group>
  )
}

function ParticleField({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null)
  
  const particleCount = 100
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!points.current || reduced) return
    points.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#89aafc" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function PathSoFarScene({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ height: '100%', width: '100%' }}
    >
      <color attach="background" args={['#0a0e1a']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#89aafc" />
      <pointLight position={[-5, 3, -2]} intensity={40} color="#ffb778" />
      <pointLight position={[5, -3, 4]} intensity={30} color="#9df5f3" />
      
      {/* Scene content */}
      <PathTimeline reduced={reduced} />
      <ParticleField reduced={reduced} />
      
      {/* Controls */}
      {!reduced && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.5}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      )}
    </Canvas>
  )
}
