"use client";
import CardGrid from "./CardGrid";
import Section from "./Section";
import { CardSkeleton, MainCard, MainCardProps } from "../elements/Card";
import { ReactNode } from "react";

interface CardListProps {
  title: string;
  cards: MainCardProps[];
  limit?: boolean;
  filterComponent?: ReactNode;
}

export default function CardList({
  title,
  cards,
  limit = false,
  filterComponent,
}: CardListProps) {
  const visibleCourts = limit ? cards.slice(-6) : cards;

  return (
    <Section title={title}>
      {filterComponent && (
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
          {filterComponent}
        </div>
      )}

      <CardGrid className="gap-4 md:gap-8">
        {visibleCourts.map((card) => (
          <MainCard key={card.id} card={card} />
        ))}
      </CardGrid>
    </Section>
  );
}

interface CardListSkeletonProps {
  cardCount?: number;
  filterCount?: number;
}
export function CardListSkeleton({
  cardCount = 6,
  filterCount = 2,
}: CardListSkeletonProps) {
  const skeletons = Array.from({ length: cardCount });
  const filterSkeletons = Array.from({ length: filterCount });

  return (
    <Section className="animate-pulse">
      {/* Title */}
      <div className="h-7 w-52 bg-gray-300 rounded mb-6"></div>

      {/* Filter Skeleton */}
      <div className="flex flex-wrap items-center gap-3 my-6 text-sm">
        {filterSkeletons.map((_, i) => (
          <div key={i} className="h-8 w-32 bg-gray-300 rounded-md"></div>
        ))}
      </div>

      {/* Card Skeleton */}
      <CardGrid className="gap-4 md:gap-8">
        {skeletons.map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </CardGrid>
    </Section>
  );
}
