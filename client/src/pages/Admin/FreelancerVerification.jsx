import { toast } from 'react-toastify'
import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { freelancers } from '../../data/skillSphereData'
import { verifyFreelancer } from '../../services/adminService'

function FreelancerVerification() {
  const decide = async (freelancer, status) => {
    try {
      await verifyFreelancer({ freelancerId: freelancer.id, status })
      toast.success(`${freelancer.name} marked ${status}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader title="Freelancer Verification" subtitle="Review resumes, certificates, badges, and professional proof." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={freelancers}
            columns={[
              { key: 'name', label: 'Freelancer' },
              { key: 'title', label: 'Specialization' },
              { key: 'location', label: 'Location' },
              { key: 'status', label: 'Badge', render: (row) => <StatusBadge status={row.verified ? 'Verified' : 'Pending'} /> },
              {
                key: 'action',
                label: 'Action',
                render: (row) => (
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-success" type="button" onClick={() => decide(row, 'Verified')}>Verify</button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => decide(row, 'Rejected')}>Reject</button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default FreelancerVerification
