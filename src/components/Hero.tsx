import type { CSSProperties } from 'react'
import { ArrowDown, MapPin, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { paths, sections } from '../lib/paths'
import { BookingCTA } from './BookingCTA'
import { PortraitArt } from './PortraitArt'

export function Hero() {
  const p = site.psychologist
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pb-28 lg:pt-20">
        <div>
          <div className="rise">
            <p className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{p.name}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span>{p.title}</span>
            </p>
          </div>
          <div className="rise" style={{ '--delay': '80ms' } as CSSProperties}>
            <h1 id="hero-title" className="text-[2.75rem] leading-[1.04] text-ink sm:text-[3.5rem] lg:text-[4.6rem]">
              Понякога е важно да имаш място, в което можеш да бъдеш <em className="italic text-accent">себе си</em>.
            </h1>
          </div>
          <div className="rise" style={{ '--delay': '160ms' } as CSSProperties}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
              Психологическо консултиране за възрастни и младежи — при конфликти във взаимоотношенията, стрес, трудни
              периоди, въпроси за кариерата и личностното развитие. Присъствено или онлайн.
            </p>
          </div>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ '--delay': '240ms' } as CSSProperties}>
            <BookingCTA size="lg" />
            <Link to={{ pathname: paths.home, hash: sections.about }} className="btn btn-ghost min-h-[3.5rem] px-7">
              Научи повече
              <ArrowDown className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
          <div className="rise" style={{ '--delay': '320ms' } as CSSProperties}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-ink-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-moss" strokeWidth={1.6} aria-hidden="true" /> Присъствени срещи
              </li>
              <li className="flex items-center gap-2">
                <Video className="h-4 w-4 text-moss" strokeWidth={1.6} aria-hidden="true" /> Онлайн консултации
              </li>
            </ul>
          </div>
        </div>
        <div className="rise mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none" style={{ '--delay': '200ms' } as CSSProperties}>
          <PortraitArt photo={site.heroImage.src} photoSmall={site.heroImage.srcSmall} alt={site.heroImage.alt} width={752} height={941} priority className="aspect-[4/5] w-full" />
        </div>
      </div>
    </section>
  )
}
