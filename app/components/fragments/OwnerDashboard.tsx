"use client";
import MetricCard from "@/app/components/elements/metrics/MetricCard";
import RecentOrderTable from "@/app/components/elements/metrics/RecentOrder";
import StatisticsChart from "@/app/components/elements/metrics/chart/StatisticChart";
import PieChart from "@/app/components/elements/metrics/chart/PieChart";
import AlertList from "@/app/components/elements/metrics/AlertList";
import OccupancyHeatmap from "@/app/components/elements/metrics/chart/HeatMap";

import { Court } from "@/app/(main)/courts/page";
import { Book } from "@/app/components/fragments/DetailCourtClientWrapper";
import {
  mapBookingsToMetrics,
  mapBooksToAlerts,
  mapBooksToHeatmap,
  mapBooksToPieChart,
  mapBooksToRecentOrders,
  mapBooksToRevenueChart,
} from "@/app/utils/mapers/dashboardMapers";
import { useEffect, useState } from "react";
import Button from "../elements/Button";
import { limitText } from "@/app/utils/currency";
import { GeneralInput, SelectInput } from "../elements/Form";
import { parseDMY } from "@/app/utils/date";

export default function OwnerDashboard({
  booksData = [],
  courtData = [],
}: {
  booksData: Book[] | [];
  courtData: Court[] | [];
}) {
  const [books, setBooks] = useState(booksData);
  const [courts, setCourts] = useState(courtData);
  const [isTodayMode, setIsTodayMode] = useState(false);
  const [filters, setFilters] = useState({
    courtId: "",
    startDate: "",
    endDate: "",
  });

  // Filter books by court + date range
  const applyFilter = () => {
    let filtered = [...booksData];

    // Filter by court id
    if (filters.courtId) {
      filtered = filtered.filter((b) => b.court_id === filters.courtId);
    }

    // Filter by date range (using DD-MM-YYYY)
    if (filters.startDate && filters.endDate) {
      const start = parseDMY(filters.startDate);
      const end = parseDMY(filters.endDate);

      filtered = filtered.filter((b) => {
        const bookDate = parseDMY(b.date);
        return bookDate >= start && bookDate <= end;
      });
    }

    setBooks(filtered);
  };

  const handleToday = () => {
    // If already in today mode → switch to All Times
    if (isTodayMode) {
      setIsTodayMode(false);

      setFilters({
        courtId: "",
        startDate: "",
        endDate: "",
      });

      setBooks(booksData);
      return;
    }

    // Activate Today mode
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const formatted = `${dd}-${mm}-${yyyy}`;

    setIsTodayMode(true);

    setFilters({
      courtId: "",
      startDate: formatted,
      endDate: formatted,
    });

    setBooks(booksData.filter((b) => b.date === formatted));
  };

  const handleCourtChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      courtId: value,
    }));
  };

  const handleStartDate = (value: string) => {
    setFilters((prev) => ({ ...prev, startDate: value }));
    console.log(value);
  };

  const handleEndDate = (value: string) => {
    setFilters((prev) => ({ ...prev, endDate: value }));
    console.log(value);
  };

  useEffect(() => {
    // If both dates selected -> apply full range filter
    if (filters.startDate && filters.endDate) {
      applyFilter();
      return;
    }

    // If only court selected -> filter by court only
    if (filters.courtId && !filters.startDate && !filters.endDate) {
      setBooks(booksData.filter((b) => b.court_id === filters.courtId));
      return;
    }

    // Reset to all if no filters applied
    if (!filters.courtId && !filters.startDate && !filters.endDate) {
      setBooks(booksData);
    }
  }, [filters]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBooks(booksData);
  }, [booksData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCourts(courtData);
  }, [courtData]);

  const courtOptions = courts.map((c) => ({
    label: limitText(c.name, 20),
    value: c.id,
  }));

  const metrics = mapBookingsToMetrics(books);
  const recentOrders = mapBooksToRecentOrders(books);
  const revenueChart = mapBooksToRevenueChart(books);
  const pieChart = mapBooksToPieChart(books);
  const alerts = mapBooksToAlerts(books);

  const { heatmap, slots } = mapBooksToHeatmap(books, courts);
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 bg-red-200">
        <Button onClick={handleToday} className="cursor-pointer">
          {isTodayMode ? "All Times" : "Today"}
        </Button>

        <GeneralInput
          id="start"
          type="date"
          value={
            filters.startDate
              ? parseDMY(filters.startDate).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            const iso = e.target.value; // yyyy-mm-dd
            const [y, m, d] = iso.split("-");
            const dmy = `${d}-${m}-${y}`;
            setFilters((p) => ({ ...p, startDate: dmy }));
          }}
          className="w-full! h-full!"
        />

        <GeneralInput
          id="end"
          type="date"
          value={
            filters.endDate
              ? parseDMY(filters.endDate).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            const iso = e.target.value;
            const [y, m, d] = iso.split("-");
            const dmy = `${d}-${m}-${y}`;
            setFilters((p) => ({ ...p, endDate: dmy }));
          }}
          className="w-full! h-full!"
        />

        <SelectInput
          label=""
          value={filters.courtId}
          onChange={(e) => handleCourtChange(e.target.value)}
          options={[{ label: "All Courts", value: "" }, ...courtOptions]}
          className="w-full! h-full!"
        />
      </div>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {metrics.map((m, i) => (
          <MetricCard
            key={i}
            title={m.title}
            value={m.value}
            icon={m.icon}
            badge={false}
          />
        ))}
      </div>

      {/* BOOKING TABLE + REVENUE CHART */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentOrderTable data={recentOrders} />
        <StatisticsChart
          data={{
            categories: revenueChart.categories,
            series: [{ name: "Revenue", data: revenueChart.series }],
          }}
        />
      </div>

      {/* HEATMAP + PIE + ALERT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <OccupancyHeatmap heatmap={heatmap} slots={slots} />
        <PieChart data={pieChart} />
        <AlertList alerts={alerts} />
      </div>
    </div>
  );
}
