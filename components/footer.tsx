import Link from 'next/link'

const tickerItems = [
  'Haarschnitt & Styling',
  'Colorationen',
  'Balayage & Strähnen',
  'Dauerwelle',
  'Haarpflege-Treatments',
  'Bartpflege & Herrenschnitt',
  'Beratung',
  'Premium-Produkte',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-primary-foreground overflow-hidden">
      {/* Ticker */}
      <div className="border-b border-white/10 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'ticker 30s linear infinite' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 font-sans text-xs uppercase tracking-widest text-white/50 px-6">
              <span className="text-accent">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-serif text-xl font-semibold text-white mb-1">Flek die Friseure</p>
          <p className="font-sans text-sm text-white/60">
            Robert-Bosch-Straße 17 · 72585 Riederich
          </p>
          <a
            href="tel:+4971239696996"
            className="font-sans text-sm text-white/50 hover:text-accent transition-colors duration-200 mt-1 inline-block"
          >
            07123 – 96 96 996
          </a>
        </div>

        <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer-Navigation">
          <Link href="/impressum" className="font-sans text-sm text-white/70 hover:text-accent transition-colors duration-200">
            Impressum
          </Link>
          <Link href="/datenschutz" className="font-sans text-sm text-white/70 hover:text-accent transition-colors duration-200">
            Datenschutz
          </Link>
          <a
            href="https://login.ionos.de/?redirect_url=https%3A%2F%2Fmein.ionos.de%2Fmywebsite-overview%3Fmywebsite.pageid%3D146006&username=www.friseure-flek.de"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-white/70 hover:text-accent transition-colors duration-200"
          >
            Login
          </a>
        </nav>

        <p className="font-sans text-sm text-white/50">
          &copy; {year} Flek die Friseure
        </p>
      </div>
    </footer>
  )
}
