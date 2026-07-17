import { useMemo, useState } from 'react'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import Toolbar from '../../components/Common/Toolbar'

const users = [
  { id: 1, name: 'Ananya Rao', role: 'Freelancer', location: 'Bengaluru', status: 'Verified' },
  { id: 2, name: 'GreenStay Hotels', role: 'Client', location: 'Bengaluru', status: 'Active' },
  { id: 3, name: 'Orbit Studio', role: 'Client', location: 'Mumbai', status: 'Suspended' },
]

function UserManagement() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const rows = useMemo(
    () =>
      users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
        const matchesRole = !filters.role || user.role === filters.role
        return matchesSearch && matchesRole
      }),
    [filters.role, search],
  )

  return (
    <>
      <PageHeader title="User Management" subtitle="Manage clients, freelancers, suspensions, and account health." />
      <Toolbar
        search={search}
        onSearch={setSearch}
        filters={[{ name: 'role', label: 'Role', options: ['Client', 'Freelancer'] }]}
        filterValues={filters}
        onFilterChange={(name, value) => setFilters((current) => ({ ...current, [name]: value }))}
      />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={rows}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'location', label: 'Location' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'action', label: 'Action', render: () => <button className="btn btn-sm btn-outline-danger" type="button">Suspend</button> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default UserManagement
