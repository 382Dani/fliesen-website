import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TerminBooking from '@/components/termin-booking'

export const metadata: Metadata = {
  title: 'Termin buchen | Flek die Friseure',
  description:
    'Buchen Sie online Ihren Termin bei Flek die Friseure. Sehen Sie direkt, welche Zeiten noch frei sind, und sichern Sie sich Ihren Wunschtermin.',
}

export default function TerminPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <TerminBooking />
      </main>
      <Footer />
    </>
  )
}
