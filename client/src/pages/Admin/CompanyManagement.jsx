import { useMemo, useState } from 'react'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import Toolbar from '../../components/Common/Toolbar'

const companies = [
  { id: 1, name: 'Infosys', industry: 'IT Services', jobs: 8, status: 'Approved' },
  { id: 2, name: 'TCS', industry: 'Consulting', jobs: 12, status: 'Approved' },
  { id: 3, name: 'Acme Labs', industry: 'Product', jobs: 3, status: 'Pending' },
]

function CompanyManagement() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const rows = useMemo(
    () =>
      companies.filter((company) => {
        const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = !filters.status || company.status === filters.status
        return matchesSearch && matchesStatus
      }),
    [filters.status, search],
  )

  return (
    <>
      <PageHeader title="Company Management" subtitle="Approve companies and track hiring partners." />
      <Toolbar
        search={search}
        onSearch={setSearch}
        filters={[{ name: 'status', label: 'Status', options: ['Approved', 'Pending'] }]}
        filterValues={filters}
        onFilterChange={(name, value) => setFilters((current) => ({ ...current, [name]: value }))}
      />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={rows}
            columns={[
              { key: 'name', label: 'Company' },
              { key: 'industry', label: 'Industry' },
              { key: 'jobs', label: 'Jobs Posted' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default CompanyManagement
