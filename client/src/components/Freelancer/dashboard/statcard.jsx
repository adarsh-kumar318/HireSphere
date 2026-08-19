import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  change = "",
}) => {
  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} shadow-lg`}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>

      {change !== "" && (
        <div className="mt-6 flex items-center gap-2">
          <TrendingUp size={16} className="text-green-400" />

          <span className="text-sm font-medium text-green-400">
            {change}
          </span>

          <span className="text-sm text-slate-500">
            from last month
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;