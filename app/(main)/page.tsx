// app/page.tsx
import EventsList, { EventItem } from "../components/fragments/EventsList";
import RecentActivityList from "../components/fragments/RecentActivityList";
import CourtCardList, { Court } from "../components/fragments/CourtCardList";
import { API_BASE_URL, fetchData } from "../utils/fetcher";

async function getEvents(): Promise<EventItem[]> {
  return fetchData<EventItem[]>(`${API_BASE_URL}/api/sheets/events`);
}

async function getCourts(): Promise<Court[]> {
  return fetchData<Court[]>(`${API_BASE_URL}/api/sheets/courts`);
}

export default async function Home() {
  const events = await getEvents();
  const courts = await getCourts();

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
