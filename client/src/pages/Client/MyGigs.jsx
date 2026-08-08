import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { clientGigs } from '../../data/mockData'

function MyGigs() {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h1 className="h3 fw-bold mb-1">My Gigs</h1>
          <p className="text-muted mb-0">Manage all gigs you have posted</p>
        </div>
        <Link to="/client/post-gig" className="btn btn-primary btn-teal">Post New Gig</Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Budget</th>
                <th>Proposals</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientGigs.map((gig, i) => (
                <tr key={gig.id}>
                  <td>{i + 1}</td>
                  <td className="fw-medium">{gig.title}</td>
                  <td>{gig.budget}</td>
                  <td>{gig.proposals}</td>
                  <td>{gig.posted}</td>
                  <td>
                    <Badge bg={gig.status === 'Open' ? 'success' : 'warning'} text={gig.status !== 'Open' ? 'dark' : undefined}>
                      {gig.status}
                    </Badge>
                  </td>
                  <td>
                    <Link to={`/gigs/${gig.id}`} className="btn btn-sm btn-outline-primary me-1">View</Link>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyGigs
