import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { ArrowDownRight, Asterisk, Orbit, Grid3x3 } from 'lucide-react'
import { ProjectScreenshotCard } from '@/components/shared/ProjectScreenshotCard'
import { ProjectShowcaseStage } from '@/components/work/ProjectOrbitStage'
import { CaseStudyDialog } from '@/components/work/CaseStudyDialog'
import { AllProjectsDialog } from '@/components/work/AllProjectsDialog'
import { projects, type Project, type ProjectCategory } from '@/data/projects'

const filters = ['All work','Platforms','Commerce','Applications'] as const
const AUTO_ROTATE_INTERVAL = 5200
const PREVIEW_PROJECT_COUNT = 2 // Show only 2 projects initially

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter,setFilter]=useState<(typeof filters)[number]>('All work')
  const [activeIndex,setActiveIndex]=useState(0)
  const [caseStudy,setCaseStudy]=useState<Project|null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const isSectionInView = useInView(sectionRef, { amount: 0.06, margin: '100px 0px 100px 0px' })
  
  const shown=filter==='All work'?projects:projects.filter(p=>p.category===filter as ProjectCategory)
  const previewProjects = shown.slice(0, PREVIEW_PROJECT_COUNT)
  const select=(i:number)=>{
    setActiveIndex((i+projects.length)%projects.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const timeout = window.setTimeout(() => {
      setActiveIndex((previous) => (previous + 1) % projects.length)
    }, AUTO_ROTATE_INTERVAL)
    return () => window.clearTimeout(timeout)
  }, [activeIndex, isAutoPlaying])

  useEffect(()=>{
    const chooseProject=(event:Event)=>{
      const id=(event as CustomEvent<{id:Project['id']}>).detail?.id
      const index=projects.findIndex(project=>project.id===id)
      if(index!==-1){setFilter('All work');setActiveIndex(index)}
    }
    document.addEventListener('portfolio:select-project',chooseProject)
    return ()=>document.removeEventListener('portfolio:select-project',chooseProject)
  },[])
  return <section ref={sectionRef} className={`work-section section-pad ${isSectionInView ? '' : 'is-dormant'}`} id="work" aria-labelledby="work-heading">
    <div className="work-ambient one" aria-hidden="true"/><div className="work-ambient two" aria-hidden="true"/>
    <div className="page-shell work-shell">
      <div className="work-lead" data-reveal><div className="work-lead__eyebrow"><span><Asterisk size={16}/> 02 / SELECTED CREATIONS</span><span>ENGINEERED EXPERIENCES · 2026</span></div><div className="work-lead__split"><h2 id="work-heading">REAL IDEAS.<br/><em>UNREAL</em> <span>WORLDS<span className="work-lead__period">.</span></span></h2><div><div className="work-lead__orbit"><Orbit size={29}/></div><p>Every project begins with a problem worth solving. Explore the systems behind the interface — reimagined as living, three-dimensional worlds.</p><span className="work-lead__hint"><ArrowDownRight size={17}/> SCROLL, DRAG, DISCOVER</span></div></div></div>
      
      <ProjectShowcaseStage project={projects[activeIndex]} projects={projects} activeIndex={activeIndex} isAutoPlaying={isAutoPlaying} onToggleAutoPlay={toggleAutoPlay} onPrev={()=>select(activeIndex-1)} onNext={()=>select(activeIndex+1)} onSelect={select} onOpen={setCaseStudy}/>
      <div className="work-archive-top"><div><span className="work-archive-eyebrow">EXPLORE THE ARCHIVE / 001—006</span><h3>Featured projects.<br/><span>Captured in motion.</span></h3></div><p>Real product interfaces where a live build exists, supported by source-owned visuals for repository-only projects.</p></div>
      <div className="work-controls"><span className="filter-label"><ArrowDownRight size={16}/> FILTER COLLECTION</span><div className="filter-list" role="group" aria-label="Filter projects by category">{filters.map(f=><button key={f} className={filter===f?'filter-pill active':'filter-pill'} type="button" aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}<span>{f==='All work'?projects.length:projects.filter(p=>p.category===f).length}</span></button>)}</div></div>
      <div className="projects-grid projects-grid--preview" aria-live="polite" key={filter}>{previewProjects.map(p=><ProjectScreenshotCard key={p.id} project={p} onOpen={setCaseStudy}/>)}</div>
      
      {shown.length > PREVIEW_PROJECT_COUNT && (
        <div className="view-all-container">
          <button 
            type="button"
            className="view-all-button"
            onClick={() => setShowAllProjects(true)}
          >
            <Grid3x3 size={20} />
            <span>View All {shown.length} Projects</span>
            <ArrowDownRight size={18} />
          </button>
          <p className="view-all-hint">Explore the complete collection of engineering work</p>
        </div>
      )}
      
      <p className="work-footnote"><span>✳</span> Live captures are used for deployed products; repository-owned visuals identify source-only builds.</p>
    </div>
    <CaseStudyDialog project={caseStudy} onClose={()=>setCaseStudy(null)}/>
    <AllProjectsDialog 
      isOpen={showAllProjects} 
      onClose={() => setShowAllProjects(false)}
      projects={shown}
      onOpenCaseStudy={setCaseStudy}
    />
  </section>
}
