import clsx from "clsx";

const statusVariants = {
  draft: {
    label: "Draft",
    className:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  },

  active: {
    label: "Active",
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
  },

  paused: {
    label: "Paused",
    className:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30",
  },

  closed: {
    label: "Closed",
    className:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30",
  },

  completed: {
    label: "Completed",
    className:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30",
  },
};

const GigStatusBadge = ({
  status = "draft",
  className = "",
}) => {
  const variant =
    statusVariants[status?.toLowerCase()] ||
    statusVariants.draft;

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        variant.className,
        className
      )}
    >
      {variant.label}
    </span>
  );
};

export default GigStatusBadge;
