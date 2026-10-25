/** Skill disciplines and the flat technology stream, transcribed from the résumé and project work. */

export type SkillKind = 'language' | 'frontend' | 'backend' | 'database' | 'tool'

export interface SkillTool {
  name: string
  note: string
  kind: SkillKind
}

export interface SkillDiscipline {
  id: string
  label: string
  code: string
  number: string
  summary: string
  description: string
  accent: string
  tools: SkillTool[]
}

export const skillDisciplines: SkillDiscipline[] = [
  {
    id: 'languages',
    label: 'Languages',
    code: '01 / LANGUAGES',
    number: '01',
    summary: 'Four-language foundation',
    description: 'A practical language base spanning systems fundamentals, object-oriented work, the modern web, and backend exploration.',
    accent: '#c8ff74',
    tools: [
      { name: 'C++', note: 'Systems fundamentals', kind: 'language' },
      { name: 'Java', note: 'Object-oriented foundation', kind: 'language' },
      { name: 'JavaScript', note: 'Web application language', kind: 'language' },
      { name: 'Go', note: 'Backend exploration', kind: 'language' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    code: '02 / FRONTEND',
    number: '02',
    summary: 'Interfaces across screens',
    description: 'Responsive interfaces and cross-platform product surfaces built with a component-led, utility-first workflow.',
    accent: '#9df5f3',
    tools: [
      { name: 'React', note: 'Component interfaces', kind: 'frontend' },
      { name: 'Tailwind CSS', note: 'Responsive visual systems', kind: 'frontend' },
      { name: 'Flutter', note: 'Cross-platform interfaces', kind: 'frontend' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    code: '03 / BACKEND',
    number: '03',
    summary: 'Application logic and APIs',
    description: 'Server-side applications shaped around explicit routes, maintainable boundaries, and framework-appropriate structure.',
    accent: '#89aafc',
    tools: [
      { name: 'Node.js', note: 'JavaScript runtime', kind: 'backend' },
      { name: 'Express', note: 'API routing', kind: 'backend' },
      { name: 'Laravel', note: 'PHP application framework', kind: 'backend' },
      { name: 'ASP.NET Core', note: 'C# application framework', kind: 'backend' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    code: '04 / DATABASES',
    number: '04',
    summary: 'Document data and live sync',
    description: 'Data layers for full-stack products, from document-oriented persistence to real-time cloud synchronization.',
    accent: '#ffb778',
    tools: [
      { name: 'MongoDB', note: 'Document persistence', kind: 'database' },
      { name: 'Firebase Firestore', note: 'Cloud document sync', kind: 'database' },
    ],
  },
  {
    id: 'tooling',
    label: 'Tools & Concepts',
    code: '05 / TOOLS & CONCEPTS',
    number: '05',
    summary: 'State, identity, craft',
    description: 'The supporting practices behind the build: application state, authentication, access control, source history, and interface thinking.',
    accent: '#c4a9ff',
    tools: [
      { name: 'Redux Toolkit', note: 'Application state', kind: 'tool' },
      { name: 'JWT', note: 'Token authentication', kind: 'tool' },
      { name: 'Firebase Auth', note: 'Managed identity', kind: 'tool' },
      { name: 'Git', note: 'Version control', kind: 'tool' },
      { name: 'Figma', note: 'Interface design', kind: 'tool' },
      { name: 'RBAC', note: 'Role-based access control', kind: 'tool' },
    ],
  },
]

export interface SkillEntry {
  name: string
  note: string
  kind: SkillKind
  disciplineId: string
  discipline: string
  disciplineCode: string
  accent: string
}

export const skillEntries: SkillEntry[] = skillDisciplines.flatMap((discipline) =>
  discipline.tools.map((tool) => ({
    ...tool,
    disciplineId: discipline.id,
    discipline: discipline.label,
    disciplineCode: discipline.code,
    accent: discipline.accent,
  })),
)
