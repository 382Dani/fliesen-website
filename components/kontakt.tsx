'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const contactItems = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Robert-Bosch-Straße 17\n72585 Riederich\nDeutschland',
    link: { href: 'https://maps.app.goo.gl/A8uaBTmzK4oabYGm7', label: 'Route planen' },
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '07123 – 96 96 996',
    link: { href: 'tel:+4971239696996', label: null },
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'info@flek-die-friseure.de',
    link: { href: 'mailto:info@flek-die-friseure.de', label: null },
  },
]

export default function Kontakt() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="kontakt" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">
            So finden Sie uns
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Kontakt & Anfahrt
          </h2>
          <div
            className="mt-5 h-0.5 bg-accent mx-auto transition-all duration-1000"
            style={{ width: inView ? '64px' : '0px', transitionDelay: '0.4s' }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info cards */}
          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, label, value, link }, i) => (
              <div
                key={label}
                className="group flex gap-5 bg-card border border-border rounded-sm p-6 hover:border-accent hover:shadow-md transition-all duration-300"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
              >
                <div className="flex-shrink-0 w-11 h-11 bg-secondary group-hover:bg-accent/20 rounded-sm flex items-center justify-center transition-colors duration-300">
                  <Icon size={20} className="text-primary group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{label}</h3>
                  {link.label ? (
                    <>
                      <p className="font-sans text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                        {value}
                      </p>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-primary text-sm font-sans hover:text-accent transition-colors duration-200"
                      >
                        {link.label}
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 text-primary text-sm font-sans hover:text-accent transition-colors duration-200"
                    >
                      {value}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Termin CTA */}
            <div
              className="bg-primary rounded-sm p-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-24px)',
                transition: `opacity 0.6s ease 0.46s, transform 0.6s ease 0.46s`,
              }}
            >
              <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-2">
                Termin vereinbaren
              </h3>
              <p className="font-sans text-primary-foreground/80 text-sm leading-relaxed mb-4">
                Rufen Sie uns an oder schreiben Sie uns eine E-Mail. Wir freuen uns auf Sie!
              </p>
              <Link
                href="/termin"
                className="inline-flex font-sans text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded-sm bg-background text-foreground border-2 border-background transition-colors duration-200 hover:bg-accent hover:border-accent hover:text-accent-foreground"
              >
                Termin buchen
              </Link>
            </div>
          </div>

          {/* Map */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            }}
          >
            <div className="group relative rounded-sm overflow-hidden border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/map-google.png"
                alt="Google Maps – Standort Flek die Friseure, Robert-Bosch-Straße 17, Riederich"
                className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                <span className="font-sans text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/70 px-4 py-2 rounded-sm">
                  Karte öffnen
                </span>
              </div>
              {/* Address label overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-foreground/70 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2">
                <MapPin size={14} className="text-accent flex-shrink-0" aria-hidden="true" />
                <span className="font-sans text-xs text-primary-foreground tracking-wide">
                  Robert-Bosch-Straße 17 · 72585 Riederich
                </span>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/A8uaBTmzK4oabYGm7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-primary text-primary-foreground px-6 py-3.5 font-sans text-sm uppercase tracking-wider hover:bg-accent transition-colors duration-300 rounded-sm"
            >
              <MapPin size={16} aria-hidden="true" />
              Auf Google Maps öffnen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
