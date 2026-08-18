import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Das Team – Flek die Friseure',
  description:
    'Lernen Sie das Team von Flek die Friseure kennen – erfahrene Friseurinnen mit Leidenschaft in Riederich.',
}

const team = [
  {
    name: 'Rosa Flek-Knauer',
    role: 'Friseurmeisterin | Betriebswirtin (HWK) | Inhaberin',
    image: '/team/team1.jpg',
    description:
      'Rosa Flek-Knauer ist die Inhaberin und das Herzstück des Salons. Als ausgebildete Friseurmeisterin und Betriebswirtin (HWK) verbindet sie handwerkliche Exzellenz mit unternehmerischem Gespür. Ihr Credo: Jede Kundin, jeder Kunde verdient einen Look, der zu ihr oder ihm passt.',
  },
  {
    name: 'Agatina Di Lisio',
    role: 'Friseurin | Top-Stylistin',
    image: '/team/team2.jpg',
    description:
      'Agatina ist spezialisiert auf moderne Schnitte und ausdrucksstarke Colorationen. Mit einem feinen Gespür für Trends und Individualität sorgt sie dafür, dass jeder Salon-Besuch ein Erlebnis wird.',
  },
  {
    name: 'Leyla Ünal',
    role: 'Friseurin | Top-Stylistin',
    image: '/team/team3.jpg',
    description:
      'Leyla bringt Kreativität und Präzision in jeden Handgriff. Ob sanfte Balayage oder klassischer Schnitt – sie nimmt sich die Zeit, den persönlichen Stil ihrer Kundinnen und Kunden herauszuarbeiten.',
  },
  {
    name: 'Olga Dobler',
    role: 'Reception | Kundenbetreuung',
    image: '/team/team4.jpg',
    description:
      'Olga ist das freundliche Gesicht am Empfang. Sie sorgt dafür, dass Sie sich vom ersten Moment an willkommen fühlen – ob bei der Terminvereinbarung, der Beratung oder dem herzlichen Empfang im Salon.',
  },
  {
    name: 'Senada Rapisarda',
    role: 'Friseurin | Stylistin',
    image: '/team/team5.jpg',
    description:
      'Senada ergänzt das Team mit ihrer Leidenschaft für sorgfältige Arbeit und zeitgemäße Styles. Sie begleitet ihre Kunden mit Einfühlungsvermögen und handwerklicher Sorgfalt.',
  },
]

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-background">

        {/* Hero banner */}
        <div className="relative h-64 md:h-80 overflow-hidden mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-flek.jpg"
            alt="Das Team von Flek die Friseure"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-foreground/55 flex flex-col items-center justify-center px-6">
            <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">
              Unser Team
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white text-balance text-center">
              Friseure aus Leidenschaft
            </h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6">

          {/* Intro text */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Mode ist ein großer Bestandteil unserer Arbeit. Nicht selten kommen Menschen zu uns,
              die einen neuen Look brauchen und für deren neues Image wir zuständig sind.
              Dies macht uns stolz – denn unser Beruf ist einer der schönsten, die es gibt.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mt-4">
              Die Kunst besteht darin, aus etwas nicht Existentem etwas Neues zu schaffen. Der Trend
              alleine genügt nicht – der Mensch mit seinem Naturell und seinem Umfeld ist uns deshalb
              genauso wichtig.
            </p>
          </div>

          <div className="w-16 h-0.5 bg-accent mx-auto mb-16" />

          {/* Team grid */}
          <div className="space-y-20">
            {team.map((member, index) => (
              <article
                key={member.name}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? 'md:[direction:rtl]' : ''
                }`}
              >
                <div className={`overflow-hidden rounded-sm ${index % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={`${member.name} – ${member.role}`}
                    className="w-full aspect-[3/4] object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className={index % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                  <p className="font-sans text-accent text-xs uppercase tracking-widest mb-2">
                    {member.role}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
                    {member.name}
                  </h2>
                  <div className="w-10 h-0.5 bg-accent mb-5" />
                  <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-secondary rounded-sm p-10">
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-3 text-balance">
              Wir freuen uns auf Sie
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed mb-6">
              Vereinbaren Sie jetzt Ihren Termin und lassen Sie sich von unserem Team verwöhnen.
            </p>
            <Link
              href="/#kontakt"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 font-sans text-sm uppercase tracking-wider hover:bg-accent transition-colors duration-300"
            >
              Termin vereinbaren
            </Link>
          </div>

          <div className="mt-12 border-t border-border pt-8">
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
