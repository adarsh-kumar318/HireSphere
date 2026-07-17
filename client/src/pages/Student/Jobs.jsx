import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import Toolbar from '../../components/Common/Toolbar'
import { applyToJob } from '../../services/studentService'

const jobs = [
  { id: 1, title: 'MERN Developer', company: 'Wipro', location: 'Bengaluru', package: '6.5 LPA', type: 'Full Time' },
  { id: 2, title: 'Frontend Intern', company: 'Acme Labs', location: 'Remote', package: '25K/month', type: 'Internship' },
  { id: 3, title: 'Data Analyst', company: 'TCS', location: 'Pune', package: '5.8 LPA', type: 'Full Time' },
]

function Jobs() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const rows = useMemo(
    () =>
      jobs.filter((job) => {
        const text = `${job.title} ${job.company}`.toLowerCase()
        return text.includes(search.toLowerCase()) && (!filters.type || job.type === filters.type)
      }),
    [filters.type, search],
  )

  const handleApply = async (job) => {
    try {
      await applyToJob(job.id)
      toast.success(`Applied to ${job.title}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Apply endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Jobs" subtitle="Find eligible placement opportunities." />
      <Toolbar
        search={search}
        onSearch={setSearch}
        filters={[{ name: 'type', label: 'Job type', options: ['Full Time', 'Internship'] }]}
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
              { key: 'location', label: 'Location' },
              { key: 'package', label: 'Package' },
              { key: 'action', label: 'Action', render: (row) => <button className="btn btn-sm btn-primary" type="button" onClick={() => handleApply(row)}>Apply</button> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default Jobs
