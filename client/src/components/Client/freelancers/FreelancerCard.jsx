import {
  MapPin,
  Star,
  BriefcaseBusiness,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

import AvailabilityBadge from "./AvailabilityBadge";


const FreelancerCard = ({
  freelancer,
  onHire,
  onView,
}) => {

  if (!freelancer) return null;


  return (
    <div
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-4">

          {/* Avatar */}
          <img
            src={
              freelancer.avatar ||
              "/default-avatar.png"
            }
            alt={freelancer.name}
            className="h-14 w-14 rounded-full object-cover"
          />


          <div>

            <h3
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              {freelancer.name}
            </h3>


            <p
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              {freelancer.title}
            </p>


          </div>

        </div>


        <AvailabilityBadge
          status={freelancer.availability}
        />

      </div>




      {/* Info */}
      <div className="mt-6 space-y-3">


        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

          <Star
            size={17}
            className="text-yellow-500"
          />

          <span>
            {freelancer.rating ?? "-"} Rating
          </span>

        </div>



        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

          <BriefcaseBusiness size={17}/>

          <span>
            {freelancer.completedProjects ?? 0}
            {" "}
            Projects Completed
          </span>

        </div>




        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

          <IndianRupee size={17}/>

          <span>
            {freelancer.hourlyRate ?? "-"}
            /hr
          </span>

        </div>




        {freelancer.location && (

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

            <MapPin size={17}/>

            <span>
              {freelancer.location}
            </span>

          </div>

        )}

      </div>





      {/* Skills */}
      {freelancer.skills?.length > 0 && (

        <div className="mt-6 flex flex-wrap gap-2">

          {freelancer.skills
            .slice(0,5)
            .map((skill)=>(

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
      <div
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >

        <button
          type="button"
          onClick={()=>onHire?.(freelancer)}
          className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Hire
        </button>



        <button
          type="button"
          onClick={()=>onView?.(freelancer)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >

          View Profile

          <ArrowRight size={16}/>

        </button>


      </div>


    </div>
  );
};


export default FreelancerCard;