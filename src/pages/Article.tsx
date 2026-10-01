import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ArticleCard, formatDate } from '../components/ArticleCard'
import { BookingCTA } from '../components/BookingCTA'
import { Reveal } from '../components/Reveal'
import { site } from '../config/site'
import { getArticle, sortedArticles, type Article as A } from '../content/articles'
import { Markup } from '../lib/markup'
import { paths } from '../lib/paths'
import { absUrl, useSeo } from '../lib/seo'
import NotFound from './NotFound'

export const articleSeo = (a: A) => ({
  title: a.title,
  description: a.description,
  path: paths.article(a.slug),
  type: 'article' as const,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      inLanguage: 'bg',
      mainEntityOfPage: absUrl(paths.article(a.slug)),
      author: { '@type': 'Person', name: site.psychologist.name },
      publisher: { '@type': 'Organization', name: site.brand.name },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Начало', item: absUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Полезно', item: absUrl(paths.articles) },
        { '@type': 'ListItem', position: 3, name: a.title, item: absUrl(paths.article(a.slug)) },
      ],
    },
  ],
})

export default function Article() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />
  return <ArticleView article={article} />
}

function ArticleView({ article }: { article: A }) {
  useSeo(articleSeo(article))
  const more = sortedArticles().filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <>
      <article className="container-page pb-20 pt-12 md:pt-20">
        <div className="mx-auto max-w-[44rem]">
          <Reveal>
            <Link to={paths.articles} className="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" /> Полезно
            </Link>
            <h1 className="mt-8 text-[2.5rem] leading-[1.08] text-ink md:text-[3.5rem]">{article.title}</h1>
            <p className="mt-6 text-sm text-ink-3">
              <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.minutes} мин четене · {site.psychologist.name}
            </p>
          </Reveal>
          <Reveal delay={80} className="prose-calm mt-10 border-t border-line pt-10">
            <p className="text-xl leading-relaxed text-ink">{article.description}</p>
            <Markup source={article.body} />
          </Reveal>
          <aside className="mt-14 rounded-[1.25rem] border border-line bg-surface p-7 md:p-9" aria-label="Запазване на час">
            <p className="font-serif text-[1.75rem] leading-tight text-ink">Ако искаш да поговорим за това</p>
            <p className="mt-2 text-ink-2">Първата среща е запознанство, без задължение да продължиш.</p>
            <BookingCTA className="mt-6" />
          </aside>
          <p className="mt-8 text-sm leading-relaxed text-ink-3">
            Текстът е с информативна цел и не заменя индивидуална консултация, диагноза или лечение. При спешност — <a href="tel:112" className="link">112</a>.
          </p>
        </div>
      </article>
      {more.length > 0 && (
        <section aria-labelledby="more-title" className="border-t border-line bg-bg-soft py-20">
          <div className="container-page">
            <h2 id="more-title" className="text-[2rem] text-ink">Още за четене</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {more.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
