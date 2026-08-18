import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Leistungen from '@/components/leistungen'
import UeberUns from '@/components/ueber-uns'
import Oeffnungszeiten from '@/components/oeffnungszeiten'
import Kontakt from '@/components/kontakt'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Leistungen />
        <div className="w-full flex items-center gap-6 px-10 md:px-20">
          <div className="flex-1 h-px bg-border" />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>
        <UeberUns />
        <Oeffnungszeiten />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
