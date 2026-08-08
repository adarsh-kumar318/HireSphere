import { useState, useMemo } from 'react'
import { Row, Col, Form, Button, Card, Modal } from 'react-bootstrap'
import GigCard from '../../components/GigCard'
import { gigs, categories, locations } from '../../data/mockData'

function BrowseGigs() {
  const [filters, setFilters] = useState({ skill: '', budget: '', location: '', rating: '' })
  const [showModal, setShowModal] = useState(false)
  const [selectedGig, setSelectedGig] = useState(null)
  const [proposal, setProposal] = useState({ amount: '', timeline: '', coverLetter: '' })

  const filteredGigs = useMemo(() => {
    return gigs.filter((g) => {
      const matchSkill = !filters.skill || g.skills.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()))
      const matchLoc = !filters.location || g.location === filters.location
      const matchBudget = !filters.budget || g.budget <= Number(filters.budget)
      const matchRating = !filters.rating || g.rating >= Number(filters.rating)
      return matchSkill && matchLoc && matchBudget && matchRating
    })
  }, [filters])

  const openProposal = (gig) => {
    setSelectedGig(gig)
    setProposal({ amount: '', timeline: '', coverLetter: '' })
    setShowModal(true)
  }

  const submitProposal = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Browse Gigs</h1>
        <p className="text-muted mb-0">Find hyperlocal projects matching your skills</p>
      </div>

      <Row>
        <Col lg={3} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">Filters</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="small">Skill</Form.Label>
                  <Form.Control
                    placeholder="e.g. React"
                    value={filters.skill}
                    onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="small">Max Budget (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="100000"
                    value={filters.budget}
                    onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="small">Location</Form.Label>
                  <Form.Select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                    <option value="">All</option>
                    {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="small">Min Rating</Form.Label>
                  <Form.Select value={filters.rating} onChange={(e) => setFilters({ ...filters, rating: e.target.value })}>
                    <option value="">Any</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.0">4.0+</option>
                    <option value="3.5">3.5+</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="outline-secondary" size="sm" className="w-100" onClick={() => setFilters({ skill: '', budget: '', location: '', rating: '' })}>
                  Clear Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Row className="g-4">
            {filteredGigs.map((gig) => (
              <Col key={gig.id} xs={12} md={6} xl={4}>
                <div className="position-relative">
                  <GigCard gig={gig} />
                  <Button
                    size="sm"
                    variant="primary"
                    className="btn-teal position-absolute bottom-0 end-0 m-3"
                    style={{ zIndex: 2 }}
                    onClick={() => openProposal(gig)}
                  >
                    Submit Proposal
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Proposal</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitProposal}>
          <Modal.Body>
            {selectedGig && <p className="text-muted small mb-3">For: <strong>{selectedGig.title}</strong></p>}
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
    </div>
  )
}

export default BrowseGigs
