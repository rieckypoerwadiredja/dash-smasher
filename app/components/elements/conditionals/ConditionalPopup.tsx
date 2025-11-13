import React from "react";
import CardPoup, { PopupProps } from "../../fragments/popup/CardPoup";

export interface ConditionalPopupProps {
  data?: PopupProps;
  children: React.ReactNode;
  className?: string;
}

export default function ConditionalPopup({
  data,
  children,
  className,
}: ConditionalPopupProps) {
  if (!data) {
    return (
      <div className={`cursor-default ${className || ""}`}>{children}</div>
    );
  }

  return (
    <CardPoup data={data} className={`cursor-pointer ${className || ""}`}>
      {children}
    </CardPoup>
  );
}
