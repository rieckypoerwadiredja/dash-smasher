"use client";
import { useState } from "react";
import Section from "./Section";
import CardGrid from "./CardGrid";
import Info, { InfoSkeleton } from "../elements/Info";
import { IMAGES } from "@/app/constants/image";
import Button from "../elements/Button";
import Image from "next/image";

export interface Activity {
  image?: string;
  title: string;
  desc: string;
}

export default function RecentActivityList({
  activities,
  limit = false,
}: {
  activities: Activity[];
  limit?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleActivities = showAll
    ? activities
    : limit
    ? activities.slice(0, 3)
    : activities;

  return (
    <Section title="Recent Activity" className="w-full flex-col items-start">
      {activities.length === 0 && (
        <div className="flex items-center justify-center h-full w-full min-h-[200px]">
          <Image
            src={IMAGES.mainMascot}
            alt="Main Mascot"
            width={200}
            height={100}
          />
          <div className="flex flex-col gap-y-5">
            <h3 className="text-2xl font-bold">Let's make first booking!</h3>
            <Button link="/courts" className="btn btn-primary text-center">
              Book Now
            </Button>
          </div>
        </div>
      )}
      <CardGrid>
        {visibleActivities.map((activity, index) => (
          <Info
            key={index}
            image={activity.image || IMAGES.mainMascot}
            title={activity.title}
            desc={activity.desc}
          />
        ))}
      </CardGrid>

      {activities.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-primary font-medium hover:underline cursor-pointer"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </Section>
  );
}

export function RecentActivityListSkeleton() {
  const skeletons = Array.from({ length: 3 });

  return (
    <Section className="w-full flex-col items-start animate-pulse">
      {/* Skeleton title */}
      <div className="h-6 md:h-8 w-40 bg-gray-300 rounded mb-4"></div>

      {/* Grid skeleton cards */}
      <CardGrid>
        {skeletons.map((_, i) => (
          <InfoSkeleton key={i} />
        ))}
      </CardGrid>

      {/* Skeleton button */}
      <div className="mt-4 h-5 w-20 bg-gray-300 rounded"></div>
    </Section>
  );
}
