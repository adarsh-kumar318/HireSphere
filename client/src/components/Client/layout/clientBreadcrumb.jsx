import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames = {
  dashboard: "Dashboard",
  project: "Projects",
  postgigs: "Post Gig",
  mygigs: "My Gigs",
  findfreelancer: "Find Freelancer",
  proposal: "Proposals",
  payment: "Payments",
  collaboration: "Collaboration",
  notifications: "Notifications",
  profile: "Profile",
  settings: "Settings",
};

const ClientBreadcrumb = () => {
  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      {/* Home */}
      <Link
        to="/"
        className="flex items-center gap-2 transition-colors hover:text-blue-600"
      >
        <Home size={16} />
        <span>Home</span>
      </Link>

      {paths.map((path, index) => {
        const url = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        return (
          <div
            key={url}
            className="flex items-center gap-2"
          >
            <ChevronRight size={15} />

            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white">
                {routeNames[path] || path}
              </span>
            ) : (
              <Link
                to={url}
                className="transition-colors hover:text-blue-600"
              >
                {routeNames[path] || path}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ClientBreadcrumb;