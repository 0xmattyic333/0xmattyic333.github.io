import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionProps = {
  id: string
  title?: string
  children: ReactNode
}

// A wrapper every page section uses, so spacing and headings stay consistent.
// The id is what the nav links (#projects, #contact, ...) jump to.
function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      // scroll-mt leaves room for the sticky nav when jumping to a section.
      className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16"
    >
      <Reveal>
        {title && (
          <h2 id={headingId} className="mb-8 text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>
        )}
        {children}
      </Reveal>
    </section>
  )
}

export default Section
