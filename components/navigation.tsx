"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { siteContent } from "@/lib/site-content"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { links, ctaLabel, mobileOpenLabel, mobileCloseLabel } = siteContent.navigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-[family-name:var(--font-orbitron)] text-2xl font-bold tracking-wider">
          <span className="text-foreground">{siteContent.branding.footerLogo.primary}</span>
          <span className="text-neon-cyan text-glow-cyan">{siteContent.branding.footerLogo.secondary}</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative text-sm text-muted-foreground hover:text-neon-cyan transition-colors tracking-wider uppercase group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 border border-neon-cyan text-neon-cyan text-sm tracking-wider uppercase hover:bg-neon-cyan hover:text-primary-foreground transition-all duration-300"
          >
            {ctaLabel}
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={isMobileMenuOpen ? mobileCloseLabel : mobileOpenLabel}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg text-muted-foreground hover:text-neon-cyan transition-colors tracking-wider uppercase"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-block mt-4 px-6 py-3 border border-neon-cyan text-neon-cyan tracking-wider uppercase hover:bg-neon-cyan hover:text-primary-foreground transition-all duration-300"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
