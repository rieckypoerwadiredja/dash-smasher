"use client";
// 1. Import 'useCallback'
import React, { useEffect, useState, useCallback } from "react";
import CardList from "./CardList";
import FilterEvent from "./FilterEvent";
import { MainCardProps } from "../elements/Card";
import { handleJoin } from "@/app/utils/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EventClientWrapperProps {
  initialCards: MainCardProps[];
}

export default function EventClientWrapper({
  initialCards,
}: EventClientWrapperProps) {
  const [filteredCards, setFilteredCards] = useState(initialCards);

  const { data: session } = useSession();
  const route = useRouter();

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

  // add onClick to every card
  const cardsWithClick: MainCardProps[] = filteredCards.map((card) => {
    if (!card.action_popup) return card;
    return {
      ...card,
      action_popup: {
        ...card.action_popup,
        action: async () => {
          await handleJoin(card.id, session, route);
        },
      },
    };
  });

  return (
    <CardList
      cards={cardsWithClick}
      title=""
      status={{
        title: "Oops, event not found",
        desc: "Try other keywords",
        status: "empty",
      }}
      filterComponent={<FilterEvent onFilterChange={handleFilterChange} />}
    />
  );
}
