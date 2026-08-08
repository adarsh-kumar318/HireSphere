import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    client: "John Smith",
    rating: 5,
    review:
      "Excellent work! Delivered the project before the deadline with outstanding quality.",
    date: "2 days ago",
  },
  {
    id: 2,
    client: "Creative Studio",
    rating: 5,
    review:
      "Very professional communication and great UI/UX skills. Highly recommended!",
    date: "1 week ago",
  },
  {
    id: 3,
    client: "Tech Solutions",
    rating: 4,
    review:
      "Good experience overall. The project was completed successfully.",
    date: "2 weeks ago",
  },
];

const RecentReviews = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Recent Reviews
      </h2>

      <div className="space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-gray-100 p-4 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                {review.client}
              </h3>

              <span className="text-sm text-gray-500">
                {review.date}
              </span>
            </div>

            <div className="mt-2 flex">
              {[...Array(review.rating)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="mt-3 text-sm text-gray-600">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;