"use client";
import { useState } from "react";
import Section from "./Section";
import CardGrid from "./CardGrid";
import Info, { InfoSkeleton } from "../elements/Info";

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
      <CardGrid>
        {visibleActivities.map((activity, index) => (
          <Info
            key={index}
            image={activity.image || "/mascot/mascot.png"}
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
