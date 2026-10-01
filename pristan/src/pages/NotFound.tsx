import { Link } from 'react-router-dom'
import { BookingCTA } from '../components/BookingCTA'
import { LogoMark } from '../components/Logo'
import { paths } from '../lib/paths'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo({ title: 'Страницата не е намерена', description: 'Тази страница не съществува.', path: '/404', noindex: true })
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="h-12 w-12 text-ink-3" />
      <p className="eyebrow mt-8">Грешка 404</p>
      <h1 className="mt-4 text-[2.5rem] text-ink md:text-[3.25rem]">Тази страница не съществува</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">Може би адресът е променен. Нека те върна на спокойно място.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link to={paths.home} className="btn btn-ghost">Към началната страница</Link>
        <BookingCTA />
      </div>
    </div>
  )
}
