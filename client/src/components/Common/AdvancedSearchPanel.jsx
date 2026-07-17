import { gigCategories } from '../../utils/constants'

function AdvancedSearchPanel({ filters, onChange, onReset }) {
  const update = (name, value) => onChange({ ...filters, [name]: value })

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="searchQuery">Search</label>
            <input
              id="searchQuery"
              className="form-control"
              value={filters.query}
              onChange={(event) => update('query', event.target.value)}
              placeholder="Skill, gig, freelancer"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="searchLocation">Location</label>
            <input
              id="searchLocation"
              className="form-control"
              value={filters.location}
              onChange={(event) => update('location', event.target.value)}
              placeholder="City"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="searchCategory">Category</label>
            <select
              id="searchCategory"
              className="form-select"
              value={filters.category}
              onChange={(event) => update('category', event.target.value)}
            >
              <option value="">All</option>
              {gigCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="searchBudget">Max budget</label>
            <input
              id="searchBudget"
              className="form-control"
              value={filters.budget}
              onChange={(event) => update('budget', event.target.value)}
              placeholder="50000"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="searchRating">Min rating</label>
            <select
              id="searchRating"
              className="form-select"
              value={filters.rating}
              onChange={(event) => update('rating', event.target.value)}
            >
              <option value="">Any</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
            </select>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-outline-secondary" type="button" onClick={onReset}>Reset Filters</button>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSearchPanel
