import type { Badge } from './types'

export const badges: Badge[] = [
  {
    id: 'z-xplore-concepts',
    name: 'IBM Z Xplore – Concepts',
    issuer: 'IBM',
    image: '/images/badge-z-xplore-concepts.png',
    skills: ['Data sets', 'JCL', 'z/OS commands', 'USS scripting', 'Python', 'Z Open Automation Utilities'],
    verifyUrl: 'https://www.credly.com/badges/ec0ccf1b-09aa-4bd9-b675-55939a8fdb3e/public_url',
  },
  {
    id: 'z-xplore-advanced',
    name: 'IBM Z Xplore – Advanced',
    issuer: 'IBM',
    image: '/images/badge-z-xplore-advanced.png',
    skills: ['REXX', 'COBOL', 'VSAM', 'TSO', 'Ansible', 'Zowe', 'Docker'],
    verifyUrl: 'https://www.credly.com/badges/493849b8-9eff-44a1-b8fb-5f0c9902b1e6/public_url',
  },
]
