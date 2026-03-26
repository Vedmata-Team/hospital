'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import { AdminBottomNav } from '@/components/BottomNav'
import { doctors } from '@/lib/mockData'
import { Plus, Search, Trash2, CheckCircle } from 'lucide-react'

export default function AdminDoctors() {
  const [docList, setDocList] = useState(doctors)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', specialty: '', fee: '' })
  const [added, setAdded] = useState(false)

  const addDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    setDocList(prev => [...prev, {
      id: prev.length + 1,
      name: form.name,
      specialty: form.specialty,
      rating: 4.5,
      patients: 0,
      available: true,
      avatar: '👨‍⚕️',
      exp: 'New',
      fee: form.fee || '₹500',
    }])
    setAdded(true)
    setTimeout(() => { setAdded(false); setShowForm(false); setForm({ name: '', specialty: '', fee: '' }) }, 1800)
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="Manage Doctors" subtitle={`${docList.length} registered`} />
        <div className="px-4 pt-4 max-w-lg mx-auto space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary-400" placeholder="Search doctors..." />
            </div>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary px-4 py-2.5 text-sm">
              <Plus size={18} />
            </button>
          </div>

          {showForm && (
            <div className="card animate-slide-up">
              {added ? (
                <div className="flex flex-col items-center py-4">
                  <CheckCircle size={36} className="text-green-500 mb-2" />
                  <p className="font-bold text-slate-900">Doctor Added!</p>
                </div>
              ) : (
                <form onSubmit={addDoctor} className="space-y-3">
                  <h3 className="font-bold text-slate-900">Add New Doctor</h3>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="Full Name (e.g. Dr. John Doe)" />
                  <select value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400 bg-white">
                    <option value="">Select Specialty</option>
                    {['Cardiology','Neurology','Orthopedic','Pediatrics','Dermatology','Psychiatry','Gynecology','ENT','Ophthalmology'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <input value={form.fee} onChange={e => setForm(f => ({ ...f, fee: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="Consultation Fee (e.g. ₹700)" />
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary flex-1 py-2.5 text-sm">Add Doctor</button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 py-2.5 text-sm">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="space-y-3">
            {docList.map(d => (
              <div key={d.id} className="card animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-sm font-bold text-white">{d.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900">{d.name}</div>
                    <div className="text-xs text-slate-500">{d.specialty} · {d.exp}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-amber-500">★ {d.rating}</span>
                      <span className="text-xs text-slate-400">{d.patients} patients</span>
                      <span className="text-xs font-bold text-primary-600">{d.fee}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`badge text-[10px] ${d.available ? 'status-confirmed' : 'bg-slate-100 text-slate-500'}`}>{d.available ? 'Active' : 'Busy'}</span>
                    <button onClick={() => setDocList(prev => prev.filter(x => x.id !== d.id))} className="p-1.5 rounded-lg bg-red-50 text-red-400">
                      <Trash2 size={13} />
                    </button>
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
