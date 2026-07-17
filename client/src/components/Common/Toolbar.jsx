import Filters from './Filters'
import SearchBar from './SearchBar'

function Toolbar({ search, onSearch, filters, filterValues, onFilterChange, action }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-lg-4">
            <SearchBar value={search} onChange={onSearch} />
          </div>
          <div className="col-12 col-lg">
            <Filters filters={filters} values={filterValues} onChange={onFilterChange} />
          </div>
          {action ? <div className="col-12 col-lg-auto">{action}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default Toolbar
