import DetailCourtClientWrapper from "@/app/components/fragments/DetailCourtClientWrapper";
import { IMAGES } from "@/app/constants/image";
import { API_BASE_URL } from "@/app/utils/fetcher";

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
  const courtRes = await fetch(`${API_BASE_URL}/api/sheets/courts/${id}`).then(
    (r) => r.json()
  );
  const booksRes = await fetch(
    `${API_BASE_URL}/api/sheets/books/${id}?paymentStatus=pending,settlement&paymentType=valid`
  ).then((r) => r.json());
  const court = courtRes.data;
  const books = booksRes.data || [];

  return <DetailCourtClientWrapper courtData={court} booksData={books} />;
}
