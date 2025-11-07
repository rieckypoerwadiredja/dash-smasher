import React from "react";
import CourtCardList, { Court } from "@/app/components/fragments/CourtCardList";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";

async function getCourts(): Promise<Court[]> {
  return fetchData<Court[]>(`${API_BASE_URL}/api/sheets/courts`);
}
async function CourtsPage() {
  const courts = await getCourts();
  return <CourtCardList courts={courts} title="" filter />;
}

export default CourtsPage;
