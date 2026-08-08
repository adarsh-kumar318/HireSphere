import { Link } from "react-router-dom";
import {
  CalendarDays,
  IndianRupee,
  Users,
  Eye,
  ArrowRight,
} from "lucide-react";
import GigStatusBadge from "./GigStatusBadge";

const GigCard = ({
  gig,
  onEdit,
  onDelete,
}) => {
  if (!gig) return null;

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-semibold text-slate-900 dark:text-white">
            {gig.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {gig.description}
          </p>
        </div>

        <GigStatusBadge status={gig.status} />
      </div>

      {/* Information */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <IndianRupee size={18} />
          <span>{gig.budget}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <CalendarDays size={18} />
          <span>{gig.deadline}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Users size={18} />
          <span>{gig.proposalCount ?? 0} Proposals</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Eye size={18} />
          <span>{gig.views ?? 0} Views</span>
        </div>
      </div>

      {/* Skills */}
      {gig.skills?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {gig.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Posted {gig.createdAt}
        </span>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit?.(gig)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(gig)}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
          >
            Delete
          </button>

          <Link
            to={`/client/my-gigs/${gig._id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GigCard;