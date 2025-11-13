"use client";
// 1. Import 'useCallback'
import React, { useEffect, useState, useCallback } from "react";
import CardList from "./CardList";
import FilterEvent from "./FilterEvent";
import { MainCardProps } from "../elements/Card";

interface EventClientWrapperProps {
  initialCards: MainCardProps[];
}

export default function EventClientWrapper({
  initialCards,
}: EventClientWrapperProps) {
  const [filteredCards, setFilteredCards] = useState(initialCards);

  useEffect(() => {
    console.log("Filter changed:", filteredCards);
  }, [filteredCards]);

  const handleFilterChange = useCallback(
    (month: number, type: string) => {
      let result = initialCards;

      if (month) {
        result = result.filter((card) => {
          const cardDate = card.rawStartDate
            ? new Date(card.rawStartDate)
            : null;
          // isNaN untuk tanggal yang tidak valid
          if (!cardDate || isNaN(cardDate.getTime())) return false;
          return cardDate.getMonth() + 1 === month;
        });
      }

      if (type) {
        result = result.filter((card) => (card.rawType ?? "") === type);
      }

      setFilteredCards(result);
    },
    [initialCards]
  );

  return (
    <CardList
      cards={filteredCards}
      title=""
      filterComponent={<FilterEvent onFilterChange={handleFilterChange} />}
    />
  );
}
