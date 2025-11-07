"use client";
import Image from "next/image";
import { useState } from "react";

type SkeletonImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  aspectRatio?: number;
  customImage?: string;
  hover?: boolean;
};

export default function SkeletonImage({
  src,
  alt,
  className = "",
  customImage = "",
  width,
  aspectRatio = 1,
  hover = false,
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const isFixedSize = typeof width === "number";

  const style: React.CSSProperties = isFixedSize
    ? { width, height: width / aspectRatio }
    : { position: "relative", width: "100%", height: "100%" };

  return (
    <div
      style={style}
      className={`relative shrink-0 border-2 border-white rounded-xl overflow-hidden group ${className}`}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-400 animate-pulse z-10" />
      )}

      {/* Gambar */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover rounded-xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${customImage}`}
        onLoad={() => setLoaded(true)}
      />

      {/* Hover overlay */}
      {hover && (
        <div className="absolute inset-0 bg-white/70 bg-opacity-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl pointer-events-none" />
      )}
    </div>
  );
}
