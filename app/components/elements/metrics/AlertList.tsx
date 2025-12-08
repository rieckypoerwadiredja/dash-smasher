import React from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";

interface AlertItem {
  id: string;
  message: string;
}

interface AlertListProps {
  alerts: AlertItem[];
}

export default function AlertList({ alerts }: AlertListProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts</h3>

      <div className="flex flex-col gap-3">
        {alerts.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 text-orange-500">
              <IoNotificationsCircleSharp size={20} />
            </span>
            <p className="text-gray-700 text-sm">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AlertListSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
      <div className="h-5 w-24 bg-gray-200 rounded mb-4" />

      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
