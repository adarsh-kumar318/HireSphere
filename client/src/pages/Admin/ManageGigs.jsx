import { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { gigs as initialGigs } from '../../data/mockData'

function ManageGigs() {
  const [gigs, setGigs] = useState(initialGigs)

  const updateStatus = (id, status) => {
    setGigs(gigs.map((g) => (g.id === id ? { ...g, status } : g)))
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Manage Gigs</h1>
        <p className="text-muted mb-0">Review and moderate posted gigs</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((g) => (
                <tr key={g.id}>
                  <td className="fw-medium">{g.title}</td>
                  <td>{g.client}</td>
                  <td>{g.category}</td>
                  <td>{g.budgetLabel}</td>
                  <td>{g.location}</td>
                  <td>
                    <Badge bg={g.status === 'Open' ? 'success' : g.status === 'In Progress' ? 'warning' : 'secondary'} text={g.status === 'In Progress' ? 'dark' : undefined}>
                      {g.status}
                    </Badge>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-success" className="me-1" onClick={() => updateStatus(g.id, 'Open')}>Approve</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => updateStatus(g.id, 'Closed')}>Remove</Button>
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

export default ManageGigs
