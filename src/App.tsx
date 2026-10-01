import { useEffect, useRef, useState } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { StickyMobileCTA } from './components/MobileNavigation'
import { Navbar } from './components/Navbar'
import { cookies, legal, privacy } from './content/legal'
import Article from './pages/Article'
import Articles from './pages/Articles'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import { paths } from './lib/paths'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    const isFirst = first.current
    first.current = false
    if (hash) {
      // изчакваме рендера на новата страница
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ block: 'start' })
      })
      return
    }
    if (!isFirst) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  // Преместване на фокуса към съдържанието при смяна на страница (за екранни четци)
  useEffect(() => {
    if (first.current) return
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  // Плавен преход само при навигация, не при първото зареждане.
  const [animate, setAnimate] = useState(false)
  const firstPath = useRef(pathname)
  useEffect(() => {
    if (pathname !== firstPath.current) setAnimate(true)
  }, [pathname])
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-5 focus:py-3 focus:text-ink focus:shadow"
      >
        Към съдържанието
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} key={pathname} className={`${animate ? 'page-enter' : ''} outline-none`}>
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCTA />
      <CookieBanner />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={paths.booking} element={<Booking />} />
        <Route path={paths.articles} element={<Articles />} />
        <Route path={`${paths.articles}/:slug`} element={<Article />} />
        <Route path={paths.privacy} element={<Legal doc={privacy} />} />
        <Route path={paths.cookies} element={<Legal doc={cookies} />} />
        <Route path={paths.legal} element={<Legal doc={legal} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
