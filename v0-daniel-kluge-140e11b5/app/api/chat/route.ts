import { gateway, streamText, UIMessage } from 'ai'

export const maxDuration = 30


const SYSTEM_PROMPT = `Du bist ein freundlicher und hilfreicher Assistent von "Flek die Friseure", einem Friseursalon in Riederich.
Du hilfst Kunden mit Fragen zu Leistungen, Preisen, Oeffnungszeiten, Terminbuchung und allem rund um den Salon.

Adresse: Robert-Bosch-Strasse 17, 72585 Riederich

Oeffnungszeiten:
- Montag: Geschlossen
- Dienstag: 9:00 - 18:00 Uhr
- Mittwoch: 9:00 - 18:00 Uhr
- Donnerstag: 9:00 - 19:00 Uhr
- Freitag: 9:00 - 18:00 Uhr
- Samstag: 8:00 - 13:00 Uhr
- Sonntag: Geschlossen

Kontakt:
- Telefon: 07123 / 9 40 80
- E-Mail: info@flek-die-friseure.de

Leistungen:
- Haarschnitte (Damen & Herren)
- Haarfaerbungen & Highlights
- Dauerwelle & Glaettungsbehandlungen
- Haarpflege & Treatments
- Hochzeitsfrisuren & Special Events
- Bartpflege
- Kinder-Haarschnitte

Terminbuchung: Kunden koennen Termine direkt auf der Website buchen (Termin-Button) oder telefonisch unter 07123 / 9 40 80.

Seminare: Der Salon bietet auch Friseur-Weiterbildungsseminare an.

Antworte immer auf Deutsch, kurz und praezise. Sei herzlich und professionell.
Falls eine Frage nicht zum Salon gehoert, leite freundlich zum eigentlichen Thema zurueck.`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages }: { messages: UIMessage[] } = body

    const modelMessages = messages.map((m) => {
      const textContent = (m.parts ?? [])
        .filter((p: { type: string }) => p.type === 'text')
        .map((p: { type: string; text?: string }) => p.text ?? '')
        .join('')
      return {
        role: m.role as 'user' | 'assistant',
        content: textContent,
      }
    })

    const result = streamText({
      model: gateway('openai/gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error('[v0] chat route error:', String(err))
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
