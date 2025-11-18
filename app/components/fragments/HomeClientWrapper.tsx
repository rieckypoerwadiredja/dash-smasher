"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { ImageItemProps } from "./Slider";
import { handleJoin } from "@/app/utils/fetcher";
import SliderImageContainer, {
  SliderImageContainerProps,
} from "./SliderImageContainer";
import { useRouter } from "next/navigation";
import { EventMember } from "@/app/(main)/events/page";

interface HomeClientWrapperProps extends SliderImageContainerProps {
  userEvents?: EventMember[]; // array of event IDs the user already joined
}

function HomeClientWrapper({ data, userEvents = [] }: HomeClientWrapperProps) {
  const { data: session } = useSession();
  const route = useRouter();

  const cardsWithClick: ImageItemProps[] = data.map((item: ImageItemProps) => {
    if (!item.action_popup) return item;

    const isAlreadyRegistered = userEvents.some((e) => e.event_id === item.id);

    return {
      ...item,
      action_popup: {
        ...item.action_popup,
        action_name: isAlreadyRegistered ? "Already Registered" : "Join Now",
        action: async () => {
          if (!isAlreadyRegistered) {
            await handleJoin(item.id, session, route);
            route.refresh();
          }
        },
      },
    };
  });

  return <SliderImageContainer data={cardsWithClick} />;
}

export default HomeClientWrapper;
