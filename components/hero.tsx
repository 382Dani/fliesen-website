'use client'

import { useEffect, useState, useRef } from 'react'

const images = [
  { src: '/hero-flek.jpg',   alt: 'Flek die Friseure – Team' },
  { src: '/hero-flek-2.jpg', alt: 'Flek die Friseure – Salon' },
  { src: '/hero-flek-3.jpg', alt: 'Flek die Friseure – Styling' },
  { src: '/hero-flek-4.jpg', alt: 'Flek die Friseure – Einblick' },
]

const INTERVAL = 5000


interface HeroProps {
  onOpenTermin?: () => void
}

export default function Hero({ onOpenTermin }: HeroProps) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // Tick the progress bar
  useEffect(() => {
    startTimeRef.current = Date.now()
    setProgress(0)

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      const p = Math.min((elapsed / INTERVAL) * 100, 100)
      setProgress(p)
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [current])

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [])

  const goTo = (i: number) => {
    setCurrent(i)
  }

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="sm:hidden pt-16">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '940/458' }}>
          {images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={940}
              height={458}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: i === current ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }}
            />
          ))}
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10">
            <div
              className="h-full bg-accent transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Bild ${i + 1}`}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: i === current ? '#C4956A' : 'rgba(255,255,255,0.5)' }}
              />
            ))}
          </div>
        </div>

        <div
          className="bg-foreground text-center px-6 py-10"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}
        >
          <p className="font-sans text-accent text-xs uppercase tracking-widest mb-3 font-light">
            Willkommen bei
          </p>
          <h1 className="font-serif text-3xl font-semibold text-white leading-tight text-balance mb-4">
            Flek die Friseure
          </h1>
          <div className="mx-auto mb-5 h-px bg-accent w-12" aria-hidden="true" />
          <p className="font-sans text-white/80 text-sm leading-relaxed text-pretty mb-7 font-light">
            Ihr Friseursalon in Riederich – für Schnitte, Farben und Styling, die zu Ihnen passen.
          </p>
          <div className="flex flex-col gap-3 mb-6">
            <button onClick={onOpenTermin} className="bg-primary text-primary-foreground px-6 py-3 font-sans text-sm uppercase tracking-wider hover:bg-accent transition-colors duration-300 cursor-pointer">
              Termin vereinbaren
            </button>
            <a href="#leistungen" className="border border-white/40 text-white px-6 py-3 font-sans text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-300">
              Unsere Leistungen
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP sm+ ── */}
      <div className="hidden sm:block pt-16">
        {/* Full-bleed slider with overlay text */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '940/458' }}>
          {images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={940}
              height={458}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'scale(1.03)' : 'scale(1.0)',
                transition: 'opacity 1s ease-in-out, transform 6s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />
          ))}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

          {/* Overlay text — bottom-left */}
          <div
            className="absolute bottom-0 left-0 right-0 px-10 pb-10 z-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s',
            }}
          >
            <div className="max-w-6xl mx-auto flex items-end justify-between gap-8">
              <div>
                <p className="font-sans text-accent text-xs uppercase tracking-widest mb-2">
                  Willkommen bei
                </p>
                <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white leading-tight text-balance mb-4">
                  Flek die Friseure
                </h1>
                <div className="flex gap-3">
                  <button
                    onClick={onOpenTermin}
                    className="bg-primary text-primary-foreground px-7 py-3 font-sans text-sm uppercase tracking-wider hover:bg-accent transition-colors duration-300 cursor-pointer"
                  >
                    Termin vereinbaren
                  </button>
                  <a
                    href="#leistungen"
                    className="border border-white/50 text-white px-7 py-3 font-sans text-sm uppercase tracking-wider hover:bg-white/15 transition-colors duration-300"
                  >
                    Leistungen
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
            <div
              className="h-full bg-accent transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slide counter + dots — top right */}
          <div className="absolute top-5 right-6 flex items-center gap-3 z-10">
            <span className="font-sans text-white/70 text-xs tracking-widest">
              {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Bild ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: i === current ? '#C4956A' : 'rgba(255,255,255,0.45)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>


        {/* Sub-bar with tagline + star rating */}
        <div
          className="bg-foreground px-10 py-5"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.8s' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 flex-wrap">
            <p className="font-sans text-white/80 text-sm leading-relaxed text-pretty font-light max-w-xl">
              Ihr Friseursalon in Riederich – für Schnitte, Farben und Styling, die zu Ihnen passen.
              Mit Leidenschaft und Sorgfalt, seit Jahren.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-sm px-4 py-2 flex-shrink-0">
              <div className="flex gap-0.5" aria-label="4,9 von 5 Sternen">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-3.5 h-3.5 text-accent fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-sans text-xs sm:text-sm">
                <strong>4,9</strong> – Sehr gut bewertet auf Google
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
