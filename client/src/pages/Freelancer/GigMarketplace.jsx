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

      const data = await searchGigs({
        keyword: query,
        limit: 6,
      })

      setGigs(
        Array.isArray(data)
          ? data
          : Array.isArray(data?.gigs)
            ? data.gigs
            : []
      )
    } catch (error) {
      console.error('Marketplace error:', error)

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

  const handleClearSearch = () => {
    setSearch('')
    fetchGigs('')
  }

  const handleApply = (id) => {
    navigate(`/freelancer/proposals/new/${id}`)
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <PageHeader
        title="Gig Marketplace"
        subtitle="Find the perfect project that matches your skills"
      />

      {/* Search & Filter */}
      <div className="mb-8 rounded-2xl border border-[#334155] bg-[#1E293B] p-4">

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 lg:flex-row lg:items-center"
        >

          {/* Search Input */}
          <div className="relative w-full flex-1">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search by keywords, skills, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#334155] bg-[#0F172A] py-3 pl-11 pr-4 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 lg:w-auto">

            <Button
              type="button"
              variant="secondary"
              onClick={() => fetchGigs(search)}
              className="flex flex-1 items-center justify-center gap-2 lg:flex-none"
            >
              <FiFilter size={16} />
              Filters
            </Button>

            <Button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 lg:flex-none"
            >
              <FiSearch size={16} />
              Search
            </Button>

          </div>

        </form>
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner message="Loading gigs..." />
      ) : gigs.length === 0 ? (
        <EmptyState
          title="No Gigs Found"
          description="Try adjusting your search criteria or check back later for new opportunities."
          actionLabel="Clear Search"
          action={handleClearSearch}
        />
      ) : (
        <>
          {/* Results Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Available Opportunities
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {gigs.length} {gigs.length === 1 ? 'gig' : 'gigs'} found
              </p>
            </div>
          </div>

          {/* Gig Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gigs.map((gig) => {
              const gigId = gig._id || gig.id

              return (
                <GigCard
                  key={gigId}
                  gig={gig}
                  action={
                    <Button
                      type="button"
                      className="w-full justify-center"
                      onClick={() => handleApply(gigId)}
                    >
                      Apply Now
                    </Button>
                  }
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default GigMarketplace