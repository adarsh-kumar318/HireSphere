import { FiShield, FiStar, FiTrendingUp } from 'react-icons/fi'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import { reviews } from '../../data/skillSphereData'

function ReputationReviews() {
  return (
    <>
      <PageHeader title="Reputation and Reviews" subtitle="Weighted score, verified reviews, and review analytics." />
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard icon={FiStar} label="Weighted reputation" value="96/100" /></div>
        <div className="col-md-4"><StatCard icon={FiShield} label="Verified reviews" value="42" tone="success" /></div>
        <div className="col-md-4"><StatCard icon={FiTrendingUp} label="Repeat clients" value="68%" tone="warning" /></div>
      </div>
      <div className="list-group">
        {reviews.map((review) => (
          <div className="list-group-item" key={review.id}>
            <div className="d-flex justify-content-between">
              <h2 className="h6 mb-1">{review.client}</h2>
              <span className="badge text-bg-warning">{review.score}</span>
            </div>
            <p className="text-secondary mb-0">{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ReputationReviews
