"use client";
import { useState, ReactNode } from "react";
import SkeletonImage from "../SkeletonImage";
import { CardDesc, CardTitle } from "../../elements/Text";
import Button from "../../elements/Button";
import { FaCalendarAlt } from "react-icons/fa";
import { IconProfiles } from "../../elements/Icons";

interface subTitle {
  date: string;
  members: number;
}
export interface PopupProps {
  image: string;
  title: string;
  desc: string;
  action_name: string;
  subTitle?: subTitle | string;
  action?: () => void | Promise<void>;
}
export interface CardPoupProps {
  children: ReactNode;
  className?: string;
  data: PopupProps;
}

export default function CardPoup({ children, className, data }: CardPoupProps) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    // kasih delay dikit biar transition aktif (karena Tailwind butuh waktu 1 frame)
    setTimeout(() => setShow(true), 10);
  };

  const handleClose = () => {
    setShow(false);
    // kasih waktu 300ms buat animasi fade-out dulu baru remove elemen
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <>
      {/* Trigger */}
      <div className={className} onClick={handleOpen}>
        {children}
      </div>

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
            <div className="flex flex-col gap-y-2 max-h-[400px] overflow-auto">
              <div className="relative w-full">
                <SkeletonImage
                  src={data.image}
                  alt={data.title}
                  className="cursor-pointer shrink-0 w-full max-h-[300px] aspect-video"
                />
              </div>
              <CardTitle>{data.title}</CardTitle>
              <div className="flex w-full">
                {typeof data.subTitle === "object" && (
                  <>
                    <div className="flex w-1/2 items-center justify-start gap-2 text-dark-gray">
                      <FaCalendarAlt />
                      <span>{data.subTitle.date}</span>
                    </div>
                    <div className="flex w-1/2 items-center justify-start gap-2 text-dark-gray">
                      <IconProfiles />
                      <span>{data.subTitle.members} members</span>
                    </div>
                  </>
                )}
              </div>
              <CardDesc className="text-black!">{data.desc}</CardDesc>
            </div>
            <div className="flex gap-3 justify-start">
              <Button
                disabled={data.action_name === "Already Registered"}
                onClick={data.action}
              >
                {data.action_name}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
