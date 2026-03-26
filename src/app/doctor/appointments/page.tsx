'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import { DoctorBottomNav } from '@/components/BottomNav'
import { appointments } from '@/lib/mockData'
import { Calendar, Clock, Check, X, Video } from 'lucide-react'
import VideoCallUI from '@/components/VideoCallUI'

export default function DoctorAppointments() {
  const [appts, setAppts] = useState(appointments)
  const [tab, setTab] = useState<'all'|'pending'|'confirmed'>('all')
  const [showVideo, setShowVideo] = useState(false)

  const filtered = tab === 'all' ? appts : appts.filter(a => a.status === tab)
  const update = (id: number, status: string) => setAppts(prev => prev.map(a => a.id === id ? { ...a, status } : a))

  return (
    <>
      {showVideo && <VideoCallUI onClose={() => setShowVideo(false)} />}
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="Appointments" />
        <div className="sticky top-[60px] z-30 bg-white border-b border-slate-100">
          <div className="scroll-x flex max-w-lg mx-auto px-4">
            {['all','pending','confirmed'].map(t => (
              <button key={t} onClick={() => setTab(t as any)}
                className={`flex-shrink-0 py-3 px-4 text-sm font-semibold border-b-2 capitalize transition-colors ${tab === t ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 pt-4 max-w-lg mx-auto space-y-3">
          {filtered.map(a => (
            <div key={a.id} className="card animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">{a.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{a.patient}</div>
                      <div className="text-xs text-slate-500">{a.type}</div>
                    </div>
                    <span className={`badge flex-shrink-0 text-[10px] ${a.status === 'confirmed' ? 'status-confirmed' : a.status === 'pending' ? 'status-pending' : a.status === 'cancelled' ? 'status-cancelled' : 'status-completed'}`}>{a.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar size={12} />{a.date}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={12} />{a.time}</span>
                  </div>
                  {a.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => update(a.id, 'confirmed')} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-50 text-green-600 text-xs font-semibold">
                        <Check size={14} /> Accept
                      </button>
                      <button onClick={() => update(a.id, 'cancelled')} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-semibold">
                        <X size={14} /> Decline
                      </button>
                      <button onClick={() => setShowVideo(true)} className="px-3 py-2 rounded-xl bg-blue-50 text-primary-600">
                        <Video size={14} />
                      </button>
                    </div>
                  )}
                  {a.status === 'confirmed' && (
                    <button onClick={() => setShowVideo(true)} className="mt-3 flex items-center gap-1.5 py-2 px-4 rounded-xl bg-primary-50 text-primary-600 text-xs font-semibold">
                      <Video size={14} /> Start Video Call
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DoctorBottomNav />
    </>
  )
}
