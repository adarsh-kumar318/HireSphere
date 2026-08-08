import { Badge, Button } from 'react-bootstrap'
import { proposals } from '../../data/mockData'

const statusVariant = {
  Accepted: 'success',
  Negotiating: 'warning',
  Submitted: 'primary',
  Rejected: 'danger',
}

function Proposals() {
  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Proposals</h1>
        <p className="text-muted mb-0">Review proposals from freelancers on your gigs</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Gig</th>
                <th>Freelancer</th>
                <th>Bid Amount</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p) => (
                <tr key={p.id}>
                  <td className="fw-medium">{p.gig}</td>
                  <td>{p.freelancer}</td>
                  <td>{p.bidAmount}</td>
                  <td>{p.timeline}</td>
                  <td>
                    <Badge bg={statusVariant[p.status] || 'secondary'}>{p.status}</Badge>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-success" className="me-1">Accept</Button>
                    <Button size="sm" variant="outline-danger">Decline</Button>
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

export default Proposals
