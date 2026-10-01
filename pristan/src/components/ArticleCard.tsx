import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../content/articles'
import { paths } from '../lib/paths'

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' })

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col p-7">
      <p className="text-sm text-ink-3">
        <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.minutes} мин четене
      </p>
      <h3 className="mt-3 font-serif text-[1.55rem] leading-snug text-ink">
        <Link to={paths.article(article.slug)} className="after:absolute after:inset-0 after:rounded-[1.25rem]">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-ink-3">{article.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent" aria-hidden="true">
        Прочети
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
      </span>
    </article>
  )
}
