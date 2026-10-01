/**
 * Prerender: генерира статичен HTML за всяка страница (SEO + бързо първо изрисуване),
 * sitemap.xml, robots.txt и 404.html за GitHub Pages.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const base = process.env.BASE_PATH || '/'
const siteUrl = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, routes, articles } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const page = (url) => {
  const { html, head } = render(url, base)
  const route = base.replace(/\/$/, '') + (url === '/' ? '/' : url)
  return template
    .replace('<!--app-head-->', head)
    .replace('data-route=""', `data-route="${route}"`)
    .replace('<!--app-html-->', html)
}

for (const url of routes) {
  const out = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, page(url))
  console.log('prerendered', url)
}

// 404.html: показва страницата „не е намерена“. Непознат адрес остава 404 за търсачките.
fs.writeFileSync(path.join(dist, '404.html'), page('/__404'))

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const lastmod = Object.fromEntries(articles.map((a) => [`/polezno/${a.slug}`, a.date]))
const loc = (u) => siteUrl + (u === '/' ? '/' : u + '/')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${loc(u)}</loc><lastmod>${lastmod[u] || today}</lastmod></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

// Собствен домейн: задайте CUSTOM_DOMAIN в GitHub Actions (Variables)
if (process.env.CUSTOM_DOMAIN) fs.writeFileSync(path.join(dist, 'CNAME'), process.env.CUSTOM_DOMAIN + '\n')
fs.writeFileSync(path.join(dist, '.nojekyll'), '')
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('done:', routes.length, 'pages, sitemap, robots, 404')
