"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/app/constants/image";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-black py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-start gap-4 md:w-1/3">
          <Image
            src={IMAGES.fullLogo}
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <p className="text-dark-gray text-sm">
            Smash Your Game, Book Your Court.
          </p>
        </div>

        {/* Column 1 */}
        <div className="flex flex-col gap-3 md:w-1/3">
          <h4 className="font-semibold text-black">Company</h4>
          <Link href="#" className="text-dark-gray text-sm hover:underline">
            About Us
          </Link>
          <Link href="#" className="text-dark-gray text-sm hover:underline">
            Careers
          </Link>
          <Link href="#" className="text-dark-gray text-sm hover:underline">
            Contact
          </Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 md:w-1/3">
          <h4 className="font-semibold text-black">Support</h4>
          <Link href="#" className="text-dark-gray text-sm hover:underline">
            Help Center
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-dark-gray text-sm hover:underline"
          >
            Terms of Service
          </Link>
          <Link href="#" className="text-dark-gray text-sm hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-dark-gray text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
