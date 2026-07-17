import { FiBriefcase, FiCreditCard, FiTarget, FiUsers } from 'react-icons/fi'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import StatusBadge from '../../components/Common/StatusBadge'
import { gigs, proposals } from '../../data/skillSphereData'

function ClientDashboard() {
  return (
    <>
      <PageHeader title="Client Dashboard" subtitle="Manage local gigs, proposals, escrow, and recommended talent." />
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={FiBriefcase} label="Active gigs" value="8" /></div>
        <div className="col-md-3"><StatCard icon={FiUsers} label="Proposals" value="36" tone="success" /></div>
        <div className="col-md-3"><StatCard icon={FiTarget} label="AI match avg." value="91%" tone="warning" /></div>
        <div className="col-md-3"><StatCard icon={FiCreditCard} label="Escrowed" value="1.8L" tone="info" /></div>
      </div>
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card h-100">
            <div className="card-header bg-white fw-semibold">Recent Gigs</div>
            <div className="card-body p-0">
              <DataTable
                rows={gigs}
                columns={[
                  { key: 'title', label: 'Gig' },
                  { key: 'category', label: 'Category' },
                  { key: 'budget', label: 'Budget', render: (row) => `Rs ${row.budget}` },
                  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card h-100">
            <div className="card-header bg-white fw-semibold">Proposal Pipeline</div>
            <div className="card-body p-0">
              <DataTable
                rows={proposals}
                columns={[
                  { key: 'freelancer', label: 'Freelancer' },
                  { key: 'bidAmount', label: 'Bid', render: (row) => `Rs ${row.bidAmount}` },
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

export default ClientDashboard
