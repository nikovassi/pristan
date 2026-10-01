import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BOOKING_PROVIDER, serviceBookingUrl, type Service } from '../config/site'

/**
 * Календарът на Cal.com, вграден в страницата.
 * Зарежда се едва след като посетителят избере консултация (изрично действие),
 * затова преди това към Cal.com не се изпращат заявки.
 */
export function BookingEmbed({ service, onClose }: { service: Service; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const theme = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  const url = serviceBookingUrl(service)
  const sep = url.includes('?') ? '&' : '?'
  const src = `${url}${sep}embed=true&layout=month_view&theme=${theme}`

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    ref.current?.focus({ preventScroll: true })
  }, [service.id])

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="sheet-in mt-10 scroll-mt-24 overflow-hidden rounded-[1.25rem] border border-line bg-surface outline-none"
      aria-label={`Календар: ${service.name}`}
      role="region"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
        <div>
          <p className="text-sm text-ink-3">Стъпка 2 · Дата и час</p>
          <p className="font-serif text-2xl text-ink">{service.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-[2.5rem] px-4 text-sm">
            Нов прозорец <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:bg-surface-2 hover:text-ink"
            aria-label="Затвори календара"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
      <div className="relative min-h-[40rem]">
        {!loaded && (
          <p className="absolute inset-0 flex items-center justify-center text-ink-3" aria-live="polite">
            Зареждане на свободните часове…
          </p>
        )}
        <iframe
          key={src}
          title={`Свободни часове — ${service.name}`}
          src={src}
          onLoad={() => setLoaded(true)}
          className={`relative h-[44rem] w-full transition-opacity duration-500 md:h-[46rem] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          allow="payment"
        />
      </div>
      <p className="border-t border-line px-5 py-4 text-sm text-ink-3 md:px-7">
        Календарът се предоставя от {BOOKING_PROVIDER.name}. Моля, не въвеждайте чувствителна медицинска информация в полето за
        съобщение.
      </p>
    </div>
  )
}
