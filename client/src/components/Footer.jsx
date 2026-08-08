import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiMail, FiMapPin } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="d-flex align-items-center gap-2">
              <FiBriefcase className="text-teal" /> SkillSphere
            </h5>
            <p className="text-secondary small mt-2">
              Hyperlocal freelance marketplace connecting skilled professionals with nearby clients.
            </p>
          </Col>
          <Col md={2}>
            <h6 className="text-teal">Platform</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-secondary text-decoration-none">Browse Gigs</Link></li>
              <li><Link to="/register" className="text-secondary text-decoration-none">Become a Freelancer</Link></li>
              <li><Link to="/login" className="text-secondary text-decoration-none">Post a Gig</Link></li>
            </ul>
          </Col>
          <Col md={2}>
            <h6 className="text-teal">Company</h6>
            <ul className="list-unstyled small">
              <li><span className="text-secondary">About Us</span></li>
              <li><span className="text-secondary">Careers</span></li>
              <li><span className="text-secondary">Blog</span></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="text-teal">Contact</h6>
            <p className="small text-secondary mb-1 d-flex align-items-center gap-2">
              <FiMail /> hello@skillsphere.in
            </p>
            <p className="small text-secondary d-flex align-items-center gap-2">
              <FiMapPin /> Bengaluru, India
            </p>
          </Col>
        </Row>
        <hr className="border-secondary my-4" />
        <p className="text-center text-secondary small mb-0">
          &copy; {new Date().getFullYear()} SkillSphere. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
