import {
  Bell,
  CheckCircle,
  CreditCard,
  FileText,
  MessageCircle,
  CalendarDays,
  Briefcase,
} from "lucide-react";


const typeConfig = {

  proposal: {
    icon: FileText,
    style:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },


  payment: {
    icon: CreditCard,
    style:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },


  message: {
    icon: MessageCircle,
    style:
      "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  },


  meeting: {
    icon: CalendarDays,
    style:
      "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  },


  project: {
    icon: Briefcase,
    style:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
  },


  default: {
    icon: Bell,
    style:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },

};




const NotificationCard = ({
  notification,
  onClick,
}) => {


  if (!notification) return null;



  const config =
    typeConfig[
      notification.type?.toLowerCase()
    ] ||
    typeConfig.default;



  const Icon = config.icon;




  return (

    <div
      onClick={() => onClick?.(notification)}
      className={`cursor-pointer rounded-3xl border p-5 transition hover:shadow-md

        ${
          notification.read

          ? `border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`

          :

          `
            border-blue-200
            bg-blue-50
            dark:border-blue-500/30
            dark:bg-blue-500/10
          }`
        }
      `}
    >



      <div
        className="flex gap-4"
      >


        {/* Icon */}

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl

            ${config.style}
          `}
        >

          <Icon size={22}/>

        </div>





        {/* Content */}

        <div
          className="flex-1"
        >

          <div
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
          >

            <h3
              className="font-semibold text-slate-900 dark:text-white"
            >
              {notification.title}
            </h3>



            {!notification.read && (

              <span
                className="w-fit rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white"
              >
                New
              </span>

            )}


          </div>





          <p
            className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400"
          >
            {notification.message}
          </p>




          <p
            className="mt-3 text-xs text-slate-400"
          >
            {notification.time}
          </p>



        </div>


      </div>


    </div>

  );
};


export default NotificationCard;