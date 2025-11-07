"use client";
import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  link?: string;
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  link,
  onClick,
  primary = true,
}: ButtonProps) {
  const baseClass = `text-lg font-semibold ${
    primary && "bg-primary hover:bg-primary/90 text-white"
  }   px-3 py-1.5 rounded-lg  transition-colors whitespace-nowrap ${className}`;

  if (link) {
    return (
      <Link href={link} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={false}
      onClick={onClick}
      type="button"
      className={baseClass}
    >
      {children}
    </button>
  );
}
