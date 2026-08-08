import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  change = 0,
  description,
}) => {
  const positive = change >= 0;

  const colorClasses = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-500/10",
      text: "text-red-600 dark:text-red-400",
    },
    violet: {
      bg: "bg-violet-100 dark:bg-violet-500/10",
      text: "text-violet-600 dark:text-violet-400",
    },
  };

  const theme = colorClasses[color] || colorClasses.blue;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.bg}`}
        >
          {Icon && <Icon className={theme.text} size={28} />}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            positive
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {Math.abs(change)}%
        </div>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;