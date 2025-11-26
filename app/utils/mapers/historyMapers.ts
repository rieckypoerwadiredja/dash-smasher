import { History } from "@/app/(fullscreen)/profile/page";
import { MainCardProps } from "@/app/components/elements/Card";

// Asumsikan e.date dalam format "17-11-2025" (DD-MM-YYYY)
export function mapBookToActivities(history: History): MainCardProps[] {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formatDate = new Intl.DateTimeFormat("id-ID", options);

  return [
    ...history.books.map((e) => {
      const parts = e.date.split("-");
      const isoFormattedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
      const dateObject = new Date(isoFormattedDateString);

      return {
        id: e.id,
        image: e.image,
        name: e.name,
        desc: `${formatDate.format(dateObject)} | ${e.start_time} - ${
          e.end_time
        } | Court: ${e.court_number}`,
      };
    }),
  ];
}

export function mapEventToActivities(history: History): MainCardProps[] {
  return [
    ...history.events.map((e) => ({
      id: e.id,
      image: e.image,
      name: e.name,
      desc: e.desc,
    })),
  ];
}
