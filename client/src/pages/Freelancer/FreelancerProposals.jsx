import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { proposals } from '../../data/skillSphereData'

function FreelancerProposals() {
  return (
    <>
      <PageHeader title="My Proposals" subtitle="Track bid amount, estimated completion, negotiation, and decisions." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={proposals}
            columns={[
              { key: 'gig', label: 'Gig' },
              { key: 'bidAmount', label: 'Bid', render: (row) => `Rs ${row.bidAmount}` },
              { key: 'timeline', label: 'Timeline' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default FreelancerProposals
