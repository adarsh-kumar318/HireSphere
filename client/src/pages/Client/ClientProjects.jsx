import { useEffect, useState } from "react";
import PageHeader from "../../components/Common/PageHeader";
import StatusBadge from "../../components/Common/StatusBadge";
import api from "../../services/api";

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/projects/client");

        setProjects(response.data?.projects || response.data || []);
      } catch (err) {
        console.error("Failed to fetch client projects:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Track project progress, milestones, submissions, files, and deadlines."
      />

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Active Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {projects.length} Active Projects
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
            Filter
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-300">
              work_outline
            </span>

            <h3 className="mt-3 text-base font-semibold text-slate-800">
              No projects found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your active projects will appear here.
            </p>
          </div>
        )}

        {/* Desktop Header */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
              <div className="col-span-4">Project</div>
              <div className="col-span-2">Freelancer</div>
              <div className="col-span-1">Pricing</div>
              <div className="col-span-2">Deadline</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Submission</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="divide-y divide-slate-200">
              {projects.map((project) => (
                <div
                  key={project._id || project.id}
                  className="grid grid-cols-1 gap-4 px-6 py-5 transition hover:bg-slate-50 md:grid-cols-12 md:items-center"
                >
                  {/* Project */}
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                        <span className="material-symbols-outlined text-blue-600">
                          work
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {project.title || project.name}
                        </h3>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {project.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Freelancer */}
                  <div className="md:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-slate-400 md:hidden">
                      Freelancer
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {project.freelancer?.name ||
                        project.freelancerName ||
                        "Not assigned"}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="md:col-span-1">
                    <span className="mb-1 block text-xs font-medium text-slate-400 md:hidden">
                      Pricing
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {project.budget || project.price
                        ? `$${project.budget || project.price}`
                        : "—"}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="md:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-slate-400 md:hidden">
                      Deadline
                    </span>

                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[18px]">
                        calendar_month
                      </span>

                      {project.deadline
                        ? new Date(project.deadline).toLocaleDateString()
                        : "—"}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-1">
                    <span className="mb-1 block text-xs font-medium text-slate-400 md:hidden">
                      Status
                    </span>

                    <StatusBadge status={project.status} />
                  </div>

                  {/* Submission */}
                  <div className="md:col-span-1">
                    <span className="mb-1 block text-xs font-medium text-slate-400 md:hidden">
                      Submission
                    </span>

                    {project.submissionStatus === "submitted" ? (
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        Submitted
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex justify-start md:col-span-1 md:justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {selectedProject.title || selectedProject.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Project Details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* Project Information */}
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="mb-4 font-semibold text-slate-900">
                  Project Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Description
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedProject.description || "No description"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Freelancer
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedProject.freelancer?.name ||
                        selectedProject.freelancerName ||
                        "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Budget
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedProject.budget ||
                      selectedProject.price
                        ? `$${selectedProject.budget || selectedProject.price}`
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Deadline
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedProject.deadline
                        ? new Date(
                            selectedProject.deadline
                          ).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission */}
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="mb-4 font-semibold text-slate-900">
                  Project Submission
                </h3>

                {selectedProject.submissionStatus === "submitted" ? (
                  <div>
                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                          <span className="material-symbols-outlined text-blue-600">
                            description
                          </span>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Project Submitted
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            The freelancer has submitted work for review.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Review Submission
                      </button>

                      <button
                        type="button"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Files
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-slate-50 px-4 py-10 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">
                      hourglass_empty
                    </span>

                    <p className="mt-3 text-sm text-slate-500">
                      No submission has been received yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProjects;