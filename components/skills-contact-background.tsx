"use client"

import SideRays from "./SideRays"

export function SkillsContactBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[62%] overflow-hidden">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)]">
          <SideRays
            className="h-full w-full"
            rayColor1="#00dcff"
            rayColor2="#ff00a8"
            speed={0.8}
            intensity={1.8}
            spread={2.8}
            origin="top-left"
            tilt={-26}
            saturation={0.9}
            blend={0.44}
            falloff={1.5}
            opacity={0.4}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[62%] overflow-hidden">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black_0%,black_68%,transparent_100%)]">
          <SideRays
            className="h-full w-full"
            rayColor1="#00dcff"
            rayColor2="#ff00a8"
            speed={0.8}
            intensity={2.1}
            spread={2.8}
            origin="top-right"
            tilt={26}
            saturation={0.9}
            blend={0.44}
            falloff={1.5}
            opacity={0.5}
          />
        </div>
      </div>
    </>
  )
}
