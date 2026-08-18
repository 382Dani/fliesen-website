'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Phone, Mail, Clock } from 'lucide-react'

interface TerminModalProps {
  /** If provided, the component acts as a controlled modal (no built-in trigger button). */
  open?: boolean
  onClose?: () => void
  /** When true, renders the built-in "Termin anfragen" trigger button. */
  showTrigger?: boolean
}

export default function TerminModal({ open: controlledOpen, onClose, showTrigger = true }: TerminModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const handleClose = () => {
    if (onClose) onClose()
    else setInternalOpen(false)
  }

  const modal = isOpen && (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Termin anfragen"
    >
      {/* Dark overlay – click to close */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal card – always light regardless of system dark mode */}
      <div
        className="relative z-10 w-full max-w-md shadow-2xl rounded-sm overflow-hidden"
        style={{ backgroundColor: '#FAF7F2', color: '#2C2420' }}
      >
        {/* Header bar */}
        <div className="px-8 pt-8 pb-6" style={{ backgroundColor: '#FAF7F2' }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
            style={{ backgroundColor: '#E8D5C0', color: '#2C2420' }}
            aria-label="Schließen"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C4956A')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8D5C0')}
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#C4956A' }}>
            Wir freuen uns auf Sie
          </p>
          <h2 className="font-serif text-2xl font-semibold mb-1" style={{ color: '#2C2420' }}>
            Termin anfragen
          </h2>
          <div className="w-10 h-0.5 mb-5" style={{ backgroundColor: '#C4956A' }} />
          <p className="font-sans text-sm leading-relaxed" style={{ color: '#7A6658' }}>
            Rufen Sie uns an oder schreiben Sie uns — wir finden gemeinsam den passenden Termin.
          </p>
        </div>

        {/* Contact options */}
        <div className="px-8 pb-6 space-y-3">
          <a
            href="tel:+4971239696996"
            className="flex items-center gap-4 p-4 rounded-sm transition-colors duration-200"
            style={{ backgroundColor: '#F0E9DF' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8D5C0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F0E9DF')}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#8B5E3C' }}>
              <Phone size={17} color="#FAF7F2" aria-hidden="true" />
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-wider mb-0.5" style={{ color: '#7A6658' }}>Telefon</p>
              <p className="font-serif text-lg font-semibold" style={{ color: '#2C2420' }}>07123 – 96 96 996</p>
            </div>
          </a>

          <a
            href="mailto:info@flek-die-friseure.de?subject=Terminanfrage"
            className="flex items-center gap-4 p-4 rounded-sm transition-colors duration-200"
            style={{ backgroundColor: '#F0E9DF' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8D5C0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F0E9DF')}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#8B5E3C' }}>
              <Mail size={17} color="#FAF7F2" aria-hidden="true" />
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-wider mb-0.5" style={{ color: '#7A6658' }}>E-Mail</p>
              <p className="font-serif text-base font-semibold" style={{ color: '#2C2420' }}>info@flek-die-friseure.de</p>
            </div>
          </a>
        </div>

        {/* Opening hours footer */}
        <div className="px-8 pb-8">
          <div className="flex items-start gap-3 p-3 rounded-sm" style={{ backgroundColor: '#F0E9DF', borderLeft: '3px solid #C4956A' }}>
            <Clock size={14} style={{ color: '#8B5E3C', marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
            <p className="font-sans text-xs leading-relaxed" style={{ color: '#7A6658' }}>
              <span className="font-semibold" style={{ color: '#2C2420' }}>Erreichbar:</span>{' '}
              Di &amp; Do 10:00–19:00 &nbsp;·&nbsp; Mi &amp; Fr 09:00–18:00 &nbsp;·&nbsp; Mo / Sa / So geschlossen
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {showTrigger && (
        <button
          onClick={() => setInternalOpen(true)}
          className="font-sans text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded-sm cursor-pointer transition-all duration-200"
          style={{ backgroundColor: '#2C2420', color: '#FAF7F2', border: '2px solid #2C2420' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8B5E3C'; e.currentTarget.style.borderColor = '#8B5E3C' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2C2420'; e.currentTarget.style.borderColor = '#2C2420' }}
        >
          Termin anfragen
        </button>
      )}
      {mounted && createPortal(modal, document.body)}
    </>
  )
}
