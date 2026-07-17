import { FiCreditCard, FiEye, FiMessageSquare, FiTrendingUp } from 'react-icons/fi'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'

const months = [
  { label: 'Mar', revenue: 58 },
  { label: 'Apr', revenue: 72 },
  { label: 'May', revenue: 88 },
  { label: 'Jun', revenue: 96 },
  { label: 'Jul', revenue: 84 },
]

function FreelancerAnalytics() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Profile views, applications, earnings, revenue trend, and client feedback." />
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={FiEye} label="Profile views" value="1,248" /></div>
        <div className="col-md-3"><StatCard icon={FiMessageSquare} label="Applications" value="34" tone="success" /></div>
        <div className="col-md-3"><StatCard icon={FiCreditCard} label="Earnings" value="2.4L" tone="warning" /></div>
        <div className="col-md-3"><StatCard icon={FiTrendingUp} label="Feedback score" value="4.9" tone="info" /></div>
      </div>
      <div className="card">
        <div className="card-header bg-white fw-semibold">Monthly Revenue Chart</div>
        <div className="card-body">
          {months.map((month) => (
            <div className="mb-3" key={month.label}>
              <div className="d-flex justify-content-between mb-1">
                <strong>{month.label}</strong>
                <span className="text-secondary">Rs {month.revenue}K</span>
              </div>
              <div className="progress" role="progressbar" aria-label={`${month.label} revenue`} aria-valuenow={month.revenue} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{ width: `${month.revenue}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FreelancerAnalytics
