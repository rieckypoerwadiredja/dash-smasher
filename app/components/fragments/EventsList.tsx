// components/fragments/EventsList.tsx
import Section from "./Section";
import { SliderImages, SliderSkeleton } from "./Slider";

export interface EventItem {
  id: string;
  name: string;
  image: string;
  date: string;
  location: string;
  description: string;
}

interface EventsListProps {
  events: EventItem[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <Section>
      <div className="px-2 py-5 md:px-10 md:pb-12 bg-primary pl-5 rounded-l-2xl w-[95%] -mr-5 md:-mr-10 ml-auto">
        <SliderImages
          title="Upcoming Events"
          images={events.map((e) => ({ name: e.name, image: e.image }))}
        />
      </div>
    </Section>
  );
}

export function EventsListSkeleton() {
  return (
    <Section>
      <div className="px-2 py-5 md:px-10 md:pb-12 pl-5 rounded-l-2xl w-[95%] -mr-5 md:-mr-10 ml-auto bg-gray-200/70 animate-pulse">
        <SliderSkeleton />
      </div>
    </Section>
  );
}
