import React from "react";
import Button from "./Button";
import SkeletonImage from "../fragments/SkeletonImage";
import { Court } from "../fragments/CourtCardList";
import Link from "next/link";

function Card({ court }: { court: Court }) {
  return (
    <Link
      href={`/courts/${court.id}`}
      key={court.id}
      className="p-3 bg-white rounded-xl shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <SkeletonImage
          src={court.image}
          alt={court.name}
          className="cursor-pointer"
        />
      </div>

      {/* Content */}
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 flex-col pr-3">
          <h4 className="text-lg font-semibold text-gray-900 leading-snug">
            {court.name}
          </h4>
          <div className="flex items-center justify-between gap-2">
            <p className="text-gray-500 text-sm">
              {court.city} — {court.location}
              <br />
              {`${court.open_time} - ${court.close_time}`}
            </p>
            <Button
              link={`/courts/${court.id}`}
              className="px-3 py-1 text-sm" // kecilkan padding
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
