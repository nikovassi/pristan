import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookingCTA } from './BookingCTA'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './navItems'
import { paths } from '../lib/paths'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent bg-bg'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link to={paths.home} className="rounded-lg" aria-label="Пристан — начална страница">
          <Logo />
        </Link>

        <nav aria-label="Основна навигация" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = !item.to.hash && pathname.startsWith(item.to.pathname)
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-[0.94rem] transition-colors hover:text-ink ${
                      active ? 'text-ink' : 'text-ink-2'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <BookingCTA className="hidden min-h-[2.75rem] px-5 text-[0.92rem] sm:inline-flex" />
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}
