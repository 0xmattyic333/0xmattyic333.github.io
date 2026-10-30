import type { Project } from './types'

// To add a project:
//   1. Put a screenshot in public/images/ (a wide image, around 1500x500, looks best).
//   2. Copy the entry below, paste it at the top of the list, and edit every field.
//   3. Run `npm test`, then commit and push. The site redeploys on its own.
export const projects: Project[] = [
  {
    id: 'tempr-esports',
    title: 'TEMPR Esports: WolfeePackk',
    description:
      'Official site for an esports team and streamer: live streams, team roster, weekly stream schedule, YouTube content, merch, and Discord.',
    tech: ['React', 'Vite', 'GitHub Pages', 'GoatCounter', 'Open Graph'],
    image: '/images/tempr-banner.jpg',
    imageAlt: 'TEMPR Esports banner',
    liveUrl: 'https://0xmattyic333.github.io/wolfeepackk_temprgg/',
    codeUrl: 'https://github.com/0xmattyic333/wolfeepackk_temprgg',
  },
]
