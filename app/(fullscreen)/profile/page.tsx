"use client";

import SkeletonImage from "@/app/components/fragments/SkeletonImage";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-10">
      {/* Header */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-2xl p-6 shadow-md">
        {/* Profile Image */}
        <div className="shrink-0">
          <SkeletonImage
            width={128}
            aspectRatio={1 / 1}
            src="https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            Alexandra Aderson
          </h1>
          <p className="text-dark-gray text-sm md:text-base mt-2">
            alexandra@example.com
          </p>
          <p className="text-dark-gray text-sm md:text-base">
            Member since January 2025
          </p>
        </div>
      </div>

      {/* Stats / Info Section */}
      <div className="w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
          <p className="text-dark-gray text-sm">Bookings</p>
          <p className="text-black font-bold text-xl mt-2">12</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
          <p className="text-dark-gray text-sm">Points</p>
          <p className="text-black font-bold text-xl mt-2">320</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
          <p className="text-dark-gray text-sm">Favorites</p>
          <p className="text-black font-bold text-xl mt-2">5</p>
        </div>
      </div>

      {/* Activity / History */}
      <div className="w-full max-w-4xl mt-6 bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-black text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="flex flex-col gap-3">
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-dark-gray">Booked Court #3</span>
            <span className="text-black font-semibold">May 5, 2025</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-dark-gray">Redeemed 100 points</span>
            <span className="text-black font-semibold">April 28, 2025</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-dark-gray">Booked Court #1</span>
            <span className="text-black font-semibold">April 20, 2025</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
