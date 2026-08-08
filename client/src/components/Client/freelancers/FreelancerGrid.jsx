import FreelancerCard from "./FreelancerCard";


const FreelancerGrid = ({
  freelancers = [],
  loading = false,
  onHire,
  onView,
}) => {


  // Loading State
  if (loading) {

    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {[1, 2, 3, 4, 5, 6].map((item)=>(

          <div
            key={item}
            className="h-[420px] animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />

        ))}

      </div>
    );

  }




  // Empty State
  if (!freelancers.length) {

    return (
      <div
        className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <h3
          className="text-xl font-semibold text-slate-900 dark:text-white"
        >
          No Freelancers Found
        </h3>


        <p
          className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400"
        >
          Try changing your filters or search criteria.
        </p>


      </div>
    );

  }




  return (

    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >

      {freelancers.map((freelancer)=>(

        <FreelancerCard

          key={freelancer._id}

          freelancer={freelancer}

          onHire={onHire}

          onView={onView}

        />

      ))}

    </div>

  );

};


export default FreelancerGrid;