'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Check, X, Video } from 'lucide-react'
import TopBar from '@/components/TopBar'
import { DoctorBottomNav } from '@/components/BottomNav'
import StatCard from '@/components/StatCard'
import { appointments, doctors } from '@/lib/mockData'
import VideoCallUI from '@/components/VideoCallUI'

export default function DoctorDashboard() {
  const [appts, setAppts] = useState(appointments)
  const [showVideo, setShowVideo] = useState(false)

  const pending = appts.filter(a => a.status === 'pending')
  const todayAppts = appts.filter(a => a.date === '2026-03-27').slice(0, 4)

  const update = (id: number, status: string) => setAppts(prev => prev.map(a => a.id === id ? { ...a, status } : a))

  return (
    <>
      {showVideo && <VideoCallUI onClose={() => setShowVideo(false)} />}
      <div className="min-h-screen bg-slate-50 pb-20">
        <TopBar title="Doctor Portal" subtitle="Dr. Smith · Cardiologist 👨‍⚕️" />

        <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
          {/* Stats */}
          <div className="scroll-x flex gap-3 pb-1">
            <StatCard label="Today's Patients" value={todayAppts.length} icon="👥" color="border-blue-400" />
            <StatCard label="Pending" value={pending.length} icon="⏳" color="border-amber-400" />
            <StatCard label="This Month" value="87" icon="📅" color="border-violet-400" />
            <StatCard label="Rating" value="4.9★" icon="⭐" color="border-green-400" />
          </div>

          {/* Quick actions */}
          <div className="scroll-x flex gap-3 pb-1">
            {[
              { label: 'Appointments', href: '/doctor/appointments', icon: '📅', color: 'from-blue-500 to-blue-600' },
              { label: 'Patients', href: '/doctor/patients', icon: '👥', color: 'from-violet-500 to-violet-600' },
              { label: 'Video Call', onClick: () => setShowVideo(true), icon: '🎥', color: 'from-emerald-500 to-emerald-600' },
              { label: 'Chat', href: '/doctor/chat', icon: '💬', color: 'from-amber-500 to-amber-600' },
            ].map((a, i) => (
              a.href ? (
                <Link key={i} href={a.href}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 w-[90px] py-4 px-2 rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-sm active:scale-95 transition-transform`}>
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-[11px] font-semibold text-center">{a.label}</span>
                </Link>
              ) : (
                <button key={i} onClick={a.onClick}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 w-[90px] py-4 px-2 rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-sm active:scale-95 transition-transform`}>
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-[11px] font-semibold text-center">{a.label}</span>
                </button>
              )
            ))}
          </div>

          {/* Pending approvals */}
          {pending.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Pending Approvals ({pending.length})</h2>
              <div className="space-y-3">
                {pending.map(a => (
                  <div key={a.id} className="card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">{a.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 truncate">{a.patient}</div>
                        <div className="text-xs text-slate-500">{a.date} · {a.time}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => update(a.id, 'confirmed')} className="p-2 rounded-xl bg-green-100 text-green-600"><Check size={16} /></button>
                        <button onClick={() => update(a.id, 'cancelled')} className="p-2 rounded-xl bg-red-100 text-red-500"><X size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Today's schedule */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Today's Schedule</h2>
              <Link href="/doctor/appointments" className="text-xs font-semibold text-primary-600 flex items-center gap-1">All <ChevronRight size={12} /></Link>
            </div>
            <div className="space-y-3">
              {todayAppts.map(a => (
                <div key={a.id} className="card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg flex-shrink-0">{a.initials}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-slate-900">{a.patient}</div>
                    <div className="text-xs text-slate-500">{a.type} · {a.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge text-[10px] ${a.status === 'confirmed' ? 'status-confirmed' : a.status === 'pending' ? 'status-pending' : 'status-completed'}`}>{a.status}</span>
                    <button onClick={() => setShowVideo(true)} className="p-1.5 rounded-lg bg-blue-50 text-primary-600"><Video size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <DoctorBottomNav />
    </>
  )
}
