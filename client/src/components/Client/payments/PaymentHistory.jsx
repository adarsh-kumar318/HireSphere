import PaymentCard from "./PaymentCard";


const PaymentHistory = ({
  payments = [],
  loading = false,
  onView,
}) => {


  // Loading State
  if (loading) {

    return (
      <div
        className="grid gap-6"
      >

        {[1,2,3].map((item)=>(

          <div
            key={item}
            className="h-52 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />

        ))}

      </div>
    );

  }




  // Empty State
  if (!payments.length) {

    return (
      <div
        className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <h3
          className="text-xl font-semibold text-slate-900 dark:text-white"
        >
          No Payment History
        </h3>


        <p
          className="mt-2 text-sm text-slate-500 dark:text-slate-400"
        >
          Your completed and pending payments will appear here.
        </p>


      </div>
    );

  }





  return (

    <div
      className="space-y-5"
    >

      {payments.map((payment)=>(

        <PaymentCard

          key={payment._id}

          payment={payment}

          onView={onView}

        />

      ))}


    </div>

  );
};


export default PaymentHistory;