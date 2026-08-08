import { Card, Badge } from 'react-bootstrap'
import { FiMapPin, FiCheckCircle } from 'react-icons/fi'
import RatingStars from './RatingStars'

function FreelancerCard({ freelancer }) {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="text-center">
        <img
          src={freelancer.avatar}
          alt={freelancer.name}
          className="rounded-circle mb-3"
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
        />
        <Card.Title className="fs-6 mb-1 d-flex align-items-center justify-content-center gap-1">
          {freelancer.name}
          {freelancer.verified && <FiCheckCircle className="text-teal" title="Verified" />}
        </Card.Title>
        <Card.Subtitle className="text-muted small mb-2">{freelancer.title}</Card.Subtitle>
        <div className="d-flex align-items-center justify-content-center gap-1 small text-muted mb-2">
          <FiMapPin size={14} /> {freelancer.location}
        </div>
        <RatingStars rating={freelancer.rating} reviewCount={freelancer.reviewCount} />
        <div className="d-flex flex-wrap justify-content-center gap-1 my-3">
          {freelancer.skills?.slice(0, 3).map((skill) => (
            <Badge key={skill} bg="light" text="dark" className="fw-normal">{skill}</Badge>
          ))}
        </div>
        <div className="fw-semibold text-primary">{freelancer.hourlyRate}</div>
        <div className="small text-muted">{freelancer.completedJobs} jobs completed</div>
      </Card.Body>
    </Card>
  )
}

export default FreelancerCard
