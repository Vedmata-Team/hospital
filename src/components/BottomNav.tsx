'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, MessageCircle, User, BarChart2, Users, Stethoscope } from 'lucide-react'

interface NavItem { label: string; href: string; icon: React.ReactNode }

export function PatientBottomNav() {
  const path = usePathname()
  const items: NavItem[] = [
    { label: 'Home', href: '/patient/dashboard', icon: <Home size={22} /> },
    { label: 'Appointments', href: '/patient/appointments', icon: <Calendar size={22} /> },
    { label: 'Chat', href: '/patient/chat', icon: <MessageCircle size={22} /> },
    { label: 'Profile', href: '/patient/profile', icon: <User size={22} /> },
  ]
  return <BottomNavBar items={items} path={path} />
}

export function DoctorBottomNav() {
  const path = usePathname()
  const items: NavItem[] = [
    { label: 'Home', href: '/doctor/dashboard', icon: <Home size={22} /> },
    { label: 'Appointments', href: '/doctor/appointments', icon: <Calendar size={22} /> },
    { label: 'Patients', href: '/doctor/patients', icon: <Users size={22} /> },
    { label: 'Chat', href: '/doctor/chat', icon: <MessageCircle size={22} /> },
  ]
  return <BottomNavBar items={items} path={path} />
}

export function AdminBottomNav() {
  const path = usePathname()
  const items: NavItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart2 size={22} /> },
    { label: 'Doctors', href: '/admin/doctors', icon: <Stethoscope size={22} /> },
    { label: 'Patients', href: '/admin/patients', icon: <Users size={22} /> },
    { label: 'Reports', href: '/admin/reports', icon: <BarChart2 size={22} /> },
  ]
  return <BottomNavBar items={items} path={path} />
}

function BottomNavBar({ items, path }: { items: NavItem[]; path: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 safe-area-bottom">
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {items.map(item => {
          const active = path.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 flex-1 gap-0.5 transition-colors ${active ? 'text-primary-600' : 'text-slate-400'}`}>
              <span className={`transition-transform ${active ? 'scale-110' : ''}`}>{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
              {active && <span className="w-4 h-0.5 rounded-full bg-primary-600 mt-0.5" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
