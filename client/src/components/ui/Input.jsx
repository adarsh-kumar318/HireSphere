import { cn } from '../../utils/cn'

function Input({ label, name, error, className = '', icon: Icon, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
            <Icon size={16} />
          </div>
        )}
        <input
          id={name}
          name={name}
          className={cn(
            'form-input',
            Icon ? 'pl-9' : '',
            error ? 'border-red-500 focus:border-red-500 focus:shadow-none' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default Input
