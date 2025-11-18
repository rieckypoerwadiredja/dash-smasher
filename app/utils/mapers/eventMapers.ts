import { Event, EventMember } from "@/app/(main)/events/page";
import { MainCardProps } from "@/app/components/elements/Card";
import { PopupProps } from "@/app/components/fragments/popup/CardPoup";
import { ImageItemProps } from "@/app/components/fragments/Slider";
import { formatDateRange } from "../date";

export const mapEventToCardData = (
  event: Event,
  userEventData?: EventMember[] | undefined
): MainCardProps => {
  const userEventsArray = userEventData ? userEventData : [];

  let alreadyRegistered = false;
  for (let i = 0; i < userEventsArray.length; i++) {
    const userEvent = userEventsArray[i];
    console.log("Checking userEvent:", userEvent);
    if (userEvent.event_id === event.id) {
      alreadyRegistered = true;
      break;
    }
  }

  console.log(event.id, userEventsArray);
  return {
    id: event.id,
    name: event.name,
    image: event.image,
    desc: event.desc?.slice(0, 50) || "",
    action_name: alreadyRegistered ? "Already Registered" : "Register Now",
    action_popup: {
      image: event.image,
      title: event.name,
      desc: event.desc,
      action_name: alreadyRegistered ? "Already Registered" : "Join Now",
      subTitle: {
        date: `${event.start_date} - ${event.end_date}`,
        members: 200,
      },
    },
    rawStartDate: event.start_date,
    rawEndDate: event.end_date,
    rawType: event.type,
  };
};

export const mapEventsToSliderData = (event: Event): ImageItemProps => {
  const startDateObj = new Date(event.start_date);
  const endDateObj = new Date(event.end_date);

  const formattedStartDate = startDateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedEndDate = endDateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedDateRange = formatDateRange(startDateObj, endDateObj);
  // short dan full desc
  const shortDesc =
    event.desc && event.desc.length > 50
      ? event.desc.slice(0, 50) + "..."
      : event.desc;

  const fullDesc = `${
    event.desc || ""
  }\n\n${formattedStartDate} - ${formattedEndDate}`;
  const shortVersion = shortDesc
    ? `${shortDesc}\n\n${formattedStartDate} - ${formattedEndDate}`
    : `${formattedStartDate} - ${formattedEndDate}`;

  const popupData: PopupProps = {
    image: event.image,
    title: event.name,
    subTitle: {
      date: formattedDateRange,
      members: 200,
    },
    desc: fullDesc,
    action_name: "Join Now",
  };

  const data = {
    id: event.id,
    name: event.name,
    image: event.image,
    desc: shortVersion,
    action_popup: popupData,
  };

  return data;
};
