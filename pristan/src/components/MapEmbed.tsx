import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { site } from '../config/site'
import { paths } from '../lib/paths'
import { Link } from 'react-router-dom'

/**
 * Google Maps се зарежда САМО след изрично действие от посетителя,
 * защото вграждането изпраща данни (IP адрес, бисквитки) към Google.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  if (loaded) {
    return (
      <iframe
        title={`Карта: ${site.contact.address}, ${site.contact.city}`}
        src={site.contact.mapsEmbedUrl}
        className="h-full min-h-[18rem] w-full rounded-[1.25rem] border border-line"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }
  return (
    <div className="flex h-full min-h-[18rem] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-line-strong bg-surface-2 p-8 text-center">
      <MapPin className="h-6 w-6 text-moss" strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-3">
        Картата се предоставя от Google и при зареждане може да постави бисквитки.{' '}
        <Link to={paths.cookies} className="link">Повече</Link>
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button type="button" className="btn btn-ghost min-h-[2.75rem] text-sm" onClick={() => setLoaded(true)}>
          Покажи картата
        </button>
        <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-[2.75rem] text-sm">
          Отвори в Google Maps
        </a>
      </div>
    </div>
  )
}
