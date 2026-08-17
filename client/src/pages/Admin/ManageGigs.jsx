import { useState } from 'react'
import { gigs as initialGigs } from '../../data/mockData'

function ManageGigs() {
  const [gigs, setGigs] = useState(initialGigs)

  const updateStatus = (id, status) => {
    setGigs(gigs.map((g) => (g.id === id ? { ...g, status } : g)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Manage Gigs</h1>
        <p className="text-slate-400 text-sm">Review and moderate posted gigs</p>
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {gigs.map((g) => (
                <tr key={g.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{g.title}</td>
                  <td className="px-6 py-4">{g.client}</td>
                  <td className="px-6 py-4">{g.category}</td>
                  <td className="px-6 py-4 text-indigo-400 font-semibold">{g.budgetLabel}</td>
                  <td className="px-6 py-4">{g.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      g.status === 'Open'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : g.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => updateStatus(g.id, 'Open')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(g.id, 'Closed')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-all"
                    >
                      Remove
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

export default ManageGigs
