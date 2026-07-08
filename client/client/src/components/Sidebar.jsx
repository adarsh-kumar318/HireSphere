import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark p-3 text-white"
      style={{
        width: "240px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Dashboard</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/jobs">
            Jobs
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/profile">
            Profile
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;