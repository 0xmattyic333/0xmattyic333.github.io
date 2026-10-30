import { skills } from '../data/skills'
import Section from './Section'

function About() {
  return (
    <Section id="about" title="About">
      {/* TODO(Matthew): make this yours. Rewrite it in your own words. */}
      <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
        I'm Matthew, a developer who builds fast, modern websites with React and TypeScript, and who
        also works on IBM Z mainframes: COBOL, REXX, JCL, and automation with Ansible and Zowe. I like
        taking an idea from blank page to live site 🕸️ 👨🏼‍💻, and I'm always learning something new 📚.
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
