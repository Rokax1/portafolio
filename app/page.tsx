import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SkillsContactBackground } from "@/components/skills-contact-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <div className="relative overflow-hidden">
        <SkillsContactBackground />
        <div className="relative z-10">
          <SkillsSection />
          <ContactSection />
        </div>
      </div>
      <Footer />
    </main>
  )
}
