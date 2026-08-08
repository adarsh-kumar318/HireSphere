import {
  FileText,
  User,
  CalendarDays,
  IndianRupee,
  Download,
} from "lucide-react";


const InvoiceCard = ({
  invoice,
  onDownload,
  onView,
}) => {


  if (!invoice) return null;



  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >


      {/* Header */}
      <div
        className="flex items-start justify-between gap-4"
      >

        <div
          className="flex items-center gap-3"
        >

          <div
            className="dark:bg-blue-500/15 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"
          >

            <FileText
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>



          <div>

            <h3
              className="font-semibold text-slate-900 dark:text-white"
            >
              Invoice #{invoice.invoiceNumber}
            </h3>


            <p
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              {invoice.projectName}
            </p>

          </div>


        </div>





        <span
          className="dark:bg-emerald-500/15 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
        >
          {invoice.status}
        </span>


      </div>






      {/* Details */}
      <div
        className="mt-6 grid gap-4 sm:grid-cols-3"
      >

        <InfoItem
          icon={User}
          label="Freelancer"
          value={invoice.freelancer?.name}
        />


        <InfoItem
          icon={IndianRupee}
          label="Amount"
          value={invoice.amount}
        />


        <InfoItem
          icon={CalendarDays}
          label="Date"
          value={invoice.date}
        />

      </div>






      {/* Actions */}
      <div
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >

        <button
          type="button"
          onClick={() => onView?.(invoice)}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
        >
          View Invoice
        </button>




        <button
          type="button"
          onClick={() => onDownload?.(invoice)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >

          <Download size={17}/>

          Download

        </button>


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



export default InvoiceCard;