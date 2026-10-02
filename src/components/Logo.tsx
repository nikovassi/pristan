import { site } from '../config/site'

/** Знакът на „Пристан“: две кавички в бордо квадрат — разговорът, който започва. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="#7b2d3b" />
      <path
        fill="#ffffff"
        d="M13.6 11.2a4.6 4.6 0 0 0-4.6 4.6c0 4.4 1.6 8 4.3 11.1l1 .2c-1.2-2.5-1.6-4.6-1.4-6.6a4.6 4.6 0 0 0 .7-9.3z"
      />
      <path
        fill="#f2c4c4"
        d="M26.4 11.2a4.6 4.6 0 0 1 4.6 4.6c0 4.4-1.6 8-4.3 11.1l-1 .2c1.2-2.5 1.6-4.6 1.4-6.6a4.6 4.6 0 0 1-.7-9.3z"
      />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.6rem] tracking-tight text-ink">{site.brand.name}</span>
        <span className="mt-1 hidden whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-3 sm:block">
          {site.brand.descriptor}
        </span>
      </span>
    </span>
  )
}
