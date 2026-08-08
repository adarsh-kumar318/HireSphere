import { Card, Col } from 'react-bootstrap'

function StatCard({ title, value, icon: Icon, color = 'primary', subtitle }) {
  const bgClass = {
    primary: 'bg-primary bg-opacity-10 text-primary',
    success: 'bg-success bg-opacity-10 text-success',
    warning: 'bg-warning bg-opacity-10 text-warning',
    info: 'bg-info bg-opacity-10 text-info',
    teal: 'bg-teal bg-opacity-10 text-teal',
  }[color] || 'bg-primary bg-opacity-10 text-primary'

  return (
    <Col xs={12} sm={6} lg={3}>
      <Card className="card-stat h-100">
        <Card.Body className="d-flex align-items-center gap-3">
          <div className={`stat-icon ${bgClass}`}>
            {Icon && <Icon size={22} />}
          </div>
          <div>
            <div className="text-muted small">{title}</div>
            <div className="fs-4 fw-bold">{value}</div>
            {subtitle && <div className="small text-muted">{subtitle}</div>}
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default StatCard
