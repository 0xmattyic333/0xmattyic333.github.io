import { render, screen, within } from '@testing-library/react'
import App from '../App'
import { badges } from '../data/badges'
import { skills } from '../data/skills'
import About from './About'
import Certifications from './Certifications'
import Contact from './Contact'

describe('Certifications', () => {
  it('shows each badge with a Credly verify link that opens in a new tab', () => {
    render(<Certifications />)
    for (const badge of badges) {
      const article = screen.getByRole('heading', { name: badge.name }).closest('article')!
      expect(within(article).getByRole('img', { name: `${badge.name} badge` })).toBeInTheDocument()
      const verify = within(article).getByRole('link', { name: /Verify on Credly/ })
      expect(verify).toHaveAttribute('href', badge.verifyUrl)
      expect(verify).toHaveAttribute('target', '_blank')
    }
  })
})

describe('About', () => {
  it('shows every skill tag', () => {
    render(<About />)
    for (const skill of skills) expect(screen.getByText(skill)).toBeInTheDocument()
  })
})

describe('Contact', () => {
  it('invites people to get in touch', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: "Let's work together." })).toBeInTheDocument()
  })

  it('links to GitHub, Discord, X, and email', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/0xmattyic333')
    expect(screen.getByRole('link', { name: /Discord/ })).toHaveAttribute('href', 'https://discord.com/users/1429664465091297310')
    expect(screen.getByRole('link', { name: /^X$/ })).toHaveAttribute('href', 'https://x.com/x0xmattyic333x')
    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:0xmattyic333@gmail.com')
  })

  it('opens email in the mail app, not a new tab', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /Email/ })).not.toHaveAttribute('target')
  })

  it('shows the email address as text', () => {
    render(<Contact />)
    expect(screen.getByText('0xmattyic333@gmail.com')).toBeInTheDocument()
  })
})

it('renders the sections in page order', () => {
  const { container } = render(<App />)
  const ids = [...container.querySelectorAll('section[id]')].map((s) => s.id)
  expect(ids).toEqual(['hero', 'projects', 'certifications', 'about', 'contact'])
})
