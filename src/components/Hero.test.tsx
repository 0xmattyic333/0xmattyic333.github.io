import { render, screen } from '@testing-library/react'
import Hero from './Hero'

it('greets with the main heading', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { level: 1, name: /Hi, I'm Matthew\./ })).toBeInTheDocument()
})

it('shows the tagline and eyebrow', () => {
  render(<Hero />)
  expect(screen.getByText('I build for the web, and I speak mainframe.')).toBeInTheDocument()
  expect(screen.getByText('WEB DEV · IBM Z')).toBeInTheDocument()
})

it('has buttons that jump to projects and contact', () => {
  render(<Hero />)
  expect(screen.getByRole('link', { name: 'See my work' })).toHaveAttribute('href', '#projects')
  expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '#contact')
})

it('shows the avatar with alt text', () => {
  render(<Hero />)
  expect(screen.getByRole('img', { name: /Matthew/ })).toHaveAttribute('src', '/avatar.png')
})

it('renders the mainframe terminal', () => {
  render(<Hero />)
  expect(screen.getByLabelText('Mainframe terminal demo')).toBeInTheDocument()
})
