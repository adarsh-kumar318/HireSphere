import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="h4 mb-3">Page not found</h2>
      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button as={Link} to="/" variant="primary" className="btn-teal">
        <FiHome className="me-2" /> Back to Home
      </Button>
    </Container>
  )
}

export default NotFound
