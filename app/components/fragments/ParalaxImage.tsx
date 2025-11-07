import React from "react";

export function ParalaxImageSkeleton() {
  return (
    <div className="relative aspect-video w-full max-h-[300px] overflow-hidden rounded-lg shadow-xl">
      <div className="h-full w-full bg-gray-200 animate-pulse">
        {/* Lapisan overlay hitam (simulasi bg-black/60) */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Konten Placeholder - Teks dan Lokasi */}
        <div className="absolute inset-0 flex items-start justify-end z-20 py-10 px-5 flex-col">
          {/* Placeholder untuk Court Name (h1) */}
          <div className="w-4/5 h-6 bg-gray-400 rounded-md mb-2" />

          {/* Placeholder untuk Location | City (p) */}
          <div className="w-2/5 h-4 bg-gray-400 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function ParalaxImage({
  image,
  name,
  desc,
}: {
  image: string;
  name: string;
  desc: string;
}) {
  const dataIsReady = image && name && desc;
  return (
    <>
      {dataIsReady ? (
        <div
          className="relative aspect-video w-full h-[50vh] md:h-[400px] bg-no-repeat bg-cover bg-fixed bg-bottom"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute flex-col inset-0 flex items-start justify-end z-20 py-10 px-5">
            <h1 className="text-2xl md:text-4xl font-medium text-white">
              {name}
            </h1>
            <p className="text-md text-gray-300">{desc}</p>
          </div>
        </div>
      ) : (
        <ParalaxImageSkeleton />
      )}
    </>
  );
}
