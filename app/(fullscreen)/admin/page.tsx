import AdminDashboard from "@/app/components/fragments/AdminDashboard";
import { API_BASE_URL } from "@/app/utils/fetcher";
import { protectedPage } from "@/app/utils/protectedPage";
import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ courtId: string | undefined }>;
}) {
  // Get Court ID
  const { courtId } = await searchParams;
  if (!courtId) throw new Error("courtId is required");

  const session = await protectedPage();
  if (!session.user) redirect("/login");

  // TODO Get Court can handle with email admin
  const courtRes = await fetch(
    `${API_BASE_URL}/api/sheets/courts/${courtId}`
  ).then((r) => r.json());

  if (!courtRes.success) {
    console.log(courtRes.message);
    throw new Error(courtRes.message || "Failed to fetch court");
  }

  // TODO Get Books from the court that can be handled
  const booksRes = await fetch(
    `${API_BASE_URL}/api/sheets/books/${courtId}?paymentStatus=settlement&paymentType=valid&admins=${session.user.email}`
  ).then((r) => r.json());

  if (!booksRes.success) {
    console.log(booksRes.message);
    throw new Error(booksRes.message || "Failed to fetch books");
  }

  return <AdminDashboard courtData={courtRes.data} bookData={booksRes.data} />;
}

export default Page;
