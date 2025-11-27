import { ReactNode } from "react";

export interface Popup {
  children: ReactNode;
  open: boolean;
  show: boolean;
  handleClose: () => void;
}
export default function Popup({ children, open, show, handleClose }: Popup) {
  return (
    <>
      {/* Modal */}
      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
            show ? "bg-black/60" : "bg-transparent"
          }`}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative flex flex-col gap-y-2 transform transition-all duration-300 ${
              show ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
      )}
    </>
  );
}
