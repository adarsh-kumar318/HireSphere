import {
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
} from "lucide-react";

const ProposalActions = ({
  proposal,
  loading = false,
  onHire,
  onReject,
  onView,
  onMessage,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Hire */}
      <button
        type="button"
        disabled={loading}
        onClick={() => onHire?.(proposal)}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CheckCircle size={16} />
        Hire
      </button>

      {/* Reject */}
      <button
        type="button"
        disabled={loading}
        onClick={() => onReject?.(proposal)}
        className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:hover:bg-red-500/10"
      >
        <XCircle size={16} />
        Reject
      </button>

      {/* View */}
      <button
        type="button"
        onClick={() => onView?.(proposal)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <Eye size={16} />
        View
      </button>

      {/* Message */}
      <button
        type="button"
        onClick={() => onMessage?.(proposal)}
        className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-500/30 dark:hover:bg-blue-500/10"
      >
        <MessageSquare size={16} />
        Message
      </button>
    </div>
  );
};

export default ProposalActions;