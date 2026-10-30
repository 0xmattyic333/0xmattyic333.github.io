import type { Project } from '../data/types'
import ProjectCard from './ProjectCard'
import Section from './Section'

type ProjectsProps = {
  items: Project[]
}

// Turns the list of projects into a grid of cards: one column on phones, two from "sm" up.
function Projects({ items }: ProjectsProps) {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
