interface StatCardProps {
  label: string
  value: string | number
  icon: string
  color: string
  sub?: string
}

export default function StatCard({ label, value, icon, color, sub }: StatCardProps) {
  return (
    <div className={`card flex-shrink-0 w-36 border-l-4 ${color} animate-fade-in`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
      <div className="text-xs font-medium text-slate-500 mt-0.5">{label}</div>
      {sub && <div className="text-[10px] text-slate-400 mt-1">{sub}</div>}
    </div>
  )
}
