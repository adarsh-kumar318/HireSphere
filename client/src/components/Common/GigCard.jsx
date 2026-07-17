import { FiMapPin, FiTarget } from 'react-icons/fi'
import StatusBadge from './StatusBadge'

function GigCard({ gig, action }) {
  return (
    <article className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between gap-3 mb-2">
          <h2 className="h5 mb-0">{gig.title}</h2>
          <StatusBadge status={gig.status} />
        </div>
        <p className="text-secondary mb-2">{gig.client}</p>
        <div className="d-flex flex-wrap gap-3 small text-secondary mb-3">
          <span><FiMapPin className="me-1" />{gig.location}</span>
          <span>{gig.category}</span>
          <span>{gig.type}</span>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {gig.skills.map((skill) => (
            <span className="badge rounded-pill text-bg-light border" key={skill}>{skill}</span>
          ))}
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Rs {gig.budget}</strong>
          <span className="badge text-bg-primary"><FiTarget className="me-1" />{gig.matchScore}% match</span>
        </div>
      </div>
      {action ? <div className="card-footer bg-white">{action}</div> : null}
    </article>
  )
}

export default GigCard
