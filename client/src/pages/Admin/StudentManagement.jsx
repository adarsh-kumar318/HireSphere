import { useMemo, useState } from 'react'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import Toolbar from '../../components/Common/Toolbar'

const students = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', branch: 'CSE', cgpa: '8.7', status: 'Active' },
  { id: 2, name: 'Meera Nair', email: 'meera@example.com', branch: 'IT', cgpa: '9.1', status: 'Active' },
  { id: 3, name: 'Rohan Das', email: 'rohan@example.com', branch: 'ECE', cgpa: '8.2', status: 'Pending' },
]

function StudentManagement() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const rows = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase())
        const matchesBranch = !filters.branch || student.branch === filters.branch
        return matchesSearch && matchesBranch
      }),
    [filters.branch, search],
  )

  return (
    <>
      <PageHeader title="Student Management" subtitle="Search, filter, and review registered students." />
      <Toolbar
        search={search}
        onSearch={setSearch}
        filters={[{ name: 'branch', label: 'Branch', options: ['CSE', 'IT', 'ECE'] }]}
        filterValues={filters}
        onFilterChange={(name, value) => setFilters((current) => ({ ...current, [name]: value }))}
      />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={rows}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'branch', label: 'Branch' },
              { key: 'cgpa', label: 'CGPA' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default StudentManagement
