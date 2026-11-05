import Lenis from 'lenis'

// Scroll suave + reveal por IntersectionObserver + parallax leve.
// Tudo desliga sozinho com prefers-reduced-motion.
export default defineNuxtPlugin((nuxtApp) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.documentElement.classList.add('js')

  let lenis: Lenis | null = null
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true })
    const raf = (t: number) => { lenis!.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
  }

  // clip-path 100% zera a área do elemento e o observer nunca dispara: observa o pai no lugar.
  const proxies = new Map<Element, Element>()
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const alvo = proxies.get(e.target) || e.target
          alvo.classList.add('is-in')
          io.unobserve(e.target)
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  )

  // parallax: data-speed="0.2" (positivo desce mais devagar)
  let parallaxEls: HTMLElement[] = []
  const vh = () => window.innerHeight
  const tick = () => {
    if (reduce) return
    const h = vh()
    for (const el of parallaxEls) {
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > h + 200) continue
      const speed = Number(el.dataset.speed || 0)
      const center = r.top + r.height / 2 - h / 2
      el.style.setProperty('--py', `${(-center * speed).toFixed(1)}px`)
    }
  }

  const scan = () => {
    document.querySelectorAll('[data-reveal]:not(.is-in), .split:not(.is-in)').forEach((el) => {
      const r = el.getAttribute('data-reveal')
      if ((r === 'clip' || r === 'clip-x') && el.parentElement) {
        proxies.set(el.parentElement, el)
        io.observe(el.parentElement)
      }
      else io.observe(el)
    })
    parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-speed]'))
    tick()
  }

  window.addEventListener('scroll', tick, { passive: true })
  window.addEventListener('resize', tick)

  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(scan)
    lenis?.scrollTo(0, { immediate: true })
  })
  nuxtApp.hook('app:mounted', () => requestAnimationFrame(scan))

  return {
    provide: {
      lenis,
      scrollTo: (target: string | number) => {
        if (lenis) lenis.scrollTo(target as any, { offset: -70, duration: 1.4 })
        else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      },
      rescan: scan,
    },
  }
})
