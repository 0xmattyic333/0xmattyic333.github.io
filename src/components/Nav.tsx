import { focusRing } from './styles'

// Each href points at a section's id, so clicking scrolls to that section.
export const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function Nav() {
  return (
    // sticky + top-0 keeps the bar pinned to the top while the page scrolls.
    <header className="sticky top-0 z-10 border-b border-slate-400/15 bg-ink/70 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <a href="#hero" className={`font-bold text-white ${focusRing}`}>
          0xmattyic333
        </a>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={`transition-colors hover:text-white ${focusRing}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Nav
