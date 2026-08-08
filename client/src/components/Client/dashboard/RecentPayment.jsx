import { Link } from "react-router-dom";
import {
  CreditCard,
  IndianRupee,
  CheckCircle2,
  Clock3,
  ArrowRight,
} from "lucide-react";

const payments = [
  {
    id: 1,
    freelancer: "Rahul Sharma",
    project: "E-Commerce Website",
    amount: "₹15,000",
    date: "05 Aug 2026",
    status: "Paid",
  },
  {
    id: 2,
    freelancer: "Priya Verma",
    project: "Portfolio Website",
    amount: "₹8,500",
    date: "03 Aug 2026",
    status: "Pending",
  },
  {
    id: 3,
    freelancer: "Aman Singh",
    project: "Mobile App UI",
    amount: "₹12,000",
    date: "01 Aug 2026",
    status: "Paid",
  },
];

const statusStyles = {
  Paid:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};

const RecentPayments = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Payments
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your latest freelancer payments.
          </p>
        </div>

        <Link
          to="/client/payment"
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Payment List */}
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:shadow-md dark:border-slate-800 md:flex-row md:items-center md:justify-between"
          >
            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-500/20">
                <CreditCard
                  size={22}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {payment.freelancer}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {payment.project}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {payment.date}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                <IndianRupee size={16} />
                {payment.amount}
              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[payment.status]
                }`}
              >
                {payment.status === "Paid" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <Clock3 size={14} />
                )}

                {payment.status}
              </span>

              <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPayments;