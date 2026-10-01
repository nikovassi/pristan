import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = 'default',
  className = '',
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  tone?: 'default' | 'soft'
  className?: string
}) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`py-20 md:py-28 ${tone === 'soft' ? 'bg-bg-soft' : ''} ${className}`}
    >
      <div className="container-page">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-2xl md:mb-16">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="text-[2.25rem] text-ink md:text-[3.25rem]">
                {title}
              </h2>
            )}
            {intro && <div className="mt-5 text-lg text-ink-2">{intro}</div>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
