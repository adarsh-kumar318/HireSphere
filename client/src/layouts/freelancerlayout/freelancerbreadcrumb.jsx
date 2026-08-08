import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const FreelancerBreadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((item) => item);

  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
      <Link
        to="/freelancer/dashboard"
        className="flex items-center gap-1 hover:text-blue-600"
      >
        <Home size={16} />
        Dashboard
      </Link>

      {pathnames.slice(1).map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 2).join("/");
        const isLast = index === pathnames.slice(1).length - 1;

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight size={16} />

            {isLast ? (
              <span className="font-semibold text-gray-800">
                {value
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-blue-600"
              >
                {value
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FreelancerBreadcrumb;