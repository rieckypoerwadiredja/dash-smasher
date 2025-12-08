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

    const result = {
      categories: [] as string[],
      series: data.series.map((s) => ({ name: s.name, data: [] as number[] })),
    };

    const parsed = data.categories.map((cat, idx) => ({
      date: new Date(cat.split("-").reverse().join("-")), // dd-mm-yyyy → Date
      values: data.series.map((s) => s.data[idx]),
    }));

    const grouped: Record<string, number[]> = {};

    parsed.forEach((item) => {
      let key = "";

      switch (period) {
        case "daily":
          key = catFormat(item.date); // tetap per tanggal
          break;
        case "monthly":
          if (item.date.getFullYear() !== currentYear) return;
          key = `${item.date.getFullYear()}-${(item.date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
          break;
        case "quarterly":
          if (item.date.getFullYear() !== currentYear) return;
          const quarter = Math.floor(item.date.getMonth() / 3) + 1;
          key = `Q${quarter}`;
          break;
        case "yearly":
          key = `${item.date.getFullYear()}`;
          break;
      }

      if (!grouped[key]) grouped[key] = Array(item.values.length).fill(0);
      item.values.forEach((v, i) => (grouped[key][i] += v));
    });

    result.categories = Object.keys(grouped).sort();
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
