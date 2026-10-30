import { skills } from '../data/skills'
import Section from './Section'

function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
        I got into coding when I realized that every system is built on code, from the COBOL running
        behind banks to the websites we use every day. I build modern sites with React and
        TypeScript, and I'm drawn to mainframes because that's where most of the world's data flows.
        These days I spend my time going deep on both: shipping web projects and earning IBM Z
        certifications. I'm open to freelance work.
      </p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-neon-violet/30 bg-neon-violet/10 px-3 py-1 text-sm text-slate-200"
          >
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default About
