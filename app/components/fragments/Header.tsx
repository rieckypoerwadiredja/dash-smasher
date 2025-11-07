"use client";

import Image from "next/image";
import { IoNotifications, IoSearch } from "react-icons/io5";
import Link from "next/link";
import SkeletonImage from "./SkeletonImage";
import { NavDesktop } from "./Nav";

function Header() {
  const fullLogo = "/full-logo.png";

  return (
    <header className="w-full px-3">
      <div className="mx-auto py-3 flex items-center justify-between">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <SkeletonImage
            className="w-20 md:w-30"
            src={fullLogo}
            alt="Logo"
            width={100}
            aspectRatio={2 / 1}
          />
        </div>

        <div>
          <NavDesktop />
        </div>

        {/* RIGHT - Notification & Login */}
        <div className="flex items-center gap-3">
          <Link href="/notification">
            <IoNotifications className="text-primary text-2xl" />
          </Link>
          {/* Login Button (Desktop Only) */}
          <button className="hidden md:inline-block bg-white text-orange-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition">
            Login
          </button>
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-full pe-10 p-3.5 
                   focus:outline-none focus:border-primary focus:ring-0 
                   transition-all duration-200"
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <IoSearch className="text-gray-300 text-2xl" />
        </div>
      </div>
    </header>
  );
}

export function HeaderWithoutSearchBar() {
  const fullLogo = "/full-logo.png";

  return (
    <header className="w-full px-3">
      <div className="mx-auto py-3 flex items-center justify-between">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <SkeletonImage
            className="w-20 md:w-30"
            src={fullLogo}
            alt="Logo"
            width={100}
            aspectRatio={2 / 1}
          />
        </div>

        <div>
          <NavDesktop />
        </div>

        {/* RIGHT - Notification & Login */}
        <div className="flex items-center gap-3">
          <Link href="/notification">
            <IoNotifications className="text-primary text-2xl" />
          </Link>
          {/* Login Button (Desktop Only) */}
          <button className="hidden md:inline-block bg-white text-orange-600 px-4 py-1 rounded-full font-semibold hover:bg-gray-100 transition">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
