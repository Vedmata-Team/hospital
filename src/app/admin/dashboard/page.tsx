'use client'
import Link from 'next/link'
import { ChevronRight, TrendingUp, Users, Stethoscope, Calendar } from 'lucide-react'
import TopBar from '@/components/TopBar'
import { AdminBottomNav } from '@/components/BottomNav'
import StatCard from '@/components/StatCard'
import { adminStats, appointments, doctors } from '@/lib/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

export default function AdminDashboard() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20">
        <TopBar title="Admin Panel" subtitle="Hospital Overview 🏥" />

        <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
          {/* Key stats - horizontal scroll */}
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Overview</h2>
            <div className="scroll-x flex gap-3 pb-1">
              <StatCard label="Total Patients" value={adminStats.totalPatients.toLocaleString()} icon="🧑‍🤝‍🧑" color="border-blue-400" sub="+12% this month" />
              <StatCard label="Doctors" value={adminStats.totalDoctors} icon="👨‍⚕️" color="border-violet-400" sub="42 active" />
              <StatCard label="Today's Appts" value={adminStats.todayAppointments} icon="📅" color="border-emerald-400" />
              <StatCard label="Revenue" value={adminStats.revenue} icon="💰" color="border-amber-400" sub="This month" />
              <StatCard label="Bed Occupancy" value={`${adminStats.bedOccupancy}%`} icon="🏥" color="border-red-400" />
              <StatCard label="Satisfaction" value={`${adminStats.satisfaction}%`} icon="⭐" color="border-green-400" />
            </div>
          </section>

          {/* Revenue Chart */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Monthly Revenue</h2>
              <Link href="/admin/reports" className="text-xs font-semibold text-primary-600 flex items-center gap-1">Reports <ChevronRight size={12} /></Link>
            </div>
            <div className="card">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={adminStats.monthlyRevenue} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
                  <Tooltip formatter={(v: any) => [`₹${(v/100000).toFixed(2)}L`, 'Revenue']} />
                  <Bar dataKey="value" fill="url(#grad)" radius={[6,6,0,0]} />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Quick nav */}
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Manage</h2>
            <div className="scroll-x flex gap-3 pb-1">
              {[
                { label: 'Doctors', icon: '👨‍⚕️', count: '42 active', href: '/admin/doctors', color: 'from-violet-500 to-violet-600' },
                { label: 'Patients', icon: '🧑‍🤝‍🧑', count: '3,847 total', href: '/admin/patients', color: 'from-blue-500 to-blue-600' },
                { label: 'Appointments', icon: '📅', count: '128 today', href: '/admin/reports', color: 'from-emerald-500 to-emerald-600' },
                { label: 'Reports', icon: '📊', count: 'Analytics', href: '/admin/reports', color: 'from-amber-500 to-amber-600' },
              ].map((a, i) => (
                <Link key={i} href={a.href}
                  className={`flex-shrink-0 flex flex-col items-start gap-1 w-36 p-4 rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-sm active:scale-95 transition-transform`}>
                  <span className="text-2xl">{a.icon}</span>
                  <span className="font-bold text-sm">{a.label}</span>
                  <span className="text-xs text-white/80">{a.count}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent appointments */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Recent Appointments</h2>
            </div>
            <div className="space-y-2">
              {appointments.slice(0, 4).map(a => (
                <div key={a.id} className="card flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-lg flex-shrink-0">{a.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 truncate">{a.patient}</div>
                    <div className="text-xs text-slate-400">{a.doctor} · {a.time}</div>
                  </div>
                  <span className={`badge flex-shrink-0 text-[10px] ${a.status === 'confirmed' ? 'status-confirmed' : a.status === 'pending' ? 'status-pending' : a.status === 'cancelled' ? 'status-cancelled' : 'status-completed'}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Doctors on duty - horizontal */}
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Doctors on Duty</h2>
            <div className="scroll-x flex gap-3 pb-1">
              {doctors.map(d => (
                <div key={d.id} className="card flex-shrink-0 w-40 text-center">
                  <div className="text-sm font-bold text-slate-700">{d.avatar}</div>
                  <div className="font-bold text-xs text-slate-900 leading-tight">{d.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{d.specialty}</div>
                  <div className={`badge mt-2 text-[10px] ${d.available ? 'status-confirmed' : 'bg-slate-100 text-slate-500'}`}>
                    {d.available ? 'Available' : 'Busy'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <AdminBottomNav />
    </>
  )
}
