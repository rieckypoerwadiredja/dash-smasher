"use client";
import { useState } from "react";
import Section from "./Section";
import CardGrid from "./CardGrid";
import Info from "../elements/Info";

interface Activity {
  image: string;
  title: string;
  desc: string;
}

export default function RecentActivityList() {
  const activities: Activity[] = [
    {
      image: "/events/event1.jpg",
      title: "Badminton Training",
      desc: "with Anton Suginto",
    },
    {
      image: "/events/event2.jpg",
      title: "Junior Match",
      desc: "35 participants",
    },
    {
      image: "/events/event3.jpg",
      title: "Badminton Training",
      desc: "with Doni, Budi Sugandi",
    },
    {
      image: "/events/event1.jpg",
      title: "Badminton Training",
      desc: "with Anton Suginto",
    },
    {
      image: "/events/event2.jpg",
      title: "Junior Match",
      desc: "35 participants",
    },
    {
      image: "/events/event3.jpg",
      title: "Badminton Training",
      desc: "with Doni, Budi Sugandi",
    },
    {
      image: "/events/event1.jpg",
      title: "Badminton Training",
      desc: "with Anton Suginto",
    },
    {
      image: "/events/event2.jpg",
      title: "Junior Match",
      desc: "35 participants",
    },
    {
      image: "/events/event3.jpg",
      title: "Badminton Training",
      desc: "with Doni, Budi Sugandi",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleActivities = showAll
    ? activities.slice(-6)
    : activities.slice(-3);

  return (
    <Section title="Recent Activity" className="w-full flex-col items-start">
      <CardGrid>
        {visibleActivities.map((activity, index) => (
          <Info
            key={index}
            image={activity.image}
            title={activity.title}
            participants={activity.desc}
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
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
          >
            {/* Image placeholder */}
            <div className="w-full h-40 bg-gray-300"></div>
            <div className="p-3">
              <div className="h-5 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </CardGrid>

      {/* Skeleton button */}
      <div className="mt-4 h-5 w-20 bg-gray-300 rounded"></div>
    </Section>
  );
}
