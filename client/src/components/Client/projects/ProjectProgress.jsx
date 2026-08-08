const ProjectProgress = ({
  progress = 0,
  completedMilestones = 0,
  totalMilestones = 0,
}) => {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Project Progress
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Overall completion status of this project.
          </p>
        </div>

        <span className="text-2xl font-bold text-blue-600">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {/* Footer */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completed Milestones
          </p>

          <h4 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {completedMilestones}
          </h4>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Milestones
          </p>

          <h4 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {totalMilestones}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;