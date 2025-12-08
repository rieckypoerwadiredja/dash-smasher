"use client";
import React, { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import ChartTab from "../ChartTab";
import dynamic from "next/dynamic";
import { catFormat } from "@/app/utils/date";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface StatisticsChartProps {
  data: {
    categories: string[];
    series: { name: string; data: number[] }[];
  };
}

export default function StatisticsChart({ data }: StatisticsChartProps) {
  const [period, setPeriod] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("daily");

  const filteredData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based

    const result = {
      categories: [] as string[],
      series: data.series.map((s) => ({ name: s.name, data: [] as number[] })),
    };

    // parsing data asli
    const parsed = data.categories.map((cat, idx) => ({
      date: new Date(cat.split("-").reverse().join("-")), // dd-mm-yyyy → Date
      values: data.series.map((s) => s.data[idx]),
    }));

    const grouped: Record<string, number[]> = {};
    const seriesCount = data.series.length;

    if (period === "daily") {
      // generate semua tanggal bulan saat ini
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const key = catFormat(new Date(currentYear, currentMonth, d));
        grouped[key] = Array(seriesCount).fill(0);
      }
      parsed.forEach((item) => {
        if (
          item.date.getFullYear() !== currentYear ||
          item.date.getMonth() !== currentMonth
        )
          return;
        const key = catFormat(item.date);
        item.values.forEach((v, i) => (grouped[key][i] += v));
      });
    } else if (period === "monthly") {
      // generate 12 bulan tahun ini
      for (let m = 0; m < 12; m++) {
        const key = `${currentYear}-${String(m + 1).padStart(2, "0")}`;
        grouped[key] = Array(seriesCount).fill(0);
      }
      parsed.forEach((item) => {
        if (item.date.getFullYear() !== currentYear) return;
        const key = `${currentYear}-${String(item.date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
        item.values.forEach((v, i) => (grouped[key][i] += v));
      });
    } else if (period === "quarterly") {
      // generate Q1-Q4 tahun ini
      for (let q = 1; q <= 4; q++) {
        const key = `Q${q}`;
        grouped[key] = Array(seriesCount).fill(0);
      }
      parsed.forEach((item) => {
        if (item.date.getFullYear() !== currentYear) return;
        const quarter = Math.floor(item.date.getMonth() / 3) + 1;
        const key = `Q${quarter}`;
        item.values.forEach((v, i) => (grouped[key][i] += v));
      });
    } else if (period === "yearly") {
      parsed.forEach((item) => {
        const key = `${item.date.getFullYear()}`;
        if (!grouped[key]) grouped[key] = Array(seriesCount).fill(0);
        item.values.forEach((v, i) => (grouped[key][i] += v));
      });
    }

    // assign ke result
    result.categories = Object.keys(grouped).sort((a, b) => {
      if (period === "daily") {
        const [d1, m1, y1] = a.split("-").map(Number);
        const [d2, m2, y2] = b.split("-").map(Number);
        return (
          new Date(y1, m1 - 1, d1).getTime() -
          new Date(y2, m2 - 1, d2).getTime()
        );
      }
      if (period === "monthly") return a.localeCompare(b);
      if (period === "quarterly") return a.localeCompare(b);
      return Number(a) - Number(b);
    });

    result.series.forEach((s, i) => {
      s.data = result.categories.map((cat) => grouped[cat][i]);
    });

    return result;
  }, [data, period]);

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, x: { format: "dd MMM yyyy" } },
    xaxis: {
      type: "category",
      categories: filteredData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: { labels: { style: { fontSize: "12px", colors: ["#6B7280"] } } },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
          <p className="mt-1 text-gray-500 text-sm">
            Target you’ve set for each month
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab selected={period} onChange={setPeriod} />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={filteredData.series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}

export function StatisticsChartSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
      <div className="h-64 w-full bg-gray-200 rounded" />
    </div>
  );
}
