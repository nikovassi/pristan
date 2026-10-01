import type { ReactNode } from 'react'

/** Прост формат за статии: абзаци, "## " подзаглавия, "- " списъци, **удебелен**. */
const inline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  )

export function Markup({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/)
  return (
    <>
      {blocks.map((b, i) => {
        const block = b.trim()
        if (block.startsWith('### ')) return <h3 key={i}>{block.slice(4)}</h3>
        if (block.startsWith('## ')) return <h2 key={i}>{block.slice(3)}</h2>
        const lines = block.split('\n').map((l) => l.trim())
        if (lines.every((l) => l.startsWith('- ')))
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          )
        return <p key={i}>{inline(lines.join(' '))}</p>
      })}
    </>
  )
}
