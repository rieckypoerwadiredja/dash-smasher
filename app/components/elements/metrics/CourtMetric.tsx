import React from "react";
import { GrGroup } from "react-icons/gr";
import MetricCard from "./MetricCard";

function CourtMetric() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 bg-red-500 md:gap-6">
      <MetricCard
        title="Total Booking Today"
        value="24"
        icon={<GrGroup className="text-gray-800 size-6" />}
        badge
      />
      <MetricCard
        title="Revenue Collected"
        value="$24.000"
        icon={<GrGroup className="text-gray-800 size-6" />}
        badge
      />
      <MetricCard
        title="Pending Payment"
        value="5"
        icon={<GrGroup className="text-gray-800 size-6" />}
        badge
      />
      <MetricCard
        title="Check-ins"
        value="10"
        icon={<GrGroup className="text-gray-800 size-6" />}
        badge
      />
    </div>
  );
}

export default CourtMetric;
