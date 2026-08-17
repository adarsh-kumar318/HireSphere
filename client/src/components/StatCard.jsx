function StatCard({ title, label, value, icon: Icon, color, tone, subtitle, helper, className = '' }) {
  const displayTitle = title || label || ''
  const displaySubtitle = subtitle || helper || ''
  const activeColor = color || tone || 'primary'

  const colorMap = {
    primary: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  }

  const bgClass = colorMap[activeColor] || colorMap.primary

  return (
    <div className={`bg-[#1E293B] border border-[#334155] rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:border-indigo-500/20 transition-all duration-300 ${className}`}>
      <div className={`p-3 rounded-xl ${bgClass} flex-shrink-0`}>
        {Icon && <Icon size={22} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-slate-400 text-xs font-medium uppercase tracking-wider truncate">
          {displayTitle}
        </div>
        <div className="text-white text-2xl font-bold mt-1 tracking-tight truncate">
          {value}
        </div>
        {displaySubtitle && (
          <div className="text-slate-500 text-xs mt-1 truncate">
            {displaySubtitle}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
