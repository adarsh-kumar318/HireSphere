const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      client: "ABC Pvt Ltd",
      budget: "$1,200",
      deadline: "28 Jul 2026",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Portfolio Website",
      client: "John Smith",
      budget: "$450",
      deadline: "22 Jul 2026",
      status: "Completed",
    },
    {
      id: 3,
      title: "Mobile App UI",
      client: "XYZ Solutions",
      budget: "$900",
      deadline: "02 Aug 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Recent Projects
        </h2>

        <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
          View All →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-sm text-slate-400">
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
                className="border-b border-slate-800"
              >
                <td className="py-4 font-medium text-white">
                  {project.title}
                </td>

                <td className="py-4 text-slate-400">
                  {project.client}
                </td>

                <td className="py-4 text-blue-300">
                  {project.budget}
                </td>

                <td className="py-4 text-slate-400">
                  {project.deadline}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      project.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-400"
                        : project.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
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