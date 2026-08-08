import { useState } from 'react'
import { Button, Badge } from 'react-bootstrap'
import { users as initialUsers } from '../../data/mockData'

function ManageUsers() {
  const [users, setUsers] = useState(initialUsers)

  const toggleStatus = (id) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ))
  }

  const toggleVerified = (id) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, verified: !u.verified } : u
    ))
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Manage Users</h1>
        <p className="text-muted mb-0">Suspend, verify, and monitor platform users</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table-hover mb-0 table align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="fw-medium">{u.name}</td>
                  <td>{u.email}</td>
                  <td><Badge bg="light" text="dark">{u.role}</Badge></td>
                  <td>{u.joined}</td>
                  <td>
                    <Badge bg={u.verified ? 'success' : 'secondary'}>
                      {u.verified ? 'Yes' : 'No'}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={u.status === 'Active' ? 'success' : 'danger'}>{u.status}</Badge>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-warning" className="me-1" onClick={() => toggleStatus(u.id)}>
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </Button>
                    <Button size="sm" variant="outline-primary" onClick={() => toggleVerified(u.id)}>
                      {u.verified ? 'Unverify' : 'Verify'}
                    </Button>
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

export default ManageUsers
