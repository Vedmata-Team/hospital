'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Activity, Calendar, FileText, MessageCircle, Video, Plus, ChevronRight } from 'lucide-react'
import TopBar from '@/components/TopBar'
import { PatientBottomNav } from '@/components/BottomNav'
import StatCard from '@/components/StatCard'
import { appointments, doctors, medicalHistory } from '@/lib/mockData'
import VideoCallUI from '@/components/VideoCallUI'

export default function PatientDashboard() {
  const [showVideo, setShowVideo] = useState(false)
  const upcoming = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').slice(0, 3)

  return (
    <>
      {showVideo && <VideoCallUI onClose={() => setShowVideo(false)} />}
      <div className="min-h-screen bg-slate-50 pb-20">
        <TopBar title="MediCare Pro" subtitle="Good morning, Jane 👋" />

        <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
          {/* Stats - horizontal scroll */}
          <section>
            <div className="scroll-x flex gap-3 pb-1">
              <StatCard label="Appointments" value="4" icon="📅" color="border-blue-400" sub="This month" />
              <StatCard label="Prescriptions" value="2" icon="💊" color="border-violet-400" sub="Active" />
              <StatCard label="Reports" value="3" icon="📋" color="border-green-400" sub="Pending" />
              <StatCard label="Next Visit" value="27 Mar" icon="🗓️" color="border-amber-400" sub="10:00 AM" />
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Quick Actions</h2>
            <div className="scroll-x flex gap-3 pb-1">
              {[
                { label: 'Book Appointment', icon: <Calendar size={20} />, href: '/patient/appointments', color: 'from-blue-500 to-blue-600' },
                { label: 'Chat Doctor', icon: <MessageCircle size={20} />, href: '/patient/chat', color: 'from-violet-500 to-violet-600' },
                { label: 'Video Call', icon: <Video size={20} />, onClick: () => setShowVideo(true), color: 'from-emerald-500 to-emerald-600' },
                { label: 'My Reports', icon: <FileText size={20} />, href: '/patient/profile', color: 'from-amber-500 to-amber-600' },
              ].map((a, i) => (
                a.href ? (
                  <Link key={i} href={a.href}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 w-[90px] py-4 px-2 rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-sm active:scale-95 transition-transform`}>
                    {a.icon}
                    <span className="text-[11px] font-semibold text-center leading-tight">{a.label}</span>
                  </Link>
                ) : (
                  <button key={i} onClick={a.onClick}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 w-[90px] py-4 px-2 rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-sm active:scale-95 transition-transform`}>
                    {a.icon}
                    <span className="text-[11px] font-semibold text-center leading-tight">{a.label}</span>
                  </button>
                )
              ))}
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Upcoming</h2>
              <Link href="/patient/appointments" className="text-xs font-semibold text-primary-600 flex items-center gap-1">See all <ChevronRight size={12} /></Link>
            </div>
            <div className="space-y-3">
              {upcoming.map(a => (
                <div key={a.id} className="card flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">{a.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 truncate">{a.doctor}</div>
                    <div className="text-xs text-slate-500">{a.type}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{a.date} • {a.time}</div>
                  </div>
                  <span className={`badge ${a.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Doctors - horizontal scroll */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Top Doctors</h2>
              <Link href="/patient/appointments" className="text-xs font-semibold text-primary-600 flex items-center gap-1">Book <ChevronRight size={12} /></Link>
            </div>
            <div className="scroll-x flex gap-3 pb-1">
              {doctors.filter(d => d.available).map(d => (
                <div key={d.id} className="card flex-shrink-0 w-44 text-center">
                  <div className="text-sm font-bold text-slate-700">{d.avatar}</div>
                  <div className="font-bold text-sm text-slate-900 leading-tight">{d.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{d.specialty}</div>
                  <div className="flex items-center justify-center gap-1 mt-1.5">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-xs font-semibold text-slate-700">{d.rating}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{d.exp}</span>
                  </div>
                  <div className="text-xs font-bold text-primary-600 mt-1">{d.fee}</div>
                  <Link href="/patient/appointments"
                    className="mt-2.5 block text-xs font-semibold py-2 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Medical History - horizontal scroll */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Medical History</h2>
            </div>
            <div className="scroll-x flex gap-3 pb-1">
              {medicalHistory.map(h => (
                <div key={h.id} className="card flex-shrink-0 w-56">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">{h.date}</span>
                    <span className={`badge text-[10px] ${h.status === 'Ongoing' ? 'status-confirmed' : h.status === 'Resolved' ? 'status-completed' : 'status-pending'}`}>{h.status}</span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">{h.condition}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{h.doctor}</div>
                  <div className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{h.notes}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <PatientBottomNav />
    </>
  )
}
