/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IMAGES } from "@/app/constants/image";
import { API_BASE_URL } from "@/app/utils/fetcher";
import { Scanner } from "@yudiel/react-qr-scanner";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [paused, setPaused] = useState(false);

  const handleScan = async (detectedCodes: any[]) => {
    if (paused || !detectedCodes?.length) return;

    setPaused(true); // pause scanner

    let raw = detectedCodes[0].rawValue;
    let code;

    // QR IS NOT JSON
    try {
      code = JSON.parse(raw);
    } catch {
      alert("This QR is not the official Dash Smasher QR.");
      setTimeout(() => setPaused(false), 150);
      return;
    }

    // NOT HAVE KEY ID IN OBJECT
    if (!code.id) {
      alert("This QR is not the official Dash Smasher QR.");
      setTimeout(() => setPaused(false), 150);
      return;
    }

    try {
      const clientTime = new Date().toISOString();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch(`${API_BASE_URL}/api/sheets/check_in`, {
        method: "PUT",
        body: JSON.stringify({
          id: code.id,
          check_in: true,
          clientTime,
          timezone,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        throw new Error(data.message || "Failed to check in");
      }

      alert(`success ${data.message}`);
      setTimeout(() => setPaused(false), 150);
    } catch (err: any) {
      alert(`error ${err.message}`);
      setTimeout(() => setPaused(false), 150);
    }
  };

  return (
    <div className="relative w-full h-screen text-white">
      {/* CAMERA FULLSCREEN */}
      <Scanner
        onScan={handleScan}
        onError={(error) => console.error(error)}
        paused={paused}
        classNames={{
          container: "absolute inset-0 w-full h-full",
          video: "object-cover w-full h-full",
        }}
      />

      {/* DARK TOP GRADIENT */}
      <div
        className="absolute top-0 left-0 w-full h-40 
        bg-gradient-to-b from-black/70 to-transparent z-20"
      />

      {/* HEADER OVERLAY */}
      <header className="absolute top-5 left-0 w-full flex flex-col items-center z-30">
        <Image src={IMAGES.fullLogo} alt="Logo" width={130} height={130} />
        <h1 className="text-xl font-bold mt-1">Scan QR Court</h1>
        <p className="text-sm opacity-90">Point the camera to check-in.</p>
      </header>

      {/* ORANGE FRAME */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="w-72 h-72 border-4 border-orange-500 rounded-xl" />
      </div>

      {/* STATUS BAR */}
      <div className="absolute bottom-[5%] left-0 w-full flex justify-center z-30">
        <p className="bg-primary p-4 rounded-xl text-white font-semibold">
          {paused ? "Processing..." : "Ready to scan"}
        </p>
      </div>
    </div>
  );
}
