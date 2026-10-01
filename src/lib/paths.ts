/** Всички вътрешни адреси на едно място. */
export const paths = {
  home: '/',
  booking: '/zapazi-chas',
  articles: '/polezno',
  article: (slug: string) => `/polezno/${slug}`,
  privacy: '/poveritelnost',
  cookies: '/biskvitki',
  legal: '/pravna-informaciya',
} as const

export const sections = {
  about: 'za-men',
  help: 's-kakvo-moga-da-pomogna',
  services: 'konsultacii',
  process: 'kak-proticha',
  articles: 'polezno',
  faq: 'vaprosi',
  contact: 'kontakti',
} as const

/** Път към файл в /public с отчитане на base path (GitHub Pages). */
export const asset = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p)
