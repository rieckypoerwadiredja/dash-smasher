"use client";

import { EventsListSkeleton } from "../components/fragments/EventsList";
import { RecentActivityListSkeleton } from "../components/fragments/RecentActivityList";
import { CourtCardListSkeleton } from "../components/fragments/CourtCardList";

export default function LoadingPage() {
  return (
    <>
      <EventsListSkeleton />
      <RecentActivityListSkeleton />
      <CourtCardListSkeleton />
    </>
  );
}
