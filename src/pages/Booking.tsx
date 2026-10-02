import { CalendarCheck, Mail, Phone, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BookingEmbed } from '../components/BookingEmbed'
import { ExternalBookingButton } from '../components/BookingCTA'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { BOOKING_PROVIDER, isBookingConfigured, site, type Service } from '../config/site'
import { paths } from '../lib/paths'
import { useSeo } from '../lib/seo'

export const bookingSeo = {
  title: 'Запази час',
  description: `Запази час за психологическа консултация онлайн или присъствено в ${site.contact.city}. Избери вид консултация, ден и час — получаваш потвърждение по имейл.`,
  path: paths.booking,
}

export default function Booking() {
  useSeo(bookingSeo)
  const configured = isBookingConfigured()
  const c = site.contact
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <div className="container-page pb-24 pt-12 md:pt-20">
      <Reveal className="max-w-2xl">
        <nav aria-label="Път" className="mb-6 text-sm text-ink-3">
          <Link to={paths.home} className="hover:text-ink">Начало</Link> <span aria-hidden="true">/</span>{' '}
          <span aria-current="page">Запази час</span>
        </nav>
        <h1 className="text-[2.75rem] leading-[1.05] text-ink md:text-[4rem]">Запази час</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-2 md:text-xl">
          Избери вид консултация. След това ще видиш свободните дни и часове и ще въведеш само име, имейл и телефон.
        </p>
      </Reveal>

      <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-3" aria-label="Стъпки при записване">
        {['Вид консултация', 'Дата и час', 'Твоите данни', 'Потвърждение по имейл'].map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${i === 0 ? 'bg-accent text-accent-ink' : 'border border-line-strong text-ink-3'}`}>
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <h2 className="sr-only">Видове консултации</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {site.services.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <ServiceCard
              service={s}
              action={
                configured ? (
                  <button
                    type="button"
                    onClick={() => setSelected(s)}
                    aria-pressed={selected?.id === s.id}
                    className={`btn w-full ${s.featured || selected?.id === s.id ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {selected?.id === s.id ? 'Избрано' : 'Избери час'}
                    <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </button>
                ) : (
                  <ExternalBookingButton service={s} label="Избери час" variant={s.featured ? 'primary' : 'ghost'} className="w-full" />
                )
              }
            />
          </Reveal>
        ))}
      </div>

      {configured && selected && <BookingEmbed service={selected} onClose={() => setSelected(null)} />}

      {!configured && (
        <div id="zapisvane-po-telefon" className="mt-10 scroll-mt-28 rounded-[1.25rem] border border-accent/30 bg-accent-soft p-6 md:p-8" role="note">
          <p className="font-serif text-2xl text-ink">Онлайн календарът се подготвя</p>
          <p className="mt-2 max-w-2xl text-ink-2">
            Докато бъде активиран, можеш да запазиш час по телефон или имейл — ще ти предложа свободни часове.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${c.phoneHref}`} className="btn btn-primary"><Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />{c.phone}</a>
            <a href={`mailto:${c.email}?subject=${encodeURIComponent('Запазване на час')}`} className="btn btn-ghost"><Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />{c.email}</a>
          </div>
        </div>
      )}

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <Reveal className="card p-7 md:p-8">
          <CalendarCheck className="h-6 w-6 text-moss" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl text-ink">След записването</h2>
          <ul className="mt-4 space-y-2.5 text-ink-2">
            <li>Получаваш потвърждение по имейл с дата, час и адрес или линк за онлайн среща.</li>
            <li>Ден преди срещата идва кратко напомняне.</li>
            <li>От имейла можеш сам да пренасрочиш или отмениш часа. {site.payment.cancellation}</li>
          </ul>
        </Reveal>
        <Reveal delay={80} className="card p-7 md:p-8">
          <ShieldCheck className="h-6 w-6 text-moss" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl text-ink">Поверителност</h2>
          <p className="mt-4 text-ink-2">
            Записването се извършва в защитена външна система ({BOOKING_PROVIDER.name}), с данни, съхранявани в {BOOKING_PROVIDER.dataLocation}. Искаме само
            име, имейл и телефон.
          </p>
          <p className="mt-3 rounded-xl bg-surface-2 p-4 text-[0.95rem] text-ink-2">
            <strong className="font-semibold text-ink">Моля, не въвеждайте чувствителна медицинска информация в полето за
            съобщение.</strong> Ще говорим за това, което те води, лично на срещата.
          </p>
          <Link to={paths.privacy} className="link mt-4 inline-block text-sm">Политика за поверителност</Link>
        </Reveal>
      </div>

      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-3">
        Психологическата консултация не е спешна медицинска услуга. При непосредствен риск за живота или безопасността си
        потърси спешна помощ на <a href="tel:112" className="link">112</a> или най-близкото спешно отделение.
      </p>
    </div>
  )
}
