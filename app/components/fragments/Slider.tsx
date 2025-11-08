"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SkeletonImage from "./SkeletonImage";

interface ImageItem {
  name: string;
  image: string;
}

interface SliderImagesProps {
  title?: string;
  images: ImageItem[];
}

export function SliderImages({ title = "Slider", images }: SliderImagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [imageWidth, setImageWidth] = useState(150);

  useEffect(() => {
    const handleResize = () => {
      setImageWidth(window.innerWidth >= 768 ? 250 : 150);
    };

    handleResize(); // set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gap = 24;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -(imageWidth + gap),
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: imageWidth + gap,
      behavior: "smooth",
    });
  };
  const skeletons = Array.from({ length: 6 });

  return (
    <div>
      {/* Judul + Arrows */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-3xl text-white font-semibold">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="bg-white text-primary p-1 cursor-pointer rounded-full hover:opacity-80 transition"
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white text-primary p-1 cursor-pointer rounded-full hover:opacity-80 transition"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        className="flex gap-2.5 md:gap-6 w-full overflow-x-auto pr-[20vw] scroll-smooth scrollbar-none"
        ref={scrollRef}
      >
        {images.length === 0
          ? skeletons.map((_, i) => (
              <div
                key={i}
                style={{ width: imageWidth, height: (imageWidth * 4) / 3 }}
                className="bg-gray-300 animate-pulse rounded-lg shrink-0"
              ></div>
            ))
          : images.map((item, i) => (
              <SkeletonImage
                key={i}
                src={item.image}
                alt={item.name}
                // width={imageWidth}
                aspectRatio={3 / 4}
                className="cursor-pointer shrink-0 w-[150px] max-w-[150px] md:w-[250px] md:max-w-[250px] aspect-3/4"
              />
            ))}
      </div>
    </div>
  );
}

export function SliderSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="h-6 md:h-8 w-40 bg-gray-400/70 rounded animate-pulse"></div>
        <div className="flex gap-2">
          <div className="bg-gray-300 h-8 w-8 rounded-full animate-pulse" />
          <div className="bg-gray-300 h-8 w-8 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="flex gap-2.5 md:gap-6 w-full overflow-x-hidden">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 animate-pulse rounded-lg shrink-0 w-[150px] md:w-[250px] aspect-3/4"
          />
        ))}
      </div>
    </div>
  );
}

interface SliderProps {
  title?: string;
  children: ReactNode;
}

export function Slider({ title = "Slider", children }: SliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const gap = 24;

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const firstChild = container.children[0] as HTMLElement;
      if (firstChild) {
        setItemWidth(firstChild.offsetWidth);
        // Hitung berapa item muat di 1 row
        setItemsPerRow(
          Math.floor(container.offsetWidth / (firstChild.offsetWidth + gap))
        );
      }
    }
  }, [children]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -(itemWidth + gap) * itemsPerRow,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: (itemWidth + gap) * itemsPerRow,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      {/* Judul + Arrows */}
      <div className="flex items-center justify-between mb-3 w-full">
        <h2 className="text-xl md:text-3xl text-white font-semibold">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="bg-white text-primary p-1 cursor-pointer rounded-full hover:opacity-80 transition"
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white text-primary p-1 cursor-pointer rounded-full hover:opacity-80 transition"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        className="flex gap-2.5 md:gap-6 w-full overflow-x-auto scroll-smooth scrollbar-none"
        ref={scrollRef}
      >
        {children}
      </div>
    </div>
  );
}
