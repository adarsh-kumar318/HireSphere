function Pagination({ page = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav aria-label="Table pagination">
      <ul className="pagination mb-0">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(page - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
          <li key={item} className={`page-item ${item === page ? 'active' : ''}`}>
            <button className="page-link" type="button" onClick={() => onPageChange(item)}>
              {item}
            </button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
