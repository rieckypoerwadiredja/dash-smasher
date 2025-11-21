import CourtsClientWrapper from "@/app/components/fragments/CourtsClientWrapper";
import Section from "@/app/components/fragments/Section";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";
import { mapCourtToCardData } from "@/app/utils/mapers/courtMapers";
export interface Court {
  id: string;
  name: string;
  image: string;
  desc: string;
  location: string;
  city: string;
  open_time: string;
  close_time: string;
  open_day: string;
  map_link: string;
  court_count: number;
  price_per_hour: number;
}
export const dynamic = "force-dynamic";
export default async function CourtsPage() {
  const courts = await fetchData<Court[]>(`${API_BASE_URL}/api/sheets/courts`);
  const cards = courts.map(mapCourtToCardData);

  return (
    <Section title="Avalaible Courts">
      <CourtsClientWrapper initialCards={cards} />
    </Section>
  );
}
