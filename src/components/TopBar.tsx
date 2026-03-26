'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronLeft } from 'lucide-react'
import { notifications } from '@/lib/mockData'

interface TopBarProps {
  title: string
  subtitle?: string
  showBack?: boolean
  backHref?: string
  showNotifications?: boolean
}

export default function TopBar({ title, subtitle, showBack, backHref, showNotifications = true }: TopBarProps) {
  const [showNotif, setShowNotif] = useState(false)
  const unread = notifications.filter(n => !n.read).length

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {showBack && backHref && (
              <Link href={backHref} className="p-1.5 rounded-xl bg-slate-100 text-slate-600">
                <ChevronLeft size={20} />
              </Link>
            )}
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
            </div>
          </div>
          {showNotifications && (
            <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-xl bg-slate-100 text-slate-600">
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
          )}
        </div>
      </header>

      {showNotif && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setShowNotif(false)}>
          <div className="absolute top-16 right-4 w-80 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-card-hover border border-slate-100 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-900">Notifications</span>
              <span className="badge bg-red-100 text-red-600">{unread} new</span>
            </div>
            {notifications.map(n => (
              <div key={n.id} className={`p-4 flex gap-3 border-b border-slate-50 ${!n.read ? 'bg-blue-50/40' : ''}`}>
                <span className="text-lg">{n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                <div>
                  <p className="text-sm text-slate-800 font-medium">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
