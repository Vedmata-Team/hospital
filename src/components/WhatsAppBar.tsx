'use client'
import { MessageCircle, Phone } from 'lucide-react'

const ticker = [
  '🇮🇳 Made in India · Built by IITians',
  '🏥 This is a LIVE Demo — Your hospital can look exactly like this!',
  '📞 Call 9506933715 to get this for your hospital',
  '🎓 Engineered by an IIT-trained developer',
  '✅ 100% Indian product · Indian servers · Indian support',
]

export default function WhatsAppBar() {
  return (
    <>
      {/* Top ticker */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-500 via-white to-green-600 h-7 overflow-hidden flex items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-bold">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="text-slate-800 px-4">{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-700 px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm flex-shrink-0">🇮🇳</span>
          <span className="text-white text-xs font-bold truncate">IITian Developer</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="tel:+919506933715"
            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
            <Phone size={11} /> Call
          </a>
          <a href="https://wa.me/919506933715" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
            <MessageCircle size={11} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
