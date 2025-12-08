import React from "react";

interface Props {
  heatmap: { day: string; values: number[] }[];
  slots: string[]; // ← jam untuk Y-axis
}

export default function OccupancyHeatmap({ heatmap, slots }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Occupancy Heatmap
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-xs text-gray-500"></th>
              {heatmap.map((row) => (
                <th key={row.day} className="px-3 py-2 text-xs text-gray-500">
                  {row.day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {slots.map((slot, rowIndex) => (
              <tr key={slot}>
                {/* Y-axis — slot jam */}
                <td className="px-3 py-2 text-xs text-gray-500">{slot}</td>

                {heatmap.map((h) => {
                  const value = h.values[rowIndex];

                  const intensity = value === 0 ? 0 : Math.min(value * 20, 100);

                  const opacity =
                    intensity > 0 ? Math.max(intensity / 100, 0.6) : 1;

                  return (
                    <td key={h.day + rowIndex} className="px-2 py-2">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center text-xs"
                        style={{
                          color: value > 0 ? "#FFFFFF" : "#000000",
                          backgroundColor:
                            value > 0
                              ? `rgba(var(--color-primary-rgb), ${opacity})`
                              : "rgba(229, 231, 235, 1)",
                        }}
                      >
                        {value > 0 ? value : "0"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OccupancyHeatmapSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-5" />

      <div className="grid grid-cols-8 gap-3">
        <div></div>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-3 w-10 bg-gray-200 rounded mx-auto" />
        ))}

        {[...Array(rows)].map((_, r) => (
          <React.Fragment key={r}>
            <div className="h-3 w-14 bg-gray-200 rounded mx-auto" />
            {[1, 2, 3, 4, 5, 6, 7].map((c) => (
              <div key={c} className="w-8 h-8 rounded-md bg-gray-200" />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
