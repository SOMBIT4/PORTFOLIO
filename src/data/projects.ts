export type ProjectCategory = 'Platforms' | 'Commerce' | 'Applications'
export type ProjectId = 'cowork' | 'tesla' | 'astro' | 'relief' | 'merchandise' | 'espresso'
export interface Project {
  id: ProjectId
  number: string
  title: string
  tagline: string
  category: ProjectCategory
  description: string
  technologies: string[]
  highlights: string[]
  github: string
  live?: string
  image: string
  imageAlt: string
  previewType: 'live-capture' | 'repository-visual'
  featured?: boolean
}

/** Project claims and links are transcribed from the uploaded resume. */
export const projects: Project[] = [
  {
    id: 'cowork', number: '01', title: 'CoWork SaaS', tagline: 'Workspace booking without the collisions.',
    category: 'Platforms', featured: true,
    description: 'A multi-tenant system for shared desks and rooms with organization-level isolation, reliable scheduling and a real audit trail.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'RBAC', 'Neon'],
    highlights: [
      'Prevents concurrent double-bookings with a PostgreSQL exclusion constraint on time ranges.',
      'Keeps tenants isolated through scoped queries and composite foreign keys in a 9-table schema.',
      'Implements 16 server-enforced permissions, single-use invitations, and an audit log.',
    ],
    github: 'https://github.com/SOMBIT4/CoWork-SaaS', live: 'https://co-work-saa-s.vercel.app',
    image: '/assets/projects/cowork.webp', imageAlt: 'CoWork SaaS landing page and workspace overview', previewType: 'live-capture',
  },
  {
    id: 'tesla', number: '02', title: 'Dhaka Tesla Pool', tagline: 'Smarter ways to share the city.',
    category: 'Platforms', featured: true,
    description: 'Ride pooling for Dhaka commuters, designed around fair detours, safe seat allocation and precise shared fares.',
    technologies: ['Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'Testing'],
    highlights: [
      'Pools rides across 9 Dhaka zones with a configurable detour threshold (35% default).',
      'Uses ordered PostgreSQL row locks to make last-seat acceptance concurrency-safe.',
      'Reprices fares transactionally in integer poysha, with 421 passing tests and English/Bangla support.',
    ],
    github: 'https://github.com/SOMBIT4/TESLA_CODEX', live: 'https://tesla-codex.vercel.app',
    image: '/assets/projects/tesla.webp', imageAlt: 'Dhaka Tesla Pool landing page with a Dhaka route preview', previewType: 'live-capture',
  },
  {
    id: 'astro', number: '03', title: 'Astro Goods', tagline: 'An entire storefront, end to end.',
    category: 'Commerce', featured: true,
    description: 'A MERN e-commerce experience taking shoppers from browsing and cart management through checkout.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit'],
    highlights: [
      'Built collaboratively with a React storefront backed by an Express REST API.',
      'Implements JWT authentication and protected application routes.',
      'Uses Redux Toolkit to coordinate shopping cart and session state.',
    ],
    github: 'https://github.com/Z-i-n-k-s/MERN-STACK-E-COMMERCE-PROJECT', live: 'https://astro-goods.vercel.app',
    image: '/assets/projects/astro.webp', imageAlt: 'Astro Goods storefront with electronics promotion and product rails', previewType: 'live-capture',
  },
  {
    id: 'relief', number: '04', title: 'Disaster Relief', tagline: 'Better coordination when it matters.',
    category: 'Platforms',
    description: 'A relief coordination platform for volunteers, supply inventories and shelters, rebuilt with a structured ASP.NET architecture.',
    technologies: ['ASP.NET Core MVC', 'C#', 'RBAC', 'Migrations'],
    highlights: [
      'Centralizes shelter, volunteer and supply coordination during disaster response.',
      'Provides role-based permissions so users see only their authorized actions.',
      'Rebuilt the team’s Laravel/React version with controllers, services, middleware and versioned migrations.',
    ],
    github: 'https://github.com/SOMBIT4/Disaster-Relief-Coordination-System-DRCS-_ASP.net_Core_project_MVC',
    image: '/assets/projects/relief.jpg', imageAlt: 'Disaster response imagery used by the relief coordination project', previewType: 'repository-visual',
  },
  {
    id: 'merchandise', number: '05', title: 'Merchandise Galaxy', tagline: 'Commerce that goes wherever you go.',
    category: 'Applications',
    description: 'A cross-platform Flutter shopping application spanning an end-to-end mobile retail journey.',
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Provider'],
    highlights: [
      'Implements 11 mobile screens from sign-up and browsing to checkout and profile editing.',
      'Integrates email login and Google Sign-In through Firebase Authentication.',
      'Synchronizes live Firestore data with Provider state management.',
    ],
    github: 'https://github.com/SOMBIT4/Merchandise-Galaxy-FLUTTER-PROJECT',
    image: '/assets/projects/merchandise.jpg', imageAlt: 'Merchandise Galaxy Flutter product browsing screen', previewType: 'repository-visual',
  },
  {
    id: 'espresso', number: '06', title: 'EspressoEcho', tagline: 'A modern frontend, a solid .NET core.',
    category: 'Applications',
    description: 'A team-built application connecting a React and shadcn/ui frontend to an ASP.NET Core REST API.',
    technologies: ['ASP.NET Core', 'React', 'shadcn/ui', 'REST API'],
    highlights: [
      'Separates backend and frontend applications into clear, maintainable boundaries.',
      'Connects a C# REST API to a React interface with shadcn/ui components.',
    ],
    github: 'https://github.com/Z-i-n-k-s/EspressoEcho-asp.net-project-with-react-shadcn',
    image: '/assets/projects/espresso.webp', imageAlt: 'Coffee beans visual from the EspressoEcho application repository', previewType: 'repository-visual',
  },
]
