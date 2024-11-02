// app/dashboard/(overview)/page.tsx

"use client";

import { useRecoilValue } from "recoil";
import { dashboardCardState } from "@/context/atoms";
import DashboardCard from "@/components/DashboardCard";

export default function Page() {
  const cards = useRecoilValue(dashboardCardState);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <DashboardCard key={card.id} data={card} />
        ))}
      </div>
    </main>
  );
}
