import {
  User,
  IndianRupee,
  CalendarDays,
  Clock3,
  Star,
  CheckCircle,
} from "lucide-react";

import ProposalStatusBadge from "./ProposalStatusBadge";
import ProposalActions from "./ProposalActions";


const ProposalDetails = ({
  proposal,
  loading = false,
  onHire,
  onReject,
  onView,
  onMessage,
}) => {
  if (!proposal) return null;


  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">

      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <User size={28}/>
          </div>


          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {proposal.freelancer?.name}
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              {proposal.freelancer?.title}
            </p>

          </div>

        </div>


        <ProposalStatusBadge
          status={proposal.status}
        />

      </div>



      {/* Information Cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <DetailItem
          icon={IndianRupee}
          label="Bid Amount"
          value={proposal.amount}
        />


        <DetailItem
          icon={Clock3}
          label="Delivery"
          value={proposal.deliveryTime}
        />


        <DetailItem
          icon={CalendarDays}
          label="Submitted"
          value={proposal.createdAt}
        />


        <DetailItem
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
      <section className="mt-10">

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Cover Letter
        </h2>


        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
          {proposal.coverLetter || "No message provided"}
        </p>

      </section>



      {/* Skills */}
      {proposal.skills?.length > 0 && (

        <section className="mt-10">

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Skills
          </h2>


          <div className="mt-4 flex flex-wrap gap-3">

            {proposal.skills.map((skill)=>(
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




      {/* Milestones */}
      {proposal.milestones?.length > 0 && (

        <section className="mt-10">

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Milestones
          </h2>


          <div className="mt-4 space-y-3">

            {proposal.milestones.map((item,index)=>(

              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800"
              >

                <CheckCircle
                  size={20}
                  className="mt-1 text-emerald-500"
                />

                <p className="text-slate-600 dark:text-slate-400">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>

      )}




      {/* Actions */}
      <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">

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



const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => (

  <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">

    <Icon
      size={22}
      className="text-blue-600 dark:text-blue-400"
    />


    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
      {label}
    </p>


    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
      {value ?? "-"}
    </p>

  </div>

);


export default ProposalDetails;