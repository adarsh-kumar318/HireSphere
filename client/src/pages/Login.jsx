import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'client' })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.email.includes('@')) next.email = 'Enter a valid email address.'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    if (!validate()) return

    const routes = {
      client: '/client/dashboard',
      freelancer: '/freelancer/dashboard',
      admin: '/admin/dashboard',
    }
    navigate(routes[form.role] || '/')
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h2 className="fw-bold text-center mb-1">Welcome back</h2>
              <p className="text-muted text-center mb-4">Sign in to your SkillSphere account</p>

              <Alert variant="info" className="small">
                Demo mode — any valid-looking credentials will redirect to the selected dashboard.
              </Alert>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiMail /></span>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      isInvalid={validated && !!errors.email}
                      isValid={validated && !errors.email && form.email.includes('@')}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiLock /></span>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      isInvalid={validated && !!errors.password}
                      isValid={validated && !errors.password && form.password.length >= 6}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Login as</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiUser /></span>
                    <Form.Select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <option value="client">Client</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 btn-teal mb-3">
                  Sign In
                </Button>
              </Form>

              <p className="text-center small text-muted mb-0">
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
