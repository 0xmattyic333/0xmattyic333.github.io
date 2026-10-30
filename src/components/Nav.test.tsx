import { render, screen } from '@testing-library/react'
import Nav from './Nav'

it('shows the handle', () => {
  render(<Nav />)
  expect(screen.getByText('0xmattyic333')).toBeInTheDocument()
})

it('links to each section', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
  expect(screen.getByRole('link', { name: 'Certifications' })).toHaveAttribute('href', '#certifications')
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
})

it('nav links have a focus style', () => {
  render(<Nav />)
  for (const link of screen.getAllByRole('link')) {
    expect(link.className).toContain('focus-visible:outline')
  }
})
