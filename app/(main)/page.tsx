"use client";

import { useEffect, useState } from "react";
import EventsList, {
  EventItem,
  EventsListSkeleton,
} from "../components/fragments/EventsList";
import RecentActivityList, {
  RecentActivityListSkeleton,
} from "../components/fragments/RecentActivityList";
import CourtCardList, {
  Court,
  CourtCardListSkeleton,
} from "../components/fragments/CourtCardList";
import { API_BASE_URL, fetchData } from "../utils/fetcher";

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchData<EventItem[]>(`${API_BASE_URL}/api/sheets/events`),
      fetchData<Court[]>(`${API_BASE_URL}/api/sheets/courts`),
    ])
      .then(([eventsData, courtsData]) => {
        setEvents(eventsData);
        setCourts(courtsData);
      })
      .catch((err) => console.error("Failed to load data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <>
        <EventsListSkeleton />
        <RecentActivityListSkeleton />
        <CourtCardListSkeleton />
      </>
    );

  return (
    <>
      <EventsList events={events} />
      <RecentActivityList />
      <CourtCardList
        title="Court Availability Status"
        courts={courts}
        filter
        limit
      />
    </>
  );
}
