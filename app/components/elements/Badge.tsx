import React from "react";

type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  const sizeStyles = {
    sm: "text-xs",
    md: "text-sm",
  };

  const variants = {
    light: {
      primary: "bg-brand-50 text-brand-600",
      success: "bg-green-50 text-green-600",
      error: "bg-red-50 text-red-600",
      warning: "bg-yellow-50 text-yellow-600",
      info: "bg-blue-50 text-blue-600",
      light: "bg-gray-100 text-gray-700",
      dark: "bg-gray-300 text-gray-900",
    },
    solid: {
      primary: "bg-brand-600 text-white",
      success: "bg-green-600 text-white",
      error: "bg-red-600 text-white",
      warning: "bg-yellow-600 text-white",
      info: "bg-blue-600 text-white",
      light: "bg-gray-400 text-white",
      dark: "bg-gray-700 text-white",
    },
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant][color]}`}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
