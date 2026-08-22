// TEMPORARY in-memory booking store.
// Bookings live only for the current server process and are lost on restart/redeploy.
// TODO: replace with a persistent database (Neon) once the integration is connected
// to your team, so bookings survive restarts and are shared across all instances.

export interface Booking {
  id: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  serviceId: string
  name: string
  contact: string
  createdAt: string
}

declare global {
  // eslint-disable-next-line no-var
  var __salonBookings: Booking[] | undefined
}

function getStore(): Booking[] {
  if (!globalThis.__salonBookings) {
    globalThis.__salonBookings = []
  }
  return globalThis.__salonBookings
}

export function listBookings(date?: string): Booking[] {
  const store = getStore()
  return date ? store.filter((b) => b.date === date) : store
}

export function isSlotTaken(date: string, time: string): boolean {
  return getStore().some((b) => b.date === date && b.time === time)
}

export function addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const store = getStore()
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  store.push(newBooking)
  return newBooking
}
