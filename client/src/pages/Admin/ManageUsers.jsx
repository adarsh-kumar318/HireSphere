import { useState } from 'react'
import { users as initialUsers } from '../../data/mockData'

function ManageUsers() {
  const [users, setUsers] = useState(initialUsers)

  const toggleStatus = (id) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ))
  }

  const toggleVerified = (id) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, verified: !u.verified } : u
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Manage Users</h1>
        <p className="text-slate-400 text-sm">Suspend, verify, and monitor platform users</p>
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider border-b border-[#334155]">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Verified</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{u.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      u.verified
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {u.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      u.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        u.status === 'Active'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25'
                          : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                      }`}
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button
                      onClick={() => toggleVerified(u.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        u.verified
                          ? 'bg-slate-500/15 text-slate-300 border-slate-500/30 hover:bg-slate-500/25'
                          : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/25'
                      }`}
                    >
                      {u.verified ? 'Unverify' : 'Verify'}
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

export default ManageUsers
