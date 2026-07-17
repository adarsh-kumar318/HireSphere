import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { formatDate } from '../../utils/formatters'

const appliedJobs = [
  { id: 1, title: 'MERN Developer', company: 'Wipro', appliedAt: '2026-07-01', status: 'Shortlisted' },
  { id: 2, title: 'Data Analyst', company: 'TCS', appliedAt: '2026-07-03', status: 'Applied' },
]

function AppliedJobs() {
  return (
    <>
      <PageHeader title="Applied Jobs" subtitle="Track applications and selection progress." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={appliedJobs}
            columns={[
              { key: 'title', label: 'Title' },
              { key: 'company', label: 'Company' },
              { key: 'appliedAt', label: 'Applied On', render: (row) => formatDate(row.appliedAt) },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default AppliedJobs
