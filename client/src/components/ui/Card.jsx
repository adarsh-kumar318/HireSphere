import { cn } from '../../utils/cn'

function Card({ children, className = '', noPadding = false, hover = false }) {
  return (
    <div
      className={cn(
        'bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden',
        !noPadding ? 'p-5' : '',
        hover ? 'hover:border-indigo-500/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300' : '',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
