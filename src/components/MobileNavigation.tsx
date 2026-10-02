import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { BookingCTA } from './BookingCTA'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './navItems'
import { paths } from '../lib/paths'

export function MobileNavigation() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  // Затваряне при навигация
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab' && panel) {
        const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface lg:hidden"
        aria-label="Отвори менюто"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" strokeWidth={1.6} />
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            className="sheet-in fixed inset-0 z-50 flex flex-col bg-bg lg:hidden"
          >
            <div className="container-page flex h-[4.5rem] items-center justify-between">
              <Link to={paths.home} onClick={() => setOpen(false)} aria-label="Начална страница">
                <Logo />
              </Link>
              <div className="flex items-center gap-1.5">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface"
                  aria-label="Затвори менюто"
                >
                  <X className="h-5 w-5" strokeWidth={1.6} />
                </button>
              </div>
            </div>
            <nav aria-label="Мобилна навигация" className="container-page flex-1 overflow-y-auto pt-6">
              <ul className="divide-y divide-line border-y border-line">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="block py-4 font-serif text-[1.9rem] leading-tight text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-1 text-ink-2">
                <a className="block py-1" href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
                <a className="block py-1" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </div>
            </nav>
            <div className="container-page pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <BookingCTA className="w-full" size="lg" />
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

/** Деликатен sticky бутон за телефон — появява се след първия екран. */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()
  const hidden = pathname.startsWith(paths.booking)

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 160
      setVisible(window.scrollY > window.innerHeight * 0.7 && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (hidden) return null
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-500 sm:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-surface/95 py-1.5 pl-5 pr-1.5 shadow-[var(--shadow)] backdrop-blur">
        <span className="whitespace-nowrap text-sm text-ink-2">{site.services[0].price} {site.currency} · {site.services[0].duration} мин</span>
        <BookingCTA className="min-h-[2.75rem] px-5 text-sm" tabIndex={visible ? undefined : -1} />
      </div>
    </div>
  )
}
