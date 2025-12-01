"use client";
import { ReactNode, useEffect, useState } from "react";

export interface Popup {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}
export default function Popup({ children, open, handleClose }: Popup) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      setTimeout(() => setVisible(true), 10); // fade in
    } else {
      setVisible(false); // start fade out

      setTimeout(() => {
        setMounted(false); // remove after animation selesai
      }, 300); // match with CSS duration
    }
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
        visible ? "bg-black/60" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative flex flex-col gap-y-2 transform transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-black cursor-pointer font-bold text-xl z-10"
          onClick={handleClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
