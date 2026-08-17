import { myProposals } from '../../data/mockData'

const statusMap = {
  Accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Negotiating: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Submitted: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
}

function MyProposals() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">My Proposals</h1>
        <p className="text-slate-400 text-sm">Track all proposals you have submitted</p>
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4">Gig</th>
                <th className="px-6 py-4">Bid Amount</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {myProposals.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{p.gig}</td>
                  <td className="px-6 py-4 text-indigo-400 font-semibold">{p.bidAmount}</td>
                  <td className="px-6 py-4">{p.submitted}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      statusMap[p.status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {p.status}
                    </span>
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

export default MyProposals
