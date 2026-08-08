import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  change = "+0%",
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <TrendingUp size={16} className="text-green-500" />

        <span className="text-sm font-medium text-green-600">
          {change}
        </span>

        <span className="text-sm text-gray-500">
          from last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;