import { FiCreditCard, FiEye, FiStar, FiTarget } from 'react-icons/fi'
import GigCard from '../../components/Common/GigCard'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import { gigs } from '../../data/skillSphereData'

function FreelancerDashboard() {
  return (
    <>
      <PageHeader title="Freelancer Dashboard" subtitle="Track recommendations, earnings, reputation, and profile performance." />
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={FiEye} label="Profile views" value="1,248" /></div>
        <div className="col-md-3"><StatCard icon={FiTarget} label="AI matches" value="18" tone="success" /></div>
        <div className="col-md-3"><StatCard icon={FiCreditCard} label="Monthly revenue" value="2.4L" tone="warning" /></div>
        <div className="col-md-3"><StatCard icon={FiStar} label="Reputation" value="96" tone="info" /></div>
      </div>
      <PageHeader title="Recommended Gigs" subtitle="Personalized by skill similarity, location, and reputation score." />
      <div className="row g-3">
        {gigs.slice(0, 2).map((gig) => (
          <div className="col-lg-6" key={gig.id}><GigCard gig={gig} /></div>
        ))}
      </div>
    </>
  )
}

export default FreelancerDashboard
