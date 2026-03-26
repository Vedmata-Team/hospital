'use client'
import { useState, useEffect } from 'react'
import { X, User } from 'lucide-react'

const roles = ['Hospital Owner', 'Hospital Admin', 'Doctor', 'Clinic Owner', 'Just Exploring']

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')
}

export default function LeadCaptureModal() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [role, setRole] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const seen = localStorage.getItem('medicare_lead_captured')
    if (!seen) {
      const t = setTimeout(() => setShow(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number')
      return
    }
    setLoading(true)

    try {
      // Submit to Netlify Forms
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'medicare-leads',
          name,
          mobile,
          role: role || 'Not selected',
        }),
      })

      // Save to localStorage as backup
      const leads = JSON.parse(localStorage.getItem('medicare_leads') || '[]')
      leads.push({ name, mobile, role, time: new Date().toISOString() })
      localStorage.setItem('medicare_leads', JSON.stringify(leads))
      localStorage.setItem('medicare_lead_captured', '1')

      // WhatsApp ping to you
      const msg = `🏥 *New Lead — MediCare Demo*%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Mobile:* ${mobile}%0A🏷️ *Role:* ${encodeURIComponent(role || 'Not selected')}%0A🕐 *Time:* ${encodeURIComponent(new Date().toLocaleString('en-IN'))}`
      window.open(`https://wa.me/919506933715?text=${msg}`, '_blank')

      setSubmitted(true)
      setTimeout(() => setShow(false), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 relative animate-slide-up">
        <button
          onClick={() => { setShow(false); localStorage.setItem('medicare_lead_captured', '1') }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X size={16} />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-5">
              <div className="text-4xl mb-3">🏥</div>
              <h2 className="text-xl font-black text-slate-900 leading-snug">
                Kya aapka bhi hospital hai? 🙏
              </h2>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Aap jo demo dekh rahe hain —{' '}
                <span className="font-semibold text-slate-700">exactly aisa hi software</span>{' '}
                aapke hospital ke liye bhi ban sakta hai.<br />
                <span className="text-blue-600 font-semibold">Apna naam aur number chhod jaiye</span> — hum aapse baat karenge. 🤝
              </p>
            </div>

            {/* Hidden Netlify form field */}
            <form
              name="medicare-leads"
              onSubmit={handleSubmit}
              className="space-y-3"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="medicare-leads" />
              <input type="hidden" name="bot-field" />

              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Aapka naam (Your Name)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">+91</span>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={e => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)); setError('') }}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <input type="hidden" name="role" value={role || 'Not selected'} />
              <div className="grid grid-cols-2 gap-2">
                {roles.map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`text-xs py-2 px-3 rounded-xl border font-semibold transition-all ${
                      role === r
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}>
                    {r}
                  </button>
                ))}
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-3.5 text-sm font-bold">
                {loading ? 'Saving...' : '🚀 Haan, Mujhe Chahiye Yeh Software!'}
              </button>
            </form>

            <div className="mt-4 bg-slate-50 rounded-xl px-4 py-3 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-2"><span>✅</span> Free demo call — koi charge nahi</div>
              <div className="flex items-center gap-2"><span>✅</span> Aapke hospital ke naam se customize hoga</div>
              <div className="flex items-center gap-2"><span>✅</span> IITian developer directly aapse baat karega</div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-black text-slate-900">Shukriya, {name} ji! 🙏</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Hum jald hi aapko call karenge.<br />
              Tab tak demo explore karein! 🏥
            </p>
            <div className="flex justify-center gap-1 mt-3 text-xl">🇮🇳 ❤️ 🏥</div>
          </div>
        )}
      </div>
    </div>
  )
}
