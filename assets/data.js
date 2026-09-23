/* Datos del portafolio — generados a partir del análisis de cada repositorio de github.com/carontumrotumero */
window.PROFILE = {
  handle: "carontumrotumero",
  name: "Carontum",
  role: "Desarrollador full-stack & de escritorio",
  location: "España",
  avatar: "https://avatars.githubusercontent.com/u/228751427?v=4",
  github: "https://github.com/carontumrotumero",
  since: "2025-08-26",
  stats: { repos: 17, publicRepos: 12, privateRepos: 5, commits: 157, contributions: 166, languages: 11, releases: 3 }
};

window.LANGS = [
  ["JavaScript", 581311, "#f7df1e"],
  ["TypeScript", 364897, "#3178c6"],
  ["C++", 157666, "#f34b7d"],
  ["CSS", 121753, "#8b5cf6"],
  ["HTML", 112123, "#e34c26"],
  ["PL/pgSQL", 68422, "#336791"],
  ["C", 5303, "#a8b9cc"],
  ["CMake", 3834, "#64748b"],
  ["Shell", 3295, "#89e051"],
  ["Python", 2233, "#3572a5"],
  ["Swift", 24, "#f05138"]
];

window.PROJECTS = [
  {
    id: "voxelix", repo: "Voxelix", title: "Voxelix", icon: "box", accent: "#4ade80",
    tagline: "Launcher moderno de Minecraft en C++17 / Qt6",
    desc: "Launcher nativo multiplataforma, sin Electron, con el mismo stack que Prism Launcher. Login con Microsoft, instalación de Vanilla, Fabric y Forge, y un navegador de mods, shaders y resource packs de Modrinth y CurseForge.",
    cats: ["escritorio", "minecraft"], private: false, featured: true, size: "xl",
    langs: { "C++": 157666, C: 5303, CMake: 3834, Python: 2233 },
    commits: 13, created: "2026-08-11", updated: "2026-09-12", version: "v0.1.0",
    stack: ["C++17", "Qt6", "CMake", "CPack", "GitHub Actions", "Modrinth API", "CurseForge API", "MSAL / Xbox Live"],
    features: [
      "Login Microsoft completo: device code → Xbox Live → XSTS → Minecraft Services",
      "Instala y lanza Vanilla, Fabric y Forge (pipeline de Forge verificado de punta a punta)",
      "Resolución recursiva de dependencias de mods (obligatorias y opcionales) en Modrinth y CurseForge",
      "Auto-actualización a través de GitHub Releases, instalador NSIS silencioso en Windows",
      "CI con matriz Windows / Linux / macOS que publica .exe, .zip, .deb, .tar.gz y .dmg",
      "Tema oscuro QSS propio, diálogos personalizados e iconos de reicon"
    ],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/Voxelix", icon: "github" }, { label: "Descargas", url: "https://github.com/carontumrotumero/Voxelix/releases/latest", icon: "download" }]
  },
  {
    id: "umbrathel-web", repo: "umbrathel-web", title: "Umbrathel Web", icon: "globe", accent: "#a78bfa",
    tagline: "Navegador de escritorio sobre Chromium con estética Liquid Glass",
    desc: "Un navegador completo construido con Electron: pestañas aisladas con WebContentsView, perfiles, apps ancladas estilo Discord, paleta de comandos, vista dividida y un asistente de IA local con Ollama. Va por la versión 0.10.",
    cats: ["escritorio", "ia", "umbrathel"], private: false, featured: true, size: "xl",
    langs: { JavaScript: 191288, CSS: 35594, HTML: 26239, Shell: 3295, Swift: 24 },
    commits: 21, created: "2026-07-13", updated: "2026-09-11", version: "v0.10.1",
    stack: ["Electron", "Chromium", "Node.js", "electron-builder", "Ollama", "WebAuthn", "macOS vibrancy"],
    features: [
      "Pestañas sandboxed, grupos, restaurar sesión, incógnito efímero en memoria",
      "Paleta de comandos ⌘K y vista dividida para dos pestañas lado a lado",
      "Apps ancladas (Discord, mapas, wikis) que siguen vivas en segundo plano con notificaciones nativas",
      "Asistente de IA local con Ollama: se instala solo y gestiona modelos por peso",
      "Traducción con IA con fallback automático, gestor de descargas, contraseñas y extensiones",
      "Estado en vivo de servidores de Minecraft en la pantalla de inicio",
      "Auto-updates reales en Windows y Linux, builds para macOS (x64 / arm64), Windows y Linux"
    ],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/umbrathel-web", icon: "github" }, { label: "Descargas", url: "https://github.com/carontumrotumero/umbrathel-web/releases/latest", icon: "download" }]
  },
  {
    id: "nethercore", repo: "nethercore", title: "NetherCore", icon: "server", accent: "#f97316",
    tagline: "Hosting de Minecraft con cobro y aprovisionamiento automático",
    desc: "Web comercial y sistema de facturación para una empresa de hosting de servidores de Minecraft. Un pago en PayPal dispara un webhook que crea, suspende o elimina el servidor en Pterodactyl sin intervención humana.",
    cats: ["web", "backend", "minecraft"], private: true, featured: true, size: "lg",
    langs: { TypeScript: 184639, CSS: 8962, JavaScript: 3555 },
    commits: 10, created: "2026-09-07", updated: "2026-09-07",
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "PayPal Subscriptions", "Pterodactyl API", "PostgreSQL", "Vercel Cron"],
    features: [
      "6 planes + add-ons, con i18n en 6 idiomas y moneda detectada por geolocalización",
      "Webhooks de PayPal verificados por firma → activar / suspender servidores",
      "Cron diario que elimina servidores suspendidos tras el periodo de gracia",
      "Panel /admin protegido con libro de pagos, MRR y suscripciones",
      "Sin base de datos obligatoria: el id de suscripción vive como external_id del servidor",
      "Pase de animaciones: spotlight, reveal on scroll y barra de progreso"
    ],
    links: [{ label: "Web en vivo", url: "https://nethercore.vercel.app", icon: "external-link" }]
  },
  {
    id: "umbrathel-client", repo: "Umbrathel-client", title: "Umbrathel Client", icon: "swords", accent: "#eab308",
    tagline: "Cliente oficial de Minecraft del Reino de Umbrathel",
    desc: "Launcher de Minecraft en Electron + React para la comunidad de rol de Umbrathel: instancias, instalación de Forge, gestión de Java, consola en vivo y mods empaquetados. 10 versiones publicadas con auto-updater.",
    cats: ["escritorio", "minecraft", "umbrathel"], private: false, featured: true, size: "md",
    langs: { JavaScript: 128264, CSS: 5403, HTML: 748 },
    commits: 9, created: "2026-06-13", updated: "2026-06-27", version: "v1.0.10",
    stack: ["Electron", "React", "Vite", "electron-updater", "Forge"],
    features: [
      "Creación de instancias y tarjetas por perfil",
      "Instalador de Forge y detección de Java integrados",
      "Consola del juego en tiempo real",
      "Auto-updater con confirmación del usuario y targets zip/dmg para macOS",
      "Mods del servidor incluidos como recursos del instalador"
    ],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/Umbrathel-client", icon: "github" }, { label: "Descargas", url: "https://github.com/carontumrotumero/Umbrathel-client/releases/latest", icon: "download" }]
  },
  {
    id: "banco-umbrathel", repo: "banco-umbrathel", title: "Banco de Umbrathel", icon: "landmark", accent: "#facc15",
    tagline: "Banca en tiempo real con moneda propia (Ḡ) y bot de Discord",
    desc: "Aplicación bancaria web con saldo, transferencias, historial, salarios y mercado, conectada a un bot de Discord que sincroniza tiendas y pagos con Supabase. Login con Discord OAuth.",
    cats: ["web", "backend", "umbrathel"], private: false, featured: true, size: "md",
    langs: { JavaScript: 70527, "PL/pgSQL": 27900, CSS: 3271, HTML: 305 },
    commits: 25, created: "2026-05-17", updated: "2026-06-14",
    stack: ["React", "Vite", "Supabase", "PostgreSQL + RLS", "Discord.js", "Discord OAuth", "GitHub Pages / Vercel"],
    features: [
      "Cuentas, ingresos, retiradas y transferencias entre usuarios",
      "5 migraciones SQL versionadas con Row Level Security y realtime",
      "Ajustes de administrador firmados y auditables",
      "Salarios automáticos y marketplace sincronizados desde el bot de Discord",
      "Despliegue dual: GitHub Actions → Pages y Vercel"
    ],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/banco-umbrathel", icon: "github" }, { label: "Web en vivo", url: "https://banco-umbrathel.vercel.app", icon: "external-link" }]
  },
  {
    id: "horario", repo: "clases-26-27", title: "Mi Horario de Clase", icon: "calendar-days", accent: "#38bdf8",
    tagline: "PWA del horario de SMR, compartida en tiempo real por toda la clase",
    desc: "Web instalable con el horario semanal, festivos del calendario escolar, avisos de falta, tareas y exámenes compartidos al momento entre compañeros, y un calendario .ics suscribible generado por una Edge Function.",
    cats: ["web", "backend"], private: false, hidden: true, featured: true, size: "md",
    langs: { JavaScript: 70382, CSS: 15114, TypeScript: 11885, HTML: 7465 },
    commits: 13, created: "2026-09-14", updated: "2026-09-21",
    stack: ["PWA + Service Worker", "Supabase", "Edge Functions (Deno)", "iCalendar", "Notifications API"],
    features: [
      "Acceso protegido por contraseña validada en el servidor, y PIN por alumno",
      "Avisos y tareas en tiempo real que solo puede borrar quien los creó",
      "Feed .ics para Google Calendar / Apple Calendar que se actualiza solo",
      "Avisos de huelgas, festivos locales, recreo y tema claro/oscuro",
      "Notificaciones 10 minutos antes de cada clase"
    ],
    links: []
  },
  {
    id: "studiosmv", repo: "studiosmv-erty", title: "Studios MV · ERTY", icon: "clapperboard", accent: "#f43f5e",
    tagline: "Web para un cliente: IA, cartomagia y edición de vídeo",
    desc: "Landing de marca para un cliente real con secciones de cursos de IA y automatización, formación en cartomagia y servicios de edición, con reseñas reales y contacto por Discord, WhatsApp y Gmail.",
    cats: ["web", "cliente"], private: true, size: "sm",
    langs: { CSS: 33356, HTML: 32978, JavaScript: 9344 },
    commits: 9, created: "2026-08-21", updated: "2026-08-21",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    features: ["Diseño responsive afinado para móvil", "Animaciones reveal y titulares con efecto", "Reseñas de clientes reales", "Contacto directo por Discord, WhatsApp y Gmail"],
    links: [{ label: "Web en vivo", url: "https://studiosmv-erty.vercel.app", icon: "external-link" }]
  },
  {
    id: "vanaco", repo: "gestion", title: "Vanaco Working Force", icon: "briefcase", accent: "#14b8a6",
    tagline: "Gestión de trabajadores, préstamos y presupuestos",
    desc: "Panel de gestión con backend Express y Supabase: control de trabajadores y estados, préstamos, presupuestos por proyecto y recompensas por tareas. Registro con aprobación y roles de administrador.",
    cats: ["web", "backend"], private: false, size: "sm",
    langs: { JavaScript: 69824, "PL/pgSQL": 24985, CSS: 6856, HTML: 20000 },
    commits: 30, created: "2026-03-08", updated: "2026-03-17",
    stack: ["Node.js", "Express 5", "Supabase", "PostgreSQL", "Vercel"],
    features: ["Migrado a arquitectura server-side", "Primer usuario = admin automático, el resto queda pendiente de activación", "Admins pueden activar, bloquear y promover usuarios", "Scripts SQL de esquema, verificación y acceso de emergencia"],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/gestion", icon: "github" }]
  },
  {
    id: "aethelgard", repo: "Aethelgard", title: "Aethelgard", icon: "crown", accent: "#c084fc",
    tagline: "Tienda de rangos para un servidor de Minecraft",
    desc: "Web con registro por nombre de Minecraft válido, pagos externos configurables (PayPal / Tebex) y un panel admin para marcar pagos y activar rangos.",
    cats: ["web", "backend", "minecraft"], private: false, size: "sm",
    langs: { JavaScript: 38046, CSS: 9996, HTML: 5133, "PL/pgSQL": 1380 },
    commits: 16, created: "2026-02-21", updated: "2026-03-16",
    stack: ["Node.js", "Express 5", "Supabase", "Vercel Serverless"],
    features: ["Validación de usuario de Minecraft (3-16 caracteres)", "Pagos pendientes por usuario", "API admin protegida por token", "Activación gratuita de rangos para admins"],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/Aethelgard", icon: "github" }, { label: "Web en vivo", url: "https://aethelgard-sooty.vercel.app", icon: "external-link" }]
  },
  {
    id: "banco-estelar", repo: "Banco-estelar", title: "Banco Estelar", icon: "orbit", accent: "#6366f1",
    tagline: "Banco galáctico con React 19, Tailwind v4 y Supabase RPC",
    desc: "Aplicación bancaria con temática espacial: autenticación, usuarios, transferencias y ajustes vía funciones RPC de Supabase, consola flotante de errores y reset de demo para admins.",
    cats: ["web", "backend"], private: true, size: "sm",
    langs: { TypeScript: 109121, "PL/pgSQL": 14157, HTML: 1482, CSS: 1196 },
    commits: 6, created: "2026-04-29", updated: "2026-04-29",
    stack: ["React 19", "Vite 7", "Tailwind CSS v4", "TypeScript", "Supabase RPC"],
    features: ["Registro público con saldo inicial cero", "Transferencias y ajustes vía RPC", "Consola de errores flotante", "Reset de demo para administradores"],
    links: [{ label: "Web en vivo", url: "https://banco-estelar.vercel.app", icon: "external-link" }]
  },
  {
    id: "umbrathel-legal", repo: "umbrathel-legal", title: "Umbrathel Legal", icon: "scale", accent: "#94a3b8",
    tagline: "Términos y privacidad del bot de Umbrathel",
    desc: "Sitio estático en GitHub Pages con los Términos de Servicio y la Política de Privacidad requeridos para verificar el bot de Discord de Umbrathel.",
    cats: ["web", "umbrathel"], private: false, size: "sm",
    langs: { HTML: 9587 }, commits: 1, created: "2026-09-10", updated: "2026-09-10",
    stack: ["HTML", "GitHub Pages"], features: ["Términos de servicio", "Política de privacidad"],
    links: [{ label: "Ver sitio", url: "https://carontumrotumero.github.io/umbrathel-legal/", icon: "external-link" }, { label: "Repositorio", url: "https://github.com/carontumrotumero/umbrathel-legal", icon: "github" }]
  },
  {
    id: "slimefun", repo: "slimefun", title: "Slimefun Resource Pack", icon: "package", accent: "#84cc16",
    tagline: "Resource pack híbrido para Slimefun (ES/EN)",
    desc: "Resource pack de Minecraft para el plugin Slimefun con coincidencia por CustomModelData numérico, compatible con servidores en español e inglés.",
    cats: ["minecraft"], private: false, size: "sm",
    langs: {}, commits: 1, created: "2026-07-22", updated: "2026-07-22",
    stack: ["Minecraft resource pack", "CustomModelData"], features: ["Texturas por CMD numérico", "Compatible ES / EN"],
    links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/slimefun", icon: "github" }]
  },
  {
    id: "admin-dash", repo: "my", title: "Next.js Admin Dashboard", icon: "layout-dashboard", accent: "#71717a",
    tagline: "Base de dashboard con Next.js 15, Auth.js y shadcn/ui",
    desc: "Punto de partida para paneles de administración: Next.js App Router, Auth.js, Postgres con Drizzle ORM y componentes shadcn/ui.",
    cats: ["web", "plantilla"], private: true, size: "sm",
    langs: { TypeScript: 57937, CSS: 1874, JavaScript: 81 }, commits: 1, created: "2026-01-27", updated: "2026-01-27",
    stack: ["Next.js 15", "Auth.js", "Drizzle ORM", "shadcn/ui", "Tailwind"], features: ["Tabla de productos con búsqueda", "Login con GitHub OAuth"], links: []
  },
  {
    id: "express-vercel", repo: "express-js-on-vercel", title: "Express on Vercel", icon: "zap", accent: "#71717a",
    tagline: "Primer despliegue de Express serverless en Vercel",
    desc: "Ejemplo base de Express.js en Vercel sirviendo HTML, JSON y una ruta de API simulada. Fue el punto de partida del backend de los proyectos posteriores.",
    cats: ["backend", "plantilla"], private: true, size: "sm",
    langs: { TypeScript: 1315, HTML: 388, CSS: 131 }, commits: 1, created: "2026-01-27", updated: "2026-01-27",
    stack: ["Express", "TypeScript", "Vercel"], features: ["Rutas HTML, JSON y API"], links: []
  },
  {
    id: "paginas", repo: "paginas", title: "Landing de comunidad", icon: "users", accent: "#71717a",
    tagline: "Página estática para una comunidad de Discord",
    desc: "Landing de una sola página para dar la bienvenida a los miembros de un servidor de Discord.",
    cats: ["web"], private: false, size: "sm",
    langs: { HTML: 7798 }, commits: 1, created: "2026-04-14", updated: "2026-04-14",
    stack: ["HTML", "CSS"], features: ["Página de bienvenida"], links: [{ label: "Repositorio", url: "https://github.com/carontumrotumero/paginas", icon: "github" }]
  }
];

window.TIMELINE = [
  { date: "Ene 2026", title: "Primeros pasos con Next.js y Express", text: "Primeros despliegues en Vercel: un dashboard con Next.js 15 + shadcn/ui y un backend Express serverless.", ids: ["admin-dash", "express-vercel"] },
  { date: "Feb – Mar 2026", title: "Backends reales con Supabase", text: "Aethelgard (tienda de rangos) y Vanaco Working Force: login propio, roles, sesiones y esquemas SQL. 30 commits en una semana.", ids: ["aethelgard", "vanaco"] },
  { date: "Abr 2026", title: "React 19 + Tailwind v4", text: "Banco Estelar: el primer proyecto con TypeScript estricto, funciones RPC y Tailwind v4.", ids: ["banco-estelar"] },
  { date: "May – Jun 2026", title: "El ecosistema de Umbrathel", text: "Banco de Umbrathel con bot de Discord y Umbrathel Client, un launcher de Minecraft con 10 versiones publicadas.", ids: ["banco-umbrathel", "umbrathel-client"] },
  { date: "Jul – Ago 2026", title: "Un navegador propio y el salto a C++", text: "Nace Umbrathel Web sobre Chromium, llega el primer cliente real (Studios MV) y arranca Voxelix en C++17 / Qt6.", ids: ["umbrathel-web", "studiosmv", "voxelix"] },
  { date: "Sep 2026", title: "Producción y negocio", text: "NetherCore automatiza cobros y servidores, Voxelix publica builds para 3 sistemas, Umbrathel Web llega a la 0.10 y la clase usa su horario en tiempo real.", ids: ["nethercore", "voxelix", "umbrathel-web", "horario"] }
];

window.SERVICES = [
  { icon: "monitor-smartphone", title: "Creación de webs", text: "Landings, tiendas y paneles a medida, desplegados en Vercel o en tu hosting, con diseño responsive y animaciones cuidadas." },
  { icon: "server-cog", title: "Servidores de juego", text: "Nodos para Minecraft y otros juegos con aprovisionamiento automático, paneles Pterodactyl y facturación integrada." },
  { icon: "cloud", title: "VPS y hosting", text: "Servidores virtuales configurados y listos para producción: dominios, SSL, bases de datos y despliegues continuos." },
  { icon: "workflow", title: "Automatización con IA", text: "Flujos que conectan tus bases de datos, formularios y herramientas con IA para ahorrar horas de trabajo manual." }
];
