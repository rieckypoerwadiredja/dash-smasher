import React from "react";
import { CardListSkeleton } from "@/app/components/fragments/CardList";

function loading() {
  return <CardListSkeleton filterCount={4} />;
}

export default loading;
