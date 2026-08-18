'use client'

import { Chat, useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Bot, Loader2, MessageCircle, Scissors, Send, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const QUICK_PROMPTS = [
  'Was sind eure Oeffnungszeiten?',
  'Wie kann ich einen Termin buchen?',
  'Welche Leistungen bietet ihr an?',
  'Wo befindet ihr euch?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const chat = useMemo(
    () =>
      new Chat({
        transport: new DefaultChatTransport({ api: '/api/chat' }),
      }),
    []
  )

  const { messages, sendMessage, status } = useChat({ chat })
  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return
    sendMessage({ text: trimmed })
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.nativeEvent.keyCode !== 229) {
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
  }

  const getMessageText = (message: { parts?: Array<{ type: string; text?: string }> }) =>
    (message.parts ?? [])
      .filter((p) => p.type === 'text')
      .map((p) => p.text ?? '')
      .join('')

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm transition-all duration-300 ease-in-out ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          className="bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
              <Scissors size={18} className="text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold text-primary-foreground leading-tight">
                Flek die Friseure
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-xs text-primary-foreground/70">KI-Assistent online</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-1 rounded-lg hover:bg-primary-foreground/10 cursor-pointer"
              aria-label="Chat schliessen"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot size={28} className="text-primary" />
                </div>
                <div>
                  <p className="font-serif text-base font-semibold text-foreground">
                    Hallo! Wie kann ich helfen?
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Ich beantworte Fragen zu Leistungen,
                    <br />
                    Oeffnungszeiten &amp; Terminen.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-xs text-left px-3 py-2 rounded-xl border border-border bg-muted/50 hover:bg-muted hover:border-primary/40 transition-colors text-foreground/80 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Scissors size={14} className="text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                    >
                      <span className="whitespace-pre-wrap">{getMessageText(message)}</span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Scissors size={14} className="text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2">
                      <Loader2 size={16} className="text-muted-foreground animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht schreiben..."
                disabled={isLoading}
                className="flex-1 text-sm bg-muted rounded-xl px-3 py-2 outline-none border border-transparent focus:border-ring text-foreground placeholder:text-muted-foreground disabled:opacity-50 transition-colors"
                aria-label="Nachricht eingeben"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-primary/90 transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Nachricht senden"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="text-center text-[10px] text-muted-foreground mt-2">
              KI-Assistent · Powered by GPT-4o mini
            </p>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${
          open
            ? 'bg-foreground text-background scale-95'
            : 'bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl'
        }`}
        aria-label={open ? 'Chat schliessen' : 'Chat oeffnen'}
        aria-expanded={open}
      >
        <div className={`transition-all duration-300 ${open ? 'rotate-90 scale-90' : 'rotate-0'}`}>
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </div>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
        )}
      </button>
    </>
  )
}
