'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'
import { PatientBottomNav } from '@/components/BottomNav'
import { medicalHistory } from '@/lib/mockData'
import { LogOut, Edit2, FileText, Heart, Activity, Droplets } from 'lucide-react'

export default function PatientProfile() {
  const router = useRouter()
  const logout = () => {
    if (typeof window !== 'undefined') localStorage.clear()
    router.push('/login')
  }

  const vitals = [
    { label: 'Blood Pressure', value: '120/80', icon: <Activity size={16} className="text-red-500" />, status: 'Normal' },
    { label: 'Heart Rate', value: '72 bpm', icon: <Heart size={16} className="text-pink-500" />, status: 'Normal' },
    { label: 'Blood Sugar', value: '95 mg/dL', icon: <Droplets size={16} className="text-blue-500" />, status: 'Normal' },
    { label: 'BMI', value: '22.4', icon: <Activity size={16} className="text-green-500" />, status: 'Healthy' },
  ]

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="My Profile" />
        <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
          {/* Profile card */}
          <div className="card bg-gradient-to-br from-primary-600 to-violet-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">👩</div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">Jane Patient</h2>
                <p className="text-blue-100 text-sm">Patient ID: #PAT-2847</p>
                <p className="text-blue-100 text-xs mt-0.5">patient.jane@medicare.com</p>
              </div>
              <button className="p-2 rounded-xl bg-white/20"><Edit2 size={16} /></button>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-3 text-center text-sm">
              <div><div className="font-bold">28</div><div className="text-blue-200 text-xs">Age</div></div>
              <div><div className="font-bold">Female</div><div className="text-blue-200 text-xs">Gender</div></div>
              <div><div className="font-bold">B+</div><div className="text-blue-200 text-xs">Blood Type</div></div>
            </div>
          </div>

          {/* Vitals - horizontal */}
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Latest Vitals</h2>
            <div className="scroll-x flex gap-3 pb-1">
              {vitals.map((v, i) => (
                <div key={i} className="card flex-shrink-0 w-36 text-center">
                  <div className="flex items-center justify-center mb-1">{v.icon}</div>
                  <div className="text-lg font-bold text-slate-900">{v.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{v.label}</div>
                  <div className="badge mt-1.5 status-confirmed text-[10px]">{v.status}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Medical history */}
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Medical History</h2>
            <div className="space-y-3">
              {medicalHistory.map(h => (
                <div key={h.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <FileText size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm text-slate-900">{h.condition}</div>
                        <div className="text-xs text-slate-500">{h.doctor} · {h.date}</div>
                        <div className="text-xs text-slate-400 mt-1 leading-relaxed">{h.notes}</div>
                      </div>
                    </div>
                    <span className={`badge flex-shrink-0 text-[10px] ${h.status === 'Ongoing' ? 'status-confirmed' : h.status === 'Resolved' ? 'status-completed' : 'status-pending'}`}>{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Logout */}
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>
      <PatientBottomNav />
    </>
  )
}
