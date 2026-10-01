import { createContext, useContext, useEffect } from 'react'
import { SITE_URL, site } from '../config/site'

export type Seo = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  jsonLd?: object[]
  noindex?: boolean
}

/** При prerender страницата записва SEO данните тук. */
export const SeoContext = createContext<{ current?: Seo } | null>(null)

/** Абсолютен адрес. Страниците се публикуват като папки (…/polezno/), затова завършват с „/“. */
export const absUrl = (path: string) => {
  let p = path.startsWith('/') ? path : '/' + path
  const [pathname, hash = ''] = p.split('#')
  p = /\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith('/') ? pathname : pathname + '/'
  return SITE_URL.replace(/\/$/, '') + p + (hash ? '#' + hash : '')
}

export const fullTitle = (title: string) =>
  title === site.brand.name ? `${site.brand.name} — ${site.brand.descriptor}` : `${title} · ${site.brand.name}`

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

export function useSeo(seo: Seo) {
  const ctx = useContext(SeoContext)
  if (ctx && typeof window === 'undefined') ctx.current = seo

  useEffect(() => {
    document.title = fullTitle(seo.title)
    setMeta('name', 'description', seo.description)
    setMeta('property', 'og:title', fullTitle(seo.title))
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', absUrl(seo.path))
    setMeta('property', 'og:type', seo.type || 'website')
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow')
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = absUrl(seo.path)
  }, [seo.title, seo.description, seo.path, seo.type, seo.noindex])
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Генерира <head> HTML при prerender. */
export function renderHead(seo: Seo) {
  const url = absUrl(seo.path)
  const t = esc(fullTitle(seo.title))
  const d = esc(seo.description)
  const img = absUrl('/og-image.png')
  const ld = (seo.jsonLd || [])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')
  return `<title>${t}</title>
    <meta name="description" content="${d}" />
    <meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow'}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:locale" content="bg_BG" />
    <meta property="og:site_name" content="${esc(site.brand.name)}" />
    <meta property="og:type" content="${seo.type || 'website'}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    ${ld}`
}
