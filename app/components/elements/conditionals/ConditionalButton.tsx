import Link from "next/link";
import React from "react";
import Button from "../Button";

interface ConditionalButtonProps {
  action?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ConditionalButton({
  action,
  children,
  className,
}: ConditionalButtonProps) {
  if (!action) {
    return (
      <div className={`cursor-default ${className || ""}`}>{children}</div>
    );
  }

  return (
    <Button onClick={action} className={`cursor-pointer ${className || ""}`}>
      {children}
    </Button>
  );
}
