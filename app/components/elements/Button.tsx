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

interface AuthButton {
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  link,
  onClick,
  disabled = false,
  primary = true,
}: ButtonProps) {
  const baseClass = `text-lg font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${className} `;

  const primaryClass = primary
    ? "bg-primary hover:bg-primary/90 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  const disabledClass = disabled
    ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
    : primaryClass;

  if (link) {
    return (
      <Link href={link} className={`${baseClass} ${disabledClass}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`${baseClass} ${disabledClass}`}
    >
      {children}
    </button>
  );
}

import { FcGoogle } from "react-icons/fc";

export function GoogleButton({ onClick, disabled = false }: AuthButton) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`flex items-center border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium 
        transition-all duration-300 
        ${
          disabled
            ? "bg-gray-100cursor-not-allowed opacity-50"
            : "bg-white text-black hover:bg-black/5 cursor-pointer"
        }`}
    >
      <FcGoogle className="h-6 w-6 mr-2" />
      <span>Continue with Google</span>
    </button>
  );
}

import { FaGithub } from "react-icons/fa";

export function GithubButton({ onClick, disabled = false }: AuthButton) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium 
        transition-all duration-300 
        ${
          disabled
            ? "bg-gray-100cursor-not-allowed opacity-50"
            : "bg-white text-black hover:bg-black/5 cursor-pointer"
        }`}
    >
      <FaGithub className="h-6 w-6 mr-2" />
      <span>Continue with Github</span>
    </button>
  );
}

import { TiVendorMicrosoft } from "react-icons/ti";

export function MicrosoftButton({ onClick, disabled = false }: AuthButton) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`flex items-center border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium 
        transition-all duration-300 
        ${
          disabled
            ? "bg-gray-100cursor-not-allowed opacity-50"
            : "bg-white text-black hover:bg-black/5 cursor-pointer"
        }`}
    >
      <TiVendorMicrosoft className="h-6 w-6 mr-2 text-blue-500" />
      <span>Continue with Microsoft</span>
    </button>
  );
}
