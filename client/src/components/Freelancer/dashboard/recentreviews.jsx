import { Star } from "lucide-react";

const RecentReviews = ({ reviews = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-bold text-white">
        Recent Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-slate-400">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition hover:border-slate-600 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">
                  {review.client}
                </h3>

                <span className="text-sm text-slate-400">
                  {review.date}
                </span>
              </div>

              <div className="mt-2 flex gap-1">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentReviews;