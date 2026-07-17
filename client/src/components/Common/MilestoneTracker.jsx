function MilestoneTracker({ milestones }) {
  return (
    <div className="card">
      <div className="card-header bg-white fw-semibold">Project Progress Tracker</div>
      <div className="card-body">
        {milestones.map((milestone) => (
          <div className="mb-3" key={milestone.id}>
            <div className="d-flex justify-content-between mb-1">
              <strong>{milestone.title}</strong>
              <span className="text-secondary small">Due {milestone.due}</span>
            </div>
            <div className="progress" role="progressbar" aria-label={milestone.title} aria-valuenow={milestone.progress} aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{ width: `${milestone.progress}%` }}>{milestone.progress}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MilestoneTracker
