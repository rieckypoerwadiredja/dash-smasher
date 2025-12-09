import { Court } from "@/app/(main)/courts/page";
import DetailCourtClientWrapper, { Book } from "@/app/components/fragments/DetailCourtClientWrapper";
import { IMAGES } from "@/app/constants/image";
import { API_BASE_URL, fetchData } from "@/app/utils/fetcher";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${API_BASE_URL}/api/sheets/courts/${id}`, {
    cache: "no-store",
  }).then((r) => r.json());

  if (!res.success || !res.data) {
    // court not found, return default metadata
    return {
      title: "Court not found",
      description: "The requested court does not exist",
      icons: {
        icon: IMAGES.logoIco,
        shortcut: IMAGES.logo,
        apple: IMAGES.logo,
      },
    };
  }
  const court = res.data;

  return {
    title: court.name,
    description: court.desc,
    icons: {
      icon: IMAGES.logoIco,
      shortcut: IMAGES.logo,
      apple: IMAGES.logo,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const courtRes = await fetchData< Court >(
    `${API_BASE_URL}/api/sheets/courts/${id}`
  );
  const booksRes = await fetchData< Book[] >(
    `${API_BASE_URL}/api/sheets/books/${id}?paymentStatus=pending,settlement&paymentType=valid`
  );
  return (
    <DetailCourtClientWrapper
      courtData={courtRes}
      booksData={booksRes || []}
    />
  );
}
