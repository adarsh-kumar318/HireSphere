import { FiBriefcase, FiCheckCircle, FiUsers } from 'react-icons/fi'
import StatCard from '../Common/StatCard'

function AdminSummary({ stats }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-4">
        <StatCard icon={FiUsers} label="Students" value={stats.students} helper="Registered profiles" />
      </div>
      <div className="col-12 col-md-4">
        <StatCard icon={FiBriefcase} label="Jobs" value={stats.jobs} tone="success" helper="Active postings" />
      </div>
      <div className="col-12 col-md-4">
        <StatCard icon={FiCheckCircle} label="Placements" value={stats.placements} tone="warning" helper="Selected students" />
      </div>
    </div>
  )
}

export default AdminSummary
