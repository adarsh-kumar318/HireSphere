import {
  Search,
  RotateCcw,
} from "lucide-react";


const SkillsFilter = ({
  search = "",
  skill = "",
  availability = "",
  rating = "",

  onSearchChange,
  onSkillChange,
  onAvailabilityChange,
  onRatingChange,
  onReset,
}) => {


  return (

    <div
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >

      <div
        className="grid gap-4 lg:grid-cols-4"
      >


        {/* Search */}
        <div className="relative lg:col-span-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            type="text"
            value={search}
            onChange={(e)=>
              onSearchChange?.(e.target.value)
            }
            placeholder="Search freelancer..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>





        {/* Skill */}
        <select
          value={skill}
          onChange={(e)=>
            onSkillChange?.(e.target.value)
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >

          <option value="">
            All Skills
          </option>

          <option value="react">
            React
          </option>

          <option value="node">
            Node.js
          </option>

          <option value="design">
            UI/UX Design
          </option>

          <option value="marketing">
            Digital Marketing
          </option>

        </select>






        {/* Availability */}
        <select
          value={availability}
          onChange={(e)=>
            onAvailabilityChange?.(e.target.value)
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >

          <option value="">
            Availability
          </option>

          <option value="available">
            Available
          </option>

          <option value="busy">
            Busy
          </option>

          <option value="away">
            Away
          </option>

        </select>







        {/* Rating + Reset */}
        <div className="flex gap-3">


          <select
            value={rating}
            onChange={(e)=>
              onRatingChange?.(e.target.value)
            }
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >

            <option value="">
              Rating
            </option>

            <option value="5">
              5 Star
            </option>

            <option value="4">
              4+ Star
            </option>

            <option value="3">
              3+ Star
            </option>

          </select>




          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center rounded-xl border border-slate-200 px-4 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >

            <RotateCcw size={18}/>

          </button>


        </div>


      </div>

    </div>

  );
};


export default SkillsFilter;