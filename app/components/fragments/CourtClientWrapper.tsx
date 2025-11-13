"use client";
import React, { useCallback, useState } from "react";
import CardList from "./CardList";
import { MainCardProps } from "../elements/Card";
import FilterCourt from "./FilterCourt";
interface CourtClientWrapperProps {
  initialCards: MainCardProps[];
}
function CourtClientWrapper({ initialCards }: CourtClientWrapperProps) {
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const handleFilterChange = useCallback(
    (filters: {
      city: string;
      minCourt: number;
      openTime: string;
      closeTime: string;
    }) => {
      const result = initialCards.filter((card) => {
        return (
          (!filters.city || card.rawCity === filters.city) &&
          (!filters.minCourt || (card.rawMinCourt ?? 0) >= filters.minCourt) &&
          (!filters.openTime || (card.rawOpenTime ?? "") >= filters.openTime) &&
          (!filters.closeTime || (card.rawCloseTime ?? "") <= filters.closeTime)
        );
      });
      setFilteredCards(result);
    },
    [initialCards]
  );

  return (
    <CardList
      title=""
      cards={filteredCards}
      filterComponent={
        <FilterCourt
          courts={initialCards}
          onFilterChange={handleFilterChange}
        />
      }
    />
  );
}

export default CourtClientWrapper;
