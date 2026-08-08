import ProposalCard from "./ProposalCard";
import EmptyProposals from "./EmptyProposals";

const ProposalList = ({
  proposals = [],
  loading = false,
  onHire,
  onReject,
  onView,
  onMessage,
}) => {
  // Loading State
  if (loading) {
    return (
      <div className="grid gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }


  // Empty State
  if (!proposals.length) {
    return <EmptyProposals />;
  }


  return (
    <div className="grid gap-6">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal._id}
          proposal={proposal}
          loading={loading}
          onHire={onHire}
          onReject={onReject}
          onView={onView}
          onMessage={onMessage}
        />
      ))}
    </div>
  );
};

export default ProposalList;