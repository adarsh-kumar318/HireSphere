import {
  Search,
  RotateCcw,
} from "lucide-react";


const ProposalFilters = ({
  search = "",
  status = "",
  sortBy = "",

  onSearchChange,
  onStatusChange,
  onSortChange,
  onReset,
}) => {

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">


        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            type="text"
            value={search}
            onChange={(e)=>onSearchChange?.(e.target.value)}
            placeholder="Search freelancer..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>




        <div className="grid gap-4 sm:grid-cols-3">


          {/* Status */}
          <select
            value={status}
            onChange={(e)=>onStatusChange?.(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >

            <option value="">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="shortlisted">
              Shortlisted
            </option>

            <option value="accepted">
              Accepted
            </option>

            <option value="rejected">
              Rejected
            </option>

            <option value="withdrawn">
              Withdrawn
            </option>

          </select>





          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e)=>onSortChange?.(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >

            <option value="">
              Sort By
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="amount-high">
              Amount High
            </option>

            <option value="amount-low">
              Amount Low
            </option>

          </select>






          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >

            <RotateCcw size={17}/>

            Reset

          </button>


        </div>


      </div>

    </div>
  );
};


export default ProposalFilters;