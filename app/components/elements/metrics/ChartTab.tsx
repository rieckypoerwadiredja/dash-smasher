// ChartTab.tsx
import React from "react";

interface ChartTabProps {
  selected: "daily" | "monthly" | "quarterly" | "yearly";
  onChange: (period: "daily" | "monthly" | "quarterly" | "yearly") => void;
}

const ChartTab: React.FC<ChartTabProps> = ({ selected, onChange }) => {
  const getButtonClass = (option: string) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 bg-white"
      : "text-gray-500";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5">
      {["daily", "monthly", "quarterly", "yearly"].map((opt) => (
        <button
          key={opt}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => onChange(opt as any)}
          className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 ${getButtonClass(
            opt
          )}`}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ChartTab;
