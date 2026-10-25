import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ProjectScreenshotCard } from '@/components/shared/ProjectScreenshotCard'
import { Grid3x3 } from 'lucide-react'
import type { Project } from '@/data/projects'

interface Props {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onOpenCaseStudy: (project: Project) => void
}

export function AllProjectsDialog({ isOpen, onClose, projects, onOpenCaseStudy }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[1400px] max-h-[92vh]">
        <div className="all-projects-dialog">
          <div className="all-projects-header">
            <div className="all-projects-header__title">
              <Grid3x3 size={24} />
              <DialogTitle asChild>
                <h2>
                  Complete Archive
                  <span className="all-projects-count">
                    {projects.length} Projects
                  </span>
                </h2>
              </DialogTitle>
            </div>
            <p className="all-projects-header__desc">
              Every project represents a problem solved, a system designed, and an experience built from the ground up.
            </p>
          </div>

          <div className="all-projects-grid">
            {projects.map((project) => (
              <ProjectScreenshotCard
                key={project.id}
                project={project}
                onOpen={(p) => {
                  onClose()
                  onOpenCaseStudy(p)
                }}
              />
            ))}
          </div>

          <div className="all-projects-footer">
            <span>ARCHIVE — 001 / 006</span>
            <span>•</span>
            <span>FULL-STACK ENGINEERING</span>
            <span>•</span>
            <span>2024 — 2026</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
