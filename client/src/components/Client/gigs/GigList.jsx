import GigCard from "./GigCard";

const GigList = ({
  gigs = [],
  loading = false,
  onEdit,
  onDelete,
  emptyState = null,
}) => {
  if (loading) {
    return (
      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (!loading && gigs.length === 0) {
    return emptyState;
  }

  return (
    <div className="grid gap-6">
      {gigs.map((gig) => (
        <GigCard
          key={gig._id}
          gig={gig}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GigList;