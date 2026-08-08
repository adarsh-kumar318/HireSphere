import {
  CalendarDays,
  IndianRupee,
  User,
  Clock3,
  Flag,
} from "lucide-react";

const statusClasses = {
  Open:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",

  "In Progress":
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",

  Review:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400",

  Completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",

  Closed:
    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

const ProjectDetails = ({ project }) => {
  if (!project) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {project.title}
          </h2>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            statusClasses[project.status] ||
            "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Information Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={IndianRupee}
          title="Budget"
          value={project.budget}
        />

        <InfoCard
          icon={CalendarDays}
          title="Deadline"
          value={project.deadline}
        />

        <InfoCard
          icon={User}
          title="Assigned Freelancer"
          value={project.freelancer?.name || "Not Assigned"}
        />

        <InfoCard
          icon={Clock3}
          title="Created"
          value={project.createdAt}
        />
      </div>

      {/* Progress */}
      <div className="mt-10">
        <div className="mb-3 flex justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Project Progress
          </h3>

          <span className="font-semibold text-blue-600">
            {project.progress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      {/* Skills */}
      {project.skills?.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Required Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {project.requirements?.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Requirements
          </h3>

          <ul className="space-y-3">
            {project.requirements.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-slate-600 dark:text-slate-400"
              >
                <Flag
                  size={18}
                  className="mt-1 text-blue-600"
                />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value }) => (
  <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20">
      <Icon
        size={22}
        className="text-blue-600 dark:text-blue-400"
      />
    </div>

    <p className="text-sm text-slate-500 dark:text-slate-400">
      {title}
    </p>

    <h4 className="mt-2 font-semibold text-slate-900 dark:text-white">
      {value}
    </h4>
  </div>
);

export default ProjectDetails;