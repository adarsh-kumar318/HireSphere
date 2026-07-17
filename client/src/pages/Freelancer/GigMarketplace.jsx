import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import AdvancedSearchPanel from '../../components/Common/AdvancedSearchPanel'
import GigCard from '../../components/Common/GigCard'
import PageHeader from '../../components/Common/PageHeader'
import { gigs } from '../../data/skillSphereData'
import { submitProposal } from '../../services/freelancerService'

const initialFilters = { query: '', location: '', category: '', budget: '', rating: '' }

function GigMarketplace() {
  const [filters, setFilters] = useState(initialFilters)

  const results = useMemo(
    () =>
      gigs.filter((gig) => {
        const text = `${gig.title} ${gig.category} ${gig.skills.join(' ')}`.toLowerCase()
        const matchesQuery = text.includes(filters.query.toLowerCase())
        const matchesLocation = gig.location.toLowerCase().includes(filters.location.toLowerCase())
        const matchesCategory = !filters.category || gig.category === filters.category
        const matchesBudget = !filters.budget || Number(gig.budget) <= Number(filters.budget)
        return matchesQuery && matchesLocation && matchesCategory && matchesBudget
      }),
    [filters],
  )

  const apply = async (gig) => {
    try {
      await submitProposal({ gigId: gig.id, payload: { bidAmount: gig.budget, timeline: '14 days' } })
      toast.success(`Proposal submitted for ${gig.title}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Proposal endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Gig Marketplace" subtitle="Search hyperlocal projects and submit competitive proposals." />
      <AdvancedSearchPanel filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
      <div className="row g-3">
        {results.map((gig) => (
          <div className="col-lg-4" key={gig.id}>
            <GigCard gig={gig} action={<button className="btn btn-primary w-100" type="button" onClick={() => apply(gig)}>Submit Proposal</button>} />
          </div>
        ))}
      </div>
    </>
  )
}

export default GigMarketplace
