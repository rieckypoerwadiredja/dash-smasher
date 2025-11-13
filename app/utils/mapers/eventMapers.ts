import { Event } from "@/app/(main)/events/page";
import { MainCardProps } from "@/app/components/elements/Card";
import { PopupProps } from "@/app/components/fragments/popup/CardPoup";
import { ImageItemProps } from "@/app/components/fragments/Slider";
import { formatDateRange } from "../date";

export const mapEventToCardData = (event: Event): MainCardProps => {
  // Date format to (12 Nov 2025)
  const startDateObj = new Date(event.start_date);
  const endDateObj = new Date(event.end_date);

  const formattedDateRange = formatDateRange(startDateObj, endDateObj);

  // Merge Date
  const formattedTime = `Date: ${formattedDateRange}`;

  // short desc
  const shortDesc =
    event.desc && event.desc.length > 50
      ? event.desc.slice(0, 50) + "..."
      : event.desc;

  //full desc
  const fullDesc = `${event.desc || ""}\n\n${formattedTime}`;

  const shortVersion = shortDesc
    ? `${shortDesc}\n\n${formattedTime}`
    : formattedTime;

  return {
    id: event.id,
    name: event.name,
    image: event.image,
    desc: shortVersion,
    action_name: "Register Now",
    action_popup: {
      image: event.image,
      title: event.name,
      desc: fullDesc,
      action_name: "Join Now",
      subTitle: {
        date: formattedDateRange,
        members: 210,
      },
    },
    // Raw data
    rawStartTime: event.start_time,
    rawEndTime: event.end_time,
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
