import { toast } from 'react-toastify'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { gigs } from '../../data/skillSphereData'
import { approveGig } from '../../services/adminService'

function GigApprovals() {
  const decide = async (gig, status) => {
    try {
      await approveGig({ gigId: gig.id, status })
      toast.success(`Gig ${status.toLowerCase()}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gig approval endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Gig Approvals" subtitle="Approve marketplace projects before they go live." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={gigs}
            columns={[
              { key: 'title', label: 'Gig' },
              { key: 'client', label: 'Client' },
              { key: 'budget', label: 'Budget', render: (row) => `Rs ${row.budget}` },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              {
                key: 'action',
                label: 'Action',
                render: (row) => (
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-success" type="button" onClick={() => decide(row, 'Approved')}>Approve</button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => decide(row, 'Rejected')}>Reject</button>
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

export default GigApprovals
