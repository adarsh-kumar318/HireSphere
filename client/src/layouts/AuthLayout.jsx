import { Link, Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <main className="auth-shell d-flex align-items-center justify-content-center p-3">
      <section className="auth-panel bg-white shadow-lg p-4 p-md-5">
        <div className="mb-4 text-center">
          <Link to="/login" className="text-decoration-none">
            <span className="badge text-bg-primary mb-3">SkillSphere</span>
          </Link>
          <h1 className="h3 fw-bold mb-2">Intelligent local freelance ecosystem</h1>
          <p className="text-secondary">Find verified local talent, manage gigs, milestones, payments, and collaboration.</p>
        </div>
        <Outlet />
      </section>
    </main>
  )
}

export default AuthLayout
