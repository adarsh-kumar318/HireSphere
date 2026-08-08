import {
  MapPin,
  Star,
  BriefcaseBusiness,
  IndianRupee,
  Mail,
  ExternalLink,
} from "lucide-react";

import AvailabilityBadge from "./AvailabilityBadge";


const FreelancerProfile = ({
  freelancer,
  onHire,
}) => {

  if (!freelancer) return null;


  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8"
    >

      {/* Profile Header */}
      <div
        className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
      >

        <div className="flex gap-5">

          <img
            src={
              freelancer.avatar ||
              "/default-avatar.png"
            }
            alt={freelancer.name}
            className="h-20 w-20 rounded-full object-cover"
          />


          <div>

            <h1
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              {freelancer.name}
            </h1>


            <p
              className="mt-1 text-slate-500 dark:text-slate-400"
            >
              {freelancer.title}
            </p>


            {freelancer.location && (

              <div
                className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
              >

                <MapPin size={16}/>

                {freelancer.location}

              </div>

            )}

          </div>

        </div>



        <AvailabilityBadge
          status={freelancer.availability}
        />

      </div>





      {/* Stats */}
      <div
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >

        <StatCard
          icon={Star}
          label="Rating"
          value={
            freelancer.rating
              ? `${freelancer.rating}/5`
              : "-"
          }
        />


        <StatCard
          icon={BriefcaseBusiness}
          label="Completed"
          value={
            freelancer.completedProjects ?? "-"
          }
        />


        <StatCard
          icon={IndianRupee}
          label="Hourly Rate"
          value={
            freelancer.hourlyRate
              ? `${freelancer.hourlyRate}/hr`
              : "-"
          }
        />


        <StatCard
          icon={Mail}
          label="Response Time"
          value={
            freelancer.responseTime || "-"
          }
        />

      </div>





      {/* Bio */}
      <section className="mt-10">

        <h2
          className="text-lg font-semibold text-slate-900 dark:text-white"
        >
          About Freelancer
        </h2>


        <p
          className="mt-3 leading-7 text-slate-600 dark:text-slate-400"
        >
          {freelancer.bio || "No bio available"}
        </p>

      </section>





      {/* Skills */}
      {freelancer.skills?.length > 0 && (

        <section className="mt-10">

          <h2
            className="text-lg font-semibold text-slate-900 dark:text-white"
          >
            Skills
          </h2>


          <div
            className="mt-4 flex flex-wrap gap-3"
          >

            {freelancer.skills.map((skill)=>(

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






      {/* Portfolio */}
      {freelancer.portfolioUrl && (

        <a
          href={freelancer.portfolioUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
        >

          View Portfolio

          <ExternalLink size={16}/>

        </a>

      )}







      {/* Hire Button */}
      <button
        type="button"
        onClick={() => onHire?.(freelancer)}
        className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Hire Freelancer
      </button>


    </div>
  );
};





const StatCard = ({
  icon: Icon,
  label,
  value,
}) => (

  <div
    className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
  >

    <Icon
      size={22}
      className="text-blue-600 dark:text-blue-400"
    />

    <p
      className="mt-2 text-sm text-slate-500 dark:text-slate-400"
    >
      {label}
    </p>


    <p
      className="font-semibold text-slate-900 dark:text-white"
    >
      {value}
    </p>

  </div>

);



export default FreelancerProfile;