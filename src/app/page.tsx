'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Star, Check, Menu, X, ChevronRight, Heart, Zap, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { testimonials } from '@/lib/mockData'

const features = [
  { icon: '📅', title: 'Smart Appointments', desc: 'Book & manage appointments in seconds.' },
  { icon: '💬', title: 'Doctor Chat', desc: 'Real-time messaging for quick consultations.' },
  { icon: '🎥', title: 'Video Consultations', desc: 'Face-to-face care from anywhere.' },
  { icon: '📊', title: 'Health Analytics', desc: 'Detailed reports & AI-powered insights.' },
  { icon: '🔔', title: 'Smart Reminders', desc: 'Never miss a medication or appointment.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Enterprise-grade data security.' },
]

const stats = [
  { value: '50K+', label: 'Patients', icon: '🏥' },
  { value: '500+', label: 'Doctors', icon: '👨‍⚕️' },
  { value: '98%', label: 'Satisfaction', icon: '⭐' },
  { value: '120+', label: 'Hospitals', icon: '🇮🇳' },
]

const cardGradients = [
  'from-blue-600 to-violet-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-pink-600',
  'from-violet-600 to-indigo-700',
]

const roles = [
  { role: 'Patient', icon: '🤝', desc: 'Book & track care', href: '/login?role=patient', color: 'from-blue-50 to-blue-100 border-blue-200' },
  { role: 'Doctor', icon: '👨‍⚕️', desc: 'Manage your practice', href: '/login?role=doctor', color: 'from-violet-50 to-violet-100 border-violet-200' },
  { role: 'Admin', icon: '🏥', desc: 'Run your hospital', href: '/login?role=admin', color: 'from-emerald-50 to-emerald-100 border-emerald-200' },
]

const phoneScreens = [
  {
    role: 'Doctor Dashboard',
    icon: '👨‍⚕️',
    gradient: 'from-blue-600 to-violet-600',
    greeting: 'Good Morning, Dr. Arjun 👋',
    stats: [{ bg: 'bg-blue-600', label: 'Today', value: '12', sub: 'Appointments' }, { bg: 'bg-emerald-500', label: 'Patients', value: '980', sub: 'Total' }],
    list: { title: 'TODAY\'S PATIENTS', items: [{ name: 'Ananya Singh', time: '10:00 AM', status: 'bg-green-100 text-green-700', label: 'Now' }, { name: 'Rohan Kumar', time: '11:30 AM', status: 'bg-amber-100 text-amber-700', label: 'Pending' }, { name: 'Meera Patel', time: '12:00 PM', status: 'bg-blue-100 text-blue-700', label: 'Confirmed' }] },
    message: '"Doctor, chest pain since yesterday..."',
    nav: ['🏠', '📅', '💬', '👥'],
    activeNav: 0,
  },
  {
    role: 'Patient Dashboard',
    icon: '🤝',
    gradient: 'from-emerald-500 to-teal-600',
    greeting: 'Hello, Priya! 😊',
    stats: [{ bg: 'bg-emerald-500', label: 'Next Appt', value: 'Today', sub: '3:00 PM' }, { bg: 'bg-blue-500', label: 'Reports', value: '5', sub: 'Available' }],
    list: { title: 'MY APPOINTMENTS', items: [{ name: 'Dr. Arjun Sharma', time: '3:00 PM', status: 'bg-green-100 text-green-700', label: 'Today' }, { name: 'Dr. Meena Rao', time: 'Tomorrow', status: 'bg-blue-100 text-blue-700', label: 'Upcoming' }, { name: 'Dr. Vikram Das', time: 'Fri 10AM', status: 'bg-slate-100 text-slate-600', label: 'Scheduled' }] },
    message: '"Your prescription is ready to download"',
    nav: ['🏠', '📅', '💊', '👤'],
    activeNav: 0,
  },
  {
    role: 'Admin Dashboard',
    icon: '🏥',
    gradient: 'from-orange-500 to-pink-600',
    greeting: 'Good Morning, Admin 📊',
    stats: [{ bg: 'bg-orange-500', label: 'Revenue', value: '₹2.4L', sub: 'This Month' }, { bg: 'bg-pink-500', label: 'Doctors', value: '24', sub: 'Active' }],
    list: { title: 'TODAY\'S OVERVIEW', items: [{ name: 'OPD Patients', time: 'Today', status: 'bg-orange-100 text-orange-700', label: '142' }, { name: 'Surgeries', time: 'Scheduled', status: 'bg-red-100 text-red-700', label: '3' }, { name: 'Bed Occupancy', time: 'Current', status: 'bg-green-100 text-green-700', label: '87%' }] },
    message: '"New doctor registration request pending"',
    nav: ['🏠', '👥', '📊', '⚙️'],
    activeNav: 0,
  },
  {
    role: 'Appointments',
    icon: '📅',
    gradient: 'from-violet-600 to-indigo-700',
    greeting: 'Upcoming Schedule 📅',
    stats: [{ bg: 'bg-violet-600', label: 'Booked', value: '38', sub: 'This Week' }, { bg: 'bg-indigo-500', label: 'Completed', value: '21', sub: 'This Week' }],
    list: { title: 'NEXT APPOINTMENTS', items: [{ name: 'Suresh Nair', time: '2:00 PM', status: 'bg-violet-100 text-violet-700', label: 'Cardio' }, { name: 'Kavya Reddy', time: '2:30 PM', status: 'bg-indigo-100 text-indigo-700', label: 'Ortho' }, { name: 'Amit Joshi', time: '3:00 PM', status: 'bg-blue-100 text-blue-700', label: 'General' }] },
    message: '"Slot confirmed for Dr. Sharma at 4PM"',
    nav: ['🏠', '📅', '💬', '👥'],
    activeNav: 1,
  },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [screenIdx, setScreenIdx] = useState(0)
  const [fading, setFading] = useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setScreenIdx(i => (i + 1) % phoneScreens.length)
        setFading(false)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <Heart size={14} className="text-white" />
            </div>
            <span className="text-base font-black gradient-text">MediCare Pro</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            <Link href="/login" className="btn-outline py-1.5 px-4 text-sm">Log In</Link>
            <a href="tel:+919506933715" className="btn-primary py-1.5 px-4 text-sm flex items-center gap-1.5">
              <Phone size={13} /> Call Us
            </a>
          </div>

          {/* Mobile nav toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-xl bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1 animate-slide-up">
            <a href="#features" onClick={() => setMenuOpen(false)} className="py-3 text-slate-700 font-semibold border-b border-slate-50">Features</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="py-3 text-slate-700 font-semibold border-b border-slate-50">Reviews</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="py-3 text-slate-700 font-semibold border-b border-slate-50">Contact</a>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="py-3 text-blue-600 font-bold border-b border-slate-50">Log In</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)}
              className="relative mt-1 inline-flex items-center gap-2 py-3 px-4 rounded-xl font-bold text-sm border-2 border-green-500 text-green-600 bg-green-50">
              <span className="flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              🟢 Try Live Demo
            </Link>
            <a href="tel:+919506933715" className="mt-2 btn-primary w-full justify-center py-3 text-sm">
              <Phone size={15} /> Call Now: 9506933715
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 px-4 py-12 md:py-20">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-violet-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

          {/* LEFT — text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-bold mb-4">
              <Zap size={12} /> India's #1 Hospital Management Platform
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-3">
              Get More Patients &<br />
              <span className="gradient-text">Run Your Clinic in 7 Days</span>
            </h1>

            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-3 py-1 text-xs font-bold mb-4">
              🎓 Engineered by an IIT-Trained Developer
            </div>

            <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto md:mx-0 mb-6">
              One platform for patients, doctors & hospital admins. Cut wait times, boost revenue, delight patients.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-5">
              <a href="tel:+919506933715" className="btn-primary py-3 px-6 text-sm w-full sm:w-auto justify-center">
                <Phone size={16} /> Call Now: 9506933715
              </a>
              <Link href="/login"
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm border-2 border-green-500 text-green-600 bg-green-50 hover:bg-green-500 hover:text-white transition-all overflow-hidden group animate-pulse-slow">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                🟢 Try Live Demo
              </Link>
            </div>
            <div className="flex justify-center md:justify-start mb-6">
              <a href="https://wa.me/919506933715" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                <MessageCircle size={15} /> WhatsApp for a Quick Demo
              </a>
            </div>

            {/* Role login cards */}
            <p className="text-xs text-slate-400 font-semibold mb-2 tracking-wide text-center md:text-left">👇 TAP TO EXPLORE THE DEMO</p>
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto md:mx-0">
              {roles.map(r => (
                <Link key={r.role} href={r.href}
                  className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl border bg-gradient-to-br ${r.color} hover:shadow-md transition-all animate-pulse-slow hover:scale-105 active:scale-95`}>
                  <span className="text-xl">{r.icon}</span>
                  <div className="font-bold text-slate-900 text-xs">{r.role}</div>
                  <div className="text-[10px] text-slate-500 text-center leading-tight">{r.desc}</div>
                  <div className="text-[9px] font-bold text-blue-500 mt-0.5">👆 Click</div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — phone mockup */}
          <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
            <div className="relative animate-float">
              {/* Phone shell */}
              <div className="w-[220px] h-[420px] bg-slate-900 rounded-[36px] p-2 shadow-2xl ring-4 ring-slate-700">
                {/* Notch */}
                <div className="w-16 h-4 bg-slate-900 rounded-full mx-auto -mt-0 mb-1 flex items-center justify-center">
                  <div className="w-8 h-1.5 bg-slate-700 rounded-full" />
                </div>
                {/* Screen */}
                <div className="w-full h-full bg-slate-50 rounded-[28px] overflow-hidden flex flex-col">

                  {/* Status bar */}
                  <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 flex items-center justify-between">
                    <div>
                      <div className="text-white text-[8px] font-bold">MediCare Pro</div>
                      <div className="text-blue-200 text-[7px]">Doctor Dashboard</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-[9px]">👨‍⚕️</span>
                    </div>
                  </div>

                  {/* Dashboard content */}
                  <div className="flex-1 overflow-hidden px-2 py-2 space-y-2 bg-slate-50">

                    {/* Greeting */}
                    <div className="text-[9px] font-black text-slate-800">Good Morning, Dr. Arjun 👋</div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-blue-600 rounded-xl p-2">
                        <div className="text-white text-[8px] font-semibold opacity-80">Today</div>
                        <div className="text-white text-base font-black leading-none">12</div>
                        <div className="text-blue-200 text-[7px]">Appointments</div>
                      </div>
                      <div className="bg-emerald-500 rounded-xl p-2">
                        <div className="text-white text-[8px] font-semibold opacity-80">Patients</div>
                        <div className="text-white text-base font-black leading-none">980</div>
                        <div className="text-emerald-100 text-[7px]">Total</div>
                      </div>
                    </div>

                    {/* Next appointment */}
                    <div className="bg-white rounded-xl p-2 shadow-sm">
                      <div className="text-[8px] font-bold text-slate-500 mb-1">NEXT APPOINTMENT</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-[8px] font-black">A</div>
                        <div>
                          <div className="text-[9px] font-bold text-slate-800">Ananya Singh</div>
                          <div className="text-[7px] text-slate-400">10:00 AM · Cardiology</div>
                        </div>
                        <div className="ml-auto bg-green-100 text-green-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">Now</div>
                      </div>
                    </div>

                    {/* Patient list */}
                    <div className="bg-white rounded-xl p-2 shadow-sm">
                      <div className="text-[8px] font-bold text-slate-500 mb-1.5">TODAY'S PATIENTS</div>
                      {[
                        { name: 'Rohan Kumar', time: '11:30', status: 'bg-amber-100 text-amber-700', label: 'Pending' },
                        { name: 'Meera Patel', time: '12:00', status: 'bg-blue-100 text-blue-700', label: 'Confirmed' },
                        { name: 'Vijay Nair', time: '02:00', status: 'bg-green-100 text-green-700', label: 'Done' },
                      ].map((p, i) => (
                        <div key={i} className="flex items-center gap-1.5 py-1 border-b border-slate-50 last:border-0">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-[7px] font-black">{p.name[0]}</div>
                          <div className="flex-1">
                            <div className="text-[8px] font-semibold text-slate-700">{p.name}</div>
                            <div className="text-[7px] text-slate-400">{p.time} PM</div>
                          </div>
                          <div className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${p.status}`}>{p.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chat preview */}
                    <div className="bg-white rounded-xl p-2 shadow-sm">
                      <div className="text-[8px] font-bold text-slate-500 mb-1">💬 RECENT MESSAGE</div>
                      <div className="text-[8px] text-slate-600 italic">&ldquo;Doctor, chest pain since yesterday...&rdquo;</div>
                      <div className="text-[7px] text-blue-500 font-bold mt-0.5">Tap to reply →</div>
                    </div>

                  </div>

                  {/* Bottom nav */}
                  <div className="bg-white border-t border-slate-100 px-3 py-1.5 flex justify-around">
                    {['🏠','📅','💬','👥'].map((icon, i) => (
                      <div key={i} className={`text-sm ${i === 0 ? 'opacity-100' : 'opacity-40'}`}>{icon}</div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg animate-bounce">
                LIVE ●
              </div>
              {/* Floating label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-slate-500">
                👆 This is your dashboard
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Demo Brand Hint */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 py-3 px-4 text-center">
        <p className="text-white font-bold text-xs md:text-sm leading-snug">
          ✨ This is a demo — your hospital's name, logo & brand can replace this.{' '}
          <a href="tel:+919506933715" className="inline-block mt-1 sm:mt-0 sm:ml-2 bg-white text-orange-600 font-black px-3 py-0.5 rounded-full text-xs hover:bg-orange-50 transition-colors">
            Call Now →
          </a>
        </p>
      </div>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 rounded-full px-3 py-1 text-xs font-bold mb-2">⭐ Real Results</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Hospitals Love It.</h2>
            <p className="text-slate-500 mt-1 text-sm">From doctors to hospital directors — everyone's talking.</p>
          </div>

          {/* Auto-scroll row — no manual scroll needed */}
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-scroll-x" style={{ width: 'max-content' }}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i}
                  className={`flex-shrink-0 w-72 md:w-80 rounded-2xl p-5 bg-gradient-to-br ${cardGradients[i % cardGradients.length]} text-white shadow-lg relative overflow-hidden`}>
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-300 fill-yellow-300" />
                    ))}
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed mb-4 relative z-10">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-black text-xs">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{t.name}</div>
                      <div className="text-white/60 text-[10px]">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 py-8 px-4">
        <div className="grid grid-cols-4 gap-0 max-w-lg mx-auto">
          {stats.map((s, i) => (
            <div key={i} className={`text-center px-2 ${i < stats.length - 1 ? 'border-r border-white/20' : ''}`}>
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className="text-xl md:text-2xl font-black text-white">{s.value}</div>
              <div className="text-blue-100 text-[10px] md:text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features — alternating left/right */}
      <section id="features" className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-bold mb-2">Features</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Everything Your Hospital Needs</h2>
          </div>
          <div className="space-y-6">
            {features.map((f, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-100 flex items-center justify-center text-4xl shadow-inner">
                  {f.icon}
                </div>
                <div className={`flex-1 text-center ${i % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="font-black text-slate-900 text-base mb-1">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-2xl p-5">
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs font-bold mb-3">The Problem</div>
            <h3 className="font-black text-slate-900 text-lg mb-3">Hospitals Still Stuck in 2005</h3>
            <div className="space-y-2">
              {['Long queues & paper registers', 'Lost records & missed appointments', 'No visibility into performance', "Patients can't reach doctors easily"].map(p => (
                <div key={p} className="flex items-start gap-2">
                  <span className="text-red-500 font-black text-sm mt-0.5">✕</span>
                  <span className="text-slate-600 text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 rounded-2xl p-5">
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs font-bold mb-3">The Solution</div>
            <h3 className="font-black text-slate-900 text-lg mb-3">MediCare Pro Changes Everything</h3>
            <div className="space-y-2">
              {['One-click appointments from any device', 'Digital records, accessible anywhere', 'Real-time dashboards & revenue reports', 'Instant chat & video consultation'].map(s => (
                <div key={s} className="flex items-start gap-2">
                  <span className="text-green-500 font-black text-sm mt-0.5">✓</span>
                  <span className="text-slate-600 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-bold mb-3">💎 Flexible Pricing</div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900">Flexible Plans for Every Stage of Your Institute's Growth</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Choose a plan that scales with your patients, doctors, and ambitions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: 'Starter', badge: '', monthly: '₹999', yearly: '₹10,000',
                tagline: 'Built for emerging clinics aiming for structured growth.',
                accent: 'from-blue-500 to-blue-700', border: 'border-blue-100',
                btnLabel: 'Start Free Trial', btnStyle: 'bg-blue-600 text-white hover:bg-blue-700',
                waBtnStyle: 'border-blue-300 text-blue-600 hover:bg-blue-50',
                features: ['Up to 300 patients', 'Up to 5 doctor accounts', 'Smart appointment system', 'WhatsApp & SMS alerts', 'Performance dashboard', 'Email support'],
              },
              {
                name: 'Growth', badge: '🔥 Most Popular', monthly: '₹2,999', yearly: '₹30,000',
                tagline: 'Designed for clinics scaling their medical operations.',
                accent: 'from-violet-500 to-purple-700', border: 'border-violet-400 ring-2 ring-violet-400',
                btnLabel: 'Get Started', btnStyle: 'bg-violet-600 text-white hover:bg-violet-700',
                waBtnStyle: 'border-violet-300 text-violet-600 hover:bg-violet-50',
                features: ['Up to 800 patients', 'Up to 15 doctor accounts', 'Video consultations', 'Advanced analytics', 'Prescription management', 'Automation tools'],
              },
              {
                name: 'Pro', badge: '', monthly: '₹4,999', yearly: '₹50,000',
                tagline: 'For high-performance hospitals focused on results.',
                accent: 'from-amber-500 to-orange-600', border: 'border-amber-100',
                btnLabel: 'Upgrade Now', btnStyle: 'bg-amber-500 text-white hover:bg-amber-600',
                waBtnStyle: 'border-amber-300 text-amber-600 hover:bg-amber-50',
                features: ['Up to 2000 patients', 'Up to 40 doctor accounts', 'Full automation suite', 'Doctor performance tracking', 'CRM & lead management', 'Priority support'],
              },
              {
                name: 'Enterprise', badge: '', monthly: '₹6,999', yearly: '₹70,000',
                tagline: 'A complete digital infrastructure for multi-branch hospitals.',
                accent: 'from-rose-500 to-red-700', border: 'border-rose-100',
                btnLabel: 'Book a Demo', btnStyle: 'bg-rose-600 text-white hover:bg-rose-700',
                waBtnStyle: 'border-rose-300 text-rose-600 hover:bg-rose-50',
                features: ['Unlimited patients & doctors', 'Multi-branch management', 'Custom branding', 'API integrations', 'Dedicated account manager', 'Advanced reporting'],
              },
            ].map((plan, i) => (
              <div key={i} className={`relative bg-white rounded-2xl border-2 ${plan.border} p-5 flex flex-col shadow-sm hover:shadow-lg transition-all`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">{plan.badge}</div>
                )}
                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.accent} rounded-xl px-4 py-3 mb-4`}>
                  <div className="text-white/80 text-xs font-semibold">{plan.name}</div>
                  <div className="text-white text-2xl font-black">{plan.monthly}<span className="text-sm font-medium opacity-70"> /mo</span></div>
                  <div className="text-white/70 text-[11px] mt-0.5">{plan.yearly} / year</div>
                </div>
                <p className="text-slate-500 text-xs mb-4 leading-relaxed">{plan.tagline}</p>
                <div className="space-y-2 mb-5 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check size={12} className="text-green-500 flex-shrink-0" />{f}
                    </div>
                  ))}
                </div>
                {/* CTA button */}
                <a href="tel:+919506933715" className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-all mb-2 ${plan.btnStyle}`}>
                  {plan.btnLabel}
                </a>
                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/919506933715?text=${encodeURIComponent(`Hi! I'm interested in the *${plan.name}* plan (${plan.monthly}/mo) for MediCare Pro. Please share more details.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border-2 transition-all ${plan.waBtnStyle}`}>
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-xs mt-6">No setup fees. No hidden charges. Upgrade anytime as you grow.</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 px-4 bg-slate-50">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-bold mb-3">Get In Touch</div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">Talk to the Developer</h2>
          <p className="text-slate-500 text-sm mb-6">Free demo call. No commitment. IITian developer directly.</p>
          <div className="flex flex-col gap-3">
            <a href="tel:+919506933715"
              className="flex items-center justify-between bg-white border-2 border-blue-100 hover:border-blue-400 rounded-2xl px-5 py-4 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm">Call Now</div>
                  <div className="text-blue-600 text-xs font-semibold">9506933715</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://wa.me/919506933715" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between bg-white border-2 border-green-100 hover:border-green-400 rounded-2xl px-5 py-4 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm">WhatsApp</div>
                  <div className="text-green-600 text-xs font-semibold">Quick Response</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-green-500 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-600 to-violet-700 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ready to Transform Your Hospital?</h2>
          <p className="text-blue-100 text-sm mb-6">Setup takes less than 2 hours. Your brand. Your hospital. This exact platform.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919506933715"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-blue-700 bg-white hover:bg-blue-50 transition-all text-sm">
              <Phone size={16} /> Book Free Demo Call
            </a>
            <Link href="/login"
              className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-green-400 text-green-600 bg-green-50 hover:bg-green-500 hover:text-white transition-all overflow-hidden animate-pulse-slow">
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              🟢 Try Live Demo <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                  <Heart size={12} className="text-white" />
                </div>
                <span className="text-white font-bold text-sm">MediCare Pro</span>
              </div>
              <p className="text-xs max-w-xs">India's hospital management demo platform. Built by an IITian developer.</p>
            </div>
            <div className="flex gap-8 text-xs">
              <div className="space-y-2">
                <div className="text-white font-semibold">Product</div>
                <a href="#features" className="block hover:text-white">Features</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
              <div className="space-y-2">
                <div className="text-white font-semibold">Legal</div>
                <a href="#" className="block hover:text-white">Privacy</a>
                <a href="#" className="block hover:text-white">Terms</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-5 text-center text-xs">
            © 2026 MediCare Pro. All rights reserved. 🇮🇳 Made in India.
          </div>
        </div>
      </footer>
    </div>
  )
}
