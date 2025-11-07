"use client";

import { IoHome, IoCalendar, IoPerson } from "react-icons/io5";
import { GiTennisCourt } from "react-icons/gi";
import Link from "next/link";
import { JSX } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: <IoHome size={22} /> },
  { name: "Events", href: "/events", icon: <IoCalendar size={22} /> },
  { name: "Courts", href: "/courts", icon: <GiTennisCourt size={22} /> },
  { name: "Profile", href: "/profile", icon: <IoPerson size={22} /> },
];

export function NavMob() {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-light-gray shadow-md md:hidden z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function NavDesktop() {
  return (
    <nav className="hidden md:flex justify-center items-center gap-8 py-3 px-6">
      {navItems.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
