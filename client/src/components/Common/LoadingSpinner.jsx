function LoadingSpinner({ fullPage = false, text = 'Loading...' }) {
  const className = fullPage
    ? 'min-vh-100 d-flex align-items-center justify-content-center'
    : 'd-flex align-items-center justify-content-center py-5'

  return (
    <div className={className}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" aria-hidden="true" />
        <p className="mt-3 mb-0 text-secondary">{text}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
