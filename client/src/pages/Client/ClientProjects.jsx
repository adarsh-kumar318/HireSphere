import DataTable from '../../components/Common/DataTable'
import MilestoneTracker from '../../components/Common/MilestoneTracker'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import { gigs, milestones } from '../../data/skillSphereData'

function ClientProjects() {
  return (
    <>
      <PageHeader title="Projects" subtitle="Track gig progress, milestones, files, and deadlines." />
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header bg-white fw-semibold">Active Projects</div>
            <div className="card-body p-0">
              <DataTable
                rows={gigs}
                columns={[
                  { key: 'title', label: 'Project' },
                  { key: 'location', label: 'Location' },
                  { key: 'type', label: 'Pricing' },
                  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <MilestoneTracker milestones={milestones} />
        </div>
      </div>
    </>
  )
}

export default ClientProjects
