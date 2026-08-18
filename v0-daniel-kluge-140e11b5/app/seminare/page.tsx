import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CalendarDays, BookOpen, Sparkles } from 'lucide-react'

const vorteile = [
  { icon: BookOpen,     text: 'Erlernen der jeweiligen Techniken Schritt für Schritt' },
  { icon: Sparkles,     text: 'Umgang mit Geräten und professionellen Hilfsmitteln' },
  { icon: CalendarDays, text: 'Üben unter fachlicher Anleitung unserer Stylisten' },
]

export default function SeminarePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Banner */}
        <div className="bg-primary text-primary-foreground py-20 px-6 text-center">
          <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">Wissen & Können</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-balance">
            Unsere Seminare
          </h1>
          <div className="mt-5 w-16 h-0.5 bg-accent mx-auto" />
          <p className="mt-6 font-sans text-primary-foreground/80 text-sm max-w-xl mx-auto leading-relaxed">
            Um unseren Kundinnen auch zu Hause hilfreich beim Thema Haar und Make-up zur Seite zu stehen, bieten wir passende Seminare zu verschiedenen Themen an.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">

          {/* Was erwartet Sie */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">Was Sie erwartet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {vorteile.map(({ icon: Icon, text }) => (
                <div key={text} className="bg-card border border-border rounded-sm px-6 py-8 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Aktuelle Seminare */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
              Aktuelle Seminartermine
            </h2>
            <div className="bg-muted border border-border rounded-sm px-8 py-12 text-center">
              <CalendarDays className="w-10 h-10 text-accent/40 mx-auto mb-4" strokeWidth={1.5} />
              <p className="font-serif text-xl text-foreground mb-2">Derzeit sind keine Seminare geplant</p>
              <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Neue Termine werden rechtzeitig bekannt gegeben. Beachten Sie auch unsere Kosmetik-Seminar-Termine, die wir regelmäßig anbieten.
              </p>
            </div>
          </section>

          {/* Kontakt CTA */}
          <div className="text-center bg-card border border-border rounded-sm px-8 py-12">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              Interesse an einem Seminar?
            </h3>
            <p className="font-sans text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Melden Sie sich bei uns telefonisch oder persönlich im Salon – wir informieren Sie gerne über kommende Termine.
            </p>
            <a
              href="tel:+4971239696996"
              className="inline-block bg-primary text-primary-foreground font-sans text-sm uppercase tracking-wider px-7 py-3 hover:bg-accent transition-colors duration-300"
            >
              07123 – 96 96 996
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
