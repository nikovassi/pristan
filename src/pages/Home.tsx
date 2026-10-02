import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { BookingCTA } from '../components/BookingCTA'
import { ArticleCard } from '../components/ArticleCard'
import { ContactSection } from '../components/ContactSection'
import { FAQ } from '../components/FAQ'
import { Hero } from '../components/Hero'
import { PortraitArt } from '../components/PortraitArt'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { ServiceCard } from '../components/ServiceCard'
import { SpecialtyCard } from '../components/SpecialtyCard'
import { Testimonial } from '../components/Testimonial'
import { SITE_URL, site } from '../config/site'
import { sortedArticles } from '../content/articles'
import { faq, specialties, steps, testimonials, values } from '../content/home'
import { absUrl, useSeo } from '../lib/seo'
import { paths, sections } from '../lib/paths'

export const homeSeo = {
  title: site.brand.name,
  description: `Психологическо консултиране в ${site.contact.city} и онлайн — при конфликти във взаимоотношенията, стрес, трудни периоди, кариерно ориентиране и личностно развитие. Спокойно и поверително пространство. Запази час онлайн.`,
  path: '/',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': absUrl('/#practice'),
      name: `${site.brand.name} — ${site.brand.descriptor}`,
      description: site.brand.tagline,
      url: SITE_URL,
      telephone: site.contact.phone,
      email: site.contact.email,
      image: absUrl('/og-image.jpg'),
      logo: absUrl('/logo-512.png'),
      priceRange: '30 €',
      address: {
        '@type': 'PostalAddress',
        ...(site.contact.address ? { streetAddress: site.contact.address, postalCode: site.contact.postalCode } : {}),
        addressLocality: site.contact.city,
        addressCountry: 'BG',
      },
      areaServed: [{ '@type': 'City', name: site.contact.city }, { '@type': 'Country', name: 'България' }],
      availableLanguage: ['bg'],
      knowsAbout: ['психологическо консултиране', 'онлайн психологическа консултация', 'междуличностни конфликти', 'консултиране на тийнейджъри', 'кариерно ориентиране', 'мотивация', 'личностно развитие'],
      employee: { '@type': 'Person', name: site.psychologist.name, jobTitle: site.psychologist.title },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export default function Home() {
  useSeo(homeSeo)
  const p = site.psychologist
  const latest = sortedArticles().slice(0, 3)

  return (
    <>
      <Hero />

      {/* ЗА МЕН */}
      <Section id={sections.about} tone="soft">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:self-start">
            <PortraitArt photo={p.photo} alt={p.photoAlt} width={800} height={800} position="50% 35%" className="aspect-[4/5] w-full" />
            <p className="mt-5 text-center font-serif text-2xl text-ink">{p.name}</p>
            <p className="text-center text-sm text-ink-3">{p.title}</p>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-4">За мен</p>
              <h2 id="za-men-title" className="text-[2.25rem] text-ink md:text-[3.25rem]">
                Здравей. Радвам се, че си тук.
              </h2>
            </Reveal>
            <Reveal delay={80} className="mt-7 space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                Казвам се {p.name}. Пътят ми към консултирането започна от специалната педагогика — там научих колко
                важно е да видиш човека отвъд проблема и да търсиш силните му страни. По-късно завърших магистратура по
                консултативна психология.
              </p>
              <p>
                Пет години работих като мениджър „Човешки ресурси“. Всеки ден бях сред хора — в разговори за напрежение в
                екипа, за трудни решения, за мотивация и професионална посока. Този опит ми показа, че повечето конфликти
                се раждат там, където хората спират да се чуват, и че една добре проведена беседа може да промени много.
              </p>
              <p>
                Днес работя с възрастни и младежи, които искат да подредят отношенията си, да разберат себе си по-добре
                или да намерят посока. Разговаряме спокойно, без оценки и с твоето темпо — присъствено или онлайн.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 grid gap-3 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="font-serif text-xl text-ink">{v.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{v.text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={160} className="mt-12">
              <dl className="divide-y divide-line border-y border-line">
                <Row label="Подход">{p.approach}</Row>
                <Row label="Образование"><List items={p.education} /></Row>
                <Row label="Квалификации"><List items={p.certificates} /></Row>
                <Row label="Опит">{p.experience}</Row>
                <Row label="Интереси"><List items={p.interests} /></Row>
                <Row label="Езици">{p.languages.join(', ')}</Row>
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* С КАКВО МОГА ДА ПОМОГНА */}
      <Section
        id={sections.help}
        eyebrow="С какво мога да помогна"
        title="Теми, с които хората идват при мен"
        intro={
          <p>
            Това не са диагнози, а преживявания, при които разговорът със специалист често е полезен. Ако твоето го няма тук —
            пак е добре дошло.
          </p>
        }
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialties.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 4) * 60}>
              <SpecialtyCard {...s} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* КОНСУЛТАЦИИ И ЦЕНИ */}
      <Section
        id={sections.services}
        tone="soft"
        eyebrow="Консултации и цени"
        title="Ясно, без изненади"
        intro={<p>Срещите се провеждат присъствено в {site.contact.city} или онлайн. Цената е една и съща, без допълнителни такси.</p>}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {site.services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard service={s} action={<BookingCTA className={`w-full ${s.featured ? '' : 'btn-quiet'}`} />} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-col gap-x-10 gap-y-3 text-[0.97rem] text-ink-2 md:flex-row" as="ul">
          <li className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-moss" strokeWidth={2} aria-hidden="true" />Плащане: {site.payment.methods.join(', ')}</li>
          <li className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-moss" strokeWidth={2} aria-hidden="true" />{site.payment.cancellation}</li>
        </Reveal>
      </Section>

      {/* КАК ПРОТИЧА */}
      <Section id={sections.process} eyebrow="Как протича" title="Пет спокойни стъпки">
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="bg-surface p-7">
              <span className="font-serif text-[2.75rem] leading-none text-accent">{s.n}</span>
              <h3 className="mt-6 font-sans text-[1.02rem] font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-3">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg text-ink-2">
            Нямаш задължение да продължиш след първата среща. Решението е твое.
          </p>
          <BookingCTA />
        </Reveal>
      </Section>

      {/* ОТЗИВИ — показват се само ако има реални, разрешени отзиви */}
      {testimonials.length > 0 && (
        <Section eyebrow="Отзиви" title="Думи от хора, с които съм работил(а)" tone="soft">
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <Testimonial key={t.quote} {...t} />
            ))}
          </div>
        </Section>
      )}

      {/* ПОЛЕЗНО */}
      <Section id={sections.articles} tone="soft" eyebrow="Полезно" title="Няколко текста за спокойно четене">
        <div className="grid gap-5 md:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link to={paths.articles} className="btn btn-ghost">
            Всички статии <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section id={sections.faq} eyebrow="Въпроси" title="Често задавани въпроси">
        <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-2">Не намираш отговор? Пиши ми — ще отговоря лично.</p>
            <a href={`mailto:${site.contact.email}`} className="link mt-3 inline-block text-lg">{site.contact.email}</a>
          </Reveal>
          <Reveal delay={80}>
            <FAQ items={faq} />
          </Reveal>
        </div>
      </Section>

      <ClosingCTA />
      <ContactSection />
    </>
  )
}

function ClosingCTA() {
  return (
    <section aria-labelledby="closing-title" className="bg-bg-soft">
      <div className="container-page py-20 text-center md:py-28">
        <Reveal>
          <h2 id="closing-title" className="mx-auto max-w-3xl text-[2.4rem] text-ink md:text-[3.6rem]">
            Първата стъпка може да бъде съвсем малка.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-2">Избери удобен час — присъствено или онлайн.</p>
          <div className="mt-9 flex justify-center">
            <BookingCTA size="lg" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-ink-3">{label}</dt>
      <dd className="text-ink-2">{children}</dd>
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  )
}
