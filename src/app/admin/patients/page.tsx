'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import { AdminBottomNav } from '@/components/BottomNav'
import { Search, UserX } from 'lucide-react'

const patientsList = [
  { id: 1, name: 'Ananya Singh', age: 34, condition: 'Hypertension', doctor: 'Dr. Priya Sharma', status: 'Active', avatar: '👩', lastVisit: '2026-03-20', phone: '+91 98765 43210' },
  { id: 2, name: 'Rohan Kumar', age: 45, condition: 'Diabetes Type 2', doctor: 'Dr. Arjun Mehta', status: 'Active', avatar: '👨', lastVisit: '2026-03-18', phone: '+91 87654 32109' },
  { id: 3, name: 'Meera Patel', age: 28, condition: 'Anxiety', doctor: 'Dr. Rahul Bose', status: 'Active', avatar: '👩', lastVisit: '2026-03-15', phone: '+91 76543 21098' },
  { id: 4, name: 'Vijay Nair', age: 60, condition: 'Heart Disease', doctor: 'Dr. Priya Sharma', status: 'Critical', avatar: '👨', lastVisit: '2026-03-12', phone: '+91 65432 10987' },
  { id: 5, name: 'Kavita Shah', age: 38, condition: 'Migraine', doctor: 'Dr. Neha Gupta', status: 'Discharged', avatar: '👩', lastVisit: '2026-03-10', phone: '+91 54321 09876' },
  { id: 6, name: 'Arjun Gupta', age: 52, condition: 'Knee Pain', doctor: 'Dr. Sunita Rao', status: 'Active', avatar: '👨', lastVisit: '2026-03-08', phone: '+91 43210 98765' },
]

export default function AdminPatients() {
  const [list, setList] = useState(patientsList)
  const [query, setQuery] = useState('')

  const filtered = list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.condition.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="Patients" subtitle={`${list.length} registered`} />
        <div className="px-4 pt-4 max-w-lg mx-auto space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary-400" placeholder="Search patients or conditions..." />
          </div>

          {/* Summary strip */}
          <div className="scroll-x flex gap-3 pb-1">
            {[
              { label: 'Total', value: list.length, color: 'bg-blue-50 text-blue-700' },
              { label: 'Active', value: list.filter(p => p.status === 'Active').length, color: 'bg-green-50 text-green-700' },
              { label: 'Critical', value: list.filter(p => p.status === 'Critical').length, color: 'bg-red-50 text-red-700' },
              { label: 'Discharged', value: list.filter(p => p.status === 'Discharged').length, color: 'bg-slate-100 text-slate-600' },
            ].map(s => (
              <div key={s.label} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl ${s.color} font-semibold text-sm`}>
                <span className="text-xl font-black">{s.value}</span>
                <span className="text-xs font-medium">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="card animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">{p.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.age}y · {p.phone}</div>
                      </div>
                      <span className={`badge text-[10px] flex-shrink-0 ${p.status === 'Active' ? 'status-confirmed' : p.status === 'Critical' ? 'status-cancelled' : 'bg-slate-100 text-slate-500'}`}>{p.status}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">🩺 {p.condition}</div>
                    <div className="text-xs text-slate-400">Dr: {p.doctor} · {p.lastVisit}</div>
                    <div className="scroll-x flex gap-2 mt-3 pt-3 border-t border-slate-50">
                      <button className="flex-shrink-0 text-xs font-semibold py-1.5 px-3 rounded-lg bg-blue-50 text-primary-600">View Records</button>
                      <button className="flex-shrink-0 text-xs font-semibold py-1.5 px-3 rounded-lg bg-violet-50 text-violet-600">Schedule</button>
                      <button onClick={() => setList(prev => prev.filter(x => x.id !== p.id))} className="flex-shrink-0 text-xs font-semibold py-1.5 px-3 rounded-lg bg-red-50 text-red-500 flex items-center gap-1">
                        <UserX size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminBottomNav />
    </>
  )
}
