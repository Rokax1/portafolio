"use client"

import RippleGrid from "@/components/RippleGrid"

interface SectionRippleBackgroundProps {
  overlayClassName?: string
  rippleIntensity?: number
  glowIntensity?: number
  opacity?: number
}

export function SectionRippleBackground({
  overlayClassName = "bg-background/20",
  rippleIntensity = 0,
  glowIntensity = 1,
  opacity = 1,
}: SectionRippleBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <RippleGrid
          gridColor="#00dcff"
          gridSize={23}
          gridThickness={48}
          glowIntensity={glowIntensity}
          rippleIntensity={rippleIntensity}
          fadeDistance={0.5}
          vignetteStrength={5}
          opacity={opacity}
          gridRotation={0}
          mouseInteractionRadius={1.8}
        />
      </div>
      <div className={`absolute inset-0 z-0 ${overlayClassName}`} />
    </>
  )
}
