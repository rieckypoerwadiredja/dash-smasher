import { API_BASE_URL } from "@/app/utils/fetcher";
import { protectedPage } from "@/app/utils/protectedPage";
import { redirect } from "next/navigation";
import { Court } from "@/app/(main)/courts/page";
import OwnerDashboard from "@/app/components/fragments/OwnerDashboard";

// TODO FILTER Today & calendar select - owner &&& filter by court

// TODO NEW Page Current status court - utk admin court aja ini cek court akif saat ini ada siapa court mana dkk

export default async function Page() {
  const session = await protectedPage();
  if (!session.user) redirect("/login");

  // TODO Get Court can handle with email admin
  const courtRes = await fetch(
    `${API_BASE_URL}/api/sheets/courts?admin=${session.user.email}`
  ).then((r) => r.json());

  if (!courtRes.success) {
    console.log(courtRes);
    throw new Error(courtRes.message || "Failed to fetch court");
  }

  // get list id (court admin)
  const courtIDs = courtRes.data.map((c: Court) => c.id);

  // TODO Get Books from the court that can be handled
  const booksRes = await fetch(
    `${API_BASE_URL}/api/sheets/books?courtIDs=${courtIDs.join(",")}`
  ).then((r) => r.json());

  if (!booksRes.success) {
    console.log(booksRes);
    throw new Error(booksRes.message || "Failed to fetch court");
  }

  return <OwnerDashboard booksData={booksRes.data} courtData={courtRes.data} />;
}
