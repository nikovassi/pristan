import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { isBookingConfigured, serviceBookingUrl, type Service } from '../config/site'
import { paths } from '../lib/paths'

/**
 * Вътрешен бутон „Запази час“ → страница /zapazi-chas,
 * където посетителят избира вид консултация.
 */
export function BookingCTA({
  label = 'Запази час',
  className = '',
  size = 'md',
  onClick,
  tabIndex,
}: {
  label?: string
  className?: string
  size?: 'md' | 'lg'
  onClick?: () => void
  tabIndex?: number
}) {
  return (
    <Link
      to={paths.booking}
      onClick={onClick}
      tabIndex={tabIndex}
      className={`btn btn-primary ${size === 'lg' ? 'min-h-[3.5rem] px-8 text-base' : ''} ${className}`}
    >
      {label}
      <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
    </Link>
  )
}

/**
 * Външен линк към booking системата за конкретна услуга.
 * Ако BOOKING_URL още не е настроен, води към контактите.
 */
export function ExternalBookingButton({
  service,
  label = 'Избери час',
  className = '',
  variant = 'primary',
}: {
  service?: Service
  label?: string
  className?: string
  variant?: 'primary' | 'ghost'
}) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`
  if (!isBookingConfigured()) {
    return (
      <a href="#zapisvane-po-telefon" className={cls}>
        {label}
        <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
      </a>
    )
  }
  return (
    <a
      href={serviceBookingUrl(service)}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      aria-label={`${label}${service ? ` — ${service.name}` : ''} (отваря се в нов прозорец)`}
    >
      {label}
      <ArrowUpRight className="btn-arrow h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
    </a>
  )
}
