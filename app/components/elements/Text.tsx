import React from "react";

export function CardTitle({ children }: { children: string }) {
  return (
    <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
      {children}
    </h4>
  );
}

export function CardDesc({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`text-gray-500 text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: children }}
    ></p>
  );
}

export function Paragraph({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`text-gray-500 text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: children }}
    ></p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl md:text-3xl text-black font-semibold mb-5 ${className}`}
    >
      {children}
    </h2>
  );
}
