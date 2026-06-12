"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { siteContent } from "@/lib/site-content"

const roleText = siteContent.branding.role

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
} as const

export function HeroSection() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= roleText.length) {
        setTypedText(roleText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 4000)
    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-magenta/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute w-full h-px bg-neon-cyan/50" style={{ animation: "scan-line 4s linear infinite" }} />
      </div>

      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-neon-cyan/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-neon-cyan/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-neon-cyan/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-neon-cyan/30" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-neon-cyan/30 bg-secondary/50 backdrop-blur-sm">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="text-sm text-neon-cyan tracking-widest uppercase">{siteContent.hero.status}</span>
        </div>

        <h1
          className={`font-[family-name:var(--font-orbitron)] text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight ${glitchActive ? "animate-glitch" : ""}`}
        >
          <span className="text-foreground">{siteContent.branding.name.first}</span>
          <span className="text-neon-cyan text-glow-cyan"> {siteContent.branding.name.last}</span>
        </h1>

        <div className="h-8 mb-8">
          <p className="font-[family-name:var(--font-orbitron)] text-lg md:text-xl text-neon-magenta tracking-[0.3em]">
            {typedText}
            <span className="animate-pulse">_</span>
          </p>
        </div>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {siteContent.hero.description}
        </p>

        <div className="flex items-center justify-center gap-6 mb-16">
          {siteContent.hero.socialLinks.map(({ platform, href, label }) => {
            const Icon = iconMap[platform]
            const isExternal = href.startsWith("http")

            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group relative p-3 border border-border bg-secondary/30 backdrop-blur-sm transition-all duration-300 hover:border-neon-cyan hover:neon-glow-cyan"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
              </a>
            )
          })}
        </div>

        <a
          href="#projects"
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors"
          aria-label={siteContent.hero.scrollAriaLabel}
        >
          <span className="text-xs tracking-widest uppercase">{siteContent.hero.scrollLabel}</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background clip-diagonal-top" />
    </section>
  )
}
