import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <section className="card text-center p-4 p-md-5">
        <span className="display-4 fw-bold text-primary">404</span>
        <h1 className="h3 fw-bold">Page not found</h1>
        <p className="text-secondary">The page you are looking for does not exist.</p>
        <Link className="btn btn-primary" to="/login">Back home</Link>
      </section>
    </main>
  )
}

export default NotFound
