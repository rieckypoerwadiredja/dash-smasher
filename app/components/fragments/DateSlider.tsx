"use client";
import { useRef } from "react";
import { FaCalendarDays } from "react-icons/fa6";

interface DateSliderProps {
  currentMonth: number;
  currentYear: number;
  days: number[];
  monthNames: string[];
  selectedDate: Date | null;
  onSelectDate: (day: number) => void;
  onMonthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateSlider({
  currentMonth,
  currentYear,
  days,
  monthNames,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: DateSliderProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const today = new Date();

  const openPicker = () => hiddenInputRef.current?.showPicker?.();

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          openPicker();
        }}
        className=" text-white bg-primary transition-all duration-100 font-semibold rounded-2xl flex flex-col justify-between items-center shrink-0 p-5 aspect-square w-32"
      >
        <span className="flex font-semibold text-md">
          {currentYear} {monthNames[currentMonth]}
        </span>
        <FaCalendarDays className="text-4xl" />
      </button>

      <input
        ref={hiddenInputRef}
        type="month"
        className="hidden"
        min={`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`}
        max={`${currentYear + 1}-${String((currentMonth + 2) % 12).padStart(
          2,
          "0"
        )}`}
        onChange={onMonthChange}
      />

      {days.map((day) => {
        const date = new Date(currentYear, currentMonth, day);
        const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();
        const isSelected =
          selectedDate?.getDate() === day &&
          selectedDate?.getMonth() === currentMonth;

        return (
          <button
            key={day}
            onClick={() => onSelectDate(day)}
            className={`${
              isSelected
                ? "bg-primary text-white"
                : isToday
                ? "bg-primary/50 text-white"
                : "bg-light-gray text-dark-gray hover:bg-primary hover:text-white"
            } cursor-pointer transition-all duration-100 font-semibold rounded-2xl flex flex-col justify-between items-center shrink-0 p-5 aspect-square w-24`}
          >
            <span className="font-medium text-xl">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <span className="text-3xl font-bold">{day}</span>
          </button>
        );
      })}
    </>
  );
}

export function DateSliderSkeleton() {
  // Buat placeholder 1 bulan + beberapa tanggal (misal 7 tanggal)
  const days = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      {/* Skeleton tombol bulan */}
      <div className="bg-gray-300 animate-pulse rounded-2xl flex flex-col justify-between items-center shrink-0 p-5 aspect-square w-24 mb-4">
        <div className="h-4 w-16 bg-gray-400 rounded mb-2"></div>
        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
      </div>

      {/* Skeleton tanggal */}
      <div className="flex gap-2 flex-wrap">
        {days.map((day) => (
          <div
            key={day}
            className="bg-gray-300 animate-pulse rounded-2xl flex flex-col justify-between items-center shrink-0 p-5 aspect-square w-24"
          >
            <div className="h-4 w-10 bg-gray-400 rounded mb-2"></div>
            <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </>
  );
}
