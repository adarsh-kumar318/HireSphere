import { useState, useMemo } from 'react'
import GigCard from '../../components/GigCard'
import { gigs, categories, locations } from '../../data/mockData'

function BrowseGigs() {
  const [filters, setFilters] = useState({ skill: '', budget: '', location: '', rating: '' })
  const [showModal, setShowModal] = useState(false)
  const [selectedGig, setSelectedGig] = useState(null)
  const [proposal, setProposal] = useState({ amount: '', timeline: '', coverLetter: '' })

  const filteredGigs = useMemo(() => {
    return gigs.filter((g) => {
      const matchSkill = !filters.skill || g.skills.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()))
      const matchLoc = !filters.location || g.location === filters.location
      const matchBudget = !filters.budget || g.budget <= Number(filters.budget)
      const matchRating = !filters.rating || g.rating >= Number(filters.rating)
      return matchSkill && matchLoc && matchBudget && matchRating
    })
  }, [filters])

  const openProposal = (gig) => {
    setSelectedGig(gig)
    setProposal({ amount: '', timeline: '', coverLetter: '' })
    setShowModal(true)
  }

  const submitProposal = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Browse Gigs</h1>
        <p className="text-slate-400 text-sm">Find hyperlocal projects matching your skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 shadow-sm h-fit space-y-4">
          <div className="font-semibold text-white text-base border-b border-[#334155] pb-3">
            Filters
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider">Skill</label>
              <input
                type="text"
                placeholder="e.g. React"
                value={filters.skill}
                onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider">Max Budget (₹)</label>
              <input
                type="number"
                placeholder="100000"
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full"
              >
                <option value="">All</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider">Min Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full"
              >
                <option value="">Any</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => setFilters({ skill: '', budget: '', location: '', rating: '' })}
              className="w-full inline-flex justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-[#334155] transition-all"
            >
              Clear Filters
            </button>
          </form>
        </div>

        {/* Gigs List */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <div key={gig.id} className="relative group">
                <GigCard gig={gig} />
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => openProposal(gig)}
                    className="px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg hover:shadow-indigo-600/30 transition-all duration-200"
                  >
                    Submit Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#334155]">
              <h2 className="text-lg font-bold text-white">Submit Proposal</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={submitProposal} className="p-6 space-y-4">
              {selectedGig && (
                <div className="text-slate-400 text-sm">
                  For: <strong className="text-white">{selectedGig.title}</strong>
                </div>
              )}

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Your Bid (₹)</label>
                <input
                  type="number"
                  required
                  value={proposal.amount}
                  onChange={(e) => setProposal({ ...proposal, amount: e.target.value })}
                  className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Timeline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 days"
                  value={proposal.timeline}
                  onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
                  className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Cover Letter</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell the client why you're a good fit..."
                  value={proposal.coverLetter}
                  onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })}
                  className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full placeholder-slate-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#334155]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-[#334155] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrowseGigs
