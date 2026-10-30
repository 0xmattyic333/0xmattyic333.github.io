import Section from './Section'
import Terminal from './Terminal'
import TypingLine from './TypingLine'

// Defined outside the component so the array isn't recreated (and the typing restarted) on every render.
const phrases = [
  'building React apps',
  'writing COBOL & REXX',
  'automating z/OS with Ansible',
  'deploying smart contracts',
]
import { focusRing } from './styles'

function Hero() {
  return (
    <Section id="hero">
      {/* Two columns from the "md" breakpoint up: intro left, terminal right. Stacked on phones. */}
      <div className="grid items-center gap-10 pt-6 md:grid-cols-2">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <img
            src="/avatar.png"
            alt="Matthew's avatar: anime-style portrait wearing a headset"
            width={112}
            height={112}
            // ring-3 draws the blue ring; the shadow gives it the neon glow.
            className="size-24 shrink-0 rounded-full ring-3 ring-neon shadow-[0_0_30px_6px_rgba(59,130,246,0.6)] md:size-28"
          />
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-neon-sky">WEB DEV · IBM Z</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Hi, I'm Matthew.
            </h1>
            {/* Gradient text: paint a gradient background, clip it to the letters, make the text itself transparent. */}
            <p className="mt-2 bg-gradient-to-r from-neon-sky to-neon-violet bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              I build for the web, and I speak mainframe.
            </p>
            <TypingLine phrases={phrases} />
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#projects"
                className={`rounded-lg bg-neon px-5 py-2.5 font-semibold text-white shadow-[0_0_16px_rgba(59,130,246,0.6)] transition hover:shadow-[0_0_24px_rgba(59,130,246,0.9)] ${focusRing}`}
              >
                See my work
              </a>
              <a
                href="#contact"
                className={`rounded-lg border border-slate-600 px-5 py-2.5 font-semibold text-slate-200 transition hover:border-neon-sky hover:text-white ${focusRing}`}
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
        <Terminal />
      </div>
    </Section>
  )
}

export default Hero
