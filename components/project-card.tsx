"use client"

import Image from "next/image"
import { useState } from "react"
import { ExternalLink, Github, Zap } from "lucide-react"
import { withBasePath } from "@/lib/base-path"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageSrc: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  featuredLabel: string
  liveLabel: string
  sourceLabel: string
}

export function ProjectCard({
  title,
  description,
  tags,
  imageSrc,
  liveUrl,
  githubUrl,
  featured = false,
  featuredLabel,
  liveLabel,
  sourceLabel,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const projectImageSrc = withBasePath(imageSrc)

  return (
    <article
      className={`group relative overflow-hidden bg-card border transition-all duration-500 ${
        featured ? "border-neon-cyan/50 md:col-span-2" : "border-border hover:border-neon-cyan/50"
      } ${isHovered ? "neon-glow-cyan" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.1), transparent)",
          animation: isHovered ? "border-flow 2s linear infinite" : "none",
        }}
      />

      {featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/50 backdrop-blur-sm">
          <Zap className="w-3 h-3 text-neon-cyan" />
          <span className="text-xs text-neon-cyan tracking-wider uppercase">{featuredLabel}</span>
        </div>
      )}

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={projectImageSrc}
          alt={title}
          fill
          priority={featured}
          sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-30" : "opacity-0"}`}
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 220, 255, 0.03) 2px, rgba(0, 220, 255, 0.03) 4px)",
          }}
        />
      </div>

      <div className="relative p-6">
        <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-bold mb-3 text-foreground group-hover:text-neon-cyan transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-secondary border border-border text-muted-foreground tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{liveLabel}</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-magenta transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>{sourceLabel}</span>
            </a>
          )}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-cyan/0 group-hover:border-neon-cyan transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-cyan/0 group-hover:border-neon-cyan transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-cyan/0 group-hover:border-neon-cyan transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-cyan/0 group-hover:border-neon-cyan transition-colors duration-300" />
    </article>
  )
}
