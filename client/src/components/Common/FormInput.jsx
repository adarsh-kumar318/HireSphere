function FormInput({ label, name, error, as = 'input', children, ...props }) {
  const Control = as

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      {as === 'select' ? (
        <select className={`form-select ${error ? 'is-invalid' : ''}`} id={name} name={name} {...props}>
          {children}
        </select>
      ) : (
        <Control className={`form-control ${error ? 'is-invalid' : ''}`} id={name} name={name} {...props}>
          {children}
        </Control>
      )}
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  )
}

export default FormInput
