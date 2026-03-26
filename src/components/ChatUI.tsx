'use client'
import { useState } from 'react'
import { Send, Phone, Video } from 'lucide-react'
import { chatMessages } from '@/lib/mockData'

export default function ChatUI({ doctorName = 'Dr. Priya Sharma' }: { doctorName?: string }) {
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      from: 'patient',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        from: 'doctor',
        text: 'Thank you for sharing that. I will review and get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-xl">👩‍⚕️</div>
          <div>
            <div className="font-semibold text-sm text-slate-900">{doctorName}</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft" /><span className="text-xs text-green-600">Online</span></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-slate-100 text-slate-600"><Phone size={18} /></button>
          <button className="p-2 rounded-xl bg-primary-600 text-white"><Video size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.from === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
              m.from === 'patient'
                ? 'bg-gradient-to-br from-primary-600 to-violet-600 text-white rounded-br-sm'
                : 'bg-white text-slate-800 shadow-card rounded-bl-sm'
            }`}>
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === 'patient' ? 'text-blue-200' : 'text-slate-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button onClick={send} className="p-2.5 rounded-xl bg-primary-600 text-white">
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
