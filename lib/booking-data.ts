export interface ServiceOption {
  id: string
  label: string
  durationMin: number
}

export const SERVICES: ServiceOption[] = [
  { id: 'haarschnitt', label: 'Haarschnitt & Styling', durationMin: 45 },
  { id: 'coloration', label: 'Colorationen & Färbungen', durationMin: 90 },
  { id: 'straehnen', label: 'Strähnen & Balayage', durationMin: 120 },
  { id: 'dauerwelle', label: 'Dauerwelle & Glättung', durationMin: 90 },
  { id: 'pflege', label: 'Haarpflege-Treatments', durationMin: 30 },
  { id: 'bartpflege', label: 'Bartpflege & Herrenschnitt', durationMin: 30 },
]

export interface DayHours {
  /** 0 = Sonntag ... 6 = Samstag, matches Date.getDay() */
  weekday: number
  label: string
  open: number | null
  close: number | null
}

/** Mirrors the hours shown in the Oeffnungszeiten section. */
export const BUSINESS_HOURS: DayHours[] = [
  { weekday: 0, label: 'Sonntag', open: null, close: null },
  { weekday: 1, label: 'Montag', open: null, close: null },
  { weekday: 2, label: 'Dienstag', open: 10, close: 19 },
  { weekday: 3, label: 'Mittwoch', open: 9, close: 18 },
  { weekday: 4, label: 'Donnerstag', open: 10, close: 19 },
  { weekday: 5, label: 'Freitag', open: 9, close: 18 },
  { weekday: 6, label: 'Samstag', open: null, close: null },
]

export const SLOT_MINUTES = 30

export function getHoursForWeekday(weekday: number): DayHours | undefined {
  return BUSINESS_HOURS.find((h) => h.weekday === weekday)
}

export function isWithinBusinessHours(weekday: number, timeDecimal: number): boolean {
  const hours = getHoursForWeekday(weekday)
  if (!hours || hours.open === null || hours.close === null) return false
  return timeDecimal >= hours.open && timeDecimal < hours.close
}
