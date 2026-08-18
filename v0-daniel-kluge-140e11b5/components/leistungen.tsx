'use client'

import Link from 'next/link'
import { Scissors, Palette, Sparkles, Waves, Leaf, UserCheck, Gift } from 'lucide-react'
import { useState } from 'react'

const leistungen = [
  { nr: '01', titel: 'Haarschnitt & Styling',        icon: Scissors,  tag: 'Beliebt',      text: 'Vom klassischen Schnitt bis zum modernen Look – individuell beraten, gekonnt umgesetzt. Für Damen, Herren und Kinder.' },
  { nr: '02', titel: 'Colorationen & Färbungen',     icon: Palette,   tag: 'Trend',        text: 'Natürliche Nuancen, kräftige Farben oder dezente Highlights – unsere Coloristinnen bringen Ihre Haare zum Strahlen.' },
  { nr: '03', titel: 'Strähnen & Balayage',          icon: Sparkles,  tag: 'Trend',        text: 'Sanfte Übergänge und natürliche Lichtreflexe – Balayage und klassische Strähnen verleihen Tiefe und Dimension.' },
  { nr: '04', titel: 'Dauerwelle & Glättung',        icon: Waves,     tag: null,           text: 'Mehr Volumen, mehr Locken oder glattes Haar – mit professionellen Umformungen erzielen wir langanhaltende Ergebnisse.' },
  { nr: '05', titel: 'Haarpflege-Treatments',        icon: Leaf,      tag: null,           text: 'Intensive Pflegebehandlungen stärken die Haarstruktur, spenden Feuchtigkeit und sorgen für gesunden Glanz.' },
  { nr: '06', titel: 'Bartpflege & Herrenschnitt',   icon: UserCheck, tag: null,           text: 'Vom gepflegten Bart bis zum modernen Herrenschnitt – erstklassige Betreuung auch für Herren.' },
  { nr: '07', titel: 'Geschenkgutschein',            icon: Gift,      tag: 'Geschenkidee', text: 'Der Flek-Geschenkgutschein – eine treffende Idee, die immer gut ankommt. Für SIE und IHN, in jedem Wunschbetrag.' },
]

export default function Leistungen() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="leistungen" className="bg-background overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-sans text-accent text-xs uppercase tracking-widest mb-3">Was wir anbieten</p>
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">Unsere<br />Leistungen</h2>
        </div>
        <Link
          href="/leistungen"
          className="group inline-flex items-center gap-3 font-sans text-sm uppercase tracking-widest bg-primary text-primary-foreground px-6 py-3 hover:bg-accent transition-colors duration-300"
        >
          Alle Leistungen ansehen
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* List */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        {leistungen.map((item, index) => {
          const Icon = item.icon
          const isHovered = hovered === index
          return (
            <div
              key={item.nr}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`group flex items-center gap-8 py-7 border-b border-border cursor-default transition-all duration-300 ${
                isHovered ? 'pl-4' : 'pl-0'
              }`}
            >
              {/* Number */}
              <span
                className={`font-sans text-xs tabular-nums tracking-widest transition-colors duration-300 flex-shrink-0 w-6 ${
                  isHovered ? 'text-accent' : 'text-muted-foreground/40'
                }`}
              >
                {item.nr}
              </span>

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isHovered ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isHovered ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              {/* Title + text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    className={`font-serif text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                      isHovered ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {item.titel}
                  </h3>
                  {item.tag && (
                    <span className="font-sans text-[10px] uppercase tracking-widest text-accent border border-accent/40 px-2 py-0.5 rounded-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p
                  className={`font-sans text-sm leading-relaxed mt-1 transition-all duration-300 ${
                    isHovered ? 'text-muted-foreground max-h-20 opacity-100' : 'text-transparent max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {item.text}
                </p>
              </div>

              {/* Arrow */}
              <span
                className={`font-sans text-accent transition-all duration-300 flex-shrink-0 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
                aria-hidden="true"
              >
                →
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
