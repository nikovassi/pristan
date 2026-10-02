import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { paths } from '../lib/paths'
import { LogoMark } from './Logo'
import { navItems } from './navItems'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-bg-soft pb-28 pt-16 sm:pb-12">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="font-serif text-2xl text-ink">{site.brand.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-ink-3">{site.brand.tagline}. {site.brand.descriptor} в {site.contact.city} и онлайн.</p>
            <p className="mt-6 max-w-sm rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink-2">
              <strong className="font-semibold text-ink">При спешност:</strong> психологическата консултация не е спешна медицинска
              услуга. При непосредствен риск за живота или безопасността си потърси помощ на{' '}
              <a href="tel:112" className="link font-semibold">112</a>.
            </p>
          </div>
          <nav aria-label="Навигация в долната част">
            <p className="eyebrow mb-4">Сайт</p>
            <ul className="space-y-2.5">
              {navItems.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="text-ink-2 hover:text-ink">{i.label}</Link>
                </li>
              ))}
              <li><Link to={paths.booking} className="text-ink-2 hover:text-ink">Запази час</Link></li>
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-4">Информация</p>
            <ul className="space-y-2.5">
              <li><Link to={paths.privacy} className="text-ink-2 hover:text-ink">Поверителност</Link></li>
              <li><Link to={paths.cookies} className="text-ink-2 hover:text-ink">Бисквитки</Link></li>
              <li><Link to={paths.legal} className="text-ink-2 hover:text-ink">Правна информация</Link></li>
              <li><a href={`mailto:${site.contact.email}`} className="text-ink-2 hover:text-ink">{site.contact.email}</a></li>
              <li><a href={`tel:${site.contact.phoneHref}`} className="text-ink-2 hover:text-ink">{site.contact.phone}</a></li>
              {site.social.map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row sm:justify-between">
          <p>© {year} {site.brand.name} · {site.psychologist.name}</p>
          <p>{site.analytics.enabled ? 'Статистика за посещенията — само със съгласие.' : 'Сайтът не използва проследяващи бисквитки.'}</p>
        </div>
      </div>
    </footer>
  )
}
