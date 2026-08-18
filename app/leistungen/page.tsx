'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Scissors, Palette, Sparkles, Leaf, UserCheck, Gift, Star, FlameKindling, ArrowRight, Waves } from 'lucide-react'

const leistungen = [
  { nr: '01', icon: Sparkles, titel: 'Individuelle Beratung', kurz: 'Ihr Look beginnt mit dem richtigen Gespräch.', text: 'Das Ziel vor Augen ist es, Ihnen einen individuellen Look zu kreieren, passend zu Ihrem persönlichen Stil, basierend auf der individuellen Struktur Ihres Haares und Ihres Typs. Die eingehende Beratung ist die Grundlage für Ihre Top-Frisur – wir arbeiten nicht unter Zeitdruck.', badge: null, dark: false },
  { nr: '02', icon: UserCheck, titel: 'Exklusiv für den Herren', kurz: 'Klassisch, modisch oder extravagant.', text: 'Ob zeitlos klassisch, modisch oder extravagant – unser Team findet immer den ganz persönlichen Herrenlook. Mit den ausgewiesenen Kenntnissen über die Farbbedürfnisse des Mannes sorgen unsere Farbexperten für eine anhaltend natürliche Erscheinung.', badge: null, dark: true },
  { nr: '03', icon: FlameKindling, titel: 'Permanente Haarglättung', kurz: 'Dauerhaft glattes, seidig glänzendes Haar.', text: 'Eine friseurexklusive Re-Organisation der inneren Haarstruktur mit Hilfe thermischer Einwirkung von BERRYWELL. Schonende Formulierungen mit hochwertigen Ölen und ausgesuchten Proteinen – für dauerhaft glattes, seidig glänzendes Haar.', badge: 'Besondere Leistung', dark: false },
  { nr: '04', icon: Scissors, titel: 'Heiße Schere (Carecut)', kurz: 'Revolutionär. Versiegelt. Nahezu splissfrei.', text: 'Ein einzigartiger Haarschnitt mit elektrisch erwärmter Schere. Die Spitzen werden beim Schneiden mit haareigenem Kreatin versiegelt – kräftiger, nahezu frei von Spliss, Sprödigkeit und Haarbruch.', badge: 'Einzigartig', dark: true },
  { nr: '05', icon: Star, titel: 'Traumfrisuren', kurz: 'Ihre Vision. Unsere Handwerkskunst.', text: 'Sie suchen eine Traumfrisur? Bringen Sie Ihre visuelle Vorstellung mit – wir sprechen eingehend darüber und setzen Ihren Wunsch-Look gekonnt in die Realität um. Für Hochzeiten, Events und besondere Anlässe.', badge: null, dark: false },
  { nr: '06', icon: Waves, titel: 'Haarpflege-Treatments', kurz: 'Intensive Behandlungen für gesundes Haar.', text: 'Intensive Pflegebehandlungen stärken die Haarstruktur, spenden Feuchtigkeit und sorgen für gesunden Glanz. Abgestimmt auf Ihre individuellen Haarbedürfnisse – für Haar das von innen strahlt.', badge: null, dark: true },
  { nr: '07', icon: Palette, titel: 'Dekorative Kosmetik', kurz: 'Typgerechtes Make-up für Ihr Gesicht.', text: 'Neue Inspirationen für das tägliche Make-up oder eine besondere Produktempfehlung – unsere Expertinnen helfen bei typgerechtem Make-up, Handpflege, Nagelpflege und Augenbrauen-Styling und -färben.', badge: null, dark: false },
  { nr: '08', icon: Leaf, titel: 'Pflegende Kosmetik', kurz: 'Malu Wilz – Natur trifft Wirksamkeit.', text: 'Erleben Sie eine außergewöhnlich sanfte Behandlung von Gesicht, Hals, Dekolleté und Händen. Die hochwertigen Pflegeprodukte von Malu Wilz mit natürlichen Vitaminen und Mineralien wirken langanhaltend und intensiv.', badge: 'Malu Wilz', dark: true },
  { nr: '09', icon: Gift, titel: 'Geschenkgutschein', kurz: 'Für SIE und IHN – die Geschenkidee die immer passt.', text: 'Verschenken Sie pflegendes Lebensgefühl und wohltuende Entspannung. Unsere Gutscheine sind für alle Leistungen einlösbar und in jedem Wunschbetrag erhältlich – einfach im Salon abholen.', badge: 'Geschenkidee', dark: false },
]

function LeistungRow({ l, index }: { l: typeof leistungen[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const Icon = l.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={l.dark ? 'bg-foreground' : 'bg-background'}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: `opacity 0.6s ease ${index * 0.04}s, transform 0.6s ease ${index * 0.04}s` }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20 flex flex-col md:flex-row gap-10 md:gap-16 items-start">

        {/* Left col */}
        <div className="flex md:flex-col items-center md:items-start gap-5 md:gap-4 flex-shrink-0 md:w-40">
          <span
            aria-hidden="true"
            className="font-serif font-bold leading-none select-none tabular-nums"
            style={{ fontSize: '5.5rem', lineHeight: 1, color: l.dark ? 'rgba(196,149,106,0.18)' : 'rgba(139,94,60,0.10)' }}
          >
            {l.nr}
          </span>
          <div className={`w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0 ${l.dark ? 'bg-white/8' : 'bg-primary/8'}`}>
            <Icon className={`w-5 h-5 ${l.dark ? 'text-accent' : 'text-primary'}`} strokeWidth={1.5} />
          </div>
        </div>

        {/* Right col */}
        <div className="flex-1 min-w-0">
          {l.badge && (
            <span className={`inline-block font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 border mb-4 ${l.dark ? 'text-accent border-accent/35' : 'text-primary border-primary/30'}`}>
              {l.badge}
            </span>
          )}
          <h2 className={`font-serif text-3xl md:text-4xl font-semibold leading-tight mb-2 ${l.dark ? 'text-primary-foreground' : 'text-foreground'}`}>
            {l.titel}
          </h2>
          <p className="font-sans text-sm italic text-accent mb-5">{l.kurz}</p>
          <div className={`w-10 h-px mb-6 ${l.dark ? 'bg-accent/30' : 'bg-primary/25'}`} />
          <p className={`font-sans text-base leading-relaxed max-w-prose ${l.dark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
            {l.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <div className="relative bg-foreground overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 flex items-end justify-end pr-6 pb-0 pointer-events-none select-none">
            <span className="font-serif font-bold text-white opacity-[0.035]" style={{ fontSize: 'clamp(8rem, 25vw, 22rem)', lineHeight: 1 }}>FLEK</span>
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-24">
            <p className="font-sans text-accent text-[11px] uppercase tracking-[0.3em] mb-5">Flek – die Friseure · Riederich</p>
            <h1 className="font-serif font-semibold text-primary-foreground leading-tight text-balance mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
              Was wir für<br /><em className="text-accent not-italic">Sie tun.</em>
            </h1>
            <p className="font-sans text-primary-foreground/55 text-base leading-relaxed max-w-lg mb-10">
              Bei Flek steht Ihre Persönlichkeit im Mittelpunkt. Wir nehmen uns Zeit, beraten individuell und setzen Ihre Wünsche mit Leidenschaft um.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-accent" />
              <p className="font-sans text-primary-foreground/40 text-sm">{leistungen.length} Leistungen</p>
            </div>
          </div>
        </div>

        {/* Gratis-Inklusiv Banner */}
        <div className="bg-primary px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <p className="font-sans text-primary-foreground/50 text-[10px] uppercase tracking-widest mb-4">Gratis-Inklusiv-Leistungen zu jedem Besuch</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Frisurenberatung', 'Haarwäsche mit exklusiven Produkten', 'Wellness-Kopfmassage', 'Haarstyling'].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-accent/70 flex-shrink-0 text-xs mt-0.5">✦</span>
                  <span className="font-sans text-primary-foreground/80 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternating rows */}
        {leistungen.map((l, i) => <LeistungRow key={l.nr} l={l} index={i} />)}

        {/* Kosmetik-Seminar Hinweis */}
        <div className="bg-background px-6 pb-2">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-3 bg-card border border-border px-6 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Achten Sie auch auf unsere{' '}
                <Link href="/seminare" className="text-primary font-medium hover:text-accent transition-colors duration-200">Kosmetik-Seminar-Termine</Link>
                , die wir regelmäßig anbieten!
              </p>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="bg-primary mt-0">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-sans text-primary-foreground/50 text-[11px] uppercase tracking-widest mb-2">Neugierig auf die Kosten?</p>
              <h3 className="font-serif text-3xl font-semibold text-primary-foreground">Alle Preise im Überblick</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/preise" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-sans text-sm uppercase tracking-wider px-7 py-3 hover:bg-accent hover:text-primary-foreground transition-colors duration-300">
                Zur Preisliste <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/seminare" className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-sans text-sm uppercase tracking-wider px-7 py-3 hover:border-primary-foreground transition-colors duration-300">
                Seminare
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
