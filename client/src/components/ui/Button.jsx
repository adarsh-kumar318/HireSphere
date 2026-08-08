import { cn } from '../../utils/cn'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-[#334155] rounded-xl px-5 py-2.5 font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 rounded-xl px-5 py-2.5 font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 rounded-xl px-5 py-2.5 font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: '',
  lg: 'px-7 py-3.5 text-base',
  xl: 'px-9 py-4 text-lg',
}

function Button({ children, variant = 'primary', size = 'md', className = '', disabled = false, loading = false, type = 'button', onClick, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(variants[variant], sizes[size], disabled || loading ? 'opacity-60 cursor-not-allowed' : '', className)}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
