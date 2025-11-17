import SliderImageContainer from "../components/fragments/SliderImageContainer";
import RecentActivityList from "../components/fragments/RecentActivityList";
import { API_BASE_URL, fetchData } from "../utils/fetcher";
import { Event } from "./events/page";
import CardList from "../components/fragments/CardList";
import { Court } from "./courts/page";
import { mapCourtToCardData } from "../utils/mapers/courtMapers";
import { mapEventsToSliderData } from "../utils/mapers/eventMapers";

export default async function Home() {
  const [events, courts] = await Promise.all([
    fetchData<Event[]>(`${API_BASE_URL}/api/sheets/events`),
    fetchData<Court[]>(`${API_BASE_URL}/api/sheets/courts`),
  ]);

  const cards = courts.map(mapCourtToCardData);
  const eventSliders = events.map(mapEventsToSliderData);

  return (
    <>
      <SliderImageContainer data={eventSliders} />
      <RecentActivityList />
      <CardList
        title="Court Availability Status"
        cards={cards}
        limit
        status={{
          title: "Oops, court avalaible",
          desc: "Try again later",
          status: "empty",
        }}
      />
    </>
  );
}
