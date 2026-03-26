'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Heart, ArrowLeft } from 'lucide-react'

const roles = [
  { id: 'patient', label: 'Patient', icon: '🧑‍🤝‍🧑', desc: 'Book & manage appointments', email: 'patient.jane@medicare.com', password: 'Patient@1234', redirect: '/patient/dashboard' },
  { id: 'doctor', label: 'Doctor', icon: '👨‍⚕️', desc: 'Manage your patients', email: 'dr.smith@medicare.com', password: 'Doctor@1234', redirect: '/doctor/dashboard' },
  { id: 'admin', label: 'Admin', icon: '🏥', desc: 'Hospital overview & control', email: 'admin@medicare.com', password: 'Admin@1234', redirect: '/admin/dashboard' },
]

export default function LoginPage() {
  const router = useRouter()
  const [selected, setSelected] = useState(roles[0])
  const [email, setEmail] = useState(roles[0].email)
  const [password, setPassword] = useState(roles[0].password)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectRole = (r: typeof roles[0]) => {
    setSelected(r)
    setEmail(r.email)
    setPassword(r.password)
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 900))
    if (email === selected.email && password === selected.password) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_role', selected.id)
        localStorage.setItem('user_name', selected.id === 'patient' ? 'Jane Patient' : selected.id === 'doctor' ? 'Dr. Smith' : 'Admin User')
      }
      router.push(selected.redirect)
    } else {
      setError('Invalid credentials. Use the pre-filled demo credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-violet-50 flex flex-col">
      <header className="px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-600">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
            <Heart size={14} className="text-white" />
          </div>
          <span className="text-base font-bold gradient-text">MediCare Pro</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm animate-slide-up">
          <h1 className="text-2xl font-black text-slate-900 text-center mb-1">Welcome Back</h1>
          <p className="text-slate-500 text-center text-sm mb-6">Select your role to continue</p>

          {/* Role selector - horizontal */}
          <div className="scroll-x flex gap-2 pb-1 mb-6">
            {roles.map(r => (
              <button key={r.id} onClick={() => selectRole(r)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border-2 transition-all ${
                  selected.id === r.id
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}>
                <span className="text-2xl">{r.icon}</span>
                <span className={`text-xs font-bold ${selected.id === r.id ? 'text-primary-600' : 'text-slate-600'}`}>{r.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-3 mb-5 text-xs text-primary-700">
            <span className="font-bold">Demo credentials:</span> Email and password are pre-filled. Just click Login.
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                type="email" placeholder="Email address" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input value={password} onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400 pr-12"
                  placeholder="Password" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-slate-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3.5 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity=".3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
                  Signing in...
                </span>
              ) : `Login as ${selected.label}`}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-6">
            This is a demo platform. No real data is stored.
          </p>
        </div>
      </div>
    </div>
  )
}
