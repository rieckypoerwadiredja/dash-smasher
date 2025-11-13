import { MainCardProps } from "@/app/components/elements/Card";
import { Court } from "@/app/(main)/courts/page";

export const mapCourtToCardData = (court: Court): MainCardProps => {
  const desc = `${court.city} - ${court.location} <br/> ${court.open_time} - ${court.close_time}`;
  return {
    id: court.id,
    name: court.name,
    image: court.image,
    desc: desc,
    action_link: `courts/${court.id}`,
    action_name: "Book Now",
    //
    rawCity: court.city,
    rawMinCourt: court.court_count,
    rawOpenTime: court.open_time,
    rawCloseTime: court.close_time,
  };
};
