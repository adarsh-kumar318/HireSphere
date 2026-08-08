import { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import GigCard from '../components/GigCard'
import FreelancerCard from '../components/FreelancerCard'
import { gigs, freelancers, categories, locations } from '../data/mockData'

function Home() {
  const [skill, setSkill] = useState('')
  const [location, setLocation] = useState('')

  const filteredGigs = gigs.filter((g) => {
    const matchSkill = !skill || g.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())) || g.title.toLowerCase().includes(skill.toLowerCase())
    const matchLoc = !location || g.location === location
    return matchSkill && matchLoc
  })

  return (
    <>
      <section className="hero-gradient text-white py-5">
        <Container className="py-4">
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-5 fw-bold mb-3">Find Local Talent. Build Faster.</h1>
              <p className="lead mb-4 opacity-90">
                SkillSphere connects you with verified freelancers in your city for web, design, marketing, and more.
              </p>
              <Form className="bg-white rounded-3 p-3 shadow">
                <Row className="g-2">
                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text><FiSearch /></InputGroup.Text>
                      <Form.Control
                        placeholder="Skill or keyword"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text><FiMapPin /></InputGroup.Text>
                      <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">All locations</option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Button variant="primary" className="w-100 btn-teal">Search</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col lg={5} className="d-none d-lg-block text-center">
              <div className="bg-white bg-opacity-10 rounded-4 p-4">
                <Row className="g-3 text-start">
                  <Col xs={6}><div className="fs-3 fw-bold">2,840+</div><small>Active Freelancers</small></Col>
                  <Col xs={6}><div className="fs-3 fw-bold">91%</div><small>Job Success Rate</small></Col>
                  <Col xs={6}><div className="fs-3 fw-bold">1,070+</div><small>Open Gigs</small></Col>
                  <Col xs={6}><div className="fs-3 fw-bold">6</div><small>Major Cities</small></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-2 bg-white border-bottom">
        <Container>
          <div className="d-flex flex-wrap gap-2 py-3">
            {categories.map((cat) => (
              <Button key={cat} variant="outline-primary" size="sm" className="rounded-pill">{cat}</Button>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold mb-0">Featured Gigs</h2>
            <Button variant="link" className="text-teal">View all</Button>
          </div>
          <Row className="g-4">
            {filteredGigs.map((gig) => (
              <Col key={gig.id} xs={12} sm={6} lg={3}>
                <GigCard gig={gig} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold mb-0">Featured Freelancers</h2>
            <Button variant="link" className="text-teal">View all</Button>
          </div>
          <Row className="g-4">
            {freelancers.map((f) => (
              <Col key={f.id} xs={12} sm={6} lg={3}>
                <FreelancerCard freelancer={f} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="h3 fw-bold mb-3">Ready to get started?</h2>
          <p className="mb-4 opacity-90">Join thousands of clients and freelancers on SkillSphere today.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button as="a" href="/register" variant="light" size="lg">Join as Freelancer</Button>
            <Button as="a" href="/client/post-gig" variant="outline-light" size="lg">Post a Gig</Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Home
