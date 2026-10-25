import type { ProjectId } from './projects'

/** Visual storytelling only. These are original conceptual 3D art directions, not product screenshots. */
export interface ProjectVisual {
  accent: string
  secondary: string
  glow: string
  surface: string
  label: string
  index: string
  symbol: string
  stat: string
  statLabel: string
}

export const projectVisuals: Record<ProjectId, ProjectVisual> = {
  cowork: { accent: '#83FFE1', secondary: '#7A9CFF', glow: 'rgba(73, 222, 202, .38)', surface:'#103C45', label:'SYSTEM / WORKSPACE', index:'001', symbol:'⌘', stat:'16', statLabel:'ROLE PERMISSIONS' },
  tesla: { accent: '#FFBC6A', secondary: '#FA5D92', glow: 'rgba(255, 119, 90, .38)', surface:'#562741', label:'MOBILITY / NETWORK', index:'002', symbol:'↗', stat:'421', statLabel:'PASSING TESTS' },
  astro: { accent: '#E4FF82', secondary: '#C18CFF', glow: 'rgba(170, 130, 250, .35)', surface:'#39345F', label:'COMMERCE / SPACE', index:'003', symbol:'✳', stat:'MERN', statLabel:'FULL-STACK STORE' },
  relief: { accent: '#8CF6B2', secondary: '#5FA6FF', glow: 'rgba(38, 189, 153, .32)', surface:'#124D4D', label:'CIVIC / RESPONSE', index:'004', symbol:'✺', stat:'RBAC', statLabel:'ROLE-BASED ACCESS' },
  merchandise: { accent: '#FF8CD4', secondary: '#9C91FF', glow: 'rgba(238, 107, 200, .4)', surface:'#542852', label:'MOBILE / RETAIL', index:'005', symbol:'◇', stat:'11', statLabel:'MOBILE SCREENS' },
  espresso: { accent: '#FFC28D', secondary: '#FC8B8E', glow: 'rgba(244, 147, 91, .4)', surface:'#5A332B', label:'WEB / API', index:'006', symbol:'◉', stat:'.NET', statLabel:'REST ARCHITECTURE' },
}
