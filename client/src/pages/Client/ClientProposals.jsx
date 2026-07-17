import { toast } from 'react-toastify'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { proposals } from '../../data/skillSphereData'
import { respondToProposal } from '../../services/clientService'

function ClientProposals() {
  const handleDecision = async (proposal, status) => {
    try {
      await respondToProposal({ proposalId: proposal.id, status })
      toast.success(`Proposal ${status.toLowerCase()}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Proposal endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Proposals and Bids" subtitle="Accept, reject, or negotiate freelancer proposals." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={proposals}
            columns={[
              { key: 'gig', label: 'Gig' },
              { key: 'freelancer', label: 'Freelancer' },
              { key: 'bidAmount', label: 'Bid', render: (row) => `Rs ${row.bidAmount}` },
              { key: 'timeline', label: 'Timeline' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              {
                key: 'actions',
                label: 'Actions',
                render: (row) => (
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-success" type="button" onClick={() => handleDecision(row, 'Accepted')}>Accept</button>
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleDecision(row, 'Negotiating')}>Negotiate</button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDecision(row, 'Rejected')}>Reject</button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ClientProposals
