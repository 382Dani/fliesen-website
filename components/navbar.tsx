'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import TerminModal from './termin-modal'

const navLinks = [
  { href: '#leistungen', label: 'Leistungen' },
  { href: '/preise', label: 'Preise' },
  { href: '/seminare', label: 'Seminare' },
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '/team', label: 'Team' },
  { href: '#oeffnungszeiten', label: 'Öffnungszeiten' },
  { href: '#kontakt', label: 'Kontakt' },
]

interface NavbarProps {
  onOpenTermin?: () => void
}

export default function Navbar({ onOpenTermin }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection via IntersectionObserver (only on homepage)
  useEffect(() => {
    if (pathname !== '/') return
    const sectionIds = ['leistungen', 'ueber-uns', 'oeffnungszeiten', 'kontakt']
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(`#${id}`) },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [pathname])

  // Smooth scroll helper – navigates to homepage first if needed
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const id = href.replace('#', '')
    if (pathname !== '/') {
      // Navigate home then scroll after hydration
      router.push(`/${href}`)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(href)
    }
  }

  const linkClass = (href: string) => {
    const isActive = activeSection === href || pathname === href
    return `group font-sans text-sm transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
    }`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/98 backdrop-blur-md border-b border-border shadow-sm h-14'
          : 'bg-background/95 backdrop-blur-sm border-b border-border h-16'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-semibold text-primary tracking-wide flex-shrink-0">
          Flek die Friseure
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Hauptnavigation">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith('#')
            const inner = (
              <span className="relative py-1">
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                    activeSection === link.href || pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </span>
            )
            return isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={linkClass(link.href)}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
              >
                {inner}
              </Link>
            )
          })}
          <TerminModal />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-1 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <nav
          className="bg-background border-t border-border px-6 py-5 flex flex-col gap-1"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith('#')
            const cls = `py-3 border-b border-border/50 font-sans text-sm transition-colors duration-200 ${
              activeSection === link.href || pathname === link.href
                ? 'text-primary font-medium'
                : 'text-foreground/80 hover:text-primary'
            }`
            return isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cls}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cls}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="mt-4">
            <TerminModal />
          </div>
        </nav>
      </div>
    </header>
  )
}
