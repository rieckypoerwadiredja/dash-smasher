import { History } from "@/app/(fullscreen)/profile/page";
import { MainCardProps } from "@/app/components/elements/Card";

export function mapHistoryToActivities(history: History): MainCardProps[] {
  return [
    ...history.books.map((b) => ({
      id: b.id,
      image: b.image,
      name: b.name,
      desc: b.status,
    })),
    ...history.events.map((e) => ({
      id: e.id,
      image: e.image,
      name: e.name,
      desc: e.desc,
    })),
  ];
}
