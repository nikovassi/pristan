import { Plus } from 'lucide-react'

/** Въпроси и отговори с нативни <details> — достъпни и без JavaScript. */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.08rem] font-medium text-ink marker:hidden md:py-6 [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
