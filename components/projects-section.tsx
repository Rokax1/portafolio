"use client"

import { siteContent } from "@/lib/site-content"
import { ProjectCard } from "./project-card"

export function ProjectsSection() {
  const section = siteContent.projects

  return (
    <section id="projects" className="relative py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
            <span className="text-sm text-neon-cyan tracking-[0.3em] uppercase">{section.eyebrow}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
          </div>
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold text-foreground">
            {section.title} <span className="text-neon-magenta text-glow-magenta">{section.highlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{section.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.items.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageSrc={project.imageSrc}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              featured={project.featured}
              accentBorder={project.title === "MigraBien - Asistente migratorio con IA"}
              featuredLabel={section.featuredLabel}
              liveLabel={section.liveLabel}
              sourceLabel={section.sourceLabel}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
