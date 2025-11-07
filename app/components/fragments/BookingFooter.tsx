"use client";
import Button from "@/app/components/elements/Button";

interface BookingFooterProps {
  price: number;
  onBook: () => void;
}

export default function BookingFooter({ price, onBook }: BookingFooterProps) {
  return (
    <div className="absolute max-w-[800px] rounded-xl mx-auto bottom-20 md:bottom-5 left-0 right-0 flex w-full bg-white shadow-lg p-5 justify-between items-center">
      <div>
        <div className="flex gap-x-2 items-center">
          <p className="text-2xl font-bold text-black">Rp.{price}K</p>
          <p className="text-lg italic line-through text-dark-gray">
            Rp.{price}K
          </p>
        </div>
        <p className="text-xs text-dark-gray">
          *Price includes taxes and other fees
        </p>
      </div>
      <Button className="cursor-pointer" onClick={onBook}>
        Book Now
      </Button>
    </div>
  );
}

export function BookingFooterSkeleton() {
  return (
    <div className="absolute max-w-[800px] rounded-xl mx-auto bottom-20 md:bottom-5 left-0 right-0 flex w-full bg-white shadow-lg p-5 justify-between items-center">
      <div>
        <div className="flex gap-x-2 items-center">
          {/* Skeleton price */}
          <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-300 rounded ml-2 animate-pulse"></div>
        </div>
        {/* Skeleton note */}
        <div className="h-3 w-48 bg-gray-300 rounded mt-1 animate-pulse"></div>
      </div>
      {/* Skeleton button */}
      <div className="h-12 w-32 bg-gray-300 rounded-xl animate-pulse"></div>
    </div>
  );
}
