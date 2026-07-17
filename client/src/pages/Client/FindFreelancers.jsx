import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import AdvancedSearchPanel from '../../components/Common/AdvancedSearchPanel'
import FreelancerCard from '../../components/Common/FreelancerCard'
import PageHeader from '../../components/Common/PageHeader'
import { freelancers, trendingSkills } from '../../data/skillSphereData'
import { inviteFreelancer } from '../../services/clientService'

const initialFilters = { query: '', location: '', category: '', budget: '', rating: '' }

function FindFreelancers() {
  const [filters, setFilters] = useState(initialFilters)

  const results = useMemo(
    () =>
      freelancers.filter((freelancer) => {
        const text = `${freelancer.name} ${freelancer.title} ${freelancer.skills.join(' ')}`.toLowerCase()
        const matchesQuery = text.includes(filters.query.toLowerCase())
        const matchesLocation = freelancer.location.toLowerCase().includes(filters.location.toLowerCase())
        const matchesRating = !filters.rating || freelancer.rating >= Number(filters.rating)
        return matchesQuery && matchesLocation && matchesRating
      }),
    [filters],
  )

  const handleInvite = async (freelancer) => {
    try {
      await inviteFreelancer({ gigId: 1, freelancerId: freelancer.id })
      toast.success(`Invitation sent to ${freelancer.name}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invite endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Find Freelancers" subtitle="Use location, skill, price, rating, and AI match signals." />
      <AdvancedSearchPanel filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
      <div className="card mb-3">
        <div className="card-body d-flex flex-wrap gap-2 align-items-center">
          <strong className="me-2">Trending skills</strong>
          {trendingSkills.map((skill) => <span className="badge text-bg-light border" key={skill}>{skill}</span>)}
        </div>
      </div>
      <div className="row g-3">
        {results.map((freelancer) => (
          <div className="col-lg-4" key={freelancer.id}>
            <FreelancerCard
              freelancer={freelancer}
              action={<button className="btn btn-primary w-100" type="button" onClick={() => handleInvite(freelancer)}>Invite to Gig</button>}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default FindFreelancers
