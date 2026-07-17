import { FiAward, FiBarChart2, FiTrendingUp } from 'react-icons/fi'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'

const branchStats = [
  { branch: 'CSE', placed: 142, eligible: 190 },
  { branch: 'IT', placed: 96, eligible: 128 },
  { branch: 'ECE', placed: 80, eligible: 122 },
]

function PlacementStatistics() {
  return (
    <>
      <PageHeader title="Placement Statistics" subtitle="Analyze placement performance by branch and drive." />
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard icon={FiAward} label="Highest package" value="18 LPA" /></div>
        <div className="col-md-4"><StatCard icon={FiTrendingUp} label="Average package" value="7.2 LPA" tone="success" /></div>
        <div className="col-md-4"><StatCard icon={FiBarChart2} label="Overall rate" value="72%" tone="warning" /></div>
      </div>
      <div className="card">
        <div className="card-header bg-white fw-semibold">Branch Placement Progress</div>
        <div className="card-body">
          {branchStats.map((item) => {
            const percent = Math.round((item.placed / item.eligible) * 100)
            return (
              <div className="mb-3" key={item.branch}>
                <div className="d-flex justify-content-between mb-1">
                  <strong>{item.branch}</strong>
                  <span className="text-secondary">{item.placed}/{item.eligible} placed</span>
                </div>
                <div className="progress" role="progressbar" aria-label={`${item.branch} placement progress`} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar" style={{ width: `${percent}%` }}>{percent}%</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PlacementStatistics
