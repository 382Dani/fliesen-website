import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Flek die Friseure',
  description: 'Datenschutzerklärung des Friseursalons Flek die Friseure in Riederich.',
  robots: { index: false },
}

export default function DatenschutzPage() {
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
            <span className="text-foreground">Datenschutz</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-2 text-balance">
            Datenschutzerklärung
          </h1>
          <div className="w-16 h-0.5 bg-accent mb-10" />

          {/* 1. Überblick */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-sans font-semibold text-foreground mb-2">Allgemeine Hinweise</h3>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
              Text aufgeführten Datenschutzerklärung.
            </p>
            <h3 className="font-sans font-semibold text-foreground mb-2">
              Datenerfassung auf dieser Website
            </h3>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-2">
              <strong className="text-foreground">
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </strong>
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser
              Datenschutzerklärung entnehmen.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-2">
              <strong className="text-foreground">Wie erfassen wir Ihre Daten?</strong>
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z. B. durch
              das Ausfüllen von Kontaktformularen oder durch eine telefonische Terminvereinbarung.
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
              durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B.
              Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser
              Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-2">
              <strong className="text-foreground">Wofür nutzen wir Ihre Daten?</strong>
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-2">
              <strong className="text-foreground">
                Welche Rechte haben Sie bezüglich Ihrer Daten?
              </strong>
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine
              Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten
              Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          {/* 2. Hosting */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">2. Hosting</h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-2">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            <h3 className="font-sans font-semibold text-foreground mb-2">Vercel</h3>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (nachfolgend
              „Vercel"). Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles
              inklusive Ihrer IP-Adressen.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Details entnehmen Sie der Datenschutzerklärung von Vercel:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200 underline underline-offset-2"
              >
                https://vercel.com/legal/privacy-policy
              </a>
              . Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir
              haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer
              Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
              ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG,
              soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen
              im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst.
            </p>
          </section>

          {/* 3. Verantwortliche Stelle */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <h3 className="font-sans font-semibold text-foreground mb-2">Datenschutz</h3>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
              behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
              Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
              Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir
              sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <h3 className="font-sans font-semibold text-foreground mb-2">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <div className="font-sans text-muted-foreground leading-relaxed space-y-1 mb-4">
              <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <br />
              <p className="text-foreground font-medium">Rosa Flek-Knauer</p>
              <p>Flek die Friseure</p>
              <p>Robert-Bosch-Straße 17</p>
              <p>72585 Riederich</p>
              <br />
              <p>
                Telefon:{' '}
                <a
                  href="tel:+4971239696996"
                  className="hover:text-primary transition-colors duration-200"
                >
                  07123 – 96 96 996
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a
                  href="mailto:info@flek-die-friseure.de"
                  className="hover:text-primary transition-colors duration-200"
                >
                  info@flek-die-friseure.de
                </a>
              </p>
            </div>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
              gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
              Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </section>

          {/* 4. Speicherdauer */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              4. Speicherdauer
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
              Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder
              eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern
              wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen
              Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten
              Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </section>

          {/* 5. Keine Cookies */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              5. Cookies
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Diese Website verwendet <strong className="text-foreground">keine Cookies</strong>.
              Es werden keine Tracking-Cookies, Analyse-Cookies oder andere Cookies auf Ihrem
              Endgerät gesetzt. Wir verzichten vollständig auf den Einsatz von Cookie-basiertem
              Tracking oder Retargeting.
            </p>
          </section>

          {/* 6. Kontaktanfragen */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              6. Kontaktanfragen per Telefon oder E-Mail
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Wenn Sie uns per Telefon oder E-Mail kontaktieren, wird Ihre Anfrage inklusive aller
              daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung
              Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne
              Ihre Einwilligung weiter.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
              vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
              gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6
              Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit
              widerrufbar. Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei
              uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen
              oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
              Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche
              Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </section>

          {/* 7. Karte */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              7. Eingebettete Karte (OpenStreetMap)
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Auf unserer Kontaktseite wird eine Karte von{' '}
              <strong className="text-foreground">OpenStreetMap (OSM)</strong> eingebunden.
              OpenStreetMap ist ein freies, gemeinschaftlich erstelltes Kartenprojekt. Betreiber ist
              die OpenStreetMap Foundation (OSMF), St John's Innovation Centre, Cowley Road, Cambridge,
              CB4 0WS, Vereinigtes Königreich.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Wenn Sie die Seite mit der eingebetteten Karte aufrufen, baut Ihr Browser eine Verbindung
              zu den Servern von OpenStreetMap auf. Dabei werden Ihre IP-Adresse und ggf. weitere
              Browserinformationen an OpenStreetMap übermittelt. Wir haben keinen Einfluss auf diese
              Datenübertragung.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Weitere Informationen entnehmen Sie der Datenschutzerklärung von OpenStreetMap:{' '}
              <a
                href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200 underline underline-offset-2"
              >
                https://wiki.osmfoundation.org/wiki/Privacy_Policy
              </a>
              . Die Einbindung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Darstellung unseres Standorts).
            </p>
          </section>

          {/* 8. Rechte */}
          <section className="mb-10">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              8. Ihre Rechte als betroffene Person
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty mb-4">
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul className="font-sans text-muted-foreground space-y-2 list-none mb-4">
              {[
                'Recht auf Auskunft (Art. 15 DSGVO)',
                'Recht auf Berichtigung (Art. 16 DSGVO)',
                'Recht auf Löschung (Art. 17 DSGVO)',
                'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
                'Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
                'Recht auf Widerruf einer datenschutzrechtlichen Einwilligungserklärung (Art. 7 Abs. 3 DSGVO)',
              ].map((recht) => (
                <li key={recht} className="flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">–</span>
                  <span>{recht}</span>
                </li>
              ))}
            </ul>
            <p className="font-sans text-muted-foreground leading-relaxed text-pretty">
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die zuständige
              Aufsichtsbehörde in Baden-Württemberg ist der Landesbeauftragte für den Datenschutz und
              die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart,{' '}
              <a
                href="https://www.baden-wuerttemberg.datenschutz.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200 underline underline-offset-2"
              >
                www.baden-wuerttemberg.datenschutz.de
              </a>
              .
            </p>
          </section>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="font-sans text-sm text-primary hover:text-accent transition-colors duration-200"
            >
              &larr; Zurück zur Startseite
            </Link>
            <Link
              href="/impressum"
              className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Zum Impressum &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
