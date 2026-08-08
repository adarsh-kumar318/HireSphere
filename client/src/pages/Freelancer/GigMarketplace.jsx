import { useState, useEffect } from 'react'
import { searchGigs } from '../../services/marketplaceService'
import PageHeader from '../../components/Common/PageHeader'
import EmptyState from '../../components/Common/EmptyState'
import GigCard from '../../components/Common/GigCard'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import Button from '../../components/ui/Button'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function GigMarketplace() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchGigs()
  }, [])

  const fetchGigs = async (query = '') => {
    try {
      setLoading(true)
      const data = await searchGigs({ q: query, status: 'open' })
      setGigs(Array.isArray(data) ? data : (data.gigs || []))
    } catch (error) {
      toast.error('Failed to load marketplace gigs')
      setGigs([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchGigs(search)
  }

  const handleApply = (id) => {
    navigate(`/freelancer/proposals/new/${id}`)
  }

  return (
    <div>
      <PageHeader
        title="Gig Marketplace"
        subtitle="Find the perfect project that matches your skills"
      />

      {/* Filters / Search Bar */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <form onSubmit={handleSearch} className="flex-1 relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by keywords, skills, or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#334155] rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </form>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="secondary" onClick={() => fetchGigs(search)} className="flex-1 sm:flex-none">
            <FiFilter /> Filters
          </Button>
          <Button onClick={handleSearch} className="flex-1 sm:flex-none">
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading gigs..." />
      ) : gigs.length === 0 ? (
        <EmptyState
          title="No Gigs Found"
          description="Try adjusting your search criteria or check back later for new opportunities."
          actionLabel="Clear Search"
          action={() => { setSearch(''); fetchGigs(''); }}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard
              key={gig._id || gig.id}
              gig={gig}
              action={
                <Button className="w-full justify-center" onClick={() => handleApply(gig._id || gig.id)}>
                  Apply Now
                </Button>
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GigMarketplace
