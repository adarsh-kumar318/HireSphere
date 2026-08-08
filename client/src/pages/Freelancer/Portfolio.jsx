import {
  Plus,
  ExternalLink,
} from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce Website",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  },
  {
    id: 2,
    title: "Mobile Banking App UI",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },
  {
    id: 3,
    title: "AI Chat Application",
    category: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Frontend Development",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
  },
];


const Portfolio = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Portfolio
          </h1>

          <p className="mt-2 text-gray-500">
            Showcase your best work to attract clients.
          </p>
        </div>


        <button
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Project
        </button>

      </div>


      {/* Portfolio Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-44 w-full object-cover"
            />


            <div className="p-5">

              {/* Category */}
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {item.category}
              </span>


              {/* Title */}
              <h2 className="mt-3 text-lg font-bold text-gray-800">
                {item.title}
              </h2>


              {/* View Button */}
              <button
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View Project
                <ExternalLink size={16} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};


export default Portfolio;