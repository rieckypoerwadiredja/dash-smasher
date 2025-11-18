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

export function GoogleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center bg-white border border-gray-300  text-black! cursor-pointer duration-300 transition-all
                 rounded-lg shadow-md px-6 py-2 text-sm font-medium 
                  dark:text-white hover:bg-black/2 
                 focus:outline-none 
                 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FcGoogle className="h-6 w-6 mr-2" />
      <span>Continue with Google</span>
    </button>
  );
}

import { FaGithub } from "react-icons/fa";

export function GithubButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center bg-white border border-gray-300 text-black! cursor-pointer duration-300 transition-all
                 rounded-lg shadow-md px-6 py-2 text-sm font-medium 
                 dark:text-white hover:bg-black/2
                 focus:outline-none 
                 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FaGithub className="h-6 w-6 mr-2" />
      <span>Continue with Github</span>
    </button>
  );
}

import { TiVendorMicrosoft } from "react-icons/ti";

export function MicrosoftButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center bg-white border border-gray-300 text-black! cursor-pointer duration-300 transition-all
                 rounded-lg shadow-md px-6 py-2 text-sm font-medium 
                 dark:text-white hover:bg-black/2
                 focus:outline-none 
                 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <TiVendorMicrosoft className="h-6 w-6 mr-2 text-blue-500" />
      <span>Continue with Microsoft</span>
    </button>
  );
}
