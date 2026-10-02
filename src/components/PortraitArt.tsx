import { asset } from '../lib/paths'

/**
 * Снимката на психолога в арка.
 * Докато в site.ts няма зададена снимка, се показва неутрална
 * илюстрация (светлина от прозорец и клонка) — ясно обозначена като placeholder.
 */
export function PortraitArt({
  photo,
  photoSmall,
  alt,
  className = '',
  priority = false,
  label = true,
  width = 800,
  height = 1000,
  position = 'center',
}: {
  photo: string | null
  photoSmall?: string
  alt: string
  className?: string
  priority?: boolean
  label?: boolean
  width?: number
  height?: number
  position?: string
}) {
  if (photo) {
    return (
      <div className={`arch relative bg-bg-soft ${className}`}>
        <img
          src={asset(photo)}
          srcSet={photoSmall ? `${asset(photoSmall)} ${Math.round(width / 2)}w, ${asset(photo)} ${width}w` : undefined}
          sizes={photoSmall ? '(min-width: 1024px) 34vw, 90vw' : undefined}
          alt={alt}
          width={width}
          height={height}
          style={{ objectPosition: position }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }
  return (
    <figure className={`arch relative ${className}`}>
      <svg viewBox="0 0 400 520" className="h-full w-full" role="img" aria-label="Илюстрация: светлина от прозорец и клонка във ваза. Място за портрет на психолога.">
        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--art-4)" />
            <stop offset="1" stopColor="var(--art-1)" />
          </linearGradient>
        </defs>
        <rect width="400" height="520" fill="url(#wall)" />
        <g filter="url(#soft)" opacity="0.85">
          <path d="M210 40 L360 40 L300 330 L150 330 Z" fill="var(--art-4)" />
        </g>
        <g className="breathe">
          <circle cx="132" cy="168" r="54" fill="var(--art-2)" opacity="0.55" />
        </g>
        <rect x="0" y="392" width="400" height="128" fill="var(--art-2)" opacity="0.7" />
        <rect x="0" y="392" width="400" height="1.5" fill="var(--art-3)" opacity="0.5" />
        <path d="M232 392 C222 370 222 344 236 330 L268 330 C282 344 282 370 272 392 Z" fill="var(--art-3)" />
        <g fill="none" stroke="var(--ink-3)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M252 330 C250 280 238 236 214 196 C200 172 196 150 202 128" />
          <path d="M243 270 C262 252 286 246 300 226" />
          <path d="M226 214 C210 206 196 190 190 172" />
        </g>
        <g fill="var(--moss)" opacity="0.75">
          <ellipse cx="300" cy="224" rx="13" ry="5" transform="rotate(-38 300 224)" />
          <ellipse cx="276" cy="246" rx="11" ry="4.5" transform="rotate(-20 276 246)" />
          <ellipse cx="190" cy="170" rx="12" ry="4.5" transform="rotate(62 190 170)" />
          <ellipse cx="203" cy="126" rx="11" ry="4" transform="rotate(-70 203 126)" />
          <ellipse cx="212" cy="152" rx="10" ry="4" transform="rotate(40 212 152)" />
          <ellipse cx="228" cy="232" rx="10" ry="4" transform="rotate(-50 228 232)" />
        </g>
      </svg>
      {label && (
        <figcaption className="absolute inset-x-0 bottom-4 mx-auto w-max max-w-[85%] rounded-full bg-surface/85 px-3 py-1 text-center text-[0.72rem] text-ink-3 backdrop-blur">
          Място за ваш портрет
        </figcaption>
      )}
    </figure>
  )
}
