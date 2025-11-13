// components/fragments/SliderImageContainer.tsx
import Section from "./Section";
import { ImageItemProps, SliderImages, SliderSkeleton } from "./Slider";

export interface SliderImageContainerProps {
  data: ImageItemProps[];
}

export default function SliderImageContainer({
  data,
}: SliderImageContainerProps) {
  return (
    <Section>
      <div className="px-2 py-5 md:px-10 md:pb-12 bg-primary pl-5 rounded-l-2xl w-[95%] -mr-5 md:-mr-10 ml-auto">
        <SliderImages
          title="Upcoming Events"
          images={data.map((e) => ({
            id: e.id,
            name: e.name,
            image: e.image,
            url: `/events/${e.id}`,
            action_popup: e.action_popup,
          }))}
        />
      </div>
    </Section>
  );
}

export function SliderImageContainerSkeleton() {
  return (
    <Section>
      <div className="px-2 py-5 md:px-10 md:pb-12 pl-5 rounded-l-2xl w-[95%] -mr-5 md:-mr-10 ml-auto bg-gray-200/70 animate-pulse">
        <SliderSkeleton />
      </div>
    </Section>
  );
}
