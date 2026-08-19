import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const SidebarItem = ({
  to,
  icon: Icon,
  title,
  badge,
  end = false,
}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-300 hover:bg-slate-800 hover:text-blue-400"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon
              size={20}
              className={`transition ${
                isActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-blue-400"
              }`}
            />

            <span className="font-medium">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isActive
                    ? "bg-white text-blue-600"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {badge}
              </span>
            )}

            <ChevronRight
              size={16}
              className={`transition-transform ${
                isActive
                  ? "translate-x-1 text-white"
                  : "text-slate-500 group-hover:translate-x-1 group-hover:text-blue-400"
              }`}
            />
          </div>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;