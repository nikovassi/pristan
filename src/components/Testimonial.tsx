/** Показвайте само реални отзиви с изрично разрешение за публикуване. */
export function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <figure className="card p-8">
      <blockquote className="font-serif text-[1.45rem] leading-snug text-ink">„{quote}“</blockquote>
      <figcaption className="mt-5 text-sm text-ink-3">— {author}</figcaption>
    </figure>
  )
}
