import {
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    iconClass:
      "text-emerald-600 dark:text-emerald-400",
    lineClass: "bg-emerald-500",
  },

  current: {
    icon: Clock3,
    iconClass:
      "text-blue-600 dark:text-blue-400",
    lineClass: "bg-blue-500",
  },

  pending: {
    icon: Circle,
    iconClass:
      "text-slate-400 dark:text-slate-500",
    lineClass: "bg-slate-300 dark:bg-slate-700",
  },
};

const ProjectTimeline = ({ milestones = [] }) => {
  if (!milestones.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No Milestones Yet
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Project milestones will appear here once they are created.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Project Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track project milestones and completion status.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {milestones.map((milestone, index) => {
          const config =
            statusConfig[milestone.status] ||
            statusConfig.pending;

          const Icon = config.icon;
          const isLast = index === milestones.length - 1;

          return (
            <div
              key={milestone._id || index}
              className="relative flex gap-5 pb-8"
            >
              {/* Left */}
              <div className="relative flex flex-col items-center">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                  <Icon
                    size={22}
                    className={config.iconClass}
                  />
                </div>

                {!isLast && (
                  <div
                    className={`mt-2 h-full w-1 rounded-full ${config.lineClass}`}
                  />
                )}
              </div>

              {/* Right */}
              <div className="flex-1 rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-md dark:border-slate-800">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {milestone.title}
                    </h3>

                    {milestone.description && (
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {milestone.description}
                      </p>
                    )}
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {milestone.status}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
                  {milestone.startDate && (
                    <div>
                      <span className="font-medium">
                        Start:
                      </span>{" "}
                      {milestone.startDate}
                    </div>
                  )}

                  {milestone.dueDate && (
                    <div>
                      <span className="font-medium">
                        Due:
                      </span>{" "}
                      {milestone.dueDate}
                    </div>
                  )}

                  {milestone.completedDate && (
                    <div>
                      <span className="font-medium">
                        Completed:
                      </span>{" "}
                      {milestone.completedDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectTimeline;