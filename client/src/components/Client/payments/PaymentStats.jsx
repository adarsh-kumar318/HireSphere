import {
  ReceiptText,
  CheckCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";


const PaymentStats = ({
  stats = {},
}) => {


  const items = [
    {
      label: "Total Transactions",
      value: stats.totalTransactions,
      icon: ReceiptText,
    },

    {
      label: "Completed Payments",
      value: stats.completedPayments,
      icon: CheckCircle,
    },

    {
      label: "Pending Payments",
      value: stats.pendingPayments,
      icon: Clock3,
    },

    {
      label: "Average Payment",
      value: stats.averagePayment,
      icon: TrendingUp,
    },
  ];



  return (
    <div
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >

      {items.map((item)=>{

        const Icon = item.icon;


        return (

          <div
            key={item.label}
            className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >


            <div
              className="dark:bg-emerald-500/15 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100"
            >

              <Icon
                size={23}
                className="text-emerald-600 dark:text-emerald-400"
              />

            </div>



            <p
              className="mt-4 text-sm text-slate-500 dark:text-slate-400"
            >
              {item.label}
            </p>



            <h3
              className="mt-1 text-xl font-bold text-slate-900 dark:text-white"
            >
              {item.value ?? "-"}
            </h3>



          </div>

        );

      })}


    </div>
  );
};


export default PaymentStats;