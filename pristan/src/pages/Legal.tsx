import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import type { LegalDoc } from '../content/legal'
import { Markup } from '../lib/markup'
import { paths } from '../lib/paths'
import { useSeo } from '../lib/seo'

export const legalSeo = (doc: LegalDoc) => ({ title: doc.title, description: doc.description, path: '/' + doc.slug })

export default function Legal({ doc }: { doc: LegalDoc }) {
  useSeo(legalSeo(doc))
  return (
    <div className="container-page pb-24 pt-12 md:pt-20">
      <div className="mx-auto max-w-[44rem]">
        <Reveal>
          <nav aria-label="Път" className="mb-6 text-sm text-ink-3">
            <Link to={paths.home} className="hover:text-ink">Начало</Link> <span aria-hidden="true">/</span>{' '}
            <span aria-current="page">{doc.title}</span>
          </nav>
          <h1 className="text-[2.5rem] leading-[1.08] text-ink md:text-[3.25rem]">{doc.title}</h1>
          <p className="mt-6 rounded-xl border border-dashed border-line-strong bg-surface-2 p-4 text-sm leading-relaxed text-ink-3">
            Шаблон за преглед от специалист по защита на личните данни. Текстът не представлява правен съвет и сам по себе си
            не гарантира съответствие с ОРЗД (GDPR).
          </p>
        </Reveal>
        <Reveal delay={80} className="prose-calm mt-10">
          <Markup source={doc.body} />
        </Reveal>
      </div>
    </div>
  )
}
