/** Content derived from Sombit_Mazumder_Resume.pdf. Edit personal details here. */
export const profile = {
  name: 'Sombit Mazumder',
  firstName: 'Sombit',
  location: 'Dhaka, Bangladesh',
  title: 'Full-Stack Developer',
  subtitle: 'Computer Science & Engineering undergraduate',
  email: 'sombitmajumder123@gmail.com',
  github: 'https://github.com/SOMBIT4',
  linkedin: 'https://linkedin.com/in/sombit-majumder-535792341',
  resumeUrl: '/assets/Sombit_Mazumder_Resume.pdf',
  portraitUrl: '/assets/sombit-portrait.webp',
  university: 'Ahsanullah University of Science and Technology',
  expectedGraduation: 'November 2026',
  statement: 'I turn complex requirements into dependable digital products — from the database constraints that protect a booking to the interface that makes it feel effortless.',
} as const

export const milestones = [
  { year: 'NOW', title: 'Built for real-world complexity', detail: 'CoWork SaaS and Dhaka Tesla Pool — multi-tenancy, transactional consistency, permissions, and concurrency.' },
  { year: 'AWARD', title: 'Software Exhibition · 1st Runner-Up', detail: 'AUST CSE 5.0 Carnival Software Exhibition.' },
  { year: '2026', title: 'B.Sc. in CSE · Expected graduation', detail: 'Ahsanullah University of Science and Technology, fourth year, second semester.' },
] as const

export const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Lab', href: '#lab' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const
