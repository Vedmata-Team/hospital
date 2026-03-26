'use client'
import TopBar from '@/components/TopBar'
import { AdminBottomNav } from '@/components/BottomNav'
import { adminStats } from '@/lib/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts'

const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444']

const weeklyPatients = [
  { day: 'Mon', patients: 42 },
  { day: 'Tue', patients: 58 },
  { day: 'Wed', patients: 35 },
  { day: 'Thu', patients: 71 },
  { day: 'Fri', patients: 65 },
  { day: 'Sat', patients: 28 },
  { day: 'Sun', patients: 19 },
]

export default function AdminReports() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        <TopBar title="Reports & Analytics" />
        <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
          {/* KPI strip */}
          <div className="scroll-x flex gap-3 pb-1">
            {[
              { label: 'Avg Wait Time', value: '12 min', icon: '⏱️', color: 'border-blue-400' },
              { label: 'Bed Occupancy', value: '78%', icon: '🛏️', color: 'border-amber-400' },
              { label: 'Recovery Rate', value: '94%', icon: '💚', color: 'border-green-400' },
              { label: 'Re-admissions', value: '3.2%', icon: '🔄', color: 'border-red-400' },
            ].map((k, i) => (
              <div key={i} className={`card flex-shrink-0 w-36 border-l-4 ${k.color}`}>
                <div className="text-2xl mb-1">{k.icon}</div>
                <div className="text-xl font-bold text-slate-900">{k.value}</div>
                <div className="text-xs text-slate-500">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Monthly Revenue */}
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Revenue (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={adminStats.monthlyRevenue} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(v: any) => [`₹${(v/100000).toFixed(2)}L`, 'Revenue']} />
                <Bar dataKey="value" radius={[6,6,0,0]} fill="url(#grad2)" />
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Patients */}
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Weekly Patient Visits</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={weeklyPatients} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: '#2563eb', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Appointments by specialty */}
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Appointments by Specialty</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={adminStats.appointmentsByType} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                    {adminStats.appointmentsByType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {adminStats.appointmentsByType.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-slate-600">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export buttons */}
          <div className="scroll-x flex gap-3 pb-1">
            {['Export PDF', 'Export CSV', 'Share Report', 'Schedule Email'].map(b => (
              <button key={b} className="flex-shrink-0 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      <AdminBottomNav />
    </>
  )
}
