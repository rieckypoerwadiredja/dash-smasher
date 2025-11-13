import Link from "next/link";
import React from "react";

interface ConditionalLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ConditionalLink({
  href,
  children,
  className,
}: ConditionalLinkProps) {
  if (!href) {
    return (
      <div className={`cursor-default ${className || ""}`}>{children}</div>
    );
  }

  return (
    <Link href={href} className={`cursor-pointer ${className || ""}`}>
      {children}
    </Link>
  );
}
