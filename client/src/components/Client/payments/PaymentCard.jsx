import {
  User,
  IndianRupee,
  CalendarDays,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";


const statusStyles = {
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",

  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",

  processing:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",

  failed:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",

  refunded:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};



const PaymentCard = ({
  payment,
  onView,
}) => {


  if (!payment) return null;



  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >


      {/* Header */}
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >


        <div className="flex gap-4">


          <div
            className="dark:bg-blue-500/15 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
          >

            <User
              size={22}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>



          <div>

            <h3
              className="font-semibold text-slate-900 dark:text-white"
            >
              {payment.freelancer?.name}
            </h3>


            <p
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              {payment.projectName}
            </p>


          </div>


        </div>





        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize
            ${
              statusStyles[
                payment.status?.toLowerCase()
              ] ||
              statusStyles.pending
            }
          `}
        >
          {payment.status}
        </span>


      </div>






      {/* Details */}
      <div
        className="mt-6 grid gap-4 sm:grid-cols-3"
      >


        <InfoItem
          icon={IndianRupee}
          label="Amount"
          value={payment.amount}
        />


        <InfoItem
          icon={CalendarDays}
          label="Date"
          value={payment.date}
        />


        <InfoItem
          icon={BriefcaseBusiness}
          label="Milestone"
          value={payment.milestone}
        />


      </div>






      {/* Action */}
      <button
        type="button"
        onClick={() => onView?.(payment)}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >

        View Details

        <ArrowRight size={16}/>

      </button>


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



export default PaymentCard;