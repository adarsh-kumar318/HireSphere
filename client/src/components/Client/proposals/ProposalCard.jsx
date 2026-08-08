import {
  CalendarDays,
  IndianRupee,
  Clock3,
  User,
  Star,
} from "lucide-react";

import ProposalStatusBadge from "./ProposalStatusBadge";
import ProposalActions from "./ProposalActions";

const ProposalCard = ({
  proposal,
  loading = false,
  onHire,
  onReject,
  onView,
  onMessage,
}) => {
  if (!proposal) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          {/* Freelancer Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <User size={24} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {proposal.freelancer?.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {proposal.freelancer?.title}
            </p>
          </div>
        </div>

        <ProposalStatusBadge
          status={proposal.status}
        />
      </div>


      {/* Proposal Info */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <InfoItem
          icon={IndianRupee}
          label="Bid Amount"
          value={proposal.amount}
        />

        <InfoItem
          icon={CalendarDays}
          label="Submitted"
          value={proposal.createdAt}
        />

        <InfoItem
          icon={Clock3}
          label="Delivery Time"
          value={proposal.deliveryTime}
        />

        <InfoItem
          icon={Star}
          label="Rating"
          value={
            proposal.freelancer?.rating
              ? `${proposal.freelancer.rating}/5`
              : "-"
          }
        />

      </div>


      {/* Cover Letter */}
      {proposal.coverLetter && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
            Proposal Message
          </h4>

          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
            {proposal.coverLetter}
          </p>
        </div>
      )}


      {/* Skills */}
      {proposal.skills?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {proposal.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}


      {/* Actions */}
      <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
        <ProposalActions
          proposal={proposal}
          loading={loading}
          onHire={onHire}
          onReject={onReject}
          onView={onView}
          onMessage={onMessage}
        />
      </div>

    </div>
  );
};


const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="dark:bg-blue-500/15 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
        <Icon
          size={18}
          className="text-blue-600 dark:text-blue-400"
        />
      </div>

      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {value ?? "-"}
        </p>
      </div>
    </div>
  );
};


export default ProposalCard;