import {
  ArrowUpRight,
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
};




const TransactionTable = ({
  transactions = [],
  onView,
}) => {


  if (!transactions.length) {

    return (
      <div
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <p
          className="text-slate-500 dark:text-slate-400"
        >
          No transactions available.
        </p>

      </div>
    );

  }





  return (
    <div
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >

      <div className="overflow-x-auto">


        <table
          className="min-w-full text-sm"
        >

          <thead>

            <tr
              className="border-b border-slate-200 text-left dark:border-slate-800"
            >

              <th className="px-6 py-4 text-slate-500 dark:text-slate-400">
                Project
              </th>

              <th className="px-6 py-4 text-slate-500 dark:text-slate-400">
                Freelancer
              </th>

              <th className="px-6 py-4 text-slate-500 dark:text-slate-400">
                Amount
              </th>

              <th className="px-6 py-4 text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-slate-500 dark:text-slate-400">
                Date
              </th>

              <th className="px-6 py-4">
                
              </th>

            </tr>

          </thead>





          <tbody>


            {transactions.map((transaction)=>(

              <tr
                key={transaction._id}
                className="border-b border-slate-100 dark:border-slate-800"
              >


                <td
                  className="px-6 py-4 font-medium text-slate-900 dark:text-white"
                >
                  {transaction.projectName}
                </td>




                <td
                  className="px-6 py-4 text-slate-600 dark:text-slate-300"
                >
                  {transaction.freelancer?.name}
                </td>




                <td
                  className="px-6 py-4 font-semibold text-slate-900 dark:text-white"
                >
                  {transaction.amount}
                </td>




                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize

                      ${
                        statusStyles[
                          transaction.status?.toLowerCase()
                        ] ||
                        statusStyles.pending
                      }
                    `}
                  >
                    {transaction.status}
                  </span>

                </td>




                <td
                  className="px-6 py-4 text-slate-500 dark:text-slate-400"
                >
                  {transaction.date}
                </td>




                <td className="px-6 py-4">

                  <button
                    type="button"
                    onClick={() =>
                      onView?.(transaction)
                    }
                    className="text-blue-600 dark:text-blue-400"
                  >

                    <ArrowUpRight size={18}/>

                  </button>

                </td>


              </tr>

            ))}


          </tbody>


        </table>


      </div>


    </div>
  );
};


export default TransactionTable;