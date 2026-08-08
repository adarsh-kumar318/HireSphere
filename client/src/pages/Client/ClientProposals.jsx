import { useState, useEffect } from 'react'
import { getProposalsForClient, updateProposalStatus } from '../../services/gigService'
import PageHeader from '../../components/Common/PageHeader'
import EmptyState from '../../components/Common/EmptyState'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { FiFileText, FiClock, FiDollarSign } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

function ClientProposals() {
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    try {
      setLoading(true)
      const data = await getProposalsForClient()
      setProposals(Array.isArray(data) ? data : (data.proposals || []))
    } catch (error) {
      toast.error('Failed to load proposals')
      setProposals([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateProposalStatus(id, status)
      toast.success(`Proposal ${status.toLowerCase()}`)
      fetchProposals() // Refresh list
    } catch (error) {
      toast.error(`Failed to ${status.toLowerCase()} proposal`)
    }
  }

  return (
    <div>
      <PageHeader
        title="Review Proposals"
        subtitle="Manage and evaluate incoming bids from freelancers"
      />

      {loading ? (
        <LoadingSpinner message="Loading proposals..." />
      ) : proposals.length === 0 ? (
        <EmptyState
          icon={FiFileText}
          title="No Proposals Yet"
          description="You haven't received any proposals for your open gigs. Make sure your gigs are active and descriptive!"
        />
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal._id || proposal.id} className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                      Gig: {proposal.gig?.title || 'Unknown Gig'}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Proposal for {proposal.gig?.title}</h3>
                  </div>
                  <Badge variant={proposal.status === 'Accepted' ? 'success' : proposal.status === 'Rejected' ? 'danger' : 'warning'}>
                    {proposal.status || 'Pending'}
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-3 mb-4">
                  {proposal.coverLetter || 'No cover letter provided.'}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                    <FiDollarSign /> {proposal.bidAmount ? `₹${proposal.bidAmount}` : 'N/A'}
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
                    <FiClock /> {proposal.estimatedTime || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Freelancer info and Actions */}
              <div className="sm:w-64 border-t sm:border-t-0 sm:border-l border-[#334155] pt-4 sm:pt-0 sm:pl-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Submitted by</p>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar name={proposal.freelancer?.name} src={proposal.freelancer?.avatar} size="md" />
                    <div>
                      <p className="text-sm font-bold text-white">{proposal.freelancer?.name || 'Freelancer'}</p>
                      <p className="text-xs text-slate-400">View Profile →</p>
                    </div>
                  </div>
                </div>
                
                {(proposal.status === 'Pending' || proposal.status === 'Submitted') && (
                  <div className="flex flex-col gap-2">
                    <Button variant="success" size="sm" onClick={() => handleStatusUpdate(proposal._id || proposal.id, 'Accepted')}>
                      Accept
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleStatusUpdate(proposal._id || proposal.id, 'Rejected')}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClientProposals
