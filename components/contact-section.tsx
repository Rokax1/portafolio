"use client"

import { useState } from "react"
import { Send, MapPin, Mail, Terminal } from "lucide-react"
import { siteContent } from "@/lib/site-content"
import { SectionRippleBackground } from "./section-ripple-background"

export function ContactSection() {
  const contact = siteContent.contact
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || contact.formEndpoint

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitFailed(false)
    setSubmitMessage("")

    try {
      const data = new FormData(e.currentTarget)

      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      })

      const json = await response.json().catch(() => null)

      if (!response.ok || !json?.success) {
        setSubmitMessage(json?.message || contact.errorText)
        throw new Error("submit_failed")
      }

      setSubmitMessage(json.message || contact.successText)
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "", website: "" })
      e.currentTarget.reset()
    } catch {
      setSubmitFailed(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-4 md:px-8 overflow-hidden">
      <SectionRippleBackground />
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-24 bg-gradient-to-b from-background via-background/80 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
            <span className="text-sm text-neon-cyan tracking-[0.3em] uppercase">{contact.eyebrow}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
          </div>
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold text-foreground">
            {contact.title} <span className="text-neon-magenta text-glow-magenta">{contact.highlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{contact.description}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 border border-neon-cyan/30 bg-secondary">
                  <Terminal className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-foreground mb-1">
                    {contact.availabilityTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{contact.availabilityText}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 border border-neon-magenta/30 bg-secondary">
                  <Mail className="w-5 h-5 text-neon-magenta" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-foreground mb-1">
                    {contact.emailTitle}
                  </h3>
                  <a href={`mailto:${contact.emailAddress}`} className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                    {contact.emailAddress}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 border border-neon-green/30 bg-secondary">
                  <MapPin className="w-5 h-5 text-neon-green" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-foreground mb-1">
                    {contact.locationTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{contact.locationText}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="relative p-8 border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-neon-yellow" />
                <div className="w-3 h-3 rounded-full bg-neon-green" />
                <span className="ml-2 text-xs text-muted-foreground font-sans">{contact.formTerminalLabel}</span>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-neon-green bg-neon-green/10 mb-4">
                    <Send className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-foreground mb-2">
                    {contact.successTitle}
                  </h3>
                  <p className="text-muted-foreground">{submitMessage || contact.successText}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {submitFailed && (
                    <div className="border border-neon-magenta/40 bg-neon-magenta/10 p-4 text-left">
                      <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-foreground mb-2">
                        {contact.errorTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {submitMessage || contact.errorText}{" "}
                        <a href={`mailto:${contact.emailAddress}`} className="text-neon-cyan hover:underline">
                          {contact.emailAddress}
                        </a>
                      </p>
                    </div>
                  )}

                  <input
                    type="text"
                    name={contact.honeypotField}
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label htmlFor="name" className="block text-sm text-muted-foreground mb-2 font-sans">
                      {">"} {contact.fields.name}:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors"
                      placeholder={contact.placeholders.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-2 font-sans">
                      {">"} {contact.fields.email}:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors"
                      placeholder={contact.placeholders.email}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2 font-sans">
                      {">"} {contact.fields.phone}:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors"
                      placeholder={contact.placeholders.phone}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-muted-foreground mb-2 font-sans">
                      {">"} {contact.fields.message}:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors resize-none"
                      placeholder={contact.placeholders.message}
                    />
                  </div>

                  {turnstileSiteKey && (
                    <div
                      className="cf-turnstile flex min-h-16 items-center justify-center border border-border bg-secondary"
                      data-sitekey={turnstileSiteKey}
                    />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-4 bg-neon-cyan text-primary-foreground font-[family-name:var(--font-orbitron)] font-bold tracking-wider uppercase transition-all duration-300 hover:neon-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          {contact.submittingLabel}
                        </>
                      ) : (
                        <>
                          {contact.submitLabel}
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              )}

              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-cyan" />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
