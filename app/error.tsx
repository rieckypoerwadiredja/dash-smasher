"use client";

import { useEffect } from "react";
import StatusMessage from "./components/fragments/status/StatusMessage";
import { NavMob } from "./components/fragments/Nav";
import Footer from "./components/fragments/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <body className="max-w-[1440px] mx-auto">
      {/* Wrapper center */}
      <div className="px-5 p-10 flex items-center justify-center">
        <StatusMessage
          data={{
            title: "Oops, the server didn't respond!",
            desc: error.message || "Please try again later.",
            status: "error",
          }}
        />
      </div>

      <NavMob />
    </body>
  );
}
