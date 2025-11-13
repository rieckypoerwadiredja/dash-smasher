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
