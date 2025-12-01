import DetailCourtClientWrapper from "@/app/components/fragments/DetailCourtClientWrapper";
import { API_BASE_URL } from "@/app/utils/fetcher";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courtRes = await fetch(`${API_BASE_URL}/api/sheets/courts/${id}`).then(
    (r) => r.json()
  );
  const booksRes = await fetch(`${API_BASE_URL}/api/sheets/books/${id}`).then(
    (r) => r.json()
  );
  const court = courtRes.data;
  const books = booksRes.data || [];

  return <DetailCourtClientWrapper courtData={court} booksData={books} />;
}
