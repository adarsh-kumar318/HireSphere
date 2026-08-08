import {
  BellOff,
} from "lucide-react";


const EmptyNotifications = ({
  title = "No Notifications",
  message = "You don't have any notifications yet.",
}) => {


  return (

    <div
      className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
    >

      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
      >

        <BellOff
          size={32}
          className="text-slate-400"
        />

      </div>




      <h3
        className="mt-5 text-xl font-semibold text-slate-900 dark:text-white"
      >
        {title}
      </h3>




      <p
        className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400"
      >
        {message}
      </p>


    </div>

  );

};


export default EmptyNotifications;