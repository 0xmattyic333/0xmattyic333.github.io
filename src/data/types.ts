// TypeScript types describe the "shape" of our content. They work like a
// checklist: if you add a project and forget a required field (or misspell
// one), `npm run build` and your editor will point at the mistake.
// Fields with a `?` are optional.

export type Project = {
  id: string // unique, short, kebab-case, e.g. "tempr-esports"
  title: string
  description: string
  tech: string[]
  image: string // path inside public/, e.g. "/images/my-project.png"
  imageAlt: string
  liveUrl?: string // leave out if the project isn't deployed
  codeUrl?: string // leave out if the code is private
}

export type Badge = {
  id: string
  name: string
  issuer: string
  image: string
  skills: string[]
  verifyUrl: string
}

export type ContactLink = {
  label: 'GitHub' | 'Discord' | 'X' | 'Email'
  href: string
}
