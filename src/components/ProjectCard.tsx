import type { Project } from '../data/types'
import { card, externalLink, focusRing } from './styles'

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={`overflow-hidden ${card}`}>
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-full bg-neon/15 px-2.5 py-0.5 text-xs text-neon-sky">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-4 text-sm font-semibold">
          {/* `&&` renders the link only when the URL exists, so there are no dead links. */}
          {project.liveUrl && (
            <a href={project.liveUrl} {...externalLink} className={`text-neon-sky hover:text-white ${focusRing}`}>
              Live site →
            </a>
          )}
          {project.codeUrl && (
            <a href={project.codeUrl} {...externalLink} className={`text-neon-sky hover:text-white ${focusRing}`}>
              Code →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
