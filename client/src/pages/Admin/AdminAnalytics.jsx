import { FiBriefcase, FiCreditCard, FiTrendingUp, FiUsers } from 'react-icons/fi'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import { platformStats, trendingSkills } from '../../data/skillSphereData'

function AdminAnalytics() {
  return (
    <>
      <PageHeader title="Admin Analytics" subtitle="Platform revenue, active users, top categories, and success rate." />
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={FiCreditCard} label="Revenue" value={`Rs ${platformStats.revenue}`} /></div>
        <div className="col-md-3"><StatCard icon={FiUsers} label="Freelancers" value={platformStats.activeFreelancers} tone="success" /></div>
        <div className="col-md-3"><StatCard icon={FiBriefcase} label="Success rate" value={platformStats.jobSuccessRate} tone="warning" /></div>
        <div className="col-md-3"><StatCard icon={FiTrendingUp} label="Growth" value="24%" tone="info" /></div>
      </div>
      <div className="card">
        <div className="card-header bg-white fw-semibold">Top Skill Categories</div>
        <div className="card-body d-flex flex-wrap gap-2">
          {trendingSkills.map((skill) => <span className="badge text-bg-light border p-2" key={skill}>{skill}</span>)}
        </div>
      </div>
    </>
  )
}

export default AdminAnalytics
