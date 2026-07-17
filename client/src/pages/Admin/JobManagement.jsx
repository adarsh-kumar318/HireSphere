import { useMemo, useState } from 'react'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import Toolbar from '../../components/Common/Toolbar'

const jobs = [
  { id: 1, title: 'MERN Developer', company: 'Wipro', type: 'Full Time', package: '6.5 LPA', status: 'Open' },
  { id: 2, title: 'Frontend Intern', company: 'Acme Labs', type: 'Internship', package: '25K/month', status: 'Open' },
  { id: 3, title: 'QA Engineer', company: 'Infosys', type: 'Full Time', package: '5.2 LPA', status: 'Closed' },
]

function JobManagement() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const rows = useMemo(
    () =>
      jobs.filter((job) => {
        const text = `${job.title} ${job.company}`.toLowerCase()
        return text.includes(search.toLowerCase()) && (!filters.status || job.status === filters.status)
      }),
    [filters.status, search],
  )

  return (
    <>
      <PageHeader title="Job Management" subtitle="Review active and closed job postings." />
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
              { key: 'company', label: 'Company' },
              { key: 'type', label: 'Type' },
              { key: 'package', label: 'Package' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default JobManagement
