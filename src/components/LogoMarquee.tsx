import type { CSSProperties } from 'react'
import { logos, type Logo } from '../data/logos'
import { usePrefersReducedMotion } from '../lib/motion'

// One logo: an inline SVG path, an image file, or a text tile.
// `--brand` is the logo's color, used on hover.
function LogoItem({ logo, decorative }: { logo: Logo; decorative: boolean }) {
  const label = decorative ? {} : { role: 'img', 'aria-label': logo.name }
  const style = { '--brand': logo.color } as CSSProperties
  const common =
    'flex h-10 shrink-0 items-center gap-2 text-slate-300/70 transition-colors hover:text-[var(--brand)]'

  return (
    <li className={common} style={style} title={logo.name}>
      {logo.path ? (
        <svg {...label} viewBox="0 0 24 24" className="size-8 fill-current">
          <path d={logo.path} />
        </svg>
      ) : logo.src ? (
        <img src={logo.src} alt={decorative ? '' : logo.name} className="size-8 opacity-70" />
      ) : (
        <span {...label} className="rounded border border-current px-2 font-mono text-lg font-bold">
          {logo.name}
        </span>
      )}
    </li>
  )
}

// An endless strip of tech logos. The list is drawn twice side by side and the
// strip slides left by exactly one copy, so the loop has no visible seam.
// With reduced motion it's a still, wrapped row instead.
function LogoMarquee() {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <div className="overflow-hidden">
        <ul className="flex flex-wrap gap-8">
          {logos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} decorative={false} />
          ))}
        </ul>
      </div>
    )
  }

  return (
    // The mask fades the logos out at both edges.
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max gap-12 hover:[animation-play-state:paused]">
        <ul className="flex gap-12">
          {logos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} decorative={false} />
          ))}
        </ul>
        {/* The duplicate copy is hidden from screen readers so each logo is announced once. */}
        <ul className="flex gap-12" aria-hidden="true">
          {logos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} decorative />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LogoMarquee
