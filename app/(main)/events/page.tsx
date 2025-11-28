import { MainCardProps } from "@/app/components/elements/Card";
import EventClientWrapper from "@/app/components/fragments/EventClientWrapper";
import Section from "@/app/components/fragments/Section";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";
import { mapEventToCardData } from "@/app/utils/mapers/eventMapers";
import { getServerSession } from "next-auth";

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

export interface EventMember {
  id: string;
  name: string;
  email: string;
  event_id: string;
  created_at: Date;
}

export default async function PageEvent() {
  const session = await getServerSession();
  const events = await fetchData<Event[]>(`${API_BASE_URL}/api/sheets/events`, {
    runtime: true,
  });

  let EventMember: EventMember[];
  if (session && session.user) {
    EventMember = await fetchData<EventMember[]>(
      `${API_BASE_URL}/api/sheets/event_member?email=${session.user.email}`,
      {
        method: "GET",
        runtime: true,
      }
    );
  }
  const cards: MainCardProps[] = events.map((event) =>
    mapEventToCardData(event, EventMember)
  );
  return (
    <Section title="Events">
      <EventClientWrapper initialCards={cards} />
    </Section>
  );
}
