import type { NextRequest } from 'next/server'
import { addBooking, isSlotTaken, listBookings } from '@/lib/bookings-store'
import { SERVICES, getHoursForWeekday } from '@/lib/booking-data'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date') ?? undefined

  if (date && !DATE_RE.test(date)) {
    return Response.json({ error: 'Ungültiges Datum.' }, { status: 400 })
  }

  const bookings = listBookings(date)
  // Only expose which slots are occupied — never customer name/contact.
  const occupied = bookings.map((b) => ({ date: b.date, time: b.time }))
  return Response.json({ occupied })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { date, time, serviceId, name, contact } = body ?? {}

    if (
      typeof date !== 'string' ||
      typeof time !== 'string' ||
      typeof serviceId !== 'string' ||
      typeof name !== 'string' ||
      typeof contact !== 'string' ||
      !date ||
      !time ||
      !serviceId ||
      !name.trim() ||
      !contact.trim()
    ) {
      return Response.json({ error: 'Bitte alle Felder ausfüllen.' }, { status: 400 })
    }

    if (!DATE_RE.test(date) || !TIME_RE.test(time)) {
      return Response.json({ error: 'Ungültiges Datum oder Uhrzeit.' }, { status: 400 })
    }

    const service = SERVICES.find((s) => s.id === serviceId)
    if (!service) {
      return Response.json({ error: 'Ungültige Leistung.' }, { status: 400 })
    }

    const bookingDate = new Date(`${date}T${time}:00`)
    if (Number.isNaN(bookingDate.getTime()) || bookingDate.getTime() < Date.now() - 60_000) {
      return Response.json({ error: 'Dieser Termin liegt in der Vergangenheit.' }, { status: 400 })
    }

    const [h, m] = time.split(':').map(Number)
    const timeDecimal = h + m / 60
    const hours = getHoursForWeekday(bookingDate.getDay())
    if (!hours || hours.open === null || hours.close === null || timeDecimal < hours.open || timeDecimal >= hours.close) {
      return Response.json({ error: 'Zu dieser Zeit haben wir leider geschlossen.' }, { status: 400 })
    }

    if (isSlotTaken(date, time)) {
      return Response.json({ error: 'Dieser Termin ist leider bereits vergeben.' }, { status: 409 })
    }

    const booking = addBooking({
      date,
      time,
      serviceId,
      name: name.trim().slice(0, 100),
      contact: contact.trim().slice(0, 150),
    })

    return Response.json({ ok: true, booking: { date: booking.date, time: booking.time } })
  } catch {
    return Response.json({ error: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.' }, { status: 500 })
  }
}
