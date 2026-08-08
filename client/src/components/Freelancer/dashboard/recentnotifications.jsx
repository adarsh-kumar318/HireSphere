import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    client: "Tech Solutions",
    budget: "$1,200",
    status: "In Progress",
    deadline: "28 Jul 2026",
  },
  {
    id: 2,
    title: "Portfolio Website",
    client: "John Smith",
    budget: "$450",
    status: "Completed",
    deadline: "22 Jul 2026",
  },
  {
    id: 3,
    title: "Mobile App UI",
    client: "Creative Studio",
    budget: "$900",
    status: "Pending",
    deadline: "02 Aug 2026",
  },
];

const statusColor = {
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const RecentProjects = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Projects
        </h2>

        <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="pb-3">Project</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Budget</th>
              <th className="pb-3">Deadline</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-4 font-medium">
                  {project.title}
                </td>

                <td>{project.client}</td>

                <td>{project.budget}</td>

                <td>{project.deadline}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProjects;