import { FiSearch } from 'react-icons/fi'

function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">
        <FiSearch />
      </span>
      <input
        type="search"
        className="form-control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchBar
