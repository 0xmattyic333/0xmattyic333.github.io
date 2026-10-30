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

// Banners are wide (about 1500x500, 3:1). The image frame must match that shape or the sides get cut off.
it('frames the project image at a 3:1 banner shape', () => {
  render(<ProjectCard project={project} />)
  expect(screen.getByRole('img', { name: 'Demo screenshot' })).toHaveClass('aspect-[3/1]')
})
