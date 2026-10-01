import { site } from '../config/site'

/** Знакът: арка (праг, пристан) над тиха водна линия. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path d="M9 24V15a7 7 0 0 1 14 0v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 24.5h24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 28h12" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-8 w-8 text-ink" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.6rem] tracking-tight text-ink">{site.brand.name}</span>
        <span className="mt-1 hidden whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-3 sm:block">
          {site.brand.descriptor}
        </span>
      </span>
    </span>
  )
}
