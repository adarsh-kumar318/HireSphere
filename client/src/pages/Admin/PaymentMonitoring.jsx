import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { payments } from '../../data/skillSphereData'

function PaymentMonitoring() {
  return (
    <>
      <PageHeader title="Payment Monitoring" subtitle="Review escrow status, milestone payout, refunds, and transaction history." />
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
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default PaymentMonitoring
