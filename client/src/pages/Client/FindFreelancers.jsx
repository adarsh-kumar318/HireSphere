import { useState, useEffect } from 'react'
import { searchFreelancers } from '../../services/marketplaceService'
import PageHeader from '../../components/Common/PageHeader'
import EmptyState from '../../components/Common/EmptyState'
import FreelancerCard from '../../components/Common/FreelancerCard'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import Button from '../../components/ui/Button'
import { FiSearch, FiFilter, FiUsers } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function FindFreelancers() {
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchFreelancers()
  }, [])

  const fetchFreelancers = async (query = '') => {
    try {
      setLoading(true)
      const data = await searchFreelancers({ q: query })
      setFreelancers(Array.isArray(data) ? data : (data.freelancers || []))
    } catch (error) {
      toast.error('Failed to load freelancers')
      setFreelancers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchFreelancers(search)
  }

  return (
    <div>
      <PageHeader
        title="Find Talent"
        subtitle="Discover top-rated professionals for your next project"
      />

      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <form onSubmit={handleSearch} className="flex-1 relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by skills, names, or titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#334155] rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </form>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none">
            <FiFilter /> Filters
          </Button>
          <Button onClick={handleSearch} className="flex-1 sm:flex-none">
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Finding perfect matches..." />
      ) : freelancers.length === 0 ? (
        <EmptyState
          icon={FiUsers}
          title="No Freelancers Found"
          description="We couldn't find any professionals matching your exact criteria."
          actionLabel="Clear Search"
          action={() => { setSearch(''); fetchFreelancers(''); }}
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {freelancers.map((freelancer) => (
            <FreelancerCard
              key={freelancer._id || freelancer.id}
              freelancer={freelancer}
              onHire={() => navigate(`/client/post-gig?invite=${freelancer._id || freelancer.id}`)}
              onViewProfile={() => navigate(`/freelancer/${freelancer._id || freelancer.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FindFreelancers
