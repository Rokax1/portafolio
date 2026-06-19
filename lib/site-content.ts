export type NavLink = {
  href: string
  label: string
}

export type SocialLink = {
  platform: "github" | "linkedin" | "mail" | "twitter"
  href: string
  label: string
}

export type Project = {
  title: string
  description: string
  tags: string[]
  // Usa una ruta local dentro de /public, por ejemplo "/projects/migrabien.jpg",
  // o una URL remota completa, por ejemplo "https://...".
  imageSrc: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export type Skill = {
  name: string
  level: number
  category: string
}

export const siteContent = {
  metadata: {
    title: "Leandro Sepulveda - Desarrollador Full Stack",
    description:
      "Portafolio de desarrollador con foco en productos web modernos, automatizacion, integraciones con IA y experiencias digitales de alto impacto.",
  },
  branding: {
    navLogo: "DEVROWS",
    footerLogo: {
      primary: "DEV",
      secondary: "ROWS",
    },
    name: {
      first: "Leandro",
      last: "Sepulveda",
    },
    role: "DESARROLLADOR FULL STACK",
  },
  navigation: {
    links: [
      { href: "#projects", label: "Proyectos" },
      { href: "#skills", label: "Skills" },
      // { href: "#contact", label: "Contacto" },
    ] satisfies NavLink[],
    ctaLabel: "Hablemos",
    mobileOpenLabel: "Abrir menu",
    mobileCloseLabel: "Cerrar menu",
  },
  hero: {
    status: "",
    description:
      "Desarrollador full stack enfocado en construir soluciones web modernas, escalables y mantenibles. Mezclo frontend, backend, nube e integraciones con IA para sacar productos digitales que resuelvan problemas reales.",
    socialLinks: [
      // { platform: "github", href: "#", label: "GitHub" },
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/in/leandro-sepulveda/",
        label: "LinkedIn",
      },
      { platform: "mail", href: "#contact", label: "Correo" },
    ] satisfies SocialLink[],
    scrollLabel: "Ver proyectos",
    scrollAriaLabel: "Ir a proyectos",
  },
  projects: {
    eyebrow: "Portafolio",
    title: "Proyectos",
    highlight: "Destacados",
    description:
      "Una selección de proyectos donde mezclé producto, desarrollo y automatización para resolver necesidades concretas con foco en calidad técnica y buen resultado final.",
    items: [
      {
        title: "MigraBien - Asistente migratorio con IA",
        description:
          "Participé en el desarrollo de MigraBien, proyecto finalista de la primera AI Hackathon oficial de OpenAI en Latinoamérica, realizada en Santiago de Chile. La solución usa inteligencia artificial para orientar a personas en procesos migratorios, entregando asistencia personalizada, checklist de documentos y recomendaciones según cada caso.",
        tags: ["Node.js", "LangChain", "Ionic", "OpenAI API"],
        imageSrc: "/projects/migrabien/MigraBien.png",
        liveUrl: undefined,
        githubUrl: undefined,
        featured: true,
      },
      {
        title: "Gestor de alojamientos",
        description:
          "Plataforma web (SAS) para la gestión integral de alojamientos, orientada a cabañas, hoteles y hostales. Permite administrar reservas, disponibilidad, huéspedes, empresas, pagos, facturas y reportes desde un dashboard centralizado. Incluye calendario tipo Gantt, check-in/check-out digital, control multipropiedad, generación de PDF y exportación de datos para gestión contable y administrativa.",
        tags: ["Laravel", "Filament", "Tailwind CSS"],
        imageSrc: "/projects/hoteles/hotel-dashboard.png",
      },
    ] satisfies Project[],
    featuredLabel: "Destacado",
    liveLabel: "Ver proyecto",
    sourceLabel: "Código",
  },
  skills: {
    eyebrow: "Especialidad",
    title: "Habilidades",
    highlight: "Técnicas",
    description:
      "Experiencia trabajando con tecnologías modernas, mejorando procesos y adaptándome rápido a contextos de producto, negocio y ejecución técnica.",
    categories: ["Frontend", "Backend", "DevOps", "Diseno"],
    items: [
      { name: "Next.js", level: 95, category: "Frontend" },
      { name: "TypeScript", level: 92, category: "Frontend" },
      { name: "Bootstrap", level: 85, category: "Frontend" },
      { name: "Tailwind CSS", level: 98, category: "Frontend" },
      { name: "Node.js", level: 90, category: "Backend" },
      { name: "Laravel", level: 90, category: "Backend" },
      { name: "NestJS", level: 90, category: "Backend" },
      { name: "PostgreSQL / MariaDB", level: 88, category: "Backend" },
      { name: "Docker", level: 80, category: "DevOps" },
      { name: "AWS / OVH", level: 85, category: "DevOps" },
      { name: "Git / CI/CD", level: 92, category: "DevOps" },
      { name: "Figma", level: 78, category: "Diseno" },
    ] satisfies Skill[],
    stats: [
      { value: "5+", label: "Años de experiencia" },
      { value: "25+", label: "Proyectos entregados" },
      // { value: "30+", label: "Clientes y equipos" },
      { value: "15+", label: "Tecnologías clave" },
    ],
  },
  contact: {
    formEndpoint: "http://localhost:8000/api/forms/TU_PUBLIC_KEY/submit",
    eyebrow: "Contacto",
    title: "Conversemos",
    highlight: "Hoy",
    description:
      "Si tienes una idea, una mejora pendiente o un proyecto que sacar adelante, conversemos y vemos la mejor forma de armarlo.",
    availabilityTitle: "Disponibilidad",
    availabilityText: "Disponible para proyectos freelance y oportunidades full-time.",
    emailTitle: "Correo",
    emailAddress: "devrowslabs@gmail.com",
    locationTitle: "Ubicación",
    locationText: "Remoto / Chile / Latinoamérica",
    formTerminalLabel: "terminal://contacto",
    successTitle: "Mensaje enviado",
    successText: "Gracias por escribir. Te respondo apenas pueda.",
    errorTitle: "No se pudo enviar",
    errorText: "Por ahora no pude recibir el mensaje desde el formulario. Escríbeme directo al correo y te respondo apenas pueda.",
    fields: {
      name: "nombre",
      email: "correo",
      phone: "telefono",
      message: "mensaje",
    },
    placeholders: {
      name: "Tu nombre",
      email: "tu@email.com",
      phone: "+56 9...",
      message: "Cuéntame brevemente qué necesitas",
    },
    submitLabel: "Enviar mensaje",
    submittingLabel: "Enviando...",
    honeypotField: "website",
  },
  footer: {
    tagline:
      "Construyendo productos digitales con criterio tecnico, foco en negocio y una experiencia solida de punta a punta.",
    copyright: "Todos los derechos reservados.",
    status: "Estado del sistema: Online",
    socialLinks: [
      // { platform: "github", href: "#", label: "GitHub" },
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/in/leandro-sepulveda/",
        label: "LinkedIn",
      },
      { platform: "mail", href: "mailto:devrowslabs@gmail.com", label: "Correo" },
    ] satisfies SocialLink[],
  },
} as const
