import { Link } from "react-router-dom";
import { FolderOpen, Plus } from "lucide-react";

const EmptyProjects = ({
  title = "No Projects Found",
  description = "You haven't created any projects yet. Start by posting your first project and hire the best freelancer.",
  actionText = "Post New Project",
  actionLink = "/client/post-gig",
}) => {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
          <FolderOpen
            size={40}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <Link
          to={actionLink}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
        >
          <Plus size={18} />
          {actionText}
        </Link>
      </div>
    </div>
  );
};

export default EmptyProjects;
