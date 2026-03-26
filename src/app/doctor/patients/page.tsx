import TopBar from '@/components/TopBar'
import { DoctorBottomNav } from '@/components/BottomNav'
import { medicalHistory } from '@/lib/mockData'
import { Search, FileText } from 'lucide-react'

const patients = [
  { id: 1, name: 'Ananya Singh', age: 34, gender: 'F', condition: 'Hypertension', visits: 8, avatar: '👩', lastVisit: '2026-03-20' },
  { id: 2, name: 'Rohan Kumar', age: 45, gender: 'M', condition: 'Diabetes Type 2', visits: 12, avatar: '👨', lastVisit: '2026-03-18' },
  { id: 3, name: 'Meera Patel', age: 28, gender: 'F', condition: 'Anxiety', visits: 5, avatar: '👩', lastVisit: '2026-03-15' },
  { id: 4, name: 'Vijay Nair', age: 60, gender: 'M', condition: 'Heart Disease', visits: 20, avatar: '👨', lastVisit: '2026-03-12' },
  { id: 5, name: 'Kavita Shah', age: 38, gender: 'F', condition: 'Migraine', visits: 4, avatar: '👩', lastVisit: '2026-03-10' },
]

export default function DoctorPatients() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="My Patients" subtitle={`${patients.length} active patients`} />
        <div className="px-4 pt-4 max-w-lg mx-auto space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
            <input className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary-400" placeholder="Search patients..." />
          </div>
          <div className="space-y-3">
            {patients.map(p => (
              <div key={p.id} className="card animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl flex-shrink-0">{p.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.age}y · {p.gender === 'F' ? 'Female' : 'Male'}</div>
                      </div>
                      <span className="badge status-confirmed text-[10px]">{p.visits} visits</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">🩺 {p.condition}</span>
                      <span className="text-xs text-slate-400">Last: {p.lastVisit}</span>
                    </div>
                  </div>
                </div>
                <div className="scroll-x flex gap-2 mt-3 pt-3 border-t border-slate-50">
                  <button className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-50 text-primary-600 text-xs font-semibold">
                    <FileText size={12} /> View Records
                  </button>
                  <button className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-violet-50 text-violet-600 text-xs font-semibold">
                    💬 Chat
                  </button>
                  <button className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-green-50 text-green-600 text-xs font-semibold">
                    🎥 Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DoctorBottomNav />
    </>
  )
}
