'use client'

import { useEffect, useRef, useState } from 'react'

const salonImages = [
  { src: '/salon/salon1.jpg', alt: 'Salon Flek – Stylingplätze' },
  { src: '/salon/salon2.jpg', alt: 'Salon Flek – Eingangsbereich' },
  { src: '/salon/salon3.jpg', alt: 'Salon Flek – Waschbereich' },
]

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView(0.3)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function UeberUns() {
  const { ref: sectionRef, inView } = useInView(0.1)

  return (
    <section id="ueber-uns" className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Gallery grid */}
          <div
            className="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              {salonImages.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-sm ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                    transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Text */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            }}
          >
            <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">
              Über uns
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground text-balance mb-6">
              Haare mit Herz und Handwerk
            </h2>
            <div
              className="h-0.5 bg-accent mb-8 transition-all duration-1000"
              style={{ width: inView ? '64px' : '0px', transitionDelay: '0.5s' }}
            />
            <p className="font-sans text-muted-foreground leading-relaxed mb-5 text-pretty">
              Bei <strong className="text-foreground font-semibold">Flek die Friseure</strong> in Riederich
              steht Ihr Wohlbefinden im Mittelpunkt. Wir glauben, dass ein guter Haarschnitt mehr ist
              als Technik – er ist Ausdruck Ihrer Persönlichkeit.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed mb-5 text-pretty">
              In unserem Salon erwartet Sie eine entspannte Atmosphäre, ehrliche Beratung und
              handwerkliche Sorgfalt auf höchstem Niveau. Wir nehmen uns Zeit für Sie und Ihre
              Wünsche – denn gute Arbeit braucht Ruhe und Aufmerksamkeit.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed mb-8 text-pretty">
              Mit einer Bewertung von <strong className="text-foreground">4,9 Sternen auf Google</strong> sind
              wir stolz auf das Vertrauen unserer Kundinnen und Kunden, das wir täglich aufs Neue
              verdienen möchten.
            </p>

            {/* Stats with animated counters */}
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">
                  4,9<span className="text-accent text-xl">★</span>
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-1">Google Bewertung</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">
                  <AnimatedCounter target={100} suffix="%" />
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-1">Leidenschaft</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">
                  <AnimatedCounter target={6} suffix="+" />
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-1">Stylisten im Team</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-secondary border border-border px-3 py-1.5 rounded-sm text-foreground">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Barrierefrei
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-secondary border border-border px-3 py-1.5 rounded-sm text-foreground">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Parkplätze vorhanden
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-secondary border border-border px-3 py-1.5 rounded-sm text-foreground">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Premium-Produkte
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
