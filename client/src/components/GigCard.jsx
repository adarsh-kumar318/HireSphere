import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi'
import RatingStars from './RatingStars'

function GigCard({ gig }) {
  return (
    <Card className="h-100 gig-card border-0 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary">
            {gig.category}
          </Badge>
          <Badge bg={gig.status === 'Open' ? 'success' : 'warning'}>{gig.status}</Badge>
        </div>
        <Card.Title className="fs-6 fw-semibold">
          <Link to={`/gigs/${gig.id}`} className="text-decoration-none text-dark stretched-link">
            {gig.title}
          </Link>
        </Card.Title>
        <Card.Text className="text-muted small mb-2">{gig.client}</Card.Text>
        <div className="d-flex flex-wrap gap-2 small text-muted mb-2">
          <span className="d-flex align-items-center gap-1"><FiMapPin size={14} /> {gig.location}</span>
          <span className="d-flex align-items-center gap-1"><FiClock size={14} /> {gig.type}</span>
        </div>
        <div className="d-flex flex-wrap gap-1 mb-3">
          {gig.skills?.slice(0, 3).map((skill) => (
            <Badge key={skill} bg="light" text="dark" className="fw-normal">{skill}</Badge>
          ))}
        </div>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-bold text-primary">{gig.budgetLabel || `₹${gig.budget?.toLocaleString('en-IN')}`}</div>
            <div className="small text-muted d-flex align-items-center gap-1">
              <FiUsers size={12} /> {gig.proposalsCount || 0} proposals
            </div>
          </div>
          {gig.rating && <RatingStars rating={gig.rating} size={14} />}
        </div>
      </Card.Body>
    </Card>
  )
}

export default GigCard
