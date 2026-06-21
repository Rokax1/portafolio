"use client"

import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"
import { siteContent } from "@/lib/site-content"

interface Skill {
  name: string
  level: number
  category: string
  iconSrc?: string
  iconColor?: string
  iconMode?: "image" | "mask"
}

const skills: Skill[] = [...siteContent.skills.items]
const categories = [...siteContent.skills.categories]
const MARQUEE_COPIES = 3

function SkillIconTile({ skill, accent }: { skill: Skill; accent: string }) {
  const [imageFailed, setImageFailed] = useState(false)
  const useMask = Boolean(skill.iconSrc) && skill.iconMode === "mask"
  const showImage = Boolean(skill.iconSrc) && !imageFailed && !useMask
  const iconColor = skill.iconColor ?? accent

  return (
    <article
      className="group relative flex h-[164px] w-[152px] shrink-0 flex-col justify-between overflow-hidden border border-white/10 bg-card/45 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent}22, transparent 55%, ${accent}18)`,
        }}
      />
      <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute inset-y-3 right-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

      <div
        className="relative flex h-24 items-center justify-center border border-dashed border-white/12 bg-background/50 p-3 transition-all duration-300 group-hover:border-current group-hover:bg-background/70"
        style={{ color: accent }}
      >
        <div
          className="absolute inset-x-5 bottom-3 h-px opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
          }}
        />
        {useMask ? (
          <div
            className="relative z-10 h-13 w-13 transition-all duration-300 group-hover:scale-105"
            style={
              {
                backgroundColor: iconColor,
                WebkitMaskImage: `url(${skill.iconSrc})`,
                maskImage: `url(${skill.iconSrc})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
              } as CSSProperties
            }
          />
        ) : showImage ? (
          <img
            src={skill.iconSrc}
            alt={skill.name}
            width={52}
            height={52}
            onError={() => setImageFailed(true)}
            className="relative z-10 h-13 w-13 object-contain opacity-95 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="relative z-10 h-12 w-12 transition-all duration-300 group-hover:scale-105">
            <div className="absolute inset-0 rotate-45 border border-current/40 bg-current/8 transition-all duration-300 group-hover:border-current group-hover:bg-current/12" />
            <div className="absolute inset-[9px] border border-current/30" />
          </div>
        )}
      </div>

      <div className="relative space-y-2">
        <h4 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/45 transition-colors duration-300 group-hover:text-white">
          {skill.name}
        </h4>
        <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-all duration-300 group-hover:via-current" style={{ color: accent }} />
      </div>
    </article>
  )
}

function SkillsCarouselRow({ category, skills, isVisible, index }: { category: string; skills: Skill[]; isVisible: boolean; index: number }) {
  const categoryColors: Record<string, string> = {
    Frontend: "var(--neon-cyan)",
    Backend: "var(--neon-magenta)",
    DevOps: "var(--neon-green)",
    Diseno: "var(--neon-yellow)",
  }

  const accent = categoryColors[category]
  const repeatedSkills = Array.from({ length: MARQUEE_COPIES }, () => skills).flat()

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-card/35 px-4 py-6 backdrop-blur-sm transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(90deg, ${accent}10, transparent 18%, transparent 82%, ${accent}10)`,
        }}
      />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative mb-5 flex items-center justify-center gap-3 md:justify-start">
        <div className="h-3 w-3 rotate-45 bg-current" style={{ color: accent }} />
        <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-foreground tracking-wider">
          {category.toUpperCase()}
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-secondary to-transparent" />
        <div
          className="skills-marquee flex w-max gap-4"
          style={{
            animationDirection: index % 2 === 0 ? "normal" : "reverse",
            animationPlayState: isVisible ? "running" : "paused",
            ["--marquee-shift" as string]: `calc(-100% / ${MARQUEE_COPIES})`,
          }}
        >
          {repeatedSkills.map((skill, skillIndex) => (
            <SkillIconTile key={`${category}-${skill.name}-${skillIndex}`} skill={skill} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 px-4 md:px-8 bg-secondary overflow-hidden">
      <div className="absolute -top-px left-0 right-0 h-24 bg-background clip-diagonal-bottom" />

      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-neon-magenta/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-magenta" />
            <span className="text-sm text-neon-magenta tracking-[0.3em] uppercase">{siteContent.skills.eyebrow}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-magenta" />
          </div>
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold text-foreground">
            {siteContent.skills.title} <span className="text-neon-cyan text-glow-cyan">{siteContent.skills.highlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{siteContent.skills.description}</p>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <SkillsCarouselRow
              key={category}
              index={categories.indexOf(category)}
              category={category}
              skills={skills.filter((skill) => skill.category === category)}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {siteContent.skills.stats.map((stat) => (
            <div
              key={stat.label}
              className="w-[calc(50%-0.5rem)] md:w-[220px] text-center p-6 border border-border bg-card/30 backdrop-blur-sm"
            >
              <div className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold text-neon-cyan text-glow-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-px left-0 right-0 h-24 bg-background clip-diagonal-top" />
    </section>
  )
}
