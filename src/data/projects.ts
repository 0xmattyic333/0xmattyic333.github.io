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
  {
    id: 'web3-tokens',
    title: 'Web3 experiments: ERC-20 tokens',
    description:
      'Personal experiments deploying my own ERC-20 tokens to two EVM networks, RecklessAndRelentless (RAR) on Polygon and LonelyInLorain (LIL) on Base, to learn the contract deploy flow end to end.',
    tech: ['Solidity', 'ERC-20', 'Polygon', 'Base', 'EVM'],
    image: '/images/web3-tokens.svg',
    imageAlt: 'Two neon token coins labelled RAR and LIL',
    links: [
      {
        label: 'RAR on PolygonScan →',
        href: 'https://polygonscan.com/token/0x0259ddfBD48e65C22Ca365bc32AFF5B0a5fB9567',
      },
      {
        label: 'LIL on BaseScan →',
        href: 'https://basescan.org/token/0xF3007d8719741Cc361Dc7571120c01CE207fC772',
      },
    ],
  },
]
