import { badges } from '../data/badges'
import Section from './Section'
import { card, externalLink, focusRing } from './styles'

function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <div className="grid gap-6 sm:grid-cols-2">
        {badges.map((badge) => (
          <article key={badge.id} className={`flex gap-5 p-5 ${card}`}>
            <img
              src={badge.image}
              alt={`${badge.name} badge`}
              loading="lazy"
              className="size-20 shrink-0 object-contain"
            />
            {/* min-w-0 lets long badge names wrap instead of pushing the card wider than the screen. */}
            <div className="min-w-0">
              <h3 className="font-bold break-words text-white">{badge.name}</h3>
              <p className="text-xs text-muted">Issued by {badge.issuer}</p>
              <p className="mt-2 text-sm text-slate-300">{badge.skills.join(' · ')}</p>
              <a
                href={badge.verifyUrl}
                {...externalLink}
                className={`mt-3 inline-block text-sm font-semibold text-neon-sky hover:text-white ${focusRing}`}
              >
                Verify on Credly →
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Certifications
