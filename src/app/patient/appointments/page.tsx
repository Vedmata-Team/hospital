'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import { PatientBottomNav } from '@/components/BottomNav'
import { appointments, doctors } from '@/lib/mockData'
import { Calendar, Clock, Plus, X, CheckCircle } from 'lucide-react'

export default function PatientAppointments() {
  const [tab, setTab] = useState<'upcoming'|'past'|'book'>('upcoming')
  const [form, setForm] = useState({ doctor: '', date: '', time: '', reason: '' })
  const [success, setSuccess] = useState(false)
  const [localAppts, setLocalAppts] = useState(appointments)

  const upcoming = localAppts.filter(a => a.status !== 'completed' && a.status !== 'cancelled')
  const past = localAppts.filter(a => a.status === 'completed' || a.status === 'cancelled')

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    const doc = doctors.find(d => d.id === Number(form.doctor))
    if (!doc) return
    setLocalAppts(prev => [...prev, {
      id: prev.length + 1,
      patient: 'Jane Patient',
      doctor: doc.name,
      date: form.date,
      time: form.time,
      status: 'pending',
      type: doc.specialty,
      initials: 'JP',
    }])
    setSuccess(true)
    setTimeout(() => { setSuccess(false); setTab('upcoming'); setForm({ doctor: '', date: '', time: '', reason: '' }) }, 2500)
  }

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'book', label: '+ Book New' },
  ]

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="Appointments" />

        {/* Tab bar */}
        <div className="sticky top-[60px] z-30 bg-white border-b border-slate-100">
          <div className="scroll-x flex max-w-lg mx-auto px-4">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`flex-shrink-0 py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
                  tab === t.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>{t.label}</button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4 max-w-lg mx-auto">
          {tab === 'upcoming' && (
            <div className="space-y-3">
              {upcoming.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Calendar size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No upcoming appointments</p>
                  <button onClick={() => setTab('book')} className="btn-primary mt-4 text-sm py-2.5 px-5">Book Now</button>
                </div>
              ) : upcoming.map(a => <AppointmentCard key={a.id} appt={a} />)}
            </div>
          )}

          {tab === 'past' && (
            <div className="space-y-3">
              {past.map(a => <AppointmentCard key={a.id} appt={a} />)}
            </div>
          )}

          {tab === 'book' && (
            <div className="animate-slide-up">
              {success ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Appointment Booked!</h2>
                  <p className="text-slate-500 text-sm">Your appointment is pending confirmation from the doctor.</p>
                </div>
              ) : (
                <form onSubmit={submitBooking} className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Book Appointment</h2>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Select Doctor</label>
                    <div className="scroll-x flex gap-2 pb-1">
                      {doctors.filter(d => d.available).map(d => (
                        <button key={d.id} type="button" onClick={() => setForm(f => ({ ...f, doctor: String(d.id) }))}
                          className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all w-28 ${
                            form.doctor === String(d.id) ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white'
                          }`}>
                          <span className="text-2xl">{d.avatar}</span>
                          <span className="text-xs font-bold text-slate-800 text-center leading-tight">{d.name.split(' ').slice(-1)[0]}</span>
                          <span className="text-[10px] text-slate-500">{d.specialty}</span>
                          <span className="text-[10px] font-bold text-primary-600">{d.fee}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                      <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Time</label>
                      <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} required
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400 bg-white">
                        <option value="">Pick time</option>
                        {['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'].map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason for Visit</label>
                    <textarea value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-400 bg-white resize-none"
                      rows={3} placeholder="Describe your symptoms..." />
                  </div>

                  <button type="submit" className="btn-primary w-full py-3.5 text-base">
                    <Calendar size={18} /> Confirm Booking
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <PatientBottomNav />
    </>
  )
}

function AppointmentCard({ appt }: { appt: any }) {
  return (
    <div className="card animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-sm font-bold text-white">{appt.initials}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-bold text-slate-900">{appt.doctor}</div>
              <div className="text-xs text-slate-500">{appt.type}</div>
            </div>
            <span className={`badge flex-shrink-0 ${
              appt.status === 'confirmed' ? 'status-confirmed'
              : appt.status === 'pending' ? 'status-pending'
              : appt.status === 'cancelled' ? 'status-cancelled'
              : 'status-completed'
            }`}>{appt.status}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={12} /> {appt.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} /> {appt.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
