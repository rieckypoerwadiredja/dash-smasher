import SkeletonImage from "../fragments/SkeletonImage";

interface InfoListProps {
  image: string;
  title: string;
  participants: string;
}

export default function Info({ image, title, participants }: InfoListProps) {
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
        <div className="flex-1 min-w-0">
          <p className="text-xl font-normal text-black">{title}</p>
          <p className="text-md text-gray-400">{participants}</p>
        </div>
      </div>
    </li>
  );
}
