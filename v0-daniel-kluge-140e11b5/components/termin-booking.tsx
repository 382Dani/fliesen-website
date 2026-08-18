'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import useSWR from 'swr'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { SERVICES, BUSINESS_HOURS, SLOT_MINUTES } from '@/lib/booking-data'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const WEEKDAY_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const MONTH_SHORT = [
  'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',
]

interface DayOption {
  date: string
  weekdayLabel: string
  dayNumber: number
  monthLabel: string
  isToday: boolean
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function buildDayOptions(count = 24): DayOption[] {
  const options: DayOption[] = []
  const now = new Date()
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let added = 0
  let i = 0
  while (added < count && i < 60) {
    const d = new Date(cursor)
    d.setDate(cursor.getDate() + i)
    const hours = BUSINESS_HOURS.find((h) => h.weekday === d.getDay())
    if (hours && hours.open !== null) {
      options.push({
        date: toDateKey(d),
        weekdayLabel: WEEKDAY_SHORT[d.getDay()],
        dayNumber: d.getDate(),
        monthLabel: MONTH_SHORT[d.getMonth()],
        isToday: toDateKey(d) === toDateKey(now),
      })
      added++
    }
    i++
  }
  return options
}

function buildTimeSlots(weekday: number): string[] {
  const hours = BUSINESS_HOURS.find((h) => h.weekday === weekday)
  if (!hours || hours.open === null || hours.close === null) return []
  const slots: string[] = []
  const startMin = hours.open * 60
  const endMin = hours.close * 60
  for (let m = startMin; m < endMin; m += SLOT_MINUTES) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`)
  }
  return slots
}

function formatDateLabel(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00`)
  return `${WEEKDAY_SHORT[d.getDay()]}, ${d.getDate()}. ${MONTH_SHORT[d.getMonth()]}`
}

export default function TerminBooking() {
  const [mounted, setMounted] = useState(false)
  const [days, setDays] = useState<DayOption[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [serviceId, setServiceId] = useState(SERVICES[0].id)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ date: string; time: string; serviceId: string } | null>(null)

  useEffect(() => {
    const opts = buildDayOptions()
    setDays(opts)
    setSelectedDate(opts[0]?.date ?? null)
    setMounted(true)
  }, [])

  const { data, mutate } = useSWR(
    mounted && selectedDate ? `/api/termine?date=${selectedDate}` : null,
    fetcher,
    { refreshInterval: 15000 }
  )

  const occupiedTimes = useMemo(
    () => new Set<string>((data?.occupied ?? []).map((o: { time: string }) => o.time)),
    [data]
  )

  const selectedWeekday = selectedDate ? new Date(`${selectedDate}T00:00:00`).getDay() : null
  const allSlots = selectedWeekday !== null ? buildTimeSlots(selectedWeekday) : []

  const now = new Date()
  const isTodaySelected = mounted && selectedDate === toDateKey(now)
  const nowDecimal = now.getHours() + now.getMinutes() / 60

  const slotsWithStatus = allSlots.map((time) => {
    const [h, m] = time.split(':').map(Number)
    const timeDecimal = h + m / 60
    const isPast = isTodaySelected && timeDecimal <= nowDecimal
    const isTaken = occupiedTimes.has(time)
    return { time, disabled: isPast || isTaken, isTaken, isPast }
  })

  function selectDate(date: string) {
    setSelectedDate(date)
    setSelectedTime(null)
    setFormError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    if (!selectedDate || !selectedTime) {
      setFormError('Bitte wählen Sie Datum und Uhrzeit aus.')
      return
    }
    if (!name.trim() || !contact.trim()) {
      setFormError('Bitte tragen Sie Name und Kontakt ein.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/termine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, time: selectedTime, serviceId, name, contact }),
      })
      const json = await res.json()
      if (!res.ok) {
        setFormError(json.error ?? 'Es ist ein Fehler aufgetreten.')
        mutate()
        return
      }
      setSuccess({ date: selectedDate, time: selectedTime, serviceId })
    } catch {
      setFormError('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setSubmitting(false)
    }
  }

  function resetForm() {
    setSuccess(null)
    setSelectedTime(null)
    setName('')
    setContact('')
    setServiceId(SERVICES[0].id)
    mutate()
  }

  const selectedService = SERVICES.find((s) => s.id === serviceId)

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-accent text-sm uppercase tracking-widest mb-3">
            Online reservieren
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Termin buchen
          </h1>
          <div className="mt-5 w-16 h-0.5 bg-accent mx-auto" />
          <p className="mt-5 font-sans text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Wählen Sie Datum und Uhrzeit — bereits vergebene Termine sind ausgegraut, freie Zeiten
            können Sie direkt reservieren.
          </p>
        </div>

        {success ? (
          <div className="max-w-lg mx-auto bg-card border border-border rounded-sm p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-7 h-7 text-primary" strokeWidth={2} aria-hidden="true" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Termin reserviert
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              Wir haben Ihren Termin für{' '}
              <span className="text-foreground font-medium">
                {formatDateLabel(success.date)} um {success.time} Uhr
              </span>{' '}
              ({SERVICES.find((s) => s.id === success.serviceId)?.label}) vorgemerkt. Sie erhalten
              bei Fragen einen Anruf von uns unter der angegebenen Kontaktmöglichkeit.
            </p>
            <button
              onClick={resetForm}
              className="font-sans text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-accent transition-colors duration-200 cursor-pointer"
            >
              Weiteren Termin buchen
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start min-w-0">
            {/* Left: date + time selection */}
            <div className="bg-card border border-border rounded-sm p-6 md:p-8 shadow-sm min-w-0">
              <div className="mb-8">
                <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
                  1. Datum wählen
                </p>
                {!mounted || days.length === 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-16 h-20 rounded-sm bg-muted animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Datum auswählen">
                    {days.map((day) => {
                      const isSelected = day.date === selectedDate
                      return (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => selectDate(day.date)}
                          aria-pressed={isSelected}
                          className={`flex-shrink-0 w-16 flex flex-col items-center justify-center gap-1 rounded-sm py-3 transition-colors duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-foreground border-border hover:border-primary'
                          }`}
                        >
                          <span className="font-sans text-[10px] uppercase tracking-wider opacity-80">
                            {day.weekdayLabel}
                          </span>
                          <span className="font-serif text-lg font-semibold leading-none">
                            {day.dayNumber}
                          </span>
                          <span className="font-sans text-[10px] uppercase tracking-wider opacity-80">
                            {day.monthLabel}
                          </span>
                          {day.isToday && (
                            <span
                              className={`w-1 h-1 rounded-full ${isSelected ? 'bg-primary-foreground' : 'bg-accent'}`}
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <p className="font-sans text-xs uppercase tracking-widest text-accent">
                    2. Uhrzeit wählen
                  </p>
                  <div className="flex items-center gap-4 font-sans text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full border border-border bg-background" aria-hidden="true" />
                      Frei
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                      Belegt
                    </span>
                  </div>
                </div>

                {!mounted ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-11 rounded-sm bg-muted animate-pulse" />
                    ))}
                  </div>
                ) : allSlots.length === 0 ? (
                  <p className="font-sans text-sm text-muted-foreground py-6 text-center bg-muted rounded-sm">
                    An diesem Tag sind leider keine Online-Termine verfügbar.
                  </p>
                ) : (
                  <div
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                    role="group"
                    aria-label="Uhrzeit auswählen"
                  >
                    {slotsWithStatus.map(({ time, disabled, isTaken }) => {
                      const isSelected = time === selectedTime
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedTime(time)}
                          aria-pressed={isSelected}
                          aria-label={`${time} Uhr${isTaken ? ' – bereits vergeben' : ''}`}
                          className={`h-11 rounded-sm font-sans text-sm transition-colors duration-200 border ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary font-semibold cursor-pointer'
                              : disabled
                              ? 'bg-muted text-muted-foreground/50 border-border line-through cursor-not-allowed'
                              : 'bg-background text-foreground border-border hover:border-primary cursor-pointer'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-sm p-6 md:p-8 shadow-sm lg:sticky lg:top-24 space-y-5"
            >
              <p className="font-sans text-xs uppercase tracking-widest text-accent mb-1">
                3. Ihre Daten
              </p>

              {selectedDate && selectedTime && (
                <div className="bg-primary/10 border border-primary/30 rounded-sm px-4 py-3">
                  <p className="font-sans text-xs text-muted-foreground mb-0.5">Ihr Termin</p>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {formatDateLabel(selectedDate)} · {selectedTime} Uhr
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="service" className="block font-sans text-sm font-medium text-foreground mb-2">
                  Leistung
                </label>
                <select
                  id="service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label} · ca. {s.durationMin} Min.
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block font-sans text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ihr vollständiger Name"
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="contact" className="block font-sans text-sm font-medium text-foreground mb-2">
                  Telefon oder E-Mail
                </label>
                <input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Für Rückfragen zu Ihrem Termin"
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoComplete="tel"
                />
              </div>

              {formError && (
                <div className="flex items-start gap-2 text-destructive font-sans text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full font-sans text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-accent transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Wird reserviert…
                  </>
                ) : (
                  'Termin verbindlich buchen'
                )}
              </button>

              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                {selectedService?.label} · ca. {selectedService?.durationMin} Minuten. Bei kurzfristigen
                Änderungen erreichen Sie uns telefonisch unter 07123 – 96 96 996.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
