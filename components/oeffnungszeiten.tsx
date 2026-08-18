'use client'

import { useEffect, useState } from 'react'

const zeiten = [
  { tag: 'Montag',     zeit: 'Geschlossen',       open: null,  close: null  },
  { tag: 'Dienstag',   zeit: '10:00 – 19:00 Uhr', open: 10,    close: 19    },
  { tag: 'Mittwoch',   zeit: '09:00 – 18:00 Uhr', open: 9,     close: 18    },
  { tag: 'Donnerstag', zeit: '10:00 – 19:00 Uhr', open: 10,    close: 19    },
  { tag: 'Freitag',    zeit: '09:00 – 18:00 Uhr', open: 9,     close: 18    },
  { tag: 'Samstag',    zeit: 'Nach Vereinbarung',  open: null,  close: null  },
  { tag: 'Sonntag',    zeit: 'Geschlossen',        open: null,  close: null  },
]

const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

interface StatusResult {
  isOpen: boolean
  todayTag: string
  nextOpenDay: string | null
  progressPct: number
}

function getLiveStatus(): StatusResult {
  const now = new Date()
  const todayTag = DAY_NAMES[now.getDay()]
  const h = now.getHours() + now.getMinutes() / 60

  const todayRow = zeiten.find((z) => z.tag === todayTag)
  const isOpen = !!(
    todayRow &&
    todayRow.open !== null &&
    todayRow.close !== null &&
    h >= todayRow.open &&
    h < todayRow.close
  )

  // Progress through open window
  let progressPct = 0
  if (isOpen && todayRow?.open !== null && todayRow?.close !== null) {
    progressPct = ((h - todayRow.open) / (todayRow.close - todayRow.open)) * 100
  }

  // Next open day
  let nextOpenDay: string | null = null
  if (!isOpen) {
    for (let i = 1; i <= 7; i++) {
      const nextIdx = (now.getDay() + i) % 7
      const nextRow = zeiten.find((z) => z.tag === DAY_NAMES[nextIdx])
      if (nextRow?.open !== null) {
        nextOpenDay = i === 1 ? 'morgen' : `${DAY_NAMES[nextIdx]}`
        break
      }
    }
  }

  return { isOpen, todayTag, nextOpenDay, progressPct }
}

const INITIAL_STATUS: StatusResult = {
  isOpen: false,
  todayTag: 'Montag',
  nextOpenDay: null,
  progressPct: 0,
}

export default function Oeffnungszeiten() {
  const [status, setStatus] = useState<StatusResult>(INITIAL_STATUS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setStatus(getLiveStatus())
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  const { isOpen, todayTag, nextOpenDay, progressPct } = status
  const todayRow = zeiten.find((z) => z.tag === (mounted ? todayTag : zeiten[0].tag))

  return (
    <section id="oeffnungszeiten" className="py-24 px-6 bg-secondary">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">
            Wann wir für Sie da sind
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Öffnungszeiten
          </h2>
          <div className="mt-5 w-16 h-0.5 bg-accent mx-auto" />
        </div>

        {/* Live status banner */}
        <div
          className={`flex items-center justify-between gap-4 rounded-sm px-6 py-4 mb-6 border ${
            isOpen
              ? 'bg-primary/10 border-primary/30'
              : 'bg-muted border-border'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOpen ? 'bg-green-500' : 'bg-muted-foreground'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOpen ? 'bg-green-500' : 'bg-muted-foreground'
                }`}
              />
            </span>
            <div>
              <p className={`font-sans font-semibold text-sm ${isOpen ? 'text-green-700' : 'text-foreground'}`}>
                {isOpen ? 'Jetzt geöffnet' : 'Aktuell geschlossen'}
              </p>
              {!isOpen && nextOpenDay && (
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Nächstes Mal {nextOpenDay} geöffnet
                </p>
              )}
              {isOpen && todayRow?.open !== null && todayRow?.close !== null && (
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Bis {todayRow.close}:00 Uhr geöffnet
                </p>
              )}
            </div>
          </div>
          {/* Today's progress bar */}
          {isOpen && (
            <div className="flex-1 max-w-36 hidden sm:block">
              <p className="font-sans text-xs text-muted-foreground mb-1 text-right">
                {Math.round(progressPct)}%
              </p>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden shadow-sm">
          {zeiten.map((row, i) => {
            const isToday = row.tag === todayTag
            const isClosed = row.open === null
            return (
              <div
                key={row.tag}
                className={`flex items-center justify-between px-8 py-4 transition-colors duration-200 ${
                  i < zeiten.length - 1 ? 'border-b border-border' : ''
                } ${isToday ? 'bg-primary/8' : 'hover:bg-muted/50'}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-sans font-medium ${
                      isToday ? 'text-primary' : isClosed ? 'text-muted-foreground' : 'text-foreground'
                    }`}
                  >
                    {row.tag}
                  </span>
                  {isToday && (
                    <span className="font-sans text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-sm">
                      Heute
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {!isClosed && (
                    <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-500/70 flex-shrink-0" />
                  )}
                  <span
                    className={`font-sans text-sm ${
                      isClosed
                        ? 'text-muted-foreground'
                        : isToday
                        ? 'text-primary font-semibold'
                        : 'text-foreground'
                    }`}
                  >
                    {row.zeit}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex items-start gap-3 bg-card border border-border rounded-sm px-6 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            Bitte beachten Sie, dass wir Termine nur <span className="text-foreground font-medium">persönlich oder telefonisch</span>, aber nicht per E-Mail annehmen.
          </p>
        </div>
      </div>
    </section>
  )
}
