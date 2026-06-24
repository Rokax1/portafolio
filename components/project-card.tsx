"use client"

import Image from "next/image"
import { ExternalLink, Github, Zap } from "lucide-react"
import GlareHover from "@/components/GlareHover"
import { withBasePath } from "@/lib/base-path"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageSrc: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  accentBorder?: boolean
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
  accentBorder = false,
  featuredLabel,
  liveLabel,
  sourceLabel,
}: ProjectCardProps) {
  const projectImageSrc = withBasePath(imageSrc)
  const hasAccentBorder = featured || accentBorder

  return (
    <GlareHover
      width="100%"
      height="auto"
      background="var(--card)"
      borderRadius="0px"
      borderColor={hasAccentBorder ? "rgb(0 220 255 / 0.5)" : "hsl(var(--border))"}
      glareColor="#00dcff"
      glareOpacity={0.18}
      glareAngle={-35}
      glareSize={180}
      transitionDuration={700}
      className={`group relative overflow-hidden transition-all duration-500 ${
        featured
          ? "border-neon-cyan/50 md:col-span-2"
          : hasAccentBorder
            ? "border-neon-cyan/50"
            : "border-border hover:border-neon-cyan/50"
      }`}
    >
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
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
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

    </GlareHover>
  )
}
