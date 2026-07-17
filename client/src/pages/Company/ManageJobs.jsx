import { useMemo, useState } from 'react'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import Toolbar from '../../components/Common/Toolbar'

const jobs = [
  { id: 1, title: 'MERN Developer', type: 'Full Time', applicants: 42, status: 'Open' },
  { id: 2, title: 'Frontend Intern', type: 'Internship', applicants: 28, status: 'Open' },
  { id: 3, title: 'QA Engineer', type: 'Full Time', applicants: 16, status: 'Closed' },
]

function ManageJobs() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const rows = useMemo(
    () =>
      jobs.filter((job) => {
        return job.title.toLowerCase().includes(search.toLowerCase()) && (!filters.status || job.status === filters.status)
      }),
    [filters.status, search],
  )

  return (
    <>
      <PageHeader title="Manage Jobs" subtitle="Track postings and applicant volume." />
      <Toolbar
        search={search}
        onSearch={setSearch}
        filters={[{ name: 'status', label: 'Status', options: ['Open', 'Closed'] }]}
        filterValues={filters}
        onFilterChange={(name, value) => setFilters((current) => ({ ...current, [name]: value }))}
      />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={rows}
            columns={[
              { key: 'title', label: 'Title' },
              { key: 'type', label: 'Type' },
              { key: 'applicants', label: 'Applicants' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ManageJobs
