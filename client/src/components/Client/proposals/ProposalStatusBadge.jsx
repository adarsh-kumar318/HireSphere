import clsx from "clsx";

const statusVariants = {
  pending: {
    label: "Pending",
    className:
      "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-400",
  },

  shortlisted: {
    label: "Shortlisted",
    className:
      "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-400",
  },

  accepted: {
    label: "Accepted",
    className:
      "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400",
  },

  rejected: {
    label: "Rejected",
    className:
      "border-red-200 bg-red-100 text-red-700 dark:border-red-500/30 dark:bg-red-500/15 dark:text-red-400",
  },

  withdrawn: {
    label: "Withdrawn",
    className:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
};

const ProposalStatusBadge = ({
  status = "pending",
  className = "",
}) => {
  const variant =
    statusVariants[status?.toLowerCase()] ||
    statusVariants.pending;

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

export default ProposalStatusBadge;