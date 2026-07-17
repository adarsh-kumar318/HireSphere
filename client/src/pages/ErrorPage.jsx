import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <section className="card text-center p-4 p-md-5">
        <h1 className="h3 fw-bold">Access unavailable</h1>
        <p className="text-secondary">You do not have permission to view this page.</p>
        <Link className="btn btn-primary" to="/login">Go to login</Link>
      </section>
    </main>
  )
}

export default ErrorPage
