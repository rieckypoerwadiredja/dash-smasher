"use client";

import { SliderImageContainerSkeleton } from "../components/fragments/SliderImageContainer";
import { RecentActivityListSkeleton } from "../components/fragments/RecentActivityList";
import { CardListSkeleton } from "../components/fragments/CardList";

export default function LoadingPage() {
  return (
    <>
      <SliderImageContainerSkeleton />
      <RecentActivityListSkeleton />
      <CardListSkeleton />
    </>
  );
}
