import { toast } from 'react-toastify'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { payments } from '../../data/skillSphereData'
import { releaseMilestonePayment } from '../../services/paymentService'

function ClientPayments() {
  const releasePayment = async (payment) => {
    try {
      await releaseMilestonePayment(payment.id)
      toast.success('Milestone payout released')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Secure Payments" subtitle="Escrow, milestone release, refunds, and transaction history." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={payments}
            columns={[
              { key: 'gig', label: 'Gig' },
              { key: 'provider', label: 'Provider' },
              { key: 'amount', label: 'Amount', render: (row) => `Rs ${row.amount}` },
              { key: 'stage', label: 'Stage' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'action', label: 'Action', render: (row) => <button className="btn btn-sm btn-primary" type="button" onClick={() => releasePayment(row)}>Release</button> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ClientPayments
