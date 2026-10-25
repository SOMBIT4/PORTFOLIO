import type { ProjectId } from './projects'

/** Technical investigations based on resume projects, not academic publications. */
export interface EngineeringNote {
  number: string
  code: string
  title: string
  discipline: string
  blurb: string
  insight: string
  details: string[]
  relatedProject: ProjectId
  color: string
  secondColor: string
}

export const engineeringNotes: EngineeringNote[] = [
  {
    number: '01', code:'TX-001', title:'When two people book the same room.', discipline:'DATABASE INTEGRITY',
    blurb:'Race conditions are product bugs. A booking UI alone cannot guarantee an available slot.',
    insight:'Enforce non-overlapping time ranges where concurrent requests meet: the database.',
    details:['PostgreSQL exclusion constraint prevents conflicting intervals.', 'Back-to-back bookings remain valid.', 'Enforcement lives in data integrity, not just frontend state.'],
    relatedProject:'cowork', color:'#73F6DC', secondColor:'#4777ED',
  },
  {
    number: '02', code:'TX-002', title:'The last seat should have only one owner.', discipline:'CONCURRENT SYSTEMS',
    blurb:'Two simultaneous ride requests must never reserve the same final seat.',
    insight:'Use ordered database row locks inside one transaction to make acceptance atomic.',
    details:['Lock relevant rows in a consistent order.', 'Calculate all fare changes using integer poysha.', '421 passing tests across API, web, and database layers.'],
    relatedProject:'tesla', color:'#FFBB79', secondColor:'#FE548A',
  },
  {
    number: '03', code:'TX-003', title:'One app. Many organizations. Zero data leaks.', discipline:'MULTI-TENANT DESIGN',
    blurb:'Shared software needs boundaries that hold even when client state is wrong.',
    insight:'Combine tenant-scoped queries, composite foreign keys, and server-enforced RBAC.',
    details:['Nine-table relational schema with tenant-aware relationships.', '16 server-side permissions for Owner, Admin, and Member.', 'Hashed one-use invitations and audit trails for accountability.'],
    relatedProject:'cowork', color:'#A4B0FF', secondColor:'#AC76FF',
  },
]
