import { cn } from '../../utils/cn'

function Avatar({ name = 'User', src, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  }

  const initial = name ? name.charAt(0).toUpperCase() : 'U'

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold flex-shrink-0",
        src ? 'bg-transparent' : 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover rounded-full" />
      ) : (
        initial
      )}
    </div>
  )
}

export default Avatar
