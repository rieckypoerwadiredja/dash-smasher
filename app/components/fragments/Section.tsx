import React from "react";

function Section({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`my-8 w-full flex flex-col ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl text-black font-semibold mb-5">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export default Section;
