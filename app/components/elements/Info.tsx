import SkeletonImage from "../fragments/SkeletonImage";

interface InfoListProps {
  image: string;
  title: string;
  desc: string;
}

export default function Info({ image, title, desc }: InfoListProps) {
  return (
    <li className="py-2 list-none">
      <div className="flex items-center">
        {/* Image */}
        <div className="relative w-24 sm:w-28 md:w-28 aspect-square shrink-0">
          <SkeletonImage
            aspectRatio={1}
            className="rounded-xl object-cover"
            customImage="border-8"
            src={image}
            alt={title}
          />
        </div>

        {/* Teks */}
        <div className="flex-1 min-w-0 ml-4 space-y-2">
          <p className="text-xl font-normal text-black">{title}</p>
          <p
            className="text-md text-gray-400"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
      </div>
    </li>
  );
}

export function InfoSkeleton() {
  return (
    <li className="py-2 list-none animate-pulse">
      <div className="flex items-center">
        {/* Skeleton Image */}
        <div className="relative w-24 sm:w-28 md:w-28 aspect-square shrink-0">
          <div className="bg-gray-200 rounded-xl w-full h-full"></div>
        </div>

        {/* Skeleton text */}
        <div className="flex-1 min-w-0 ml-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </li>
  );
}
