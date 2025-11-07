// components/fragments/TimeSlotPicker.tsx
import React from "react";
import Button from "../elements/Button";
import { Court } from "./CourtCardList";
import { Book } from "@/app/(fullscreen)/courts/[id]/page";

export interface TimeSlotPickerProps {
  timeLabel?: string;
  timeSlots: string[];
  books: Book[];
  form: FormState;
  court: Court | null;
  onSelectTime: (time: string) => void;
}

export interface FormState {
  id: string;
  court_id: string;
  court_number: string;
  user: string;
  start_time: string;
  end_time: string;
  date: string;
  status: string;
}

export default function TimeSlotPicker({
  timeLabel,
  timeSlots,
  books,
  form,
  court,
  onSelectTime,
}: TimeSlotPickerProps) {
  return (
    <div>
      <label className="text-sm font-medium flex justify-between mb-2">
        <span>Time</span>
        {timeLabel && (
          <span className="text-xs text-gray-500">{timeLabel}</span>
        )}
      </label>
      <div className="flex flex-wrap gap-3">
        {timeSlots.length < 1 && (
          <span className="text-gray-500 italic">
            No available time slots for this date.
          </span>
        )}
        {timeSlots.map((time) => {
          const isBooked = books.some((b) => {
            return (
              court &&
              b.court_id === court.id &&
              b.court_number === form.court_number &&
              b.date === form.date &&
              time >= b.start_time &&
              time < b.end_time
            );
          });

          const isSelected =
            form.start_time &&
            form.end_time &&
            time >= form.start_time &&
            time < form.end_time;

          return (
            <Button
              key={time}
              primary={isSelected}
              disabled={isBooked}
              className={`${
                isBooked
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : isSelected
                  ? "bg-primary text-white cursor-pointer"
                  : "bg-dark-gray text-black cursor-pointer"
              }`}
              onClick={() => !isBooked && onSelectTime(time)}
            >
              {time}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
