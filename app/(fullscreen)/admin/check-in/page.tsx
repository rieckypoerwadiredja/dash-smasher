/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { API_BASE_URL } from "@/app/utils/fetcher";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function Page() {
  const [paused, setPaused] = useState(false);

  const handleScan = async (detectedCodes: any[]) => {
    if (paused || !detectedCodes?.length) return;

    setPaused(true); // pause scanner

    const code = JSON.parse(detectedCodes[0].rawValue);

    try {
      const res = await fetch(`${API_BASE_URL}/api/sheets/check_in`, {
        method: "PUT",
        body: JSON.stringify({
          id: code.id,
          check_in: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to check in");
      }

      alert(`success ${data.message}`);
      setPaused(false);
    } catch (err: any) {
      alert(`error ${err.message}`);
    }
  };

  return (
    <div className="w-full h-full">
      <Scanner
        onScan={handleScan}
        onError={(error) => console.error(error)}
        paused={paused}
      />
    </div>
  );
}
