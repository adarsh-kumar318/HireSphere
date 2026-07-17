import { toast } from 'react-toastify'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { disputes } from '../../data/skillSphereData'
import { resolveDispute } from '../../services/adminService'

function DisputeResolution() {
  const resolve = async (dispute) => {
    try {
      await resolveDispute({ disputeId: dispute.id, resolution: 'Admin mediated settlement' })
      toast.success('Dispute resolution saved')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Dispute endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Dispute Resolution" subtitle="Handle evidence upload, mediation, refunds, and final resolution." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={disputes}
            columns={[
              { key: 'project', label: 'Project' },
              { key: 'reason', label: 'Reason' },
              { key: 'priority', label: 'Priority' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'action', label: 'Action', render: (row) => <button className="btn btn-sm btn-primary" type="button" onClick={() => resolve(row)}>Resolve</button> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default DisputeResolution
