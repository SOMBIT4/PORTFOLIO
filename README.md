# Sombit Mazumder — Project Universe (v3)

A distinctive, responsive engineering portfolio designed around **real-time WebGL project art**, colorful editorial layouts, and case studies grounded in Sombit's résumé. It is an original design influenced by the idea of interactive portfolio galleries, **not** a reproduction of anyone else's portfolio.

**Stack:** React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · shadcn-style locally owned Radix components · Three.js · React Three Fiber · Drei · GSAP ScrollTrigger · Lenis · Lucide React.

## Run it

Requires Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev
```

Open Vite's local URL (typically `http://localhost:5173`). To check and build:

```bash
npm run typecheck
npm run build
npm run preview
```

`offline-preview.html` is a **dependency-free visual preview** of the website, including the newly designed Work and Engineering Lab sections. It has working stage navigation, filtering, lab selectors and basic detail overlays. Its graphic objects are CSS approximations. **The source application contains the actual interactive 3D models rendered with React Three Fiber.**

## What's new in v3

- An entirely redesigned, **dark cinematic Work section** with multicolor accents specific to each project.
- A featured **3D Project Universe stage** with six selectable sculptures, pointer/touch orbit interaction, previous/next controls, technical stats, case-study dialogs, and real source/demo links.
- Every project gallery tile also loads its own **real WebGL sculpture** when near the viewport, with subtle CSS 3D perspective tilt for pointer devices.
- A new **Engineering Lab** with three interactive technical investigations, backed by the résumé's concrete implementation details. Includes WebGL objects and an interactive casefile switcher.
- Responsive behavior at small mobile widths, reduced-motion fallbacks, WebGL fallbacks, keyboard-usable actions, semantic content, and descriptive navigation.

## Source structure

```text
sombit-portfolio-v3/
├── public/
│   ├── assets/
│   │   ├── sombit-portrait.webp
│   │   └── Sombit_Mazumder_Resume.pdf
│   ├── favicon.svg
│   └── og-cover.svg
├── src/
│   ├── app/App.tsx                # composition: Hero, Work, Lab, Expertise, About, Journey, Contact
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── OrbitalExperience.tsx
│   │   │   ├── OrbitalScene.tsx
│   │   │   ├── ProjectUniverseScene.tsx  # six separate procedural 3D sculptures
│   │   │   ├── LabCanvas.tsx            # loads the 3D lab only near viewport
│   │   │   └── LabScene.tsx             # 3 technical 3D models
│   │   ├── work/
│   │   │   ├── ProjectCanvas.tsx       # dynamic import, WebGL fallback, view observer
│   │   │   ├── ProjectStage.tsx        # featured-project controls + details
│   │   │   └── CaseStudyDialog.tsx     # centralized accessible Radix dialog
│   │   ├── sections/
│   │   │   ├── Work.tsx                # all projects, filter and stage state
│   │   │   ├── EngineeringLab.tsx      # investigation explorer + interactions
│   │   │   └── [Hero, Expertise, About, Journey, Contact].tsx
│   │   ├── shared/
│   │   │   ├── ProjectCard.tsx         # unique project palettes + perspective tilt
│   │   │   └── ProjectArtwork.tsx      # original case-study interface concept art
│   │   ├── layout/                   # header, mobile navigation, footer
│   │   └── ui/                       # shadcn-style Radix primitives
│   ├── data/
│   │   ├── profile.ts               # personal information and navigation
│   │   ├── projects.ts              # original résumé-backed project descriptions
│   │   ├── projectVisuals.ts        # palettes, labels, stage data
│   │   ├── engineeringNotes.ts      # three practical system investigations
│   │   └── skills.ts
│   ├── hooks/                      # media queries, reduced motion, smooth scrolling
│   ├── lib/utils.ts                # cn() utility
│   ├── styles/
│   │   ├── globals.css             # Tailwind + design tokens
│   │   ├── components.css          # ordered stylesheet imports
│   │   ├── sections/work.css       # project stage and gallery
│   │   ├── sections/engineering-lab.css
│   │   ├── sections/work-responsive.css
│   │   └── sections/[others].css
│   └── main.tsx
├── scripts/make_offline_preview.py  # generate portable preview from source styling
├── docs/                         # QA checklist, design notes and current previews
├── components.json               # shadcn config
├── index.html
├── offline-preview.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Personalize in the right place

- Change **personal details / social links / nav** in `src/data/profile.ts`.
- Change **project text / technologies / GitHub & live links** in `src/data/projects.ts`.
- Change the **art direction** per project in `src/data/projectVisuals.ts`.
- Edit **actual 3D geometries and materials** in `src/components/3d/ProjectUniverseScene.tsx`; separate 3D lab art lives in `LabScene.tsx`.
- Update **technical investigations** in `src/data/engineeringNotes.ts`. These reflect practical engineering challenges and are **not academic research papers or claimed publications**.
- Customize the **Work visual layout** in `src/styles/sections/work.css` and its device breakpoints in `work-responsive.css`; Lab styles in `engineering-lab.css`.
- Add new locally owned **shadcn/ui** components via `npx shadcn@latest add <component>` after installation.

## Performance and accessibility

- **Lazy loading:** WebGL code is dynamically imported, and gallery canvases mount only while in or near the viewport. A single browser support check is cached for gallery cards. Canvases unmount on exit.
- **Responsive DPR:** gallery renders at DPR 1–1.35, stage at 1–1.75; no purchased 3D models or bulky texture downloads are used.
- **Fallbacks:** a CSS art representation is shown before WebGL loads or when WebGL is unsupported; reduced motion disables automated model rotation.
- **Navigation:** actual links for repositories/live demos, labeled previous/next/select controls, keyboard-accessible case-study dialogs, skip link, accessible mobile menu, and visible focus states.
- **Motion:** GSAP ScrollTrigger plus Lenis for smooth desktop motion. CSS/JS effects obey `prefers-reduced-motion`.
- **Mobile:** cards do not rely on hover; action buttons are visible on touch, with tailored one-column grids and a vertical featured stage.

## Source integrity and verification

The user's supplied résumé backs the project claims. All 3D images are original **conceptual artworks**, not screenshots of deployed software. The Engineering Lab presents three documented software-design challenges and **does not claim published research**.

The source underwent a TypeScript/TSX **syntax/transpilation check** across 35 files. Its portable visual preview was browser-tested at **320, 390, 768, and 1440 px**, including filtering, project navigation and Lab switching; it had no horizontal overflow or script errors in those tests. The original React production build was **not runnable in the environment** because npm registry access was blocked. Please run `npm install && npm run build` before deployment.

Your CV contains contact information and is available for download from the public assets folder. Remove anything you do not wish to publish.

## Deploy

Vercel: framework **Vite**, build `npm run build`, output `dist`. Netlify: build `npm run build`, publish `dist`. Update SEO tags and site URL before deployment.
