"use client";

import { Slider } from "@/app/components/fragments/Slider";
import { BookingFooterSkeleton } from "@/app/components/fragments/BookingFooter";
import { DateSliderSkeleton } from "@/app/components/fragments/DateSlider";
import { TimeSlotPickerSkeleton } from "@/app/components/fragments/TimeSlotPicker";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Skeleton */}
      <div className="relative aspect-video w-full max-h-[300px] bg-gray-300 animate-pulse" />

      {/* Content Skeleton */}
      <div className="relative -mt-5 flex flex-col justify-between gap-y-10 z-30 p-6 bg-white text-gray-800 rounded-t-2xl w-full flex-1 pb-40">
        <Slider>
          <DateSliderSkeleton />
        </Slider>
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-y-5">
          <TimeSlotPickerSkeleton />
        </div>

        <BookingFooterSkeleton />
      </div>
    </div>
  );
}
