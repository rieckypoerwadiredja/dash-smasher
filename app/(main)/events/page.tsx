import { MainCardProps } from "@/app/components/elements/Card";
import EventClientWrapper from "@/app/components/fragments/EventClientWrapper";
import Section from "@/app/components/fragments/Section";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";
import { mapEventToCardData } from "@/app/utils/mapers/eventMapers";

export interface Event {
  id: string;
  name: string;
  image: string;
  desc: string;
  start_time: string;
  end_time: string;
  start_date: Date;
  end_date: Date;
  type: string;
}
export default async function PageEvent() {
  const events = await fetchData<Event[]>(`${API_BASE_URL}/api/sheets/events`, {
    runtime: true,
  });
  const cards: MainCardProps[] = events.map(mapEventToCardData);

  return (
    <Section title="Events">
      <EventClientWrapper initialCards={cards} />
    </Section>
  );
}
