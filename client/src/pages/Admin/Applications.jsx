import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { formatDate } from '../../utils/formatters'

const applications = [
  { id: 1, student: 'Aarav Sharma', job: 'MERN Developer', company: 'Wipro', appliedAt: '2026-07-01', status: 'Shortlisted' },
  { id: 2, student: 'Meera Nair', job: 'Data Analyst', company: 'TCS', appliedAt: '2026-07-03', status: 'Interview' },
  { id: 3, student: 'Rohan Das', job: 'QA Engineer', company: 'Infosys', appliedAt: '2026-07-04', status: 'Applied' },
]

function Applications() {
  return (
    <>
      <PageHeader title="Applications" subtitle="Track placement applications across companies." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={applications}
            columns={[
              { key: 'student', label: 'Student' },
              { key: 'job', label: 'Job' },
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

export default Applications
