import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Impressum – Flek die Friseure',
  description: 'Impressum des Friseursalons Flek die Friseure in Riederich.',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm font-sans text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              Startseite
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground">Impressum</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-2 text-balance">
            Impressum
          </h1>
          <div className="w-16 h-0.5 bg-accent mb-10" />

          {/* Angaben gemäß § 5 TMG */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="font-sans text-muted-foreground leading-relaxed space-y-1">
              <p className="font-semibold text-foreground">Rosa Flek-Knauer</p>
              <p>Flek die Friseure</p>
              <p>Robert-Bosch-Straße 17</p>
              <p>72585 Riederich</p>
              <p>Deutschland</p>
            </div>
          </section>

          {/* Kontakt */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Kontakt</h2>
            <div className="font-sans text-muted-foreground leading-relaxed space-y-2">
              <p>
                <span className="text-foreground font-medium">Telefon:</span>{' '}
                <a
                  href="tel:+4971239696996"
                  className="hover:text-primary transition-colors duration-200"
                >
                  07123 – 96 96 996
                </a>
              </p>
              <p>
                <span className="text-foreground font-medium">E-Mail:</span>{' '}
                <a
                  href="mailto:Info@flek-die-friseure.de"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Info@flek-die-friseure.de
                </a>
              </p>
            </div>
          </section>

          {/* Berufsrechtliche Angaben */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Berufsrechtliche Angaben
            </h2>
            <div className="font-sans text-muted-foreground leading-relaxed space-y-2">
              <p>
                <span className="text-foreground font-medium">Berufsbezeichnung:</span> Friseurmeister/-in
                (verliehen in der Bundesrepublik Deutschland)
              </p>
              <p>
                <span className="text-foreground font-medium">Zuständige Handwerkskammer:</span>{' '}
                Handwerkskammer Reutlingen, Hindenburgstraße 58, 72762 Reutlingen
              </p>
            </div>
          </section>

          {/* Umsatzsteuer */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Umsatzsteuer-ID
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{' '}
              <span className="text-foreground font-medium">DE299043835</span>
            </p>
          </section>

          {/* EU-Streitschlichtung */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              EU-Streitschlichtung
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200 underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          {/* Verbraucherstreitbeilegung */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Haftung für Inhalte */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Haftung für Inhalte
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
              Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
              möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>
          </section>

          {/* Haftung für Links */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Haftung für Links
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
              ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          {/* Urheberrecht */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Urheberrecht</h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
              nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
              dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Inhalte umgehend entfernen.
            </p>
          </section>

          <div className="border-t border-border pt-8">
            <Link
              href="/"
              className="font-sans text-sm text-primary hover:text-accent transition-colors duration-200"
            >
              &larr; Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
