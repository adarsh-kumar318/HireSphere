function Filters({ filters = [], values = {}, onChange }) {
  return (
    <div className="row g-2">
      {filters.map((filter) => (
        <div className="col-12 col-md" key={filter.name}>
          <select
            className="form-select"
            value={values[filter.name] || ''}
            onChange={(event) => onChange(filter.name, event.target.value)}
            aria-label={filter.label}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

export default Filters
