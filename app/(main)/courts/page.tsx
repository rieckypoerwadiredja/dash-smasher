"use client";
import React, { useEffect, useState } from "react";
import CourtCardList, {
  Court,
  CourtCardListSkeleton,
} from "@/app/components/fragments/CourtCardList";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";

export default function CourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData<Court[]>(`${API_BASE_URL}/api/sheets/courts`)
      .then((data) => setCourts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CourtCardListSkeleton />;

  return <CourtCardList courts={courts} title="" filter />;
}
