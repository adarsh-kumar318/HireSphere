import { useEffect, useState } from 'react'
import { FiBriefcase, FiUsers, FiFileText } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import PageHeader from '../../components/Common/PageHeader'
import StatCard from '../../components/Common/StatCard'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import EmptyState from '../../components/Common/EmptyState'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { getClientDashboard } from '../../services/dashboardService'
import api from '../../services/api'

function ClientDashboard() {
  const [loading, setLoading] = useState(true)
  const [dashboard, setDashboard] = useState(null)
  const [recentJobs, setRecentJobs] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await getClientDashboard()
        setDashboard(data.dashboard || data)
        const jobsRes = await api.get('/jobs', { params: { limit: 5 } })
        setRecentJobs(jobsRes.data?.jobs || [])
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <LoadingSpinner message="Loading client dashboard..." />

  return (
    <div>
      <PageHeader
        title="Client Dashboard"
        subtitle="Manage gigs, proposals, and hiring activity"
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={FiBriefcase} label="Total Gigs" value={dashboard?.totalJobs ?? '—'} />
        <StatCard icon={FiUsers} label="Proposals Received" value={dashboard?.totalApplications ?? '—'} tone="success" />
        <StatCard icon={FiFileText} label="Active Pipeline" value={recentJobs.length} tone="info" />
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-[#334155] px-6 py-4">
          <h2 className="font-semibold text-white">Recent Gigs</h2>
        </div>
        {recentJobs.length === 0 ? (
          <EmptyState title="No gigs yet" description="Post your first gig to start receiving proposals." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0F172A]/50 text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Title</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Budget</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job._id} className="border-t border-[#334155] text-slate-300">
                    <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                    <td className="px-6 py-4">{job.location}</td>
                    <td className="px-6 py-4">₹{job.salary?.toLocaleString?.('en-IN') ?? job.salary}</td>
                    <td className="px-6 py-4"><Badge variant="primary">{job.company}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ClientDashboard
