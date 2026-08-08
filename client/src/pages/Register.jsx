import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '', role: 'freelancer',
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Name must be at least 2 characters.'
    if (!form.email.includes('@')) next.email = 'Enter a valid email address.'
    if (form.phone.length < 10) next.phone = 'Enter a valid phone number.'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    if (form.password !== form.confirm) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    if (!validate()) return
    navigate('/login')
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h2 className="fw-bold text-center mb-1">Create your account</h2>
              <p className="text-muted text-center mb-4">Join SkillSphere as a client or freelancer</p>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FiUser /></span>
                        <Form.Control
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          isInvalid={validated && !!errors.name}
                          isValid={validated && !errors.name && form.name.trim().length >= 2}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FiPhone /></span>
                        <Form.Control
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          isInvalid={validated && !!errors.phone}
                          isValid={validated && !errors.phone && form.phone.length >= 10}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FiMail /></span>
                    <Form.Control
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      isInvalid={validated && !!errors.email}
                      isValid={validated && !errors.email && form.email.includes('@')}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FiLock /></span>
                        <Form.Control
                          type="password"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          isInvalid={validated && !!errors.password}
                          isValid={validated && !errors.password && form.password.length >= 6}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FiLock /></span>
                        <Form.Control
                          type="password"
                          value={form.confirm}
                          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                          isInvalid={validated && !!errors.confirm}
                          isValid={validated && !errors.confirm && form.confirm === form.password && form.confirm.length >= 6}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>I want to</Form.Label>
                  <Form.Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="freelancer">Find work as a Freelancer</option>
                    <option value="client">Hire talent as a Client</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 btn-teal mb-3">
                  Create Account
                </Button>
              </Form>

              <p className="text-center small text-muted mb-0">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
