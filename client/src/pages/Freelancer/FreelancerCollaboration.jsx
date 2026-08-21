import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiArrowRight,
  FiUpload,
  FiX,
} from "react-icons/fi";

import PageHeader from "../../components/Common/PageHeader";
import {
  getMyCollaborations,
  submitProject,
} from "../../services/collaborationService";

// ==========================================
// Empty State
// ==========================================
const EmptyState = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-[#26364c] bg-[#102238] px-4 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c2a40]">
        <Icon size={18} className="text-slate-500" />
      </div>

      <p className="mt-3 text-xs font-medium text-slate-300">
        {title}
      </p>

      <p className="mt-1 max-w-sm text-[10px] text-slate-500">
        {description}
      </p>
    </div>
  );
};

// ==========================================
// Submission Modal
// ==========================================
const SubmissionForm = ({
  application,
  onClose,
  onSubmitted,
}) => {
  const [message, setMessage] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Submission message is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();

      formData.append(
        "message",
        message.trim()
      );

      if (liveDemoUrl.trim()) {
        formData.append(
          "liveDemoUrl",
          liveDemoUrl.trim()
        );
      }

      files.forEach((file) => {
        formData.append("files", file);
      });

      await submitProject(
        application._id,
        formData
      );

      onSubmitted();
    } catch (err) {
      console.error(
        "SUBMIT PROJECT ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to submit project."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-xl border border-[#26364c] bg-[#102238] p-5 shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Submit Project
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Submit your completed work to the client.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-[#1c2a40] hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-[10px] text-red-400">
            <FiAlertCircle size={14} />
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4"
        >

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-300">
              Submission Message
            </label>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              rows={5}
              placeholder="Describe the work you have completed..."
              className="w-full resize-none rounded-lg border border-[#334258] bg-[#07182a] px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
            />
          </div>

          {/* Live Demo */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-300">
              Live Demo URL
            </label>

            <input
              type="url"
              value={liveDemoUrl}
              onChange={(e) =>
                setLiveDemoUrl(e.target.value)
              }
              placeholder="https://your-project.vercel.app"
              className="w-full rounded-lg border border-[#334258] bg-[#07182a] px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
            />
          </div>

          {/* Files */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-300">
              Project Files
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#334258] bg-[#07182a] px-4 py-6 text-xs text-slate-400 transition hover:border-violet-500 hover:text-violet-300">
              <FiUpload size={16} />

              <span>
                Select project files
              </span>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) =>
                  setFiles(
                    Array.from(
                      e.target.files || []
                    )
                  )
                }
              />
            </label>

            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="rounded-md bg-[#07182a] px-3 py-2 text-[10px] text-slate-400"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t border-[#26364c] pt-4">

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-[#334258] bg-[#1c2a40] px-4 py-2 text-[10px] font-medium text-slate-300 transition hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-[10px] font-medium text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <FiRefreshCw
                    size={13}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheckCircle size={13} />
                  Submit Project
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// Main Component
// ==========================================
function FreelancerCollaboration() {
  const [collaborations, setCollaborations] =
    useState({
      active: [],
      pending: [],
      completed: [],
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedProject, setSelectedProject] =
    useState(null);

  // ==========================================
  // Fetch Collaborations
  // ==========================================
  const fetchCollaborations = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMyCollaborations();

      console.log(
        "COLLABORATIONS RESPONSE:",
        response
      );

      if (response?.success) {
        setCollaborations(
          response.collaborations || {
            active: [],
            pending: [],
            completed: [],
          }
        );
      } else {
        setError(
          response?.message ||
            "Unable to load collaborations."
        );
      }
    } catch (err) {
      console.error(
        "COLLABORATIONS ERROR:",
        err
      );

      console.error(
        "STATUS:",
        err.response?.status
      );

      console.error(
        "DATA:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          "Unable to load collaborations."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    fetchCollaborations();
  }, []);

  // ==========================================
  // Helpers
  // ==========================================
  const getJobTitle = (application) => {
    return (
      application?.job?.title ||
      "Untitled Project"
    );
  };

  const getClientName = (application) => {
    return (
      application?.job?.createdBy?.name ||
      application?.job?.company?.name ||
      "Client"
    );
  };

  const getClientAvatar = (application) => {
    return (
      application?.job?.createdBy?.avatar ||
      ""
    );
  };

  const getBidAmount = (application) => {
    const amount = Number(
      application?.bidAmount || 0
    );

    return `₹${amount.toLocaleString(
      "en-IN"
    )}`;
  };

  const getTimeline = (application) => {
    return (
      application?.timeline ||
      "Timeline not specified"
    );
  };

  const getDate = (application) => {
    if (!application?.createdAt) {
      return "—";
    }

    return new Date(
      application.createdAt
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">

        <PageHeader
          title="Collaboration"
          subtitle="Work with clients through chat, files, video, and progress logs."
        />

        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center">

            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-violet-300" />

            <p className="mt-3 text-xs text-slate-400">
              Loading collaborations...
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (error) {
    return (
      <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">

        <PageHeader
          title="Collaboration"
          subtitle="Work with clients through chat, files, video, and progress logs."
        />

        <div className="mt-5 rounded-xl border border-red-500/20 bg-[#1c2a40] p-6 text-center">

          <FiAlertCircle
            size={28}
            className="mx-auto text-red-400"
          />

          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>

          <button
            onClick={fetchCollaborations}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-violet-600"
          >
            <FiRefreshCw size={13} />
            Try Again
          </button>

        </div>
      </div>
    );
  }

  const active =
    collaborations?.active || [];

  const pending =
    collaborations?.pending || [];

  const completed =
    collaborations?.completed || [];

  // ==========================================
  // Collaboration Card
  // ==========================================
  const CollaborationCard = ({
    application,
    type,
  }) => {
    const title =
      getJobTitle(application);

    const client =
      getClientName(application);

    const avatar =
      getClientAvatar(application);

    return (
      <div className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4 transition hover:border-[#3b4d68]">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">

            {avatar ? (
              <img
                src={avatar}
                alt={client}
                className="h-10 w-10 rounded-full border border-[#334258] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#26344a] text-sm font-semibold text-violet-300">
                {client
                  ?.charAt(0)
                  ?.toUpperCase() || "C"}
              </div>
            )}

            <div className="min-w-0">

              <h3 className="truncate text-sm font-semibold text-white">
                {title}
              </h3>

              <p className="mt-0.5 truncate text-[10px] text-slate-400">
                Client: {client}
              </p>

            </div>
          </div>

          {type === "active" && (
            <span className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-medium text-emerald-400">
              Active
            </span>
          )}

          {type === "pending" && (
            <span className="shrink-0 rounded-full bg-amber-400/10 px-2.5 py-1 text-[9px] font-medium text-amber-400">
              Pending
            </span>
          )}

          {type === "completed" && (
            <span className="shrink-0 rounded-full bg-violet-300/10 px-2.5 py-1 text-[9px] font-medium text-violet-300">
              Completed
            </span>
          )}

        </div>

        {/* Details */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">

          <div className="rounded-lg border border-[#334258] bg-[#102238] p-2.5">

            <p className="text-[8px] uppercase tracking-wide text-slate-500">
              Budget
            </p>

            <p className="mt-1 text-xs font-semibold text-white">
              {getBidAmount(application)}
            </p>

          </div>

          <div className="rounded-lg border border-[#334258] bg-[#102238] p-2.5">

            <p className="text-[8px] uppercase tracking-wide text-slate-500">
              Timeline
            </p>

            <p className="mt-1 truncate text-xs font-semibold text-white">
              {getTimeline(application)}
            </p>

          </div>

          <div className="col-span-2 rounded-lg border border-[#334258] bg-[#102238] p-2.5 sm:col-span-1">

            <p className="text-[8px] uppercase tracking-wide text-slate-500">
              Applied
            </p>

            <p className="mt-1 text-xs font-semibold text-white">
              {getDate(application)}
            </p>

          </div>

        </div>

        {/* Cover Letter */}
        {application?.coverLetter && (
          <div className="mt-3 rounded-lg border border-[#334258] bg-[#102238] p-3">

            <p className="text-[8px] font-medium uppercase tracking-wide text-slate-500">
              Cover Letter
            </p>

            <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-slate-400">
              {application.coverLetter}
            </p>

          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-[#26364c] pt-3">

          <div className="flex items-center gap-1.5">

            {type === "active" && (
              <>
                <FiCheckCircle
                  size={12}
                  className="text-emerald-400"
                />

                <span className="text-[9px] text-slate-400">
                  Collaboration active
                </span>
              </>
            )}

            {type === "pending" && (
              <>
                <FiClock
                  size={12}
                  className="text-amber-400"
                />

                <span className="text-[9px] text-slate-400">
                  Waiting for client
                </span>
              </>
            )}

            {type === "completed" && (
              <>
                <FiCheckCircle
                  size={12}
                  className="text-violet-300"
                />

                <span className="text-[9px] text-slate-400">
                  Project completed
                </span>
              </>
            )}

          </div>

          {/* ACTIVE */}
          {type === "active" && (
            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() =>
                  setSelectedProject(
                    application
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-1.5 text-[9px] font-medium text-white transition hover:bg-violet-600"
              >
                <FiUpload size={11} />
                Submit
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#334258] bg-[#102238] px-3 py-1.5 text-[9px] font-medium text-slate-300 transition hover:text-white"
              >
                Open
                <FiArrowRight size={11} />
              </button>

            </div>
          )}

          {/* PENDING */}
          {type === "pending" && (
            <span className="text-[9px] text-slate-500">
              Awaiting approval
            </span>
          )}

          {/* COMPLETED */}
          {type === "completed" && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#334258] bg-[#102238] px-3 py-1.5 text-[9px] font-medium text-slate-300"
            >
              View
              <FiArrowRight size={11} />
            </button>
          )}

        </div>
      </div>
    );
  };

  // ==========================================
  // Render
  // ==========================================
  return (
    <div className="min-h-full bg-[#07182a] px-3 py-4 text-white sm:px-5">

      <PageHeader
        title="Collaboration"
        subtitle="Work with clients through chat, files, video, and progress logs."
      />

      {/* Summary */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-wide text-slate-500">
                Active
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {active.length}
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">

              <FiBriefcase
                size={14}
                className="text-emerald-400"
              />

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[9px] uppercase tracking-wide text-slate-500">
                Pending Requests
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {pending.length}
              </p>

            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">

              <FiClock
                size={14}
                className="text-amber-400"
              />

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-[#26364c] bg-[#1c2a40] p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[9px] uppercase tracking-wide text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {completed.length}
              </p>

            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-300/10">

              <FiCheckCircle
                size={14}
                className="text-violet-300"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Active */}
      <section>

        <div className="mb-3">

          <h2 className="text-base font-semibold text-white">
            Active Collaborations
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            Projects that have been accepted by clients.
          </p>

        </div>

        {active.length === 0 ? (
          <EmptyState
            icon={FiBriefcase}
            title="No active collaborations"
            description="Once a client accepts your application, the project will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">

            {active.map((application) => (
              <CollaborationCard
                key={application._id}
                application={application}
                type="active"
              />
            ))}

          </div>
        )}

      </section>

      {/* Pending */}
      <section className="mt-6">

        <div className="mb-3">

          <h2 className="text-base font-semibold text-white">
            Pending Requests
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            Applications waiting for client approval.
          </p>

        </div>

        {pending.length === 0 ? (
          <EmptyState
            icon={FiClock}
            title="No pending requests"
            description="Applications that are waiting for client approval will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">

            {pending.map((application) => (
              <CollaborationCard
                key={application._id}
                application={application}
                type="pending"
              />
            ))}

          </div>
        )}

      </section>

      {/* Completed */}
      <section className="mt-6">

        <div className="mb-3">

          <h2 className="text-base font-semibold text-white">
            Completed Collaborations
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            Your successfully completed projects.
          </p>

        </div>

        {completed.length === 0 ? (
          <EmptyState
            icon={FiCheckCircle}
            title="No completed collaborations"
            description="Completed projects will appear here once completion tracking is added."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">

            {completed.map((application) => (
              <CollaborationCard
                key={application._id}
                application={application}
                type="completed"
              />
            ))}

          </div>
        )}

      </section>

      {/* Submission Modal */}
      {selectedProject && (
        <SubmissionForm
          application={selectedProject}
          onClose={() =>
            setSelectedProject(null)
          }
          onSubmitted={() => {
            setSelectedProject(null);
            fetchCollaborations();
          }}
        />
      )}

    </div>
  );
}

export default FreelancerCollaboration;