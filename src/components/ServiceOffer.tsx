import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatPrice, site, type Service } from '../config/site'

/** Една ясна услуга: какво включва, цена и действие. */
export function ServiceOffer({ service, action }: { service: Service; action: ReactNode }) {
  return (
    <article className="card overflow-hidden md:grid md:grid-cols-[1.5fr_1fr]">
      <div className="p-7 md:p-10">
        <h3 className="font-serif text-[2rem] leading-tight text-ink md:text-[2.4rem]">{service.name}</h3>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-2">{service.description}</p>
        <ul className="mt-7 space-y-3 text-ink-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-moss" strokeWidth={2} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center border-t border-line bg-surface-2 p-7 md:border-l md:border-t-0 md:p-10">
        <p className="text-sm text-ink-3">Цена на една среща</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="whitespace-nowrap font-serif text-[3.5rem] leading-none text-ink">{formatPrice(service.price)}</span>
          <span className="text-ink-3">/ {service.duration} мин</span>
        </p>
        <div className="mt-7">{action}</div>
        <p className="mt-5 text-sm leading-relaxed text-ink-3">
          Плащане: {site.payment.methods.join(', ')}. {site.payment.cancellation}
        </p>
      </div>
    </article>
  )
}
