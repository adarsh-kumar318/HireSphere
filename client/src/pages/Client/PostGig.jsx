import { useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { categories, locations } from '../../data/mockData'

const emptyMilestone = { title: '', amount: '', dueDate: '' }

function PostGig() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    type: 'Fixed Price',
    milestones: [{ ...emptyMilestone }],
  })

  const addMilestone = () => {
    setForm({ ...form, milestones: [...form.milestones, { ...emptyMilestone }] })
  }

  const removeMilestone = (index) => {
    setForm({ ...form, milestones: form.milestones.filter((_, i) => i !== index) })
  }

  const updateMilestone = (index, field, value) => {
    const milestones = form.milestones.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    setForm({ ...form, milestones })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Post a Gig</h1>
        <p className="text-muted mb-0">Describe your project and set milestone payments</p>
      </div>

      {submitted && (
        <Alert variant="success" dismissible onClose={() => setSubmitted(false)}>
          Gig posted successfully! (Demo — saved to local state only.)
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Gig Title</Form.Label>
                  <Form.Control
                    required
                    placeholder="e.g. Build a React dashboard"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                placeholder="Describe scope, deliverables, and expectations..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
                    <option value="">Select city</option>
                    {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Budget (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min="1000"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Type</Form.Label>
                  <Form.Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option>Fixed Price</option>
                    <option>Milestone Based</option>
                    <option>Hourly</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Milestones</h5>
              <Button variant="outline-primary" size="sm" onClick={addMilestone}>
                <FiPlus className="me-1" /> Add Milestone
              </Button>
            </div>

            {form.milestones.map((m, index) => (
              <Row key={index} className="g-2 mb-2 align-items-end">
                <Col md={5}>
                  <Form.Label className="small">Title</Form.Label>
                  <Form.Control
                    placeholder="Milestone title"
                    value={m.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="small">Amount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="15000"
                    value={m.amount}
                    onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="small">Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={m.dueDate}
                    onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  {form.milestones.length > 1 && (
                    <Button variant="outline-danger" size="sm" onClick={() => removeMilestone(index)}>
                      <FiTrash2 />
                    </Button>
                  )}
                </Col>
              </Row>
            ))}

            <div className="mt-4">
              <Button type="submit" variant="primary" className="btn-teal">
                Publish Gig
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PostGig
