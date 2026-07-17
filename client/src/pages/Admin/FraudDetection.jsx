import { FiAlertTriangle, FiShield, FiStar } from 'react-icons/fi'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'

const signals = [
  { id: 1, account: 'Orbit Studio', signal: 'Repeated refund attempts', severity: 'High' },
  { id: 2, account: 'Review cluster #42', signal: 'Suspicious review velocity', severity: 'Medium' },
  { id: 3, account: 'Payment TXN-2190', signal: 'Escrow anomaly', severity: 'Low' },
]

function FraudDetection() {
  return (
    <>
      <PageHeader title="Fraud Detection" subtitle="Monitor fake reviews, payment anomalies, and trust signals." />
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard icon={FiAlertTriangle} label="High risk signals" value="3" tone="danger" /></div>
        <div className="col-md-4"><StatCard icon={FiStar} label="Review clusters" value="7" tone="warning" /></div>
        <div className="col-md-4"><StatCard icon={FiShield} label="Accounts cleared" value="128" tone="success" /></div>
      </div>
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={signals}
            columns={[
              { key: 'account', label: 'Account or Entity' },
              { key: 'signal', label: 'Signal' },
              { key: 'severity', label: 'Severity' },
              { key: 'action', label: 'Action', render: () => <button className="btn btn-sm btn-outline-primary" type="button">Investigate</button> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default FraudDetection
