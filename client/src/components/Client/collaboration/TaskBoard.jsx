import {
  CalendarDays,
  User,
  CheckCircle2,
} from "lucide-react";


const statusStyles = {

  todo:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  progress:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",

  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",

};



const priorityStyles = {

  high:
    "text-red-600 dark:text-red-400",

  medium:
    "text-amber-600 dark:text-amber-400",

  low:
    "text-emerald-600 dark:text-emerald-400",

};




const TaskBoard = ({
  tasks = [],
}) => {


  if (!tasks.length) {

    return (
      <div
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <CheckCircle2
          size={32}
          className="mx-auto text-slate-400"
        />


        <p
          className="mt-3 text-sm text-slate-500 dark:text-slate-400"
        >
          No tasks available.
        </p>

      </div>
    );

  }




  return (

    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >

      <h3
        className="text-lg font-semibold text-slate-900 dark:text-white"
      >
        Project Tasks
      </h3>





      <div
        className="mt-5 space-y-4"
      >

        {tasks.map((task)=>(

          <div
            key={task._id}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
          >


            {/* Top */}
            <div
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >


              <h4
                className="font-medium text-slate-900 dark:text-white"
              >
                {task.title}
              </h4>



              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize

                  ${
                    statusStyles[
                      task.status?.toLowerCase()
                    ] ||
                    statusStyles.todo
                  }
                `}
              >
                {task.status}
              </span>


            </div>





            {/* Details */}
            <div
              className="mt-4 flex flex-wrap gap-4 text-sm"
            >


              <div
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400"
              >

                <User size={16}/>

                {task.assignedTo?.name || "-"}

              </div>




              <div
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400"
              >

                <CalendarDays size={16}/>

                {task.dueDate || "-"}

              </div>



              <span
                className={`font-medium capitalize

                  ${
                    priorityStyles[
                      task.priority?.toLowerCase()
                    ] ||
                    priorityStyles.low
                  }
                `}
              >
                {task.priority} Priority
              </span>


            </div>


          </div>

        ))}


      </div>


    </div>

  );
};


export default TaskBoard;