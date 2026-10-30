import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/types'

const project: Project = {
  id: 'demo',
  title: 'Demo Project',
  description: 'A demo description.',
  tech: ['React', 'TypeScript'],
  image: '/images/demo.png',
  imageAlt: 'Demo screenshot',
  liveUrl: 'https://example.com',
  codeUrl: 'https://github.com/example/demo',
}

it('shows title, description, and every tech tag', () => {
  render(<ProjectCard project={project} />)
  expect(screen.getByRole('heading', { name: 'Demo Project' })).toBeInTheDocument()
  expect(screen.getByText('A demo description.')).toBeInTheDocument()
  expect(screen.getByText('React')).toBeInTheDocument()
  expect(screen.getByText('TypeScript')).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Demo screenshot' })).toBeInTheDocument()
})

it('opens the live site safely in a new tab', () => {
  render(<ProjectCard project={project} />)
  const live = screen.getByRole('link', { name: /Live site/ })
  expect(live).toHaveAttribute('href', 'https://example.com')
  expect(live).toHaveAttribute('target', '_blank')
  expect(live).toHaveAttribute('rel', 'noopener noreferrer')
})

it('omits the Code link when the project has no codeUrl', () => {
  render(<ProjectCard project={{ ...project, codeUrl: undefined }} />)
  expect(screen.queryByRole('link', { name: /Code/ })).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Live site/ })).toBeInTheDocument()
})

it('omits the Live site link when the project has no liveUrl', () => {
  render(<ProjectCard project={{ ...project, liveUrl: undefined }} />)
  expect(screen.queryByRole('link', { name: /Live site/ })).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Code/ })).toBeInTheDocument()
})

// Without captured device media, a project shows its own image in a wide 3:1 frame.
it('shows the project image in a 3:1 frame when there is no device media', () => {
  render(<ProjectCard project={{ ...project, media: undefined }} />)
  expect(screen.getByRole('img', { name: 'Demo screenshot' })).toHaveClass('aspect-[3/1]')
})

it('renders extra links, each opening in a new tab', () => {
  render(
    <ProjectCard
      project={{
        ...project,
        links: [
          { label: 'RAR on PolygonScan →', href: 'https://polygonscan.com/token/0x1' },
          { label: 'LIL on BaseScan →', href: 'https://basescan.org/token/0x2' },
        ],
      }}
    />,
  )
  const rar = screen.getByRole('link', { name: 'RAR on PolygonScan →' })
  expect(rar).toHaveAttribute('href', 'https://polygonscan.com/token/0x1')
  expect(rar).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link', { name: 'LIL on BaseScan →' })).toBeInTheDocument()
})
