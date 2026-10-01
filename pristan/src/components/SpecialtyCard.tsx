export function SpecialtyCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="card card-hover h-full p-6 md:p-7">
      <h3 className="font-serif text-[1.45rem] leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-3">{text}</p>
    </article>
  )
}
