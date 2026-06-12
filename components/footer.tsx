import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { siteContent } from "@/lib/site-content"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
} as const

export function Footer() {
  return (
    <footer className="relative py-16 px-4 md:px-8 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div>
            <a href="#" className="inline-block font-[family-name:var(--font-orbitron)] text-2xl font-bold tracking-wider mb-4">
              <span className="text-foreground">{siteContent.branding.footerLogo.primary}</span>
              <span className="text-neon-cyan text-glow-cyan">{siteContent.branding.footerLogo.secondary}</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">{siteContent.footer.tagline}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {siteContent.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            {siteContent.footer.socialLinks.map(({ platform, href, label }) => {
              const Icon = iconMap[platform]

              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 border border-border text-muted-foreground hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteContent.branding.footerLogo.primary}. {siteContent.footer.copyright}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span>{siteContent.footer.status}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
