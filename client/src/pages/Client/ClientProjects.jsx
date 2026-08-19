import DataTable from '../../components/Common/DataTable'
import MilestoneTracker from '../../components/Common/MilestoneTracker'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { gigs, milestones } from '../../data/skillSphereData'

function ClientProjects() {
  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Track project progress, milestones, submissions, files, and deadlines."
      />

      <div className="row g-3">
        {/* Projects */}
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header fw-semibold bg-white">
              Active Projects
            </div>

            <div className="card-body p-0">
              <DataTable
                rows={gigs}
                columns={[
                  {
                    key: 'title',
                    label: 'Project',
                  },
                  {
                    key: 'location',
                    label: 'Location',
                  },
                  {
                    key: 'type',
                    label: 'Pricing',
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: (row) => (
                      <StatusBadge status={row.status} />
                    ),
                  },
                  {
                    key: 'submission',
                    label: 'Submission',
                    render: (row) => (
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                      >
                        {row.submissionStatus === 'submitted'
                          ? 'Review Submission'
                          : 'View Submission'}
                      </button>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="col-lg-5">
          <MilestoneTracker milestones={milestones} />
        </div>
      </div>
    </>
  )
}

export default ClientProjects