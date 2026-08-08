import {
  FileSearch,
  Plus,
} from "lucide-react";


const EmptyProposals = ({
  title = "No Proposals Found",
  message = "Your gig has not received any proposals yet.",
  actionText = "",
  onAction,
}) => {

  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">


      {/* Icon */}
      <div className="dark:bg-blue-500/15 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

        <FileSearch
          size={32}
          className="text-blue-600 dark:text-blue-400"
        />

      </div>



      {/* Content */}
      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">

        {title}

      </h3>


      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">

        {message}

      </p>





      {/* Action */}
      {actionText && (

        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >

          <Plus size={18}/>

          {actionText}

        </button>

      )}


    </div>
  );
};


export default EmptyProposals;