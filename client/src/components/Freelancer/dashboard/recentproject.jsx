const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      client: "ABC Pvt Ltd",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Portfolio Website",
      client: "John Smith",
      status: "Completed",
    },
    {
      id: 3,
      title: "Mobile App UI",
      client: "XYZ Solutions",
      status: "Pending",
    },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Recent Projects</h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.client}</p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;