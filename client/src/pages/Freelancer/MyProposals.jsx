import { Badge } from 'react-bootstrap'
import { myProposals } from '../../data/mockData'

const statusVariant = {
  Accepted: 'success',
  Negotiating: 'warning',
  Submitted: 'primary',
  Rejected: 'danger',
}

function MyProposals() {
  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">My Proposals</h1>
        <p className="text-muted mb-0">Track all proposals you have submitted</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Gig</th>
                <th>Bid Amount</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myProposals.map((p) => (
                <tr key={p.id}>
                  <td className="fw-medium">{p.gig}</td>
                  <td>{p.bidAmount}</td>
                  <td>{p.submitted}</td>
                  <td>
                    <Badge bg={statusVariant[p.status] || 'secondary'} text={p.status === 'Negotiating' ? 'dark' : undefined}>
                      {p.status}
                    </Badge>
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

export default MyProposals
