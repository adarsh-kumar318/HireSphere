import { FiBriefcase, FiEye, FiUsers } from 'react-icons/fi'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import StatusBadge from '../../components/Common/StatusBadge'

const jobs = [
  { id: 1, title: 'MERN Developer', applicants: 42, status: 'Open' },
  { id: 2, title: 'Frontend Intern', applicants: 28, status: 'Open' },
]

function CompanyDashboard() {
  return (
    <>
      <PageHeader title="Company Dashboard" subtitle="Manage hiring activity and applicants." />
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard icon={FiBriefcase} label="Active jobs" value="6" /></div>
        <div className="col-md-4"><StatCard icon={FiUsers} label="Applicants" value="148" tone="success" /></div>
        <div className="col-md-4"><StatCard icon={FiEye} label="Profile views" value="920" tone="warning" /></div>
      </div>
      <div className="card">
        <div className="card-header bg-white fw-semibold">Hiring Pipeline</div>
        <div className="card-body p-0">
          <DataTable
            rows={jobs}
            columns={[
              { key: 'title', label: 'Job' },
              { key: 'applicants', label: 'Applicants' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default CompanyDashboard
