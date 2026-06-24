"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { siteContent } from "@/lib/site-content"
import RippleGrid from "@/components/RippleGrid"

const roleText = siteContent.branding.role

// Controles experimentales de RippleGrid para ajustar el fondo del hero.
const EXPERIMENTAL_RIPPLE_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315, 360, 315, 270, 225, 180, 135, 90, 45] as const
// Cada cuántos milisegundos cambia al siguiente ángulo objetivo. Prueba entre 4000 y 12000.
const EXPERIMENTAL_ROTATION_INTERVAL_MS = 7000
// Cuánto espera después del cambio de giro antes de activar el pulso del ripple. Prueba entre 0 y 3000.
const EXPERIMENTAL_RIPPLE_DELAY_MS = 1000
// Cuánto tiempo se mantiene activo el pulso antes de volver a 0. Prueba entre 500 y 4000.
const EXPERIMENTAL_RIPPLE_DURATION_MS = 2000
// Intensidad máxima del ripple durante el pulso. Prueba entre 0.001 y 0.03.
const EXPERIMENTAL_RIPPLE_INTENSITY = 0.01
// Distancia entre las líneas de la grilla. Menor valor = grilla más densa. Prueba entre 10 y 80.
const EXPERIMENTAL_GRID_SIZE = 23
// Fuerza/definición visual de las líneas. Menor = más suaves, mayor = más marcadas. Prueba entre 10 y 80.
const EXPERIMENTAL_GRID_THICKNESS = 48
// Glow extra alrededor de las líneas de la grilla. Prueba entre 0 y 2.
const EXPERIMENTAL_GLOW_INTENSITY = 1
// Qué tan rápido se desvanece la grilla hacia los bordes. Menor = se ve más lejos. Prueba entre 0.2 y 3.
const EXPERIMENTAL_FADE_DISTANCE = 0.5
// Fuerza del viñeteado oscuro en los bordes. Prueba entre 0 y 8.
const EXPERIMENTAL_VIGNETTE_STRENGTH = 5
// Radio del efecto que responde al mouse. Mayor = reacciona una zona más grande. Prueba entre 0.5 y 3.
const EXPERIMENTAL_MOUSE_INTERACTION_RADIUS = 1.8
// Color principal de la grilla.
const EXPERIMENTAL_GRID_COLOR = "#00dcff"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
} as const

export function HeroSection() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [rippleRotation, setRippleRotation] = useState<(typeof EXPERIMENTAL_RIPPLE_ROTATIONS)[number]>(0)
  const [rippleIntensity, setRippleIntensity] = useState(0)

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

  useEffect(() => {
    // Experimental: easy to remove if the motion feels distracting.
    let rotationIndex = 0
    let pulseOnTimeout: ReturnType<typeof setTimeout> | undefined
    let pulseOffTimeout: ReturnType<typeof setTimeout> | undefined
    const rotationInterval = setInterval(() => {
      rotationIndex = (rotationIndex + 1) % EXPERIMENTAL_RIPPLE_ROTATIONS.length
      setRippleRotation(EXPERIMENTAL_RIPPLE_ROTATIONS[rotationIndex])

      // Experimental: once the rotation has mostly settled, pulse the ripple briefly.
      if (pulseOnTimeout) clearTimeout(pulseOnTimeout)
      if (pulseOffTimeout) clearTimeout(pulseOffTimeout)

      pulseOnTimeout = setTimeout(() => {
        setRippleIntensity(EXPERIMENTAL_RIPPLE_INTENSITY)

        pulseOffTimeout = setTimeout(() => {
          setRippleIntensity(0)
        }, EXPERIMENTAL_RIPPLE_DURATION_MS)
      }, EXPERIMENTAL_RIPPLE_DELAY_MS)
    }, EXPERIMENTAL_ROTATION_INTERVAL_MS)

    return () => {
      clearInterval(rotationInterval)
      if (pulseOnTimeout) clearTimeout(pulseOnTimeout)
      if (pulseOffTimeout) clearTimeout(pulseOffTimeout)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <RippleGrid
          gridColor={EXPERIMENTAL_GRID_COLOR}
          gridSize={EXPERIMENTAL_GRID_SIZE}
          gridThickness={EXPERIMENTAL_GRID_THICKNESS}
          glowIntensity={EXPERIMENTAL_GLOW_INTENSITY}
          rippleIntensity={rippleIntensity}
          fadeDistance={EXPERIMENTAL_FADE_DISTANCE}
          vignetteStrength={EXPERIMENTAL_VIGNETTE_STRENGTH}
          gridRotation={rippleRotation}
          mouseInteractionRadius={EXPERIMENTAL_MOUSE_INTERACTION_RADIUS}
        />
      </div>

      <div className="absolute inset-0 z-0 bg-background/20" />

      <div className="absolute top-20 left-4 z-20 h-14 w-14 border-l-2 border-t-2 border-neon-cyan/30 md:top-8 md:left-8 md:h-20 md:w-20" />
      <div className="absolute top-20 right-4 z-20 h-14 w-14 border-r-2 border-t-2 border-neon-cyan/30 md:top-8 md:right-8 md:h-20 md:w-20" />
      <div className="absolute bottom-4 left-4 z-20 h-14 w-14 border-l-2 border-b-2 border-neon-cyan/30 md:bottom-8 md:left-8 md:h-20 md:w-20" />
      <div className="absolute bottom-4 right-4 z-20 h-14 w-14 border-r-2 border-b-2 border-neon-cyan/30 md:bottom-8 md:right-8 md:h-20 md:w-20" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-neon-cyan/30 bg-secondary/50 backdrop-blur-sm">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="text-sm text-neon-cyan tracking-widest uppercase">{siteContent.hero.status}</span>
        </div> */}

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
    </section>
  )
}
