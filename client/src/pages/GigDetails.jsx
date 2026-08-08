import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Badge, Button, ListGroup, Modal, Form } from 'react-bootstrap'
import { FiMapPin, FiClock, FiUsers, FiArrowLeft } from 'react-icons/fi'
import RatingStars from '../components/RatingStars'
import { gigs, proposals } from '../data/mockData'

function GigDetails() {
  const { id } = useParams()
  const gig = gigs.find((g) => g.id === Number(id))
  const gigProposals = proposals.filter((p) => p.gigId === Number(id))
  const [showModal, setShowModal] = useState(false)
  const [proposal, setProposal] = useState({ amount: '', timeline: '', coverLetter: '' })

  if (!gig) {
    return (
      <Container className="py-5 text-center">
        <h2>Gig not found</h2>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </Container>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <Container className="py-4">
      <Link to="/" className="btn btn-link text-decoration-none ps-0 mb-3">
        <FiArrowLeft className="me-1" /> Back to gigs
      </Link>

      <Row>
        <Col lg={8}>
          <div className="mb-3 d-flex flex-wrap gap-2">
            <Badge bg="primary">{gig.category}</Badge>
            <Badge bg={gig.status === 'Open' ? 'success' : 'warning'}>{gig.status}</Badge>
          </div>
          <h1 className="h3 fw-bold">{gig.title}</h1>
          <p className="text-muted">{gig.client}</p>

          <div className="d-flex flex-wrap gap-3 text-muted small mb-4">
            <span className="d-flex align-items-center gap-1"><FiMapPin /> {gig.location}</span>
            <span className="d-flex align-items-center gap-1"><FiClock /> {gig.type}</span>
            <span className="d-flex align-items-center gap-1"><FiUsers /> {gig.proposalsCount} proposals</span>
            {gig.rating && <RatingStars rating={gig.rating} size={14} />}
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-semibold">Description</h5>
              <p className="text-muted mb-3">{gig.description}</p>
              <div className="d-flex flex-wrap gap-1">
                {gig.skills.map((s) => (
                  <Badge key={s} bg="light" text="dark" className="fw-normal">{s}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white fw-semibold">Milestones</div>
            <ListGroup variant="flush">
              {gig.milestones?.map((m) => (
                <ListGroup.Item key={m.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-medium">{m.title}</div>
                    <small className="text-muted">Due: {m.dueDate}</small>
                  </div>
                  <Badge bg="primary">₹{m.amount.toLocaleString('en-IN')}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white fw-semibold">Proposals ({gigProposals.length})</div>
            <ListGroup variant="flush">
              {gigProposals.length === 0 ? (
                <ListGroup.Item className="text-muted">No proposals yet.</ListGroup.Item>
              ) : (
                gigProposals.map((p) => (
                  <ListGroup.Item key={p.id}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="fw-medium">{p.freelancer}</div>
                        <small className="text-muted">{p.coverLetter}</small>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-primary">{p.bidAmount}</div>
                        <small className="text-muted">{p.timeline}</small>
                        <div><Badge bg="secondary">{p.status}</Badge></div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </div>
        </Col>

        <Col lg={4}>
          <div className="card border-0 shadow-sm sticky-top" style={{ top: 20 }}>
            <div className="card-body">
              <div className="fs-3 fw-bold text-primary mb-1">{gig.budgetLabel}</div>
              <p className="text-muted small mb-3">Posted on {gig.postedDate}</p>
              <Button variant="primary" className="w-100 btn-teal mb-2" onClick={() => setShowModal(true)}>
                Submit Proposal
              </Button>
              <Button variant="outline-secondary" className="w-100">Save Gig</Button>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Proposal</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Your Bid (₹)</Form.Label>
              <Form.Control type="number" required value={proposal.amount} onChange={(e) => setProposal({ ...proposal, amount: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Timeline</Form.Label>
              <Form.Control placeholder="e.g. 14 days" required value={proposal.timeline} onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control as="textarea" rows={4} required value={proposal.coverLetter} onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="btn-teal">Send Proposal</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default GigDetails
