import Image from "next/image";
import React from "react";

export function IconProfiles() {
  return (
    <div className="flex -space-x-2 sm:-space-x-3">
      <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-white">
        <Image
          src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.1.0&auto=format&fit=crop&w=80&q=80"
          alt="User 1"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-white">
        <Image
          src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.1.0&auto=format&fit=crop&w=80&q=80"
          alt="User 2"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-white">
        <Image
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&auto=format&fit=crop&w=80&q=80"
          alt="User 3"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
