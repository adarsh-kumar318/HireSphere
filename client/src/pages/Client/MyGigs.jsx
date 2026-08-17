import { Link } from 'react-router-dom'
import { clientGigs } from '../../data/mockData'

function MyGigs() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">My Gigs</h1>
          <p className="text-slate-400 text-sm">Manage all gigs you have posted</p>
        </div>
        <Link to="/client/post-gig" className="btn-primary">
          Post New Gig
        </Link>
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Proposals</th>
                <th className="px-6 py-4">Posted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {clientGigs.map((gig, i) => (
                <tr key={gig.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 text-slate-500 font-medium">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-white">{gig.title}</td>
                  <td className="px-6 py-4 text-indigo-400 font-semibold">{gig.budget}</td>
                  <td className="px-6 py-4">{gig.proposals}</td>
                  <td className="px-6 py-4">{gig.posted}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      gig.status === 'Open'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {gig.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/gigs/${gig.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 transition-all"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-500/15 text-slate-300 border border-slate-500/30 hover:bg-slate-500/25 transition-all"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyGigs
