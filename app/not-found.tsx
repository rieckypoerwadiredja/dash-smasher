"use client";
import React from "react";
import Footer from "./components/fragments/Footer";
import { NavMob } from "./components/fragments/Nav";
import StatusMessage from "./components/fragments/status/StatusMessage";

function NotFound() {
  return (
    <body className="max-w-[1440px] mx-auto">
      {/* Wrapper center */}
      <div className="px-5 p-10 flex items-center justify-center">
        <StatusMessage
          data={{
            title: "Oops, your destination isn't there!",
            desc: "Maybe you've taken the wrong route or the wrong address.",
            status: "not-found",
          }}
        />
      </div>

      <NavMob />
      <Footer />
    </body>
  );
}

export default NotFound;
