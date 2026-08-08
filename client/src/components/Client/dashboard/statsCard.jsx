import {
  FolderKanban,
  BriefcaseBusiness,
  FileText,
  CreditCard,
} from "lucide-react";

import StatsCard from "./StatsCard";

const stats = [
  {
    id: 1,
    title: "Active Projects",
    value: "24",
    icon: FolderKanban,
    color: "blue",
    change: 12,
    description: "vs last month",
  },
  {
    id: 2,
    title: "Posted Gigs",
    value: "18",
    icon: BriefcaseBusiness,
    color: "violet",
    change: 8,
    description: "Currently live",
  },
  {
    id: 3,
    title: "Received Proposals",
    value: "152",
    icon: FileText,
    color: "emerald",
    change: 18,
    description: "This month",
  },
  {
    id: 4,
    title: "Total Spending",
    value: "$12.5K",
    icon: CreditCard,
    color: "amber",
    change: 15,
    description: "Monthly expense",
  },
];

const StatsCards = () => {
  return (
    <section className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            change={item.change}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsCards;