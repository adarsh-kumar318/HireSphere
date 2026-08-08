import { Link } from "react-router-dom";
import {
  CalendarDays,
  IndianRupee,
  User,
  ArrowRight,
} from "lucide-react";

const statusStyles = {
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

const ProjectCard = ({ project }) => {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {project.description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[project.status]
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Info */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <IndianRupee size={17} />
          <span>{project.budget}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <CalendarDays size={17} />
          <span>{project.deadline}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <User size={17} />
          <span>{project.freelancer}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Progress
          </span>

          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {project.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Created {project.createdAt}
        </p>

        <Link
          to={`/client/project/${project.id}`}
          className="flex items-center gap-2 font-medium text-blue-600 transition group-hover:gap-3"
        >
          View Details
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;