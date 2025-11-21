import React from "react";
import Button from "./Button";
import SkeletonImage from "../fragments/SkeletonImage";
import { CardDesc, CardTitle } from "./Text";
import ConditionalLink from "./conditionals/ConditionalLink";
import ConditionalPopup from "./conditionals/ConditionalPopup";
import { PopupProps } from "../fragments/popup/CardPoup";

export function CardSkeleton() {
  return (
    <div className="p-3 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
      {/* Image block */}
      <div className="w-full h-48 rounded-t-xl bg-gray-300 mb-4"></div>

      {/* Text and button */}
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 pr-3">
          <div className="h-5 bg-gray-300 mb-2 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export interface MainCardProps {
  id: string;
  image: string;
  name: string;
  desc: string;
  action_link?: string | "disabled";
  action_name?: string | "Already Registered";
  action_popup?: PopupProps;
  //
  rawStartTime?: string;
  rawEndTime?: string;
  rawDate?: Date;
  rawType?: string;
  rawCity?: string;
  rawMinCourt?: number;
  rawOpenTime?: string;
  rawCloseTime?: string;
  rawStartDate?: Date;
  rawEndDate?: Date;
}
export function MainCard({ card }: { card: MainCardProps }) {
  const { id, image, name, desc, action_link, action_name, action_popup } =
    card;

  return (
    <div
      key={id}
      className="p-3 bg-white rounded-xl shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <ConditionalLink href={action_link} className="block h-48">
        <ConditionalPopup
          data={action_popup}
          className="relative w-full h-48 rounded-t-xl overflow-hidden block"
        >
          <SkeletonImage src={image} alt={name} className="cursor-pointer" />
        </ConditionalPopup>
      </ConditionalLink>
      {/* Content */}
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 flex-col pr-3">
          <CardTitle>{name}</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <CardDesc>{desc}</CardDesc>
            {(action_link || action_name || action_popup) && (
              <ConditionalPopup data={action_popup}>
                <Button
                  link={action_link}
                  disabled={
                    action_link === "disabled" ||
                    action_name === "Already Registered"
                  }
                  className="cursor-pointer px-3 py-1 text-sm"
                >
                  {action_name}
                </Button>
              </ConditionalPopup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
