import { MetricCardSkeleton } from "@/app/components/elements/metrics/MetricCard";
import { TableSkeleton } from "@/app/components/elements/metrics/RecentOrder";
import { StatisticsChartSkeleton } from "@/app/components/elements/metrics/chart/StatisticChart";
import { PieChartSkeleton } from "@/app/components/elements/metrics/chart/PieChart";
import { AlertListSkeleton } from "@/app/components/elements/metrics/AlertList";
import { OccupancyHeatmapSkeleton } from "@/app/components/elements/metrics/chart/HeatMap";

export default function Page() {
  const metrics = [1, 2, 3, 4, 5];

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* BOOKING TABLE + REVENUE CHART */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TableSkeleton />
        <StatisticsChartSkeleton />
      </div>

      {/* HEATMAP + PIE + ALERT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <OccupancyHeatmapSkeleton />
        <PieChartSkeleton />
        <AlertListSkeleton />
      </div>
    </div>
  );
}
