import { Clock, Mail, MapPin, Phone, Video } from 'lucide-react'
import { site } from '../config/site'
import { sections } from '../lib/paths'
import { BookingCTA } from './BookingCTA'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function ContactSection() {
  const c = site.contact
  return (
    <Section
      id={sections.contact}
      eyebrow="Контакти"
      title="Свържи се с мен"
      intro={<p>Ако имаш въпрос преди да запазиш час, пиши или се обади. {c.responseNote}</p>}
    >
      <Reveal className="card p-7 md:p-10">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
          <ul className="space-y-6">
            <li className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-moss" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-sm text-ink-3">Телефон</p>
                <a href={`tel:${c.phoneHref}`} className="text-lg text-ink hover:text-accent">{c.phone}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-moss" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-sm text-ink-3">Имейл</p>
                <a href={`mailto:${c.email}`} className="text-lg text-ink hover:text-accent">{c.email}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-moss" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-sm text-ink-3">Присъствени срещи</p>
                <address className="text-lg not-italic text-ink">
                  {c.address ? `${c.address}, ${c.postalCode} ${c.city}` : `гр. ${c.city}`}
                </address>
                {!c.address && <p className="mt-1 text-sm text-ink-3">{c.addressNote}</p>}
              </div>
            </li>
            <li className="flex gap-4">
              <Video className="mt-1 h-5 w-5 shrink-0 text-moss" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-sm text-ink-3">Онлайн</p>
                <p className="text-lg text-ink">Консултации чрез защитена видеовръзка</p>
              </div>
            </li>
          </ul>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-moss" strokeWidth={1.5} aria-hidden="true" />
              <div className="w-full">
                <p className="text-sm text-ink-3">Работно време</p>
                <dl className="mt-1 space-y-1">
                  {c.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 text-ink">
                      <dt>{h.days}</dt>
                      <dd className="text-ink-2">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
            <li className="border-t border-line pt-7">
              <BookingCTA className="w-full sm:w-auto" />
              <p className="mt-4 text-sm leading-relaxed text-ink-3">
                Моля, не изпращай по имейл подробна информация за здравословното си състояние. Ще говорим за това на срещата.
              </p>
            </li>
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
