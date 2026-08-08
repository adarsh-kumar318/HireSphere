import { Row } from 'react-bootstrap'
import { FiUsers, FiDollarSign, FiUserCheck, FiTrendingUp } from 'react-icons/fi'
import StatCard from '../../components/StatCard'
import { platformStats, users, gigs } from '../../data/mockData'

function AdminDashboard() {
  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted mb-0">Platform overview and quick actions</p>
      </div>

      <Row className="g-3 mb-4">
        <StatCard title="Total Users" value={platformStats.totalUsers.toLocaleString('en-IN')} icon={FiUsers} color="primary" />
        <StatCard title="Revenue" value={platformStats.revenue} icon={FiDollarSign} color="success" />
        <StatCard title="Active Freelancers" value={platformStats.activeFreelancers.toLocaleString('en-IN')} icon={FiUserCheck} color="teal" />
        <StatCard title="Job Success Rate" value={platformStats.jobSuccessRate} icon={FiTrendingUp} color="info" />
      </Row>

      <Row className="g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Recent Users</div>
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <tbody>
                  {users.slice(0, 4).map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td><span className="badge bg-light text-dark">{u.role}</span></td>
                      <td><span className={`badge bg-${u.status === 'Active' ? 'success' : 'danger'}`}>{u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Active Gigs</div>
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <tbody>
                  {gigs.slice(0, 4).map((g) => (
                    <tr key={g.id}>
                      <td>{g.title}</td>
                      <td>{g.budgetLabel}</td>
                      <td><span className="badge bg-success">{g.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Row>
    </div>
  )
}

export default AdminDashboard
