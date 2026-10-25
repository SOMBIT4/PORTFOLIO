import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'
import { useRef, type JSX } from 'react'
import * as THREE from 'three'
import type { ProjectId } from '@/data/projects'
import { projectVisuals } from '@/data/projectVisuals'

interface SceneProps { id: ProjectId; interactive?: boolean; reducedMotion?: boolean; miniature?: boolean }

function Pylon({ position, height, color }: {position: [number,number,number];height:number;color:string}) {
  return <group position={position}>
    <RoundedBox args={[.85,height,.85]} radius={.12} smoothness={3} position={[0,height/2,0]}>
      <meshPhysicalMaterial color={color} metalness={.45} roughness={.19} clearcoat={1} clearcoatRoughness={.14}/>
    </RoundedBox>
    <mesh position={[0,height+.025,0]}>
      <boxGeometry args={[.64,.035,.64]}/><meshBasicMaterial color="#e7fffc" />
    </mesh>
    {Array.from({length:4},(_,i)=><mesh key={i} position={[0,.3+i*.33,.433]}>
      <boxGeometry args={[.55,.02,.01]}/><meshBasicMaterial color="#0A2140" transparent opacity={.38}/>
    </mesh>)}
  </group>
}
function Workspace() {
  return <group rotation={[0,-.38,0]} position={[0,-.42,0]}>
    <RoundedBox args={[4.2,.22,3.1]} radius={.12} smoothness={4} position={[0,-.15,0]}><meshStandardMaterial color="#10345d" metalness={.6} roughness={.25}/></RoundedBox>
    <Pylon position={[-1.2,0,.15]} height={1.85} color="#64efd6"/>
    <Pylon position={[0,0,-.55]} height={2.8} color="#8fa3ff"/>
    <Pylon position={[1.2,0,.4]} height={2.2} color="#53c7ff"/>
    {[-1.7,-.55,.65,1.8].map((x,i)=><mesh key={x} position={[x,-.025,1.12]}><boxGeometry args={[.43,.055,.44]}/><meshBasicMaterial color={i%2?'#9edaff':'#8ff9dc'}/></mesh>)}
  </group>
}
function Transit() {
  return <group>
    <mesh rotation={[.32,.3,-.28]}><torusGeometry args={[1.65,.045,12,100]}/><meshStandardMaterial color="#FFB564" emissive="#FF6B6B" emissiveIntensity={.8}/></mesh>
    <mesh rotation={[1.35,-.4,.6]}><torusGeometry args={[1.35,.026,8,100]}/><meshBasicMaterial color="#ff8bb1"/></mesh>
    <mesh><icosahedronGeometry args={[1.1,2]}/><meshPhysicalMaterial color="#382747" metalness={.72} roughness={.17} flatShading/></mesh>
    {Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <mesh key={i} position={[Math.sin(a)*1.68,Math.cos(a)*.62,Math.cos(a)*1.12]}><sphereGeometry args={[i%2?.105:.15,12,12]}/><meshBasicMaterial color={i%2?'#ffdf93':'#ff7caa'}/></mesh>})}
    <group position={[0,0,1.45]} rotation={[0,-.15,0]}>
      <RoundedBox args={[1.15,.38,.62]} radius={.16} smoothness={4}><meshStandardMaterial color="#ffe2b3" metalness={.45} roughness={.16}/></RoundedBox>
      {[-.36,.36].map(x=><mesh key={x} position={[x,-.26,.32]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.16,.08,10,20]}/><meshBasicMaterial color="#231b35"/></mesh>)}
    </group>
  </group>
}
function Commerce() {
  return <group>
    <mesh rotation={[.4,.1,.3]}><icosahedronGeometry args={[1.48,1]}/><meshPhysicalMaterial color="#c394ff" metalness={.35} roughness={.12} clearcoat={1}/></mesh>
    <mesh rotation={[1.1,-.6,.28]}><torusGeometry args={[2.05,.065,12,96]}/><meshStandardMaterial color="#e4ff81" metalness={.6} roughness={.2} emissive="#bfd866" emissiveIntensity={.4}/></mesh>
    <mesh rotation={[.23,1.02,.36]} position={[.88,-.35,1.2]}><octahedronGeometry args={[.68,0]}/><meshStandardMaterial color="#dfff95" metalness={.25} roughness={.23}/></mesh>
    <mesh position={[-1.45,.8,.2]} rotation={[.2,.2,.3]}><dodecahedronGeometry args={[.44]}/><meshStandardMaterial color="#ffc39b" metalness={.4} roughness={.28}/></mesh>
  </group>
}
function Relief() {
  return <group rotation={[.2,-.45,-.15]} position={[0,-.5,0]}>
    {Array.from({length:13},(_,i)=>{const a=i*2.39996;const r=Math.sqrt(i)*.48;const height=.42+(i*7%5)*.24;return <group key={i} position={[Math.cos(a)*r,0,Math.sin(a)*r]}>
      <mesh position={[0,height/2,0]}><cylinderGeometry args={[.43,.43,height,6]}/><meshStandardMaterial color={i%3===0?'#b7ffc8':i%3===1?'#5cd8c4':'#6e9eff'} metalness={.38} roughness={.26}/></mesh>
      {i%4===0&&<><mesh position={[0,height+.25,0]}><sphereGeometry args={[.14,12,12]}/><meshBasicMaterial color="#fcf9c0"/></mesh><mesh position={[0,height+.105,0]}><cylinderGeometry args={[.018,.018,.3,6]}/><meshBasicMaterial color="#f9ffd5"/></mesh></>}
    </group>})}
  </group>
}
function Phone({x,y,z,rotation,color}:{x:number;y:number;z:number;rotation:number;color:string}) {
  return <group position={[x,y,z]} rotation={[0,rotation,-.07]}>
    <RoundedBox args={[1.46,2.78,.19]} radius={.22} smoothness={4}>
      <meshStandardMaterial color="#241b42" metalness={.78} roughness={.22}/>
    </RoundedBox>
    <RoundedBox args={[1.34,2.58,.015]} radius={.14} smoothness={3} position={[0,0,.107]}>
      <meshBasicMaterial color={color}/>
    </RoundedBox>
    <mesh position={[0,.99,.121]}><capsuleGeometry args={[.07,.24,4,8]}/><meshBasicMaterial color="#251e3c"/></mesh>
    <mesh position={[0,.02,.135]}><torusGeometry args={[.44,.11,12,40]}/><meshStandardMaterial color="#fff5ff" metalness={.2} roughness={.2}/></mesh>
    <mesh position={[0,-.84,.135]}><boxGeometry args={[.85,.075,.01]}/><meshBasicMaterial color="#fff1f9"/></mesh>
  </group>
}
function Mobile() {
  return <group>
    <Phone x={-.9} y={.05} z={-.5} rotation={-.32} color="#b582f1"/>
    <Phone x={.85} y={-.24} z={.45} rotation={.35} color="#ff83ba"/>
    <mesh position={[-1.72,1.15,.5]}><octahedronGeometry args={[.33]}/><meshStandardMaterial color="#ffc9ed"/></mesh>
  </group>
}
function Coffee() {
  return <group position={[0,-.2,0]}>
    <mesh position={[0,-1.18,0]}><cylinderGeometry args={[1.7,1.6,.17,56]}/><meshStandardMaterial color="#b66358" metalness={.28} roughness={.22}/></mesh>
    <mesh position={[0,-.3,0]}><cylinderGeometry args={[.86,.65,1.68,56,1,false]}/><meshPhysicalMaterial color="#ffc28d" metalness={.38} roughness={.2} clearcoat={1}/></mesh>
    <mesh position={[0,.54,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.86,.072,12,60]}/><meshStandardMaterial color="#fff1dd" metalness={.25} roughness={.2}/></mesh>
    <mesh position={[0,.55,0]}><cylinderGeometry args={[.81,.81,.025,48]}/><meshStandardMaterial color="#503127" roughness={.24}/></mesh>
    <mesh position={[1.05,-.25,0]} rotation={[0,0,.1]}><torusGeometry args={[.57,.14,12,48]}/><meshStandardMaterial color="#ffceaa" metalness={.35} roughness={.2}/></mesh>
    {[0,1,2].map(i=><mesh key={i} position={[-.4+i*.4,1.2+(i%2)*.25,0]} rotation={[.1,0,.4]}><torusGeometry args={[.23,.027,8,36,Math.PI*1.35]}/><meshBasicMaterial color="#ffe0c0" transparent opacity={.8}/></mesh>)}
  </group>
}
const sculptures: Record<ProjectId, () => JSX.Element> = {cowork:Workspace,tesla:Transit,astro:Commerce,relief:Relief,merchandise:Mobile,espresso:Coffee}

function Sculpture({id,reducedMotion}:{id:ProjectId;reducedMotion:boolean}) {
  const root=useRef<THREE.Group>(null)
  useFrame((state,delta)=>{
    if (root.current&&!reducedMotion) {
      root.current.rotation.y += Math.min(delta,.05)*.13
      root.current.position.y = Math.sin(state.clock.elapsedTime*.8)*.1
    }
  })
  const ObjectComponent=sculptures[id]
  const visual=projectVisuals[id]
  return <group ref={root}>
    <Float speed={reducedMotion?0:1.15} rotationIntensity={reducedMotion?0:.12} floatIntensity={reducedMotion?0:.2}>
      <ObjectComponent/>
    </Float>
    <mesh rotation={[Math.PI/2,0,0]} position={[0,-2.04,0]}><torusGeometry args={[2.25,.014,8,96]}/><meshBasicMaterial color={visual.accent} transparent opacity={.38}/></mesh>
    <mesh rotation={[Math.PI/2,0,0]} position={[0,-2.02,0]}><circleGeometry args={[2.2,60]}/><meshBasicMaterial color={visual.accent} transparent opacity={.055} side={THREE.DoubleSide}/></mesh>
  </group>
}

export default function ProjectUniverseScene({id,interactive=false,reducedMotion=false,miniature=false}:SceneProps){
  const visual=projectVisuals[id]
  return <Canvas aria-label={`Animated three-dimensional conceptual sculpture representing ${id}`} camera={{position:[0,1.15,miniature?7.5:7.1],fov:miniature?43:42}} dpr={miniature?[1,1.35]:[1,1.75]} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}} style={{width:'100%',height:'100%'}}>
    <ambientLight intensity={1.25}/>
    <directionalLight intensity={3.4} position={[4,7,5]} color={visual.accent}/>
    <pointLight intensity={70} position={[-3,2,-2]} color={visual.secondary}/>
    <pointLight intensity={30} position={[4,-2,3]} color="#ffffff"/>
    <Sculpture id={id} reducedMotion={reducedMotion}/>
    {interactive&&<OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={.075} rotateSpeed={.48} minPolarAngle={Math.PI*.25} maxPolarAngle={Math.PI*.74}/>}
  </Canvas>
}
