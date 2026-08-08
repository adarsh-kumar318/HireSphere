import clsx from "clsx";


const availabilityVariants = {
  available: {
    label: "Available",
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
  },

  busy: {
    label: "Busy",
    className:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30",
  },

  unavailable: {
    label: "Not Available",
    className:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30",
  },

  away: {
    label: "Away",
    className:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  },
};


const AvailabilityBadge = ({
  status = "available",
  className = "",
}) => {

  const variant =
    availabilityVariants[
      status?.toLowerCase()
    ] || availabilityVariants.available;


  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variant.className,
        className
      )}
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-current" />

      {variant.label}

    </span>
  );
};


export default AvailabilityBadge;