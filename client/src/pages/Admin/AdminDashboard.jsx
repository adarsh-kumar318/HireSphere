import { FiUsers, FiDollarSign, FiUserCheck, FiTrendingUp } from 'react-icons/fi'
import StatCard from '../../components/StatCard'
import { platformStats, users, gigs } from '../../data/mockData'

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-400 text-sm">Platform overview and quick actions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={platformStats.totalUsers.toLocaleString('en-IN')} icon={FiUsers} color="primary" />
        <StatCard title="Revenue" value={platformStats.revenue} icon={FiDollarSign} color="success" />
        <StatCard title="Active Freelancers" value={platformStats.activeFreelancers.toLocaleString('en-IN')} icon={FiUserCheck} color="teal" />
        <StatCard title="Job Success Rate" value={platformStats.jobSuccessRate} icon={FiTrendingUp} color="info" />
      </div>

      {/* Grid for tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
            Recent Users
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <tbody className="divide-y divide-[#334155]">
                {users.slice(0, 4).map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{u.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                        u.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Gigs */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
            Active Gigs
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <tbody className="divide-y divide-[#334155]">
                {gigs.slice(0, 4).map((g) => (
                  <tr key={g.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{g.title}</td>
                    <td className="px-5 py-3.5 text-indigo-400 font-semibold">{g.budgetLabel}</td>
                    <td className="px-5 py-3.5">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
