import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? ({ '--delay': `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  )
}
