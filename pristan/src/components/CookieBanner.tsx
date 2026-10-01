import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { paths } from '../lib/paths'

const KEY = 'analytics-consent'

/**
 * Показва се САМО ако site.analytics.enabled === true.
 * По подразбиране сайтът не използва проследяване и банер не е нужен.
 * Скриптът за статистика се зарежда едва след „Разреши“.
 */
export function CookieBanner() {
  const [choice, setChoice] = useState<'granted' | 'denied' | null | 'unknown'>('unknown')
  const enabled = site.analytics.enabled && !!site.analytics.scriptUrl

  useEffect(() => {
    if (!enabled) return
    try {
      setChoice((localStorage.getItem(KEY) as 'granted' | 'denied' | null) ?? null)
    } catch {
      setChoice(null)
    }
  }, [enabled])

  useEffect(() => {
    if (choice !== 'granted' || document.getElementById('analytics-script')) return
    const s = document.createElement('script')
    s.id = 'analytics-script'
    s.defer = true
    s.src = site.analytics.scriptUrl
    if (site.analytics.provider === 'plausible') s.dataset.domain = site.analytics.domain
    else s.dataset.websiteId = site.analytics.domain
    document.head.appendChild(s)
  }, [choice])

  const decide = (v: 'granted' | 'denied') => {
    try {
      localStorage.setItem(KEY, v)
    } catch {
      /* ignore */
    }
    setChoice(v)
  }

  if (!enabled || choice !== null) return null
  return (
    <div role="region" aria-label="Съгласие за статистика" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg sheet-in">
      <div className="card p-5 shadow-[var(--shadow)]">
        <p className="text-sm leading-relaxed text-ink-2">
          Бихме искали да използваме анонимна статистика за посещенията, за да подобряваме сайта. Не използваме реклами и
          проследяване между сайтове. <Link to={paths.cookies} className="link">Повече</Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" className="btn btn-ghost min-h-[2.5rem] flex-1 text-sm" onClick={() => decide('denied')}>
            Откажи
          </button>
          <button type="button" className="btn btn-ghost min-h-[2.5rem] flex-1 text-sm" onClick={() => decide('granted')}>
            Разреши
          </button>
        </div>
      </div>
    </div>
  )
}
