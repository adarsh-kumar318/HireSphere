import {
  Wallet,
  ArrowDownCircle,
  Clock3,
  ShieldCheck,
} from "lucide-react";


const WalletSummary = ({
  wallet = {},
}) => {

  const items = [
    {
      label: "Available Balance",
      value: wallet.balance,
      icon: Wallet,
    },

    {
      label: "Total Spent",
      value: wallet.totalSpent,
      icon: ArrowDownCircle,
    },

    {
      label: "Pending Payments",
      value: wallet.pending,
      icon: Clock3,
    },

    {
      label: "Escrow Amount",
      value: wallet.escrow,
      icon: ShieldCheck,
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
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >

            <div
              className="dark:bg-blue-500/15 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"
            >

              <Icon
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />

            </div>


            <p
              className="mt-4 text-sm text-slate-500 dark:text-slate-400"
            >
              {item.label}
            </p>


            <h3
              className="mt-1 text-2xl font-bold text-slate-900 dark:text-white"
            >
              {item.value ?? "-"}
            </h3>


          </div>
        );

      })}

    </div>
  );
};


export default WalletSummary;