import { FiBriefcase, FiCreditCard, FiShield, FiUsers } from 'react-icons/fi'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import StatusBadge from '../../components/Common/StatusBadge'
import { disputes, gigs, platformStats } from '../../data/skillSphereData'

function AdminDashboard() {
  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Control users, gigs, payments, fraud signals, and marketplace health." />
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={FiCreditCard} label="Platform revenue" value={`Rs ${platformStats.revenue}`} /></div>
        <div className="col-md-3"><StatCard icon={FiUsers} label="Active freelancers" value={platformStats.activeFreelancers} tone="success" /></div>
        <div className="col-md-3"><StatCard icon={FiBriefcase} label="Job success rate" value={platformStats.jobSuccessRate} tone="warning" /></div>
        <div className="col-md-3"><StatCard icon={FiShield} label="Open disputes" value={platformStats.disputesOpen} tone="danger" /></div>
      </div>
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card h-100">
            <div className="card-header bg-white fw-semibold">Gig Review Queue</div>
            <div className="card-body p-0">
              <DataTable
                rows={gigs}
                columns={[
                  { key: 'title', label: 'Gig' },
                  { key: 'client', label: 'Client' },
                  { key: 'category', label: 'Category' },
                  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card h-100">
            <div className="card-header bg-white fw-semibold">Dispute Watch</div>
            <div className="card-body p-0">
              <DataTable
                rows={disputes}
                columns={[
                  { key: 'project', label: 'Project' },
                  { key: 'priority', label: 'Priority' },
                  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
