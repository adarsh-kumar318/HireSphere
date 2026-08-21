import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  FolderKanban,
  Clock3,
  CheckCircle2,
  FileCheck2,
  ExternalLink,
  FileText,
  Download,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import api from "../../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // ==========================================
  // Fetch Client Projects
  // ==========================================
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications/projects");

      const data =
        response.data?.projects ??
        response.data ??
        [];

      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Search + Filter
  // ==========================================
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const title =
        project.job?.title ||
        "";

      const freelancer =
        project.freelancer?.name ||
        "";

      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        freelancer.toLowerCase().includes(query);

      const status = getProjectStatus(project);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "in-progress" &&
          status === "in progress") ||
        (activeTab === "pending-review" &&
          status === "pending review") ||
        (activeTab === "completed" &&
          status === "completed");

      return matchesSearch && matchesTab;
    });
  }, [projects, activeTab, search]);

  // ==========================================
  // Stats
  // ==========================================
  const stats = useMemo(() => {
    return {
      total: projects.length,

      active: projects.filter(
        (project) =>
          getProjectStatus(project) === "in progress"
      ).length,

      completed: projects.filter(
        (project) =>
          getProjectStatus(project) === "completed"
      ).length,

      pendingReview: projects.filter(
        (project) =>
          getProjectStatus(project) === "pending review"
      ).length,
    };
  }, [projects]);

  // ==========================================
  // Toggle Project Submission
  // ==========================================
  const toggleProject = (projectId) => {
    setExpandedProject((current) =>
      current === projectId ? null : projectId
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ==========================================
          Header
      ========================================== */}
      <div className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
                Client Portal
              </p>

              <h1 className="font-serif text-4xl font-semibold tracking-tight text-white">
                My Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage commissions, monitor progress, and review
                submitted work from your freelancers.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Plus size={18} />
              Create Project
            </button>

          </div>
        </div>
      </div>

      {/* ==========================================
          Main
      ========================================== */}
      <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">

        {/* ==========================================
            Stats
        ========================================== */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            label="Total Projects"
            value={stats.total}
            icon={FolderKanban}
          />

          <StatCard
            label="Active"
            value={stats.active}
            icon={Clock3}
          />

          <StatCard
            label="Completed"
            value={stats.completed}
            icon={CheckCircle2}
          />

          <StatCard
            label="Pending Review"
            value={stats.pendingReview}
            icon={FileCheck2}
          />

        </section>

        {/* ==========================================
            Search + Filters
        ========================================== */}
        <section className="mt-10">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}
            <div className="relative w-full xl:max-w-md">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search project or freelancer..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />

            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">

              <FilterButton
                active={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              >
                All
              </FilterButton>

              <FilterButton
                active={activeTab === "in-progress"}
                onClick={() =>
                  setActiveTab("in-progress")
                }
              >
                In Progress
              </FilterButton>

              <FilterButton
                active={activeTab === "pending-review"}
                onClick={() =>
                  setActiveTab("pending-review")
                }
              >
                Pending Review
              </FilterButton>

              <FilterButton
                active={activeTab === "completed"}
                onClick={() =>
                  setActiveTab("completed")
                }
              >
                Completed
              </FilterButton>

            </div>
          </div>
        </section>

        {/* ==========================================
            Error
        ========================================== */}
        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-300">

            <AlertCircle size={18} />

            <span>{error}</span>

          </div>
        )}

        {/* ==========================================
            Loading
        ========================================== */}
        {loading ? (
          <div className="mt-10 grid gap-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-xl border border-slate-800 bg-slate-900"
              />
            ))}

          </div>
        ) : filteredProjects.length === 0 ? (

          <EmptyState search={search} />

        ) : (

          <section className="mt-10 grid gap-5">

            {filteredProjects.map((project) => {

              const projectId =
                project._id || project.id;

              return (
                <ProjectCard
                  key={projectId}
                  project={project}
                  expanded={
                    expandedProject === projectId
                  }
                  onToggle={() =>
                    toggleProject(projectId)
                  }
                />
              );
            })}

          </section>
        )}

      </main>
    </div>
  );
};

/* ==========================================
   Stats Card
========================================== */

const StatCard = ({
  label,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold text-white">
            {value}
          </p>

        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-blue-400">
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
};

/* ==========================================
   Project Card
========================================== */

const ProjectCard = ({
  project,
  expanded,
  onToggle,
}) => {
  const title =
    project.job?.title ||
    "Untitled Project";

  const freelancer =
    project.freelancer?.name ||
    "Freelancer";

  const budget = Number(
    project.bidAmount ??
      project.job?.budget ??
      0
  );

  const deadline =
    project.job?.deadline;

  const status =
    getProjectStatus(project);

  const statusConfig =
    getStatusConfig(status);

  /*
    Backend currently does not have a project
    progress field in the Application response.
    Therefore we do NOT invent a progress value.
  */
  const hasProgress =
    typeof project.progress === "number";

  const progress =
    hasProgress
      ? Math.min(
          100,
          Math.max(0, project.progress)
        )
      : null;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">

      {/* ==========================================
          Main Project Information
      ========================================== */}

      <div className="p-6 lg:p-7">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="font-serif text-2xl font-semibold text-white">
                {title}
              </h2>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusConfig.className}`}
              >
                {statusConfig.label}
              </span>

            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">

              <span>
                Freelancer:{" "}
                <span className="text-slate-200">
                  {freelancer}
                </span>
              </span>

              <span>
                Budget:{" "}
                <span className="font-medium text-slate-200">
                  {formatINR(budget)}
                </span>
              </span>

              <span>
                Deadline:{" "}
                <span className="text-slate-200">
                  {formatDate(deadline)}
                </span>
              </span>

            </div>

          </div>

          {/* ==========================================
              Project Submission Button
          ========================================== */}

          <ProjectAction
            project={project}
            expanded={expanded}
            onToggle={onToggle}
          />

        </div>

        {/* ==========================================
            Progress
        ========================================== */}

        {hasProgress && (
          <div className="mt-7">

            <div className="mb-2 flex items-center justify-between text-xs">

              <span className="uppercase tracking-wider text-slate-500">
                Project Progress
              </span>

              <span className="font-medium text-slate-300">
                {progress}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>
        )}

      </div>

      {/* ==========================================
          Submission Panel
      ========================================== */}

      {expanded && (
        <SubmissionPanel
          project={project}
        />
      )}

    </article>
  );
};

/* ==========================================
   Project Action
========================================== */

const ProjectAction = ({
  project,
  expanded,
  onToggle,
}) => {
  const status =
    getProjectStatus(project);

  /*
    Submission backend is not connected yet.
    We only show the button for project states
    that actually exist in the backend.
  */

  if (
    status !== "pending review" &&
    status !== "completed" &&
    status !== "changes requested"
  ) {
    return null;
  }

  let label = "Project Submission";

  if (status === "pending review") {
    label = expanded
      ? "Close Review"
      : "Review Submission";
  }

  if (status === "changes requested") {
    label = "View Revision";
  }

  if (status === "completed") {
    label = "View Submission";
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/20"
    >

      <FileCheck2 size={17} />

      {label}

      {status === "pending review" &&
        (expanded ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        ))}

    </button>
  );
};

/* ==========================================
   Submission Panel
========================================== */

const SubmissionPanel = ({
  project,
}) => {
  const submission =
    project.submission || {};

  const files =
    Array.isArray(submission.files)
      ? submission.files
      : [];

  const message =
    submission.message || "";

  const liveDemo =
    submission.liveDemoUrl ||
    submission.liveDemo ||
    "";

  return (
    <div className="border-t border-slate-800 bg-slate-950/60 p-6 lg:p-7">

      <div className="mb-6">

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
          Project Submission
        </p>

        <h3 className="mt-2 font-serif text-xl font-semibold text-white">
          Freelancer Delivery
        </h3>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ==========================================
            Files
        ========================================== */}

        <div>

          <p className="mb-3 text-sm font-semibold text-slate-200">
            Submitted Files
          </p>

          {files.length === 0 ? (

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-500">
              No files attached to this submission.
            </div>

          ) : (

            <div className="space-y-2">

              {files.map((file, index) => {

                const fileUrl =
                  typeof file === "string"
                    ? file
                    : file.url;

                const fileName =
                  typeof file === "string"
                    ? file.split("/").pop()
                    : file.name ||
                      `Document ${index + 1}`;

                return (
                  <a
                    key={
                      file._id ||
                      file.id ||
                      index
                    }
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3 transition hover:border-slate-700"
                  >

                    <span className="flex min-w-0 items-center gap-3">

                      <FileText
                        size={18}
                        className="shrink-0 text-blue-400"
                      />

                      <span className="truncate text-sm text-slate-300">
                        {fileName}
                      </span>

                    </span>

                    <Download
                      size={17}
                      className="shrink-0 text-slate-500"
                    />

                  </a>
                );
              })}

            </div>
          )}

        </div>

        {/* ==========================================
            Live Demo
        ========================================== */}

        <div>

          <p className="mb-3 text-sm font-semibold text-slate-200">
            Live Demo
          </p>

          {liveDemo ? (

            <a
              href={liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4 transition hover:border-blue-500/50"
            >

              <span className="flex items-center gap-3 text-sm text-slate-300">

                <ExternalLink
                  size={18}
                  className="text-blue-400"
                />

                Preview submitted work

              </span>

              <ExternalLink
                size={16}
                className="text-slate-500"
              />

            </a>

          ) : (

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-500">
              No live demo link provided.
            </div>

          )}

        </div>

      </div>

      {/* ==========================================
          Submission Message
      ========================================== */}

      <div className="mt-6">

        <p className="mb-3 text-sm font-semibold text-slate-200">
          Submission Message
        </p>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">

          {message ? (

            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
              {message}
            </p>

          ) : (

            <p className="text-sm text-slate-500">
              No submission message provided.
            </p>

          )}

        </div>

      </div>

      {/* ==========================================
          Review Actions
      ========================================== */}

      <div className="mt-7 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          disabled
          title="Submission review backend is not connected yet"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 opacity-50"
        >
          <MessageSquare size={17} />
          Request Changes
        </button>

        <button
          type="button"
          disabled
          title="Submission review backend is not connected yet"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white opacity-50"
        >
          <CheckCircle2 size={17} />
          Approve Submission
        </button>

      </div>

    </div>
  );
};

/* ==========================================
   Empty State
========================================== */

const EmptyState = ({ search }) => {
  return (
    <div className="mt-10 rounded-xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-16 text-center">

      <FolderKanban
        size={38}
        className="mx-auto text-slate-600"
      />

      <h3 className="mt-4 font-serif text-xl font-semibold text-white">
        {search
          ? "No projects found"
          : "No projects yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {search
          ? "Try a different project name or freelancer."
          : "Projects created and assigned through the platform will appear here."}
      </p>

    </div>
  );
};

/* ==========================================
   Filter Button
========================================== */

const FilterButton = ({
  active,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
};

/* ==========================================
   Get Project Status
========================================== */

const getProjectStatus = (project) => {
  const status = normalizeStatus(
    project.status
  );

  /*
    Current backend uses Application.status:
    accepted / rejected

    An accepted application represents the
    client's active project currently.
  */

  if (status === "accepted") {
    return "in progress";
  }

  return status;
};

/* ==========================================
   Normalize Status
========================================== */

const normalizeStatus = (status = "") => {
  return String(status)
    .trim()
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ");
};

/* ==========================================
   Status Config
========================================== */

const getStatusConfig = (status) => {
  switch (status) {
    case "completed":
      return {
        label: "Completed",
        className:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      };

    case "pending review":
      return {
        label: "Pending Review",
        className:
          "border-amber-500/30 bg-amber-500/10 text-amber-300",
      };

    case "changes requested":
      return {
        label: "Changes Requested",
        className:
          "border-orange-500/30 bg-orange-500/10 text-orange-300",
      };

    case "in progress":
      return {
        label: "In Progress",
        className:
          "border-blue-500/30 bg-blue-500/10 text-blue-300",
      };

    default:
      return {
        label: status || "Unknown",
        className:
          "border-slate-700 bg-slate-800/50 text-slate-400",
      };
  }
};

/* ==========================================
   INR
========================================== */

const formatINR = (amount) => {
  if (!Number.isFinite(amount)) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/* ==========================================
   Date
========================================== */

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export default Projects;