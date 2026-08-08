const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
  as = "input",
  rows = 4,
  children,
  required = false,
  disabled = false,
  className = "",
}) => {
  const baseClasses = `
    w-full rounded-xl border px-4 py-3 text-sm
    bg-white text-slate-900
    border-slate-300
    placeholder:text-slate-400
    transition-all duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500/20
    focus:border-blue-500
    dark:bg-slate-900
    dark:text-white
    dark:border-slate-700
    dark:placeholder:text-slate-500
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
    ${disabled ? "cursor-not-allowed opacity-60" : ""}
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses}resize-none`}
        />
      ) : as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseClasses}
        >
          {children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
        />
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;