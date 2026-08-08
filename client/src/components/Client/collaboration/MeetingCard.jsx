import {
  Video,
  CalendarDays,
  Users,
  Clock3,
} from "lucide-react";


const statusStyles = {

  upcoming:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",

  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",

  cancelled:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",

};



const MeetingCard = ({
  meeting,
  onJoin,
  onView,
}) => {


  if (!meeting) return null;



  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >


      {/* Header */}
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div
          className="flex items-center gap-3"
        >

          <div
            className="dark:bg-blue-500/15 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"
          >

            <Video
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>



          <div>

            <h3
              className="font-semibold text-slate-900 dark:text-white"
            >
              {meeting.title}
            </h3>


            <p
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              {meeting.projectName}
            </p>


          </div>


        </div>





        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize

            ${
              statusStyles[
                meeting.status?.toLowerCase()
              ] ||
              statusStyles.upcoming
            }
          `}
        >
          {meeting.status}
        </span>


      </div>






      {/* Details */}
      <div
        className="mt-6 grid gap-4 sm:grid-cols-3"
      >

        <InfoItem
          icon={CalendarDays}
          label="Date"
          value={meeting.date}
        />


        <InfoItem
          icon={Clock3}
          label="Time"
          value={meeting.time}
        />


        <InfoItem
          icon={Users}
          label="Participants"
          value={
            meeting.participants?.length || 0
          }
        />


      </div>







      {/* Actions */}
      <div
        className="mt-6 flex gap-3"
      >

        <button
          type="button"
          onClick={() => onView?.(meeting)}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
        >
          View
        </button>





        {meeting.status?.toLowerCase() === "upcoming" && (

          <button
            type="button"
            onClick={() => onJoin?.(meeting)}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Join Meeting
          </button>

        )}


      </div>


    </div>
  );
};





const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => (

  <div>

    <div
      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
    >

      <Icon size={16}/>

      {label}

    </div>


    <p
      className="mt-1 font-semibold text-slate-900 dark:text-white"
    >
      {value ?? "-"}
    </p>


  </div>

);



export default MeetingCard;