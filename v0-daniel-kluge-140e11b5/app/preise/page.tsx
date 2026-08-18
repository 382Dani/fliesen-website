import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Gift, Droplets, Wind, Sparkles } from 'lucide-react'

const inklusivLeistungen = [
  { icon: Sparkles, label: 'Flek – die Frisurenberatung' },
  { icon: Droplets, label: 'Flek – die Haarwäsche mit exklusiven Produkten' },
  { icon: Wind,     label: 'Flek – die Wellness-Kopfmassage' },
  { icon: Wind,     label: 'Flek – das Haarstyling' },
]

const preisgruppen = [
  {
    kategorie: 'Damen',
    items: [
      { leistung: 'Schneiden, Föhnen',   preis: '47,00–59,00 €' },
      { leistung: 'Föhnen',              preis: '26,00–37,00 €' },
      { leistung: 'Hochstecken',         preis: 'ab 50,00 €' },
      { leistung: 'Coloration',          preis: 'ab 49,00 €' },
      { leistung: 'Hellerfärben',        preis: 'ab 53,00 €' },
      { leistung: 'Strähnen',            preis: 'ab 68,00 €' },
      { leistung: 'Balayage',            preis: 'ab 60,00 €' },
      { leistung: 'Dauerwelle',          preis: 'ab 62,00 €' },
      { leistung: 'Pflegebehandlung',    preis: '5,00–19,00 €' },
      { leistung: 'Make-up',             preis: '42,00–55,00 €' },
      { leistung: 'Wimpernfarbe',        preis: '15,00 €' },
    ],
  },
  {
    kategorie: 'Herren',
    items: [
      { leistung: 'Haarschnitt inkl. Styling', preis: '37,00 €' },
      { leistung: 'Maschinenschnitt',           preis: '22,00–25,00 €' },
      { leistung: 'Konturenschnitt',            preis: '22,00–25,00 €' },
      { leistung: 'Kopfmassage',                preis: '10,00 €' },
    ],
  },
  {
    kategorie: 'Kinder und Teenies',
    items: [
      { leistung: 'bis 6 Jahre',                  preis: '22,00 €' },
      { leistung: 'Mädchen  7 bis 13 Jahre',      preis: '26,00–38,00 €' },
      { leistung: 'Mädchen  14 bis 17 Jahre',     preis: '42,00–46,00 €' },
      { leistung: 'Jungs     14 bis 17 Jahre',    preis: '32,00 €' },
    ],
  },
]

export default function PreisePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Banner */}
        <div className="bg-primary text-primary-foreground py-20 px-6 text-center">
          <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">Transparenz & Fairness</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-balance">
            Dienstleistungen & Preise
          </h1>
          <div className="mt-5 w-16 h-0.5 bg-accent mx-auto" />
          <p className="mt-6 font-sans text-primary-foreground/80 text-sm max-w-xl mx-auto leading-relaxed">
            Nachstehend finden Sie einen Auszug aus unseren Leistungen. Weitere Dienstleistungen und Preise erfahren Sie gerne bei unseren Stylisten.
            Aus Gründen der Fairness sind alle Preise <strong className="text-primary-foreground">Mindestpreise</strong> – bei mehr Arbeits- und Materialaufwand wird ein Aufpreis berechnet.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20 space-y-16">

          {/* Gratis-Inklusiv */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Gift className="w-5 h-5 text-accent flex-shrink-0" />
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Gratis-Inklusiv-Leistungen zu jedem Besuch
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inklusivLeistungen.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-card border border-border rounded-sm px-5 py-4"
                >
                  <div className="w-9 h-9 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans text-sm text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Preistabellen */}
          {preisgruppen.map((gruppe) => (
            <section key={gruppe.kategorie}>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                {gruppe.kategorie}
              </h2>
              <div className="rounded-sm border border-border overflow-hidden">
                {gruppe.items.map((item, i) => (
                  <div
                    key={item.leistung}
                    className={`flex items-center justify-between px-6 py-4 font-sans text-sm ${
                      i % 2 === 0 ? 'bg-card' : 'bg-muted/40'
                    }`}
                  >
                    <span className="text-foreground">{item.leistung}</span>
                    <span className="text-primary font-semibold whitespace-nowrap ml-4">{item.preis}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Bezahlung Hinweis */}
          <div className="flex items-start gap-3 bg-card border border-border rounded-sm px-6 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Wir akzeptieren nur <span className="text-foreground font-medium">Bargeld oder EC-Kartenzahlung</span>.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
