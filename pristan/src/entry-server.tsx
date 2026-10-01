import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { renderHead, SeoContext, type Seo } from './lib/seo'
import { articles } from './content/articles'
import { paths } from './lib/paths'

export const routes = [
  '/',
  paths.booking,
  paths.articles,
  ...articles.map((a) => paths.article(a.slug)),
  paths.privacy,
  paths.cookies,
  paths.legal,
]

export function render(url: string, basename: string) {
  const ctx: { current?: Seo } = {}
  const html = renderToString(
    <SeoContext.Provider value={ctx}>
      <StaticRouter location={basename.replace(/\/$/, '') + url} basename={basename.replace(/\/$/, '') || '/'}>
        <App />
      </StaticRouter>
    </SeoContext.Provider>,
  )
  return { html, head: ctx.current ? renderHead(ctx.current) : '' }
}

export { articles }
