import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { engineeringNotes } from '@/data/engineeringNotes'

function BookingConstraint() {
  return <group>
    <RoundedBox args={[3.65,.28,2.25]} radius={.13} smoothness={4} position={[0,-.65,0]}><meshStandardMaterial color="#1b3455" metalness={.55} roughness={.21}/></RoundedBox>
    {[-1.05,0,1.05].map((x,i)=><group key={x} position={[x,0,0]}>
      <RoundedBox args={[.73,i===1?1.7:1.35,.75]} radius={.13} smoothness={4} position={[0,i===1?.15:0,0]}><meshPhysicalMaterial color={i===1?'#89aafc':'#84fbe4'} metalness={.4} roughness={.17} clearcoat={1}/></RoundedBox>
      <mesh position={[0,i===1?1.07:.75,0]}><sphereGeometry args={[.12,14,14]}/><meshBasicMaterial color="#effffe"/></mesh>
    </group>)}
    <mesh position={[0,.05,.6]}><boxGeometry args={[3.25,.04,.08]}/><meshBasicMaterial color="#a3d6ff"/></mesh>
    <mesh position={[0,.12,.65]}><boxGeometry args={[.08,.85,.06]}/><meshBasicMaterial color="#a1eeec" transparent opacity={.55}/></mesh>
  </group>
}
function ConcurrentSeats() {
  return <group>
    <mesh rotation={[.4,.3,.2]}><torusGeometry args={[1.46,.085,12,80]}/><meshStandardMaterial color="#ffb778" emissive="#bd4c62" emissiveIntensity={.7} metalness={.24}/></mesh>
    <mesh rotation={[1.4,.4,0]}><torusGeometry args={[1.1,.042,10,80]}/><meshBasicMaterial color="#fa639b"/></mesh>
    <mesh><dodecahedronGeometry args={[.98]}/><meshPhysicalMaterial color="#534372" metalness={.6} roughness={.2}/></mesh>
    {[-1,1].map((side)=><group key={side} position={[side*1.5,.05,.6]}><RoundedBox args={[.49,.62,.36]} radius={.13} smoothness={3}><meshStandardMaterial color={side===1?'#ffc484':'#f678a8'} metalness={.22} roughness={.18}/></RoundedBox><mesh position={[0,.49,0]}><sphereGeometry args={[.12,12,12]}/><meshBasicMaterial color="#fff6e9"/></mesh></group>)}
  </group>
}
function Tenants() {
  return <group>
    {Array.from({length:3},(_,i)=>{const a=i*Math.PI*2/3;const x=Math.cos(a)*1.37;const z=Math.sin(a)*1.37;return <group key={i} position={[x,.03,z]}>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.75,.036,9,58]}/><meshBasicMaterial color={i===0?'#9df5f3':i===1?'#a6a9ff':'#d3a2ff'}/></mesh>
      <mesh><cylinderGeometry args={[.46,.46,1.05,6]}/><meshStandardMaterial color={i===0?'#88f1e5':i===1?'#7e9fff':'#b99bff'} metalness={.55} roughness={.2}/></mesh>
      <mesh position={[0,.72,0]}><octahedronGeometry args={[.21]}/><meshBasicMaterial color="#f3feff"/></mesh>
    </group>})}
    <mesh rotation={[0,.3,0]}><octahedronGeometry args={[.6]}/><meshPhysicalMaterial color="#d1c7ff" metalness={.3} roughness={.12}/></mesh>
  </group>
}
function Model({index,reduced}:{index:number;reduced:boolean}){
  const ref=useRef<THREE.Group>(null)
  useFrame((state,delta)=>{
    if(!ref.current||reduced)return
    ref.current.rotation.y+=Math.min(delta,.05)*.21
    ref.current.position.y=Math.sin(state.clock.elapsedTime*.8)*.11
  })
  const ModelComponent=[BookingConstraint,ConcurrentSeats,Tenants][index]||BookingConstraint
  return <group ref={ref}><Float speed={reduced?0:.9} rotationIntensity={reduced?0:.12} floatIntensity={reduced?0:.2}><ModelComponent/></Float></group>
}
export default function LabScene({index,reduced}:{index:number;reduced:boolean}){
  const note=engineeringNotes[index]
  return <Canvas camera={{position:[0,1.2,6.8],fov:43}} dpr={[1,1.5]} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}} style={{height:'100%',width:'100%'}}>
    <ambientLight intensity={1.2}/>
    <directionalLight position={[3,5,4]} intensity={3.6} color={note.color}/>
    <pointLight position={[-3,1,-3]} intensity={45} color={note.secondColor}/>
    <Model index={index} reduced={reduced}/>
    {!reduced&&<OrbitControls enablePan={false} enableZoom={false} rotateSpeed={.42} minPolarAngle={.65} maxPolarAngle={2.05}/>}
  </Canvas>
}
