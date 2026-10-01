import { useEffect, useRef } from 'react'

/** Добавя .is-visible, когато елементът влезе в екрана. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return
    // Вече видими елементи не се анимират.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    el.classList.add('reveal-pending')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove('reveal-pending')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
