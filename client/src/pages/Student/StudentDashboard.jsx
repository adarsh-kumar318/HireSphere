import { FiBell, FiBriefcase, FiCheckCircle } from 'react-icons/fi'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import StatusBadge from '../../components/Common/StatusBadge'

const applications = [
  { id: 1, company: 'Wipro', role: 'MERN Developer', status: 'Shortlisted' },
  { id: 2, company: 'TCS', role: 'Data Analyst', status: 'Applied' },
]

function StudentDashboard() {
  return (
    <>
      <PageHeader title="Student Dashboard" subtitle="Your placement activity at a glance." />
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard icon={FiBriefcase} label="Available jobs" value="24" /></div>
        <div className="col-md-4"><StatCard icon={FiCheckCircle} label="Applications" value="7" tone="success" /></div>
        <div className="col-md-4"><StatCard icon={FiBell} label="Notifications" value="5" tone="warning" /></div>
      </div>
      <div className="card">
        <div className="card-header bg-white fw-semibold">Recent Applications</div>
        <div className="card-body p-0">
          <DataTable
            rows={applications}
            columns={[
              { key: 'company', label: 'Company' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default StudentDashboard
