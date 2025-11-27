import { History } from "@/app/(fullscreen)/profile/page";
import { MainCardProps } from "@/app/components/elements/Card";
import { generateQR } from "../generateQR";

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
      console.log(generateQR(JSON.stringify({ id: e.id })));
      return {
        id: e.id,
        image: e.image,
        name: e.name,
        desc: `${formatDate.format(dateObject)} | ${e.start_time} - ${
          e.end_time
        } | Court: ${e.court_number}`,
        action_name: "Show QR",
        action_popup: {
          image: generateQR(JSON.stringify({ id: e.id })),
          title: "QR Code Check-In",
          desc: "Present this QR code during check-in. Open the code, show it to the staff, and ensure your screen brightness is sufficient for a successful scan.",
          action_name: `${e.email}`,
          subTitle: {
            date: ` ${e.date} <br/> ${e.start_time} - ${e.end_time} `,
            members: `ID: ${e.id}`,
          },
        },
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
