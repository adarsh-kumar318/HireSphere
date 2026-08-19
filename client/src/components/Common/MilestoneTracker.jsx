import PageHeader from '../../components/Common/PageHeader'
import MilestoneTracker from '../../components/Common/MilestoneTracker'

function ClientProjects() {
  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Track your projects, milestones, and submitted work."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Project section */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">
            Project Details
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Your project information and current work status will appear here.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-6 text-center">
            <p className="text-slate-400">
              No active project available.
            </p>
          </div>
        </div>

        {/* Milestone section */}
        <MilestoneTracker />
      </div>
    </>
  )
}

export default ClientProjects