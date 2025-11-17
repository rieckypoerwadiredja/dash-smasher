import Image from "next/image";
import React from "react";

export interface StatusProps {
  title: string;
  desc: string;
  status: "not-found" | "error" | "empty";
}

export default function StatusMessage({ data }: { data: StatusProps }) {
  const imageNotFound = {
    src: "/mascot/not-found-min.png",
    alt: "not-found",
  };

  const imageError = {
    src: "/mascot/sleppy-min.png",
    alt: "error",
  };
  const imageEmpty = {
    src: "/mascot/sad-min.png",
    alt: "error",
  };

  const { title, desc, status } = data;
  const image =
    status === "not-found"
      ? imageNotFound
      : status === "error"
      ? imageError
      : imageEmpty;

  return (
    <div className="flex justify-center items-center flex-col text-center md:text-left md:flex-row rounded-2xl w-full max-w-3xl mx-auto py-3">
      <div className="relative w-1/2 md:w-[40%] mx-auto h-full aspect-square">
        <Image className="aspect-square" src={image.src} alt={image.alt} fill />
      </div>
      <div className="w-full md:w-[60%]">
        <p className="font-semibold text-xl md:text-2xl lg:text-3xl">{title}</p>
        <p className="text-lg lg:text-xl text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
