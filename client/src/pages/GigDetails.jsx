import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiMapPin, FiClock, FiUsers, FiArrowLeft } from 'react-icons/fi'
import RatingStars from '../components/RatingStars'
import { gigs, proposals } from '../data/mockData'

function GigDetails() {
  const { id } = useParams()
  const gig = gigs.find((g) => g.id === Number(id))
  const gigProposals = proposals.filter((p) => p.gigId === Number(id))
  const [showModal, setShowModal] = useState(false)
  const [proposal, setProposal] = useState({ amount: '', timeline: '', coverLetter: '' })

  if (!gig) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Gig not found</h2>
        <Link to="/" className="btn-primary mt-4">Back to Home</Link>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  const isStatusOpen = gig.status === 'Open' || gig.status === 'Active'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6">
        <FiArrowLeft /> Back to gigs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold px-2.5 py-1 rounded-full">
              {gig.category}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              isStatusOpen 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {gig.status}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{gig.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{gig.client}</p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 pb-2">
            <span className="flex items-center gap-1"><FiMapPin className="text-cyan-400" /> {gig.location}</span>
            <span className="flex items-center gap-1"><FiClock className="text-cyan-400" /> {gig.type}</span>
            <span className="flex items-center gap-1"><FiUsers className="text-cyan-400" /> {gig.proposalsCount} proposals</span>
            {gig.rating && <RatingStars rating={gig.rating} size={14} />}
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-sm space-y-4">
            <h5 className="font-semibold text-white text-base">Description</h5>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{gig.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {gig.skills.map((s) => (
                <span key={s} className="bg-slate-800 text-slate-300 border border-slate-700 rounded-full px-2.5 py-1 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Milestones Card */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
              Milestones
            </div>
            <div className="divide-y divide-[#334155]">
              {gig.milestones?.map((m) => (
                <div key={m.id} className="p-4 flex justify-between items-center bg-slate-900/10 hover:bg-slate-800/20 transition-colors">
                  <div>
                    <div className="font-medium text-white text-sm">{m.title}</div>
                    <small className="text-slate-500 text-xs mt-0.5 block">Due: {m.dueDate}</small>
                  </div>
                  <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 text-xs font-semibold px-2.5 py-1 rounded-full">
                    ₹{m.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Proposals Card */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
              Proposals ({gigProposals.length})
            </div>
            <div className="divide-y divide-[#334155]">
              {gigProposals.length === 0 ? (
                <div className="p-5 text-slate-500 text-sm">No proposals yet.</div>
              ) : (
                gigProposals.map((p) => (
                  <div key={p.id} className="p-5 flex flex-col sm:flex-row justify-between gap-4 bg-slate-900/10 hover:bg-slate-800/20 transition-colors">
                    <div className="space-y-1">
                      <div className="font-semibold text-white text-sm">{p.freelancer}</div>
                      <p className="text-slate-400 text-xs leading-relaxed">{p.coverLetter}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0 flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2">
                      <div>
                        <div className="font-bold text-white text-sm">{p.bidAmount}</div>
                        <small className="text-slate-500 text-xs block mt-0.5">{p.timeline}</small>
                      </div>
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Column */}
        <div>
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-sm sticky top-24 space-y-4">
            <div>
              <div className="text-2xl font-bold text-white">{gig.budgetLabel}</div>
              <p className="text-slate-500 text-xs mt-1">Posted on {gig.postedDate}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full btn-primary flex justify-center py-3 text-sm font-bold"
            >
              Submit Proposal
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-[#334155] transition-all"
            >
              Save Gig
            </button>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />

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

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

export default GigDetails
