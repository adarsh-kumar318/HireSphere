import { Outlet } from 'react-router-dom'
import Footer from '../components/Common/Footer'
import Navbar from '../components/Common/Navbar'
import Sidebar from '../components/Common/Sidebar'

function DashboardLayout({ role }) {
  return (
    <div className="app-shell d-lg-flex">
      <Sidebar role={role} />
      <div className="content-area flex-grow-1 d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
