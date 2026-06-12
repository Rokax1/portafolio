"use client"

import { useEffect, useRef, useState } from "react"
import { siteContent } from "@/lib/site-content"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [...siteContent.skills.items]
const categories = [...siteContent.skills.categories]

function SkillBar({ skill, isVisible }: { skill: Skill; isVisible: boolean }) {
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setAnimatedLevel(skill.level)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, skill.level])

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-foreground group-hover:text-neon-cyan transition-colors">{skill.name}</span>
        <span className="text-xs text-neon-cyan font-mono">{animatedLevel}%</span>
      </div>
      <div className="relative h-2 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0, 220, 255, 0.1) 8px, rgba(0, 220, 255, 0.1) 10px)",
          }}
        />
        <div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-1000 ease-out relative"
          style={{ width: `${animatedLevel}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-neon-cyan transition-all duration-1000 ease-out"
          style={{
            left: `${animatedLevel}%`,
            boxShadow: "0 0 10px rgba(0, 220, 255, 0.8)",
          }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ category, skills, isVisible }: { category: string; skills: Skill[]; isVisible: boolean }) {
  const categoryColors: Record<string, string> = {
    Frontend: "border-neon-cyan/30 hover:border-neon-cyan",
    Backend: "border-neon-magenta/30 hover:border-neon-magenta",
    DevOps: "border-neon-green/30 hover:border-neon-green",
    Diseno: "border-neon-yellow/30 hover:border-neon-yellow",
  }

  const iconColors: Record<string, string> = {
    Frontend: "text-neon-cyan",
    Backend: "text-neon-magenta",
    DevOps: "text-neon-green",
    Diseno: "text-neon-yellow",
  }

  return (
    <div className={`relative p-6 bg-card/50 backdrop-blur-sm border transition-all duration-300 ${categoryColors[category]}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rotate-45 ${iconColors[category]} bg-current`} />
        <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-foreground tracking-wider">
          {category.toUpperCase()}
        </h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} isVisible={isVisible} />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-current opacity-50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-current opacity-50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-current opacity-50" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category}
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
