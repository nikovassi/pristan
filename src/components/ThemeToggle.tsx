import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const read = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => setTheme(read()), [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#1a1714' : '#fcf8f2')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* настройката просто няма да бъде запомнена */
    }
    window.setTimeout(() => root.classList.remove('theme-transition'), 450)
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Включи светла тема' : 'Включи тъмна тема'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface hover:text-ink ${className}`}
    >
      {theme === 'dark' ? <Sun className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} /> : <Moon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />}
    </button>
  )
}
