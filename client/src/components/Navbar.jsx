import { Link, NavLink } from 'react-router-dom'
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap'
import { FiBriefcase, FiLogIn, FiUserPlus } from 'react-icons/fi'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <BSNavbar expand="lg" bg="white" className="border-bottom shadow-sm py-2">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-primary">
          <img src={logo} alt="SkillSphere" height={36} onError={(e) => { e.target.style.display = 'none' }} />
          <FiBriefcase className="text-teal" />
          SkillSphere
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-1">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/messages">Messages</Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="d-flex align-items-center gap-1">
              <FiLogIn /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="ms-lg-2">
              <Button variant="primary" className="d-flex align-items-center gap-1">
                <FiUserPlus /> Get Started
              </Button>
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}

export default Navbar
