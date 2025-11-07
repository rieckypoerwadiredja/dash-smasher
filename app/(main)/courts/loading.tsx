import React from "react";
import { CourtCardListSkeleton } from "@/app/components/fragments/CourtCardList";

function loading() {
  return <CourtCardListSkeleton />;
}

export default loading;
