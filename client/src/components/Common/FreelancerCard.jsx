import { FiAward, FiCheckCircle, FiMapPin, FiStar } from 'react-icons/fi'

function FreelancerCard({ freelancer, action }) {
  return (
    <article className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div className="d-flex gap-3">
            <span className="avatar-circle">{freelancer.name.charAt(0)}</span>
            <div>
              <h2 className="h5 mb-1">{freelancer.name}</h2>
              <p className="text-secondary mb-1">{freelancer.title}</p>
              <small className="text-secondary"><FiMapPin className="me-1" />{freelancer.location}</small>
            </div>
          </div>
          {freelancer.verified ? <span className="badge text-bg-success"><FiCheckCircle className="me-1" />Verified</span> : null}
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {freelancer.skills.map((skill) => (
            <span className="badge rounded-pill text-bg-light border" key={skill}>{skill}</span>
          ))}
        </div>
        <div className="row g-2 text-secondary small mb-3">
          <div className="col-4"><FiStar className="me-1 text-warning" />{freelancer.rating}</div>
          <div className="col-4"><FiAward className="me-1 text-primary" />{freelancer.reputation}</div>
          <div className="col-4 text-end">{freelancer.hourlyRate}</div>
        </div>
        <p className="mb-3 text-secondary">{freelancer.availability}</p>
        {action}
      </div>
    </article>
  )
}

export default FreelancerCard
