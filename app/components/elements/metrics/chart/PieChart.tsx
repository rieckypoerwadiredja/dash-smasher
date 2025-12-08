"use client";

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChart({
  data,
}: {
  data: { labels: string[]; series: number[] };
}) {
  const series = data.series;
  const labels = data.labels;

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value}`, // hover label
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // << DONUT HOLE BESAR
          labels: {
            show: true,
            value: {
              fontSize: "22px",
              fontWeight: 600,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "18px",
              formatter: () => series.reduce((a, b) => a + b, 0).toString(),
            },
          },
        },
      },
    },
    colors: ["#4F46E5", "#22C55E", "#EF4444"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-lg text-center font-semibold text-gray-800">
        Payment Breakdown
      </h3>
      <Chart options={options} series={series} type="donut" height={320} />
    </div>
  );
}

export function PieChartSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
      <div className="h-5 w-32 bg-gray-200 rounded mb-4" />

      <div className="flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-gray-200" />
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <div className="h-3 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
