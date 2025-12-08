import React, { ReactNode } from "react";
import Badge from "../Badge";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  badge?: boolean;
}

function MetricCard({ title, value, icon, badge = true }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm">
      {/* TOP: ICON */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">
        {icon}
      </div>

      {/* CONTENT */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        {/* LEFT: TITLE + VALUE */}
        <div>
          <span className="text-sm text-gray-500">{title}</span>
          <h4 className="mt-1 font-extrabold text-gray-900 text-3xl leading-tight">
            {value}
          </h4>
        </div>

        {/* RIGHT: BADGE */}
        {badge && (
          <Badge color="success" size="sm">
            11.01%
          </Badge>
        )}
      </div>
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl border p-5 border-gray-200 bg-white animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-gray-200" />

      <div className="mt-5">
        <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
        <div className="h-6 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default MetricCard;
