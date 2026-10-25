import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { EngineeringLab } from '@/components/sections/EngineeringLab'
import { Expertise } from '@/components/sections/ExpertiseSignal'
import { About } from '@/components/sections/About'
import { PathSoFar } from '@/components/sections/PathSoFar'
import { Contact } from '@/components/sections/Contact'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { useSmoothMotion } from '@/hooks/useSmoothMotion'

function App() {
  useSmoothMotion()
  return <><a href="#main" className="skip-link">Skip to content</a><ScrollProgress/><Header/><main id="main"><Hero/><Expertise/><Work/><EngineeringLab/><About/><PathSoFar/><Contact/></main><Footer/></>
}
export default App
