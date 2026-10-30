// TypeScript types describe the "shape" of our content. They work like a
// checklist: if you add a project and forget a required field (or misspell
// one), `npm run build` and your editor will point at the mistake.
// Fields with a `?` are optional.

// Device media made by `npm run capture` (paths inside public/).
export type ProjectMedia = {
  laptopVideo: string // .webm, shown on the laptop screen
  laptopVideoMp4: string // .mp4 fallback for browsers without WebM
  laptopPoster: string // still image shown before the video plays
  phone: string // the site at phone size
}

// An extra link on a project card, e.g. a block explorer page.
export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string // unique, short, kebab-case, e.g. "tempr-esports"
  title: string
  description: string
  tech: string[]
  image: string // path inside public/, e.g. "/images/my-project.png"
  imageAlt: string
  media?: ProjectMedia // laptop + phone mockup; leave out to show `image` instead
  liveUrl?: string // leave out if the project isn't deployed
  codeUrl?: string // leave out if the code is private
  links?: ProjectLink[] // any other links to show
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
