// Shared Tailwind class strings. Keeping them in one place means every link
// and button gets the same keyboard-focus ring, so keyboard users can always
// see where they are on the page.
export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-sky'

// Spread onto links that leave the site: {...externalLink}.
// target="_blank" opens a new tab; rel="noopener noreferrer" stops the new
// page from getting access to this one (a standard safety habit).
export const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const

// The dark translucent card look used by projects and badges.
export const card =
  'rounded-xl border border-neon-sky/25 bg-slate-900/70 transition hover:border-neon-violet/60 hover:shadow-[0_0_24px_rgba(124,58,237,0.25)]'
