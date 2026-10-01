import { Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatPrice, type Service } from '../config/site'

export function ServiceCard({ service, action }: { service: Service; action?: ReactNode }) {
  return (
    <article
      className={`card card-hover flex h-full flex-col p-7 md:p-8 ${service.featured ? 'ring-1 ring-accent/30' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-[1.65rem] leading-tight text-ink">{service.name}</h3>
        {service.featured && (
          <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            Първа стъпка
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-2">{service.description}</p>
      <dl className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
        <div>
          <dt className="sr-only">Продължителност и формат</dt>
          <dd className="flex items-center gap-2 text-sm text-ink-3">
            <Clock className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            {service.duration} мин · {service.format}
          </dd>
        </div>
        <div className="text-right">
          <dt className="sr-only">Цена</dt>
          <dd className="whitespace-nowrap font-serif text-[1.9rem] leading-none text-ink">{formatPrice(service.price)}</dd>
        </div>
      </dl>
      {action && <div className="mt-6">{action}</div>}
    </article>
  )
}
