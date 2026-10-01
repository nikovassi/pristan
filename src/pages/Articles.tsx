import { Link } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { Reveal } from '../components/Reveal'
import { sortedArticles } from '../content/articles'
import { paths } from '../lib/paths'
import { useSeo } from '../lib/seo'

export const articlesSeo = {
  title: 'Полезно',
  description: 'Кратки, спокойни текстове за стреса, границите, прегарянето, трудните емоции и това как протича психологическата консултация.',
  path: paths.articles,
}

export default function Articles() {
  useSeo(articlesSeo)
  return (
    <div className="container-page pb-24 pt-12 md:pt-20">
      <Reveal className="max-w-2xl">
        <nav aria-label="Път" className="mb-6 text-sm text-ink-3">
          <Link to={paths.home} className="hover:text-ink">Начало</Link> <span aria-hidden="true">/</span>{' '}
          <span aria-current="page">Полезно</span>
        </nav>
        <h1 className="text-[2.75rem] leading-[1.05] text-ink md:text-[4rem]">Полезно</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-2 md:text-xl">
          Няколко текста за спокойно четене. Те са информативни и не заместват индивидуална консултация.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sortedArticles().map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 70}>
            <ArticleCard article={a} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
