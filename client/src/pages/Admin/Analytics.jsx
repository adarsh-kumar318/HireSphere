import { Row, Col, Card } from 'react-bootstrap'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { analyticsData } from '../../data/mockData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

function Analytics() {
  const revenueChart = {
    labels: analyticsData.monthlyLabels,
    datasets: [{
      label: 'Revenue (₹)',
      data: analyticsData.monthlyRevenue,
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13, 110, 253, 0.1)',
      tension: 0.3,
      fill: true,
    }],
  }

  const userChart = {
    labels: analyticsData.monthlyLabels,
    datasets: [{
      label: 'Total Users',
      data: analyticsData.userGrowth,
      backgroundColor: '#0d9488',
    }],
  }

  const categoryChart = {
    labels: analyticsData.gigsByCategory.labels,
    datasets: [{
      data: analyticsData.gigsByCategory.values,
      backgroundColor: ['#0d6efd', '#0d9488', '#198754', '#ffc107', '#6c757d'],
    }],
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="h3 fw-bold mb-1">Analytics</h1>
        <p className="text-muted mb-0">Platform performance and growth metrics</p>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">Monthly Revenue</Card.Header>
            <Card.Body>
              <Line data={revenueChart} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Gigs by Category</Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <div style={{ maxWidth: 220 }}>
                <Doughnut data={categoryChart} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">User Growth</Card.Header>
            <Card.Body>
              <Bar data={userChart} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Analytics
