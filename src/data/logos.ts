import {
  siAnsible,
  siDocker,
  siEthereum,
  siGit,
  siJavascript,
  siPolygon,
  siPython,
  siReact,
  siSolidity,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons'

// Logos for the scrolling strip in About. Most come from the simple-icons
// package as SVG path data (`path`). Base isn't in simple-icons, so its
// official mark is a file in public/ (`src`). IBM was removed from
// simple-icons, so it's drawn as a text tile (neither `path` nor `src`).
export type Logo = {
  name: string
  color: string // brand color, shown on hover
  path?: string
  src?: string
}

export const logos: Logo[] = [
  { name: 'React', color: `#${siReact.hex}`, path: siReact.path },
  { name: 'TypeScript', color: `#${siTypescript.hex}`, path: siTypescript.path },
  { name: 'Tailwind CSS', color: `#${siTailwindcss.hex}`, path: siTailwindcss.path },
  { name: 'Vite', color: `#${siVite.hex}`, path: siVite.path },
  { name: 'JavaScript', color: `#${siJavascript.hex}`, path: siJavascript.path },
  { name: 'Git', color: `#${siGit.hex}`, path: siGit.path },
  { name: 'Python', color: `#${siPython.hex}`, path: siPython.path },
  { name: 'Docker', color: `#${siDocker.hex}`, path: siDocker.path },
  { name: 'Ansible', color: '#ee0000', path: siAnsible.path },
  { name: 'IBM', color: '#0f62fe' },
  { name: 'Solidity', color: '#a78bfa', path: siSolidity.path }, // brand grey is invisible on dark
  { name: 'Ethereum', color: '#a78bfa', path: siEthereum.path },
  { name: 'Polygon', color: `#${siPolygon.hex}`, path: siPolygon.path },
  { name: 'Base', color: '#0052ff', src: '/images/logos/base.svg' },
]
