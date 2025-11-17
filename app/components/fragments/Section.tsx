import React from "react";
import { SectionTitle } from "../elements/Text";

function Section({
  title,
  children,
  className,
  minScreen = false,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  minScreen?: boolean;
}) {
  return (
    <section
      className={`my-8 w-full flex flex-col ${className} ${
        minScreen && "min-h-screen"
      }`}
    >
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  );
}

export default Section;
