import {
  CalendarDays,
  IndianRupee,
  BriefcaseBusiness,
  Clock3,
  Users,
  Eye,
} from "lucide-react";
import GigStatusBadge from "./GigStatusBadge";

const GigDetails = ({ gig }) => {
  if (!gig) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="break-words text-2xl font-bold text-slate-900 dark:text-white lg:text-3xl">
            {gig.title}
          </h1>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            {gig.description}
          </p>
        </div>

        <GigStatusBadge status={gig.status} />
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <InfoCard
          icon={IndianRupee}
          title="Budget"
          value={gig.budget}
        />

        <InfoCard
          icon={CalendarDays}
          title="Deadline"
          value={gig.deadline}
        />

        <InfoCard
          icon={BriefcaseBusiness}
          title="Category"
          value={gig.category}
        />

        <InfoCard
          icon={Users}
          title="Proposals"
          value={gig.proposalCount}
        />

        <InfoCard
          icon={Eye}
          title="Views"
          value={gig.views}
        />

        <InfoCard
          icon={Clock3}
          title="Posted On"
          value={gig.createdAt}
        />
      </div>

      {/* Skills */}
      {gig.skills?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {gig.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Requirements */}
      {gig.requirements?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Requirements
          </h2>

          <ul className="space-y-3">
            {gig.requirements.map((requirement, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />

                <span className="text-slate-600 dark:text-slate-400">
                  {requirement}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value }) => (
  <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <div className="dark:bg-blue-500/15 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
      <Icon
        size={22}
        className="text-blue-600 dark:text-blue-400"
      />
    </div>

    <p className="text-sm text-slate-500 dark:text-slate-400">
      {title}
    </p>

    <h3 className="mt-2 break-words font-semibold text-slate-900 dark:text-white">
      {value ?? "-"}
    </h3>
  </div>
);

export default GigDetails;