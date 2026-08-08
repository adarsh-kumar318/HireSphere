import { Row, Col, Form, Button, Card, Badge } from 'react-bootstrap'
import RatingStars from '../../components/RatingStars'
import { freelancers } from '../../data/mockData'

const profile = freelancers[0]

function Profile() {
  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">My Profile</h1>
        <p className="text-muted mb-0">Manage your public freelancer profile</p>
      </div>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="p-4">
              <img src={profile.avatar} alt={profile.name} className="rounded-circle mb-3" width={100} height={100} />
              <h5 className="fw-bold">{profile.name}</h5>
              <p className="text-muted">{profile.title}</p>
              <RatingStars rating={profile.rating} reviewCount={profile.reviewCount} />
              <div className="mt-3">
                {profile.skills.map((s) => (
                  <Badge key={s} bg="light" text="dark" className="me-1 mb-1 fw-normal">{s}</Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control defaultValue={profile.name} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Professional Title</Form.Label>
                      <Form.Control defaultValue={profile.title} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control as="textarea" rows={4} defaultValue="Full-stack developer specializing in React and Node.js with 5+ years of experience building products for startups across India." />
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control defaultValue={profile.location} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hourly Rate (₹)</Form.Label>
                      <Form.Control defaultValue="1200" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Skills (comma separated)</Form.Label>
                      <Form.Control defaultValue={profile.skills.join(', ')} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" className="btn-teal">Save Profile</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
